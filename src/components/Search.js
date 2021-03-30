import React, { Component } from "react";
import { Input, Row, Col, Form, Button } from "antd";
import PropTypes from "prop-types";

class Search extends Component {
  onChangeHandler = (e) => {
    const str = e.target.value.trim();
    this.props.onChange(str);
  };

  resetFilterData = () => {
    this.props.resetFilter();
  };

  render() {
    return (
      <>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={20}>
              <Input
                placeholder='Введите слово для поиска ...'
                onChange={this.onChangeHandler}
                size='large'
                style={{ marginBottom: 24 }}
                value={this.props.value}
              />
            </Col>
            <Col span={4}>
              <Button
                type='primary'
                className='btn-resetFilter'
                onClick={this.resetFilterData}
                size='large'
                htmlType='reset'
              >
                Очистить поиск
              </Button>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Search;
