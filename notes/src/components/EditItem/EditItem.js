import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import { useHistory, useLocation, Link } from "react-router-dom";

const EditItem = () => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);

  const history = useHistory();

  useEffect(() => {
    setId(history.location.state);
    getItem(id);
  }, [id]);

  const getItem = (id) => {
    axios
      .get(`http://localhost:3000/items/${id}`)
      .then((res) => {
        console.log(res.data);
        //setItem(res.data);
        const { title, desc } = res.data;
        setTitle(title);
        setDesc(desc);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EditItem = (e, id) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3000/items/${id}`, {
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
        <form onSubmit={(e) => EditItem(e, id)} class="ui form">
          <div class="field">
            <label>Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              value={title}
              placeholder={title}
            />
          </div>
          <div class="field">
            <label>Desc</label>
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              name="desc"
              value={desc}
              placeholder={desc}
            />
          </div>

          <Link to="/" className="ui button">
            <span className="right floated view header item">
              <i className="angle left icon "></i>
              <i className="home icon "></i>
            </span>
          </Link>
          <button className="ui button right floated" type="submit">
            Save Item
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default EditItem;
