import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { creatorJoin, type CreatorJoin } from "@/validations/creator";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type ArtistModalProps = {
  children: React.ReactNode;
};

const ArtistDialog = ({ children }: ArtistModalProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
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
        await axios.post("/api/creator-join", payload);
      },

      onSuccess: () => {
        toast({
          title: "Succesfully registered",
          description: "You are now a creator",
          className: "text-primary",
        });
        reset();
        router.refresh();
        setIsOpen(false);
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
        setIsOpen(false);
      },
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="flex h-full max-w-full flex-col items-start gap-y-6 md:grid md:h-max md:max-w-[450px]">
        <DialogHeader className="w-full text-start">
          <DialogTitle>Join Melodify Creator Program</DialogTitle>
          <DialogDescription className="pt-1.5">
            By joining you will be able to upload songs as a creator
          </DialogDescription>
        </DialogHeader>
        <div
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit((formData) => creatorJoinMutation(formData));
            }
          }}
          className="w-full space-y-4"
        >
          <div className="space-y-1.5">
            <Label>Artist Name</Label>
            <Input placeholder="Artist Name" {...register("artistName")} />
          </div>
          <div className="space-y-1.5">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <span className="text-xs text-destructive">
              Note: This password should match your register password
            </span>
          </div>
          <div className="space-y-1.5">
            <Label>Why Us?</Label>
            <Textarea placeholder="Details" />
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
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          onClick={handleSubmit((formData) => creatorJoinMutation(formData))}
          className="w-full gap-x-1.5"
        >
          Join as a Creator
          {isLoading && <Loader2 size={19} className="animate-spin" />}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistDialog;
