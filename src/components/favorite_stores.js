import React from 'react'
import GoogleMap from './google_map'
import { Marker } from 'react-google-maps'

const FavoriteStores = (props) => {
	const renderFavorites = () => props.favorites.map((store, index) => {
		const { latitude: lat, longitude: lng } = store.geocode[0]
		return (
			<li key={store._id} className="list-group-item media">
				<div className="media-left">
					<div className="favorite-store-map">
						<GoogleMap lng={lng} lat={lat}>
							<Marker position={{ lat, lng }} />
						</GoogleMap>
					</div>
				</div>
				<div className="media-body">
					<h6>{`#${index + 1}: `}{store.name}</h6>
					<p>{store.address}</p>
					<button className="btn btn-danger btn-sm" onClick={() => props.removeFavorite(store)}>Remove</button>
				</div>
			</li>
		)
	})


	if (!props.favorites.length) {
		return (
			<div className="card bg-light" >
				<div className="card-body">
					<h3 className="card-title">Favorite stores</h3>
					<h5 className="card-subtitle">Add your favorite stores</h5>
					<h6 className="card-subtitle mt-2 text-muted">Select any marker</h6>
				</div>
			</div>
		)
	}

	return (
		<div className="card bg-light">
			<div className="card-body">
				<h3 className="card-title">Favorite stores: {props.favorites.length}</h3>
				<ul className="list-group">
					{renderFavorites()}
				</ul>
			</div>
		</div>
	)
}

export default FavoriteStores