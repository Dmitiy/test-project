import React, { Component } from "react";
import { getDataFromApi } from "./api/getDataFromApi";
import Search from "./components/Search";
import { Table, Button, Modal, Tag } from "antd";

const columns = [
  {
    title: "№",
    dataIndex: "iterationId",
    key: "iterationId",
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Created date",
    dataIndex: "createdDate",
    key: "createdDate",
  },
];

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

  showModal = (data) => {
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
    const { illustration, filterValue, hasMore, dataModal } = this.state;

    const tableData = illustration
      .map(({ id, name, createdDate, cover, keywords, pack }, index) => ({
        iterationId: index + 1,
        key: `${id}_${index}`,
        id: `${id}`,
        name,
        createdDate,
        cover,
        keywords,
        pack,
      }))
      .filter(
        ({ id, name, createdDate }) =>
          !filterValue ||
          id.indexOf(filterValue) !== -1 ||
          name.indexOf(filterValue) !== -1 ||
          createdDate.indexOf(filterValue) !== -1
      );

    return (
      <div className='app'>
        <Search data={illustration} onChange={this.onSearchChange}></Search>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                console.log(record);
                this.showModal(record);
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
          visible={this.state.isDisplayModal}
          onCancel={this.hideModal}
          onOk={this.hideModal}
        >
          <ul>
            <li>
              <p>
                Раздел:
                {dataModal.pack && (
                  <Tag color='blue'>{dataModal.pack.name}</Tag>
                )}
              </p>
            </li>
            <li>
              <p>ID: {dataModal.id} </p>
              <p>Название: {dataModal.name}</p>
              <p>Дата создания: {dataModal.createdDate}</p>
            </li>
            <li>
              <p>
                Ключевые слова:
                {dataModal.keywords &&
                  dataModal.keywords.map((tag) => (
                    <Tag color='green' key={tag + Date.now()}>
                      {tag}
                    </Tag>
                  ))}
              </p>
            </li>
            <li>
              <img src={dataModal.cover} width={272} alt={dataModal.name} />
            </li>
          </ul>
        </Modal>
      </div>
    );
  }
}

export default App;
