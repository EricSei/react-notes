import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Item from "../Item/Item";
import "./note.scss";

const Note = (props) => {
  const { title, id, getNotes } = props;

  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const history = useHistory();

  const [items, setItems] = useState(null);

  const toggleEditNote = () => {
    setEditTitle(!editTitle);
  };

  useEffect(() => {
    getItems(id);
  }, []);

  const getItems = (noteId) => {
    axios
      .get(`http://localhost:3000/items?noteId=${noteId}`)
      .then((res) => {
        // handle success
        setItems(res.data);
      })
      .catch((err) => {
        // handle error
        console.log(err);
      });
  };

  const editNote = (e) => {
    //e.preventDefault();
    axios
      .patch(`http://localhost:3000/notes/${id}`, {
        title: newTitle,
      })
      .then((res) => {
        setNewTitle(res.data.title);
        toggleEditNote();
        getNotes();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = (e) => {
    //e.preventDefault();
    axios
      .delete(`http://localhost:3000/notes/${id}`)
      .then((res) => {
        getNotes(id);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderItems = (items) => {
    if (Array.isArray(items) && items.length > 0) {
      return items.map((item) => {
        return <Item data={item} getNotes={getNotes} getItems={getItems} />;
      });
    } else {
      return <div> Add New Item </div>;
    }
  };

  return (
    <div className="ui card note">
      <div className="content">
        <div className="header note-header">
          {editTitle ? (
            <>
              <span className="left floated title">
                <input
                  placeholder={newTitle}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </span>
              <span onClick={editNote} className="right floated edit">
                <i className="save icon lg"></i>
              </span>
            </>
          ) : (
            <>
              <span className="left floated title">{title}</span>
              <span onClick={toggleEditNote} className="right floated edit">
                <i className="edit icon"></i>
              </span>
            </>
          )}
        </div>
        <div className="description">
          <div className="ui list">{renderItems(items)}</div>
        </div>
      </div>
      <div className="extra content">
        {/* <Link to="/notes/items">Add Item</Link> */}
        <Link
          to={{
            pathname: "/notes/items",
            state: {
              id,
            },
          }}
        >
          <span className="left floated plus add-item">
            <i className="plus icon"></i>
          </span>
        </Link>

        <span onClick={deleteNote} className="right floated delete note-delete">
          <i className="trash alternate outline icon"></i>
          Delete Note
        </span>
      </div>
    </div>
  );
};

export default Note;
