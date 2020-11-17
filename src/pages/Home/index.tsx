import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

import { Page, Content, MainText, Location, AccessButton, EnterButton, LocationEnter } from './styles'
import logoImg from '../../assets/logo.svg'
import SetPositionSelect from '../../components/SetPositionSelect'

const Home = () => {

  return (
    <Page>
      <Content>
        <img src={logoImg} alt="Logo Miauche"/>
        <MainText>
          <h1>Leve felicidade para um aumigo</h1>
          <p>Ajude abrigos e mude o dia de vários aumiguíneos. Nós te ajudamos a achar um! Quem sabe um animalzíneo não vai pra casa com você? :)</p>
        </MainText>

        <AccessButton to="/login">
          Acesso restrito
        </AccessButton>

        <LocationEnter>
          <Location>
            <SetPositionSelect />
          </Location>
          <EnterButton to="/shelters-map">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </EnterButton>
        </LocationEnter>

      </Content>
    </Page>
  )
}

export default Home;