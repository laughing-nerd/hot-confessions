import Link from "next/link"

const AddConfession = () => {
  return (
    <Link href="/">
      <div className="absolute right-5 bottom-5 cursor-pointer z-20 animate-load" title="Write a confession">

        <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 62 62" fill="none">
          <g filter="url(#filter0_dd_1_267)">
            <circle cx="31" cy="29" r="27" fill="url(#paint0_linear_1_267)" />
          </g>


          <g transform="translate(17, 17)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M17.6588 3C17.4088 3 17.1488 3.1 16.9588 3.29L15.1288 5.12L18.8788 8.87L20.7088 7.04C21.0988 6.65 21.0988 6.02 20.7088 5.63L18.3688 3.29C18.1688 3.09 17.9188 3 17.6588 3ZM14.0588 9.02L14.9788 9.94L5.91878 19H4.99878V18.08L14.0588 9.02ZM2.99878 17.25L14.0588 6.19L17.8088 9.94L6.74878 21H2.99878V17.25Z" fill="white" />
            </svg>
          </g>

          <defs>
            <filter id="filter0_dd_1_267" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_267" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0" />
              <feBlend mode="normal" in2="effect1_dropShadow_1_267" result="effect2_dropShadow_1_267" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1_267" result="shape" />

            </filter>
            <linearGradient id="paint0_linear_1_267" x1="31" y1="2" x2="31" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F24E1E" />
              <stop offset="1" stopColor="#F0568A" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </Link>

  )
}

export default AddConfession
