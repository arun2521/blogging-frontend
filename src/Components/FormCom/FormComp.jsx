import React from "react";
import { Input } from "antd";
import "./FormComp.css";

const { TextArea } = Input;
const FormComp = ({ newContent, newTitle, setNewTitle, setNewContent }) => {
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setNewContent(event.target.value);
  };
  return (
    <div className="form-header">
      <div
        style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <h2 className="form-label">Title:</h2>
        <Input
          className="form-input"
          type="text"
          placeholder="Enter Title"
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 className="form-label">Content:</h2>
        <TextArea
          placeholder="Enter Content"
          className="form-text"
          value={newContent}
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default FormComp;
