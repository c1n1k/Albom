import React, { Component } from "react";
import { Row, Col, Form, Button, Input, Card, CardImg } from "reactstrap";
import { load, save } from "../helper.js";
import { makeThumb, submitImages } from "./add";
import "./style.css";
import Loader from "../Loader";

const resetForm = () => {
  const form = document.forms.loadImage;
  form.reset();
};

export default class Add extends Component {
  initialState = {
    items: [],
    images: {},
    isFetching: false
  };

  state = this.initialState;

  handleChange = event => {
    makeThumb(event.target.files).then(result => {
      this.setState({ ...this.state, items: result });
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isFetching: true
    });
    submitImages(this.state.items, process.env.REACT_APP_IMGUR_CLIENT_ID).then(
      result => {
        const images = load("images");
        const alboms = load("alboms");
        const albomIndex = alboms.findIndex(
          item => item.id === this.props.idAlbom
        );

        result.forEach(item => {
          images[item.data.id] = item.data.link;
          alboms[albomIndex].items.push(item.data.id);
        });

        save(images, "images");
        save(alboms, "alboms");

        this.setState({
          ...this.state,
          items: this.initialState.items,
          isFetching: false
        });

        this.props.onUpload(true);
        resetForm();
      }
    );
  };

  removeImg = event => {
    const id = event.target.id;
    const index = this.state.items.findIndex(item => item.id === id);
    const newItems = [
      ...this.state.items.slice(0, index),
      ...this.state.items.slice(index + 1)
    ];
    this.setState({
      ...this.state,
      items: newItems
    });
  };

  render() {
    const thumbs = this.state.items.map(item => {
      if (item) {
        return (
          <Col xs="6" sm="2" key={item.file.name}>
            <Card className="upload__thumb">
              <CardImg
                top
                width="100%"
                src={item.thumbUrl}
                id={item.id}
                onClick={this.removeImg}
              />
            </Card>
          </Col>
        );
      }
      return "";
    });

    return (
      <Form name="loadImage" onSubmit={this.handleSubmit}>
        <Row className="upload">
          <Col>
            <Input
              type="file"
              name="file"
              id="imgFile"
              accept="image/*"
              multiple
              onChange={this.handleChange}
            />
          </Col>
          <Col>
            <Button color="success">Загрузить</Button>
          </Col>
        </Row>
        <Row className="upload__preview">{thumbs}</Row>
        {this.state.isFetching && <Loader />}
      </Form>
    );
  }
}
