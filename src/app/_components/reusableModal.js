// components/ConfirmModal.jsx
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "@headlessui/react";

export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 focus:outline-none"
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Are you sure?
            </DialogTitle>
            <p className="text-gray-600 mt-2">
              This action will permanently delete the trip.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
