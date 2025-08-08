"use client";
import { useState } from "react";
import PrimaryButton from "../_components/Button2"; // Make sure this path matches your button file

export default function ViewMoreWrapper({ children, initialCount = 3 }) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [expanded, setExpanded] = useState(false);

  const items = Array.isArray(children) ? children : [children];

  const toggleView = () => {
    if (expanded) {
      setVisibleCount(initialCount);
      setExpanded(false);
    } else {
      setVisibleCount(items.length);
      setExpanded(true);
    }
  };

  const shouldShowToggle = items.length > initialCount;

  return (
    <div className="space-y-4">
      {items.slice(0, visibleCount)}

      {shouldShowToggle && (
        <div className="text-center">
          <PrimaryButton onClick={toggleView} className="mt-4">
            {expanded ? "View Less" : "View More"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
