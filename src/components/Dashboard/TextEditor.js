import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import axios from "axios";

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const emailInputRef = useRef();
  const subjectInputRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;

    const content = editorState.getCurrentContent();
    const contentAsPlainText = convertToRaw(content)
      .blocks.map((block) => block.text)
      .join("\n");

    // You can use Axios or another method to send the email content, email, and subject
    // Example Axios request:
    try {
      await axios.post("your-email-api-endpoint", {
        to: enteredEmail,
        subject: enteredSubject,
        text: contentAsPlainText,
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <form className="flex flex-col" onSubmit={formSubmitHandler}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="send to"
            className="m-4 w-96 p-2 border"
            ref={emailInputRef}
          />
          <input
            type="text"
            placeholder="subject"
            className="ml-4 mb-4 w-96 p-2 border"
            ref={subjectInputRef}
          />
        </div>
        <button
          className="hover:border p-4 mr-2 rounded-3xl"
          onClick={props.onCancel}
        >
          x
        </button>
      </div>

      <div className="ml-4 border h-80">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <button
        type="submit"
        className="mt-2 border mx-auto  rounded py-2 px-24 hover:shadow-md"
      >
        Send
      </button>
    </form>
  );
};

export default TextEditor;
