import React, { ReactElement } from "react";
import styled from "styled-components";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";


export interface RectangleButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon?: any;
  children?: any;
  title?: string;
  size: "lg" | "md" | "sm";
}

export const RectBut = styled.button<RectangleButtonProps>`
  width: ${(props) => {
    if (props.size == "sm") {
      return "164px";
    } else if (props.size == "md") {
      return "290px";
    } else if (props.size == "lg") {
      return "320px";
    }
  }};
  height: ${({ size }) => {
    if (size == "sm") {
      return "64px";
    } else if (size == "md") {
      return "72px";
    } else if (size == "lg") {
      return "88px";
    }
  }};
  background-color: ${({ size }) => {
    if (size == "lg") {
      return "#9E9BC7";
    } else if (size == "md") {
      return "#91C788";
    } else if (size == "sm") {
      return "#FF8473";
    }
  }};
  border-color: ${({ size }) => {
    if (size == "lg") {
      return "#9E9BC7";
    } else if (size == "md") {
      return "#91C788";
    } else if (size == "sm") {
      return "#FF8473";
    }
  }};
  font-size: ${({ size }) => {
    if (size == "lg") {
      return "1.2rem";
    } else if (size == "md") {
      return "2rem";
    } else if (size == "sm") {
      return "1.3rem";
    }
  }};
  margin: 20px;
  border-radius: 30px;
  color: white;
  font-family: "Signika";
  padding: 10px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center
`;

const RectangleButton: React.FC<RectangleButtonProps> = ({ title, size, icon, children }) => {
  return (
    <RectBut size={size} title={title} icon={icon}>
      {title ? title : null}
      {icon ? icon : null}
      {children ? children : null}
    </RectBut>
  );
};

export default RectangleButton;
