import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

const SearchButton = () => {
    const [queryParam, setQueryParam] = useState();
    const [searchParam, setSearchParams] = useSearchParams();

    return (
        <Col md={{span: 5, offset: 7}}>
            <Row>
                <Form.Label column lg={1}>
                    <BsSearch onClick={e => setSearchParams({"kw": queryParam})}/>
                </Form.Label>
                <Col >
                    <Form.Control onChange={e => setQueryParam(e.target.value)} type="text" placeholder="Search" aria-label="Search"></Form.Control>
                </Col>
            </Row>
        </Col>
    );
}

export default SearchButton;