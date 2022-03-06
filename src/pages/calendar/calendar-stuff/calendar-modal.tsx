import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import { Global } from "@emotion/react";
import { styled as styledMUI } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Context } from "@/store";
import { RectBut } from "@/components/buttons/rectangle-button";
import { auth } from "@/firebase";
import { getFavoriteRecipes, pushNewFavoriteRecipe, removeFavoriteRecipe, searchingOnDb, updateModalRecipe } from "@/api/favorite-recipes";
import { observer } from "mobx-react-lite";
import { useStore } from "@/hooks/useStore";
import CalendarCategories from "../calendar-categories";
import CaloriesResult from "../calendar-categories-result";

export const ModalWindowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;
  background-color: #91c788;
`;

export const RecipeValues = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  background-color: #fff8ee;
  h1 {
    font-size: 20px;
    color: #ff8473;
  }
  h2 {
    color: #ff8473;
    font-size: 20px;
  }
  @media screen and (min-width: 450px) {
      h1,h2 {
          font-size: 30px;
      }
  }
`;
export const ValuesRecipes = styled.div`
  text-align: center;
  width: auto;
`;

export const ImageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50px;
  }
`;
export const HeaderH3 = styled.h3`
  text-align: center;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  @media screen and (min-width: 450px) {
      
          font-size: 30px;
      
  }
`;

export const CloseIconI = styled.i`
  margin-top: 10px;
  margin-left: 10px;
`;

export const ButtonAndDescDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  p {
    color: #a9a9a9;
    text-align: center;
    width: 90%;
  }
  @media screen and (min-width: 450px) {
      h3 {
          font-size: 30px;
      }
      p{
          font-size: 25px;
      }
      button {
          margin-top: 25px;
      }
  }
`;

interface ModalWindowProps {
    item?: any;
}

const drawerBleeding = 56;

interface Props {
    openMod?: boolean;
    closeMod?: any;
}

const Root = styledMUI("div")(({ theme }) => ({
    height: "60%",
    backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
}));

const Puller = styledMUI(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    // backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

const CalendarModal = observer((props: Props) => {
    const { openMod, closeMod } = props;
    const [open, setOpen] = React.useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const { uid } = auth.currentUser;

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
        setTimeout(() => closeMod(newOpen), 350);
    };

    useEffect(() => {
        openMod ? setOpen(true) : setOpen(false);
        console.log(openMod + "MODALLLLWIND");
    }, [openMod]);



    return (
        <Root>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(92% - ${drawerBleeding}px)`,
                        overflow: "visible",
                        borderTopLeftRadius: "30px",
                        borderTopRightRadius: "30px",
                        "@media (min-width: 450px)": {
                            width: "40%",
                            position: "fixed",
                            left: "30%",
                        },
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={() => {
                    toggleDrawer(false);
                }}
                onOpen={() => {
                    toggleDrawer(true);
                }}
                closeAfterTransition={true}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                transitionDuration={{
                    enter: 400,
                    exit: 400,
                }}
            >
                <Puller />
                <CloseIconI
                    onClick={() => {
                        toggleDrawer(false);
                    }}
                >
                    <CloseIcon fontSize="large" />
                </CloseIconI>
                <CalendarCategories />
                <CaloriesResult />

            </SwipeableDrawer>
        </Root>
    );
});

export default CalendarModal;
