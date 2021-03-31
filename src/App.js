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

    const sourceData = illustration.map(({ id, name, pack }, index) => ({
      iterationId: index + 1,
      key: `${id}_${index}`,
      id,
      name,
      packName: pack.name,
    }));

    const matchesWords = filterValue
      .split(",")
      .filter((el) => !!el)
      .map((el) => el.toLowerCase().trim());

    const tableData = sourceData.filter(({ id, name, packName }) => {
      if (!matchesWords.length) {
        return true;
      }

      for (let word of matchesWords) {
        if (
          id.toString().indexOf(word) !== -1 ||
          name.toLowerCase().indexOf(word) !== -1 ||
          packName.toLowerCase().indexOf(word) !== -1
        ) {
          return true;
        }
      }
      return false;
    });

    return (
      <div className='app'>
        <Search value={filterValue} onChange={this.onSearchChange} />
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
              ${tableData.length}/${illustration.length}`
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
