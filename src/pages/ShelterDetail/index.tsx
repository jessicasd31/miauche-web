import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'
import DetailCard from '../../components/DetailCard'
import mapIcon from '../../assets/mapIcon';
import image from '../../assets/local.png';
import Sidebar from '../../components/Sidebar'
import {Page, Main, Details, DetailsContent, Map, Footer, OpenDetails, ContactButton} from './styles';
// import api from '../services/api'

// interface Shelter {
//   latitude: number;
//   longitude: number;
//   name: string;
//   about: string;
//   Instructions: string;
//   opening_hours: string;
//   open_on_weekends: string;
//   images: Array<{
//     id: number;
//     url: string;
//   }>;
// }

interface ShelterParams {
  id: string;
}

export default function ShelterDetail() {
  const params = useParams<ShelterParams>()
  // const [shelter, setShelter] = useState<Shelter>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // useEffect(() => {
  //   api.get(`/orphanages/${params.id}`).then(response => {
  //     setShelter(response.data);
  //   })
  // }, [params.id]);

  // if(!shelter) {
  //   return <p>Carregando...</p>
  // }

  const shelter = {
      id: 1,
      name: 'Aubrigo',
      about: 'sobre',
      latitude: -5.7997439,
      longitude: -35.2922852,
      Instructions: 'sa',
      opening_hours: 'sasds',
      open_on_weekends: true,
      images: [
        {
          id: 1,
          url: image
        },
        {
          id: 2,
          url: image
        }
      ]
    }

  return (
    <Page>
      <Sidebar />

      <Main>
        <Details>
          <img src={shelter.images[activeImageIndex].url} alt={shelter.name} />
          {/*<img src={shelter.images[activeImageIndex].url} alt={shelter.name} />*/}
                
          <div className="images">
            { shelter.images.map((image, index) => (
              <button 
                key={image.id} 
                type="button"
                className={activeImageIndex === index ? 'active' : ''}
                onClick={() => { setActiveImageIndex(index) }}
              >
                <img src={image.url} alt={shelter.name} />
              </button>
            )) }
          </div>
          
          <DetailsContent>
            <h1>{shelter.name}</h1>
            <p>{shelter.about}</p>

            <Map>
              <MapContainer 
                center={[shelter.latitude, shelter.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[shelter.latitude, shelter.longitude]} />
              </MapContainer>

              <Footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`} >Ver rotas no Google Maps</a>
              </Footer>
            </Map>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{shelter.Instructions}</p>

            <OpenDetails>
              <DetailCard color="#5C8599" bgColor="#E6F7FB" borderColor="#B3DAE2">
                <>  
                  <FiClock size={32} color="#15B6D6" />
                  Segunda à Sexta <br />
                  {shelter.opening_hours}
                </>
              </DetailCard>
              { shelter.open_on_weekends ? (
                <DetailCard color="#37C77F" bgColor="#EDFFF6" borderColor="#A1E9C5">
                  <>
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </>
                </DetailCard>
              ) : (
                <DetailCard color="#FF6690" bgColor="#FDF8F5" borderColor="#FFBCD4">
                  <>
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </>
                </DetailCard>
              ) }
            </OpenDetails>

            <ContactButton type="button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </ContactButton>
          </DetailsContent>
        </Details>
      </Main>
    </Page>
  );
}