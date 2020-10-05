import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const RegisterVolunteer = () => {

    const { categoryID } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedCategory, setSelectedCategory] = useState({});
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        fetch(`https://stark-dawn-55762.herokuapp.com/category/${categoryID}`)
            .then(res => res.json())
            .then(data => {
                setSelectedCategory(data);
            })
    }, [])

    const onSubmit = data => {
        fetch('https://stark-dawn-55762.herokuapp.com/volunteerInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...data, categoryImage: selectedCategory.imgUrl })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push('/task');
                }
                else {
                    document.getElementById('not-upload').innerText = 'User data update unsuccessful';
                }
            })
    }

    return (
        <div className="lightgray-bg d-flex align-items-center justify-content-center">
            <div className="form-box">
                < form className='user-form py-4 px-5' onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="mb-4">Register as a Volunteer</h2>
                    <div className="form-group">
                        < input className="form-control" defaultValue={loggedInUser.name} name="name" ref={register({ required: true })} placeholder="Full Name" />
                        {errors.name && <span className='text-danger'>Name is required</span>}
                    </div>

                    <div className="form-group">
                        < input className="form-control" defaultValue={loggedInUser.email} name="email" ref={register({ required: true })} placeholder="Username or Email" />
                        {errors.email && <span className='text-danger'>Email is required</span>}
                    </div>

                    <div className="form-group">
                        < input type="date" className="form-control" name="date" ref={register({ required: true })} placeholder="Date" />
                        {errors.date && <span className='text-danger'>Date is required</span>}
                    </div>

                    <div className="form-group">
                        < input className="form-control" name="desicription" ref={register({ required: true })} placeholder="Desicription" />
                        {errors.desicription && <span className='text-danger'>Description is required</span>}
                    </div>

                    <div className="form-group">
                        < input className="form-control" defaultValue={selectedCategory.category} name="category" ref={register({ required: true })} placeholder="Category" />
                        {errors.category && <span className='text-danger'>Category is required</span>}
                    </div>

                    <div className="form-group mt-4">
                        <button type="submit" className="btn btn-primary btn-block">Registration</button>
                    </div>

                    <p id='not-upload' className='text-danger'></p>
                </form >
            </div>
        </div>
    );
};

export default RegisterVolunteer;