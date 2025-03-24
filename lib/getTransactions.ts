"use server"

import { db } from "./db"


export const getTransactions = async (id:string) =>{
    const transactions =await db.transaction.findMany({
        where:{
            OR: [
                { sender_id: id },
                { receiver_id: id }
              ] 
        },
        include:{
            sender: {
                select: {
                    username: true,
                    email: true
                }
            },
            receiver: {
                select: {
                    username: true,
                    email: true
                }
            }
        }
    })
    // console.log(transactions);
    return transactions;
}
