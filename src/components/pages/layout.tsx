import styled from "styled-components";
import React from "react";

const HomeIcon = () => {
    return (
        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.2096 26.6952V22.6062C10.2096 21.5662 11.0575 20.7211 12.108 20.7141H15.9561C17.0116 20.7141 17.8673 21.5612 17.8673 22.6062V22.6062V26.7079C17.8671 27.5909 18.579 28.3126 19.4707 28.3333H22.0361C24.5935 28.3333 26.6666 26.2809 26.6666 23.7491V23.7491V12.1171C26.653 11.1211 26.1806 10.1858 25.3839 9.57737L16.6103 2.58039C15.0732 1.36208 12.8883 1.36208 11.3512 2.58039L2.61601 9.59007C1.81632 10.196 1.34316 11.1329 1.33331 12.1298V23.7491C1.33331 26.2809 3.40648 28.3333 5.96386 28.3333H8.52926C9.44312 28.3333 10.1839 27.5999 10.1839 26.6952V26.6952"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

const SearchIcon = () => {
    return (
        <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="13.6888" cy="13.6888" r="11.9847" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M22.0244 22.6468L26.7231 27.3333" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

const LikeIcon = () => {
    return (
        <svg width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.82919 12.4644C0.398528 7.99776 2.07053 2.89243 6.75986 1.38176C9.22653 0.585762 11.9492 1.0551 13.9999 2.59776C15.9399 1.09776 18.7625 0.591096 21.2265 1.38176C25.9159 2.89243 27.5985 7.99776 26.1692 12.4644C23.9425 19.5444 13.9999 24.9978 13.9999 24.9978C13.9999 24.9978 4.13053 19.6271 1.82919 12.4644Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.3334 5.93332C20.76 6.39465 21.768 7.66798 21.8894 9.16265" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );
};

const ProfileIcon = () => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.9797 20.4616C10.8229 20.4616 6.41905 21.2413 6.41905 24.3638C6.41905 27.4863 10.7949 28.294 15.9797 28.294C21.1365 28.294 25.5391 27.513 25.5391 24.3917C25.5391 21.2705 21.1644 20.4616 15.9797 20.4616Z"
                stroke="#999999"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.9797 16.0079C19.3638 16.0079 22.1067 13.2637 22.1067 9.87961C22.1067 6.49548 19.3638 3.75262 15.9797 3.75262C12.5956 3.75262 9.85143 6.49548 9.85143 9.87961C9.84 13.2523 12.5651 15.9964 15.9365 16.0079H15.9797Z"
                stroke="#999999"
                stroke-width="1.42857"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 335px;
  border-radius: 1px ;
  padding-bottom: 32px;
  /* margin: 45px; */
  /* cursor: pointer; */
`;

const Layout = () => {
    return (
        <NavBar>
            <HomeIcon />
            <SearchIcon />
            <LikeIcon />
            <ProfileIcon />
        </NavBar>
    );
};

export default Layout;
