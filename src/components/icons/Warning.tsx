import * as React from 'react'
import type { SVGProps } from 'react'

const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={22}
    fill="none"
    viewBox="0 0 25 22"
    {...props}
  >
    <path
      d="M0 22L12.5 0L25 22H0ZM3.27651 20.0702H21.7235L12.5 3.85964L3.27651 20.0702ZM12.5791 18.5842C12.8483 18.5842 13.0729 18.4914 13.2528 18.3058C13.4328 18.1202 13.5227 17.8903 13.5227 17.6159C13.5227 17.3416 13.4317 17.1127 13.2495 16.9294C13.0674 16.7461 12.8417 16.6544 12.5724 16.6544C12.3032 16.6544 12.0786 16.7472 11.8987 16.9328C11.7188 17.1184 11.6288 17.3484 11.6288 17.6227C11.6288 17.897 11.7199 18.1259 11.902 18.3092C12.0841 18.4925 12.3098 18.5842 12.5791 18.5842ZM11.6288 15.2842H13.5227V9.03158H11.6288V15.2842Z"
      fill="currentColor"
    />
  </svg>
)

export default SvgWarning