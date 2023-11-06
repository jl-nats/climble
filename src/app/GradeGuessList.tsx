import { cookies } from "next/headers";
import "./globals.css";
import ShareButton from "./ShareButton";

export default async function GradeGuessList(props: {
  grade: number;
  id: number;
}) {
  const guessData = cookies().get("guesses")?.value;
  const guessArray = guessData ? guessData.split("|") : [];
  const grade = props.grade;
  const finished = cookies().get("finished")?.value === "true";
  const won = cookies().get("won")?.value === "true";
  const guessCount = cookies().get("guessCount")?.value;

  return (
    <div>
      <ul className="flex flex-col items-center">
        {guessArray.map((entry: String) => (
          <li
            className={
              "flex flex-row justify-evenly mt-2 items-center rounded fade-in-image" +
              (grade.toString() != entry[1] ? " bg-red-600 " : " bg-green-500")
            }
            key={"V" + entry}
            style={{
              width: "100px",
            }}
          >
            <div>{entry}</div>
            <div>
              {grade.toString() == entry[1]
                ? "☑️"
                : grade < parseInt(entry[1])
                ? "⬇️"
                : "⬆️"}
            </div>
          </li>
        ))}

        {finished && (
          <li>
            <div className="flex flex-col items-center mt-2 fade-in-image">
              <p>{won ? "Good job!" : "Unlucky :("}</p>
              <ShareButton
                {...props}
                guessArray={guessArray}
                won={won}
                guessCount={guessCount ?? "0"}
              />
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}
