import styles from './Home.module.css';
import React, { useEffect, useState } from 'react'
import { NextPage } from 'next';

interface Props {
  layout?: string;
}

function Index({mapToken}) {
  const [city, setCity] = useState()
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        let res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + mapToken)
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
  const mapToken = process.env.MAP_TOKEN
  return {
    props: {
      layout,
      mapToken
    },
  }
}

export default Index