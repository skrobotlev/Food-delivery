import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const TestSearchInut = ({ placeholder }) => {
    const [wordEntered, setWordEntered] = useState("");
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
    };

    const clearInput = () => {
        // setFilteredData([]);
        setWordEntered("");
    };
    return (
        <div className="search-input">
            <input className="text-field__input" type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter} />
            {wordEntered !== "" ? <CancelIcon className="closeicon" onClick={clearInput} /> : ""}
        </div>
    );
};

export default TestSearchInut;
