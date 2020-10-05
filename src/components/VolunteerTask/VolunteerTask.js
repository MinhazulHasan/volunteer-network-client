import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const VolunteerTask = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('https://stark-dawn-55762.herokuapp.com/volunteer?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [])

    const deleteTask = (id) => {
        fetch(`https://stark-dawn-55762.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    document.getElementById(id).classList.add('d-none');
                }
            })
    }

    return (
        <div className="lightgray-bg">
            <div className="container">
                <div className="row pt-5"></div>
                <div className="row mt-5">
                    {
                        tasks.map(task => (
                            <div className="col-md-6 py-2 px-5" key={task._id} id={task._id}>
                                <div className="task row">
                                    <div className="task-img col-5">
                                        <img className="w-75" src={task.categoryImage} alt="" />
                                    </div>
                                    <div className="col-7 h-100 w-100 ">
                                        <div className="row">
                                            <h5>{task.category}</h5>
                                            <h4>{moment(task.date).format("Do MMM YY")}</h4>
                                        </div>
                                        <div className="row mt-5">
                                            <button onClick={() => deleteTask(task._id)} className="btn btn-secondary ml-auto">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default VolunteerTask;