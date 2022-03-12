import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CalendarModal, { CloseIconI } from "./calendar-modal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ModalMenu from "./modal-menu";
import CaloriesResult from "../calories-columns/calories-searching-column-breakfast.tsx";
import { useStore } from "@/hooks/useStore";
import FavorRecCardLike from "@/components/images/heart-like";
import { RecipeResponse } from "@/pages/search-page/search-page";
import CalendarRecipeCard from "./calendar-recipe-card";
import { observer } from "mobx-react-lite";
import DailyRecipesBreakfast from "./daily-recipes-breakfast";
import DailyRecipesDinner from "./daily-recipes-dinner";
import DailyRecipesLunch from "./daily-recipes-lunch";
import { getFullDayRecipes, requestShowerRecipes } from "@/api/calories-calendar";
import { auth } from "@/firebase";

interface FullScDialogProps {
    openWindow?: any;
    closeWindow?: any;
}

const CalcSumCaloriesDiv = styled.div``;

const MealsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const MealCardsDiv = styled.div`
  border-color: black;
  border: 1px;
  width: 20%;
  height: 60vh;
`;

const AddRecipe = styled.button``;

export const dialogOpen = (setOpen) => {
    setOpen(true);
};

export const dialogClose = (setOpen) => {
    setOpen(false);
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarColoriesDialog: React.FC<FullScDialogProps> = observer(({ openWindow, closeWindow }) => {
    const [open, setOpen] = React.useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();
    const { uid } = auth.currentUser;

    let calcCal = 0;

    useEffect(() => {
        console.log(calcCal, "calccal");
        // requestShowerRecipes(uid, caloriesStore.actualDay, userStore)
    });
    return (
        <div>
            <Dialog fullScreen open={openWindow} onClose={dialogClose} TransitionComponent={Transition}>
                <CloseIconI
                    onClick={() => {
                        closeWindow(false);
                    }}
                >
                    <CloseIcon fontSize="large" />
                </CloseIconI>
                <MealsContainer>
                    <MealCardsDiv>
                        <h1>Завтрак</h1>
                        <DailyRecipesBreakfast />
                    </MealCardsDiv>
                    <MealCardsDiv>
                        <h1>Обед</h1>
                        <DailyRecipesLunch />
                    </MealCardsDiv>
                    <MealCardsDiv>
                        <h1>Ужин</h1>
                        <DailyRecipesDinner />
                    </MealCardsDiv>
                </MealsContainer>
            </Dialog>
        </div>
    );
});
export default CalendarColoriesDialog;
