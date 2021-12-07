import { Table } from "react-bootstrap";
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
                    <th>Data</th>
                    <th>Klientas</th>
                    <th>Suteikta paslauga</th>
                    <th>Aprašymas</th>
                    <th>Pradėta</th>
                    <th>Baigta</th>
                    <th>Trukmė</th>
                    <th>Trinti</th>
                    <th>Keisti</th>
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
                                description={work.description}
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