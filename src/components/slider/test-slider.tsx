// import React from "react";
// import AwesomeSlider from "react-awesome-slider";
// import "react-awesome-slider/dist/styles.css";

// const App = () => {
//     const data = [
//         {
//             id: "1",
//             icon: "asset/mobile.png",
//             title: "Web Design",
//             desc:
//                 "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
//             img:
//    `https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/10/
// attachment_100040756-e1538485934255.jpeg?auto=format&q=60&fit=max&w=930`
//         },
//         {
//             id: "2",
//             icon: "asset/globe.png",
//             title: "Mobile Application",
//             desc:
//                 "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//             img:
//                 "https://i.pinimg.com/originals/e9/c9/2f/e9c92f7869d682a6fa5a97fb8a298f30.jpg"
//         },
//         {
//             id: "3",
//             icon: "asset/writing.png",
//             title: "Branding",
//             desc:
//                 "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//             img:
//                 "https://i.pinimg.com/originals/a9/f6/94/a9f69465d972a004ad581f245d6ad581.jpg"
//         }
//     ];
//     return (
//         <div className="App">
//             <AwesomeSlider>
//                 {data.map((d) => (
//                     <div className="item">
//                         <div className="left">
//                             <div className="leftContainer">
//                                 <div className="imgContainer">
//                                     <img src={d.img} />
//                                 </div>
//                                 <h2>{d.title}</h2>
//                                 <p>{d.desc} </p>
//                             </div>
//                         </div>

//                         <div className="right">
//                         </div>
//                     </div>
//                 ))}
//             </AwesomeSlider>
//         </div>
//     );
// };

// export default App;

import React from "react";
import Slider from "react-slick";

class ReactSlickDemo extends React.Component {
    render() {
        var settings = {
            dots: true
        };
        return (
            <div className="container">
                <Slider {...settings}>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                    <div>
                        <img src="http://placekitten.com/g/400/200" />
                    </div>
                </Slider>
            </div>
        );
    }
}

export default ReactSlickDemo;
