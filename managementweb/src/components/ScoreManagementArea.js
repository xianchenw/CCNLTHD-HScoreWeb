import { Col, Container, Dropdown, Row } from "react-bootstrap"
import Filter from "./Filter"
import Subjects from "./ScoreManagement/Subjects"
import Scores from "./ScoreManagement/Scores"

const ScoreManagementArea = () => {
    return (
        <Container className="body" >
            {/* Filter Area */}
            <Filter/>
            {/* Main Area */}
            <Row className="body-content" >
                <Col className="radius" md xs lg={4}>
                    <Subjects/>
                </Col>
                <Col className="radius" md xs lg={100}>
                    <Scores/>
                </Col>
            </Row>

            {/* End Area */}
            <Row className="body-more-content" ></Row>
        </Container>
    )
}

export default ScoreManagementArea