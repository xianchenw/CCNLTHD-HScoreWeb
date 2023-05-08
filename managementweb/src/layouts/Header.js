import { useContext, useState } from "react";
import { Container, Dropdown, Nav, Navbar, Row } from "react-bootstrap";
import { BsFillBellFill, BsFillChatFill, BsPersonCircle } from "react-icons/bs";
import cookie from 'react-cookies';
import { UserContext } from "../configs/MyContext";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "../components/Login";

const Header = () => {
    const [user, dispatch] = useContext(UserContext)
    const nav = useNavigate()

    const logout = () => {
        console.log("Logout")
        cookie.remove("access_token")
        cookie.remove("current-user")

        dispatch({
            "type": "logout"
        })
        nav('/login')
    }

    if (cookie.load("access_token") === undefined) {
        nav('/login')
    }

    return(
        <Row>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Nhà điểm</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/subjects">Môn học của tôi</Nav.Link>
                        <Nav.Link href="/scores">Điểm của tôi</Nav.Link>
                        <Nav.Link href="/forums">Diễn đàn</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="icon-link" ><BsFillBellFill/></Nav.Link>
                        <Nav.Link className="icon-link" ><BsFillChatFill/></Nav.Link>
                        <Nav.Link className="icon-link" >
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    <BsPersonCircle/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Row>
    )
}

export default Header