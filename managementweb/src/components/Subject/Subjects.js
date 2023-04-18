import { useEffect, useState } from "react"
import { Badge, Button, ButtonGroup, Col, Container, Image, Row } from "react-bootstrap"
import API, { endpoints } from "../../configs/API"
import './Subjects.css'

const Subjects = () => {
    const[subjects, setSubjects] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                let e = `${endpoints['subjects']}?page=1`
                let res = await API.get(e)
                setSubjects(res.data.results)
            } catch (ex) {
                setPage(1)
            }
        }

        loadSubjects()
    },[page])

    return (
        subjects.map(s => { return (
            <Container className="subject-container" >
                <Row>
                    <Col lg={3} >Giảng viên</Col>
                    <Col lg={2}>
                        <Image src={s.instructor.avatar} roundedCircle fluid alt="img"></Image>
                    </Col>
                    <Col lg={4} >{s.instructor.fullname}</Col>
                    <Col lg={3}>
                        <Button variant="outline-dark" className="subject-btn" >
                            Xem
                        </Button>
                    </Col>
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
                    <Col md={{ span: 3, offset: 5 }}>

                    <Badge bg={s.active ? 'success' : 'danger'}>
                        {s.active ? 'Khả dụng' : 'Không khả dụng'}
                    </Badge>{' '}
                    </Col>
                </Row>
            </Container>
        ) })
    )
}

export default Subjects