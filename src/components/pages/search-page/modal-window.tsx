import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { HOME_ROUTE, SEARCH_ROUTE } from "../../../components/routing/consts";
import { toJS } from "mobx";
import { Global } from "@emotion/react";
import { styled as styledMUI } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Context } from "../../../";
import { RecipeResponse } from "./search-page";
import FavoriteRecipeCard from "../../../components/recipe-cards/favorite-recipe-card";
import { RectBut } from "../../../components/buttons/rectangle-button";
import { auth } from "../../../firebase";
import { pushNewRecipe, removeFavoriteRecipe, updateRecipes, writeNewRecipe } from "../../../api/favorite-recipes";

const ModalWindowDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;

  background-color: #91c788;
`;

const RecipeValues = styled.div`
  display: flex;
  flex-direction: row;
  /* text-align: center; */
  /* align-items: ; */
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
  background-color: #fff8ee;
  h1 {
    font-size: 24px;
    color: #ff8473;
  }
  h2 {
    color: #ff8473;
    font-size: 24px;
  }
`;
const ValuesRecipes = styled.div`
  text-align: center;
  width: auto;
`;

const ImageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50px;
  }
`;
const HeaderH3 = styled.h3`
    text-align: center;
`;

const CloseIconI = styled.i`
  margin-top: 10px;
  margin-left: 10px;
`;

const ButtonAndDescDiv = styled.div`
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
`;

interface ModalWindowProps {
    item?: any;
}

const drawerBleeding = 56;

interface Props {
    /**
                     * Injected by the documentation to work in an iframe.
                     * You won't need it on your project. !!!!!??????!?!?!?!????!?!?
                       СПРОСИТЬ */
    window?: () => Window;
}

const Root = styledMUI("div")(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
    // borderTopLeftRadius: "10vh",
    // border-top-right-radius: 20px,
}));

const Puller = styledMUI(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
    borderRadius: 3,
    position: "absolute",
    top: 8,
    left: "calc(50% - 15px)",
}));

const currentRecipe = styled.div`
  background-color: beige;
`;

const ModalWindow = (props: Props) => {
    const { window } = props;
    const [open, setOpen] = React.useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { push } = useHistory();
    const history = useHistory();
    const { uid } = auth.currentUser;
    // const { bzhu, calories, header, img, timeToCook, desc, rkey, favKey, category, } = categoriesStore._modalObject.recipe;
    const { bzhu, calories, header, img, timeToCook, desc, rkey, favKey, category } = categoriesStore.modalObject.recipe;
    const { id, recipeId } = categoriesStore._modalObject;
    // const iBzhu = toJS(bzhu);
    const { proteins, carbs, fat } = bzhu;
    let res;
    // ЛОГИКА ФУНКЦИИ ОБНОВЛЕНИЯ ХРАНИЛИЩА
    //
    useEffect(() => {
        console.log(isFavorite, "isFavor");
    }, [isFavorite]);

    useEffect(() => {
        res = userStore.dbResponse.findIndex((rec) => {
            // console.log(rec, "rID");
            // console.log(rec.recipe.header, "rID", header, "pID");
            return rec.recipe.header === header;
        });
        res > -1 ? setIsFavorite(true) : setIsFavorite(false);
        console.log(res);
    }, [res, isFavorite]);
    const mobxUpdRec = (recId, recipe, header) => {

        if (isFavorite) {
            userStore.deleteRecipe(header);
            console.log("DELLLL");
            setIsFavorite(false);
            removeFavoriteRecipe(uid, id, null);
        } else {
            userStore.addRecipe(recId, recipe);
            console.log("ADDD");
            setIsFavorite(true);
            pushNewRecipe(uid, { category: category, recipeId: recipeId });
        }
        // isFavorite ? userStore.deleteRecipe(header) : userStore.addRecipe(recId, recipe);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
        // !open ?
    };
    useEffect(() => {
        history.location.pathname === `/modal-window` ? setOpen(true) : null;
        // console.log(history.location.pathname + "MODALLLLWIND");
    }, [history.location.pathname]);
    // This is used only for the example
    // const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        // console.log(categoriesStore.modalObject, "currModObj");
        proteins === undefined ? push(HOME_ROUTE) : null;
        // console.log(recipeId, "recipeId");
    }, []);

    // useEffect(() => {
    //     console.log(id + "id", rkey + "rkey", recipeId + "recipId");
    //     // !categoriesStore._modalObject ? push(HOME_ROUTE) : null;
    // }, []);

    const valuesROOT = [
        {
            categ: "Proteins",
            recVal: proteins,
        },
        {
            categ: "Calories",
            recVal: calories,
        },
        {
            categ: "Fat",
            recVal: fat,
        },
        {
            categ: "Carbs",
            recVal: carbs,
        },
    ];

    // const addObj;
    return (
        <Root>
            {/* <div> */}
            {/* <CssBaseline /> */}
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(90% - ${drawerBleeding}px)`,
                        overflow: "visible",
                        borderTopLeftRadius: "30px",
                        borderTopRightRadius: "30px",
                    },
                }}
            />

            <Box sx={{ textAlign: "center", pt: 16 }}>
                <Button onClick={toggleDrawer(true)}>Open</Button>
            </Box>
            <SwipeableDrawer
                // container={container}
                anchor="bottom"
                open={open}
                onClose={() => {
                    toggleDrawer(false);
                    // push(SEARCH_ROUTE);
                }}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Puller />
                <CloseIconI onClick={() => history.goBack()}>
                    {/* <CloseIconI onClick={() => push("/search?category=salads")}> */}
                    <CloseIcon fontSize="large" />
                </CloseIconI>
                <ImageDiv>
                    <img src={img} />
                </ImageDiv>
                <HeaderH3>{header}</HeaderH3>
                <RecipeValues>
                    {valuesROOT.map(({ categ, recVal }) => {
                        return (
                            <ValuesRecipes>
                                <h1>{categ}</h1>
                                <h2>{recVal}</h2>
                            </ValuesRecipes>
                        );
                    })}
                </RecipeValues>
                <ButtonAndDescDiv>
                    <h3>Описание</h3>
                    <p>{desc}</p>
                    <RectBut size="md" onClick={() => mobxUpdRec(rkey, categoriesStore.modalObject, header)}>
                        {!isFavorite ? "Добавить в избранное" : "Удалить из избранного"}
                    </RectBut>
                </ButtonAndDescDiv>
            </SwipeableDrawer>
            {/* </div> */}
        </Root>
    );
};

export default ModalWindow;
