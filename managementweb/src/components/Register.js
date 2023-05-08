import { useRef, useState } from "react";
import { Button, Col, Container, FormGroup, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API, { authAPI, endpoints } from "../configs/API";
import Loading from "../layouts/Loading";

const Register = () => {
    const [user, setUser] = useState({
        "fullname": "",
        "email": "",
        "username": "",
        "password": "",
        "confirmPassword": ""
    })
    const existEmail = useState([]); //check email exist
    const avatar = useRef()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const nav = useNavigate()

    const register = (evt) => {
        evt.preventDefault()

        const process = async () => {

            try {
                let e = `${endpoints['students-user']}?email=${user.email}`

                let res = await API.get(e)

                console.log("Status", res.status)

                if (res.status === 100)
                    console.log("100 start register ")
                else if (res.status === 204) 
                    setErr("Tài khoản email không tồn tại để đăng ký!")
                else if (res.status === 202)
                    setErr("Tài khoản email đã được đăng ký!")

                    let form = new FormData()
                    form.append("fullname", user.firstName)
                    form.append("email", user.lastName)
                    form.append("username", user.username)
                    form.append("password", user.password)
                    form.append("role", "STUDENT")
                    form.append("student", res.data.id)
                    if (avatar.current.files.length > 0)
                        form.append("avatar", avatar.current.files[0])

                    let newuser = await API.post(endpoints['student-register'](res.data.id), form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    console.log("User", newuser.data)

                    if (newuser.status === 201)
                        nav("/login")
                    else
                        setErr("Hệ thống đang bị lỗi! Vui lòng quay lại sau!")

            } catch (ex) {
                console.log(ex)
            } finally {
                setLoading(false)
            }
        }

        if (user.username === "" || user.password === "")
            setErr("Username hoặc password không được rỗng!");
        else if (user.password !== user.confirmPassword)
            setErr("Mật khẩu không khớp!")
        else {
            setLoading(true)
            process()
        }
    }

    return (
        <Container className="body login-container ">

            <h3 className="text-center">ĐĂNG KÝ TÀI KHOẢN</h3>
            {/* Main Area */}
            <Row className="body-content" >
                <Form onSubmit={register} >
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            onChange={(e) => setUser({ ...user, "email": e.target.value })}
                            required
                            value={user.email} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="fullname">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setUser({ ...user, "fullname": e.target.value })}
                            value={user.fullname} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            onChange={(e) => setUser({ ...user, "username": e.target.value })}
                            value={user.username} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, "password": e.target.value })}
                            placeholder="Mật khẩu" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Nhập lại mật khẩu</Form.Label>
                        <Form.Control type="password"
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, "confirmPassword": e.target.value })}
                            placeholder="Nhập lại mật khẩu" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="avatar">
                        <Form.Label>Ảnh đại diện</Form.Label>
                        <Form.Control type="file"
                            ref={avatar} />
                    </Form.Group>
                    <Row>
                        <Col xs={5} md={5} lg={5}>
                            <a href="/login" ><i>Đã có tài khoản</i></a></Col>
                        <Col xs={2} md={2} lg={2}></Col>
                        <Col xs={5} md={5} lg={5}>
                            {loading ? <Loading /> : <Button type="submit" variant="primary">Đăng ký tài khoản</Button>}</Col>
                    </Row>
                </Form>
            </Row>

            {/* End Area */}
            <Row className="body-more-content" >
                {err ? <div className="alert alert-danger">{err}</div> : ""}
            </Row>
        </Container>
    )
};

export default Register;