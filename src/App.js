import { Button, Modal, Table } from "antd";
import React, { Component } from "react";
import { getDataFromApi } from "./api/getDataFromApi";
import ModalDescription from "./components/ModalDescription";
import Search from "./components/Search";
import { illustrationColumns } from "./utils/illustrationColumns";

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

  resetFilterData = () => {
    this.setState({
      filterValue: "",
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
    const dataIllustration = this.state.illustration.find((el) =>
      el.id === idx ? el : null
    );

    this.setState({
      isDisplayModal: true,
      dataModal: dataIllustration,
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
      .map(({ id, name, pack }, index) => ({
        iterationId: index + 1,
        key: `${id}_${index}`,
        id,
        name,
        packName: pack.name,
      }))
      .filter(
        ({ id, name, packName }) =>
          !filterValue.toLowerCase() ||
          id.toString().indexOf(filterValue) !== -1 ||
          name.toLowerCase().indexOf(filterValue) !== -1 ||
          packName.toLowerCase().indexOf(filterValue) !== -1
      );

    return (
      <div className='app'>
        <Search
          data={illustration}
          value={this.state.filterValue}
          onChange={this.onSearchChange}
        />
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
          footer={() =>
            `Количество найденных совпадений:
              ${tableData.length}/${this.state.illustration.length}`
          }
        />
        {hasMore && !filterValue.length && (
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
