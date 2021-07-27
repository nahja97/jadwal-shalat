import React, { Children, FC } from "react"
import styles from '../../styles/LoginLayout.module.css';

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
