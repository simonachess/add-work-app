import { Button, Card } from "react-bootstrap";
import AddWork from "./AddWork";
import CompaniesList from "./CompaniesList";
import AddCompany from "./AddCompany";
import React, { useEffect, useState, useMemo, useRef } from "react";
import Filter from "./Filter";
import WorksTable from "./WorksTable";
import * as services from '../services';
import * as servicesCompany from '../servicesCompany';

export const WorkContext = React.createContext({})

function Works(props) {
    const [addWork, setAddWork] = useState(false);
    const [addCompany, setAddCompany] = useState(false);
    const [works, setWorks] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [companiesList, setCompaniesList] = useState(false);
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
    const addCompanyHandler = () => {
        setAddCompany(true);
    }
    const closeAddCompanyForm = () => {
        setAddCompany(false);
    }

    const handleAddCompany = (comanpies) => {
        servicesCompany.addCompany(comanpies)
        closeAddCompanyForm();
        props.status(true);
    }

    const showCompaniesList = () => {
        setCompaniesList(true);
    }
    const closeCompaniesList = () => {
        setCompaniesList(false);
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
        setFilterResults(filteredItems);
    }

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
        console.log('works', works)
    }, [sortBy])

    useEffect(() => {
        servicesCompany.getAllCompanies(companies => setCompanies(companies));
        console.log('companies', companies)
    }, [])

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
                    {addCompany ? (
                        <Button className="btn btn-danger" onClick={closeAddCompanyForm}>
                            Cancel
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" onClick={addCompanyHandler}>
                            Add Company
                        </Button>
                    )}
                    <Card.Body>
                        {addCompany ? <AddCompany setCompany={handleAddCompany} /> : null}
                    </Card.Body>
                </Card.Header>
                <Card.Header>
                    {companiesList ? (
                        <Button className="btn btn-danger" onClick={closeCompaniesList}>
                            Close list
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" onClick={showCompaniesList}>
                            List of companies
                        </Button>
                    )}
                    <Card.Body>
                        {companiesList ? <CompaniesList companies={companies} /> : null}
                    </Card.Body>
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