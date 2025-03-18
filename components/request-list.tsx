import { Check, X } from "lucide-react"
import type { MoneyRequest } from "@/app/money-request/page"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RequestListProps {
  requests: MoneyRequest[]
  type: "received" | "sent" | "completed"
}

export function RequestList({ requests, type }: RequestListProps) {
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg font-medium">No requests found</p>
        <p className="text-muted-foreground">
          {type === "received"
            ? "You have no pending requests from others"
            : type === "sent"
              ? "You haven't sent any requests yet"
              : "You have no completed requests"}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="mr-4 h-10 w-10">
                  <AvatarImage src={request.user.avatar} alt={request.user.name} />
                  <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{request.user.name}</p>
                  <p className="text-sm text-muted-foreground">{request.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${request.amount}</p>
                {request.status === "pending" ? (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    Pending
                  </Badge>
                ) : request.status === "completed" ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    Declined
                  </Badge>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm">{request.reason}</p>

            {type === "received" && request.status === "pending" && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <X className="mr-1 h-4 w-4" />
                  Decline
                </Button>
                <Button size="sm">
                  <Check className="mr-1 h-4 w-4" />
                  Pay
                </Button>
              </div>
            )}

            {type === "sent" && request.status === "pending" && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  Cancel Request
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


