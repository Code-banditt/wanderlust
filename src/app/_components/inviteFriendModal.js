"use client";
import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import Button from "./Button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function InviteFriendModal({ isOpen, onClose, trip }) {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (email) {
        setLoading(true);
        fetch(`/api/users/find?email=${email}`)
          .then((res) => {
            if (!res.ok) throw new Error("Not found");
            return res.json();
          })
          .then((data) => {
            setResult(data);
            setEmail(data.email);
            setNotFound(false);
          })
          .catch(() => {
            setResult(null);
            setNotFound(true);
          })
          .finally(() => setLoading(false));
      } else {
        setResult(null);
        setNotFound(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [email]);

  //send invite
  const sendInvite = async () => {
    const res = await fetch("/api/users/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fromId: session.user.id,
        toEmail: email,
        tripName: trip?.destination?.name,
      }),
    });

    console.log(trip);

    const data = await res.json();
    if (!res.ok) return alert(data.error || "Failed to send invite");
    toast.success("Invite sent!");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow">
          <Dialog.Title className="text-lg font-semibold mb-2">
            Invite a Friend
          </Dialog.Title>

          <input
            type="email"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />

          <div className="mt-4 min-h-[50px]">
            {loading && <p className="text-sm text-gray-500">Searching...</p>}

            {result && (
              <div className="border p-3 rounded-md flex items-center justify-between">
                <div>
                  <p className="font-medium">{result.name}</p>
                  <p className="text-sm text-gray-500">{result.email}</p>
                </div>
                <Button onClick={sendInvite}>Invite</Button>
              </div>
            )}

            {notFound && !loading && (
              <p className="text-red-500 text-sm mt-2">User not found</p>
            )}
          </div>

          <div className="mt-6 text-right">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
