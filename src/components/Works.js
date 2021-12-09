import { Button, Card } from "react-bootstrap";
import AddWork from "./AddWork";
import React, { useEffect, useState, useMemo } from "react";
import Filter from "./Filter";
import WorksTable from "./WorksTable";
import * as services from '../services';

export const WorkContext = React.createContext({})

function Works(props) {
    const [addWork, setAddWork] = useState(false);
    const [works, setWorks] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const [workId, setWorkId] = useState('');
    const [sortBy, setSortBy] = useState('COMPANY_DESC');
    // const [sortServiceBy, setSortServicetBy] = useState('SERVICE_DESC');
    const value = useMemo(() => (
        {
            workId, setWorkId
        }
    ), [workId])


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
    //apkeist
    const onUpdateWorkHandler = (id, data) => {
        services.updateWork(id, data)
        setWorkId('')
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


    //perdirbti prachekinant prevState
    const handleSortCompany = () => {
        if (sortBy === 'COMPANY_ASC') {
            setSortBy('COMPANY_DESC');
        }
        else {
            setSortBy('COMPANY_ASC');
        }
    }

    const handleSortService = () => {
        if (sortBy === 'COMPANY_ASC') {
            setSortBy('COMPANY_DESC');
        }
        else {
            setSortBy('COMPANY_ASC');
        }
    }


    useEffect(() => {
        services.getAllWorks(works => setWorks(works), sortBy);
    }, [sortBy])

    return (
        <>
            {(addWork || workId) && <AddWork setWorks={handleAddWork} update={workId} onUpdateWorkHandler={onUpdateWorkHandler} />}
            <Card>

                <Card.Header>
                    {addWork ? (
                        <Button className="btn btn-danger" onClick={closeWorkHandler}>
                            Cancel
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" onClick={addWorkHandler}>
                            Add
                        </Button>
                    )}
                </Card.Header>
                <Card.Header>
                    <Filter filterCriteria={handleFilter} />
                </Card.Header>
                <Card.Header>
                    <h3>List of works</h3>
                </Card.Header>
                <Card.Body>
                    <WorkContext.Provider value={value}>
                        <WorksTable handleSortCompany={handleSortCompany} handleSortService={handleSortService} data={filterResults.length ? filterResults : works} />
                    </WorkContext.Provider>
                </Card.Body>
            </Card>
        </>
    );
}

export default Works;