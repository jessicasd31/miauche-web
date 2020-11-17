import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
  min-height: 100vh;

`

export const Main = styled.main`
  flex: 1;
`

export const Details = styled.div`
  width: 700px;
  margin: 64px auto;

  background: #FFFFFF;
  border: 1px solid #D3E2E5;
  border-radius: 20px;

  overflow: hidden;

  & > img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  .images {
    display: grid;
    grid-template-columns: repeat(6 ,1fr);
    column-gap: 16px;

    margin: 16px 40px 0;
  }

  .images button {
    border: 0;
    height: 88px;
    background: none;
    cursor: pointer;
    border-radius: 20px;
    overflow: hidden;
    outline: none;
    
    opacity: 0.6;
  }

  .images button.active {
    opacity: 1;
  }

  .images button img {
    width: 100%;
    height: 88px;
    object-fit: cover;
  }
`

export const DetailsContent = styled.div`
  padding: 70px 80px;
  
  ul {
    text-align: center;
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 60px;
    position: relative;
  }

  li {
    a {
      color: var(--darkGray);
      text-align: center;
      padding: 16px;
      text-decoration: none;
    }

    a:hover {
      opacity: 0.5;
    }

    &:not(:last-child)::after {
      content: "";
      border-right: 1px solid #CCC;
    }
  }

  h1 {
    color: var(--darkGray);
    font-size: 50px;
    line-height: 54px;
    margin-bottom: 40px;
    text-align: center;
  }

  p {
    line-height: 28px;
    color: #5C8599;
    margin-top: 5px;
    text-align: justify;
  }

  hr {
    width: 100%;
    height: 1px;
    border: 0;
    background: #D3E2E6;
    margin: 64px 0;
    
  }

  h2 {
    font-size: 30px;
    line-height: 46px;
    color: var(--darkGray);
  }

  h3 {
    font-size: 18px;
    line-height: 46px;
    color: var(--darkGray);
    margin-top: 20px;

    svg {
      margin-right: 10px;
    }
  }
`

export const Map = styled.div`
  margin-top: 40px;
  background: #E6F7FB;
  border: 1px solid #B3DAE2;
  border-radius: 20px;

  .leaflet-container {
    border-bottom: 1px solid #DDE3F0;
    border-radius: 20px;
  }
`

export const Footer = styled.footer`
  padding: 20px 0;
  text-align: center;

  a {
    line-height: 24px;
    color: #0089A5;
    text-decoration: none;
  }
`

export const OpenDetails = styled.div`
  margin-top: 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
`

export const Contacts = styled.div `
  display: flex; 
  flex-direction: column; 
  justify-content: space-around; 
  margin-top: 40px;

  a {
    margin-bottom: 5px;

    &:hover {
      opacity: 0.8;
    }
  }

  svg {
    margin-right: 5px;
  }
`

export const ContactButton = styled.button`
  margin-top: 35px;

  width: 100%;
  height: 64px;
  border: 0;
  cursor: pointer;
  background: #3CDC8C;
  border-radius: 20px;
  color: #FFFFFF;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: #36CF82;
  }
`
