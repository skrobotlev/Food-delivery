import React, { ReactElement } from "react";
import Slider from "react-slick";
import RectangleButton, { RectBut } from "../../buttons/rectangle-button";
import { FirstSlide } from "../../images/slider-home-page";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styled from "styled-components";
import FavorRecCardSalad from "../../images/fav-re-cd-salad";

interface SliderCardProps {
    header?: string;
    desc?: string;
    image?: ReactElement;
    children?: any;
}

const HomePageSliderCard = styled.div`
   // display: flex;
  // flex-wrap: column;
  width: 320px;
  height: 170px;
  padding-top: 30px;
    padding-left: 30px;
  h1 {
    font-size: 10px;
    font-family: "Signika";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    color: #FF806E;
    
    /* position: absolute;
    top: 20px;
    right: 35px; */
  }
  p {
    font-family: "Signika";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 24px;
    width: 130px;
    /* position: relative; */
    
  }  
`;

const ImageSpan = styled.span`
  position: relative;
  bottom: 120px;
  left: 150px;

`;

const ChildrenSpan = styled.div`

`;

const SliderCard: React.FC<SliderCardProps> = ({ header, desc, image, children }) => {
    return (
        <HomePageSliderCard>

            <h1>{header}</h1>
            <p>{desc}</p>
            <ChildrenSpan>{children}</ChildrenSpan>
            <ImageSpan>{image}</ImageSpan>
        </HomePageSliderCard>
    );
};

class HomePageSlider extends React.Component {
    render() {
        const settings = {
            dots: true,
            dotsClass: "slick-dots line-indicator",
            customPaging: function (i) {
                return <div className="dot"></div>;
            },
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
        };
        // const cards = [
        //     {
        //         header: "Eat Healthy",
        //         desc: "Maintaining good health should be the primary focus of everyone.",
        //         image: <StartPageFirstImage />
        //     },
        //     {
        //         header: "Healthy Recipes",
        //         desc: "Browse thousands of healthy recipes from all over the world.",
        //         image: <StartPageSecImage />
        //     },
        //     {
        //         header: "Track Your Health",
        //         desc: "With amazing inbuilt tools you can track your progress.",
        //         image: <StartPageThirImage />
        //     }
        // ];
        return (
            <div className="home-page-slider">
                <Slider {...settings}>
                    {/* {cards.map(card => {

                        return (

                            <SliderCard key={card.header} header={card.header} image={card.image}
                                desc={card.desc}>
                            </SliderCard>

                        );
                    })}; */}
                    <SliderCard header="A R T I C L E" image={<FirstSlide />} desc="The pros and cons of fast food.">
                        <RectangleButton size="sm" title="Read now" icon={<ArrowRightIcon fontSize="small" />} />
                    </SliderCard>

                    <SliderCard header="Healthy Recipes" desc="Browse thousands of healthy recipes from all over the world."
                        image={<FavorRecCardSalad />}>

                    </SliderCard>

                    <SliderCard header="Track Your Health" desc="With amazing inbuilt tools you can track your progress."></SliderCard>
                </Slider>
            </div>
        );
    }
}

export default HomePageSlider;
