import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const AddEvent = () => {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const history = useHistory();

    const handleAdd = e => {
        e.preventDefault();
        const event = { category, date, description };
        fetch('https://stark-dawn-55762.herokuapp.com/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push('/home');
                }
                else {
                    document.getElementById('upload-error').innerText = 'Task add Unsuccessfull';
                }
            })
    }

    return (
        <div className='mt-5' style={{ backgroundColor: '#E5E5E5', borderRadius: '10px' }}>
            <Form onSubmit={handleAdd} className='p-5'>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Event Title</Form.Label>
                        <Form.Control onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter title" required />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control onChange={(e) => setDate(e.target.value)} type="date" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder="Enter Designation" required />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Button className="ml-auto" variant="primary" type="submit">Submit</Button>
                </Form.Row>
                <p id='upload-error' className='text-danger'></p>
            </Form>
        </div>
    );
};

export default AddEvent;