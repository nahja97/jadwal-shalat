import React, { useLayoutEffect, FC, useEffect } from "react"

const Default: FC<{}> = ({ children }) => {
  return <>
    <div className="login_page">
      {children}
    </div>
  </>
  
}

export default Default
