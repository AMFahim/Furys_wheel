import { UserProfile } from "@/components/user-profile"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a2e] text-white p-4 flex items-center justify-center">
      <UserProfile
        username="Alex Johnson"
        avatarUrl="/placeholder.svg?height=100&width=100"
        userRank={1}
        claimedGifts={[
          { name: "Fortune Wheel", type: "wheel", claimedAt: "2 mins ago" },
          { name: "500 Coins", type: "currency", claimedAt: "2 mins ago" },
          { name: "Mystery Box", type: "item", claimedAt: "1 day ago" },
          { name: "VIP Access", type: "status", claimedAt: "3 days ago" },
        ]}
      />
    </main>
  )
}
