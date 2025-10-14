import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonLoading from "./ButtonLoading";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const OTPVerification = ({ email, onSubmit, loading }) => {
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const handleOtpVerification = async (values) => {
    onSubmit(values);
  };

  const resendOTP = async () => {
    try {
      setIsResendingOtp(true);
      const { data: resendOtpResponse } = await axios.post(
        "/api/auth/resend-otp",{ email}
      );
      if (!resendOtpResponse.success) {
        throw new Error(resendOtpResponse.message);
      }

      showToast("success", resendOtpResponse.message);
    } catch (error) {
      console.log(error);
      showToast("error", error.message);
    } finally {
      setIsResendingOtp(false);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
          {/* email */}

          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              Please Complete Verification
            </h1>
            <p></p>
          </div>

          <div className="mb-5 mt-5 flex  justify-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center">
                  <FormLabel className="font-semibold">
                    One-Time Password (OTP)
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot className="text-xl size-10" index={0} />
                        <InputOTPSlot className="text-xl size-10" index={1} />
                        <InputOTPSlot className="text-xl size-10" index={2} />
                        <InputOTPSlot className="text-xl size-10" index={3} />
                        <InputOTPSlot className="text-xl size-10" index={4} />
                        <InputOTPSlot className="text-xl size-10" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="font-medium">
                    Please enter the one-time password (OTP) sent to your Email
                    address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mb-3">
            <ButtonLoading
              loading={loading}
              type="submit"
              text="Verify"
              className="w-full text-xl font-semibold cursor-pointer"
            />
            <div className="text-center mt-5">
              {!isResendingOtp ? 
              
                    <button
                    onClick={resendOTP}
                    type="button"
                    className="text-blue-600 cursor-pointer hover: underline"
                  >
                    {" "}
                    Resend OTP
                  </button>

                  :

                  <span className="text-md">Resending...</span>
            
              }
            
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OTPVerification;
