import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Typography } from "@mui/material";
import { sortValues, releaseYears } from "./consts";
import { Genres } from "./components/genres";
import { useSelector } from "react-redux";
import { IRootReducer } from "../../../store/reducer";
import { IReduxData } from "../../../store/reducer";
import { setNewData, setPage, setSortType, setYear, clearFilters } from "../../../store/action";
import { useDispatch } from "react-redux";
import { getFilteredData } from "../../../utils";
import React, { memo } from "react";
import { Buttons } from "./components/buttons";

export const Filter: React.FC = memo(function Filter() {
  const dispatch = useDispatch();
  const auth = useSelector<IRootReducer, boolean>(state => state.authToggler.auth)
  const data = useSelector<IRootReducer, IReduxData[]>(state => state.dataHolder.mainData);
  const filterData = useSelector<IRootReducer, IRootReducer["filterData"]>(state => state.filterData);
  const { page, year, type } = filterData;
  const pageChange = (_event: React.ChangeEvent<unknown>, value: number): void => {
    dispatch(setPage(value))
  }
  const onTypeChange = (event: SelectChangeEvent) => {
    dispatch(setSortType(event.target.value));
    dispatch(setNewData(getFilteredData()));
  }
  const onYearChange = (event: SelectChangeEvent) => {
    dispatch(setYear(event.target.value));
    dispatch(setNewData(getFilteredData()));
  }
  const clearFiltres = () => {
    dispatch(clearFilters());
    dispatch(setNewData(getFilteredData()));
  }
  return (
    <Box sx={{
      margin: '20px 0 0 20px',
      width: '210px',
      height: 'fit-content',
      border: '1px solid black',
      borderRadius: '5px',
      padding: '0 20px',
    }}>
      <Typography variant='h6'>
        Фильтры:
      </Typography>
      <Button variant="contained" color='info' sx={{ width: '100%' }} onClick={clearFiltres}>Сбросить Фильтры</Button>
      {(auth ? <Buttons /> : null)}
      <FormControl variant='standard' sx={{ m: 1, width: '100%' }}>
        <InputLabel id='sort-direction-label'>Сортировать по</InputLabel>
        <Select
          value={type}
          labelId='sort-direction-label'
          id="sort-direction"
          label='Сортировать по'
          onChange={onTypeChange}
        >
          <MenuItem value=""><i>None</i></MenuItem>;
          {sortValues.map((value: string) => {
            return <MenuItem value={value} key={value}>{value}</MenuItem>
          })}
        </Select>
      </FormControl>
      <FormControl variant='standard' sx={{ m: 1, width: '100%' }}>
        <InputLabel id='sort-year-label'>Год релиза</InputLabel>
        <Select
          value={year}
          labelId='sort-year-label'
          id="sort-year"
          label='Год релиза'
          onChange={onYearChange}
        >
          <MenuItem value=""><em>None</em></MenuItem>;
          {releaseYears.map((value: string) => {
            return <MenuItem value={value} key={value}>{value}</MenuItem>
          })}
        </Select>
      </FormControl>
      <Genres />
      <Pagination
        page={page}
        count={Math.ceil(data.length / 10)}
        size='small' sx={{ margin: '10px 0' }}
        siblingCount={0}
        onChange={pageChange}
      />
    </Box>
  );
})