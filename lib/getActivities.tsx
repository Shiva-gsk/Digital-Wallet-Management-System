"use server"

import { db } from "./db";

export const fetchActivities = async (id: string) =>{
    try{
    const activities = await db.activityLog.findMany({
        where: {
            userId: id
        }
    });
    console.log(activities);
    return activities;
    }
    catch(e){
        console.log(e);
        return null;
    }
}