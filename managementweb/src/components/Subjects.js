import { useEffect, useState } from "react"
import { Button, ButtonGroup, Container, Row } from "react-bootstrap"
import API, { endpoints } from "../configs/API"

const Subjects = () => {
    const[subjects, setSubjects] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                let e = `${endpoints['subjects']}?page=${page}`
                let res = await API.get(e)
                setSubjects(res.data.results)
            } catch (ex) {
                setPage(1)
            }
            
        }

        loadSubjects()
    },[page])

    const nextPage = () => setPage(current => current + 1)
    const prevPage = () => setPage(current => current - 1)

    return (
        <Row >
            <ul>
                {subjects.map(s => {
                    return (
                        <li>{s.name}</li>
                    )
                })}
            </ul>
        </Row>
    )
}

export default Subjects