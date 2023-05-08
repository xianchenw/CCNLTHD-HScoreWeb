import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { authAPI, endpoints } from "../../configs/API";
import { useNavigate } from "react-router-dom";

const Recommend = () => {
    const [forum, setForum] = useState({
        "title": "",
        "content": "",
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const nav = useNavigate()

    const createForum = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("title", forum.title)
                form.append("content", forum.content)

                let res = await authAPI().post(endpoints['forums'], form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                if(res.status === 201)
                    window.location.reload()

                if (res.status === 401)
                    nav("/login")
                else
                    setErr("Hệ thống đang có lỗi! Vui lòng quay lại sau!")
            } catch (ex) {
                console.log(ex)
            } finally {
                setLoading(false)
            }
        }

        if (forum.content === "" || forum.title === "")
            setErr("Chủ đề và nội dung bài viết không được rỗng!")
        else {
            setLoading(true)
            process()
        }
    }

    const setValue = e => {
        const { name, value } = e.target
        setForum(current => ({ ...current, [name]: value }))
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Thêm bài viết
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Chủ đề</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Chủ đề"
                                autoFocus
                                value={forum.title}
                                name="title"
                                onChange={setValue}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="Content"
                        >
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                                value={forum.content}
                                name="content"
                                onChange={setValue}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={createForum}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Recommend;