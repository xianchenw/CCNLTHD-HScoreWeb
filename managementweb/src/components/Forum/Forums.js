import { Container, Table } from "react-bootstrap"
import '../../styles/Forum.css'
import { useEffect, useState } from "react"
import { authAPI, endpoints } from "../../configs/API"
import { useSearchParams } from "react-router-dom"

const Forums = () => {
    const [forums, setForums] = useState([])
    const [queryParam, setQueryParam] = useSearchParams()

    const switchForum = (event, forum_id) => {
        setQueryParam({ ['forum_id']: forum_id })
    }

    useEffect(() => {
        const loadForums = async () => {
            try {
                let e = `${endpoints['forums']}`

                let res = await authAPI().get(e)

                setForums(res.data.results)
            } catch (ex) {
                console.log(ex)
            }
        }
        loadForums()
    }, [])

    console.log(forums)

    return (
        <Container>
            <Table>
                <thead>
                    <tr>
                        <th>Chủ đề</th>
                        <th>Người khởi tạo</th>
                        <th>Ngày tạo</th>
                        <th>Lượt thích</th>
                        <th>Lượt bình luận</th>
                    </tr>
                </thead>
                <tbody>
                    {forums.map(f => {
                        return (
                            <tr>
                                <td>
                                    <a onClick={e => switchForum(e, f.id)} className="title-link">
                                        {f.title}
                                    </a>
                                </td>
                                <td>{f.creator.username}</td>
                                <td>{f.created_date}</td>
                                <td>{f.likes}</td>
                                <td>{f.comments}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
        </Container>
    )
}

export default Forums