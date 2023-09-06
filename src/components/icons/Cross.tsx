import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCross = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M12 13.466 22.154 23.62l1.414-1.415-10.154-10.153L24 1.466 22.586.052 12 10.637 1.414.052 0 1.466l10.586 10.586L.432 22.206l1.414 1.414L12 13.466Z"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgCross