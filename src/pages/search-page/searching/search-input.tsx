import React, { DetailedHTMLProps, InputHTMLAttributes, useState, ChangeEvent, useEffect, useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import { Context } from "@/store";

interface SearchInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    clearAll?: boolean;
    children?: any;
    value?: any;
}

const SearchInputDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
`;


const SearchCloseIcon = styled.i`
position: relative;
font-size: large;
left: 90%;
  bottom:  38%;
  cursor: pointer;
`;

const LoupeSearchIcon = styled.i`
  position: relative;
  left: 0%;
  bottom:  38%;
  cursor: pointer;
`;

export const SearchInput: React.FC<SearchInputProps> = (value) => {
    const [searchValue, setSearchValue] = useState("");
    const { categoriesStore } = useContext(Context);


    const clearInput = () => {
        setSearchValue("");
        categoriesStore.filter = "";
    };

    useEffect(() => {
        if (searchValue) console.log("a");
    }, [searchValue]);


    const handleChange = (e) => {
        categoriesStore.filter = e.target.value;
    };
    const updateSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const searchWord = e.currentTarget.value;
        setSearchValue(searchWord);
    };
    return (
        <SearchInputDiv >
            <input className="text-field__input"
                type="text" placeholder="Введите название"
                value={categoriesStore.filter} onChange={handleChange} />
            <SearchCloseIcon>
                <CancelIcon onClick={clearInput} />
            </SearchCloseIcon>
            <LoupeSearchIcon>
                <SearchIcon />
            </LoupeSearchIcon>
        </SearchInputDiv>
    );
};