import React, { Children, FC } from "react"
import styles from '../../styles/LoginLayout.module.css';

// eslint-disable-next-line @typescript-eslint/ban-types
const Login: FC<{}> = ({ children }) => {
    return <>
      <main className={styles.login_page}>
        <div className={styles.container}>
         {children}
        </div>
      </main>
    </>
  }

export default Login
