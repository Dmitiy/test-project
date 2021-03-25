import React, { Component } from "react";
import { getDataFromApi } from "./api/getDataFromApi";
import Search from "./components/Search";
import { Table, Button } from "antd";

const columns = [
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

  render() {
    const { illustration, filterValue, hasMore } = this.state;

    const tableData = illustration
      .map(({ id, name, createdDate }, index) => ({
        key: `${id}_${index}`,
        id: `${id}`,
        name,
        createdDate,
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
        <Table dataSource={tableData} columns={columns} pagination={false} />
        {hasMore && (
          <Button type='primary' onClick={this.addNextPageData}>
            Показать еще
          </Button>
        )}
      </div>
    );
  }
}

export default App;
