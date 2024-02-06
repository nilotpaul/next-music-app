"use client";

import { useMutation } from "@tanstack/react-query";
import {
  FormUpdateUser,
  UpdateUserClient,
  updateUser,
} from "@/validations/updateUser";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import closeOnBack from "@/utils/closeOnBack";
import { cn } from "@/utils/utils";

import { Loader2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { closeDialog, openDialog } from "@/redux/slices/playerDialogSlice";

const ProfileUpdateDialog = () => {
  const { update: updateSession, data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);

  useEffect(() => {
    const cleanup = closeOnBack("profile", dispatch, dialogs);

    return cleanup;
  }, [dispatch, dialogs]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<UpdateUserClient>({
    resolver: zodResolver(updateUser),
  });

  const { mutate: updateProfileMutation, isLoading } = useMutation(
    ["update-profile"],
    {
      mutationFn: async ({ name, image }: UpdateUserClient) => {
        if (!image) {
          throw new Error("No image found", { cause: 1 });
        } else if (!(image instanceof FileList)) {
          throw new Error("Invalid format.", { cause: 2 });
        } else if (image.length === 0 && name?.length === 0) {
          throw new Error("Both fields cannot be empty", { cause: 3 });
        }

        if (name === session?.user.name) {
          throw new Error("Your current name is same as this one.", {
            cause: 3,
          });
        }

        const formdata = new FormData() as FormUpdateUser;

        formdata.set("name", name || "");
        formdata.set("image", image[0] || "");

        type ReturnData = {
          name?: string;
          img?: string;
        };

        const { data } = await axios.patch<ReturnData>(
          "/api/update-profile",
          formdata,
        );

        return data;
      },

      onSuccess: (data) => {
        updateSession({
          ...session,
          user: {
            ...session?.user,
            name: data.name || session?.user.name,
            image: data.img || session?.user.image,
          },
        });

        reset();
        router.replace(`?cache=${new Date().getTime().toString()}`);
        dispatch(closeDialog("profile"));
        router.refresh();
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
            setError("image", { message: err.message });
          } else if (err.cause === 2) {
            setError("image", { message: err.message });
          } else if (err.cause === 3) {
            toast({
              title: "OPPS",
              description: err.message,
              variant: "destructive",
            });
          } else {
            setError("image", { message: err.message });
            setError("name", { message: err.message });
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
    if (!dialogs.includes("profile")) {
      dispatch(openDialog("profile"));
      router.push("#profile", { scroll: false });
    } else {
      dispatch(closeDialog("profile"));
      router.back();
      reset();
    }
  }, [dispatch, router, dialogs, reset]);

  return (
    <Dialog open={dialogs.includes("profile")} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="absolute left-1/2 top-1/2 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center justify-center rounded-full bg-background/60 backdrop-invert backdrop-opacity-10 group-hover:flex">
          <Pencil size={34} />
          <span className="text-sm">Choose Photo</span>
        </div>
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-full flex-col items-start gap-y-6 md:grid md:h-max md:max-w-[450px]">
        <DialogHeader className="w-full text-start">
          <DialogTitle className="text-xl">Update Profile</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((formData) => updateProfileMutation(formData))}
          className="w-full space-y-6"
        >
          <div className="w-full space-y-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                className="h-11 pt-2.5 md:h-9 md:pt-[0.40rem]"
                id="song"
                type="text"
                placeholder="name"
                {...register("name")}
              />
              <p
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.name?.message,
                })}
              >
                {errors.name?.message}
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>
                Profile Image{" "}
                <span className="text-xs font-normal">(.jpg, .png, .webp)</span>
              </Label>
              <Input
                className="h-11 pt-2.5 md:h-9 md:pt-[0.40rem]"
                id="image"
                type="file"
                accept=".png,.jpg,.webp"
                {...register("image")}
              />
              <p
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.image?.message,
                })}
              >
                {errors.image?.message}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full gap-x-1.5 py-5 text-base md:py-4 md:text-sm"
            >
              Update
              {isLoading && <Loader2 size={19} className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateDialog;
