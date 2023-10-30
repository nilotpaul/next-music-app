import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  songUpload,
  type SongUploadClient,
  TypedFormData,
} from "@/validations/songUpload";
import { Song } from "@/types/songs";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useToast } from "../ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import closeOnBack from "@/utils/closeOnBack";
import { closeDialog, openDialog } from "@/redux/slices/PlayerDialogSlice";
import { cn } from "@/utils/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type SongUploadDialogProps = {
  children: React.ReactNode;
  name: string;
};

const SongUploadDialog = ({ children, name }: SongUploadDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cleanup = closeOnBack("upload", dispatch, dialogs);

    return cleanup;
  }, [dispatch, dialogs]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SongUploadClient>({
    resolver: zodResolver(songUpload),
  });

  const { mutate: songUploadMutation, isLoading } = useMutation(
    ["song-upload"],
    {
      mutationFn: async ({
        artistName,
        file,
        image,
        title,
      }: SongUploadClient) => {
        if (!file || file.length === 0 || !image || image.length === 0) {
          throw new Error("No mp3 / img file found.", { cause: 1 });
        } else if (
          !(file instanceof FileList) ||
          !(image instanceof FileList)
        ) {
          throw new Error("Invalid format.", { cause: 2 });
        }

        const formData = new FormData() as TypedFormData;

        formData.set("artistName", artistName);
        formData.set("title", title);
        formData.set("image", image[0]);
        formData.set("file", file[0]);

        const { data } = await axios.post<Song>("/api/song-upload", formData);

        return data;
      },

      onSuccess: (data) => {
        toast({
          title: "Success",
          description: `${data.title} has been uploaded`,
          className: "text-primary",
        });

        reset();
        router.refresh();
        dispatch(closeDialog("upload"));
      },

      onError: (err) => {
        console.error(err);
        if (err instanceof AxiosError) {
          toast({
            title: err.response?.status.toString(),
            description: err.response?.data,
            variant: "destructive",
          });
        } else if (err instanceof Error) {
          if (err.cause === 1) {
            setError("file", { message: "No .mp3 found." });
            setError("image", { message: "No image found" });
          } else {
            setError("file", { message: "Invalid format" });
            setError("image", { message: "Invalid format" });
          }
          return;
        } else {
          toast({
            title: "OPPS",
            description: "Something went wrong. Please try again later",
            variant: "destructive",
          });
        }

        reset();
      },
    },
  );

  const onOpenChange = useCallback(() => {
    if (!dialogs.includes("upload")) {
      dispatch(openDialog("upload"));
      router.push("#upload", { scroll: false });
    } else {
      dispatch(closeDialog("upload"));
    }
  }, [dialogs, dispatch, router]);

  return (
    <Dialog open={dialogs.includes("upload")} onOpenChange={onOpenChange}>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-full flex-col items-start gap-y-6 md:grid md:h-max md:max-w-[450px]">
        <DialogHeader className="w-full text-start">
          <DialogTitle className="text-xl md:text-2xl">
            Upload a song
          </DialogTitle>
          <DialogDescription className="pt-1.5">
            Your songs would be publicaly visible to everyone. Make sure you
            enter the correct details
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((formData) => songUploadMutation(formData))}
          className="w-full space-y-6"
        >
          <div className="w-full space-y-4">
            <div className="space-y-1.5">
              <Label>Artist Name</Label>
              <Input
                type="text"
                placeholder="Artist Name"
                defaultValue={name}
                className="h-11 md:h-9"
                {...register("artistName")}
              />
              <span
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.artistName?.message,
                })}
              >
                {errors.artistName?.message}
              </span>
            </div>
            <div className="space-y-1.5">
              <Label>Song Title</Label>
              <Input
                type="text"
                placeholder="Song Title"
                className="h-11 md:h-9"
                {...register("title")}
              />
              <span
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.title?.message,
                })}
              >
                {errors.title?.message}
              </span>
            </div>
            <div className="space-y-1.5">
              <Label>
                Song Image{" "}
                <span className="text-xs font-normal">(.jpg, .png, .webp)</span>
              </Label>
              <Input
                className="h-11 pt-2.5 md:h-9 md:pt-[0.40rem]"
                id="image"
                type="file"
                accept=".png,.jpg,.webp"
                {...register("image")}
              />
              <span
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.image?.message,
                })}
              >
                {errors.image?.message}
              </span>
            </div>
            <div className="space-y-1.5">
              <Label>Song mp3 file</Label>
              <Input
                className="h-11 pt-2.5 md:h-9 md:pt-[0.40rem]"
                id="song"
                type="file"
                accept=".mp3"
                {...register("file")}
              />
              <span
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.file?.message,
                })}
              >
                {errors.file?.message}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full gap-x-1.5 py-5 text-base md:py-4 md:text-sm"
            >
              Upload
              {isLoading && <Loader2 size={19} className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SongUploadDialog;
