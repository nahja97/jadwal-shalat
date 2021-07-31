import React, { useLayoutEffect, FC, useEffect } from "react"

// eslint-disable-next-line @typescript-eslint/ban-types
const Default: FC<{}> = ({ children }) => {
  return <>
    <main className="default_page">
      {children}
    </main>
  </>
  
}

export default Default
