import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { userDataActions } from "../../store/userData-slice";
import axios from "axios";
import formatEmail from "../Function/Function";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const sentEmailInputRef = useRef();
  const sentSubjectInputRef = useRef();

  const dispatch = useDispatch();
  const inboxEmail = useSelector((state) => state.auth.userEmail);

  const stopComposing = () => {
    dispatch(uiActions.toggle());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const sentEmail = sentEmailInputRef.current.value;
    const sentSubject = sentSubjectInputRef.current.value;

    const content = editorState.getCurrentContent();
    const contentAsPlainText = convertToRaw(content)
      .blocks.map((block) => block.text)
      .join("\n");

    const sentDatas = {
      id: uuidv4(),
      sentEmail: sentEmail,
      sentSubject: sentSubject,
      sentData: contentAsPlainText,
    };

    const inboxDatas = {
      id: uuidv4(),
      inboxEmail: inboxEmail,
      inboxSubject: sentSubject,
      inboxData: contentAsPlainText,
    };

    try {
      const sentDataToFirebase = await axios.post(
        `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
          inboxEmail
        )}/sent.json`,
        sentDatas
      );
      console.log(sentDataToFirebase.data);
      dispatch(userDataActions.setSentDatas(sentDatas));
      const InboxDataToFirebase = await axios.post(
        `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
          sentEmail
        )}/inbox.json`,
        inboxDatas
      );
      console.log(InboxDataToFirebase.data);
      dispatch(userDataActions.setSentEmail(sentEmail));
      dispatch(userDataActions.setInboxDatas(inboxDatas));
    } catch (error) {
      console.log(error);
    }
    dispatch(uiActions.toggle());
    

    // localStorage.setItem("sentEmail", sentEmail)
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
            ref={sentEmailInputRef}
          />
          <input
            type="text"
            placeholder="subject"
            className="ml-4 mb-4 w-96 p-2 border"
            ref={sentSubjectInputRef}
          />
        </div>
        <button
          className="hover:border p-4 mr-2 rounded-3xl"
          onClick={stopComposing}
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
