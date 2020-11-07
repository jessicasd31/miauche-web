import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleCurrentPosition, togglePositionMap } from '../store/ducks/positions/actions'
import { ApplicationState } from '../store'

const Select = styled.select `
  background-color: transparent;
  border: none;
  color: #FFF;
  font-size: 22px;
  font-weight: 600;
  margin-left: -3px;
  white-space: pre-wrap;

  option {
    background-color: var(--gray);
    color: rgba(0, 0, 0, 0.6);
    border: none;
    font-size: 20px;
  }
`

const locations = [
    {  
      id: 1,
      city: 'Natal',
      uf: 'Rio Grande do Norte',
      latitude: -5.7999146,
      longitude: -35.2922847,
      zoom: 12
    },
    {
      id: 2,
      city: 'Parnamirim',
      uf: 'Rio Grande do Norte',
      latitude: -5.9224335,
      longitude: -35.2811418,
      zoom: 12
    },
    {
      id: 3,
      city: 'Macaíba',
      uf: 'Rio Grande do Norte',
      latitude: -5.8605078,
      longitude: -35.372233,
      zoom: 14
    },
    {
      id: 4,
      city: 'São Gonçalo do Amarante',
      uf: 'Rio Grande do Norte',
      latitude: -5.7785324,
      longitude: -35.3394259,
      zoom: 13
    },
    {
      id: 5,
      city: 'Extremoz',
      uf: 'Rio Grande do Norte',
      latitude: -5.6999817,
      longitude: -35.3480016,
      zoom: 12
    },
    {
      id: 6,
      city: 'Ceará-Mirim',
      uf: 'Rio Grande do Norte',
      latitude: -5.6454946,
      longitude: -35.450686,
      zoom: 14
    },
    {
      id: 7,
      city: 'Parelhas',
      uf: 'Rio Grande do Norte',
      latitude: -6.6916059,
      longitude: -36.6696983,
      zoom: 15
    },
    {
      id: 8,
      city: 'João Pessoa',
      uf: 'Paraíba',
      latitude: -7.1466036,
      longitude: -34.9516381,
      zoom: 12
    },
  ]

const SelectCity = () => {
  const positions = useSelector((state: ApplicationState) => state.positions)
  const dispatch = useDispatch();

  useEffect(()=> {
    if(positions.currentPosition === null){
      getLocation();
    } 
  }, [])

  function getLocation() {
    if (!navigator.geolocation) {
      console.log("Seu navegador não permite usar a geolocalização");
      return false;
    }

    navigator.geolocation.getCurrentPosition(showCity);
  }

  async function showCity(position: any) {
    // // Natal
    // const latitude = -5.8845863;
    // const longitude = -35.2026088;

    const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      position.coords.longitude
    },${position.coords.latitude}.json?access_token=${accessToken}`;

    await axios.get(url)
      .then(response => {
        const data = response.data;
        if (!data.features[0]) {
          console.log("Localidade não encontrada");
          dispatch(togglePositionMap(locations[0]))
          return false;
        }
        
        const infos = data.features[0].context;

        const currentPosition = {
          city: infos.find((i: any) => i.id.includes('place')).text,
          uf: infos.find((i: any) => i.id.includes('region')).text,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 12
        };

        const checkLocation = locations.find(i => i.city === currentPosition?.city && i.uf === currentPosition?.uf);

        if (checkLocation) {
          dispatch(toggleCurrentPosition(checkLocation, checkLocation.id))
          dispatch(togglePositionMap(checkLocation))
        } else {
          dispatch(toggleCurrentPosition(currentPosition, 0))
          dispatch(togglePositionMap(currentPosition))
        }
        
      })
      .catch(error => console.log(error));
  }

  function handleLocation(e: React.ChangeEvent<HTMLSelectElement>) {
    // console.log({index: e.target.selectedIndex, value: e.target.value});
    if (positions.knownPosition === 0 && e.target.value == positions.currentPosition.city){
      dispatch(togglePositionMap(positions.currentPosition));
      return;
    }

    dispatch(togglePositionMap(locations[locations.map(i => i.city).indexOf(e.target.value)]))
  }

  return (
    <>
      <Select value={positions.positionMap?.city} name="cities" id="cities" onChange={(e) => handleLocation(e)}>
        { positions.knownPosition==0 && (
          <option value={positions.currentPosition?.city}>
              {positions.currentPosition?.city}
          </option>
        )}
        {locations.map((location, index) => (
          <option key={location.city} value={location.city}>
            {location.city}
          </option>
      ))}
      </Select>
      <span>{positions.positionMap?.uf}</span>
    </>
  )
}

export default SelectCity;
