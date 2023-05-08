import { createContext, useContext, useReducer, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import cookie from 'react-cookies';
import { useNavigate } from "react-router-dom";
import API, { authAPI, endpoints } from "../configs/API";
import { UserContext } from "../configs/MyContext";
import Loading from "../layouts/Loading";
import '../styles/Login.css';
import userReducer from "../reducers/UserReducer";


const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState()
    const [user, dispatch] = useContext(UserContext)
    const nav = useNavigate()

    const login = (evt) => {
        evt.preventDefault()

        const process = async () => {
            try {
                setLoading(true)

                let res = await API.post(endpoints['login'], {
                    "username": username,
                    "password": password
                })

                console.log("Res", res.data)

                cookie.save("access_token", res.data.access)

                console.log("Access token", cookie.load('access_token'))

                let user = await authAPI().get(endpoints['current-user'])

                cookie.save("current-user", user.data)

                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            } catch (ex) {
                setErr("Username hoặc password không chính xác!")
            } finally {
                setLoading(false)
            }
        }

        process()
    }

    console.log("User", user)

    if (user !== null)
        nav('/');

    return (
        <Container className="body login-container ">

            <h3 className="text-center">ĐĂNG NHẬP</h3>
            {/* Main Area */}
            <Row className="body-content" >
                <Form onSubmit={login} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control type="text" required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Tên đăng nhập..." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Mật khẩu" />
                    </Form.Group>
                    <Row>
                        <Col xs={5} md={5} lg={5}>
                            <a href="/signup" ><i>Chưa có tài khoản</i></a></Col>
                        <Col xs={2} md={2} lg={2}></Col>
                        <Col xs={5} md={5} lg={5}>
                            {loading ? <Loading /> : <Button type="submit" variant="primary">Đăng nhập</Button>}</Col>
                    </Row>


                </Form>
            </Row>

            {/* End Area */}
            <Row className="body-more-content" >
                {err ? <div className="alert alert-danger">{err}</div> : ""}
            </Row>
        </Container>
    )
}

export default Login