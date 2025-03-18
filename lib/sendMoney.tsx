"use server"
import { db } from "./db";
import { fetchWalletbyUser } from "./getWallet";

export const sendMoneyById = async(senderId: string, receiverId:string, amount:number) => {
    const sender = await fetchWalletbyUser(senderId);
    const receiver = await fetchWalletbyUser(receiverId);

    if(!sender || !receiver){
        return false;
    }
    if(!sender.isActive || !receiver.isActive){
        return false;
    }

    if(sender.balance < amount){
        return false;
    }
    // console.log(sender);
    // console.log(receiver);
    try{
        await db.wallet.update({
            where: {id:sender.id},
            data: {balance: {decrement: amount}}
        })
        await db.wallet.update({
            where: {id:receiver.id},
            data: {balance: {increment: amount}}
        })

        await db.transaction.create({
            data: {
                status: "completed",
                amount,
                sender: {connect: {id: senderId}},
                receiver: {connect: {id: receiverId}}
            }
        })
        return true;
    }
    catch{
        await db.transaction.create({
            data: {
                status: "failed",
                amount,
                sender: {connect: {id: senderId}},
                receiver: {connect: {id: receiverId}}
            }
        })
        return false;
    }
}