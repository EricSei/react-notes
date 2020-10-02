import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../Layout/Layout";
import axios from "axios";
import "./item.scss";

const ReadItem = ({ data }) => {
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

  return (
    <Layout>
      <div className="ui card">
        <div className="content">
          <a className="header">{title}</a>
          <div className="description">{desc}</div>
        </div>
        <div className="extra content">
          <Link to="/">
            <span className="left floated view header item">
              <i className="angle left icon large"></i>
              <i className="home icon large"></i>
            </span>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ReadItem;
