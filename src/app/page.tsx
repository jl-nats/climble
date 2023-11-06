"use server";
import Image from "next/image";
import GradeGuessForm from "./GradeGuessForm";
import GradeGuessList from "./GradeGuessList";
import { boulderInfo } from "./config";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function Home() {
  async function getGuessCount() {
    if (cookies().get("guessCount") === undefined) return "0";
    const guessCount = cookies().get("guessCount")?.value;
    return guessCount;
  }

  const guessCount = await getGuessCount();

  return (
    <main className="flex bg-stone-900 min-h-screen flex-col items-center p-20">
      <header className="font-bold text-zinc-50 text-6xl">
        climble #{boulderInfo.id}
      </header>
      <div className="flex flex-row mt-20 border-8 border-stone-800 ">
        <div>
          <Image
            src={boulderInfo.url}
            alt="boulder route"
            width="350"
            height="350"
          />
        </div>
        <div className="flex flex-col items-center p-6 bg-orange-400 mx-auto">
          <p className="mb-3">Guess the grade: </p>
          <GradeGuessForm grade={boulderInfo.grade} />
          <div>
            <p>Guesses: {guessCount?.toString()}/4</p>
          </div>
          <GradeGuessList grade={boulderInfo.grade} id={boulderInfo.id} />
        </div>
      </div>
    </main>
  );
}
