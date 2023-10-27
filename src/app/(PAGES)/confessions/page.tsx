"use client";
import { useEffect, useState } from "react";
import ConfessionCard from "@/app/components/Card";
import Loader from "@/app/components/Loader";
import AddConfession from "@/app/components/AddConfession";
import { databases } from "@/appwrite/config";
import { Models, Query } from "appwrite";
import { useRouter } from "next/navigation";

const Confessions = () => {
  const [allConfessions, setAllConfessions] = useState<Models.Document[]>([]);
  const router = useRouter()

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const info = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!, [Query.orderDesc("$createdAt")])
        setAllConfessions(info.documents)
      }
      catch (err) {
        console.log(err)
        router.push("/")
      }
    }
    fetchConfessions()
  }, [])

  return (
    <>
      <div className="relative bg-secondary h-full w-full">

        <div className="flex flex-wrap justify-center items-center lg:gap-24 gap-5 w-full h-full overflow-auto absolute py-10">
          {allConfessions.length > 0
            ? allConfessions.map((item: Models.Document, index) => {
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
export const revalidate = 0;
