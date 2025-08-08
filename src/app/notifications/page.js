"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  initiateSocket,
  listenForMessages,
  sendMessage,
  disconnectSocket,
} from "@/app/_Helper Functions/socket";
import HeaderMinimal from "../_components/HeaderMinimal";
import { toast } from "sonner";

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [invites, setInvites] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptingId, setAcceptingId] = useState(null);

  //reject

  const reject = async (inviteId) => {
    try {
      const res = await fetch("/api/users/Reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId }),
      });

      if (!res.ok) throw new Error("Failed to reject");

      toast.success("Invite rejected successfully");

      // Optional: Refetch invites or update UI here
    } catch (err) {
      toast.error("Failed to reject");
      console.error(err);
    }
  };

  // Fetch invites and separate accepted ones
  const fetchInvites = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users/Recieve?userId=${session.user.id}`);
      const data = await res.json();
      setInvites(data);
      setFriends(data.filter((invite) => invite.status === "accepted"));
    } catch (err) {
      toast.error("Error fetching invites", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) fetchInvites();
  }, [session]);

  useEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      initiateSocket(userId);
      listenForMessages((msg) => {
        console.log("📨 New message:", msg);
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [session]);

  const acceptInvite = async (inviteId) => {
    try {
      setAcceptingId(inviteId);
      const res = await fetch("/api/users/Accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inviteId }),
      });

      if (!res.ok) throw new Error("Failed to accept invite");

      await fetchInvites(); // 🔄 Refresh state after accepting
    } catch (err) {
      console.error(err);
    } finally {
      setAcceptingId(null);
    }
  };

  const startChatWith = (friendId) => {
    sendMessage({
      to: friendId,
      message: "👋 Hello friend!",
    });
    console.log(`Started chat with ${friendId}`);
  };

  const getUserInfo = (invite) => {
    const currentUserId = session?.user?.id;
    return invite.from._id === currentUserId ? invite.to : invite.from;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8 shadow-md h-screen">
      <HeaderMinimal />

      <h1 className="text-3xl font-bold text-gray-800 mb-4">Notifications</h1>

      {/* === Pending Invites === */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Pending Invites</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : invites.filter((i) => i.status === "pending").length === 0 ? (
          <p className="text-sm text-gray-500 italic">No new invites.</p>
        ) : (
          <div className="space-y-3">
            {invites
              .filter((invite) => invite.status === "pending")
              .map((invite) => {
                const user = getUserInfo(invite);
                return (
                  <div
                    key={invite._id}
                    className="bg-white border rounded-xl px-5 py-4 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.name} invited you to join a trip to{" "}
                        <span className="font-semibold">
                          {invite?.tripName || "no trip name"}
                        </span>
                      </p>

                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => acceptInvite(invite._id)}
                      disabled={acceptingId === invite._id}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition"
                    >
                      {acceptingId === invite._id ? "Accepting..." : "Accept"}
                    </button>
                    <button
                      onClick={() => reject(invite._id)}
                      className="bg-red-600 px-4 py-1 text-white rounded-sm hover:bg-red-800 "
                    >
                      Reject
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </section>

      {/* === Friends List === */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Friends</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : friends.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No friends yet. 🫤</p>
        ) : (
          <div className="space-y-3">
            {friends.map((friend) => {
              const friendUser = getUserInfo(friend);
              return (
                <div
                  key={friend._id}
                  className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 shadow-sm flex justify-between items-center"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-200 text-white rounded-full flex items-center justify-center text-sm font-bold uppercase">
                      {friendUser.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {friendUser.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {friendUser.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => startChatWith(friendUser._id)}
                    className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  >
                    Chat 💬
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
