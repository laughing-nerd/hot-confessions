"use client";
import { useEffect, useState } from "react";
import ConfessionCard from "@/app/components/Card";
import Loader from "@/app/components/Loader";
import { CardItemProps } from "@/app/types/types"
import AddConfession from "@/app/components/AddConfession";
import { useRouter } from "next/navigation";

const Confessions = () => {
  const [allConfessions, setAllConfessions] = useState([]);
  const router = useRouter()

  useEffect(() => {
    fetch("/api/fetchConfessions", {
      method: "GET",
      cache: "no-store"
    })
      .then(response => {
        if (response.ok)
          return response.json()
        else
          return
      })
      .then(data => {
        setAllConfessions(data)
      })
      .catch(err => {
        console.log(err)
        router.push("/")

      })
  }, [])

  return (
    <>
      <div className="relative bg-secondary h-full w-full">

        <div className="flex flex-wrap justify-center items-center lg:gap-24 gap-5 w-full h-full overflow-auto absolute py-10">
          {allConfessions.length > 0
            ? allConfessions.map((item: CardItemProps, index) => {
              const cmt = item && item.comments ? item.comments.length : 0;
              return (
                <ConfessionCard
                  key={index}
                  id={item.$id}
                  confession={item.confession}
                  commentNumber={cmt}
                  createdAt={item.$createdAt}
                />
              );
            })
            : <Loader caption="Fetching confessions 🤫" />
          }

        </div>
        {allConfessions.length > 0 ? <AddConfession /> : null}
      </div>

    </>
  )
}

export default Confessions;
export const dynamic = "force-dynamic"
