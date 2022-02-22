import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { ButtonAndDescDiv, CloseIconI, HeaderH3, ImageDiv, RecipeValues, ValuesRecipes } from "./modal-window";
import { useHistory } from "react-router-dom";
import { RectBut } from "../../../components/buttons/rectangle-button";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../";
import { pushNewFavoriteRecipe, removeFavoriteRecipe } from "../../../api/favorite-recipes";
import { auth } from "../../../firebase";
import styled from "styled-components";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide timeout={500} direction="up" ref={ref} {...props} />;
});

const ModalDiv = styled.div`
    height: 1vh;
`;

export default function FullScreenDialog() {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();
    const [isFavorite, setIsFavorite] = useState(false);
    const { userStore } = useContext(Context);
    const { categoriesStore } = useContext(Context);

    const { uid } = auth.currentUser;
    // const { bzhu, calories, header, img, timeToCook, desc, rkey, favKey, category, } = categoriesStore._modalObject.recipe;
    const { bzhu, calories, header, img, timeToCook, desc, rkey, favKey, category } = categoriesStore.modalObject.recipe;
    const { id, recipeId } = categoriesStore._modalObject;
    // const iBzhu = toJS(bzhu);
    const { proteins, carbs, fat } = bzhu;
    let res;

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
            id ? removeFavoriteRecipe(uid, id, null) : null;
        } else {
            userStore.addRecipe(recId, recipe);
            console.log("ADDD");
            setIsFavorite(true);
            pushNewFavoriteRecipe(uid, { category: category, recipeId: recipeId });
        }
        // isFavorite ? userStore.deleteRecipe(header) : userStore.addRecipe(recId, recipe);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    return (
        <ModalDiv>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open full-screen dialog
            </Button>
            <Dialog maxWidth={"lg"} open={open} onClose={handleClose} TransitionComponent={Transition}>
                <CloseIconI onClick={handleClose}>
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
            </Dialog>
        </ModalDiv>
        //     <div>
        //     <Button variant="outlined" onClick={handleClickOpen}>
        //         Open full-screen dialog
        //     </Button>
        //     <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        //         <AppBar sx={{ position: "relative" }}>
        //             <Toolbar>
        //                 <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
        //                     <CloseIcon />
        //                 </IconButton>
        //                 <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
        //                     Sound
        //                 </Typography>
        //                 <Button autoFocus color="inherit" onClick={handleClose}>
        //                     save
        //                 </Button>
        //             </Toolbar>
        //         </AppBar>
        //         <List>
        //             <ListItem button>
        //                 <ListItemText primary="Phone ringtone" secondary="Titania" />
        //             </ListItem>
        //             <Divider />
        //             <ListItem button>
        //                 <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        //             </ListItem>
        //         </List>
        //     </Dialog>
        // </div>
    );
}
