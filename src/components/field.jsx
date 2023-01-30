import React from "react";
import { useRef } from "react";
import { useState } from "react";

export const Field = ({ value }) => {
  const [edit, setEdit] = useState(false);

  const inputRef = useRef(null);

  const handleEdit = (event) => {
    if (event.detail !== 2) {
      return;
    }
    setEdit(true);
    inputRef.current?.focus();
    console.log(inputRef);

    // return(

    // )
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
      <input
        style={edit ? { display: "block" } : { display: "none" }}
        ref={inputRef}
        onKeyDown={handleEnter}
        value={value}
      />
      <span
        style={{
          userSelect: "none",
          ...(edit ? { display: "none" } : { display: "block" }),
        }}
        onClick={handleEdit}
      >
        {value}
      </span>
    </>
  );
};
