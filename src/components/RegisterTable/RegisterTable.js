import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import moment from "moment";

const RegisterTable = () => {
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        fetch('https://stark-dawn-55762.herokuapp.com/volunteers/all')
            .then(res => res.json())
            .then(result => setAllData(result))
    }, [])

    const removeRecord = id => {
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
        <Table className='mt-5' hover size="sm">
            <thead className='table-header'>
                <tr className="table-row">
                    <th>Name</th>
                    <th>Email ID</th>
                    <th>Registating date</th>
                    <th>Volunteer list</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    allData.map(data => (
                        <tr className="table-row" key={data._id} id={data._id}>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{moment(data.date).format("L")}</td>
                            <td>{data.category}</td>
                            <td className='text-center'>
                                <i
                                    className="fas fa-trash-alt trash-btn"
                                    onClick={() => removeRecord(data._id)}>
                                </i>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    );
};

export default RegisterTable;