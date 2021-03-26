import React, { Component } from "react";
import { getDataFromApi } from "./api/getDataFromApi";
import Search from "./components/Search";
import { illustrationColumns } from "./utils/illustrationColumns";
import ModalDescription from "./components/ModalDescription";
import { Button, Modal, Table } from "antd";

class App extends Component {
  state = {
    illustration: [],
    filterValue: "",
    page: 1,
    hasMore: false,
    isDisplayModal: false,
    dataModal: {},
  };

  componentDidMount() {
    this.fetchPageData();
  }

  fetchPageData = () => {
    getDataFromApi(this.state.page).then(this.setPageData);
  };

  setPageData = ({ list, hasMore }) => {
    this.setState({
      illustration: [...this.state.illustration, ...list],
      hasMore,
    });
  };

  onSearchChange = (str) => {
    this.setState({
      filterValue: str,
    });
  };

  addNextPageData = () => {
    this.setState(
      {
        page: this.state.page + 1,
        hasMore: false,
      },
      this.fetchPageData
    );
  };

  showModal = (idx) => {
    const data = this.state.illustration.find((el) =>
      el.id === idx ? el : null
    );

    this.setState({
      isDisplayModal: true,
      dataModal: data,
    });
  };

  hideModal = () => {
    this.setState({
      isDisplayModal: false,
    });
  };

  render() {
    const {
      illustration,
      filterValue,
      hasMore,
      isDisplayModal,
      dataModal,
    } = this.state;

    const tableData = illustration
      .map(({ id, name, createdDate }, index) => ({
        iterationId: index + 1,
        key: `${id}_${index}`,
        id,
        name,
        createdDate,
      }))
      .filter(
        ({ id, name, createdDate }) =>
          !filterValue ||
          id.toString().indexOf(filterValue) !== -1 ||
          name.indexOf(filterValue) !== -1 ||
          createdDate.indexOf(filterValue) !== -1
      );

    return (
      <div className='app'>
        <Search data={illustration} onChange={this.onSearchChange}></Search>
        <Table
          dataSource={tableData}
          columns={illustrationColumns}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                this.showModal(record.id);
              },
            };
          }}
        />
        {hasMore && (
          <Button
            type='primary'
            className='btn-addMore'
            onClick={this.addNextPageData}
            block
          >
            Показать еще
          </Button>
        )}
        <Modal
          title='Подробная информация'
          okText='Ok'
          visible={isDisplayModal}
          onCancel={this.hideModal}
          onOk={this.hideModal}
        >
          <ModalDescription dataModal={dataModal} />
        </Modal>
      </div>
    );
  }
}

export default App;
