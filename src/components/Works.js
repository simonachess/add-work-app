import { Button, Card, Table } from "react-bootstrap";
import AddWork from "./AddWork";
import React, { useState } from "react";
import Work from './Work';

function Works(props) {
    const [addWork, setAddWork] = useState(false);
    const [works, setWorks] = useState([]);

    function addWorkHandler() {
        setAddWork(true);
    }

    function closeWorkHandler() {
        setAddWork(false);
    }

    const handleAddWork = (data) => {
        setWorks([
            ...works, data
        ]);
        closeWorkHandler();
        props.status(true);
    }

    return (
        <>
            {addWork && <AddWork setWorks={handleAddWork} />}
            <Card>
                <Card.Header>
                    {addWork ? (
                        <Button className="btn btn-danger" onClick={closeWorkHandler}>
                            Atšaukti
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" onClick={addWorkHandler}>
                            Pridėti
                        </Button>
                    )}
                </Card.Header>
                <Card.Header>
                    <h3>Darbų sąrašas</h3>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Klientas</th>
                                <th>Suteikta paslauga</th>
                                <th>Aprašymas</th>
                                <th>Trukmė</th>
                            </tr>
                        </thead>
                        <tbody>
                            {works.map((work, index) => {
                                return (
                                    <Work
                                        key={index}
                                        date={work.date}
                                        company={work.company}
                                        service={work.service}
                                        description={work.description}
                                        startTime={work.startTime}
                                        endTime={work.endTime} />)
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
}

export default Works;