import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import MapTile from './MapTile';
import Spinner from '../Spinner';
import { getTableArrangement, updateTableArrangement } from '../../api';
import mapTopView from '../../map/resto.png'

export default function Map() {
    const [mapLayout, setMapLayout] = useState([]);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(false);
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        // api call
        getTableArrangement()
            .then((res) => {
                res.data.forEach(layoutElement => {
                    delete layoutElement.reservations;
                    delete layoutElement._id;
                });
                setMapLayout(res.data);
                setLoading(false);
                setErr();
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        setErr("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        setErr(err.response.data.message);
                } else {
                    setErr("We couldn't fetch the restaurant layout because our servers are down at the moment.");
                }
                setLoading(false);
            })
        }, []);
        
        const updateMapLayout = (canProceed) => {
            let today = new Date();
            let currTime = today.getHours();
            
            // check if the user can update the table arrangement at the current time
            if (currTime >= 23 || canProceed) {
                setInfo(true);
                updateTableArrangement({ layout: mapLayout })
                .then((res) => {
                    setSuccess(true);
                    setErr();
                })
                .catch((err) => {
                    if (err.response) {
                        if (err.response.status === 401)
                        setErr("An unexpected error occured. Please log out and log back in to proceed.");
                        else
                        setErr(err.response.data.message);
                    } else {
                        setErr("Failed to update the map: our servers are down at the moment.");
                    }
                });
                setInfo(false);
        } else {
            setOpenModal(true);
        }
    }

    // make success alert automatically go away after 2 seconds
    if (success) {
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    }

    return (
        <div>
            <h1 className="text-center">Map</h1>

            <Alert variant="info" hidden={!info} className="text-center" >
                <i style={{ fontSize: "1.5em" }} className="bi bi-info-circle align-middle"></i>
                {' '}
                <span className="align-middle">The restaurant layout is being saved... </span>
            </Alert>

            <Alert variant="success" hidden={!success} className="text-center" >
                <i style={{ fontSize: "1.5em" }} className="bi bi-check2-circle align-middle"></i>
                {' '}
                <span className="align-middle">Map successfully updated!</span>
            </Alert>

            <Alert variant="danger" hidden={!err} className="text-center" >
                <i style={{ fontSize: "1.5em" }} className="bi bi-exclamation-triangle align-middle"></i>
                {' '}
                <span className="align-middle"> {err} </span>
            </Alert>

            <div className="position-center">
                <div id="map-container">
                    <img id="map-image" src={mapTopView} alt="Top View of map"></img>
                    <div id="map-tables" >
                        {
                            loading
                                ? <Spinner />
                                : <div id="map" >
                                    {
                                        mapLayout?.map(mapTile => (
                                            mapTile.position === 9 || mapTile.position === 16 
                                            ? <>
                                            <div key={(mapTile.position + 30)}></div> 
                                            <MapTile tile={mapTile} key={mapTile.position} mapLayout={mapLayout} setMapLayout={setMapLayout} />
                                            </>
                                            : <MapTile tile={mapTile} key={mapTile.position} mapLayout={mapLayout} setMapLayout={setMapLayout} />
                                        ))
                                    }
                                </div>
                        }
                    </div>
                    <Button id="btn-map-save" variant="info" onClick={() => updateMapLayout(false)}> Save Layout </Button>
                </div>                    
            </div>

            <Popup 
                open={openModal}
                closeOnDocumentClick
                onClose={() => setOpenModal(false)}
                modal
            >
                <div className="text-center popup-info">
                    <i className="bi bi-exclamation-triangle-fill text-danger" style={{fontSize:"10em"}}></i>
                    <p>
                        You're about to save a layout while operations might still be going on in the restaurant for the day.{' '}
                        <strong className="text-danger">Proceed only if the restaurant is currently not in activity.</strong>
                    </p>
                    <br />
                    <div className="d-flex justify-content-around">
                        <Button
                            variant="outline-danger"
                            onClick={() => {
                                updateMapLayout(true); 
                                setOpenModal(false);
                            }}
                        >
                            Proceed
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}