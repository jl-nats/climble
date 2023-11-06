import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function GradeGuessForm(props: { grade: number }) {
  async function submit(formData: FormData) {
    "use server";

    const gradeGuess = formData.get("gradeGuess");
    const guessData = cookies().get("guesses")?.value;

    if (cookies().get("guessCount")?.value === undefined) {
      cookies().set("guessCount", "0");
    }

    const guessCount = cookies().get("guessCount")?.value;

    if (gradeGuess) {
      if (guessData) {
        const newGuessData = guessData + "|" + gradeGuess;
        cookies().set("guesses", newGuessData);
        cookies().set(
          "guessCount",
          (parseInt(guessCount ?? "0") + 1).toString()
        );
      } else {
        const newGuessData = gradeGuess.toString();
        cookies().set("guesses", newGuessData);
        cookies().set(
          "guessCount",
          (parseInt(guessCount ?? "0") + 1).toString()
        );
      }
      const boulderGrade = props.grade;

      if (parseInt(cookies().get("guessCount")?.value ?? "0") >= 4) {
        cookies().set("finished", "true");
      }

      if (boulderGrade === parseInt(gradeGuess.toString()[1])) {
        cookies().set("won", "true");
        cookies().set("finished", "true");
      }
    }

    revalidatePath("/");
  }

  const guessData = cookies().get("guesses")?.value;
  const guessArray = guessData ? guessData.split("|") : [];
  const won = cookies().get("won")?.value;
  const finished = cookies().get("finished")?.value;
  return (
    <div className="flex flex-col mb-3">
      <form action={submit}>
        <select className="rounded p-1" name="gradeGuess">
          {Array.from(Array(10).keys()).map((value) => (
            <option
              value={"V" + value}
              key={value}
              disabled={guessArray.includes("V" + value)}
            >
              {"V" + value}
            </option>
          ))}
        </select>
        <button
          className={
            "bg-slate-500 p-1 ml-8 rounded " +
            (finished === "true" ? "" : "hover:bg-slate-600")
          }
          type="submit"
          disabled={finished === "true"}
        >
          Guess
        </button>
      </form>
    </div>
  );
}
