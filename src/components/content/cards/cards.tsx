import { MovieCard } from "./card";
import { Box } from "@mui/system";
import { IReduxData, IRootReducer } from "../../../store/reducer";
import { useSelector } from "react-redux"
import React, { memo } from "react";

export const Cards : React.FC = memo(function Cards(){
    const page = useSelector<IRootReducer, number>(state => state.filterData.page)
    const data = useSelector<IRootReducer, IReduxData[]> (state => state.dataHolder.sortedData);
    const isAuth = useSelector<IRootReducer, boolean> (state => state.authToggler.auth);
    return (
        <Box sx={{
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            justifyContent: "space-around",
            rowGap: '10px',
            marginRight: '20px',
            '@media(max-width: 1672px)' : { gridTemplateColumns: 'auto auto',justifyContent: "space-around"},
            '@media(max-width: 1200px)' : { gridTemplateColumns : '100%', justifyItems: "center" }
        }}>
            {data.map((movieData : IReduxData, index: number) => {
                return <MovieCard data={movieData} index={index} key={movieData.id} isAuth={isAuth} /> 
            }).slice((page - 1) * 10, page * 10)}
        </Box>
    );
})