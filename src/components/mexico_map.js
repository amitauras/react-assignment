import React, { Component } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import GoogleMap from './google_map'
import StoreCard from './store_card'

class MexicoMap extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.onClickMarker = this.onClickMarker.bind(this)
		this.onCloseMarker = this.onCloseMarker.bind(this)
		this.addFavorite = this.addFavorite.bind(this)
	}

	componentWillReceiveProps(nextprops) {
		this.setState({ markers: nextprops.markers })
	}

	onClickMarker(marker) {
		this.setState({
			markers: this.state.markers.map(m => {
				if (m === marker) {
					return { ...marker, showInfo: true }
				}
				return m
			})
		})
	}
	onCloseMarker(marker) {
		this.setState({
			markers: this.state.markers.map(m => {
				if (m === marker) {
					return { ...marker, showInfo: false }
				}
				return m
			})
		})
	}
	addFavorite(marker) {
		this.props.addFavorite(marker)
	}
	renderMarkers() {
		if (this.state.markers) {
			return this.state.markers.map(marker => {
				if (marker.geocode.length) {
					const { latitude: lat, longitude: lng, extra } = marker.geocode[0]
					return (
						<Marker position={{ lat, lng }}
							key={marker._id}
							icon={marker.icon}
							onClick={() => this.onClickMarker(marker)}>
							{!marker.favorite && marker.showInfo && (
								<InfoWindow onCloseclick={() => this.onCloseMarker(marker)}>
									<div>
										<StoreCard
											marker={marker}
											onAddFavorite={() => this.addFavorite(marker)}
											onCancelClick={() => this.onCloseMarker(marker)} />
									</div>
								</InfoWindow>
							)}
						</Marker>
					)
				}
			})
		}
	}
	render() {
		return (
			<GoogleMap lng={-99.14397250000002} lat={19.352307023130855} height={'90%'} zoom={12}>
				{this.renderMarkers()}
			</GoogleMap>
		)
	}
}

export default MexicoMap