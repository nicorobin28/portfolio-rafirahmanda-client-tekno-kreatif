import Image from "next/image";
import ListPortfolio from "@/components/dashboard/ListPortfolio";
import MorphText from "@/components/ui/MorphText";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-white">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-white sm:items-start">
        <div className="flex gap-[64px]">
          <div className="flex items-end h-[84px] font-semibold w-[600px]">
            {/* <p className="text-black text-[72px]">Rafi Rahmanda</p> */}
            {/* <MorphText /> */}
          </div>
          <div className="flex flex-row justify-between items-end gap-[24px] h-[64px]">
            <p className="text-black text-[24px] w-[270px]">UI/UX Designer</p>
            <p className="text-black text-[24px] w-[270px]">PHNOM PENH, KH</p>
          </div>
        </div>
      </main>
      <div>
        <ListPortfolio />
      </div>
    </div>
  );
}
