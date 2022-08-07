import { Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { setNewData } from "../../../../store/action";
import { getBookmarked, getLiked } from "../../../../utils";

export const Buttons: React.FC = memo(function Buttons() {
    const dispatch = useDispatch();
    const onLikedClick = () => dispatch(setNewData(getLiked()))
    const onBookmarkedClick = () => dispatch(setNewData(getBookmarked()))
    return (
        <>
            <Button variant="contained" sx={{ marginTop: '10px', width: '100%' }} component={RouterLink} to="/search">Поиск</Button>
            <Button onClick={onLikedClick} variant="outlined" color="error" sx={{ marginTop: '10px', width: '100%' }}>Любимые фильмы</Button>
            <Button onClick={onBookmarkedClick} variant="outlined" color="primary" sx={{ marginTop: '10px', width: '100%' }}>Закладки</Button>
        </>
    )
})