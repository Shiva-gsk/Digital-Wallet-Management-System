
import { redirect } from "next/navigation"
import { useUser } from "@clerk/nextjs";
export default function AdminDashboard() {
  

  const {user} = useUser();
  // Check if user is not logged in or not an admin
  

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin-only content */}
    </div>
  )
}
