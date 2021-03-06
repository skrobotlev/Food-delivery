import React from "react";
import styled from "styled-components";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";


export interface RectangleButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon?: any;
  children?: any;
  title?: string;
  size?: "lg" | "md" | "sm";
  backgroundColor?: string;
}

export const RectBut = styled.button<RectangleButtonProps>`
  width: ${(props) => {
    if (props.size === "sm") {
      return "104px";
    } else if (props.size === "md") {
      return "290px";
    } else if (props.size === "lg") {
      return "320px";
    }
  }};
  height: ${({ size }) => {
    if (size === "sm") {
      return "32px";
    } else if (size === "md") {
      return "72px";
    } else if (size === "lg") {
      return "88px";
    }
  }};
  background-color: ${({ size }) => {
    if (size === "lg") {
      return "#9E9BC7";
    } else if (size === "md") {
      return "#91C788";
    } else if (size === "sm") {
      return "#FF8473";
    }
  }};
  border-color: ${({ size }) => {
    if (size === "lg") {
      return "#9E9BC7";
    } else if (size === "md") {
      return "#91C788";
    } else if (size === "sm") {
      return "#FF8473";
    }
  }};
  font-size: ${({ size }) => {
    if (size === "lg") {
      return "1.2rem";
    } else if (size === "md") {
      return "25px";
    } else if (size === "sm") {
      return "0.75rem";
    }
  }};
  border-radius: 30px;
  color: white;
  font-family: "Balsamiq Sans";
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const BigRectBut = styled.button<RectangleButtonProps>`
  width: 320px;
  @media screen and (min-width: 450px) {
    width: 100%;
}
@media screen and (min-width: 1650px) {
    width: 25%;
}
  height: 88px;
  background-color: #9E9BC7;
  border-color: #9E9BC7;
  font-size: 1.2rem;
  border-radius: 30px;
  color: white;
  font-family: "Balsamiq Sans";
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-right: 15px;
  }
`;

export const InsideRectBut = styled.button<RectangleButtonProps>`
   width: 104px;
  height: 32px;
  background-color: #FFFFFF;
  border-color: #FFFFFF;
  font-size: 0.75rem;
  border-radius: 30px;
  color: #C6C4DE;
  font-family: "Balsamiq Sans";
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export const BigRectangleButton: React.FC<RectangleButtonProps> = ({ title, icon, children }: any) => {
  return (
    <BigRectBut title={title} icon={icon}>
      {title ? title : null}
      {icon ? icon : null}
      <span>{children ? children : null}</span>
    </BigRectBut>
  );
};

const RectangleButton: React.FC<RectangleButtonProps> = ({ title, size, icon, backgroundColor, children }) => {
  return (
    <RectBut size={size} title={title} icon={icon} backgroundColor={backgroundColor}>
      {title ? title : null}
      {icon ? icon : null}
      <span>{children ? children : null}</span>
    </RectBut>
  );
};

export default RectangleButton;
