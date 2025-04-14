import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerDimension={
  width:'100%',
  height:'100%'
}

const center={
  lat: 21.1458,
  lng: 79.0882
}

const markers = [
  { lat: 31.3260, lng: 75.5762, name: 'Closify Jalandhar' },
  { lat: 28.6139, lng: 77.2090, name: 'Closify Delhi' },
  { lat: 19.0760, lng: 72.8777, name: 'Closify Mumbai' },
  { lat: 12.9716, lng: 77.5946, name: 'Closify Bangalore' },
  { lat: 17.3850, lng: 78.4867, name: 'Closify Hyderabad' },
  { lat: 26.4499, lng: 80.3319, name: 'Closify Kanpur' }
];



function GooglemapShopListing() {
  return (
    <DialogContent className='w-full' aria-describedby={undefined}>
      <DialogTitle className='font-medium flex items-center'>Closify Offline Stores</DialogTitle>
      <div className='flex items-center h-100 overflow-hidden rounded-2xl'>
        <LoadScript googleMapsApiKey='AIzaSyDeNYb_5-Je7JIncT6EkjA2CQtNZb-pgR8'>
          <GoogleMap mapContainerStyle={containerDimension} center={center} zoom={4}>
            {
              markers.map((cities,index)=>{
                return <Marker
                key={index}
                position={{lat:cities.lat,lng:cities.lng}}
                label={{
                  text:cities.name,
                  fontSize:'10px',
                  color:"yellow"
                }}/>
              })
            }
          </GoogleMap>
        </LoadScript>
      </div>
    </DialogContent>
  )
}

export default GooglemapShopListing