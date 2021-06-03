import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MapTile from './MapTile';
import Spinner from '../Spinner';
import { getTableArrangement, updateTableArrangement } from '../../api';

export default function Map() {
    const [mapLayout, setMapLayout] = useState([]);
    const [backupLayout, setBackupMapLayout] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // api call
        getTableArrangement()
            .then((res) => {
                res.data.forEach(layoutElement => {
                    delete layoutElement.reservations;
                    delete layoutElement._id;
                });
                setMapLayout(res.data);
                setBackupMapLayout(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        console.log("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        console.log(err.response.data.message);
                } else {
                    console.log("We couldn't fetch the table arrangement because our servers are down at the moment.");
                }
                setLoading(false);
            })
    }, []);

    const updateMapLayout = () => {
        updateTableArrangement({layout: mapLayout})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 401)
                    console.log("An unexpected error occured. Please log out and log back in to proceed.");
                else
                    console.log(err.response.data.message);
            } else {
                console.log("Our servers are down at the moment.");
            }
        })
    }

    console.log(mapLayout);

    return (
        <div>
            <h1 className="text-center">Map</h1>

            <div className="position-center" >
                {
                    loading
                        ? <Spinner />
                        : <div id="map" >
                            {
                                mapLayout?.map(mapTile => (
                                    <MapTile tile={mapTile} key={mapTile.position} mapLayout={mapLayout} setMapLayout={setMapLayout} />
                                ))
                            }
                        </div>
                }
            </div>

            <div className="btn-bottom">
                {/* <div className="d-flex justify-content-around"> */}
                    {/* <Button variant="outline-primary" onClick={() => setMapLayout(backupLayout)}> Reset </Button> */}
                    <Button onClick={() => updateMapLayout()}> Save </Button>
                {/* </div> */}
            </div>
        </div>
    )
}