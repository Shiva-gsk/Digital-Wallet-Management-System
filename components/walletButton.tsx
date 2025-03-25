import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { FormEvent, useState, useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { depositMoney } from "@/lib/depositMoney";

interface Props {
  children: React.ReactNode;
}

export function WalletButton({ children }: Props) {
  const [isPending, startTransition] = useTransition();
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("amount");
  const { user } = useUser();
  function handleDeposit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!user) return;
    startTransition(() => {
      depositMoney(user.emailAddresses[0]?.emailAddress, Number(amount)).then(
        (data) => {
          console.log(data);
          if (data) {
            setSuccess("Money Deposited Successfully");
            setStep("success");
          } else {
            setError("Money Deposited Successfully");
            setStep("error");
          }
        }
      );
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 w-[35%] cursor-pointer">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step == "amount" && "Deposit Money"}
            {step == "success" && "Success"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {step == "amount" && (
          <>
            <form onSubmit={(e) => handleDeposit(e)} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  $
                </div>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="pl-8 text-lg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Button disabled={isPending} type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            </form>
          </>
        )}
        {step == "success" && (
          <p className="text-sm text-emerald-400">{success}</p>
        )}
        {step == "error" && <p className="text-sm text-destructive">{error}</p>}

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
