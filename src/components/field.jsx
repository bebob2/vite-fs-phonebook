import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export const Field = ({ value }) => {
  const [edit, setEdit] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
      console.log(inputRef);
    }
  }, [edit]);

  const handleEdit = (event) => {
    if (event.detail !== 2) {
      return;
    }
    setEdit(true);
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      setEdit(false);
    }
    console.log("bla", event.keyCode);
  };
  const Input = <input ref={inputRef} onKeyDown={handleEnter} value={value} />;
  return (
    <>
      {edit ? (
        <input ref={inputRef} onKeyDown={handleEnter} value={value} />
      ) : (
        <span style={{ userSelect: "none" }} onClick={handleEdit}>
          {value}
        </span>
      )}
    </>
  );
};
