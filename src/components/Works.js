import { Button, Card } from "react-bootstrap";
import AddWork from "./AddWork";
import CompaniesList from "./CompaniesList";
import AddCompany from "./AddCompany";
import React, { useEffect, useState, useMemo } from "react";
import Filter from "./Filter";
import WorksTable from "./WorksTable";
import { auth } from '../services/AuthServices'
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import * as services from '../services/workServices';
import * as servicesCompany from '../services/servicesCompany';

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
    const [user, error, loading] = useAuthState(auth);
    const navigate = useNavigate();
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
        setWorkId('')
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
        if (!user) {
            navigate('/')
        }
        user && services.getAllWorks(works => setWorks(works), sortBy, user);
        servicesCompany.getAllCompanies(companies => setCompanies(companies));
    }, [sortBy, user])

    // useEffect(() => {
    //     servicesCompany.getAllCompanies(companies => setCompanies(companies));
    // }, [])

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    {addWork ? (
                        <Button className="btn btn-danger" onClick={closeWorkHandler}>
                            Cancel
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" onClick={addWorkHandler}>
                            Add Work
                        </Button>
                    )}
                    {addCompany ? (
                        <Button className="btn btn-danger" onClick={closeAddCompanyForm}>
                            Cancel
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" onClick={addCompanyHandler}>
                            Add Company
                        </Button>
                    )}
                    {companiesList ? (
                        <Button className="btn btn-danger" onClick={closeCompaniesList}>
                            Close list
                        </Button>
                    ) : (
                        <Button className="btn btn-primary" onClick={showCompaniesList}>
                            Companies list
                        </Button>
                    )} </Card.Header>
                {addCompany && <Card.Body className="d-flex justify-content-center">  <AddCompany setCompany={handleAddCompany} /></Card.Body>}
                {companiesList && <Card.Body> <CompaniesList companies={companies} /></Card.Body>}
                {(addWork || workId) && <Card.Body className="w-50">  <AddWork companies={companies} closeWorkHandler={closeWorkHandler} setWorks={handleAddWork} update={workId} onUpdateWorkHandler={onUpdateWorkHandler} /></Card.Body>}
                <Card.Header>
                    <Filter filterCriteria={handleFilter} companies={companies} />
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