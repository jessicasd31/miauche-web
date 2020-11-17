import React, { useState, FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom'

import api from '../../service/api'
import { Page, Main, Form } from './styles'
import { toggleUserLogged } from '../../store/ducks/user/actions'
import { ApplicationState } from '../../store'

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { userLogged } = useSelector((state: ApplicationState) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { email, password }

    await api.post('/authenticate', data).then(response => {
      const user_data = {...response.data.user, token: response.data.token}
      dispatch(toggleUserLogged(user_data))

      history.push('/shelters-map');
    }).catch(err => console.log(err))

  }

  return (
    <Page>
      <Main>
        <Form onSubmit={handleSubmit} >
          <fieldset>
            <legend>
              {/*<img src={require('../../assets/logo_s.png')} alt="Miauche logo" />*/}
              Login {userLogged?.name}
            </legend>
            <div className="input-block">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={event => setPassword(event.target.value)} />
            </div>
          </fieldset>

          <button type="submit">
            Acessar
          </button>
        </Form>
      </Main>
    </Page>
  )
}

export default Login;
