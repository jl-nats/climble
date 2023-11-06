"use client";
export default function ShareButton(props: {
  id: number;
  guessArray: string[];
  grade: number;
  won: boolean;
  guessCount: string;
}) {
  async function writeResults() {
    navigator.clipboard.writeText(
      "Climble #" +
        props.id +
        "\n" +
        props.guessArray
          .map((entry: string) =>
            props.grade.toString() == entry[1]
              ? "🟩☑️\n"
              : props.grade < parseInt(entry[1])
              ? "🟥⬇️\n"
              : "🟥⬆️\n"
          )
          .join("") +
        (props.won ? props.guessCount : "X") +
        "/4"
    );
  }
  return (
    <button
      className="mt-2 bg-slate-500 hover:bg-slate-600 p-1 rounded"
      onClick={writeResults}
    >
      📋 Share
    </button>
  );
}
