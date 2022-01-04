import React, { ReactNode } from "react";
// import classNames from "classnames";

// import "./Button.css";

// interface buttonTabProps {
//     children?: ReactNode;
//     onClick?: Function;
//     disabled: Boolean;
//     active?: Boolean;
//     className: string;
// }

// const Button: React.FC<buttonTabProps> = ({
//     children,
//     onClick,
//     className,
//     disabled,
//     active,
//     ...attrs
// }) => {
//     const onClickAction = (e) => {
//         if (disabled) {
//             e.preventDefault();
//         } else {
//             return onClick(e);
//         }
//     };

//     const classes = classNames("btn", className, { active });

//     const Tag = attrs.href ? "a" : "button";

//     return (
//         <Tag
//             className={classes}
//             disabled={disabled}
//             onClick={onClickAction}
//             {...attrs}
//         >
//             {children}
//         </Tag>
//         // <h1>yea</h1>
//     );
// };

// Button.propTypes = {
//     children: PropTypes.node,
//     onClick: PropTypes.func,
//     disabled: PropTypes.bool,
//     active: PropTypes.bool
// };

// Button.defaultProps = {
//     children: "Default button",
//     onClick: () => { },
//     className: "",
//     disabled: false,
//     active: false
// };

// export { Button };
