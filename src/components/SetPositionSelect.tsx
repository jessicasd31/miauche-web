import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCurrentPosition, togglePositionMap, togglePositionRepo } from '../store/ducks/positions/actions'
import { ApplicationState } from '../store'
import api from '../service/api'

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
    
interface Props {
  showSelect?: boolean,
}

const SetPositionSelect = ({showSelect = true}: Props) => {
  const {currentPositions, positionsRepository} = useSelector((state: ApplicationState) => state.positions)
  const dispatch = useDispatch();

  useEffect(() => {
    (async function getPositions() {
      await api.get('/positions').then(response => {
        
        dispatch(togglePositionRepo(response.data))
      })
    })();

    if(currentPositions.currentPosition === null){
      
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
    const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      position.coords.longitude
    },${position.coords.latitude}.json?access_token=${accessToken}`;

    await axios.get(url)
      .then(response => {
        const data = response.data;
        if (!data.features[0]) {
          console.log("Localidade não encontrada");
          dispatch(togglePositionMap(positionsRepository[0]))
          return false;
        }
        
        const infos = data.features[0].context;

        const currentPosition = {
          city: infos.find((i: any) => i.id.includes('place')).text,
          state: infos.find((i: any) => i.id.includes('region')).text,
          city_latitude: position.coords.latitude,
          city_longitude: position.coords.longitude,
          zoom: 12
        };

        const checkLocation = positionsRepository.find(i => i.city === currentPosition?.city && i.state === currentPosition?.state);

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
    if (currentPositions.knownPosition === 0 && e.target.value === currentPositions.currentPosition?.city){
      dispatch(togglePositionMap(currentPositions.currentPosition));
      return;
    }
    dispatch(togglePositionMap(positionsRepository[positionsRepository.map(i => i.city).indexOf(e.target.value)]))
  }

  return (
    <>
    { showSelect && (
      <>
        <Select value={currentPositions.positionMap?.city} name="cities" id="cities" onChange={(e) => handleLocation(e)}>
          { currentPositions.knownPosition === 0 && (
            <option value={currentPositions.currentPosition?.city}>
                {currentPositions.currentPosition?.city}
            </option>
          )}
          {positionsRepository.map((location, index) => (
            <option key={location.city} value={location.city}>
              {location.city}
            </option>
        ))}
        </Select>
        <span>{currentPositions.positionMap?.state}</span>
      </>
      ) }
    </>
  )
}

export default SetPositionSelect;
