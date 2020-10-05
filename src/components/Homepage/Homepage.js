import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import AllCategories from '../AllCategories/AllCategories';

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetch('https://stark-dawn-55762.herokuapp.com/categories')
            .then(res => res.json())
            .then(data => setCategories(data.filter(categorySection => categorySection.category.toLowerCase().includes(search.trim().toLowerCase()))))
    }, [search])

    return (
        <div className="text-center mt-5">
            <div className="row pt-5"></div>
            <h1 className="pt-5">I GROW BY HELPING PEOPLE IN NEED.</h1>
            <InputGroup className="my-4 mx-auto" style={{ width: "25%" }}>
                <FormControl
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    aria-describedby="basic-addon"
                />
                <InputGroup.Append>
                    <Button variant="primary" className="px-4">Search</Button>
                </InputGroup.Append>
            </InputGroup>
            <div className="row mx-5 my-2">
                {
                    categories.map(category => <AllCategories category={category} key={category._id}></AllCategories>)
                }
            </div>
        </div>
    );
};

export default Homepage;