import React, { useState } from 'react';
import {
  Grid,
  Segment,
  Header,
  Message,
  Icon,
  Button,
} from 'semantic-ui-react';
import {
  Form,
  Input
} from "formik-semantic-ui";
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import isEmpty from 'lodash/fp/isEmpty';
import get from 'lodash/fp/get';

import firebase from '../../firebase';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: Yup.string()
    .min(0, 'required')
    .required('Please enter an email'),
});

const Login = () => {
  const [formErrors, setFormErrors] = useState({});
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon textAlign="center" style={{ color: '#452007' }}>
          <Icon name="talk" style={{ color: '#452007' }} />
          Login to KekeTalk
        </Header>
        <Form
          validateOnChange={false}
          validateOnBlur={false}
          size="large"
          initialValues={{
            password: '',
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, formikApi) => {
            const { email, password } = values;
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(_signedInUser => {
                formikApi.setSubmitting(false);
              })
              .catch(error => {
                setFormErrors({ ...formErrors, message: get("message", error)});
                formikApi.setSubmitting(false);
              })
          }}
          render={({ errors }) => {
            if(!isEmpty(errors)) {
              setFormErrors(errors);
            }
            return (
              <Segment stacked>
                <Input
                  fluid
                  name="email"
                  inputProps={{
                    icon:'mail',
                    iconPosition: 'left',
                    placeholder: 'Email Address',
                  }}
                />
                <Input
                  fluid
                  name="password"
                  inputProps={{
                    type:'password',
                    icon:'lock',
                    iconPosition: 'left',
                    placeholder: 'Password',
                  }}
                />
                <Button
                  fluid
                  size="large"
                  type="submit" 
                  style={{ background: '#452007', color: '#eee' }}
                >
                  Login
                </Button>
              </Segment>
          )}}
          />
        {get('message', formErrors)
          &&(
            <Message error>
              <h3>Error</h3>
              {get('message', formErrors)}
            </Message>
          ) }
        <Message>Don't have an account yet? Click <Link to="/register">here</Link> to register an account</Message>
      </Grid.Column>
    </Grid>
  )
}

export default Login;
