import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function MapTile({ tile, mapLayout, setMapLayout }) {
    const [btnVariant, setBtnVariant] = useState(tile.hasTable ? "info" : "light");
    const [tableCapacity, setTableCapacity] = useState(tile.capacity);
    const [err, setErr] = useState();

    /**
     * TODO:
     * - figure out how to clear input value for table capacity when closing the modal by clicking out of it
     */

    // useEffect(() => {
    //     if(tile.hasTable) setTableCapacity(tile.capacity);
    // }, [tile.capacity, tile.hasTable]);

    const handleMapTile = () => {
        if (tableCapacity === 0) {
            setErr("Table capacity missing.");
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

        setErr();
        return false;
    }

    console.log()

    return (
        <div className="map-tile">
            <div className="position-center">
                <div>
                    <Popup trigger={
                        <Button variant={btnVariant} className="map-btn">
                            {tile.position}
                        </Button>
                    }
                        modal
                    >
                        {close => (
                            tile.hasTable
                                ?
                                <div className="text-center">
                                    <h3>Remove Table {tile.position}?</h3>
                                    <div className="d-flex justify-content-around">
                                        <Button
                                            onClick={async () => {
                                                let errStatus = await handleMapTile();
                                                console.log(errStatus);
                                                if (!errStatus) close();
                                            }}
                                        >
                                            Yes
                                            </Button>
                                        <Button variant="outline-secondary" onClick={() => close()}> No </Button>
                                    </div>
                                </div>
                                :
                                <div className="text-center">
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
                                                console.log(errStatus);
                                                if (!errStatus) close();
                                            }}
                                        >
                                            Add table
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            onClick={() => {
                                                close();
                                                document.getElementsByClassName("table-capacity").value = null;
                                            }}>
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