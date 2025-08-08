import InviteFriendModal from "./inviteFriendModal";
import { FaUserPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Friends({ trip }) {
  const [showModal, setShowModal] = useState(false);
  const [allFriends, setAllFriends] = useState([]); // Replace with real state

  const handleInvite = (user) => {
    // Add as pending to UI
    setAllFriends((prev) => [...prev, { ...user, status: "Pending" }]);

    // TODO: Send actual invitation request (you'll build this next)
  };

  console.log(trip);

  return (
    <div className="p-4">
      {/* Invite Button */}
      <button
        className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition shadow text-sm"
        onClick={() => setShowModal(true)}
      >
        <FaUserPlus className="inline mr-2" />
        Invite Friend
      </button>

      {/* Modal */}
      <InviteFriendModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onInvite={handleInvite}
        trip={trip}
      />
    </div>
  );
}
