import ScrollToTopButton from "@/components/scrolltotop";
import { Heading } from "./_components/header";
import { LeftSec } from "./_components/leftsection";
import { RightSec } from "./_components/rightsection";

const MarketingPage = () => {
  
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 mx-10">
        <div className="flex gap-7">
          <div className="lg:block sm:hidden md:hidden max-w-[20rem]">
            <h1 className="text-start font-[600] text-[#969696]">Cricket</h1>
            <LeftSec />
          </div>
          <div className="bg-black w-[40rem] max-w-[40rem] max-h-[25rem]">
            <h1 className="text-start font-[600] text-[#969696]">Headlines</h1>
            <Heading />
          </div>
          <div className="lg:block sm:hidden md:hidden max-w-[20rem]">
            <h1 className="text-start font-[600] text-[#969696]">Others</h1>
            <RightSec />
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}  

export default MarketingPage;