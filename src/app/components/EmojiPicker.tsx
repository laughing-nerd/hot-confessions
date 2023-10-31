"use client"
import { RefObject, useState } from "react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const EmojiPicker = ({ reference, style }: { reference: RefObject<HTMLInputElement | HTMLTextAreaElement>; style: string }) => {
  const [showEmoji, setShowEmoji] = useState(false)

  return (
    <>
      {/* Emoji Picker icon */}
      <button className={style} type="button" onClick={()=>setShowEmoji(!showEmoji)}>
        {!showEmoji
          ? <svg className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9.011 9.011 0 0 1-9 9zm6-8a6 6 0 0 1-12 0 1 1 0 0 1 2 0 4 4 0 0 0 8 0 1 1 0 0 1 2 0zM8 10V9a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0zm6 0V9a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0z" /></svg>
          : <svg className="w-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z" /></svg>
        }
      </button>
      {/* Emoji Picker div */}
      <div className={`${showEmoji ? 'block' : 'hidden'} absolute bottom-16 lg:left-0`}>
        <Picker data={data} theme="light" onEmojiSelect={(emoji: { native: string }) => {
          if (reference.current !== null)
            reference.current.value = reference.current.value + emoji.native
        }} />
      </div>

    </>
  )
}

export default EmojiPicker
