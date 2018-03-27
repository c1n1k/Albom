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
import "./list.css";

export default class Albom extends Component {
  initialState = { alboms: load("alboms") };
  state = { ...this.initialState };

  handleSubmit = event => {
    event.preventDefault();
    createAlbom(event);
    this.setState({ ...this.state, alboms: load("alboms") });
  };
  render() {
    const alboms = this.state.alboms.map(albom => {
      return (
        <Col xs="4" key={albom.id}>
          <Link to={`/${albom.id}`}>
            <Card>
              <CardImg width="100%" src={albom.thumb ? albom.thumb : ""} />
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
            <Col>
              <Input
                type="text"
                name="albomName"
                placeholder="Название альбома"
              />
            </Col>
            <Col>
              <Button>Создать</Button>
            </Col>
          </Row>
        </Form>
        <Row className="list__section">{alboms}</Row>
      </Container>
    );
  }
}
