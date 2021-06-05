import React, { useState } from 'react';
import { Form, Col, Button, Alert } from 'react-bootstrap';
import { addMenuCategory, deleteCategory } from '../../api';
import CategoryInfo from './CategoryInfo';

export default function CategoryTypeSection({ type, categories, setRerender }) {
    const [hideForm, setHideForm] = useState(true);
    const [nameInput, setNameInput] = useState("");
    const [success, setSucess] = useState(false);
    const [err, setErr] = useState();

    // when adding a new category
    const newCategory = e => {
        // prevent reloading of page
        e.preventDefault();

        // construct user object from the form's data
        const formData = e.target.elements;
        const newCategory = {
            name: formData.formName.value,
            type: type
        }

        // api call
        addMenuCategory(newCategory)
            .then((res) => {
                console.log(res);
                setRerender(res.config.data);
                setNameInput("");
                setSucess(true);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        setErr("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        setErr(`Category "${nameInput}" already exists`);
                } else {
                    setErr("The servers can't be reached at the moment.");
                }
                setNameInput("");
            });
    }

    // when deleting a category
    const removeCategory = id => {
        deleteCategory({ categoryId: id })
            .then((res) => {
                console.log(res);
                setRerender(id);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        console.log("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        console.log(err.response.data.message);
                    console.log(err.response.data.err);
                } else {
                    console.log("The servers can't be reached at the moment.");
                }
            });
    }


    // make success alert automatically go away after 2 seconds
    if (success) {
        setTimeout(() => {
            setSucess(false);
        }, 2000);
    }

    // make error alert automatically go away after 2 seconds
    if (err) {
        setTimeout(() => {
            setErr();
        }, 2000);
    }

    return (
        <div>
            <Button style={{ marginLeft: "10px" }} onClick={() => setHideForm(!hideForm)} variant="outline-primary">
                <i className="bi bi-folder-plus"></i> New Category
            </Button>

            <div hidden={hideForm}>
                    <Form onSubmit={newCategory}>
                        <Form.Row className="align-items-center">
                            <Col xs="auto">
                                <Form.Control id="formName" type="text" required={true} value={nameInput} placeholder="Category name" onChange={(e) => setNameInput(e.target.value)} />
                            </Col>
                            <Col xs="auto">
                                <Button className="btnSubmit" type="submit">Add</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                    <Alert variant="success" hidden={!success} >    
                        <i style={{fontSize:"1.5em"}} className="bi bi-check2-circle align-middle"></i>
                        {' '} 
                        <span className="align-middle">Successfully added!</span>
                    </Alert>
                    <Alert variant="danger" hidden={!err} >
                        <i style={{fontSize:"1.5em"}} className="bi bi-exclamation-triangle align-middle"></i>
                        {' '} 
                        <span className="align-middle"> {err} </span>
                    </Alert>
            </div>

            {
                categories?.filter(category => category.type.includes(type))
                    .map(filteredCategory => (
                        <div className="menu-info" key={filteredCategory._id}>
                            <div className="d-flex justify-content-end">
                                <Button variant="link" onClick={() => removeCategory(filteredCategory._id)}>
                                    <i className="bi bi-x-circle-fill"></i>
                                </Button>
                            </div>
                            <CategoryInfo category={filteredCategory} setRerender={setRerender} />
                        </div>
                    ))
            }
        </div>
    );
}