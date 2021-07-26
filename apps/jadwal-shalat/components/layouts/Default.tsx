import React, { useLayoutEffect, FC, useEffect } from "react"

const Default: FC<{}> = ({ children }) => {
  return <>
    <main className="default_page">
      {children}
    </main>
  </>
  
}

export default Default
