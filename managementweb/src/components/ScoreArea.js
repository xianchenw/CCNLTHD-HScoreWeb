import { Col, Container, Dropdown, Row } from "react-bootstrap"
import Scores from "./Score/Scores"
import Stats from "./Score/Stats"
import Filter from "./Filter"

const ScoreArea = () => {
    return (
        <Container className="body" >
            {/* Filter Area */}
            <Filter/>
            {/* Main Area */}
            <Row className="body-content" >
                <Col className="radius" md xs lg={4}>
                    <Stats/>
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

export default ScoreArea