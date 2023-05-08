import { Col, Container, Dropdown, Row, TabContainer } from "react-bootstrap"
import Subjects from "./Subject/Subjects"
import MyCalendar from "./Subject/Calendar"
import Filter from "./Filter"

const SubjectArea = () => {
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
                    <MyCalendar/>
                </Col>
            </Row>

            {/* End Area */}
            <Row className="body-more-content" ></Row>
        </Container>
    )
}

export default SubjectArea