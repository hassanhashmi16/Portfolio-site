"use client";

import { useState } from "react";

// Submit button that asks for confirmation first. Prevents accidental deletes.
export default function ConfirmButton({ children, className = "admin-mini", message = "Delete this item? This cannot be undone." }) {
  const [armed, setArmed] = useState(false);

  return (
    <button
      type="submit"
      className={`${className}${armed ? " is-armed" : ""}`}
      onClick={(event) => {
        if (!armed) {
          event.preventDefault();
          setArmed(true);
        }
      }}
      onBlur={() => setArmed(false)}
    >
      {armed ? "Confirm?" : children}
    </button>
  );
}
