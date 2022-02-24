import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { HOME_ROUTE, SEARCH_ROUTE } from "../../routing/consts";
import { toJS } from "mobx";
import { Global } from "@emotion/react";
import { styled as styledMUI } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Context } from "../../../";
import { RecipeResponse } from "./search-page";
import FavoriteRecipeCard from "../../../components/recipe-cards/favorite-recipe-card";
import { RectBut } from "../../../components/buttons/rectangle-button";
import { auth } from "../../../firebase";
import {
    getFavoriteRecipes,
    pushNewFavoriteRecipe,
    removeFavoriteRecipe,
    searchingOnDb,
    updateRecipes,
    writeNewRecipe,
} from "../../../api/favorite-recipes";
import { observer } from "mobx-react-lite";

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
  /* text-align: center; */
  /* align-items: ; */
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
    // window?: () => Window;
    openMod?: boolean;
    closeMod?: any;
}

const Root = styledMUI("div")(({ theme }) => ({
    height: "60%",
    backgroundColor: theme.palette.mode === "light" ? grey[100] : theme.palette.background.default,
    // borderTopLeftRadius: "10vh",
    // border-top-right-radius: 20px,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
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

const ModalWindow = observer((props: Props) => {
    const { openMod, closeMod } = props;
    const [open, setOpen] = React.useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { push } = useHistory();
    const history = useHistory();
    const { uid } = auth.currentUser;
    const { bzhu, calories, header, img, timeToCook, desc, rkey, favKey } = categoriesStore.modalObject.recipe;
    const { id, recipeId, categories } = categoriesStore._modalObject;
    // const iBzhu = toJS(bzhu);
    const { proteins, carbs, fat } = bzhu;
    let res;
    let currentId;

    const updateModalObj = (recipeId) => {
        let currentKey = userStore.favoriteRecipesDb.findIndex((rec) => {
            return rec.recipeId === recipeId;
        });
        currentKey > -1 ? categoriesStore.setModalObject(userStore.favoriteRecipesDb[currentKey]) : null;
        console.log(userStore.favoriteRecipesDb[currentKey], "rkey==recipeId157");
        console.log("UPDATEmodOBJ");
    };

    useEffect(() => {
        currentId = id;
        console.log(currentId, "currId");
    }, [id]);

    const requestUpdateStorage = () => {
        getFavoriteRecipes(uid).then((res) => {
            const favoriteRecipeIds = Object.entries(res).reduce((array, item: any) => {
                const recipe = {
                    id: item[0],
                    recipeId: item[1].recipeId,
                    categories: item[1].category,
                };
                array.push(recipe);
                return array;
            }, []);
            console.log(favoriteRecipeIds, "favRecIDS");
            searchingOnDb(favoriteRecipeIds)
                .then((res) => {
                    let elmg;
                    console.log(res, "res");
                    userStore.setfavoriteRecipesDb(res);

                    console.log(userStore.favoriteRecipesDb);
                    console.log("REQUESTupdSTORAGE");
                    // return res;
                })
                .then(() => updateModalObj(recipeId));
        });
    };

    useEffect(() => {
        console.log(isFavorite, "isFavor");
    }, [isFavorite]);

    useEffect(() => {
        res = userStore.favoriteRecipesDb.findIndex((rec) => {
            return rec.recipe.header === header;
        });
        res > -1 ? setIsFavorite(true) : setIsFavorite(false);
        console.log(res, "resIsFavor");
    }, [res, isFavorite]);

    const updRecipStor = (recId, recipe, header) => {
        if (isFavorite) {
            userStore.deleteRecipe(header);
            console.log("DELLLL");
            setIsFavorite(false);
            removeFavoriteRecipe(uid, id, null);
            console.log(userStore.favoriteRecipesDb, "currModObj");
        } else if (!isFavorite) {
            userStore.addRecipe(recId, recipe);
            console.log("ADDD");
            setIsFavorite(true);
            pushNewFavoriteRecipe(uid, { category: categories, recipeId: recipeId });
            requestUpdateStorage();
        }
    };

    // const toggleDrawer = (newOpen: boolean) => () => {
    //     setOpen(newOpen);
    //     // setTimeout(() => alert('aye'), 400);

    //     // !open ?
    // };
    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
        setTimeout(() => closeMod(newOpen), 350);
    };
    // useEffect(() => {
    //     // history.location.pathname === `/modal-window` ? setOpen(true) : null;
    //     categoriesStore.openModal ? setOpen(true) : setOpen(false);
    //     // console.log(history.location.pathname + "MODALLLLWIND");
    // }, [categoriesStore.openModal]);
    useEffect(() => {
        // history.location.pathname === `/modal-window` ? setOpen(true) : null;
        openMod ? setOpen(true) : setOpen(false);
        console.log(openMod + "MODALLLLWIND");
    }, [openMod]);

    // This is used only for the example
    // const container = window !== undefined ? () => window().document.body : undefined;

    const valuesROOT = [
        {
            categ: "Белки",
            recVal: proteins,
        },
        {
            categ: "Калории",
            recVal: calories,
        },
        {
            categ: "Жиры",
            recVal: fat,
        },
        {
            categ: "Углеводы",
            recVal: carbs,
        },
    ];

    return (
        <Root>
            <Global
                styles={{
                    ".MuiDrawer-root > .MuiPaper-root": {
                        height: `calc(92% - ${drawerBleeding}px)`,
                        overflow: "visible",
                        borderTopLeftRadius: "30px",
                        borderTopRightRadius: "30px",
                    },
                }}
            />
            <SwipeableDrawer
                // container={container}
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
                    }}>
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
                    <RectBut size="md" onClick={() => updRecipStor(recipeId, categoriesStore.modalObject, header)}>
                        {!isFavorite ? "Добавить в избранное" : "Удалить из избранного"}
                    </RectBut>
                </ButtonAndDescDiv>
            </SwipeableDrawer>
            {/* </div> */}
        </Root>
    );
});

export default ModalWindow;
