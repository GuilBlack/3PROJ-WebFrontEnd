import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import AddMenuItem from './AddMenuItem';

export default function Menu() {
    const [categories, getCategories] = useState([]);

    const newCategory = () => {

    }

    const fetchCategories = () => {
        
    }

    return (
        <div id="menu">
            <h1 className="text-center">Menu</h1>
            <div className="text-center">
                <Button>
                    Add a Category
                </Button>
            </div>
            <AddMenuItem />
        </div>
    );
}
