import React from 'react'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

export default (props) => {
	const { lat, lng, height, zoom } = props
	return (
		<GoogleMapLoader
			containerElement={<div style={{ height: (height || '100%') }} />}
			googleMapElement={
				<GoogleMap defaultZoom={zoom || 15} defaultCenter={{ lat, lng }}>
					{props.children}
				</GoogleMap>
			}
		/>
	)
}