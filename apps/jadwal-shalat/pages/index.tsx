import styles from './Home.module.css';
import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';

interface Props {
  layout?: string;
}

function Index() {
  const [city, setCity] = useState()
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        let res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyCXZ3-luH5PdTcsAsilZR9n76RjE6mIRqY')
        let data = await res.json()
        data = data.results[0]?.address_components[5]?.long_name
        setCity(data ? (data.split(' '))[1] : 'Malang')
      });
    }

    
  })

  return <>
    {city}
  </>
}

export async function getStaticProps() {
  const layout = 'default'
  return {
    props: {
      layout
    },
  }
}

export default Index