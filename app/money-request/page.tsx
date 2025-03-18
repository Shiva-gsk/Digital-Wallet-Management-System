"use client"

import { startTransition, useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RequestList } from "@/components/request-list"
import { CreateRequestModal } from "@/components/create-request-model"
// import type { UserType } from "@/app/send-money/page"
import { getMoneyRequests } from "@/lib/getMoneyRequests"
import { useUser } from "@clerk/nextjs"
import { MoneyRequest } from "@/types"


export default function MoneyRequestPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sentRequests, setSentRequests] = useState<MoneyRequest[]>([])
  const [receivedRequests, setReceivedRequests] = useState<MoneyRequest[]>([])
  const {user} = useUser();
  useEffect(() => {
    if (!user?.id) return;  // Ensure user is defined before making the call
  
    startTransition(() => {
      getMoneyRequests(user.id).then((data) => {
        if (data) {
          setSentRequests(data.sentRequests || []);
          setReceivedRequests(data.receivedRequests || []);
          console.log(data?.sentRequests);
          console.log(data?.receivedRequests);
        }
      }).catch((error) => console.error("Failed to fetch money requests", error));
    });
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Money Requests</h1>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>New Request</Button>
      </div>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          {/* <TabsTrigger value="completed">Completed</TabsTrigger> */}
        </TabsList>

        <TabsContent value="received" className="mt-4">
          <RequestList requests={receivedRequests} type="received" />
        </TabsContent>

        <TabsContent value="sent" className="mt-4">
          <RequestList requests={sentRequests} type="sent" />
        </TabsContent>
{/* 
        <TabsContent value="completed" className="mt-4">
          <RequestList requests={completedRequests} type="completed" />
        </TabsContent> */}
      </Tabs>

      {showCreateModal && <CreateRequestModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}

// export interface MoneyRequest {
//   id: number
//   user: UserType
//   amount: string
//   reason: string
//   date: string
//   status: "pending" | "completed" | "declined"
// }

// const receivedRequests: MoneyRequest[] = [
//   {
//     id: 1,
//     user: {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     amount: "35.00",
//     reason: "Dinner last night",
//     date: "Today, 10:30 AM",
//     status: "pending",
//   },
//   {
//     id: 2,
//     user: {
//       id: 3,
//       name: "Mike Johnson",
//       email: "mike.johnson@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     amount: "15.50",
//     reason: "Movie tickets",
//     date: "Yesterday, 3:45 PM",
//     status: "pending",
//   },
// ]

// const sentRequests: MoneyRequest[] = [
//   {
//     id: 3,
//     user: {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     amount: "27.50",
//     reason: "Lunch payment",
//     date: "Today, 1:15 PM",
//     status: "pending",
//   },
//   {
//     id: 4,
//     user: {
//       id: 5,
//       name: "David Brown",
//       email: "david.brown@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     amount: "42.00",
//     reason: "Shared taxi",
//     date: "Mar 14, 9:20 AM",
//     status: "pending",
//   },
// ]

// const completedRequests: MoneyRequest[] = [
//   {
//     id: 5,
//     user: {
//       id: 4,
//       name: "Sarah Williams",
//       email: "sarah.williams@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     amount: "18.75",
//     reason: "Coffee and snacks",
//     date: "Mar 10, 2:30 PM",
//     status: "completed",
//   },
//   {
//     id: 6,
//     user: {
//       id: 6,
//       name: "Emily Davis",
//       email: "emily.davis@example.com",
//       avatar: "/placeholder.svg?height=40&width=40",
//     },
//     amount: "55.00",
//     reason: "Group gift",
//     date: "Mar 5, 11:45 AM",
//     status: "completed",
//   },
// ]

