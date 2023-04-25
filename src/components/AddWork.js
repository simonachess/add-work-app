import { useEffect, useState } from 'react'
import { Card, Form } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { FloatingLabel } from "react-bootstrap"
import Companies from "./Companies"
import Services from "./Services"
import * as services from '../services/workServices'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../services/AuthServices'

function AddWork(props) {

    const [user, loading, error] = useAuthState(auth)

    const [items, setItems] = useState({
        date: '',
        company: '',
        service: '',
        description: '',
        startTime: '',
        endTime: '',
    })

    useEffect(() => {
        props.update && services.showById(item => setItems(item), props.update)
        if (user) {
            setItems({
                ...items,
                uid: user.uid //pridedami userio id kai pridedame darba
            })
        }
    }, [props.update, user])

    console.log(items)

    const handleChange = (e) => {
        setItems({
            ...items,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.setWorks(items)
        props.setShowAddWorkModal(false)
    }

    const updateHandler = () => {
        props.onUpdateWorkHandler(props.update, items)
    }

console.log(items)
    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date"
                            value={items.date}
                            name="date"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Choose enterprise"></FloatingLabel>
                        <Form.Select
                            value={items.company}
                            name="company"
                            aria-label="Floating label select example"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            required
                        >
                            <option value="">....</option>
                            <Companies companies={props.companies}
                        />
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Choose service"></FloatingLabel>
                        <Form.Select value={items.service}
                            name="service"
                            aria-label="Floating label select example"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            required
                        >
                            <option value="">....</option>
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
                            style={{ height: "100px" }}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>From:</Form.Label>
                        <Form.Control type="time"
                            name="startTime"
                            value={items.startTime}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>To:</Form.Label>
                        <Form.Control type="time"
                            name="endTime"
                            value={items.endTime}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    {(props.update) ?
                        <>
                            <Button variant="primary" type="button" onClick={updateHandler}>Update</Button>
                            <Button variant="danger" className="ml-2" type="button" onClick={props.closeWorkHandler}>Cancel</Button>
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