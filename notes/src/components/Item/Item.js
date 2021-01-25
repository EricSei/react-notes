import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./item.scss";

const Item = ({ data, getItems }) => {
  const { id, noteId, title, desc } = data;
  const [_title, setTitle] = useState(title);
  const [_desc, setDesc] = useState(desc);
  console.log(data.isCompleted);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);

  const history = useHistory();

  const editItem = (id) => {
    history.push("/edit/item", id);
  };

  const readItem = (id) => {
    history.push("/read/item", id);
  };

  const DeleteItem = (id) => {
    axios
      .delete(`http://localhost:3000/items/${id}`)
      .then((res) => {
        console.log(res.data, " is deleted.");
        getItems(noteId);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completedItem = (id) => {
    axios
      .put(`http://localhost:3000/items/${id}`, {
        isCompleted: true,
      })
      .then((res) => {
        console.log(res.data, " is completed.");
        getItems(noteId);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="item">
      <i className="sticky note icon"></i>
      <div className="content">
        <a className={isCompleted ? "header-completed" : "header"}>
          {data.title}
        </a>
        <div className="description">{data.desc}</div>
      </div>

      <span className="right floated trash" onClick={() => DeleteItem(id)}>
        <i className="trash alternate outline icon"></i>
      </span>
      <span className="right floated edit" onClick={() => editItem(id)}>
        <i className="edit outline icon"></i>
      </span>
      <span className="right floated view" onClick={() => readItem(id)}>
        <i className="envelope open outline icon"></i>
      </span>
      <span
        className="right floated clipboard"
        onClick={() => completedItem(id)}
      >
        <i className="clipboard check icon"></i>
      </span>
    </div>
  );
};

export default Item;
