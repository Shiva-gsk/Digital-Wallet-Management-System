"use server"
import { db } from "./db";

export const storeMoneyRequest = async(senderId: string, receiverId:string, amount:number, desc:string="Rent") => {
    console.log(senderId, receiverId, amount, desc);
    try{
        await db.moneyRequest.create({
            data:{
                receiver_id:receiverId,
                sender_id:senderId,
                amount:amount,
                status:"pending",
                desc:desc,
            }
        })
        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}
