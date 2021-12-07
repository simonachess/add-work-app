import { Card, Form, FloatingLabel, Button } from "react-bootstrap";
import React, { useState } from "react";
import Services from "./Services";
import Companies from "./Companies";

function Filter(props) {

    const [filter, setFilter] = useState({})

    const handleFilter = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.filterCriteria(filter)
    }

    return (
        <Card>
            <Card.Header>Add work</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel className="mb-3" label="Choose enterprise">
                        <Form.Select
                            name="company"
                            aria-label="Floating label select example"
                            onChange={handleFilter}>
                            <option>....</option>
                            <Companies />
                        </Form.Select>
                    </FloatingLabel>

                    <FloatingLabel className="mb-3" label="Choose service">
                        <Form.Select
                            name="service"
                            aria-label="Floating label select example"
                            onChange={handleFilter}>
                            <option>....</option>
                            <Services />
                        </Form.Select>
                    </FloatingLabel>
                    <Button variant="primary" type="submit">
                        Filter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Filter;