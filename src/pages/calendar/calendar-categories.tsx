import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import VegetableSvg from "@/components/buttons/icons/vegetable";
import SquareButton from "@/components/buttons/square-button";
import FavorRecCardChicken from "@/components/images/chicken";
import { SoupSvg } from "@/components/images/soup";
import CakeSvg from "@/components/images/cake";
import CanningSvg from "@/components/images/canning";
import BeveragesSvg from "@/components/images/beverages";
import { SaucesSvg } from "@/components/images/sauces";
import { useStore } from "@/hooks/useStore";

const FavoriteCategoriesDiv = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  margin-top: 15px;
  @media screen and (min-width: 450px) {
    width: 75%;
    margin-top: 15px;
  }
`;

const CurrentMealDiv = styled.div`
display: flex;
flex-direction: row;

`;

const CategoriesDiv = styled.div``;

const ButtonDiv = styled.div`
  display: inline-block;
  &:first-of-type {
    margin-left: 0px;
  }
  margin-left: 15px;
`;

const CalendarCategories = () => {
    const { push } = useHistory();
    const { caloriesStore } = useStore();
    const [currentMeal, setCurrentMeal] = useState("");

    const linkToCategory = (category) => {
        return (caloriesStore.nameCaloriesCategory = category);
    };

    return (
        <FavoriteCategoriesDiv>
            <CurrentMealDiv>
                <h1 onClick={() => setCurrentMeal("breakfast")}>Breakfast</h1>
                <h1 onClick={() => setCurrentMeal("lunch")}>Lunch</h1>
                <h1 onClick={() => setCurrentMeal("dinner")}>Dinner</h1>
            </CurrentMealDiv>
            <CategoriesDiv>
                {currentMeal !== "" ? (
                    <>
                        <ButtonDiv>
                            <SquareButton size="lg" backgroundColor="vegan" title="Салаты" onClick={() => linkToCategory("salads")} icon={<VegetableSvg />} />
                        </ButtonDiv>
                        <ButtonDiv>
                            <SquareButton
                                size="lg"
                                backgroundColor="manyfats"
                                title="Первые блюда"
                                onClick={() => linkToCategory("first-dishes")}
                                icon={<SoupSvg />}
                            />
                        </ButtonDiv>
                        <ButtonDiv>
                            <SquareButton
                                size="lg"
                                backgroundColor="manyfats"
                                title="Вторые блюда"
                                onClick={() => linkToCategory("second-dishes")}
                                icon={<FavorRecCardChicken />}
                            />
                        </ButtonDiv>
                        <ButtonDiv>
                            <SquareButton size="lg" backgroundColor="beverages" title="Напитки" onClick={() => linkToCategory("beverages")} icon={<BeveragesSvg />} />
                        </ButtonDiv>
                        <ButtonDiv>
                            <SquareButton
                                size="lg"
                                backgroundColor="manyfats"
                                title="Соленья, консервы"
                                onClick={() => linkToCategory("canning")}
                                icon={<CanningSvg />}
                            />
                        </ButtonDiv>
                        <ButtonDiv>
                            <SquareButton size="lg" backgroundColor="deserts" title="Десерты" onClick={() => linkToCategory("deserts")} icon={<CakeSvg />} />
                        </ButtonDiv>
                        <ButtonDiv>
                            <SquareButton size="lg" backgroundColor="sauces" title="Соусы" onClick={() => linkToCategory("sauces")} icon={<SaucesSvg />} />
                        </ButtonDiv>
                    </>
                ) : null}
            </CategoriesDiv>
        </FavoriteCategoriesDiv>
    );
};

export default CalendarCategories;
