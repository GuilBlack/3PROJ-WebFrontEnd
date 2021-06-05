import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function MapTile({ tile, mapLayout, setMapLayout }) {
    const [btnVariant, setBtnVariant] = useState(tile.hasTable ? "info" : "light");
    const [tableCapacity, setTableCapacity] = useState(tile.capacity);
    const [err, setErr] = useState(false);

    const closeModal = () => {
        setErr(false);
        if(!tile.hasTable)
            document.getElementsByClassName("table-capacity").value = null;
    }

    const handleMapTile = () => {
        if (tableCapacity < 2 || tableCapacity > 6 ) {
            setErr(true);
            return true;
        }

        let tableIsPresent;
        if (tile.hasTable) {
            tableIsPresent = false;
            setTableCapacity(0);
            setBtnVariant("light");
        } else {
            tableIsPresent = true;
            setBtnVariant("info");
            document.getElementsByClassName("table-capacity").value = null;
        }

        setMapLayout(
            mapLayout.map(mapTile => (
                mapTile.position === tile.position
                    ? { ...mapTile, hasTable: tableIsPresent, capacity: tableCapacity }
                    : mapTile
            ))
        );

        setErr(false);
        return false;
    }

    return (
        <div className="map-tile">
            <div className="position-center">
                <div>
                    <Popup 
                        trigger={
                            <Button variant={btnVariant} className="map-btn">
                                {tile.position}
                            </Button>
                        }
                        modal
                        onClose={closeModal}
                    >
                        {close => (
                            tile.hasTable
                                ?
                                <div className="text-center popup-info">
                                    <h3>Remove Table {tile.position}?</h3>
                                    <br />
                                    <p>Capacity: <strong>{tile.capacity}</strong> people</p>
                                    <br />
                                    <div className="d-flex justify-content-around">
                                        <Button
                                            onClick={async () => {
                                                let errStatus = await handleMapTile();
                                                if (!errStatus) close();
                                            }}
                                        >
                                            Yes
                                        </Button>
                                        <Button variant="outline-secondary" onClick={close}> No </Button>
                                    </div>
                                </div>
                                :
                                <div className="text-center popup-info">
                                    <h3>Add Table {tile.position}?</h3>
                                    <div>
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Table capacity:</Form.Label>
                                                <Form.Control
                                                    className="table-capacity"
                                                    type="number"
                                                    min="2"
                                                    max="6"
                                                    onChange={(e) => setTableCapacity(Number(e.target.value))}
                                                />
                                                <Form.Text className="text-danger">
                                                    {
                                                        err ? "Please input a number from 2 to 6!" : null
                                                    }
                                                </Form.Text>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        <Button
                                            onClick={async () => {
                                                let errStatus = await handleMapTile();
                                                if (!errStatus) close();
                                            }}
                                        >
                                            Add table
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={close}>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>  
                        )}
                    </Popup>
                </div>
            </div>
        </div>
    )
}