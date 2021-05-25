import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listStaff } from './api';
import StaffInfo from './staffInfo';

export default function Staff() {
    const [staffMembers, setStaffMembers] = useState();
    const roles = ["waiter", "barman", "cook"];
    
    useEffect(() => {
        // api call
        listStaff()
        .then((res) => {
            console.log(res);
            setStaffMembers(res.data);
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
                <Link to="/register-staff">Add a staff member</Link>
            </div>
            
            <div id="list-staff">
                {
                    staffMembers ? 
                    roles.map(role => (
                            <div className="staff-section">
                                <h2 className="text-center"> { role.toUpperCase() } </h2>
                                <StaffInfo role={role} staffMembers={staffMembers} />
                            </div>
                        )
                    )
                    :
                    <div>No staff :c</div>
                }
                
            </div>
        </div>
    )
}