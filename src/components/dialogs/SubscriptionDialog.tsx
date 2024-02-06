"use client";

import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import getStripe from "@/lib/loadStripe";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { closeDialog, openDialog } from "@/redux/slices/playerDialogSlice";
import closeOnBack from "@/utils/closeOnBack";
import { useCallback, useEffect } from "react";

import { Gem, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

const SubscriptionDialog = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { dialogs } = useAppSelector((state) => state.playerDialogSlice);
  const { toast } = useToast();

  useEffect(() => {
    const cleanup = closeOnBack("subscription", dispatch, dialogs);

    return cleanup;
  }, [dialogs, dispatch]);

  const { mutate: paymentMutation, isLoading } = useMutation(["payment"], {
    mutationFn: async () => {
      const { data } = await axios.post<{ url: string; sessionId?: string }>(
        "/api/create-stripe-session",
      );

      return data;
    },

    onSuccess: async (data) => {
      const stripe = await getStripe();

      if (!data.sessionId && data.url) {
        window.location.href = data.url;
        return;
      }

      const { error } = await stripe!.redirectToCheckout({
        sessionId: data.sessionId!,
      });

      if (error) {
        throw new Error("Failed to process the payment");
      }
      closeDialog("subscription");
    },

    onError: (err) => {
      console.error(err);

      if (err instanceof AxiosError) {
        toast({
          title: err.response?.status.toString(),
          description: err.response?.data,
          variant: "destructive",
        });
      } else if (err instanceof Error && err.cause === 1) {
        toast({
          title: "OPPS!",
          description: "Failed to process the payment",
          variant: "destructive",
        });
      } else {
        toast({
          title: "OPPS!",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    },
  });

  const onOpenChange = useCallback(() => {
    if (!dialogs.includes("subscription")) {
      dispatch(openDialog("subscription"));
      router.push("#subscription", { scroll: false });
    } else {
      dispatch(closeDialog("subscription"));
    }
  }, [dialogs, dispatch, router]);

  return (
    <Dialog open={dialogs.includes("subscription")} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex h-full max-w-full flex-col items-center gap-y-6 md:h-max md:max-w-[450px]">
        <DialogHeader className="w-full text-start">
          <DialogTitle className="text-xl">Melodify Premium</DialogTitle>
          <DialogDescription>Monthly Subscription Plan</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-y-4 text-3xl md:text-2xl">
          <Gem size={40} className="text-primary" />
          <span className="bg-gradient-to-r from-pink-600/60 to-purple-600/60 bg-clip-text font-semibold text-transparent">
            For Only 69 Rs
          </span>

          <h3 className="mb-1 text-center text-3xl font-semibold underline md:mb-0 md:text-2xl">
            Benifits
          </h3>
          <ul className="list-item list-disc space-y-3 text-base md:space-y-1 md:text-sm">
            <li className="text-neutral-300">Create Unlimited Playlists</li>
            <li className="text-neutral-300">Unlimited Song Searches</li>
            <li className="text-neutral-300">Unrestricted Listening</li>
          </ul>
        </div>
        <DialogFooter className="w-full">
          <Button
            disabled={isLoading}
            onClick={() => paymentMutation()}
            className="w-full gap-x-1.5 py-5 text-base font-semibold md:py-4 md:text-sm"
          >
            Go Premium
            {isLoading && <Loader2 size={19} className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
