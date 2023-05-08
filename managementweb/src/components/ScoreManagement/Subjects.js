import { useContext, useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, Col, Container, Image, Row } from "react-bootstrap"
import API, { authAPI, endpoints } from "../../configs/API"
import '../../styles/Subject.css'
import { useSearchParams } from "react-router-dom"
import { UserContext } from "../../configs/MyContext"

const Subjects = () => {
    const [subjects, setSubjects] = useState([])
    const [queryParam, setQueryParam] = useSearchParams()

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                let e = `${endpoints['instructor-subjects']}`
                let s = queryParam.get('semester_id')
                if (s !== null) {
                    e += `?semester_id=${s}`
                }

                let res = await authAPI().get(e)

                setSubjects(res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadSubjects()
    }, [queryParam])

    const setParam = (event, semesterId, subjectId) => {
        setQueryParam({['semester_id']: semesterId, ['subject_id']: subjectId })
    }

    return (
        subjects.map(s => {
            return (
                <Container className="subject-container">
                    <Row>
                        <Button onClick={e => setParam(e, s.semester, s.subject.id)} variant="outline-dark" className="subject-btn" >
                            {s.subject.name}
                        </Button>
                    </Row>
                    
                </Container>
            )
        })
    )
}

export default Subjects