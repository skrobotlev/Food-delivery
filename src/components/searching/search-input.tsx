import React, { DetailedHTMLProps, InputHTMLAttributes, useState, ChangeEventHandler, ChangeEvent, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    clearAll?: boolean;
    children?: any;
}

export const Search: React.FC<SearchInputProps> = ({ placeholder }) => {
    const [searchValue, setSearchValue] = useState("");

    const clearInput = () => {
        setSearchValue("");
    };

    useEffect(() => {
        if (searchValue) console.log("a");
    }, [searchValue]);

    const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const searchWord = e.currentTarget.value;
        setSearchValue(searchWord);
    };
    return (
        <div className="search-input">
            <input className="text-field__input"
                type="text" placeholder={placeholder}
                value={searchValue} onChange={updateSearchValue} />
            <CancelIcon className="close-icon" onClick={clearInput} />
            <SearchIcon className="search-icon" />
        </div>
    );
};

// const SearchInput: React.FC<SearchInputProps> = ({ placeholder, clearAll }) => {
// const [searchValue, setSearchValue] = useState("");

// const clearInput = () => {
//     setSearchValue("");
// };

// useEffect(() => {
//     if (searchValue) console.log("a");
// }, [searchValue]);

// const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
//     const searchWord = e.currentTarget.value;
//     setSearchValue(searchWord);
// };
// return (

//  <input className="text-field__input"
//     type="text" placeholder={placeholder}
//     value={searchValue} onChange={updateSearchValue} /> 

// <Search placeholder={placeholder} >
{/* <CancelIcon className="close-icon" />
            <SearchIcon className="search-icon" /> */}
{/* </Search> */ }

        // {/* {searchValue && clearAll ?
        //     <CancelIcon className="close-icon" onClick={clearInput} />
        //     : <SearchIcon className="search-icon" />} */}

//     );
// };

// export default SearchInput;
