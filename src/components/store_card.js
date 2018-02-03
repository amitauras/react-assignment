import React from 'react'
import ReactStreetView from 'react-streetview'


const StoreCard = (props) => {
	const { marker, onAddFavorite, onCancelClick } = props
	const { latitude: lat, longitude: lon } = marker.geocode[0]
	const API_KEY = 'AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A'
	const streetViewsOptions = {
		position: { lat, lng: lon },
		pov: { heading: 100, pitch: 0 },
		zoom: 0
	}
	return (
		<div className="card">
			<div className="card-img-top">
				<div className="street-view-image">
					<ReactStreetView apiKey={API_KEY} streetViewPanoramaOptions={streetViewsOptions} />
				</div>
			</div>
			<div className="card-body">
				<h6 className="card-title">{marker.name}</h6>
				<button className="btn btn-primary btn-sm mr-2" onClick={onAddFavorite}>Add to favorites</button>
				<button className="btn btn-sm" onClick={onCancelClick}>Cancel</button>
			</div>
		</div>

	)
}

export default StoreCard