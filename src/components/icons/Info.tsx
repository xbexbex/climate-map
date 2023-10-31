import * as React from 'react'
import type { SVGProps } from 'react'
import { Box } from '@mui/system'

type Props = {
  sx?: any
}

const SvgInfo = (props: Props) => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    viewBox="0 0 23 23"
    {...props}
  >
    <path
      d="M10.5992 17.25H12.5158V10.35H10.5992V17.25ZM11.4997 8.165C11.7874 8.165 12.0287 8.06949 12.2236 7.87848C12.4184 7.68744 12.5158 7.45073 12.5158 7.16835C12.5158 6.8751 12.4185 6.62929 12.2239 6.43092C12.0292 6.23254 11.7881 6.13335 11.5003 6.13335C11.2126 6.13335 10.9713 6.23254 10.7764 6.43092C10.5816 6.62929 10.4842 6.8751 10.4842 7.16835C10.4842 7.45073 10.5815 7.68744 10.7761 7.87848C10.9708 8.06949 11.2119 8.165 11.4997 8.165ZM11.5051 23C9.91767 23 8.42587 22.6981 7.02969 22.0944C5.63351 21.4906 4.41473 20.6681 3.37332 19.6267C2.33194 18.5853 1.50937 17.366 0.905625 15.9689C0.301875 14.5718 0 13.0789 0 11.4904C0 9.90189 0.301875 8.40907 0.905625 7.01195C1.50937 5.61482 2.33194 4.39875 3.37332 3.36375C4.41473 2.32875 5.63398 1.50937 7.0311 0.905625C8.42824 0.301875 9.92106 0 11.5096 0C13.0981 0 14.5909 0.301875 15.988 0.905625C17.3852 1.50937 18.6012 2.32875 19.6362 3.36375C20.6712 4.39875 21.4906 5.61583 22.0944 7.015C22.6981 8.41417 23 9.90747 23 11.4949C23 13.0823 22.6981 14.5741 22.0944 15.9703C21.4906 17.3665 20.6712 18.5841 19.6362 19.6231C18.6012 20.6622 17.3842 21.4847 15.985 22.0908C14.5858 22.6969 13.0925 23 11.5051 23ZM11.5096 21.0834C14.1737 21.0834 16.4354 20.1506 18.2946 18.285C20.1538 16.4195 21.0834 14.1546 21.0834 11.4904C21.0834 8.82626 20.155 6.56458 18.2982 4.7054C16.4414 2.84623 14.1753 1.91665 11.5 1.91665C8.84222 1.91665 6.58055 2.84503 4.715 4.7018C2.84943 6.55859 1.91665 8.82466 1.91665 11.5C1.91665 14.1578 2.84943 16.4195 4.715 18.285C6.58055 20.1506 8.84541 21.0834 11.5096 21.0834Z"
      fill="currentColor"
    />
  </Box>
)

export default SvgInfo
