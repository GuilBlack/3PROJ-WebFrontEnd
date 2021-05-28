import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { login } from '../api';
import AuthContext from '../context/AuthContext';

export default function Login() {
    const { setLoggedIn } = React.useContext(AuthContext);

    const history = useHistory();

    const [err, setErr] = useState();

    // when submitting the login form
    const logUserIn = e => {
        // prevent reloading of page
        e.preventDefault();

        // construct user object from the form's data
        const formData = e.target.elements;
        const user = {
            username: formData.formEmail.value,
            password: formData.formPassword.value
        }

        // backend api call
        login(user)
        .then(() => {
            setLoggedIn(true);
            history.push("/");
        })
        .catch((err) => {
            if(err.response)
                setErr(err.response.data.message);
            else
                setErr("Our servers are down at the moment. Please try again later.");
        });
    }

    return (
        <div className="form-wrapper">
            <h1 className="text-center">Sign In</h1>
            <div className="text-center" hidden={!err}>
                <Alert variant="danger">
                        <Alert.Heading>Oops!</Alert.Heading>
                        <p> {err} </p>
                </Alert>
            </div>
            <Form onSubmit={logUserIn}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required={true} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Your password" required={true} pattern="[a-zA-Z0-9\-_@.#$^*!=+/\\']+" />
                </Form.Group>
                <div className="text-center">
                    <Button className="btnSubmit" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    );
}
