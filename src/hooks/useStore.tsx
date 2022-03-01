import React, { useEffect } from "react";


export default function useStore(recipesHashTb, recipeId, active, setActive, records) {
    useEffect(() => {
        // console.log(recipesHashTb);
        if (recipesHashTb[recipeId]) setActive(true);
        else setActive(false);
    }, [records, active]);
}