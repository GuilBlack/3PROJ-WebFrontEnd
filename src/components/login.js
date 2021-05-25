import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { login } from './api';

export default function Login() {

    let history = useHistory();

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
        .then((res) => {
            history.push("/");
        })
        .catch((err) => {
            if(err.response)
                console.log(err.response.data.message);
            else
                console.log(err);
        });
    }

    return (
        <div>
            <h1 className="text-center">Sign In</h1>
            <Form onSubmit={logUserIn}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required={true} defaultValue="thegoodforkadmin@thegoodfork.com" />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Your password" required={true} pattern="[a-zA-Z0-9\-_@.#$^*!=+/\\']+" defaultValue="c'3stUNF4cK1ngsTR0nGp4Ssw8rd" />
                </Form.Group>
                <div className="text-center">
                    <Button className="btnSubmit" type="submit">
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    )
}