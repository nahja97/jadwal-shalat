import React, { useEffect, useState }  from 'react';
import Clock from 'react-live-clock';
import styles from '../styles/ClockAnimation.module.css'
import Image from 'next/image'
const moon = '/../public/moon.png'
const sun = '/../public/sun.png'

function ClockAnimation({sunrise, sunset}) {
    const date = new Date()
    const [pos, setPos] = useState(0)
    const [mode, setMode] = useState('light')
    const [icon, setIcon] = useState(sun)
    let currentMinutes = (date.getHours()*60) + date.getMinutes()
    const midnight = 1381
    sunset = sunset.split(':')
    sunset = (parseInt(sunset[0])*60) + parseInt(sunset[1])
    sunrise = sunrise.split(':')
    sunrise = (parseInt(sunrise[0])*60) + parseInt(sunrise[1])

    const rangeNight = (midnight-sunset)+sunrise
    const rangeLight = sunset - sunrise

    useEffect(() => {
        if (currentMinutes > sunset || currentMinutes < sunrise) {
            let percentage = (currentMinutes > sunset ? currentMinutes-sunset : currentMinutes < sunrise ? (midnight-sunset)+currentMinutes : currentMinutes)/rangeNight
            setMode('dark')
            setIcon(moon)
            setPos(percentage*180)
        } else {
            let percentage = (currentMinutes - sunrise)/rangeLight
            setMode('light')
            setIcon(sun)
            setPos(percentage*180)
        }
    })

    return (
        <div className={styles.container}>
            <div className={styles.icon} style={{transform: `rotate(${pos}deg) translate(-25vh)`}}>
                <Image
                    src={icon}
                    alt="Picture of the author" 
                    width='100'
                    height='100'/>
            </div>
            <div id={styles.line} className={styles[mode]}>
                <div></div>
            </div>
            <div id={styles.h1_container}>
                <h1>
                    <Clock format={'HH:mm:ss'} ticking={true} />
                </h1>
            </div>
            
        </div>
    )
}


export default ClockAnimation