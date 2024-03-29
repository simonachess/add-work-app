import { Button, Card, Modal } from "react-bootstrap"
import AddWork from "./AddWork"
import CompaniesList from "./CompaniesList"
import AddCompany from "./AddCompany"
import React, { useEffect, useState, useMemo } from "react"
import Filter from "./Filter"
import WorksTable from "./WorksTable"
import { auth } from '../services/AuthServices'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as services from '../services/workServices'
import * as servicesCompany from '../services/servicesCompany'

export const WorkContext = React.createContext({})

function Works(props) {
    const [works, setWorks] = useState([])
    const [companies, setCompanies] = useState([])
    const [filterResults, setFilterResults] = useState([])
    const [workId, setWorkId] = useState('')
    const [sortBy, setSortBy] = useState('COMPANY_DESC')
    const [user] = useAuthState(auth)
    const [showAddWorkModal, setShowAddWorkModal] = useState(false)
    const [showAddCompanyModal, setShowAddCompanyModal] = useState(false)
    const [showCompaniesListModal, setShowCompaniesListModal] = useState(false)
    const navigate = useNavigate()
    const value = useMemo(() => (
        {
            workId, setWorkId
        }
    ), [workId])

    function addWorkHandler() {
        setShowAddWorkModal(true)
    }

    function closeWorkHandler() {
        setShowAddWorkModal(false)
        setWorkId('')
    }

    const handleAddWork = (data) => {
        services.addWork(data)
        props.status(true)
    }

    const handleAddCompany = (comanpies) => {
        servicesCompany.addCompany(comanpies)
        setShowAddCompanyModal(true)
        props.status(true)
    }

    const handleFilter = (criteria) => {
        const filteredItems = works.filter(item => {
            return Object.keys(criteria).every(filter => {
                return criteria[filter] === item[filter]
            })
        })
        setFilterResults(filteredItems)
    }

    const handleSortCompany = () => {
        if (sortBy === 'COMPANY_ASC') {
            setSortBy('COMPANY_DESC')
        }
        else {
            setSortBy('COMPANY_ASC')
        }
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        user && services.getAllWorks(works => setWorks(works), sortBy, user)
        user && servicesCompany.getAllCompanies(companies => setCompanies(companies))
    }, [sortBy, user])

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Button className="btn btn-primary" onClick={addWorkHandler}>
                        Add Work
                    </Button>
                    <Button className="btn btn-primary" onClick={() => setShowAddCompanyModal(true)}>
                        Add Company
                    </Button>
                    <Button className="btn btn-primary" onClick={() => setShowCompaniesListModal(true)}>
                        Companies list
                    </Button>
                </Card.Header>
                { showAddCompanyModal &&
                    <Modal
                        show={showAddCompanyModal}
                        onHide={() => setShowAddCompanyModal(false)}
                        dialogClassName="modal-90w"
                    >
                        <Modal.Header>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Add work
                            </Modal.Title>
                            <span className="close-btn" onClick={() => setShowAddCompanyModal(false)}>X</span>
                        </Modal.Header>
                        <Modal.Body>
                            <AddCompany
                                setCompany={handleAddCompany}
                                setShowAddCompanyModal={setShowAddCompanyModal}
                            />
                        </Modal.Body>
                    </Modal>
                }
                { showCompaniesListModal &&
                    <Modal
                        show={showCompaniesListModal}
                        onHide={() => setShowCompaniesListModal(false)}
                        dialogClassName="modal-90w"
                        size="xl"
                    >
                        <Modal.Header>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Companies List
                            </Modal.Title>
                            <span className="close-btn" onClick={() => setShowCompaniesListModal(false)}>X</span>
                        </Modal.Header>
                        <Modal.Body>
                            <CompaniesList companies={companies} />
                        </Modal.Body>
                    </Modal>
                }
                { showAddWorkModal &&
                    <Modal
                        show={showAddWorkModal}
                        onHide={() => setShowAddWorkModal(false)}
                        dialogClassName="modal-90w"
                    >
                        <Modal.Header>
                            <Modal.Title id="example-custom-modal-styling-title">
                            Add work
                            </Modal.Title>
                            <span className="close-btn" onClick={() => setShowAddWorkModal(false)}>X</span>
                        </Modal.Header>
                        <Modal.Body>
                            <AddWork
                                companies={companies}
                                closeWorkHandler={closeWorkHandler}
                                setWorks={handleAddWork}
                                setShowAddWorkModal={setShowAddWorkModal}
                            />
                        </Modal.Body>
                    </Modal>
                }
                <Card.Header>
                    <Filter filterCriteria={handleFilter} companies={companies} />
                </Card.Header>
                <Card.Header>
                    <h3>List of works</h3>
                </Card.Header>
                <Card.Body>
                    <WorkContext.Provider value={value}>
                        <WorksTable
                            handleSortCompany={handleSortCompany}
                            sortBy={sortBy}
                            data={filterResults.length ? filterResults : works}
                        />
                    </WorkContext.Provider>
                </Card.Body>
            </Card>
        </>
    )
}

export default Works