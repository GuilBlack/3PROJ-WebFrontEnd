import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="text-center">
            <h1 className="text-center">Welcome!</h1>
            <Link to="/staff">View Staff</Link> <br />
            <Link to="/register-staff">Register new staff member</Link> <br />
            <Link to="/menu">Edit menu</Link>
        </div>
    );
}