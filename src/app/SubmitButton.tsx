"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton(props: { finished: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={
        "bg-slate-500 p-1 ml-8 rounded " +
        (props.finished ? "" : "hover:bg-slate-600")
      }
      type="submit"
      disabled={props.finished || pending}
    >
      Guess
    </button>
  );
}
