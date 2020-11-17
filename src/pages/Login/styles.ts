import styled from 'styled-components'

export const Page = styled.div`
  display: flex;
`

export const Main = styled.main`
  flex: 1;
`

export const Form = styled.form`
  width: 700px;
  margin: 64px auto;

  background: #FFFFFF;
  border: 1px solid #D3E2E5;
  border-radius: 20px;

  padding: 64px 80px;

  overflow: hidden;

  .leaflet-container {
    margin: 40px 0;
    border: 1px solid #D3E2E5;
    border-radius: 20px;
  }

  fieldset {
    border: 0;
  }

  fieldset + fieldset {
    margin: 50px 0;
  }

  fieldset legend {
    width: 100%;

    font-size: 32px;
    line-height: 34px;
    color: #5C8599;
    font-weight: 700;

    border-bottom: 1px solid #D3E2E5;
    margin-bottom: 40px;
    padding-bottom: 24px;
  }

  .input-block + .input-block {
    margin-top: 24px;
  }

  .input-block label {
    display: flex;
    color: #8FA7B3;
    margin-bottom: 8px;
    line-height: 24px;
  }

  .input-block label span {
    font-size: 14px;
    color: #8FA7B3;
    margin-left: 24px;
    line-height: 24px;
  }

  .input-block input,
  .input-block textarea {
    width: 100%;
    background: #F5F8FA;
    border: 1px solid #D3E2E5;
    border-radius: 20px;
    outline: none;
    color: #5C8599;
  }

  .input-block input {
    height: 64px;
    padding: 0 16px;
  }

  button {
    margin-top: 64px;

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
  }

  button svg {
    margin-right: 16px;
  }

  button:hover {
    background: #36CF82;
  }

`