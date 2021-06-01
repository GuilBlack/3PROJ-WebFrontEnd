import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { deleteMenuItem } from '../../api'

export default function CategoryInfo(category, setRerender) {
    // path to use in route when creating new menu items
    const path = `/add-menu-item/${String(category.category.name)}/${String(category.category._id)}`;

    const removeItem = (id) => {
        // api call
        deleteMenuItem({itemId: id})
        .then((res) => {
            console.log(res.data);
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
                console.log("Our servers are down at the moment. Please try again later.");
            }
        });
    }

    return (
        <div>
            <h3> {category?.category.name} </h3>

            <Link to={path} >New Menu Item</Link>

            {
                category?.category.menuItems.map(item => (
                    <div className="text-center" key={item._id}>
                        <div className="d-flex justify-content-end">
                            <Button variant="link" onClick={() => {removeItem(item._id)}}>
                                <i className="bi bi-x-circle-fill"></i>
                            </Button>
                        </div>
                        <h4>{item.name}</h4> 
                        <p>{item.description}</p>
                        <p>Price: €{item.price}</p>
                        <img src={item.imageUrl} alt="Girl in a jacket" width="300" height="auto" />
                    </div>
                ))
            }
        </div>
    );
}