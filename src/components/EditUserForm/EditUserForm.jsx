import { useNavigate } from "react-router-dom"
import { Form, Button, Row, Col, FormSelect } from "react-bootstrap"
import Loader from "../Loader/Loader"
import { AuthContext } from "../../contexts/auth.context"
import { useContext, useState, useEffect } from "react"

import userService from "../../services/User.services"

const EditUserProfile = () => {

    const { loggedUser } = useContext(AuthContext)
    const [user, setUser] = useState({

    })

    console.log("ESTADO USER----", user)
    // const [streetData, setStreetData] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
    }, [])


    const loadUser = () => {
        userService
            .profile(loggedUser._id)
            .then(({ data }) => {
                setUser(data)
                // setStreetData(data.address.city)
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        console.log("-----", value, name)
        setUser({ ...user, [name]: value })
    }

    const handleAddressChange = e => {
        const { value, name } = e.currentTarget
        setUser({ ...user, address: { ...user.address, [name]: value, } });

    }

    const handleUserSubmit = e => {

        e.preventDefault()

        userService
            .editUserById(user._id, user)
            .then(() => navigate('/perfil'))
            .catch(err => console.log(err))
    }

    return (
        user
            ?
            <div className="EditUserForm">
                <Row >
                    <Col lg={{ span: 8, offset: 2 }}>
                        <Form onSubmit={handleUserSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={user.username} name="username" onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={user.email} name="email" onChange={handleInputChange} />
                            </Form.Group>

                            <Row>

                                <Col>
                                    <Form.Group className="mb-3" controlId="street">
                                        <Form.Label>Calle</Form.Label>
                                        <Form.Control type="text" value={user.address?.street} name="street" onChange={handleAddressChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="city">
                                        <Form.Label>Ciudad</Form.Label>
                                        <Form.Control type="text" value={user.address?.city} name="city" onChange={handleAddressChange} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="country">
                                        <Form.Label>Pais</Form.Label>
                                        <Form.Control type="text" value={user.address?.country} name="country" onChange={handleAddressChange} />
                                    </Form.Group>
                                </Col>

                            </Row>

                            <Form.Group className="mb-3" controlId="avatar">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="text" value={user.avatar} name="avatar" onChange={handleInputChange} />
                            </Form.Group>
                            {/* 
                        <Form.Group className="mb-3" controlId="avatar">
                            <Form.Label>Avatar</Form.Label>
                            <Form.Control type="file" value={user.avatar} name="avatar" onChange={uploadImage} />
                        </Form.Group> */}

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="role">
                                        <Form.Label>Rol</Form.Label>
                                        <Form.Select aria-label="Default select example" value={user.rol} onChange={handleInputChange} name="role">
                                            <option>Selección</option>
                                            <option value="STUDENT">Estudiante</option>
                                            <option value="TEACHER">Profesor</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="phoneNumber">
                                        <Form.Label>Teléfono de contacto</Form.Label>
                                        <Form.Control type="number" value={user.phoneNumber} name="phoneNumber" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mb-3" controlId="idSkype">
                                        <Form.Label>Cuenta de Skype</Form.Label>
                                        <Form.Control type="text" value={user.idSkype} name="idSkype" onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Cuéntanos algo sobre ti</Form.Label>
                                    <Form.Control type="textarea" value={user.description} name="description" onChange={handleInputChange} />
                                </Form.Group>
                            </Row>

                            <div className="d-grid">
                                <Button variant="dark" type="submit">Editar usuario</Button>
                            </div>
                        </Form>

                    </Col>


                </Row>



            </div >
            :
            <Loader />
    )
}



export default EditUserProfile