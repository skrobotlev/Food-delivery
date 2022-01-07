import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "./global.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BurgerSVG } from "./components/buttons/icons/burger";
import FruitSVG from "./components/buttons/icons/strawb";
import SquareButton, { SquareBut } from "./components/buttons/square-button";
import RectangleButton, { RectBut } from "./components/buttons/rectangle-button";
import ReactSlickDemo from "./components/slider/slider";
import RecipeCard from "./components/recipe-cards/recipe-card";
import { Search } from "./components/searching/search-input";
import FavorRecCardLike from "./components/images/fav-re-cd-like";
import FavorRecCardSalad from "./components/images/fav-re-cd-salad";
import FavoriteRecipeCard from "./components/recipe-cards/favorite-recipe-card";
import NoResultsCard from "./components/searching/no-results-card";
import NoResCardImage from "./components/images/no-res-card";
import Tabulation from "./components/tabulation/tabulation";
import Loader from "./components/pages/loader";
import GetStartedPage from "./components/pages/get-started";
import Layout from "./components/pages/layout";
import HomePage from "./components/pages/home-page/home-page";
import SearchPage from "./components/pages/search-page/search-page";
import FavoriteItemsPage from "./components/pages/favorite-items-page/favorite-items-page";
import ProfilePage from "./components/pages/profile-page/profile-page";

ReactDOM.render(
	<StrictMode>
		<ProfilePage />
		<FavoriteItemsPage />
		<SearchPage />
		<HomePage />
		<GetStartedPage />
		<Loader />
		<SquareButton size="md" backgroundColor="#FFF8EE" icon={<BurgerSVG />} />

		<RectangleButton size="sm" icon={<ArrowRightIcon />} title="Read now" />


		<Search clearAll placeholder="Search recipes, articles, people..."></Search>
		<Tabulation />
		<FavoriteRecipeCard title="Chopped Spring Ramen" calories="250 kcal"
			likeIcon={<FavorRecCardLike />} icon={<FavorRecCardSalad />}
			category="Scallions & tomatoes" />
		<RecipeCard title="The pumpkin secrets" desc="Enjoy pumpkin dishes" />
		<ReactSlickDemo />
		<SquareButton size="lg" backgroundColor="#FFF2F0" title="FRUITS" icon={<FruitSVG />} />
		<SquareButton size="md" backgroundColor="#FFF8EE" icon={<BurgerSVG />} />
		<SquareButton size="sm" backgroundColor="#FFF8EE" title="View all" />
		<RectangleButton size="lg" title="Track Your Weekly Progress">
			<RectBut size="sm">
				Read now
				<ArrowRightIcon />
			</RectBut>
		</RectangleButton>
		<RectangleButton size="md" title="Get started" />
		<RectangleButton size="sm" title="Read now" />
	</StrictMode >,
	document.getElementById("app")
);
