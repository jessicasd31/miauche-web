import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaPaw, FaTshirt, FaRegCreditCard, FaInstagram, FaFacebookSquare, FaHandsHelping, FaGlobe } from "react-icons/fa";
import { FiClock, FiInfo, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom'
import DetailCard from '../../components/DetailCard'
import mapIcon from '../../assets/mapIcon';
import Sidebar from '../../components/Sidebar'
import {Page, Main, Details, DetailsContent, Map, Footer, OpenDetails, ContactButton, Contacts} from './styles';
import api from '../../service/api'

interface ShelterParams {
  id: string;
}

interface Shelter {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
  about: string
  address: string,
  city: string,
  state: string,
  country: string,
  phone: string,
  whatsapp: string, //
  bank_data: string,
  instructions: string,
  donations: string,
  other_aids:string,
  adoption_instruction: string,
  do_bazaar: boolean,
  donations_to_bazaar: string,
  opening_hours: string,
  open_on_weekends: boolean,
  instagram_user: string,
  facebook_user: string,
  email_address: string,
  website: string,
  status: string,
  images_shelter: Array<{
    id: number;
    url: string;
  }>;
}
  
export default function ShelterDetail() {
  const params = useParams<ShelterParams>()
  const [shelter, setShelter] = useState<Shelter>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`/shelters/${params.id}`).then(response => {
      const data = {...response.data, other_aids: 'Também precisamos de voluntários para passear com os dogs, dar banhos e nos ajudar a limpar as casinhas.'}
      setShelter(data);
    })
  }, [params.id]);

  const contacts = [
    {
      name: shelter?.facebook_user,
      url: `https://facebook.com/${shelter?.facebook_user}/`,
      icon: <FaFacebookSquare size={20} color="#5C8599" />
    },
    {
      name: shelter?.instagram_user,
      url: `https://www.instagram.com/${shelter?.facebook_user}/`,
      icon: <FaInstagram size={20} color="#5C8599" />
    },
    {
      name: shelter?.phone,
      url: '',
      icon: <FiPhone size={20} color="#5C8599" />
    },
    {
      name: shelter?.whatsapp,
      url: '',
      icon: <FaWhatsapp size={20} color="#5C8599" />
    },
    {
      name: shelter?.website,
      url: shelter?.website,
      icon: <FaGlobe size={20} color="#5C8599" />
    },
    {
      name: shelter?.email_address,
      url: '',
      icon: <FiMail size={20} color="#5C8599" />
    },
  ]

  const displayContacts = () => {
    const contactList = contacts.map((contact, index) => {
      if(contact.name) {
        return (
          <a key={index}
             href={contact.url} 
             target="_blank" 
             rel="noopener noreferrer"
             style={{
               display: 'flex', 
               alignItems: 'center', 
               color: '#5C8599', 
               textDecoration: 'none', 
               pointerEvents: contact.url === '' ? 'none' : 'initial'}}
          >
            {contact.icon}
            { contact.name }
          </a>
        )
      }
    })

    return contactList;
  }

  if(!shelter) {
    return <p>Carregando...</p>
  }

  return (
    <Page>
      <Sidebar />

      <Main>
        <Details>
          <img src={shelter.images_shelter[activeImageIndex].url} alt={shelter.name} />
                
          <div className="images">
            { shelter.images_shelter.map((image, index) => (
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

            <ul>
              <li><a href="#doacoes">Doações</a></li>
              <li><a href="#adocoes">Adoções</a></li>
              <li><a href="#visitas">Visitas</a></li>
              <li><a href="#contatos">Contatos</a></li>
            </ul>

            <h1>{shelter.name}</h1>
            <p>{shelter.about}</p>

            <hr />

            <h2 id="doacoes">Doações</h2>
            <p>{shelter.donations}</p>

            { shelter.bank_data && (
              <>
                <h3>
                  <FaRegCreditCard size={20} color="#5C8599" />
                  <strong>Dados bancários para transferências:</strong>
                </h3>
                <p>
                  {shelter.bank_data}
                </p>
              </>
            )}

            { shelter.do_bazaar && (
              <>
                <h3>
                  <FaTshirt size={25} color="#5C8599" />
                  <strong>Recebemos doações para bazar:</strong>
                </h3>
                <p>
                  {shelter.donations_to_bazaar}
                </p>
              </>
            ) }

            { shelter.other_aids && (
              <>
                <h3>
                  <FaHandsHelping size={25} color="#5C8599" />
                  <strong>Outras formas de ajudar:</strong>
                </h3>
                <p>
                  { shelter.other_aids }
                </p>
              </>
            ) }

            <hr />

            <h2 id="adocoes">Adoção</h2>
            { shelter.adoption_instruction ? (
              <>
                <h3>
                  <FaPaw size={20} color="#5C8599" style={{marginRight: '5px'}} />
                  <strong>O que precisa para adotar um aumigo:</strong>
                </h3>
                <p>
                  {shelter.adoption_instruction}
                </p>
              </>
              )
              : <p>O abrigo não especificou aqui as intruções para adoção. Por favor, entre em contato com eles. Mas não desista de achar um aumiguíneo, ta bom? :)</p>
            }

            <hr />

            <h2 id="visitas">Instruções para visita</h2>
            <p>{shelter.instructions}</p>

            <OpenDetails>
              { shelter.opening_hours && (
                <DetailCard color="#5C8599" bgColor="#E6F7FB" borderColor="#B3DAE2">
                  <>  
                    <FiClock size={32} color="#15B6D6" />
                    Segunda à Sexta <br />
                    {shelter.opening_hours}
                  </>
                </DetailCard>
              ) }
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

              { shelter.address &&
                <Footer>
                  <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`} >Ver rotas no Google Maps</a>
                </Footer>
              }
            </Map>
            <p>
              <FiMapPin size={20} color="#5C8599" style={{marginRight: '4px'}}/>
              {shelter.address}, {shelter.city}. {shelter.state}
            </p>

            <Contacts id="contatos"> 
              {displayContacts()}   

              { shelter.whatsapp && (
                <ContactButton type="button">
                  <FaWhatsapp size={20} color="#FFF" />
                  Entrar em contato
                </ContactButton>
              )}
            </Contacts>

          </DetailsContent>
        </Details>
      </Main>
    </Page>
  );
}