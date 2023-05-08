import { Badge, Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import '../../styles/Score.css'
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../../configs/API"
import { useSearchParams } from "react-router-dom"

const Scores = () => {
    const [subjects, setSubjects] = useState([]);
    const [score, setScore] = useState({
        "note": "",
    });
    const [queryParam] = useSearchParams();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const loadSubjects = async () => {
            try {
                let e = `${endpoints['semester-subjects']}`

                let s = queryParam.get('semester_id')
                if (s !== null) {
                    e += `?semester_id=${s}`
                }
                let res = await authAPI().get(e)

                console.log("Response: ", res)
                setSubjects(res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadSubjects()
    }, [])


    const complain = (e, score_id) => {
        e.preventDefault()

        const process = async () => {
            try {
                setLoading(true)
                let res = await authAPI().post(endpoints['complain-score'](score_id), score)
                console.log("Response: ", res)
                setLoading(false)
                handleClose()

            } catch (ex) {
                console.log(ex)
                // setLoading(false)
                // setErr(ex.response.data.detail)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setScore(current => ({ ...current, [name]: value }))
    }

    return (
        subjects.map(s => {
            return (
                <Container className="score-container border-space">
                    <Container>
                        <Row>
                            <Col md={4} >
                                <span>Mã môn học: {s.subject.code}</span>
                            </Col>
                            <Col md={8} >
                                <span>Tên môn học: {s.subject.name}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <span>Lớp: {s.myclass.name}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={9}>
                                <span>Giảng viên: {s.instructor.user.fullname}</span>
                            </Col>
                        </Row>
                    </Container>
                    <Row>
                        <Col md={9} >
                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>Loại điểm</th>
                                        <th>Phần trăm</th>
                                        <th>Điểm</th>
                                        <th>Thời gian cập nhật</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {s.scores.map(sc => {
                                        return (
                                            <tr>
                                                <td>{sc.score_type}</td>
                                                <td>{sc.ratio}%</td>
                                                <td>{sc.point}</td>
                                                <td>{sc.updated_date}</td>
                                                <td>{sc.action === "COMPLAIN" ?
                                                    <Badge bg="warning">Đang xử lý</Badge>
                                                    :
                                                    <Button className="btn-danger" onClick={handleShow} >
                                                        Complain
                                                    </Button>
                                                }

                                                    <Modal show={show} onHide={handleClose}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Khiếu nại điểm</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <Form>
                                                                <Form.Group
                                                                    className="mb-3"
                                                                    controlId="Complain"
                                                                >
                                                                    <Form.Label>Nội dung khiếu nại</Form.Label>
                                                                    <Form.Control as="textarea" rows={3}
                                                                        value={score.note}
                                                                        name="note"
                                                                        onChange={setValue} />
                                                                </Form.Group>
                                                            </Form>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleClose}>
                                                                Đóng
                                                            </Button>
                                                            <Button variant="primary" onClick={e => { complain(e, sc.id) }}>
                                                                Gửi
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col className='score-summarize' >
                            <h5>Tổng kết</h5>
                            <p>Điểm trung bình: <strong>7.75</strong></p>
                            <p></p>
                        </Col>

                    </Row>
                    <Row>

                    </Row>
                </Container>
            )
        })
    )
}

export default Scores