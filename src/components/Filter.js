import { Card, Form, FloatingLabel, Button } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import Services from "./Services"
import Companies from "./Companies"

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
console.log(filter)
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">Filter
                <Button variant="primary" type="reset" onClick={resetFilter} disabled={Object.keys(filter).length === 0}>
                    Clear filter
                </Button>
            </Card.Header>
            <Form className="d-flex flex-direction-row">
                <Card.Body >
                    <Form.Group>
                        <FloatingLabel label="Choose enterprise"></FloatingLabel>
                        <Form.Select
                            name="company"
                            style={{ width: "100%" }}
                            onChange={handleFilter}
                            value={filter.company}
                        >
                            <option value="">...</option>
                            <Companies companies={props.companies} />
                        </Form.Select>
                    </Form.Group>
                </Card.Body >

                <Card.Body>
                    <Form.Group>
                        <FloatingLabel label="Choose service"> </FloatingLabel>
                        <Form.Select
                            name="service"
                            style={{ width: "100%" }}
                            onChange={handleFilter}
                            value={filter.service}
                        >
                            <option value="">...</option>
                            <Services />
                        </Form.Select>
                    </Form.Group>
                </Card.Body>
            </Form>
        </Card>
    )
}

export default Filter