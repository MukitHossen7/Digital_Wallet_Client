/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const WithdrawSchema = z.object({
  amount: z.string().min(1, {
    message: "Amount is Required",
  }),
});

const WithdrawMoney = () => {
  const form = useForm<z.infer<typeof WithdrawSchema>>({
    resolver: zodResolver(WithdrawSchema),
    defaultValues: {
      amount: "",
    },
  });

  const handleWithdraw = async (data: z.infer<typeof WithdrawSchema>) => {
    try {
      const depositData = {
        amount: Number(data.amount),
      };
      console.log(depositData);
    } catch (error: any) {
      //   if (toastId) {
      //   toast.error(error?.data?.message || "Something went wrong", {
      //     id: toastId,
      //   });
      // } else {
      //   toast.error(error?.data?.message || "Something went wrong");
      // }
      console.error(error);
    }
  };
  return (
    <div className=" w-11/12 md:w-11/12 lg:w-10/12 mx-auto  md:py-12 lg:py-20">
      <Card className="max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Withdraw Money
          </CardTitle>
          <CardDescription className="text-center">
            Withdraw money from your wallet securely and instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form
              className="space-y-5"
              onSubmit={form.handleSubmit(handleWithdraw)}
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Withdraw Money
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawMoney;
