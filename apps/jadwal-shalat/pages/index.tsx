import styles from '../styles/Index.module.css';
import React, { useEffect, useState } from 'react'
import ClockAnimation from '../components/ClockAnimation'
import Table from '../components/Table'

function Index({mapToken}) {
  const [schedule, setSchedule] = useState({
    asr: "00:00",
    dhuhr: "00:00",
    fajr: "00:00",
    imsak: "00:00",
    isha: "00:00",
    maghrib: "00:00",
    midnight: "00:00",
    sunrise: "00:00",
    sunset: "00:00"
  })
  const [city, setCity] = useState('Kediri')
  const [mode, setMode] = useState('light')

  async function getSchedule(position) {
    const date = new Date()
    let time = new Intl.DateTimeFormat('id').format(date);
    let currentDate = time.toString().split('/')
    let currentDay = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`
    try {
      let url = `https://api.siforlat.com/api/v1/prayTimes?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&duration=1`
      let response = await fetch(url)
      let dataSchedule = await response.json()
      setSchedule(dataSchedule.schedules[0])
      let sunrise = (dataSchedule.schedules[0].sunrise).split(':')
      sunrise = (parseInt(sunrise[0])*60) + parseInt(sunrise[1])
      let sunset = (dataSchedule.schedules[0].sunset).split(':')
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
      getSchedule(position)
    }
    
  }
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        try {
          let res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + mapToken)
          let data = await res.json()
          if (data) {
            data = data.plus_code.compound_code.split(',')[1]
            data = data.split(' ')
            setCity(data ? data[2] == 'City' ? 'kota '+data[1] : data[1] : 'Tulungagung')
            getSchedule(position)
          }
        } catch(err) {
          console.log(err)
        }
        
      });
    }
  }, [])
  return (
    <div className={`${styles.container} ${styles[mode]}`}>
      <h1 className={styles.title}>Jadwal Shalat {city} dan sekitarnya</h1>
      <ClockAnimation sunrise={schedule.sunrise} sunset={schedule.sunset}></ClockAnimation>
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