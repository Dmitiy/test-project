import React, { Component } from "react";
import { Input, Row, Col, Form, Button } from "antd";
import PropTypes from "prop-types";

class Search extends Component {
  searchInputRef = React.createRef();

  onChangeHandler = (e) => {
    const str = e.target.value.trim();
    this.props.onChange(str);
  };

  resetFilterData = () => {
    this.props.resetFilter();
  };

  componentDidMount() {
    this.searchInputRef.current.focus();
  }

  render() {
    return (
      <>
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={20}>
              <Input
                ref={this.searchInputRef}
                placeholder='Введите слово для поиска ...'
                onChange={this.onChangeHandler}
                size='large'
                style={{ marginBottom: 24 }}
                value={this.props.value}
                tabIndex='1'
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
