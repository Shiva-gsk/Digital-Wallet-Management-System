"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Eye, EyeOff, Clock, ArrowDownUp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PinInput } from "@/components/pin-input"
import { useUser } from "@clerk/nextjs";
import { fetchWalletbyUser } from "@/lib/getWallet"
export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(false)
  const [pinVerified, setPinVerified] = useState(false)
  const [showPinInput, setShowPinInput] = useState(false)
  const [balance, setBalance] = useState(0);

  const handleVerifyPin = (pin: string) => {
    // In a real app, you would verify the PIN against the stored value
    if (pin === "1234") {
      setPinVerified(true)
      setShowBalance(true)
      setShowPinInput(false)
    } else {
      alert("Incorrect PIN. Please try again.")
    }
  }

  const toggleBalanceVisibility = () => {
    if (showBalance) {
      setShowBalance(false)
    } else {
      if (pinVerified) {
        setShowBalance(true)
      } else {
        setShowPinInput(true)
      }
    }
  }
  const { user, isLoaded } = useUser();

  useEffect(()=>{
    if(isLoaded && user){
      // console.log(user);
      fetchWalletbyUser(user.id).then((data) => {
        if (data) {
          setBalance(data.balance)
        }
      });
      // console.log(balance);
    }
  }, [isLoaded, user, balance])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">My Wallet</h1>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Available Balance</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBalanceVisibility}
            aria-label={showBalance ? "Hide balance" : "Show balance"}
          >
            {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>
        </CardHeader>
        <CardContent>
          {showPinInput ? (
            <div className="py-4">
              <p className="mb-4 text-center text-sm text-muted-foreground">Enter your PIN to view balance</p>
              <PinInput length={4} onComplete={handleVerifyPin} />
            </div>
          ) : (
            <div className="py-4">
              <h2 className="text-3xl font-bold">{showBalance ? balance : "••••••"}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Last updated: Today, 10:45 AM</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions" className="mt-4">
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div
                      className={`mr-4 rounded-full p-2 ${transaction.type === "received" ? "bg-green-100" : "bg-blue-100"}`}
                    >
                      {transaction.type === "received" ? (
                        <ArrowDownUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <ArrowDownUp className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {transaction.date}
                      </div>
                    </div>
                  </div>
                  <p
                    className={`font-semibold ${transaction.type === "received" ? "text-green-600" : "text-blue-600"}`}
                  >
                    {transaction.type === "received" ? "+" : "-"}${transaction.amount}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="cards" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <div className="rounded-lg bg-gradient-to-r from-primary to-purple-600 p-6 text-white">
                <div className="mb-6 flex justify-between">
                  <div>
                    <p className="text-xs opacity-80">Digital Wallet</p>
                    <p className="text-sm font-semibold">Virtual Card</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-80">Balance</p>
                    <p className="font-semibold">{showBalance ? "$1,250.75" : "••••••"}</p>
                  </div>
                </div>
                <p className="mb-1 text-xs opacity-80">Card Number</p>
                <p className="mb-4 font-mono text-lg font-medium">•••• •••• •••• 4589</p>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs opacity-80">Card Holder</p>
                    <p className="font-medium">John Doe</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-80">Expires</p>
                    <p className="font-medium">05/28</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <Button variant="outline" size="sm">
                  Freeze Card
                </Button>
                <Button size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const transactions = [
  {
    id: 1,
    description: "Payment to John Doe",
    amount: "25.00",
    type: "sent",
    date: "Today, 2:30 PM",
  },
  {
    id: 2,
    description: "Received from Jane Smith",
    amount: "42.50",
    type: "received",
    date: "Yesterday, 11:15 AM",
  },
  {
    id: 3,
    description: "Coffee Shop",
    amount: "5.75",
    type: "sent",
    date: "Mar 14, 9:20 AM",
  },
  {
    id: 4,
    description: "Salary Deposit",
    amount: "1,200.00",
    type: "received",
    date: "Mar 10, 8:00 AM",
  },
  {
    id: 5,
    description: "Grocery Store",
    amount: "65.30",
    type: "sent",
    date: "Mar 8, 5:45 PM",
  },
]

