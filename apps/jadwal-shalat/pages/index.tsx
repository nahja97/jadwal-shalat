import styles from '../styles/Index.module.css';
import React, { useEffect, useState } from 'react'
import ClockAnimation from '../components/ClockAnimation'
import Table from '../components/Table'

function Index({mapToken}) {
  const [schedule, setSchedule] = useState({
    Asr: "00:00",
    Dhuhr: "00:00",
    Fajr: "00:00",
    Imsak: "00:00",
    Isha: "00:00",
    Maghrib: "00:00",
    Midnight: "00:00",
    Sunrise: "00:00",
    Sunset: "00:00"
  })
  const [city, setCity] = useState('Kediri')
  const [mode, setMode] = useState('light')

  async function getSchedule() {
    const date = new Date()
    let time = new Intl.DateTimeFormat('id').format(date);
    let currentDate = time.toString().split('/')
    let currentDay = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`

    try {
      let response = await fetch(`https://api.pray.zone/v2/times/day.json?city=${city}&date=${currentDay}`)
      let dataSchedule = await response.json()
      setSchedule(dataSchedule.results.datetime[0].times)
      let sunrise = (dataSchedule.results.datetime[0].times['Sunrise']).split(':')
      sunrise = (parseInt(sunrise[0])*60) + parseInt(sunrise[1])
      let sunset = (dataSchedule.results.datetime[0].times['Sunset']).split(':')
      sunset = (parseInt(sunset[0])*60) + parseInt(sunset[1])
      let currentMinute = (date.getHours()*60)+date.getMinutes()
      if (sunrise < currentMinute && 
        sunset > currentMinute)
      {
        setMode('light')
      }
      else
      {
        setMode('dark')
      }
    } catch(err) {
      getSchedule()
    }
    
  }
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        let res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + mapToken)
        let data = await res.json()
        if (data) {
          data = data.plus_code.compound_code.split(',')[1]
          setCity(data ? (data.split(' '))[1] : 'Tulungagung')
          getSchedule()
        }
      });
    }
  })
  return (
    <div className={`${styles.container} ${styles[mode]}`}>
      <h1 className={styles.title}>Jadwal Shalat {city} dan sekitarnya</h1>
      <ClockAnimation sunrise={schedule['Sunrise']} sunset={schedule['Sunset']}></ClockAnimation>
      <Table schedule={schedule}></Table>
    </div>
  )
}

export async function getStaticProps() {
  const layout = 'default'
  const mapToken = process.env.MAP_TOKEN
  return {
    props: {
      layout,
      mapToken,
    },
  }
}

export default Index