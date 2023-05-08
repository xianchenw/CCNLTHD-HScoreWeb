import { useContext, useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, Col, Container, Image, Row } from "react-bootstrap"
import API, { authAPI, endpoints } from "../../configs/API"
import '../../styles/Subject.css'
import { useSearchParams } from "react-router-dom"
import { UserContext } from "../../configs/MyContext"

const Subjects = () => {
    const [subjects, setSubjects] = useState([])
    const [queryParam] = useSearchParams()
    const [user, dispatch] = useContext(UserContext)

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                let e = `${endpoints['subjects']}`

                if (user.role === "INSTRUCTOR") {
                    e = `${endpoints['instructor-subjects']}`
                }

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

    return (
        subjects.map(s => {
            return (
                <Container className="subject-container">
                    <Row>
                        <Col lg={3} >Giảng viên</Col>
                        <Col lg={2}>
                            <Image src={s.instructor.user.avatar} roundedCircle fluid alt="img"></Image>
                        </Col>
                        <Col lg={4} >{s.instructor.user.fullname}</Col>
                        <Col lg={3}>
                            <Button variant="outline-dark" className="subject-btn" >
                                Xem
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <h5>{s.subject.name}</h5>
                    </Row>
                    <Row>
                        <h5>{s.name}</h5>
                    </Row>
                    <Row>
                        <i>{s.description}</i>
                    </Row>
                    <Row>
                        <Col md={{ span: 3, offset: 1 }}>
                            <text>Sỉ số: 50</text>
                        </Col>
                        <Col md={{ span: 3, offset: 4 }}>

                            <Badge bg={s.active ? 'success' : 'danger'}>
                                {s.active ? 'Khả dụng' : 'Không khả dụng'}
                            </Badge>{' '}
                        </Col>
                    </Row>
                </Container>
            )
        })
    )
}

export default Subjects