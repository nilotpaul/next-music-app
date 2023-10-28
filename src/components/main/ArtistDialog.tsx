import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creatorJoin, type CreatorJoin } from "@/validations/creator";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeDialog, openDialog } from "@/redux/slices/PlayerDialogSlice";

import { Checkbox } from "../ui/checkbox";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";

type ArtistModalProps = {
  children: React.ReactNode;
};

const ArtistDialog = ({ children }: ArtistModalProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreatorJoin>({
    resolver: zodResolver(creatorJoin),
    mode: "onChange",
  });

  const { mutate: creatorJoinMutation, isLoading } = useMutation(
    ["creator-join"],
    {
      mutationFn: async (payload: CreatorJoin) => {
        await axios.patch("/api/creator-join", payload);
      },

      onSuccess: () => {
        toast({
          title: "Succesfully registered",
          description: "You are now a creator",
          className: "text-primary",
        });
        reset();
        router.refresh();
        dispatch(closeDialog("artist-register"));
      },

      onError: (err) => {
        console.error(err);
        if (err instanceof AxiosError) {
          toast({
            title: err.response?.status.toString(),
            description: err.response?.data,
            variant: "destructive",
          });
        } else {
          toast({
            title: "OPPS!",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
          });
        }
        reset();
      },
    },
  );

  const onOpenChange = () => {
    if (!dialogs.includes("artist-register")) {
      dispatch(openDialog("artist-register"));
      router.push("#artist-register");
    } else {
      dispatch(closeDialog("artist-register"));
      router.back();
    }
  };

  return (
    <Dialog
      open={dialogs.includes("artist-register")}
      onOpenChange={onOpenChange}
    >
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-full flex-col items-start gap-y-6 md:grid md:h-max md:max-w-[450px]">
        <DialogHeader className="w-full text-start">
          <DialogTitle className="text-xl md:text-2xl">
            Join Melodify Creator Program
          </DialogTitle>
          <DialogDescription className="pt-1.5">
            By joining you will be able to upload songs as a creator
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((formData) => creatorJoinMutation(formData))}
          className="w-full space-y-6"
        >
          <div className="w-full space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Artist Name</Label>
              <Input
                placeholder="Artist Name"
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
            <div className="flex flex-col items-start space-y-1.5">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Password"
                className="h-11 md:h-9"
                {...register("password")}
              />
              <span
                className={cn("ml-2 text-xs text-destructive", {
                  hidden: !errors.password?.message,
                })}
              >
                {errors.password?.message}
              </span>
              <span className="text-xs text-destructive">
                Note: This password should match your register password
              </span>
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label>Why Us?</Label>
              <Textarea className="h-24" placeholder="Details" />
            </div>
            <div className="flex items-center gap-x-2">
              <Controller
                control={control}
                name="terms"
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    id="terms"
                    className="rounded-full"
                    onCheckedChange={onChange}
                    defaultChecked={value}
                  />
                )}
              />
              <Label htmlFor="terms" className="text-sm font-[400]">
                You are giving Melodify rights to monitize your work
              </Label>
            </div>
            <span
              className={cn("ml-2 text-xs text-destructive", {
                hidden: !errors.terms?.message,
              })}
            >
              You must agree before submitting.
            </span>
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full gap-x-1.5 py-5 text-base md:py-4 md:text-sm"
            >
              Join as a Creator
              {isLoading && <Loader2 size={19} className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistDialog;
