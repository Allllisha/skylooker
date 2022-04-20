import React, { FormEvent, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../stylesheets/Search.scss";

type Props = {
  search: (todoText: string) => void;
};

const Search: React.FC<Props> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const callSearchFunction = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInputText = textInputRef.current!.value;
    console.log(userInputText);
    props.search(userInputText);
  };

  return (
    <div className="seatch-container">
    <Form className="search" onSubmit={callSearchFunction}>
      <input ref={textInputRef} type="text" />
      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
    </div>
  );
};

export default Search;
