import { Col, Container, Image, Row } from "react-bootstrap"
import '../styles/Comment.css'

const Comment = (props) => {
    return (
        <Container className="comment-container" >
            <Row>
                <Col xs={2} md={2} lg={2} xl={2} >
                    <Image className="" src={props.avatar} roundedCircle fluid alt="img" width={100} height={100} ></Image>
                </Col>
                <Col>
                    <Row>
                        <strong>{props.fullname}</strong>
                    </Row>
                    <Row>
                        <span>{props.content}</span>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Comment;