import { Card, Form, FloatingLabel, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
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

    const resetFilter = () => {
        setFilter({})
    }

    useEffect(() => {
        props.filterCriteria(filter)
    }, [filter])

    return (
        <Card>
            <Card.Header>Filter</Card.Header>
            <Form className="d-flex flex-direction-row">
                <Card.Body>
                    <Form.Group>
                        <FloatingLabel label="Choose enterprise"></FloatingLabel>
                        <Form.Select
                            name="company"
                            aria-label="Floating label select example"
                            style={{ width: "100%" }}
                            onChange={handleFilter}>
                            <option>....</option>
                            <Companies companies={props.companies} />
                        </Form.Select>
                    </Form.Group>
                </Card.Body>
                <Card.Body>
                    <Form.Group >
                        <FloatingLabel label="Choose service"> </FloatingLabel>
                        <Form.Select
                            name="service"
                            aria-label="Floating label select example"
                            style={{ width: "100%" }}
                            onChange={handleFilter}>
                            <option>....</option>
                            <Services />
                        </Form.Select>
                    </Form.Group>
                    {
                        (Object.keys(filter).length !== 0) &&
                        <Button variant="primary" type="reset" onClick={resetFilter}>Reset</Button>
                    }

                    {/* <Button variant="primary" type="submit">
                        Filter
                    </Button> */}
                </Card.Body>
            </Form>

        </Card>
    );
}

export default Filter;