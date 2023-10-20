import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="11"
    viewBox="0 0 17 11"
    fill="none"
    {...props}
  >
    <path d="M1 10L8.5 2L16 10" stroke="currentColor" stroke-width="2" />
  </svg>
)
export default SvgArrowUp