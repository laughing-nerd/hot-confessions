import Link from "next/link";
import { CardProps } from "../types/types";
import TimeDiff from "./TimeDiff";

const LIMIT = 250 // Display character limit

const Card = (props: CardProps ) => {
  return (
    <>
      <div className="
      w-[90vw] h-[25vh] bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_rgb(0,0,0)] cursor-pointer z-10
        sm:w-[41vw]
        xl:w-[25vw]
      ">
        <Link href={`/confessions/${props.id}`}>
          <div className="h-[85%] p-4 break-words text-justify">{
            props.confession.length < LIMIT
              ? props.confession
              : <span>{props.confession.substring(0, LIMIT)}<span className="text-accent-red">...Read more</span></span>

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
