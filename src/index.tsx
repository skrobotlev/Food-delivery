import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { BurgerSVG } from "./icons/burger";
import FruitSVG from "./icons/strawb";
import { SquareBut } from "./components/buttons/square-button";
import RectangleButton, { RectBut } from "./components/buttons/rectangle-button";
import App from "./components/slider/test-slider";
import SimpleSlider from "./components/slider/slider";

ReactDOM.render(
	<StrictMode>
		<SimpleSlider />
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
		<App />
	</StrictMode>,
	document.getElementById("app")
);
