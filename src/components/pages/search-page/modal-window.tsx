import React, { useContext, useEffect } from "react";
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
import { pushNewRecipe, writeNewRecipe } from "../../../api/favorite-recipes";
// import { writeFavoriteData } from "../../../api/auth";

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

const DescDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
  p {
    color: #a9a9a9;
  }
`;

const CloseIconI = styled.i`
  margin-top: 10px;
  margin-left: 10px;
`;

const RemAddButton = styled.div``;

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

// const StyledBox = styledMUI(Box)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
// }));

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
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);
    const { push } = useHistory();
    const history = useHistory();
    const { search } = useLocation();
    const { path } = useRouteMatch();

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

    // useEffect(() => {
    //     if (categoriesStore._modalObject == undefined) push(HOME_ROUTE);
    //     console.log(categoriesStore._modalObject);
    //     // !categoriesStore._modalObject ? push(HOME_ROUTE) : null;
    // }, []);

    const { bzhu, calories, header, img, timeToCook, desc, rkey } = categoriesStore._modalObject;
    const iBzhu = toJS(bzhu);
    const { proteins, carbs, fat } = iBzhu;
    // const recipVals = [proteins, calories, fat, carbs];

    // const recipCategs = ["proteins", "calories", "fat", "carbs"];
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
    const { uid } = auth.currentUser;
    // console.log(uid);
    // console.log(rkey);
    return (
        // <Root>
        <div>
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
                <h3>{header}</h3>
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
                    {/* <DescDiv> */}
                    <h3>Описание</h3>
                    <p>{desc}</p>
                    {/* </DescDiv> */}
                    {/* <RemAddButton> */}
                    <RectBut size="md" onClick={() => pushNewRecipe(uid, rkey)}>
                        Добавить в избранное
                    </RectBut>
                    {/* </RemAddButton>  */}
                </ButtonAndDescDiv>
            </SwipeableDrawer>
        </div>
        // </Root>
    );
};

export default ModalWindow;
