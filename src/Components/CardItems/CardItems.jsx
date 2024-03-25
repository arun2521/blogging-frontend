import React, { useState } from 'react';
import axios from 'axios';
import { config } from '../../App';
import FormComp from '../FormCom/FormComp';
import { CiEdit } from "react-icons/ci";
import { TfiUpload } from "react-icons/tfi";

const CardItems = ({ title, content, id, fetchBlogPosts }) => {
  const [clickedEdit, setClickedEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);
  const [showComments, setShowComments] = useState(false);
  const [showAddComments, setShowAddComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const token = localStorage.getItem("token");
  const handleDelete = async () => {
    try {
      await axios.delete(`${config.endpoint}/blogs/blogposts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlogPosts();
    } catch (err) {
      console.error("Error deleting blog post:", err);
    }
  };

  const handleEdit = () => {
    setClickedEdit(true);
  };

  const handleCloseForm = () => {
    setClickedEdit(false);
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axios.put(`${config.endpoint}/blogs/blogposts/${id}`,         {
        title: newTitle,
        content: newContent,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      fetchBlogPosts();
      setClickedEdit(false);
    } catch (err) {
      console.error("Error updating blog post:", err);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${config.endpoint}/blogs/blogposts/${id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(id);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentsClick = () => {
    setShowComments(!showComments);
    setShowAddComments(!showAddComments);
    if (!showComments) {
      fetchComments();
    }
  };

  const postComment = async () => {
    try {
      const response = await axios.post(
        `${config.endpoint}/blogs/${id}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <>
      <div>
        <h4>{title}</h4>
        <h5>{content}</h5>
      </div>
      <div>
        <div>
          <p onClick={handleCommentsClick}>
            Comments
          </p>
        </div>
        <div style={{ opacity: "0.8" }}>
          <svg
            style={{ cursor: "pointer" }}
            onClick={handleDelete}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="20"
            viewBox="0 0 24 24"
          >
            <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
          </svg>

          <img
            style={{ cursor: "pointer" }}
            onClick={handleEdit}
            width="20"
            src={<CiEdit />}
            alt=""
          />
        </div>
      </div>
      {showAddComments ? (
        <>
          <input
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
            type="text"
            value={newComment}
            placeholder="Add Comment..."
          />{" "}
          <img
            onClick={postComment}
            width={"20px"}
            src={<TfiUpload />}
            alt=""
          />
        </>
      ) : (
        <></>
      )}
      {clickedEdit ? (
        <div>
          <FormComp
            newTitle={newTitle}
            newContent={newContent}
            setNewTitle={setNewTitle}
            setNewContent={setNewContent}
            title={title}
            content={content}
          />
          <p onClick={handleCloseForm}>
            X
          </p>
          <button onClick={handleEditSubmit}>
            ADD
          </button>
        </div>
      ) : (
        <></>
      )}
      {showComments && comments.length > 0 && (
        <div>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <p >{comment.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default CardItems;