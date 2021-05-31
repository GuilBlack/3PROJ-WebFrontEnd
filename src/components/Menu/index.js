import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { getAllCategories } from '../../api';
import CategoryTypeSection from './CategoryTypeSection';
import Spinner from '../Spinner';

export default function Menu() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState();
    const [rerender, setRerender] = useState();

    const categoryTypes = ["Appetisers", "Main Course", "Side Dishes", "Desserts", "Drinks"];

    useEffect(() => {
        getAllCategories()
            .then((res) => {
                console.log(res.data);
                setCategories(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        setErr("An unexpected error occured. Please log out and log back in to proceed.");
                    else
                        setErr(err.response.data.message);
                } else {
                    setErr("We couldn't fetch your data because our servers are down at the moment.");
                }
                setLoading(false);
            });
    }, [rerender]);

    return (
        <div id="menu">
            <h1 className="text-center">Menu</h1>
            <div className="text-center" hidden={!err}>
                <Alert variant="danger">
                        <Alert.Heading>Oops!</Alert.Heading>
                        <p> {err} </p>
                </Alert>
            </div>
            <div>
                {
                    categoryTypes.map(type => (
                        <div className="category-type-section" key={type} >
                            <h2 className="text-center"> {type} </h2>
                            {
                                loading ? <Spinner /> : <CategoryTypeSection type={type} categories={categories} setRerender={setRerender} />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
