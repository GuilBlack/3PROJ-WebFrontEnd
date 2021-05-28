import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { registerStaff } from '../api';

export default function RegisterStaff() {
    const history = useHistory();

    const [err, setErr] = useState();
        
    const roles = [
        { value: "waiter", label: "Waiter" },
        { value: "cook", label: "Cook" },
        { value: "barman", label: "Barman" },
    ]

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

        if(!user.role){
            setErr("You forgot to input a role!");
            return;
        }

        // backend api call
        registerStaff(user)
        .then ((res) => {
            console.log(res.data);
            history.push("/staff");
        })
        .catch((err) => {
            if(err.response) {
                setErr(err.response.data.message);
            } else {
                setErr("Our servers are down at the moment. Please try again later.");
            }
        });
    }

    return (
        <div className="form-wrapper">
            <h1 className="text-center">New Staff Member</h1>
            <div className="text-center" hidden={!err}>
                <Alert variant="danger">
                        <Alert.Heading>Oops!</Alert.Heading>
                        <p> {err} </p>
                </Alert>
            </div>
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
                    <Select 
                        name="formRole"
                        options={roles}
                        className="basic-select"
                        classNamePrefix="select"
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" required={true} pattern="[a-zA-Z0-9\-_@.#$^*!=+/\\']{8,}" />
                    <Form.Text id="formTextPwd" className="subText">
                        Password must contain <strong>at least 8 characters</strong>.
                        The only special characters allowed are: <strong>- _ @ . # $ ^ * ! = + / \ '</strong>
                    </Form.Text>
                </Form.Group>
                <div className="d-flex justify-content-between">
                    <Button className="btnSubmit" type="submit"> Add Staff Member </Button>
                    <Button variant="outline-secondary" type="button" onClick={() => history.goBack()}> Cancel </Button>
                </div>
            </Form>
        </div>
    );
}