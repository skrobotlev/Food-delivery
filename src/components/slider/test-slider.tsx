import React from "react";
import Slider from "react-slick";
// import "./slider.scss";
// import "./slick.css";
// import "./slick-theme.css";

import StartPageSecImage from "./images/st-pg-sec-img";
import StartPageFirstImage from "./images/st-pg-first-img";
import StartPageThirImage from "./images/st-pg-thir-img";

class ReactSlickDemo extends React.Component {
    render() {
        var settings = {
            dots: true,

        };
        return (
            <div className="container">
                <Slider   {...settings}>
                    <div>
                        <StartPageFirstImage />
                        <h1>Eat Healthy</h1>
                        <p>Maintaining good health should be the primary focus of everyone.</p>
                    </div>
                    <div>
                        <StartPageSecImage />
                        <h1>Healthy Recipes</h1>
                        <p>Browse thousands of healthy recipes from all over the world.</p>
                    </div>
                    <div>
                        <StartPageThirImage />
                        <h1>Track Your Health</h1>
                        <p>With amazing inbuilt tools you can track your progress.</p>
                    </div>
                </Slider>

            </div>
        );
    }
}

export default ReactSlickDemo;
