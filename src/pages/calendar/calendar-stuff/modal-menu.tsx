import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useStore } from "@/hooks/useStore";
import { useEffect } from "react";

interface ModalMenuProps {
    closeSearch?: any;
    meal?: string;
}

const ModalMenu: React.FC<ModalMenuProps> = ({ closeSearch, meal }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { caloriesStore } = useStore();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (category, meal) => {
        setAnchorEl(null);
        closeSearch(true);
        caloriesStore.nameCaloriesCategory = category;
        // caloriesStore.meal = meal;
    };

    useEffect(() => {
        console.log();
    });

    return (
        <div>
            <Button
                id="basic-button"
                className=""
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
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
}
export default ModalMenu;