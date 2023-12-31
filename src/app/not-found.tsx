"use client"

import Link from "next/link"

const Error = () => {
  return (
    <>
      <div className="w-full h-full bg-accent-yellow flex justify-center items-center flex-col">
        <svg width="128px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" fill-opacity="0.01" />
          <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linejoin="round" />
          <path d="M24 29C29 29 31 33 31 33H17C17 33 19 29 24 29Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M32 17L29 20L32 23" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M16 17L19 20L16 23" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <p className="my-2 font-bold uppercase text-3xl text-center">Uh Oh... Something went wrong</p>
        <p className="my-2 text-xl text-center">Go to <Link href="/" className="text-secondary-dark underline">Homepage</Link></p>
      </div>
    </>
  )
}

export default Error
