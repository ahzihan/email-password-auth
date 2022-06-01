import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth( app );
function App() {
  const [ error, setError ] = useState( '' );
  const [ registered, setRegistered ] = useState( '' );
  const [ validated, setValidated ] = useState( false );
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );

  const handleEmail = event => {
    setEmail( event.target.value );
  };
  const handlePassword = event => {
    setPassword( event.target.value );
  };

  const handleRegister = event => {
    setRegistered( event.target.checked );
  };

  const handleFormSubmit = event => {

    const form = event.currentTarget;
    if ( form.checkValidity() === false ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setValidated( true );
    if ( registered ) {
      console.log( email, password );
      signInWithEmailAndPassword( auth, email, password )
        .then( result => {
          const user = result.user;
          console.log( user );
          setError( '' );
        } ).catch( error => {
          setError( error.message );
        } );
    } else {
      createUserWithEmailAndPassword( auth, email, password )
        .then( result => {
          const user = result.user;
          console.log( user );
          setEmail( '' );
          setPassword( '' );
          setError( '' );
          verifyEmail();
        } ).catch( error => {
          console.error( 'Error: ', error );
          setError( error.message );
        } );
    }

    event.preventDefault();
  };
  const verifyEmail = () => {
    sendEmailVerification( auth.currentUser )
      .then( () => {
        console.log( 'Email verification send' );
      } );
  };
  const handleResetPassword = () => {
    sendPasswordResetEmail( auth, email )
      .then( () => {
        console.log( 'send email' );
      } );
  };

  return (
    <div>
      <div className="login-form w-50 my-3 mx-auto">
        <h2 className="text-primary">{registered ? 'Login' : 'Registration'}  Form!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmail} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassword} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegister} type="checkbox" label="Already Registered" />
          </Form.Group>
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
          <Button onClick={handleResetPassword} variant="link">Forget Password?</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
