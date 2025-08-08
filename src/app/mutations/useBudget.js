import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const updateTripBudget = async ({ tripId, newBudget }) => {
  const res = await fetch(`/api/trip/${tripId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ budget: newBudget }),
  });

  if (!res.ok) throw new Error("Failed to update budget");
  return res.json();
};

export function useBudgetMutation() {
  return useMutation({
    mutationFn: updateTripBudget,
    onSuccess: (data) => {
      toast.success("Budget updated!");
      queryClient.invalidateQueries({ queryKey: ["trip", trip.id] });
    },
    onError: () => {
      toast.error("Failed to update budget");
    },
  });
}

// Custom hook to handle budget increase/decrease
export function useBudgetHandlers(trip) {
  const mutation = useBudgetMutation();

  const increaseBudget = () => {
    if (!trip?.userBudget) return;
    const newBudget = trip.userBudget + 5000;
    mutation.mutate({ tripId: trip.id, newBudget });
  };

  const decreaseBudget = () => {
    if (!trip?.userBudget) return;
    const newBudget = Math.max(0, trip.userBudget - 5000);
    mutation.mutate({ tripId: trip.id, newBudget });
  };

  return { increaseBudget, decreaseBudget, ...mutation };
}
