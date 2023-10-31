import Link from "next/link";
import Image from "next/image";
import { CardProps } from "../types/types";
import TimeDiff from "./TimeDiff";

const LIMIT_NORMAL = 225 // Display character limit

const Card = (props: CardProps) => {
  const diff = TimeDiff({ createdAt: props.createdAt })
  return (
    <>
      <div className="animate-load
      w-[90vw] h-[25vh] bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_rgb(0,0,0)] cursor-pointer z-10 relative
        sm:w-[41vw]
        xl:w-[25vw]
        transition-all duration-[0.1s] hover:bg-gray-200
      ">

        <Image className={`${diff.includes("minute")||diff.includes("now") ? "block" : "hidden"} absolute right-[-2%] top-[-10%]`} src="/stars.gif" width={32} height={32} alt="stars" />

        <Link href={`/confessions/${props.id}`}>
          <div className="h-[85%] p-4 break-words text-justify overflow-y-auto">{
            props.confession.length < LIMIT_NORMAL
              ? props.confession
              : <span>{props.confession.substring(0, LIMIT_NORMAL)}<span className="text-accent-red">...Read more</span></span>

          }</div>
          
          <div className="flex justify-between mx-4">
            <div className="text-accent-green drop-shadow-lg">💬 {props.commentNumber}</div>
            <div className="text-accent-green drop-shadow-lg"><TimeDiff createdAt={props.createdAt} /></div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Card;
