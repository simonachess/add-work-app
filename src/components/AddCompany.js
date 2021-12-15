import { useState } from 'react';
import { Card, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";

function AddCompany(props) {

    const [companyInfo, setCompanyInfo] = useState({
        title: '',
        name: '',
        address: '',
    })

    const handleChange = (e) => {
        setCompanyInfo({
            ...companyInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setCompany(companyInfo);
        console.log(companyInfo)
    }

    return (
        <Card>
            <Card.Header>Add Company</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Head of company"></FloatingLabel>
                        <Form.Control
                            name="name"
                            type="text"
                            placeholder="Name, Last name"
                            defaultValue={companyInfo.name}
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Company name"></FloatingLabel>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Company name"
                            defaultValue={companyInfo.title}
                            onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="Adress"></FloatingLabel>
                        <Form.Control
                            name="address"
                            type="text"
                            placeholder="Adress"
                            defaultValue={companyInfo.address}
                            onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Save</Button>
                </Form>
            </Card.Body>
        </Card >
    );
}

export default AddCompany;