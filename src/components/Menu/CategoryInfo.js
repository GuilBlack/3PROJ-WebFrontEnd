import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MenuItemInfo from './MenuItemInfo';

export default function CategoryInfo({ category, setRerender }) {
    // path to use in route when creating new menu items
    const path = `/${String(category.type)}/${String(category.name)}/${String(category._id)}/new`;

    return (
        <div>
            <h2> {category.name} </h2>

            <Link to={path} >
                <Button variant="outline-light">
                    <i className="bi bi-file-earmark-plus"></i>
                    {' '}
                    New Menu Item
                </Button>
            </Link>

            <div className="menu-items">
                {
                    category.menuItems.map(item => (
                        <MenuItemInfo key={item._id} menuItem={item} setRerender={setRerender} />
                    ))
                }
            </div>
        </div>
    );
}

CategoryInfo.propTypes = {
    category: PropTypes.object,
    setRerender: PropTypes.func.isRequired
}