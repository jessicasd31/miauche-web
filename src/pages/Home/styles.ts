import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--bgBlue);

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Content = styled.div`
  width: 100%;
  max-width: 1100px;
  position: relative;

  height: 100%;
  max-height: 600px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  img {
    width: 30%;
    filter: drop-shadow(2px 4px 0px #FFF) drop-shadow(2px -4px 0px #FFF) drop-shadow(-2px 0px 0px #FFF) drop-shadow(0px 0px 2.5px #222);
  }

`
// background: url(../../images/landing.svg) no-repeat 80% center;

export const MainText = styled.main`
  max-width: 350px;

   h1 {
    font-size: 70px;
    font-weight: 900;
    line-height: 70px;
  }

  p {
    margin-top: 40px;
    font-size: 20px;
    line-height: 34px;
  }
`

export const AccessButton = styled(Link)`
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 20px;

    font-size: 20px;
    color: #FFF;

    display: flex;
    flex-direction: column;

    background: var(--gray);
    border-radius: 15px;
    transition: background-color 0.2s;

    &:hover {
      background: var(--brown);
    }
`

export const LocationEnter = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;

    width: 350px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
`

export const Location = styled.div`
    max-width: 70%;
    font-size: 22px;
    line-height: 34px;

    display: flex;
    flex-direction: column;
`

export const EnterButton = styled(Link)`
    width: 75px;
    height: 75px;
    background: var(--pink);
    border-radius: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;

    &:hover {
      background: var(--gray);
    }
`
