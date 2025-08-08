export function AcceptedList({ friends, loading, getUserInfo }) {
  return (
    <section>
      {/* === Friends List === */}
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
                    <p className="text-sm text-gray-600">{friendUser.email}</p>
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
  );
}
