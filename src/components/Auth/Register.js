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
import md5 from 'md5';

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string()
    .test(
      "len",
      "Use a minimum of 8 characters, include letters and numbers",
        val => val && (val.length >= 8)
    )
    .required("Use 8 characters minimum"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match")
    .required("Passwords don't match"),
});

const Register = () => {
  const [formErrors, setFormErrors] = useState({})
  const [usersRef, setUsersRef] = useState(firebase.database().ref('users'))
  console.log({formErrors})
  return (
  <Grid textAlign="center" verticalAlign="middle" className="app">
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as="h2" icon color="brown" textAlign="center">
        <Icon name="puzzle piece" color="brown" />
        Register for Realtime Chatting
      </Header>
      <Form
        validateOnChange={false}
        validateOnBlur={false}
        size="large"
        initialValues={{
          username: '',
          password: '',
          passwordConfirm: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, formikApi) => {
          const { email, password, username } = values;
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((createdUser) => {
              createdUser.user.updateProfile({
                displayName: username,
                photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}`,
              })
              .then(() => {
                setUsersRef(
                  usersRef
                  .child(createdUser.user.uid)
                  .set({
                    name: createdUser.user.displayName,
                    avatar: createdUser.user.photoURL,
                  })
                );
                formikApi.setSubmitting(false);
              })
              console.log({createdUser})
            })
            .catch(error => {
              console.error({error});
              setFormErrors({ ...formErrors, message: get("message", error)})
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
                name="username"
                inputProps={{
                  type:'text',
                  icon:'user',
                  iconPosition: 'left',
                  placeholder: 'Username',
                }}
              />
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
              <Input
                fluid
                name="passwordConfirm"
                inputProps={{
                  type:'password',
                  icon:'repeat',
                  iconPosition: 'left',
                  placeholder: 'Confirm Password',
                }}
              />
              <Button type="submit" color="brown" fluid size="large">Submit</Button>
            </Segment>
        )}}
        />
      {get("message", formErrors)
        &&(
          <Message error>
            <h3>Error</h3>
            {get("message", formErrors)}
          </Message>
        ) }
      <Message>Already have an account? Click <Link to="/login">here</Link> to login</Message>
    </Grid.Column>
  </Grid>
  )
}

export default Register;
