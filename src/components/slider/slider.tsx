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

const SliderCard: React.FC<SliderCardProps> = ({ header, desc, image }) => {
    return (
        // <div key={header}>
        <div className="container">
            {image}
            <h1>{header}</h1>
            <p>{desc}</p>
        </div>
        // </div>
    );
};


class ReactSlickDemo extends React.Component {
    render() {
        const settings = {
            dots: true,
            dotsClass: "slick-dots line-indicator",
            customPaging: function (i) {
                return (
                    <div className="dot"></div>
                );
            },
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true

        };
        const cards = [
            {
                header: "Eat Healthy",
                desc: "Maintaining good health should be the primary focus of everyone.",
                image: <StartPageFirstImage />
            },
            {
                header: "Healthy Recipes",
                desc: "Browse thousands of healthy recipes from all over the world.",
                image: <StartPageSecImage />
            },
            {
                header: "Track Your Health",
                desc: "With amazing inbuilt tools you can track your progress.",
                image: <StartPageThirImage />
            }
        ];
        return (
            <div className="container">
                <Slider {...settings}>
                    {/* {cards.map(card => {

                        return (

                            <SliderCard key={card.header} header={card.header} image={card.image}
                                desc={card.desc}>
                            </SliderCard>

                        );
                    })}; */}
                    <SliderCard header="Eat Healthy" image={<StartPageFirstImage />}
                        desc="Maintaining good health should be the primary focus of everyone.">

                    </SliderCard>


                    <SliderCard header="Healthy Recipes" image={<StartPageSecImage />}
                        desc="Browse thousands of healthy recipes from all over the world.">

                    </SliderCard>


                    <SliderCard header="Track Your Health" image={<StartPageThirImage />}
                        desc="With amazing inbuilt tools you can track your progress.">

                    </SliderCard>

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
