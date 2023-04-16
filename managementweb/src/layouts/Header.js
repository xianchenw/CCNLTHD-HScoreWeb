import { Button, Container, Nav, Navbar, Row } from "react-bootstrap"
import {BsFillBellFill, BsFillChatFill, BsPersonCircle} from "react-icons/bs"

const Header = () => {

    return(
        <Row>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Nhà điểm</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#subjects">Môn học của tôi</Nav.Link>
                        <Nav.Link href="#scores">Điểm của tôi</Nav.Link>
                        <Nav.Link href="#forums">Diễn đàn</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link className="icon-link" ><BsFillBellFill/></Nav.Link>
                        <Nav.Link className="icon-link" ><BsFillChatFill/></Nav.Link>
                        <Nav.Link className="icon-link" ><BsPersonCircle/></Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </Row>
    )
}

export default Header