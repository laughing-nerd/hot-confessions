"use client"
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { ShowToast } from "./Alert";
import EmojiPicker from "./EmojiPicker";

const ConfessionBox = () => {
  const confession = useRef<HTMLTextAreaElement>(null!)
  const characterCount = useRef<HTMLSpanElement>(null!)
  const [showSpinner, setShowSpinner] = useState(false)

  const postConfession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true)
    const response: Response = await fetch("/api/postConfession", {
      method: "POST",
      body: JSON.stringify(confession.current.value)
    });
    const res = await response.json();
    if (res.success) {
      ShowToast({ message: "Hooray🥳 Your confession has been added", category: "success" })
      confession.current.value=""
      setShowSpinner(false)
    }
    else {
      ShowToast({ message: res.message, category: "error" })
      setShowSpinner(false)
    }
  }

  return (
    <>
      <form className="flex items-center flex-col z-10 animate-load" onSubmit={postConfession}>
        <div className="relative">
          <textarea
            maxLength={2000}
            ref={confession}
            onChange={(e) => {
              if (e.target.value.length <= 2000) {
                confession.current.value = e.target.value
                characterCount.current.innerHTML = e.target.value.length.toString()
              }
            }}
            className="focus:outline-0 overflow-y-auto resize-none w-[90vw] pt-2 pb-9 px-3 border-[3px] border-black h-[35vh] md:h-[50vh] shadow-[4px_4px_0px_rgb(0,0,0)] bg-white rounded-lg"
            placeholder="Start confessing now!" />
          <div className="flex justify-between bg-white absolute bottom-2 w-full border-l-[3px] border-r-[3px] border-black rounded-b-lg px-3 pb-1">

            <EmojiPicker reference={confession} style="hidden lg:block items-center focus:outline-0 py-2 px-1 cursor-pointer" />

            <div className="text-gray-400 flex items-center"><span ref={characterCount}>0</span>/2000</div>
            <button type="submit" disabled={showSpinner}>
              {!showSpinner
                ? <svg height="30px" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve">
                  <path d="M508.645,18.449c-2.929-2.704-7.133-3.51-10.826-2.085L6.715,204.446c-3.541,1.356-6.066,4.515-6.607,8.264c-0.541,3.75,0.985,7.496,3.995,9.796l152.127,116.747c-0.004,0.116-0.575,0.224-0.575,0.342v83.592c0,3.851,2.663,7.393,6.061,9.213c1.541,0.827,3.51,1.236,5.199,1.236c2.026,0,4.181-0.593,5.931-1.756l56.12-37.367l130.369,99.669c1.848,1.413,4.099,2.149,6.365,2.149c1.087,0,2.186-0.169,3.248-0.516c3.27-1.066,5.811-3.672,6.786-6.974L511.571,29.082C512.698,25.271,511.563,21.148,508.645,18.449z M170.506,321.508c-0.385,0.36-0.7,0.763-1.019,1.163L31.659,217.272L456.525,54.557L170.506,321.508z M176.552,403.661v-48.454l33.852,25.887L176.552,403.661z M359.996,468.354l-121.63-93.012c-1.263-1.77-2.975-3.029-4.883-3.733l-47.29-36.163L480.392,60.86L359.996,468.354z"></path>
                </svg>
                : <svg width="30" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <style>{`.spinner_6kVp{transform-origin:center;animation:spinner_irSm .75s infinite linear}@keyframes spinner_irSm{100%{transform:rotate(360deg)`}</style>
                  <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" className="spinner_6kVp" fill="black" />
                </svg>

              }
            </button>
          </div>
        </div>
        <div className="my-4">
          <Link href="/confessions" className="border-[3px] border-black py-2 px-5 overflow-hidden bg-accent-yellow hover:bg-accent-yellow-dark transition-all duration-[0.1s] font-medium text-xl">See all Confessions</Link>
        </div>
      </form>
    </>
  )
}

export default ConfessionBox
