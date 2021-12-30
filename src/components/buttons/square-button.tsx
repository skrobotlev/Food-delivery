import React from "react";
import styled from "styled-components";

import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface SquareButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  // icon?: ReactElement,
  backgroundColor?: string;
  title?: string;
  size: "lg" | "md" | "sm";
}



export const SquareBut = styled.button<SquareButtonProps>`
  width: ${(props) => {
    if (props.size == "sm") {
      return "64px";
    } else if (props.size == "md") {
      return "96px";
    } else if (props.size == "lg") {
      return "132px";
    }
  }};
  height: ${({ size }) => {
    if (size == "sm") {
      return "64px";
    } else if (size == "md") {
      return "96px";
    } else if (size == "lg") {
      return "144px";
    }
  }};
  border-radius: ${({ size }) => {
    if (size == "sm") {
      return "10px";
    } else if (size == "md") {
      return "20px";
    } else if (size == "lg") {
      return "30px";
    }
  }};
  background-color: ${({ backgroundColor }) => {
    if (backgroundColor) {
      return backgroundColor;
    } else backgroundColor;
  }};
  border-color: ${({ backgroundColor }) => {
    if (backgroundColor) {
      return backgroundColor;
    } else backgroundColor;
  }};
  font-size: ${({ size }) => {
    if (size == "sm") {
      return "1rem";
    } else if (size == "md") {
      return "1rem";
    } else if (size == "lg") {
      return "1.5rem";
    }
  }};
  color: ${({ size }) => {
    if (size == "sm") {
      return "#FF8473";
    } else if (size == "lg") {
      return "#1C3418";
    }
  }};
  margin: 25px;
  font-family: "Signika";
  border: none; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  `;

// const SquareButton: React.FC<SquareButtonProps> = ({ size }) => {
//   return (
//     <div>
//       <button className={`square-btn-${size}`}></button>
//     </div>
//   );
// };

// export default SquareButton;
