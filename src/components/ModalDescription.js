import React, { Component } from "react";
import { Tag } from "antd";
import PropTypes from "prop-types";
class ModalDescription extends Component {
  render() {
    const {
      id,
      name,
      createdDate,
      cover,
      keywords,
      pack,
    } = this.props.dataModal;
    return (
      <>
        <ul className='description-modal-list'>
          <li>
            <p>
              Раздел:
              {pack && <Tag color='blue'>{pack.name || "не найден"}</Tag>}
            </p>
          </li>
          <li>
            <p>ID: {id || "отсутствует"} </p>
            <p>Название: {name || "отсутствует"}</p>
            <p>Дата создания: {createdDate || "отсутствует"}</p>
          </li>
          <li>
            <p>
              Ключевые слова:
              {keywords &&
                keywords.map((tag) => (
                  <Tag color='green' key={tag + Date.now()}>
                    {tag || "не указаны"}
                  </Tag>
                ))}
            </p>
          </li>
          {cover && (
            <li>
              <img src={cover} width={272} alt={name} />
            </li>
          )}
        </ul>
      </>
    );
  }
}

ModalDescription.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  createdDate: PropTypes.string,
  cover: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  pack: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default ModalDescription;