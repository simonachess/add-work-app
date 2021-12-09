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
                <tr>
                    <th>Date</th>
                    <th>Client<Button variant="secondary" className="m-1" onClick={props.handleSortCompany}>Sort ↑ ↓</Button></th>
                    <th>Service<Button variant="secondary" className="m-1" onClick={props.handleSortService}>Sort ↑ ↓ </Button></th>
                    <th>Started</th>
                    <th>Ended</th>
                    <th>Duration</th>
                    <th>Delete</th>
                    <th>Edit</th>
                    <th>Plačiau</th>
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