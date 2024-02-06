"use client";

import { SubscriptionStatus } from "@/types/subsctiption";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type ButtonsProps = {
  subscriptionStatus: SubscriptionStatus;
};

const Buttons = ({ subscriptionStatus }: ButtonsProps) => {
  const { toast } = useToast();

  const { mutate: paymentMutation, isLoading } = useMutation(["payment"], {
    mutationFn: async () => {
      const { data } = await axios.post<{ url: string; sessionId?: string }>(
        "/api/create-stripe-session",
      );

      return data;
    },

    onSuccess: async (data) => {
      if (!data.sessionId && data.url) {
        window.location.href = data.url;
      }
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
    },
  });

  return (
    <>
      {subscriptionStatus.isSubscribed && (
        <Button
          onClick={() => paymentMutation()}
          disabled={isLoading}
          variant="secondary"
          className="gap-x-1.5"
        >
          Manage
          {isLoading && <Loader2 size={19} className="animate-spin" />}
        </Button>
      )}
    </>
  );
};

export default Buttons;
