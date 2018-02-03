import React, { Component } from 'react'
import axios from 'axios'
import MexicoMap from './mexico_map'
import FavoriteStores from './favorite_stores'

const URL_LOCATION = '../../locations.json'
const favoriteIcon = 'http://maps.google.com/mapfiles/kml/pal4/icon47.png'

/*
* Use this component as a launching-pad to build your functionality.
*
*/
export default class YourComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      favorites: []
    }

    this.addFavorite = this.addFavorite.bind(this)
    this.removeFavorite = this.removeFavorite.bind(this)
  }

  componentDidMount() {
    const request = axios.get(URL_LOCATION)
    request.then(data => {
      this.setState({
        markers: data.data.map(store => Object.assign(store, { favorite: false, showInfo: false }))
      })
    })
  }

  addFavorite(marker) {
    const markers = this.state.markers.map(m => {
      if (m._id === marker._id) {
        return {
          ...m,
          favorite: true,
          icon: favoriteIcon
        }
      }
      return m
    })
    this.setState({
      markers,
      favorites: [marker, ...this.state.favorites]
    })
  }

  removeFavorite(marker) {
    const markers = this.state.markers.map(m => {
      if (m._id === marker._id) {
        return {
          ...m,
          favorite: false,
          icon: ''
        }
      }
      return m
    })

    const favorites = markers.filter(m => m.favorite)

    this.setState({
      markers,
      favorites
    })
  }

  render() {
    return (
      <div className="solution-container">
        <div className="d-flex flex-row justify-content-center">
        
          <div className="d-flex flex-column w-50 map-container">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Stores</h3>
                <MexicoMap markers={this.state.markers} addFavorite={this.addFavorite}/>
              </div>
            </div>
          </div>

          <div className="w-50">
            <FavoriteStores favorites={this.state.favorites} removeFavorite={this.removeFavorite}></FavoriteStores>
          </div>

        </div>
      </div >
    );
  }
}