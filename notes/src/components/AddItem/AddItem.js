import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const AddItem = () => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory();
  const { id } = useLocation().state;

  const addItem = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/items/`, {
        noteId: id,
        title: title,
        desc: desc,
      })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editItem = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3000/items/`, {
        noteId: id,
        title: title,
        desc: desc,
      })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <div class="column">
        <form onSubmit={(e) => addItem(e)} class="ui form">
          <div class="field">
            <label> Item Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter title"
            />
          </div>
          <div class="field">
            <label>Item Desc</label>
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              name="desc"
              placeholder="Type Description..."
            />
          </div>
          <button class="ui button" type="submit">
            Add Item
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default AddItem;
