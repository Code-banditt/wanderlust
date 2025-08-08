"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function NotificationsPanel() {
  const { data: session } = useSession();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/users/friends?userId=${session.user.id}`);
      const data = await res.json();
      setFriends(data?.friends || []);
    };

    fetchFriends();
  }, [session]);

  const startChatWith = (friendId) => {
    console.log("Starting chat with", friendId);
    // Redirect to chat or open modal
  };

  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>

      {friends.length === 0 ? (
        <p className="text-gray-500 text-sm">No new invites</p>
      ) : (
        friends.map((friend) => {
          const isFromCurrentUser = friend.from === session?.user?.id;
          const friendUser = isFromCurrentUser
            ? friend.toUser
            : friend.fromUser;

          return (
            <div
              key={friend._id}
              className="flex justify-between items-center py-3 border-b border-gray-100"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {friendUser?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {friend.status === "accepted"
                    ? "Friend request accepted"
                    : friend.status === "pending"
                      ? "Pending invite"
                      : "Unknown status"}
                </p>
              </div>

              {friend.status === "accepted" && (
                <button
                  onClick={() => startChatWith(friendUser._id)}
                  className="text-sm px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Chat
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
