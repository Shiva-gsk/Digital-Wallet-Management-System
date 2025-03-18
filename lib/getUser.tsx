"use server"
import { db } from "./db";

export const fetchUserbyName = async (name: string) => {
    try{
        const user = await db.user.findFirst({
            where:{
                name
            }
        });
        return user;
    }
    catch{
        return null;
    }
};
export const fetchUserbyEmail = async (email: string) => {
    try{
        const user = await db.user.findFirst({
            where:{
                email
            }
        });
        return user;
    }
    catch{
        return null;
    }
};
export const fetchUserbyId = async (id: string) => {
    try{
        const user = await db.user.findFirst({
            where:{
                id
            }
        });
        return user;
    }
    catch{
        return null;
    }
};

export const fetchAllUsers = async () => {
    try{
        const user = await db.user.findMany();
        return user;
    }
    catch{
        console.log("error");
        return null;
    }
};


