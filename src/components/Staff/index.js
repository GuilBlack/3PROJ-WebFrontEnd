import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { listStaff } from '../../api';
import StaffInfo from './StaffInfo';
import Spinner from '../Spinner';

export default function Staff() {
    const [staffMembers, setStaffMembers] = useState();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState();
    const roles = ["waiter", "barman", "cook"];
    
    useEffect(() => {
        // api call
        listStaff()
        .then((res) => {
            setStaffMembers(res.data);
            setLoading(false);
        })
        .catch((err) => {
            if(err.response) {
                if(err.response.status === 401)
                    setErr("An unexpected error occured. Please log out and log back in to proceed.");
                else
                    setErr(err.response.data.message);
            } else {
                setErr("We couldn't fetch your data because our servers are down at the moment.");
            }
            setLoading(false);
        });
    }, []);

    return (
        <div>
            <h1 className="text-center">Staff</h1>
            
            <div className="text-center" hidden={!(staffMembers?.length === 0)}>
                <Alert variant="info">
                        <Alert.Heading>You don't have staff members yet</Alert.Heading>
                </Alert>
            </div>
            
            <div className="text-center" hidden={!err}>
                <Alert variant="danger">
                        <Alert.Heading>Sorry!</Alert.Heading>
                        <p> {err} </p>
                </Alert>
            </div>
            
            <div id="list-staff">
                {
                    roles.map(role => (
                            <div className="staff-section" key={role}>
                                <h2 className="text-center"> { role.toUpperCase() } </h2>
                                {
                                    loading ? <Spinner /> : <StaffInfo role={role} staffMembers={staffMembers} />
                                }
                            </div>
                        )
                    )
                }
                <div className="add-staff text-center">
                    <Link to="/register-staff">
                        <div>
                            <i className="bi bi-person-plus-fill"></i>
                            <p>Add a staff member</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
