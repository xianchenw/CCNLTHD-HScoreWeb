import { useEffect, useRef, useState } from "react"
import { authAPI, endpoints } from "../../configs/API"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button, Col, Container, Form, FormGroup, Modal, Row, Table } from "react-bootstrap"

const Scores = () => {
    const [scores, setScores] = useState([]);
    const [score, setScore] = useState(
        {
            score_type: "",
            ratio: ""
        }
    );
    const file = useRef();
    const [queryParam] = useSearchParams();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const nav = useNavigate();

    useEffect(() => {
        const loadScores = async () => {
            try {
                let e = `${endpoints['scores']}`

                let kw = queryParam.get('kw')
                if (kw !== null) {
                    e += `?kw=${kw}`
                }

                let s = queryParam.get('semester_id')
                if (s !== null) {
                    e += `?semester_id=${s}`
                }

                let sub = queryParam.get('subject_id')
                if (sub !== null) {
                    e += `&subject_id=${sub}`
                }
                let res = await authAPI().get(e)

                setScores(res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        loadScores()
    }, [queryParam])

    const createScore = async (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("semester_id", queryParam.get('semester_id'))
                form.append("subject_id", queryParam.get('subject_id'))
                form.append("score_type", score.score_type)
                form.append("ratio", score.ratio)

                if (file.current.files.length > 0)
                        form.append("file", file.current.files[0])

                let res = await authAPI().post(endpoints['csv'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if(res.status === 200)
                    window.location.reload()

            } catch (ex) {
                console.log(ex)
            } 
        }

        if (score.score_type === "" || score.ratio === "")
            alert("Nhập loại đểm và phần trăm!")
        else {
            process()
        }
    }

    const setValue = e => {
        const { name, value } = e.target
        setScore(current => ({ ...current, [name]: value }))
    }

    return (
        <Container>
            <Container>
                <Button variant="success" onClick={handleShow}>
                    Thêm điểm
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm điểm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicFile">
                                <Form.Label>Thêm file điểm</Form.Label>
                                <Form.Control type="file" required ref={file} />
                            </Form.Group>
                            <FormGroup>
                                <Form.Label>Loại điểm</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Loại điểm"
                                    required
                                    name="score_type"
                                    value={score.score_type}
                                    onChange={setValue} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label>Phần trăm</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Phần trăm"
                                    required
                                    name="ratio"
                                    value={score.ratio}
                                    onChange={setValue} />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary" onClick={createScore}>
                            Thêm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Loại điểm</th>
                        <th>Điểm</th>
                        <th>Tỷ lệ</th>
                        <th>Trạng thái</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map(s => {
                        return (
                            <tr>
                                <td>{s.student.user.fullname}</td>
                                <td>{s.student.email}</td>
                                <td>{s.score_type}</td>
                                <td>{s.point}</td>
                                <td>{s.ratio}%</td>
                                <td>{s.action}</td>
                                <td>{s.note}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Button>Xuất file</Button>
        </Container>

    )
}

export default Scores