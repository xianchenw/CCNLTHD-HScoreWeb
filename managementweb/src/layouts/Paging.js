import React from "react"
import { Button, ButtonGroup, Container, Row } from "react-bootstrap"

class Paging extends React.Component {
    render() {
        return (
            <Container>
                <ButtonGroup aria-label="paging" className="p-1">
                    <Button onClick={prevPage} variant="outline-secondary">&#11013;</Button>
                    <Button onClick={nextPage} variant="outline-secondary">&#10145;</Button>
                </ButtonGroup>
            </Container>
        )
    }
}

export default Paging