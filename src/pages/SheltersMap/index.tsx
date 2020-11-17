import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

import logoImg from '../../assets/logo_s.svg'
import mapIcon from '../../assets/mapIcon';
import {Page, Aside, AddButton } from './styles'
import SetPositionSelect from '../../components/SetPositionSelect'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import api from '../../service/api'

interface Shelter {
  id: number
  name: string
  latitude: number
  longitude: number
}

const SheltersMap = () => {
  const positionMap = useSelector((state: ApplicationState) => state.positions.currentPositions.positionMap)
  const [shelters, setShelters] = useState<Shelter[]>([])
  const userLogged = useSelector((state: ApplicationState) => state.user.userLogged)

  useEffect(() => {

    (async function getShelters() {
      await api.get('/shelters').then(response => {
        setShelters(response.data);
      })
    })();
    
  }, []);

  function DisplayPosition() {

    return (
      <MapContainer 
        center={[positionMap?.city_latitude, positionMap?.city_longitude]}
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
          <SetPositionSelect />
        </footer>
      </Aside>

      <DisplayPosition />

      { userLogged && (
        <AddButton to="/shelter/create" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </AddButton>
      )}
    </Page>
  )
}

export default SheltersMap;
