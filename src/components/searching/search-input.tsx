import React, { DetailedHTMLProps, InputHTMLAttributes, useState, ChangeEventHandler, ChangeEvent, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

interface SearchInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    clearAll?: boolean;
    children?: any;
}

const SearchInputDiv = styled.div`
  /* height: 100vh;
  width: 100%; */
  display: inline-block;
  position: relative;
  margin-top: 90px;
  width: 100%;
`;


const SearchCloseIcon = styled.i`
position: absolute;
  right: 10px;
  bottom:  15px;
  cursor: pointer;
`;

const LoupeSearchIcon = styled.i`
// display: block;
  position: absolute;
  left: 10px;
  bottom:  15px;
  cursor: pointer;
`;

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
        <SearchInputDiv >
            <input className="text-field__input"
                type="text" placeholder={placeholder}
                value={searchValue} onChange={updateSearchValue} />
            <SearchCloseIcon>
                <CancelIcon onClick={clearInput} />
            </SearchCloseIcon>
            <LoupeSearchIcon>
                <SearchIcon />
            </LoupeSearchIcon>
        </SearchInputDiv>
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
