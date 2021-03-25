import React, { Component } from "react";
import { Input, Row, Col, Form } from "antd";

class Search extends Component {
  state = {};
  onChangeHandler = (e) => {
    const str = e.target.value.trim();
    this.props.onChange(str);
  };
  render() {
    return (
      <>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={10}>
              <Input
                placeholder='Введите слово для поиска ...'
                onChange={this.onChangeHandler}
              />
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default Search;
