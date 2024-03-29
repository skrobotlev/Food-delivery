import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CalendarModal, { CloseIconI } from "./calendar-modal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import DailyRecipesBreakfast from "../daily-recipes-containers/daily-recipes-breakfast";
import { auth } from "@/firebase";
import DailyRecipesDinner from "../daily-recipes-containers/daily-recipes-dinner";
import DailyRecipesLunch from "../daily-recipes-containers/daily-recipes-lunch";

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
  font-family: "Balsamiq Sans";
button {
    font-family: "Balsamiq Sans";

}
  h1 {
    font-family: "Balsamiq Sans";

  }
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
