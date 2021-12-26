import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import { SliderData } from "./components/slider/test-slider/SliderData";
import "./global.scss";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BurgerSVG } from "./icons/burger";
import FruitSVG from "./icons/strawb";
import { SquareBut } from "./components/buttons/square-button";
import RectangleButton, { RectBut } from "./components/buttons/rectangle-button";
import ReactSlickDemo from "./components/slider/slider";
import ImageSlider from "./components/slider/test-slider/ImageSlider";
import RecipeCard from "./components/recipe-card/recipe-card";
// import SimpleSlider from "./components/slider/slider";
// import * as imgpumpIdx from "./src/components/recipe-card/pumpkins.png";


ReactDOM.render(
	<StrictMode>
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
