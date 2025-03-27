"use client"
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";
import { useEffect, useTransition } from "react";
import { fetchUserbyEmail } from "@/lib/getUser";
import LoadingWidget from '@/components/LoadingWidget';
export default function AdminDashboard() {
  const router = useRouter();
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  // Check if user is not logged in or not an admin
  useEffect(() => {
    startTransition(()=>{
      if (user)
        fetchUserbyEmail(user.emailAddresses[0]?.emailAddress).then((data) => {
          if (data) {
            if (data.role !== "ADMIN") {
              router.push("/");
            }
          }
        });

    })
  }, [router, user]);

  return (<>
    {(isPending)? <LoadingWidget/> :<div>
      <h1>Admin Dashboard</h1>
      {/* Admin-only content */}
    </div>
    }
    </>
  );
}
