import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardBody,
  Input,
  Button,
  Form
} from "reactstrap";
import { Link } from "react-router-dom";
import { createAlbom, load } from "../helper.js";
import placeholder from "./empty.png";
import "./list.css";

export default class Albom extends Component {
  initialState = { alboms: load("alboms"), images: load("images") };
  state = { ...this.initialState };

  handleSubmit = event => {
    event.preventDefault();
    createAlbom(event);
    this.setState({ ...this.state, alboms: load("alboms") });
  };
  render() {
    const alboms = this.state.alboms.map(albom => {
      return (
        <Col xs="12" sm="4" key={albom.id} className="list__item">
          <Link to={`/${albom.id}`}>
            <Card>
              <div className="list__item-img">
                <CardImg
                  className=""
                  width="100%"
                  src={
                    albom.thumb ? this.state.images[albom.thumb] : placeholder
                  }
                />
              </div>
              <CardBody>
                <CardTitle>{albom.name}</CardTitle>
              </CardBody>
            </Card>
          </Link>
        </Col>
      );
    });
    return (
      <Container className="list">
        <Form name="createAlbom" onSubmit={this.handleSubmit}>
          <Row className="list__section">
            <Col xs="auto" sm="10">
              <Input
                type="text"
                name="albomName"
                placeholder="Название альбома"
              />
            </Col>
            <Col xs="auto" sm="2">
              <Button>Создать</Button>
            </Col>
          </Row>
        </Form>
        <Row className="list__section">{alboms}</Row>
      </Container>
    );
  }
}
