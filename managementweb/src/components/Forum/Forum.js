import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authAPI, endpoints } from "../../configs/API";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import Comment from "../../layouts/Comment";
import { BsFillHandThumbsUpFill } from "react-icons/bs";

const Forum = () => {
    const [forum, setForum] = useState([]);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        "content": "",
    });
    const [queryParam] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [liked, setLiked] = useState(0);

    const nav = useNavigate()

    useEffect(() => {
        const loadForum = async () => {
            try {
                let res = await authAPI().get(endpoints['forums-detail'](queryParam.get('forum_id')))
                setForum(res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        const loadComments = async () => {
            try {
                let res = await authAPI().get(endpoints['forum-comments'](queryParam.get('forum_id')))

                console.log("Response data: ", res.data)

                setComments(res.data)
            } catch (ex) {
                console.log(ex)
            }
        }

        const loadLiked = async () => {
            try {
                let res = await authAPI().get(endpoints['forums-like'](queryParam.get('forum_id')))

                console.log("Response data: ", res.data)

                setLiked(res.data)
            } catch (ex) {
                console.log(ex)
            }

        }

        loadForum()

        loadComments()

        loadLiked()
    }, [queryParam])

    const addComment = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                let form = new FormData()
                form.append("content", comment.content)

                let res = await authAPI().post(endpoints['forum-comments'](queryParam.get('forum_id')), form, {
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

        if (comment.content === "")
            setErr("Vui lòng nhập nội dung bình luận!")
        else {
            setLoading(true)
            process()
        }
    }

    const like = async (evt) => {
        evt.preventDefault()
        const process = async () => {
            try{
                let res = await authAPI().post(endpoints['forums-like'](queryParam.get('forum_id')))

                if(res.status === 200)
                    evt.target.style.color = "blue"
                else
                    setErr("Hệ thống đang có lỗi! Vui lòng quay lại sau!")
            }
            catch (ex){
                console.log(ex)
            }
        }
        process()
    }

    const setValue = e => {
        const { name, value } = e.target
        setComment(current => ({ ...current, [name]: value }))
    }

    if (forum.length === 0) return (<div></div>)

    return (
        <Container className="forum-container">
            <Row>
                <h5>{forum.title}</h5>
            </Row>
            <Row>
                <Col xs={2} xl={2} lg={2} md={2} className="user-avatar" >
                    <Image className="" src={forum.creator.avatar} roundedCircle fluid alt="img" width={100} height={100} ></Image>
                </Col>
                <Col>
                    <Row>
                        <strong>{forum.creator.fullname}</strong>
                    </Row>
                    <Row>
                        <i>{forum.created_date}</i>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
            <Row>
            </Row>
            <Row>
                <Container className="forum-content" >
                    {forum.content}
                </Container>
            </Row>
            <Row>
                <Col xs={1} xl={1} lg={1} md={1}>
                    <Button onClick={like} variant="outline"><BsFillHandThumbsUpFill/>{forum.likes}</Button>
                </Col>
            </Row>
            <Row>
                <hr />
            </Row>
            <Container className="scrollbar">
                {comments.map(c => {
                    return (
                        <Comment avatar={c.user.avatar} fullname={c.user.fullname} content={c.content} />
                    )
                })}
            </Container>
            <Container>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Bình luận"
                            name="content"
                            value={comment.content}
                            onChange={setValue}
                        />
                    </Form.Group>
                    <br />
                    <Button onClick={addComment} >Thêm</Button>
                </Form>
            </Container>

        </Container>
    )
};
export default Forum;