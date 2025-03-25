"use server"

import { db } from "./db";
import { fetchWalletbyUserEmail } from "./getWallet"

export const depositMoney = async (email: string, amount:number) =>{
    const sender = await fetchWalletbyUserEmail(email);

    if(!sender){
        return false;
    }

      try{
            await db.wallet.update({
                where: {id:sender.id},
                data: {balance: {increment: amount}}
            })
            return true;
        }
        catch{
            return false;
        }
}