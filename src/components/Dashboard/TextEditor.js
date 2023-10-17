import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import formatEmail from "../Function/Function";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const emailInputRef = useRef();
  const subjectInputRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredSubject = subjectInputRef.current.value;

    const content = editorState.getCurrentContent();
    const contentAsPlainText = convertToRaw(content)
      .blocks.map((block) => block.text)
      .join("\n");

    try {
      const sendEmailData = await axios.post(
        `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
          enteredEmail
        )}/emailData.json`,
        {
          id: uuidv4(),
          email: enteredEmail,
          subject: enteredSubject,
          emailData: contentAsPlainText,
        }
      );
      console.log(sendEmailData);
      console.log(sendEmailData.data);
    } catch (error) {
      console.log(error);
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
