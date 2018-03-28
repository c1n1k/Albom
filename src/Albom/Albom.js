import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Input,
  Card,
  CardImg
} from "reactstrap";
import { load, renameAlbom, removeAlbom, removeImg } from "../helper.js";
import Add from "../Add";
import "./albom.css";

export default class Albom extends Component {
  initialState = {
    isAddPhoto: false,
    isEdit: false
  };

  state = this.initialState;

  componentWillMount() {
    const id = this.props.match.params.id;
    const data = load("alboms").filter(item => {
      return item.id === Number(id);
    });
    this.setState({ ...this.state, ...data[0] });
  }

  back = () => {
    this.props.history.goBack();
  };

  handleSubmit = event => {
    event.preventDefault();
    renameAlbom(event, this.state.id).then(data =>
      this.setState({ ...this.state, ...data })
    );
    this.toggleEdit();
  };

  toggleEdit = () => {
    this.setState(prevState => ({ ...this.state, isEdit: !prevState.isEdit }));
  };

  toggleAddPhoto = () => {
    this.setState(prevState => ({
      ...this.state,
      isAddPhoto: !prevState.isAddPhoto
    }));
  };

  handleRemove = () => {
    removeAlbom(this.state.id) ? this.back() : "";
  };

  handleUpload = flag => {
    if (flag) {
      const data = load("alboms").filter(item => {
        return item.id === this.state.id;
      });
      this.setState({ ...this.state, ...data[0] });
    }
  };

  getAlbomImg = () => {
    const albom = this.state;
    const images = load("images");
    return albom.items.map(id => {
      return { id: id, url: `${images[id]}` };
    });
  };

  removeImage = event => {
    const idImg = event.target.getAttribute("id");
    const idAlbom = this.state.id;

    removeImg(idImg, idAlbom).then(flag => {
      if (flag) {
        const data = load("alboms").filter(item => {
          return item.id === this.state.id;
        });
        this.setState({ ...this.state, ...data[0] });
      }
    });
  };

  render() {
    const albom = this.state;
    const albomImages = this.getAlbomImg();
    const gallery = albomImages.map(item => {
      if (item) {
        return (
          <Col xs="12" sm="4" key={item.id} className="gallery__item">
            <Card className="gallery__img-wrap">
              <CardImg width="100%" src={item.url} className="gallery__img" />
              <Button id={item.id} onClick={this.removeImage}>
                Удалить
              </Button>
            </Card>
          </Col>
        );
      }
      return "";
    });
    return (
      <Container className="albom">
        <Row className="albom__bar">
          <Col xs="12" sm="2">
            <Button color="link" onClick={this.back}>
              Назад
            </Button>
          </Col>
          <Col xs="12" sm="10" className="albom__bar-actions">
            <Button onClick={this.toggleAddPhoto}>Загрузить</Button>
            <Button onClick={this.toggleEdit}>Переименовать</Button>
            <Button id={albom.id} onClick={this.handleRemove}>
              Удалить
            </Button>
          </Col>
        </Row>
        {this.state.isEdit ? (
          <Form name="renameAlbom" onSubmit={this.handleSubmit}>
            <Row className="albom__head">
              <Col xs="auto" sm="10">
                <Input
                  type="text"
                  name="newName"
                  id="newName"
                  defaultValue={albom.name}
                  autoFocus
                />
              </Col>
              <Col xs="auto" sm="2">
                <Button color="success">Изменить</Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <Row className="albom__head">
            <Col>
              <h1>{albom.name}</h1>
            </Col>
          </Row>
        )}
        {this.state.isAddPhoto && (
          <Add idAlbom={this.state.id} onUpload={this.handleUpload} />
        )}
        <Row className="gallery">{gallery}</Row>
      </Container>
    );
  }
}
