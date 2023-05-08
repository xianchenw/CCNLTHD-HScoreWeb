import { Col, Dropdown, Row } from "react-bootstrap";
import SearchButton from "../layouts/SearchButton";
import { useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import { useSearchParams } from "react-router-dom";

const Filter = () => {
    const [semesters, setSemesters] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const semesterChange = (event) => {
        let semester_id = event.target.getAttribute('value')
        setSearchParams({ ['semester_id']: semester_id })
    }

    useEffect(() => {
        const loadSemesters = async () => {
            try {
                let e = `${endpoints['semesters']}`
                let res = await API.get(e)
                setSemesters(res.data)
            } catch (ex) {
            }
        }

        loadSemesters()
    }, [])

    return (
        <Row className="body-header radius " >
            <Col >
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Học kỳ
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {semesters.map(s => <Dropdown.Item value={s.id} onClick={semesterChange}>{s.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col>
                <SearchButton />
            </Col>
        </Row>
    )
};

export default Filter;