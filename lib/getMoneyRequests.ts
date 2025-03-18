"use server";
import { db } from "./db";

export const getMoneyRequests = async (id: string) => {
  try {
    const response = await db.user.findFirst({
      where: {
        id,
      },
      include: {
        sentRequests: {
          include: {
            receiver: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        receivedRequests: {
            include: {
                sender: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
        },
      },
    });
    // console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};
