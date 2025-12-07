import React, { memo } from 'react'
import { HiLocationMarker } from "react-icons/hi";
import GoogleMapReact from 'google-map-react';

const Position = ({ icon }) => <div>{icon}</div>
const Map = ({ coords, address }) => {
    return (
        <div className='h-[300px] w-full relative'>
            <div className='absolute top-[8px] z-10 max-w-[200px] bg-white shadow-md p-4 text-xs'>{address}</div>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
                defaultCenter={coords}
                defaultZoom={11}
                center={coords}
            >
                <Position
                    lat={coords?.lat || 59.955413}
                    lng={coords?.lng || 30.337844}
                    icon={<HiLocationMarker />}
                />
            </GoogleMapReact>
        </div>
    )
}

export default memo(Map)