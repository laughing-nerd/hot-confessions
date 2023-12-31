"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from "next-share";
import { usePathname } from "next/navigation"
import { ShowToast } from "@/app/components/Alert";
import { ParamsType, UserDataType } from "@/app/types/types"
import Loader from "@/app/components/Loader";
import Link from "next/link";
import { client } from "@/appwrite/config";
import TimeDiff from "@/app/components/TimeDiff";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import EmojiPicker from "@/app/components/EmojiPicker";

const Page = (props: ParamsType) => {
  const [showSpinner, setShowSpinner] = useState(false)
  const comment = useRef<HTMLInputElement>(null!)
  const [userData, setUserData] = useState<UserDataType & Models.Document>()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    fetch("/api/findUser", {
      method: "POST",
      body: JSON.stringify({ userid: props.params.id })
    })
      .then(resp => resp.json())
      .then(data => setUserData(data))
      .catch(err => {
        console.log(err)
        router.push("/confessions")
      })

    const unsubscribe = client.subscribe(`databases.${process.env.NEXT_PUBLIC_DATABASE_ID!}.collections.${process.env.NEXT_PUBLIC_COLLECTION_ID!}.documents`, (response) => {
      if (response.events.includes(`databases.*.collections.*.documents.${props.params.id}.update`)) {
        setUserData(response.payload as UserDataType & Models.Document | undefined)
      }

    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowSpinner(true)
    if (comment.current.value.length != 0) {
      const data = await fetch("/api/postComment", {
        method: "POST",
        body: JSON.stringify({ id: props.params.id, comment: comment.current.value })
      })
      const res = await data.json()
      if (res.success) {
        ShowToast({ message: "Comment added successfully 🎉", category: "success" })
        comment.current.value = ""
        setShowSpinner(false)

      }
      else {
        ShowToast({ message: "Your comment could not be added. Try again later", category: "error" })
        setShowSpinner(false)
      }
    }
    else {
      ShowToast({ message: "Your comment could not be added. Try again later", category: "error" })
      setShowSpinner(false)
    }
  }

  return (
    <>
      {userData !== undefined ?
        <div className="flex flex-col relative lg:justify-between h-full lg:flex-row bg-secondary p-4 overflow-hidden">
          <div className="py-4">
            <div className="h-[33vh] lg:h-[48vh] lg:w-[55vw] bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_rgb(0,0,0)] p-5 break-words overflow-y-auto animate-load">
              <div className="flex flex-col h-full justify-between">
                <div>{userData.confession}</div>
                <div className="text-accent-green text-right"><TimeDiff createdAt={userData.$createdAt} /></div>
              </div>
            </div>

            <div className="my-3 lg:w-[55vw] flex gap-3 items-center justify-center animate-load">
              <span className="font-bold lg:text-xl">Share on&nbsp;</span>
              <FacebookShareButton url={`${process.env.NEXT_PUBLIC_URL!}${pathname}`} hashtag={'#confession'}><FacebookIcon size={32} round /></FacebookShareButton>
              <WhatsappShareButton url={`${process.env.NEXT_PUBLIC_URL!}${pathname}`}><WhatsappIcon size={32} round /></WhatsappShareButton>
              <TwitterShareButton url={`${process.env.NEXT_PUBLIC_URL!}${pathname}`}><TwitterIcon size={32} round /></TwitterShareButton>
            </div>

            <div className="my-3 lg:w-[55vw] flex justify-center items-center gap-3">
              <Link className="bg-accent-red border-2 border-black py-1 text-sm px-3 lg:text-lg hover:bg-accent-red-dark transition-all duration-[0.1s]" href="/confessions">👈🏼 See all confessions</Link>
              <Link className="bg-accent-red border-2 border-black py-1 text-sm px-3 lg:text-lg hover:bg-accent-red-dark transition-all duration-[0.1s]" href="/">✏️  Write a confession</Link>
            </div>

            <div className="hidden lg:w-[55vw] lg:flex my-20 items-center justify-center gap-3 animate-load">
              <Image src="/amongus.gif" height={128} width={128} alt="amongus" />
              <div className="text-xl">Try not to spill the beans even if you know who this person is 😜</div>
            </div>


          </div>

          <div className="h-[45%] py-3 lg:h-[88vh] lg:w-[40vw] overflow-y-hidden animate-load">
            Comments ({userData ? userData.comments.length : 0})
            <div className="overflow-y-auto h-full">

              {userData && userData.comments.length ? userData.comments.map((comment, index) => {
                return (
                  <div className="py-2 px-4 my-3 bg-accent-yellow border-black border-2 break-words" key={index}>
                    {comment}
                  </div>
                )
              })
                : <div className="my-3">
                  No Comments yet :(
                </div>}
            </div>
          </div>

          <div className="lg:absolute lg:bottom-0 lg:right-0 lg:mx-4 w-full lg:w-[40vw]">
            <form className="flex justify-center items-center animate-load" onSubmit={handleSubmission}>

              <EmojiPicker reference={comment} style="hidden lg:block items-center focus:outline-0 py-2 px-1 bg-white rounded-l-lg border-l-2 border-t-2 border-b-2 border-black shadow-[4px_4px_0px_rgb(0,0,0)] cursor-pointer" />

              <input type="text" ref={comment} placeholder="Add a comment" className="focus:outline-0 w-full lg:w-[94%] text-black py-3 px-3 my-3 border-2 rounded-l-lg lg:rounded-l-none lg:border-l-0 border-black shadow-[4px_4px_0px_rgb(0,0,0)]" />
              <button type="submit" className="rounded-r-lg p-3 bg-accent-green border-2 border-black shadow-[4px_4px_0px_rgb(0,0,0)] hover:bg-accent-green-dark transition-all duration-[0.1s]" disabled={showSpinner}>
                {!showSpinner
                  ? <svg fill="#000" height="24px" width="24px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                    <path d="M508.645,18.449c-2.929-2.704-7.133-3.51-10.826-2.085L6.715,204.446c-3.541,1.356-6.066,4.515-6.607,8.264c-0.541,3.75,0.985,7.496,3.995,9.796l152.127,116.747c-0.004,0.116-0.575,0.224-0.575,0.342v83.592c0,3.851,2.663,7.393,6.061,9.213c1.541,0.827,3.51,1.236,5.199,1.236c2.026,0,4.181-0.593,5.931-1.756l56.12-37.367l130.369,99.669c1.848,1.413,4.099,2.149,6.365,2.149c1.087,0,2.186-0.169,3.248-0.516c3.27-1.066,5.811-3.672,6.786-6.974L511.571,29.082C512.698,25.271,511.563,21.148,508.645,18.449z M170.506,321.508c-0.385,0.36-0.7,0.763-1.019,1.163L31.659,217.272L456.525,54.557L170.506,321.508z M176.552,403.661v-48.454l33.852,25.887L176.552,403.661z M359.996,468.354l-121.63-93.012c-1.263-1.77-2.975-3.029-4.883-3.733l-47.29-36.163L480.392,60.86L359.996,468.354z"></path>
                  </svg>
                  : <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <style>{`.spinner_6kVp{transform-origin:center;animation:spinner_irSm .75s infinite linear}@keyframes spinner_irSm{100%{transform:rotate(360deg)}`}</style>
                    <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" className="spinner_6kVp" fill="#ffffff" />
                  </svg>
                }
              </button>
            </form>
          </div >
        </div >
        : <Loader caption="Loading confession" />
      }

    </>
  )
}
export default Page;
