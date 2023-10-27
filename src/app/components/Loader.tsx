import { LoaderProps } from "../types/types"

const Loader = (props: LoaderProps) => {
  return (
    <div className="absolute top-0 left-0 flex flex-col justify-center items-center h-screen w-full bg-[#699BF7] z-20">
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="64" viewBox="0 0 24 24">
        <circle cx="1" cy="12" r="3" fill="#F24E1E" stroke="black" strokeWidth="1">
          <animate id="svgSpinners3DotsBounce0" attributeName="cy" begin="0;svgSpinners3DotsBounce1.end+0.25s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
        </circle>
        <circle cx="12" cy="12" r="3" fill="#0FA958" stroke="black" strokeWidth="1">
          <animate attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
        </circle>
        <circle cx="23" cy="12" r="3" fill="#FFC700" stroke="black" strokeWidth="1">
          <animate id="svgSpinners3DotsBounce1" attributeName="cy" begin="svgSpinners3DotsBounce0.begin+0.2s" calcMode="spline" dur="0.6s" keySplines=".33,.66,.66,1;.33,0,.66,.33" values="12;6;12" />
        </circle>
      </svg>
      <div className="text-lg font-bold">{props.caption}</div>
    </div>

  )
}

export default Loader
