import React, { ReactElement } from "react";
import Slider from "react-slick";
import "../../global.scss";

import StartPageSecImage from "../images/start-page-second";
import StartPageFirstImage from "../images/start-page-first";
import StartPageThirImage from "../images/start-page-third";

interface SliderCardProps {
    header: string;
    desc: string;
    image: ReactElement;
}

const SliderCard: React.FC<SliderCardProps> = ({ header, desc, image }) => {
    return (
        <div className="container">
            {image}
            <h1>{header}</h1>
            <p>{desc}</p>
        </div>
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
                header: "Здоровое питание",
                desc: "Забота о своём здоровье должна быть в центре внимания каждого.",
                image: <StartPageFirstImage />
            },
            {
                header: "Разнообразные рецепты",
                desc: "Ищите тысячи рецептов здоровых блюд.",
                image: <StartPageSecImage />
            },
            {
                header: "Следите за своим здоровьем",
                desc: "С помощью внутренних инструментов отслеживайте свой прогресс!",
                image: <StartPageThirImage />
            }
        ];
        return (
            <div className="container">
                <Slider {...settings}>

                    <SliderCard header="Здоровое питание" image={<StartPageFirstImage />}
                        desc="Забота о своём здоровье должна быть в центре внимания каждого.">

                    </SliderCard>


                    <SliderCard header="Разнообразные рецепты" image={<StartPageSecImage />}
                        desc="Ищите тысячи рецептов здоровых блюд.">

                    </SliderCard>


                    <SliderCard header="Следите за своим здоровьем" image={<StartPageThirImage />}
                        desc="С помощью внутренних инструментов отслеживайте свой прогресс!">

                    </SliderCard>
                </Slider>
            </div>
        );
    }
}

export default ReactSlickDemo;