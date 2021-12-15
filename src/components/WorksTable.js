import { Table, Button } from "react-bootstrap";
import Work from './Work';
import * as services from '../services'

function WorksTable(props) {

    const deleteItemHandler = (id) => {
        services.deleteWork(id);
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr >
                    <th className="align-middle">Date</th>
                    <th className="align-middle">Client<Button variant="light" className="ml-2" onClick={props.handleSortCompany}>Sort ↑ ↓</Button></th>
                    <th className="align-middle">Service<Button variant="light" className="ml-2" onClick={props.handleSortService}>Sort ↑ ↓ </Button></th>
                    <th className="align-middle">Started</th>
                    <th className="align-middle">Ended</th>
                    <th className="align-middle">Duration</th>
                    <th className="align-middle">Delete</th>
                    <th className="align-middle">Edit</th>
                    <th className="align-middle">Plačiau</th>
                </tr>
            </thead>
            <tbody>
                {
                    (props.data.map((work, index) => {
                        return (
                            <Work
                                id={work.id}
                                key={index}
                                date={work.date}
                                company={work.company}
                                service={work.service}
                                startTime={work.startTime}
                                endTime={work.endTime}
                                delete={deleteItemHandler} />)
                    }))
                }
            </tbody>
        </Table>
    )
}

export default WorksTable