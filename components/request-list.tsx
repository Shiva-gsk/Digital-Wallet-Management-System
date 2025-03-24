import { Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoneyRequest } from "@/types"
import { acceptMoneyRequest, cancelMoneyRequest } from "@/lib/requestButtonActions"


interface RequestListProps {
  requests: MoneyRequest[]
  type: "received" | "sent"
  flag: boolean,
  setFlag: (value: boolean) => void;
}

export function RequestList({ requests, type, flag, setFlag }: RequestListProps) {

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
  
  // useEffect(()=>{
  //   console.log();
  // }, [requests]);

  function handleCancel(request_id:string): void {
    cancelMoneyRequest(request_id).then((res) => {
      if(res){
        console.log("Request Cancelled");
        setFlag(!flag);
      }
      else{
        console.log("Request Cancel Failed");
      }
    }).catch((e) => {
      console.log(e);});
  }
  function handlePay(request_id:string, sender_id:string, receiver_id:string, amount: number): void {
    acceptMoneyRequest(request_id, sender_id, receiver_id, amount).then((res) => {
      if(res){
        console.log("Request Cancelled");
        setFlag(!flag);
      }
    });
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="mr-4 h-10 w-10">
                  <AvatarImage src={""} alt={""} />
                  <AvatarFallback>{"J"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{(type == "received")?request.sender?.name : request.receiver?.name}</p>
                  <p className="text-sm text-muted-foreground">{request.request_date.toLocaleString()}</p>
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
                  <Badge  variant="outline" className="bg-red-50 text-red-700">
                    Declined
                  </Badge>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm px-2">{request.desc}</p>

            {type === "received" && request.status === "pending" && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button onClick={()=>{handleCancel(request.id)}}  variant="outline" size="sm">
                  <X className="mr-1 h-4 w-4" />
                  Decline
                </Button>
                <Button size="sm" onClick={()=>{handlePay(request.id, request.sender_id, request.receiver_id, request.amount)}}>
                  <Check className="mr-1 h-4 w-4" />
                  Pay
                </Button>
              </div>
            )}

            {type === "sent" && request.status === "pending" && (
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={()=>handleCancel(request.id)}>
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


