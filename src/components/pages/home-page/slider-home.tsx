import React, { ReactElement } from "react";
import Slider from "react-slick";
import RectangleButton, { RectBut } from "../../buttons/rectangle-button";
import { FirstSlide } from "../../images/slider-home-page";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styled from "styled-components";
import FavorRecCardSalad from "../../images/salad";

interface SliderCardProps {
    header?: string;
    desc?: string;
    image?: ReactElement;
    children?: any;
}

const HomePageSliderCard = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 30px;
    grid-template-areas:
        "p img"
        "p img"
        "button img"
        "button img"; 
  align-items: center;
  justify-items: center;
  width: 320px;
  height: 170px;
  /* padding-top: 20px; */
    /* padding-left: 30px; */
  h1 {
      grid-area: h1;
      /* align-items: center; */
    font-size: 10px;
    font-family: "Balsamiq Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    color: #FF806E;
  }
  p {
      grid-area: p;
    font-family: "Balsamiq Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 24px;
    width: 120px;
    /* position: relative; */
    
  } 
  .home-slider-button-span{
    grid-area: button;

      /* background-color: aqua; */
  }
  .home-slider-image {
      grid-area: img;
  }
`;

const ImageSpan = styled.span`
  /* position: relative;
  bottom: 150px;
  left: 150px; */

`;

const ChildrenSpan = styled.div`

`;

const SliderCard: React.FC<SliderCardProps> = ({ header, desc, image, children }) => {
    return (
        <HomePageSliderCard>
            {/* <h1>{header}</h1> */}
            <p>{desc}</p>
            <ChildrenSpan>{children}</ChildrenSpan>
            <ImageSpan className="home-slider-image">{image}</ImageSpan>
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

        return (
            <div className="home-page-slider">
                <Slider {...settings}>
                    <SliderCard header="A R T I C L E" image={<FirstSlide />} desc="Плюсы и минусы фаст фуда">
                        <RectangleButton className="home-slider-button-span" size="sm" title="Читать" icon={<ArrowRightIcon fontSize="small" />}
                        // onClick={() => <a href="https://www.sport-express.ru/zozh/news/fast-fud-vred-ili-polza-dlya-cheloveka-plyusy-i-minusy-chto-eto-mozhno-li-pitatsya-1747780/" />}
                        />
                    </SliderCard>

                    <SliderCard header="Разнообразные рецепты" desc="Ищите тысячи рецептов здоровых блюд."
                        image={<FavorRecCardSalad />}>
                    </SliderCard>

                    <SliderCard header="Следите за своим здоровьем" desc="С помощью внутренних инструментов отслеживайте свой прогресс!"></SliderCard>
                </Slider>
            </div>
        );
    }
}

export default HomePageSlider;
