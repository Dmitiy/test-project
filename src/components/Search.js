import React, { Component } from "react";
import { Input, Row, Col, Form } from "antd";

class Search extends Component {
  onChangeHandler = (e) => {
    const str = e.target.value.trim();
    this.props.onChange(str);
  };

  render() {
    return (
      <>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Input
                placeholder='Введите слово для поиска ...'
                onChange={this.onChangeHandler}
                size='large'
                style={{ marginBottom: 24 }}
              />
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default Search;
