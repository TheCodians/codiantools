import React from 'react';
import { FormControl } from "react-bootstrap";

const SearchBox = ({searchfield, searchChange}) => {
    return(
        <FormControl
        type="text"
        placeholder="Search"
        className="ml-sm-2"
        style={{ width: "15em", float:"left"}}
        onChange={searchChange}
      />
    );
}

export default SearchBox;