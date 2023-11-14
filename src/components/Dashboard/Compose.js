import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { userDataActions } from "../../store/userData-slice";
import axios from "axios";
import formatEmail from "../Function/Function";

const Compose = () => {
  const baseURL = "https://mail-box-client-8c444-default-rtdb.firebaseio.com/";
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const toEmailInputRef = useRef();
  const subjectInputRef = useRef();

  const dispatch = useDispatch();
  const currentUserEmail = useSelector((state) => state.auth.userEmail);

  const stopComposing = () => {
    dispatch(uiActions.toggle());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const toEmail = toEmailInputRef.current.value;
    const subject = subjectInputRef.current.value;

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    };
    const formattedDate = formatDate(new Date());
    const content = editorState.getCurrentContent();
    const message = convertToRaw(content)
      .blocks.map((block) => block.text)
      .join("\n");

    // login as  vermahemant837@gmail.com

    const sentDatas = {
      to: toEmail, // vermahemant095@gmail.com
      subject: subject,
      message: message,
      time: formattedDate,
      read: false,
      starred: false,
      important: false,
      recieve: false,
      send: true,
      sender: currentUserEmail, // vermahemant837@gmail.com
    };

    // vermahemant095@gmail.com

    const inboxDatas = {
      from: currentUserEmail, // vermahemant837@gmail.com
      subject: subject,
      message: message,
      time: formattedDate,
      read: false,
      starred: false,
      important: false,
      recieve: true,
      send: false,
      to: toEmail, // vermahemant095@gmail.com
    };

    try {
      const inboxDatasResponse = await axios.post(
        `${baseURL}/${formatEmail(toEmail)}/inbox.json`,
        inboxDatas
      );
      console.log(inboxDatasResponse.data);

      const sentDatasResposne = await axios.post(
        `${baseURL}/${formatEmail(currentUserEmail)}/sent.json`,
        sentDatas
      );
      console.log(sentDatasResposne.data);
    } catch (error) {
      console.log(error);
    }
    dispatch(userDataActions.setInboxDatas(inboxDatas));
    dispatch(userDataActions.setSentDatas(sentDatas));

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
            ref={toEmailInputRef}
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

export default Compose;
