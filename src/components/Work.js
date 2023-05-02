import React, { useContext, useState } from "react"
import { WorkContext } from "./Works"
import { Link } from 'react-router-dom'
import { Modal } from "react-bootstrap"
import AddWork from "./AddWork"
import * as services from '../services/workServices'

function Work(props) {

    const { workId, setWorkId } = useContext(WorkContext)
    const [showEditWorkModal, setShowEditWorkModal] = useState(false)

    const diff = (start, end) => {
        start = start.split(":");
        end = end.split(":");
        const startDate = new Date(0, 0, 0, start[0], start[1], 0);
        const endDate = new Date(0, 0, 0, end[0], end[1], 0);
        let diff = endDate.getTime() - startDate.getTime();
        let hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        const minutes = Math.floor(diff / 1000 / 60);
        return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
    }

    const getIDhandler = () => {

        props.delete(props.id)
    }

    const getIdUpdateHandler = () => {
        setWorkId(props.id)
        setShowEditWorkModal(true)
    }

    const onUpdateWorkHandler = (id, data) => {
        services.updateWork(id, data)
        setWorkId('')
    }

    return (
        <tr>
            <td>{props.date}</td>
            <td>{props.company}</td>
            <td>{props.service}</td>
            <td>{props.startTime}</td>
            <td>{props.endTime}</td>
            <td>{diff(props.startTime, props.endTime)}</td>
            <td><a href="#/" onClick={getIDhandler}>Delete</a></td>
            <td><a href="#/" onClick={getIdUpdateHandler}>Edit</a>
            { workId && showEditWorkModal &&
                <Modal
                    show={showEditWorkModal}
                    onHide={() => setShowEditWorkModal(false)}
                    dialogClassName="modal-90w"
                >
                    <Modal.Header>
                        <Modal.Title>
                        Add work
                        </Modal.Title>
                        <span className="close-btn" onClick={() => setShowEditWorkModal(false)}>X</span>
                    </Modal.Header>
                    <Modal.Body>
                        <AddWork
                            companies={props.companies}
                            closeWorkHandler={() => setShowEditWorkModal(false)}
                            update={workId}
                            onUpdateWorkHandler={onUpdateWorkHandler}
                            setShowEditWorkModal={setShowEditWorkModal}
                        />
                    </Modal.Body>
                </Modal>
            }
            </td>
            <td><Link key={props.id} to={`work/${props.id}`}>More...</Link></td>
        </tr>
    )
}

export default Work