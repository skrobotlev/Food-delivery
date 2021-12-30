import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./global.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BurgerSVG } from "./icons/burger";
import FruitSVG from "./icons/strawb";
import { SquareBut } from "./components/buttons/square-button";
import RectangleButton, { RectBut } from "./components/buttons/rectangle-button";
import ReactSlickDemo from "./components/slider/slider";
import RecipeCard from "./components/recipe-cards/recipe-card";
import Tabs from "./components/tabulation/tabulation";
import SearchInput from "./components/searching/search-input";
import FavorRecCardLike from "./components/images/fav-re-cd-like";
import FavorRecCardSalad from "./components/images/fav-re-cd-salad";
import FavoriteRecipeCard from "./components/recipe-cards/favorite-recipe-card";
import TestSearchInut from "./components/searching/test-search";


ReactDOM.render(
	<StrictMode>

		<SearchInput placeholder="Search recipes, articles, people..."></SearchInput>

		{/* <TestSearchInut placeholder="HOPPP" /> */}

		<Tabs />
		<FavoriteRecipeCard title="Chopped Spring Ramen" calories="250 kcal"
			likeIcon={<FavorRecCardLike />} icon={<FavorRecCardSalad />}
			category="Scallions & tomatoes" />
		<RecipeCard />
		<ReactSlickDemo />
		<SquareBut size="lg" backgroundColor="#FFF2F0">
			<FruitSVG />
			FRUITS
		</SquareBut>
		<SquareBut size="md" backgroundColor="#FFF8EE">
			<BurgerSVG />
		</SquareBut>
		<SquareBut size="sm" backgroundColor="#FFF8EE">
			View all
		</SquareBut>
		<RectBut size="lg">
			Track Your Weekly Progress
			<RectBut size="sm">
				Read now
				<ArrowRightIcon />
			</RectBut>
		</RectBut>
		<RectBut size="md">Get started</RectBut>
		<RectBut size="sm">Read now</RectBut>
	</StrictMode>,
	document.getElementById("app")
);
