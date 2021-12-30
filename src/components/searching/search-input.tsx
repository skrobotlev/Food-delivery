import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Input from "@mui/material/Input";



import "../../global.scss";

interface SearchInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder?: string;
    clearAll?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder }) => {
    const [searchValue, SetSearchValue] = useState("");

    const clearInput = () => {
        SetSearchValue("");
    };

    const updateSearchValue = (e) => {
        const searchWord = e.target.value;
        SetSearchValue(searchWord);
    };
    return (
        <div className="search-input">
            <Input className="text-field__input"
                startAdornment={<AccountCircle />} />
            {/* <input type="text"></input> */}
            {/* <SearchIcon className="search-icon" /> */}
            <input className="text-field__input"
                type="text" placeholder="
                Search recipes, articles, people..."
                value={searchValue} onChange={updateSearchValue} />
            {searchValue !== "" ?
                <CancelIcon className="close-icon" onClick={clearInput} />
                : <SearchIcon className="search-icon" />}
        </div>
    );
};

export default SearchInput;
