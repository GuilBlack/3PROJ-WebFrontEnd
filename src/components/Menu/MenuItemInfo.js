import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PropTypes from 'prop-types';
import { deleteMenuItem } from '../../api';

export default function MenuItemInfo({ menuItem, setRerender }) {
    // to open and close popup picture
    const [openModal, setOpenModal] = useState(false);
    const [err, setErr] = useState();

    const removeItem = (id) => {
        // api call
        deleteMenuItem({ itemId: id })
            .then((res) => {
                setRerender(id);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        setErr("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        setErr(err.response.data.message);
                } else {
                    setErr("Our servers are down at the moment. Please try again later.");
                }
            });
    }

    if (err) {
        setTimeout(() => {
            setErr();
        }, 2000);
    }

    return (
        <div className="menu-item">
                <div className="d-flex justify-content-end">
                    <Button className="delete-btn" id="menu-item-delete-btn" variant="link" onClick={() => { removeItem(menuItem._id) }}>
                        <i className="bi bi-x-circle-fill"></i>
                    </Button>
                </div>

                <Alert variant="danger" hidden={!err} >
                    <i style={{ fontSize: "1.5em" }} className="bi bi-exclamation-triangle align-middle"></i>
                    {' '}
                    <span className="align-middle"> {err} </span>
                </Alert>

                <h2 className="text-center">{menuItem.name}</h2>

                <button className="menu-item-thumbnail-btn" type="button" onClick={() => setOpenModal(true)}>
                    <img className="menu-item-thumbnail" src={menuItem.imageUrl} alt="Menu item" />
                </button>

                <h3 className="text-center" style={{paddingTop:"10px"}}>{menuItem.price.toFixed(2)} €</h3>

                <div style={{padding:"20px", marginTop:"-12px"}}>
                    <h5>Description: </h5>
                    <p>{menuItem.description}</p>
                </div>

                <Popup
                    open={openModal}
                    closeOnDocumentClick
                    onClose={() => setOpenModal(false)}
                    modal
                >
                    <img src={menuItem.imageUrl} alt="Menu item" id="image-popup" />
                </Popup>
        </div>
    )
}

MenuItemInfo.propTypes = {
    menuItem: PropTypes.object,
    setRerender: PropTypes.func.isRequired
}