import { Button, Card } from "react-bootstrap";
import AddWork from "./AddWork";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import WorksTable from "./WorksTable";
import * as services from '../services'

function Works(props) {
    const [addWork, setAddWork] = useState(false);
    const [works, setWorks] = useState([]);
    const [filterResults, setFilterResults] = useState([]);


    function addWorkHandler() {
        setAddWork(true);
    }

    function closeWorkHandler() {
        setAddWork(false);
    }

    const handleAddWork = (data) => {
        services.addWork(data)
        closeWorkHandler();
        props.status(true);
    }

    const handleFilter = (criteria) => {

        const filteredItems = works.filter(item => {
            return Object.keys(criteria).every(filter => {
                return criteria[filter] === item[filter]
            });

        });
        // console.log(filteredItems)
        setFilterResults(filteredItems);
    }


    useEffect(() => {
        services.getAllWorks(works => setWorks(works));
    }, [])

    return (
        <>
            {addWork && <AddWork setWorks={handleAddWork} />}
            <Card>
                <Card.Header>
                    <Filter filterCriteria={handleFilter} />
                </Card.Header>
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
                    <WorksTable data={filterResults.length ? filterResults : works} />
                </Card.Body>
            </Card>
        </>
    );
}

export default Works;