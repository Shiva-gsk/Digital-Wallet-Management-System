import { NextResponse } from "next/server";
import {db} from "@/lib/db";

import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req:Request){
    try{
        const payload: WebhookEvent = await req.json();
        console.log("User created", payload.data);
        if (payload.type === "user.created") {
            const { id, email_addresses, first_name} = payload.data;
            await db.user.create({
                data: {
                  id, // Clerk's user ID
                  email: email_addresses[0].email_address,
                  name: first_name,
                  
                },
              });
            return NextResponse.json({ message: "User added to database" }, { status: 201 });
        }
        return NextResponse.json({ message: "Event not handled" }, { status: 400 });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

