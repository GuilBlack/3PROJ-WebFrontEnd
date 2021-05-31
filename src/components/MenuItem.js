import React, { useEffect, useState } from 'react';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import fs from 'fs';
import { addMenuItem } from '../api';

export default function MenuItem({ id }) {
    // TO PUT CATEGORY ID AS PARAM AND THEN SEND IN API CALL
    const history = useHistory();

    const [ingredients, setIngredients] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("Upload Image File");
    const [imagePreview, setImagePreview] = useState();

    // for existing menu items, get the data from database and fill the input fields in with existingItems.values {existingIngredients}
    const [existingItem, setExistingItem] = useState();

    useEffect(() => {
        if (id) {
            const getExistingData = () => {

                // call to backend api for this menu item

                let existingIngredients = []; // to build obj using {existingItem.ingredients} and use the IDs to filter {ingredientsList}
                // send filtered data to {ingredients}
            }
        }
    }, [id]);

    // will get ingredients from database, put them in an array as such
    // with value: {ObjectId}, label: {ingredientName}
    const ingredientsList = [
        { value: "ingredient 1", label: "Ingredient 1" },
        { value: "ingredient 2", label: "Ingredient 2" },
        { value: "ingredient 3", label: "Ingredient 3" },
        { value: "ingredient 4", label: "Ingredient 4" },
        { value: "ingredient 5", label: "Ingredient 5" },
        { value: "ingredient 6", label: "Ingredient 6" },
        { value: "ingredient 7", label: "Ingredient 7" },
        { value: "ingredient 8", label: "Ingredient 8" },
    ]

    const handleImageFile = e => {
        let imgFile = e.target.files[0];
        setFile(imgFile);
        setFileName(imgFile.name);
        let imageAsBase64 = URL.createObjectURL(imgFile);
        setImagePreview(imageAsBase64);
    }

    const addItem = e => {
        e.preventDefault();

        const formData = e.target.elements;

        let ingputain = [
            {
                "ingredient": "60b4c1c95b54a0c70e82d3f2",
                "ammountUsed": "7"
            }
        ]

        const menuItem = new FormData();
        menuItem.append('categoryId', '60b4c3676f30eb5df4c88ae4');
        menuItem.append('name', formData.formName.value);
        menuItem.append('description', formData.formDesc.value);
        menuItem.append('imagePreview', file);
        menuItem.append('price', formData.formPrice.value);
        menuItem.append('ingredients', JSON.stringify(ingputain));

        // Display the key/value pairs
        for (var pair of menuItem.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        // api call
        addMenuItem(menuItem)
            .then((res) => console.log(res))
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        console.log("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        console.log(err.response.data.message);
                } else {
                    console.log("Our servers are down at the moment. Please try again later.");
                }
            });
    }

    return (
        <div id="menu-item">
            <div className="form-wrapper">
                <Form onSubmit={addItem}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formName">
                            <Form.Label>Dish/Drink name</Form.Label>
                            <Form.Control type="text" required={true} />
                        </Form.Group>
                        <Form.Group as={Col} xs="4" controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>€</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="number" step="0.01" min="0.01" required={true} />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" required={true} />
                    </Form.Group>
                    <Form.Group controlId="formImage" xs="4">
                        <Form.Label>Dish/Drink picture</Form.Label>
                        <Form.File
                            id="custom-file"
                            label={fileName}
                            custom
                            onChange={(e) => handleImageFile(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formIngredients">
                        <Form.Label>Ingredients</Form.Label>
                        <Select
                            isMulti
                            name="formIngredients"
                            options={ingredientsList}
                            defaultValue={ingredients}
                            onChange={setIngredients}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                        <Button className="btnSubmit" type="submit"> Save </Button>
                        <Button variant="outline-secondary" type="button" onClick={() => history.goBack()}> Cancel </Button>
                    </div>
                </Form>
            </div>
            <div className="form-wrapper">
                <img id="preview" src={imagePreview} alt="preview" hidden={!imagePreview} />
            </div>
        </div>
    );
}