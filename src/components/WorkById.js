import { Card } from "react-bootstrap"
import React, { useState, useEffect } from "react"
import * as services from '../services/workServices'
import { useParams } from 'react-router-dom'

function WorkById() {
console.log('byyyyyyy')
    const [work, setWork] = useState({})
    const { id } = useParams()

    useEffect(() => {
        services.showById(item => {
            console.log('item',item); setWork(item)}, id)
    }, [])
// window.location.pathname
    return (
        <>
            <Card>
                <Card.Header>
                {work.date}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{work.company}</Card.Title>
                    <Card.Text>
                        {work.description}
                    </Card.Text>
                </Card.Body>
            </Card>
            <a href="/works">Back</a>
        </>
    )
}

export default WorkById