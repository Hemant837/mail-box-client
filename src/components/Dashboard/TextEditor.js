import React, { useState, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { receiverDataActions } from "../../store/receiverData-slice";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const receiverEmailInputRef = useRef();
  const receiverSubjectInputRef = useRef();

  const dispatch = useDispatch();
  const sendersEmail = useSelector((state) => state.auth.userEmail);

  const stopComposing = () => {
    dispatch(uiActions.toggle());
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const receiverEmail = receiverEmailInputRef.current.value;
    const receiverSubject = receiverSubjectInputRef.current.value;

    const content = editorState.getCurrentContent();
    const contentAsPlainText = convertToRaw(content)
      .blocks.map((block) => block.text)
      .join("\n");

    const sendToReceiverData = {
      id: uuidv4(),
      sendersEmail: sendersEmail,
      receiverSubject: receiverSubject,
      receiverData: contentAsPlainText,
    };
    dispatch(receiverDataActions.setReceiverEmail(receiverEmail));
    dispatch(receiverDataActions.setReceiverData(sendToReceiverData));
    console.log(sendToReceiverData);
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
            ref={receiverEmailInputRef}
          />
          <input
            type="text"
            placeholder="subject"
            className="ml-4 mb-4 w-96 p-2 border"
            ref={receiverSubjectInputRef}
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
