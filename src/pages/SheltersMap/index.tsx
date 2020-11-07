import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import Leaflet from 'leaflet';

import logoImg from '../../assets/logo_s.svg'
import mapMarkerImg from '../../assets/local.svg'
import mapIcon from '../../assets/mapIcon';
import {Page, Aside, AddButton, Select} from './styles'
import SelectCity from '../../components/SelectCity'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
// import api from '../services/api'
  
const sheltersSample = [
  {
    id: 1,
    name: 'Aubrigo',
    latitude: -5.7997439,
    longitude: -35.2922852
  }
]  

const SheltersMap = () => {
  const positionMap = useSelector((state: ApplicationState) => state.positions.positionMap)
  const [shelters, setShelters] = useState(sheltersSample)

  // useEffect(() => {
  // console.log(positions)
  //   api.get('/shelters').then(response => {
  //     setShelters(response.data);
  //   })
  // }, []);

  function DisplayPosition() {

    return (
      <MapContainer 
        center={[positionMap?.latitude, positionMap?.longitude]}
        zoom={positionMap?.zoom}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {shelters.map(shelter => {
          return (
            < Marker 
              key={shelter.id}
              position={[shelter.latitude, shelter.longitude]}
              icon={mapIcon}
            >
              <Popup 
                closeButton={false} 
                minWidth={180} 
                maxWidth={180}
                className="map-popup"
              >
                {shelter.name}
                <Link to={`/shelter/detail/${shelter.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </ Marker>
          )
        })}
      </MapContainer>
    )
  }

  return (
    <Page>
      <Aside>
        <header>
          <img src={logoImg} alt="Logo" />
        
          <h2>Escolha um abrigo no mapa</h2>
          <p>Muitos animalzíneos estão esperando a sua visita :)</p>
        </header>

        <footer>
          <SelectCity />
        </footer>
      </Aside>

      <DisplayPosition />

      <AddButton to="/shelter/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </AddButton>
    </Page>
  )
}

export default SheltersMap;
