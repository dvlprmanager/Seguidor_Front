import React, { useEffect, useState, Fragment } from "react";
import { GetRout, PostRoute } from "../../Services/Private";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Container,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Bodega from "../../Base/assets/1.png";
import Espera from "../../Base/assets/2.png";
import Transito from "../../Base/assets/3.png";
import Combex from "../../Base/assets/4.png";
import Aduana from "../../Base/assets/5.png";
import Liberado from "../../Base/assets/6.png";
import BodegaGT from "../../Base/assets/7.png";
import Entrega from "../../Base/assets/8.png";
import Retorno from "../../Base/assets/9.png";
import Entregado from "../../Base/assets/10.png";
import Log from "../../Base/assets/logo2.png";
import { CardFooter, CardTitle } from "reactstrap";

const Seguidor = () => {
  const [datosPedido, setDatosPedido] = useState([]),
    { register, handleSubmit, setvalue } = useForm(),
    onSubmit = (data) => {
      const json = {
        waredHouse: data.tracking,
      };
      obtenerPedido(json);
    },
    obtenerPedido = async (data) => {
      const response = await PostRoute(`pedidos/track`, data);
      setDatosPedido(response.length ? response : [0]);
    },
    reset = () => {
      setDatosPedido(null);
      window.location.reload();
    };

  useEffect(() => {}, [datosPedido]);

  return (
    <div className="containerseguidor">
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <br />
              <img src={Log} width="400px" height="180px" />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <h1>Bienvenido Al Seguidor de Paquetes</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={4} md={4} lg={4} xl={4}>
              <br />
              <Form.Label>
                <i>Ingresa Tu Numero Warehouse</i>{" "}
              </Form.Label>
              <Form.Control
                name="tracking"
                {...register("tracking", { required: true })}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4} md={4} lg={4} xl={4}>
              <Button variant="success" className="my-4" type="submit">
                Buscar
              </Button>
            </Col>
          </Row>
        </Form>

        <Row>
          {datosPedido.length > 0 && (
            <Col>
              <Row>
                <Col>
                  <h2>Nombre Del Cliente: {datosPedido[0].nombre}</h2>
                </Col>
                <Col>
                  <h2>No. Warehouse: {datosPedido[0].noWare}</h2>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
        <br />
        <Row>
          {datosPedido.length > 0 &&
            datosPedido.map((datosPedido, index) => {
              return (
                <Col sm={4}>
                  <Card className="cardSeguidor">
                    <CardTitle>
                      <h5 className="text-center my-2">
                        Pedido No: {index + 1}
                      </h5>
                    </CardTitle>
                    <Card.Body>
                      <h6>
                        No.Tracking: <i>{datosPedido.tracking}</i>
                      </h6>
                      <h6>
                        shpName: <i>{datosPedido.shpName}</i>
                      </h6>
                      <h6>
                        totWtLbs: <i>{datosPedido.totWtLbs}</i>
                      </h6>
                      <h6>
                        totpcs: <i>{datosPedido.totpcs}</i>
                      </h6>
                      <h6>
                        descripcion: <p>{datosPedido.descripcion}</p>
                      </h6>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
        <br />

        <Row>
          {datosPedido.length > 0 && (
            <Col>
              {datosPedido[0].wEstado === 1 && (
                <Row>
                  <Col>
                    <img src={Bodega} width="200px" height="200px" />
                    <h4 className="text-center">En Bodega MIAMI</h4>
                    <br />
                    <ProgressBar animated now={1} />
                  </Col>
                </Row>
              )}

              {datosPedido[0].wEstado === 2 && (
                <Row>
                  <Col>
                    <img src={Espera} width="200px" height="200px" />
                    <h4 className="text-center">En espera de Recoleccion Miami-Gt</h4>
                    <br />
                    <ProgressBar animated now={10} />
                  </Col>
                </Row>
              )}

              {datosPedido[0].wEstado === 3 && (
                <Row>
                  <Col>
                    <img src={Transito} width="200px" height="200px" />
                    <h4 className="text-center">En Transito Miami-Gt</h4>
                    <br />
                    <ProgressBar animated now={20} />
                  </Col>
                </Row>
              )}

              {datosPedido[0].wEstado === 4 && (
                <Row>
                  <Col>
                    <img src={Combex} width="200px" height="200px" />
                    <h4 className="text-center">Ingreso a COMBEX GT</h4>
                    <br />
                    <ProgressBar animated now={30} />
                  </Col>
                </Row>
              )}

              {datosPedido[0].wEstado === 5 && (
                <Row>
                  <Col>
                    <img src={Aduana} width="200px" height="200px" />
                    <h4 className="text-center">Proceso Aduanal</h4>
                    <br />
                    <ProgressBar animated now={40} />
                  </Col>
                </Row>
              )}
              {datosPedido[0].wEstado === 6 && (
                <Row>
                  <Col>
                    <img src={Liberado} width="200px" height="200px" />
                    <h4 className="text-center">Liberado Para Entrega</h4>
                    <br />
                    <ProgressBar animated now={60} />
                  </Col>
                </Row>
              )}
              {datosPedido[0].wEstado === 7 && (
                <Row>
                  <Col>
                    <img src={BodegaGT} width="200px" height="200px" />
                    <h4 className="text-center">Ingreso a Bodega GT</h4>
                    <br />
                    <ProgressBar animated now={70} />
                  </Col>
                </Row>
              )}
              {datosPedido[0].wEstado === 8 && (
                <Row>
                  <Col>
                    <img src={Entrega} width="200px" height="200px" />
                    <h4 className="text-center">En Ruta De Entrega</h4>
                    <br />
                    <ProgressBar animated now={80} />
                  </Col>
                </Row>
              )}
              {datosPedido[0].wEstado === 9 && (
                <Row>
                  <Col>
                    <img src={Retorno} width="200px" height="200px" />
                    <h4 className="text-center">Retorno a Bodega</h4>
                    <br />
                    <ProgressBar variant="danger" animated now={100} />
                  </Col>
                </Row>
              )}
              {datosPedido[0].wEstado === 10 && (
                <Row>
                  <Col>
                    <img src={Entregado} width="200px" height="200px" />
                    <h4 className="text-center">Entregado</h4>
                    <br />
                    <ProgressBar variant="success" animated now={100} />
                  </Col>
                </Row>
              )}
            </Col>
          )}
        </Row>
        <br />
      </Container>
      <CardFooter>
        <Row>
          <Col>
            <h6>Derechos Reservados ON TIME COURIER</h6>
          </Col>
        </Row>
      </CardFooter>
      <br />
    </div>
  );
};

export default Seguidor;
