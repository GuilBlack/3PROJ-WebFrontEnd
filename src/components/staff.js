import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listStaff } from './api';
import StaffInfo from './staffInfo';
import Spinner from './spinner';

export default function Staff() {
    const [staffMembers, setStaffMembers] = useState();
    const [loading, setLoading] = useState(true);
    const roles = ["waiter", "barman", "cook"];
    
    useEffect(() => {
        // api call
        listStaff()
        .then((res) => {
            console.log(res);
            setStaffMembers(res.data);
            setLoading(false);
        })
        .catch((err) => {
            if(err.response) {
                console.log(err.response.data.message);
            } else {
                console.log(err);
            }
        });
    }, []);

    return (
        <div>
            <h1 className="text-center">Staff</h1>
            
            <div className="text-center">
                <Link to="/register-staff">Add a staff member <i class="bi bi-person-plus-fill"></i></Link>
            </div>
            
            <div id="list-staff">
                {
                    roles.map(role => (
                            <div className="staff-section">
                                <h2 className="text-center"> { role.toUpperCase() } </h2>
                                {
                                    loading ? <Spinner /> : <StaffInfo role={role} staffMembers={staffMembers} />
                                }
                            </div>
                        )
                    )
                }
                
            </div>
        </div>
    )
}