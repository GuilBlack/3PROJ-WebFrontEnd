import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="text-center">
            <h1 className="text-center">Welcome!</h1>
            <div id="home-dashboard">
                <Link to="/staff">
                    <div className="home-item">
                        <i className="bi bi-person-fill"></i>
                        <br />
                        <h2>Staff</h2>
                    </div>
                </Link>
                <Link to="/map">
                    <div className="home-item">
                        <i className="bi bi-building"></i>
                        <br />
                        <h2>Map</h2>
                    </div>
                </Link>
                <Link to="/menu">
                    <div className="home-item">
                        <i className="bi bi-layout-text-sidebar-reverse"></i>
                        <br />
                        <h2>Menu</h2>
                    </div>
                </Link>
                <Link to="/stock">
                    <div className="home-item">
                        <i className="bi bi-box-seam"></i>
                        <br />
                        <h2>Stock</h2>
                    </div>
                </Link>
                <Link to="/sales">
                    <div className="home-item">
                        <i className="bi bi-receipt-cutoff"></i>
                        <br />
                        <h2>Sales</h2>
                    </div>
                </Link>
            </div>

        </div>
    );
}
