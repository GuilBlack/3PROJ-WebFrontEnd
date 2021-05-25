import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { registerStaff } from './api';

export default function RegisterStaff() {
    let history = useHistory();

    // when submitting the register form
    const registerUser = e => {
        // prevent reloading of page
        e.preventDefault();

        // construct user object from the form's data
        const formData = e.target.elements;
        const user = {
            email: formData.formEmail.value,
            firstName: formData.formFName.value,
            lastName: formData.formLName.value,
            password: formData.formPassword.value,
            role: formData.formRole.value
        }

        // backend api call
        registerStaff(user)
        .then ((res) => {
            console.log(res.data);
            history.push("/staff");
        })
        .catch((err) => {
            console.log(err.response.data.message);
        });
    }

    return (
        <div className="login-register-container">
            <h1 className="text-center">New Staff Member</h1>
            <Form onSubmit={registerUser}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" required={true}/>
                </Form.Group>
                <Form.Group controlId="formFName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="John" required={true}/>
                </Form.Group>
                <Form.Group controlId="formLName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Doe" required={true}/>
                </Form.Group>
                <Form.Group controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select">
                        <option>waiter</option>
                        <option>cook</option>
                        <option>barman</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" required={true} pattern="[a-zA-Z0-9\-_@.#$^*!=+/\\']+.{8,}" />
                    <Form.Text id="formTextPwd" className="subText">
                        Password must contain <strong>at least 8 characters</strong>.
                        The only special characters allowed are: <strong>- _ @ . # $ ^ * ! = + / \ '</strong>
                    </Form.Text>
                </Form.Group>
                <div className="text-center">
                    <Button className="btnSubmit" type="submit">
                        Add Staff Member
                    </Button>
                </div>
            </Form>
        </div>
    )
}