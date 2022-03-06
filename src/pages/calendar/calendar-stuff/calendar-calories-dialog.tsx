import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CalendarModal, { CloseIconI } from "./calendar-modal";
import { useState } from "react";
import styled from "styled-components";
import ModalMenu from "./modal-menu";
import CaloriesResult from "../calendar-categories-result";
import { useStore } from "@/hooks/useStore";
import FavorRecCardLike from "@/components/images/heart-like";
import { RecipeResponse } from "@/pages/search-page/search-page";
import CalendarRecipeCard from "./calendar-recipe-card";

interface FullScDialogProps {
    openWindow?: any;
    closeWindow?: any;
}

const MealsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const MealCardsDiv = styled.div`
border-color:  black;
border: 1px;
width: 20%;
height: 60vh;
`;

const AddRecipe = styled.button`

`;

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

const CalendarColoriesDialog: React.FC<FullScDialogProps> = ({ openWindow, closeWindow }) => {
    const [open, setOpen] = React.useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const { userStore, categoriesStore, caloriesStore } = useStore();

    // const showFavorites = caloriesStore.breakfast.map((resp, idx) => {
    //     return (
    //         <RecipeResponse>
    //             <CalendarRecipeCard
    //                 timeToCook={resp.recipe.timeToCook}
    //                 key={idx}
    //                 title={resp.recipe.header}
    //                 calories={resp.recipe.calories + " Kcal"}
    //                 likeIcon={<FavorRecCardLike />}
    //                 recipeId={resp.recipeId}
    //                 image={resp.recipe.img}
    //                 bzhu={resp.recipe.bzhu}
    //             />
    //         </RecipeResponse>
    //     );
    // });

    return (
        <div>
            <Button variant="outlined" onClick={() => dialogOpen(setOpen)}>
                Open full-screen dialog
            </Button>
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
                        <ModalMenu closeSearch={setOpenSearch} meal="breakfast" />
                        {openSearch && <CaloriesResult closeSearch={setOpenSearch} />}
                        {caloriesStore.breakfast.map((recip, idx) => {
                            return (
                                <RecipeResponse>
                                    <CalendarRecipeCard
                                        timeToCook={recip.timeToCook}
                                        key={idx}
                                        title={recip.header}
                                        calories={recip.calories + " Kcal"}
                                        likeIcon={<FavorRecCardLike />}
                                        image={recip.img}
                                        rkey={recip.rkey}
                                        category={recip.category}
                                        recip={recip}
                                        recipeId={recip.rkey}
                                        bzhu={recip.bzhu}
                                    // closeSearch={closeSearch}
                                    />
                                </RecipeResponse>
                            );
                        })}

                    </MealCardsDiv>
                    <MealCardsDiv>
                        <h1>Обед</h1>
                    </MealCardsDiv>
                    <MealCardsDiv>
                        <h1>Ужин</h1>
                    </MealCardsDiv>
                </MealsContainer>

                {/* СДЕЛАТЬ В ФУЛЛСК ДИАЛОГЕ ТРИ СТОЛБИКА ЗАВТРАК ОБЕД УЖИН. В КАЖДОМ СТОЛБЕ КНОПКА ДОБАВИТЬ, ХРАНИЛИЩЕ ПО ПРИМЕРУ 
FAVORITE ITEMS STORAGE. ПРИ КАЖДОМ ДОБАВЛЕНИИ ПРОСТО КНОПКА СЪЕЗЖАЕТ ВНИЗ И ОТОБРАЖАЕТ РЕЦЕПТ. СНИЗУ ПОДВОДИТСЯ ИТОГ ПОЛНЫЙ БЖУ 
СЛОЖЕННЫЕ С РЕЦЕПТОВ В ХРАНИЛИЩЕ */}
            </Dialog>
        </div>
    );
};
export default CalendarColoriesDialog;
