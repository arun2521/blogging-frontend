import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import axios from "axios";
import { config } from "../../App";
import CardItems from "../CardItems/CardItems";
import "./Dashboard.css";
import FormComp from "../FormCom/FormComp";

const Dashboard = ({ handleLogout }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [addBlogClick, setAddBlogClick] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const token = localStorage.getItem("token");
  const fetchBlogPosts = async () => {
    try {
      const res = await axios.get(`${config.endpoint}/blogs/blogposts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddclick = () => {
    setAddBlogClick(!addBlogClick);
  };

  const handleCloseForm = () => {
    setAddBlogClick(false);
  };

  const handleSubmit = async () => {
    if (!newTitle || !newContent) {
      message.warning("Please enter both title and content");
      return;
    }

    try {
      const res = await axios.post(
        `${config.endpoint}/blogs/blogposts`,
        {
          title: newTitle,
          content: newContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllBlogs([...allBlogs, res.data]);
      handleCloseForm();
    } catch (err) {
      console.error("Error adding blog post:", err);
    }
  };

  return (
    <>
      <div className="nav_header">
        <div className="text-header-div">
          <h1>
            <span className="gradient-text">Blog </span>
          </h1>
        </div>
        <div className="inner-div">
          <div>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="class-items">
        {allBlogs.length > 0 ? (
          allBlogs.map((item) => {
            return (
              <CardItems
                title={item.title}
                content={item.content}
                key={item._id}
                id={item._id}
                fetchBlogPosts={fetchBlogPosts}
              />
            );
          })
        ) : (
          <p>No Blogs To Display!</p>
        )}
      </div>
      <div onClick={handleAddclick}>
        <p className="add-blog">Add New Blog</p>
      </div>
      {addBlogClick ? (
        <div className="form-input">
          <FormComp
            newTitle={newTitle}
            newContent={newContent}
            setNewTitle={setNewTitle}
            setNewContent={setNewContent}
          />
          <div className="cross-div">
            <button className="submit-btn" onClick={handleSubmit}>
              ADD
            </button>
            <button className="submit-btn" onClick={handleCloseForm}>
              CANCEL
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Dashboard;
