import { useState } from 'react';
import { Card, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Companies from "./Companies";
import Services from "./Services";


function AddWork(props) {

    const [items, setItems] = useState({
        date: '',
        company: '',
        service: '',
        description: '',
        startTime: '',
        endTime: ''
    })

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

                    <FloatingLabel className="mb-3" label="Choose enterprise">
                        <Form.Select value={items.company}
                            name="company"
                            aria-label="Floating label select example"
                            onChange={handleChange}>
                            <option>....</option>
                            <Companies />
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel className="mb-3" label="Choose service">
                        <Form.Select value={items.service}
                            name="service"
                            aria-label="Floating label select example"
                            onChange={handleChange}>
                            <option>....</option>
                            <Services />
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel label="Atlikto darbo aprašymas">
                        <Form.Control value={items.description}
                            name="description"
                            as="textarea"
                            placeholder="Leave a comment here"
                            onChange={handleChange}
                            style={{ height: "100px" }} />
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Label>Nuo:</Form.Label>
                        <Form.Control type="time"
                            name="startTime"
                            value={items.startTime}
                            onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Iki:</Form.Label>
                        <Form.Control type="time"
                            name="endTime"
                            value={items.endTime}
                            onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AddWork;