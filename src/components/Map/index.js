import React, { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
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

    /**
     * TODO:
     * - success msgs for saving layout
     */

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

    const updateMapLayout = () => {
        setInfo(true);
        updateTableArrangement({ layout: mapLayout })
            .then((res) => {
                console.log(res);
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
    }

    // make success alert automatically go away after 2 seconds
    if (success) {
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    }

    console.log(mapLayout);

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
                                            <div></div> 
                                            <MapTile tile={mapTile} key={mapTile.position} mapLayout={mapLayout} setMapLayout={setMapLayout} />
                                            </>
                                            : <MapTile tile={mapTile} key={mapTile.position} mapLayout={mapLayout} setMapLayout={setMapLayout} />
                                        ))
                                    }
                                </div>
                        }
                    </div>
                    <Button id="btn-map-save" variant="info" onClick={() => updateMapLayout()}> Save Layout </Button>
                </div>                    
            </div>


        </div>
    )
}