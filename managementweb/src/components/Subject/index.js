import { Col, Container, Dropdown, Row, TabContainer } from "react-bootstrap"
import Subjects from "./Subjects"
import MyCalendar from "./Calendar"

const SubjectArea = () => {
    return (
        <Container className="body" >
            {/* Filter Area */}
            <Row className="body-header" >
                <Col className="radius" >
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            Học kỳ 
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
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