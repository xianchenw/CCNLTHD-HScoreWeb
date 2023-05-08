import { Col, Container, Dropdown, Row } from "react-bootstrap"
import Forums from './Forum/Forums'
import Recommend from "./Forum/Recommend"
import Filter from "./Filter"
import Forum from "./Forum/Forum"

const ForumArea = () => {

    return (
        <Container className="body" >
            {/* Filter Area */}
            <Filter/>
            {/* Main Area */}
            <Row className="body-content" >
                <Col className="radius" md xs lg={6}>
                    <Recommend/>
                    <Forums />
                </Col>
                <Col className="radius" md xs lg={100}>
                    <Forum/>
                </Col>
            </Row>

            {/* End Area */}
            <Row className="body-more-content" ></Row>
        </Container>
    )
}

export default ForumArea