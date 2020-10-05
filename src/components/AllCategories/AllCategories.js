import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './AllCategories.css';

const AllCategories = ({ category }) => {
    const cardBG = ['#FFBD3E','#FF7044','#3F90FC','#421FCF'];
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 my-4 d-flex align-items-center justify-content-center">
            <Link to={'/register/' + category._id}>
                <Card className="category-card">
                    <Card.Img variant="top" className="card-img" src={category.imgUrl} />
                    <Card.Body className="cardBody" style={{backgroundColor: `${cardBG[Math.floor(Math.random() * 4)]}`}}>
                        <Card.Title className="card-text">{category.category}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
};

export default AllCategories;