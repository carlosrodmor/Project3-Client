import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import commentService from "../../services/Comment.services"
import { useParams } from "react-router-dom"
import FormError from "../FormError/FormError"
import "./CommentForm.css";
import messageIcon from "../../assets/icon-message-circle.svg"


const CommentForm = ({ loadComments }) => {

    const { owner_id } = useParams()
    const [comment, setComment] = useState({
        teacher: owner_id,
        text: ""
    })

    const [errors, setErrors] = useState([])
    const handleSubmit = (e) => {

        e.preventDefault()

        commentService
            .create(comment)
            .then(() => {
                loadComments()
                setComment({ text: "" })
                setErrors([])
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setComment({ teacher: owner_id, [name]: value })
    }

    return (
        <div>

            <Form onSubmit={handleSubmit} autoComplete="off" >
                <Form.Group controlId="text" >
                    <Form.Label className="formComments"> Comenta </Form.Label>
                    <Form.Control
                        type="text"
                        rows={3}
                        value={comment.text}
                        onChange={handleInputChange}
                        placeholder="Escribe un comentario..."
                        name="text"
                        className="commentControl"
                    />
                </Form.Group>
                {errors?.length > 0 && <FormError>{errors?.map(elm => <p key={elm}>{elm}</p>)} </FormError>}
                <Button type="submit" className="buttonComment">
                    Comentar
                    <img src={messageIcon} alt="messageIcon" className="messageIcon" />
                </Button>
            </Form>

        </div>
    )
}

export default CommentForm