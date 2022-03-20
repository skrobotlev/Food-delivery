import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useStore } from "@/hooks/useStore";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react-lite";

interface ModalMenuProps {
    closeSearch?: any;
    meal?: string;
}

const ModalMenu: React.FC<ModalMenuProps> = observer(({ closeSearch, meal }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { caloriesStore } = useStore();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    // useEffect((category) => {
    //     if (meal === "breakfast") caloriesStore.breakfastCategoryName = category;
    //     else if (meal === "lunch") caloriesStore.lunchCategoryName = category;
    //     else if (meal === "dinner") caloriesStore.dinnerCategoryName = category;
    // },[category])
    const closeMenu = (meal, category) => {
        if (meal === "breakfast") caloriesStore.breakfastCategoryName = category;
        else if (meal === "lunch") caloriesStore.lunchCategoryName = category;
        else if (meal === "dinner") caloriesStore.dinnerCategoryName = category;
    };
    const handleClose = (category, meal) => {
        // if (meal === "breakfast") caloriesStore.breakfastCategoryName = category;
        // else if (meal === "lunch") caloriesStore.lunchCategoryName = category;
        // else if (meal === "dinner") caloriesStore.dinnerCategoryName = category;
        closeMenu(meal, category);
        setAnchorEl(null);
        closeSearch(true);

    };


    const useStyles = makeStyles(() => ({
        root: {
            "& .MuiButtonBase-root-MuiButton-root": {
                fontFamily: "Balsamiq Sans",
                fontSize: "25px",
                backrgroundColor: "black",
            },
            "& .MuiButton-textSizeMedium": {
                color: "green",
            }
        },
        button: {
            "& .MuiButtonBase-root": {
                fontFamily: "Balsamiq Sans",
                fontSize: "25px",
                color: "#1a9920",
            },

        },
    }));
    const classes = useStyles();

    return (
        <div>
            <Button
                id="basic-button"
                className="modal-menu-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                classes={
                    {
                        root: classes.root,
                        // li: classes.li,
                        // button: classes.button,???????/
                    }
                }
            >
                Выберите категорию
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={() => handleClose("salads", meal)}>Салаты</MenuItem>
                <MenuItem onClick={() => handleClose("first-dishes", meal)}>Первые блюда</MenuItem>
                <MenuItem onClick={() => handleClose("second-dishes", meal)}>Вторые блюда</MenuItem>
                <MenuItem onClick={() => handleClose("beverages", meal)}>Напитки</MenuItem>
                <MenuItem onClick={() => handleClose("canning", meal)}>Соленья</MenuItem>
                <MenuItem onClick={() => handleClose("deserts", meal)}>Десерты</MenuItem>
                <MenuItem onClick={() => handleClose("sauces", meal)}>Соусы</MenuItem>
            </Menu>
        </div>
    );
});
export default ModalMenu;
