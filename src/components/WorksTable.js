import { Table, Button } from "react-bootstrap"
import Work from './Work'
import * as services from '../services/workServices'
import { useEffect, useState } from "react"
import * as servicesCompany from '../services/servicesCompany'

function WorksTable(props) {

    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(false)

    const deleteItemHandler = (id) => {
        services.deleteWork(id)
    }

    useEffect(() => {
        setLoading(true)
        if(loading) {
            servicesCompany.getAllCompanies(companies => setCompanies(companies))
            setLoading(false)
        }
    }, [])

    return (
        <>
        { props.data.length ?
            <Table striped bordered hover>
                <thead>
                    <tr >
                        <th className="align-middle">Date</th>
                        <th className="align-middle">Client
                            <Button
                                variant="light"
                                className="ml-2"
                                onClick={props.handleSortCompany}
                            >
                                Sort ↑ ↓
                            </Button>
                        </th>
                        <th className="align-middle">Service</th>
                        <th className="align-middle">Started</th>
                        <th className="align-middle">Ended</th>
                        <th className="align-middle">Duration</th>
                        <th className="align-middle">Delete</th>
                        <th className="align-middle">Edit</th>
                        <th className="align-middle">More</th>
                    </tr>
                </thead>
                <tbody>
                    { props.data.map((work, index) =>
                        <Work
                                id={work.id}
                                key={index}
                                date={work.date}
                                company={work.company}
                                companies={companies}
                                service={work.service}
                                startTime={work.startTime}
                                endTime={work.endTime}
                                delete={deleteItemHandler} />
                    )}
                </tbody>
            </Table>
            :
            <div className="text-center p-4">No works added yet...</div>
            }
        </>
    )
}

export default WorksTable