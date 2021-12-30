import React, { ReactElement } from "react";
import Slider from "react-slick";
import "../../global.scss";

import StartPageSecImage from "../images/st-pg-sec-img";
import StartPageFirstImage from "../images/st-pg-first-img";
import StartPageThirImage from "../images/st-pg-thir-img";

interface SliderCardProps {
    header: string;
    desc: string;
    image: ReactElement;
}

const SliderCard1: React.FC<SliderCardProps> = ({ header, desc, image }) => {
    return (
        <div className="container">
            {image}
            <h1>{header}</h1>
            <p>{desc}</p>
        </div>
    );
};

export {
    SliderCard1
};

class ReactSlickDemo extends React.Component {
    render() {
        var settings = {
            dots: true,
            dotsClass: "slick-dots line-indicator",
            customPaging: function (i) {
                return (
                    <div className="dot"></div>
                );
            },
            slidesToShow: 1,
            slidesToScroll: 1,

        };
        return (
            <div className="container">
                <Slider {...settings}>
                    <div>
                        <SliderCard1 header="Eat Healthy" image={<StartPageFirstImage />}
                            desc="Maintaining good health should be the primary focus of everyone.">

                        </SliderCard1>
                    </div>
                    <div>
                        <SliderCard1 header="Healthy Recipes" image={<StartPageSecImage />}
                            desc="Browse thousands of healthy recipes from all over the world.">

                        </SliderCard1>
                    </div>
                    <div>
                        <SliderCard1 header="Track Your Health" image={<StartPageThirImage />}
                            desc="With amazing inbuilt tools you can track your    progress.">

                        </SliderCard1>
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
