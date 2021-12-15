import { useEffect, useState } from 'react';
import { Card, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Companies from "./Companies";
import Services from "./Services";
import * as services from '../services';


function AddWork(props) {

    const [items, setItems] = useState({
        date: '',
        company: '',
        service: '',
        description: '',
        startTime: '',
        endTime: ''
    })


    useEffect(() => {
        props.update && services.showById(item => setItems(item), props.update)
    }, [props.update])

    const handleChange = (e) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setWorks(items);
    }

    const updateHandler = () => {
        props.onUpdateWorkHandler(props.update, items)
    }

    return (
        <Card>
            <Card.Header>Add work</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"
                            value={items.date}
                            name="date"
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Choose enterprise"></FloatingLabel>
                        <Form.Select value={items.company}
                            name="company"
                            aria-label="Floating label select example"
                            style={{ width: "100%" }}
                            onChange={handleChange}>
                            <option>....</option>
                            <Companies />
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Choose service"></FloatingLabel>
                        <Form.Select value={items.service}
                            name="service"
                            aria-label="Floating label select example"
                            style={{ width: "100%" }}
                            onChange={handleChange}>
                            <option>....</option>
                            <Services />
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Description"></FloatingLabel>
                        <Form.Control value={items.description}
                            name="description"
                            as="textarea"
                            placeholder="Leave a comment here"
                            onChange={handleChange}
                            style={{ height: "100px" }} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>From:</Form.Label>
                        <Form.Control type="time"
                            name="startTime"
                            value={items.startTime}
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>To:</Form.Label>
                        <Form.Control type="time"
                            name="endTime"
                            value={items.endTime}
                            onChange={handleChange} />
                    </Form.Group>
                    {(props.update) ?
                        <>
                            <Button variant="primary" type="button" onClick={updateHandler}>Update</Button>
                            {/* <Button variant="primary" type="button" onClick={props.setWorkId('')}>Cancel</Button> */}
                        </>
                        :
                        <Button variant="primary" type="submit">Save</Button>
                    }
                </Form>
            </Card.Body>
        </Card >
    );
}

export default AddWork;