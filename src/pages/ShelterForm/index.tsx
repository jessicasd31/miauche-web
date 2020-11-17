import React, { useState, FormEvent, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import { FiPlus } from "react-icons/fi";

import mapIcon from '../../assets/mapIcon';
import Sidebar from '../../components/Sidebar'
// import SetPositionSelect from '../../components/SetPositionSelect'
import { Page, Main, Form } from './styles';
import api from '../../service/api'

export default function ShelterForm() {
  const history = useHistory();
  const {userLogged} = useSelector((state: ApplicationState) => state.user)

  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bank_data, setBank_data] = useState('')
  const [instructions, setInstructions] = useState('')
  const [donations, setDonations] = useState('')
  const [other_aids, setOther_aids] = useState('')
  const [adoption_instruction, setAdoption_instruction] = useState('')
  const [do_bazaar, setDo_bazaar] = useState(false)
  const [donations_to_bazaar, setDonations_to_bazaar] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [instagram_user, setInstagram_user] = useState('')
  const [facebook_user, setFacebook_user] = useState('')
  const [email_address, setEmail_address] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('Pendente')
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function HandleMapClick () {

    const map = useMapEvent('click', (e) => {
      const { lat, lng } = e.latlng;

      setPosition({
        latitude: lat,
        longitude: lng
      });
    })
    return null
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }
    const selectedImages = Array.from(event.target.files);
    
    selectedImages.map(img => {
      images.push(img);
    })

    setImages(images)

    const selectedImagesPreview = images.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('address', address);
    data.append('city', city);
    data.append('state', state);
    data.append('country', country);
    data.append('donations', donations);
    data.append('bank_data', bank_data);
    data.append('other_aids', other_aids);
    data.append('do_bazaar', String(do_bazaar));
    data.append('donations_to_bazaar', (do_bazaar? donations_to_bazaar : ''));
    data.append('adoption_instruction', adoption_instruction);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('phone', phone);
    data.append('whatsapp', whatsapp);
    data.append('instagram_user', instagram_user);
    data.append('facebook_user', facebook_user);
    data.append('email_address', email_address);
    data.append('website', website);
    data.append('status', status);
    data.append('city_latitude', '-5.8605078');
    data.append('city_longitude', '-35.372233');
    data.append('zoom', '14');
    
    images.forEach(image => {
      data.append('images_shelter', image);
    })

    await api.post(
      '/shelters', 
      data, 
      { headers: { Authorization: `Bearer ${userLogged?.token}` }}
    );

    alert('Cadastro realizado com sucesso');

    history.push('/shelters-map');
  }

  return (
    <Page>
      <Sidebar />

      <Main>
        <Form onSubmit={handleSubmit} >
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                { previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })

                }
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input type="file" multiple onChange={handleSelectImages} id="image[]" />
            </div>
          </fieldset>

          <fieldset>
            <legend>Doações</legend>

            <div className="input-block">
              <label htmlFor="donations">O que recebem como doações</label>
              <textarea id="donations" value={donations} onChange={event => setDonations(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="bank_data">Dados para transferêcias bancárias</label>
              <textarea id="bank_data" value={bank_data} onChange={event => setBank_data(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="do_bazaar">Realizam bazar?</label>

              <div className="button-select">
                <button type="button" className={do_bazaar ? 'active': ''} onClick={() => setDo_bazaar(true)} >Sim</button>
                <button type="button" className={!do_bazaar ? 'active': ''} onClick={() => setDo_bazaar(false)}>Não</button>
              </div>
            </div>

            { do_bazaar && (
              <div className="input-block">
                <label htmlFor="donations_to_bazaar">Doações para o bazar</label>
                <input id="donations_to_bazaar" value={!do_bazaar ? 'Não se aplica' : donations_to_bazaar} disabled={!do_bazaar} onChange={event => setDonations_to_bazaar(event.target.value)} />
              </div>
            )}

            <div className="input-block">
              <label htmlFor="other_aids">Outras formas de ajudar</label>
              <textarea id="other_aids" value={other_aids} placeholder="Também aceitamos ajuda para dar banho nos animais e lavar os dormitórios." onChange={event => setOther_aids(event.target.value)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Adoções</legend>

            <div className="input-block">
              <label htmlFor="adoption_instruction">Instruções para realizar adoção</label>
              <textarea id="adoption_instruction" value={adoption_instruction} onChange={event => setAdoption_instruction(event.target.value)} />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeningHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active': ''} onClick={() => setOpenOnWeekends(true)} >Sim</button>
                <button type="button" className={!open_on_weekends ? 'active': ''} onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Localização e contatos</legend>
            
            <div className="input-block">
              <label htmlFor="address">endereço</label>
              <textarea id="address" value={address} placeholder="Se por algum motivo não desejar informar o endereço exato, clique acima de alguma região próxima no mapa" onChange={event => setAddress(event.target.value)} />
            </div> 

            <div className="input-block">
              <label htmlFor="city">Cidade</label>
              <input id="city" value={city} onChange={event => setCity(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="state">Estado</label>
              <input id="state" value={state} onChange={event => setState(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="country">País</label>
              <input id="country" value={country} onChange={event => setCountry(event.target.value)} />
            </div>

            <MapContainer 
              center={[-5.7997439,-35.2922852]} 
              style={{ width: '100%', height: 280 }}
              zoom={10}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude,position.longitude]} 
                />
              ) }
              <HandleMapClick />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="facebook_user">Nome do usuário no Facebook</label>
              <input id="facebook_user" value={facebook_user} onChange={event => setFacebook_user(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="instagram_user">Nome do usuário no Instagram</label>
              <input id="instagram_user" value={instagram_user} onChange={event => setInstagram_user(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="phone">Telefone</label>
              <input id="phone" value={phone} onChange={event => setPhone(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input id="whatsapp" value={whatsapp} onChange={event => setWhatsapp(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="email_address">Email</label>
              <input id="email_address" value={email_address} onChange={event => setEmail_address(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="website">Website</label>
              <input id="website" value={website} onChange={event => setWebsite(event.target.value)} />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </Form>
      </Main>
    </Page>
  );
}
