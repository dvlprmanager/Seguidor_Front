import React, {useEffect, useState, Fragment} from 'react'
import { Row, Col, Form, Button, Card, Container, ListGroupItem, ListGroup, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { PostRoute } from '../../Services/Private';
import Cookies from 'universal-cookie';
import { useForm } from 'react-hook-form'
import Log from '../../Base/assets/logo2.png'
const Login = (props)=> {
    const [alldata, setAllData] = useState([]),
         { register, handleSubmit } = useForm(),
        cookies = new Cookies(),
        IniciarSession = async (data) =>  {
            const json = {
                username: data.username,
                password: data.password
            }
        const response = await PostRoute(`login/login`, json)
        setAllData((response.id>0) ? response: [])
        if (response.id){
            cookies.set("id",response.id, {path: "/private"})
            cookies.set("nombreCompleto",response.nombreCompleto, {path: "/private"})
            cookies.set("username", response.username, {path: "/private"})
            window.location.href = "/private/clientes"
        }else{
            alert("Usuario o contraseña incorrectos")
        }
   
    }
    useEffect(() => {
        if(cookies.get("id")){
            
            window.location.href = "/private/clientes"
        }
    },[])
    return(         
        

        <Card className="containerseguidor">
            <Card.Header>
              <Card.Title>
                <h4>Administrador de Paquetes</h4>
            </Card.Title>  
            </Card.Header>
            
            <Card.Body>
            <Row>
             <Col >
             <Row>
                <Col>
                    <br/>
                    <img src={Log} width="400px" height="200px"/>
                </Col>
             </Row>   
            </Col>
             </Row>   
             <Row>
                <Col sm={12} md={12} lg={12} xl={12}>
                    <br/>
               
                  <Form onSubmit={handleSubmit(IniciarSession)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                        type="text" 
                        name="username"
                        placeholder="Ingresa tu usuario"
                        { ...register("username",{
                                required: true
                        })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password"
                        placeholder="Password"
                        name="password"
                        { ...register("password", { 
                                required: true
                        })} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Iniciar Sesion
                    </Button>
                    </Form>
                 </Col>
                   
                </Row>

            </Card.Body>
            <br />
            <Card.Footer>
             <Card.Text>
                 Todos los Derechos Reservados ON TIME COURIER 2022
             </Card.Text>
            </Card.Footer>
                </Card>

         

               
            
            
       
       
       
    )
}

export default Login