import React, { useEffect, useState } from 'react';
import { Form, Col, Button, InputGroup, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { addMenuItem, listIngredients } from '../../api';

export default function AddMenuItem() {

    /**
     * TODO:
     * - handle ingredients amounts get removed when an ingredient is removed from the multi dropdown
     *  --> clear input values upon ingredient change?
     * - add CSS
     */

    // use the parameters sent in the url
    const { categoryType, categoryName, categoryId } = useParams();

    const history = useHistory();

    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientObject, setIngredientObject] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("Upload Image File");
    const [imagePreview, setImagePreview] = useState();
    const [info, setInfo] = useState(false);
    const [err, setErr] = useState();

    useEffect(() => {
        // call for list of ingredients
        listIngredients()
            .then((res) => {
                let ingredientsList = [];
                res.data.forEach((ing) => {
                    ingredientsList.push({
                        value: ing._id, label: ing.name.toLowerCase()
                    });
                });
                setIngredients(ingredientsList);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        setErr("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        setErr(err.response.data.message);
                } else {
                    setErr("We couldn't load the list of ingredients because the servers can't be reached at the moment.");
                }
            });
    }, []);

    const handleImageFile = e => {
        let imgFile = e.target.files[0];
        setFile(imgFile);
        setFileName(imgFile.name);
        let imageAsBase64 = URL.createObjectURL(imgFile);
        setImagePreview(imageAsBase64);
    }

    const newMenuItem = e => {
        e.preventDefault();
        
        if(!imagePreview) {
            return setErr("Please choose an image for this menu item.");
        } else if(ingredientObject.length === 0) {
            return setErr("You forgot to input the ingredients.");
        } else {
            setErr();
            setInfo(true);
        }

        const formData = e.target.elements;

        const menuItem = new FormData();
        menuItem.append('categoryId', categoryId);
        menuItem.append('name', formData.formName.value);
        menuItem.append('description', formData.formDesc.value);
        menuItem.append('imagePreview', file);
        menuItem.append('price', formData.formPrice.value);
        menuItem.append('ingredients', JSON.stringify(ingredientObject));

        // api call
        addMenuItem(menuItem)
            .then((res) => {
                history.push('/menu');
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        setErr("An unexpected error occured. Please log out and log back in to proceed.");
                    }
                    else {
                        setErr(err.response.data.message);
                    }
                } else {
                    setErr(err);
                }
                setInfo(false);
            });
    }
    return (
        <div>
            <h1 className="text-center">Add Menu Item</h1>
            <Form onSubmit={newMenuItem}>
                <div className="item">
                    <div className="form-wrapper">
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" value={categoryName} required={true} disabled />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Category Type</Form.Label>
                                <InputGroup className="mb-2">
                                    <Form.Control type="text" value={categoryType} disabled />
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formName">
                                <Form.Label>Dish/Drink Name</Form.Label>
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
                        <Form.Group controlId="formImage" >
                            <Form.Label>Dish/Drink Picture</Form.Label>
                            <Form.File
                                id="custom-file"
                                label={fileName}
                                custom
                                onChange={(e) => handleImageFile(e)}
                            />
                        </Form.Group>

                        <img id="preview-image" src={imagePreview} alt="preview" hidden={!imagePreview} />

                    </div>
                    <div className="form-wrapper">
                        <Form.Group controlId="formIngredients" >
                            <Form.Label>Ingredients</Form.Label>
                            <Select
                                isMulti
                                name="formIngredients"
                                options={ingredients}
                                defaultValue={selectedIngredients}
                                onChange={(items) => {
                                    setSelectedIngredients(items);
                                    let ingredientsList = [];
                                    items.forEach((ing) => {
                                        ingredientsList.push({
                                            ingredient: ing.value, amountUsed: 0
                                        });
                                    });
                                    setIngredientObject(ingredientsList);
                                }}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                            <Form.Text>
                                Make sure to add all ingredients before filling their amount values in.
                            </Form.Text>
                        </Form.Group>
                        <Form.Row>
                            {
                                selectedIngredients?.map(ing => (
                                    <div key={ing.value}>
                                        <Form.Group as={Col} >
                                            <Form.Label>{ing.label}</Form.Label>
                                            <Form.Control
                                                id=""
                                                type="number"
                                                step="0.01" 
                                                min="0.01"
                                                required={true}
                                                placeholder="Amount"
                                                onChange={(e) => {
                                                    setIngredientObject(
                                                        ingredientObject.map(item =>
                                                            item.ingredient === ing.value
                                                                ? { ...item, amountUsed: Number(e.target.value) }
                                                                : item
                                                        ))
                                                }}
                                            />
                                        </Form.Group>
                                    </div>
                                ))
                            }
                        </Form.Row>
                        <div>
                            <Alert variant="info" hidden={!info} >   
                                    <i style={{fontSize:"1.5em"}} className="bi bi-info-circle align-middle"></i>
                                    {' '} 
                                    <span className="align-middle">Your new menu item is being created. Please wait.. </span>
                            </Alert>
                            <Alert variant="danger" hidden={!err} dismissible onClose={() => setErr()} >
                                <i style={{fontSize:"1.5em"}} className="bi bi-exclamation-triangle align-middle"></i>
                                {' '} 
                                <span className="align-middle"> {err} </span>
                            </Alert>
                            <div className="d-flex justify-content-between">
                                <Button className="btnSubmit" type="submit"> Save </Button>
                                <Button variant="outline-secondary" type="button" onClick={() => history.goBack()}> Cancel </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}