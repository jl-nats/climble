import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import SubmitButton from "./SubmitButton";

export default function GradeGuessForm(props: { grade: number }) {
  async function submit(formData: FormData) {
    "use server";

    const gradeGuess = formData.get("gradeGuess");
    const guessData = cookies().get("guesses")?.value;
    const now = new Date();
    const midnight = now.setUTCHours(23, 59, 59, 0);
    const options = { expires: midnight };

    if (cookies().get("guessCount")?.value === undefined) {
      cookies().set("guessCount", "0");
    }

    const guessCount = cookies().get("guessCount")?.value;

    if (gradeGuess) {
      if (guessData) {
        const newGuessData = guessData + "|" + gradeGuess;
        cookies().set("guesses", newGuessData, options);
        cookies().set(
          "guessCount",
          (parseInt(guessCount ?? "0") + 1).toString(),
          options
        );
      } else {
        const newGuessData = gradeGuess.toString();
        cookies().set("guesses", newGuessData, options);
        cookies().set(
          "guessCount",
          (parseInt(guessCount ?? "0") + 1).toString(),
          options
        );
      }
      const boulderGrade = props.grade;

      if (parseInt(cookies().get("guessCount")?.value ?? "0") >= 4) {
        cookies().set("finished", "true", options);
      }

      if (boulderGrade === parseInt(gradeGuess.toString()[1])) {
        cookies().set("won", "true", options);
        cookies().set("finished", "true", options);
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
        <SubmitButton finished={finished === "true"} />
      </form>
    </div>
  );
}
