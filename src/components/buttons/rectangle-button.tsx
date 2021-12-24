import React from "react";
import styled from "styled-components";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

import "../../global.scss";

export interface RectangleButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  color?: "primary" | "error" | "warning" | "interest";
  title?: string;
  icon?: "product card" | "arrow";
  size: "lg" | "md" | "sm";
}

interface RectangleButtonComponentProps {
  color?: "primary" | "error" | "warning" | "interest";
  title?: string;
  icon?: "product card" | "arrow";
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
  display: flex;
  justify-content: center;
  align-items: center
`;

// export const RectBut = styled.button<RectangleButtonProps>`
//   width: ${({ size }) => (size == "lg" ? "290px" : "290px")};
//   height: ${({ size }) => (size == "lg" ? "72px" : "72px")}
//   margin: 20px;
// 		font-size: 2rem;
// 		border-radius: 30px;
// 		border-color: #91C788;
// 		color: white;
// 		background-color: #91C788;
// 		font-family: 'Signika';
// `;

export const MiniRectButton: React.FC<RectangleButtonComponentProps> = () => {
  return (
    <div></div>
  );
};

const RectangleButton: React.FC<RectangleButtonComponentProps> = ({ title, size }) => {
  return (
    <div>
      <button className={`rectangle-btn-${size}`}>{title}</button>
    </div>
  );
};

export default RectangleButton;
