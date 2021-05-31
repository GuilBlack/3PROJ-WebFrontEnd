import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function CategoryInfo(category, setRerender) {
    // path to use in route when creating new menu items
    const path = `/add-menu-item/${String(category.category.name)}/${String(category.category._id)}`;

    return (
        <div>
            <h3> {category?.category.name} </h3>

            <Link to={path} >New Menu Item</Link>

            {
                category?.category.menuItems.map(item => (
                    <div>
                        {item.name} {item.price}
                        <Button variant="link" onClick={() => {}}>
                            <i className="bi bi-x-circle-fill"></i>
                        </Button>
                    </div>
                ))
            }
        </div>
    );
}