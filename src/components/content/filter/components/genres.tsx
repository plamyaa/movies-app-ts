import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleCheckbox } from "../../../../store/action";
import { IRootReducer, IGenresList } from "../../../../store/reducer";
import { setNewData } from "../../../../store/action";
import { getFilteredData } from "../../../../utils";

export const Genres: React.FC = memo(function Genres() {
  const dispatch = useDispatch();
  const checkboxes = useSelector<IRootReducer, IGenresList[]>(state => state.filterData.genres)
  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id: string | undefined = event.target.parentElement?.parentElement?.id;
    dispatch(toggleCheckbox(id));
    dispatch(setNewData(getFilteredData()));
  }
  return (
    <FormGroup onChange={handleClick}>
      {checkboxes.map((genreData, index) => <FormCheckbox genreData={genreData} index={index} key={index} />)}
    </FormGroup>
  );
})

interface IFormCheckbox {
  genreData: IGenresList,
  index: number
}

const FormCheckbox: React.FC<IFormCheckbox> = memo(function FormCheckbox({ genreData, index }: IFormCheckbox) {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={genreData.name}
      key={genreData.id}
      sx={{ height: '30px' }}
      id={String(index)}
      value={String(genreData.id)}
      checked={genreData.checked}
    />
  )
})