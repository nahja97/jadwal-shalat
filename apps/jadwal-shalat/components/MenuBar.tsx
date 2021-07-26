import React, { useState }  from 'react';
import Link from 'next/link'
import styles from '../styles/MenuBar.module.css'

function MenuBar() {
    const [mode, setMode] = useState('close')

    function openMenu() {
        document.querySelector("."+styles.circle).className += " "+styles.expand
        document.querySelector("."+styles.x).className += " "+styles.collapse
        document.querySelector("."+styles.y).className += " "+styles.collapse
        document.querySelector("."+styles.z).className += " "+styles.collapse
        document.querySelectorAll("."+styles.menu+" li").forEach(function(item) {
            item.className += " "+styles.animate
        })

        setTimeout(function(){
            document.querySelector("."+styles.x).className += " "+styles.rotate30
            document.querySelector("."+styles.z).className += " "+styles.rotate150 
		}, 70);
		setTimeout(function(){
            document.querySelector("."+styles.x).className += " "+styles.rotate45
            document.querySelector("."+styles.z).className += " "+styles.rotate135
		}, 120);
    }

    function closeMenu() {
        document.querySelector("."+styles.circle).classList.remove(styles.expand)
        document.querySelector("."+styles.x).classList.remove(styles.collapse)
        document.querySelector("."+styles.y).classList.remove(styles.collapse)
        document.querySelector("."+styles.z).classList.remove(styles.collapse)
        document.querySelectorAll("."+styles.menu+" li").forEach(function(item) {
            item.classList.remove(styles.animate)
        })

        setTimeout(function(){
            document.querySelector("."+styles.x).classList.remove(styles.rotate30)
            document.querySelector("."+styles.z).classList.remove(styles.rotate150)
		}, 70);
		setTimeout(function(){
            document.querySelector("."+styles.x).classList.remove(styles.rotate45)
            document.querySelector("."+styles.z).classList.remove(styles.rotate135)
		}, 120);
    }

    function changeMode() {
        console.log()
        if (mode == 'close') {
            openMenu()
            setMode('open')
        } else {
            closeMenu()
            setMode('close')
        }
    }
    return <>
        <div className={styles.navbar}></div>
        <div className={styles.circle_container}>
            <div className={styles.circle}></div>
        </div>
        
        <div className={styles.menu}>
            <ul>
                <li>
                    <Link href="/auth/login">
                        Login
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        About
                    </Link>
                </li>
            </ul>
        </div>			            
        <div className={styles.burger} onClick={changeMode}>
            <div className={styles.x}></div>
            <div className={styles.y}></div>
            <div className={styles.z}></div>
        </div>
    </>
}

export default MenuBar


