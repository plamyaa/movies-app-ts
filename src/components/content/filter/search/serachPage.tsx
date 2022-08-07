import { genresData } from "../genresData"
import { getSearchData } from "../../../../utils"
import React, { useState } from "react"
import { Link as RoutesLink } from "react-router-dom"
import { IGenresData } from "../genresData"
import { IReduxData } from "../../../../store/reducer"
import { MovieCard } from "../../cards/card"
import { Box } from "@mui/system"
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button, Typography } from "@mui/material"

export const Search: React.FC = () => {
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [popularity, setPopularity] = useState('');
  const [recommendation, setRecomedation] = useState<JSX.Element[]>([]);
  const [cardNumber, setCardNumber] = useState(0)
  const nextCard = () => {
    setCardNumber(cardNumber + 1);
  }
  const recomedationsChange = (data: IReduxData[]) => {
    const cards: JSX.Element[] = [...data.map((movieData: IReduxData) => <MovieCard data={movieData} index={0} key={movieData.id} isAuth={false} />)]
    setCardNumber(0);
    setRecomedation(cards);
  }
  const genreChange = (event: SelectChangeEvent) => {
    const newGenre = event.target.value;
    setGenre(newGenre);
    const data: IReduxData[] = getSearchData(newGenre, rating, popularity);
    recomedationsChange(data);
  }
  const ratingChange = (event: SelectChangeEvent) => {
    const newRating = event.target.value;
    setRating(newRating);
    const data: IReduxData[] = getSearchData(genre, newRating, popularity);
    recomedationsChange(data);
  }
  const popularityChange = (event: SelectChangeEvent) => {
    const newPopularity = event.target.value;
    setPopularity(newPopularity);
    const data: IReduxData[] = getSearchData(genre, rating, newPopularity);
    recomedationsChange(data);
  }

  return (
    <Box sx={{
      display: "grid",
      width: "100%",
      minWidth: "400px",
      margin: 'auto',
      marginTop: "40px",
      justifyContent: 'center'
    }}>
      <FormControl sx={{ m: 1, minWidth: "400px" }}>
        <InputLabel id="genre-select-label">Жанр:</InputLabel>
        <Select
          value={genre}
          labelId="genre-select-label"
          id="genre-select"
          label="Жанр"
          onChange={genreChange}
        >
          <MenuItem value=""><i>None</i></MenuItem>;
          {genresData.map((genre: IGenresData) => <MenuItem value={String(genre.id)} key={String(genre.id)}>{genre.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="rating-select-label">Рэйтинг:</InputLabel>
        <Select
          value={rating}
          labelId="rating-select-label"
          id="rating-select"
          label="Рэйтинг"
          onChange={ratingChange}
        >
          <MenuItem value=""><i>None</i></MenuItem>
          <MenuItem value="high">Высокий</MenuItem>;
          <MenuItem value="low">Низкий</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="popularity-select-label">Популярность:</InputLabel>
        <Select
          value={popularity}
          labelId="popularity-select-label"
          id="popularity-select"
          label="Популярность"
          onChange={popularityChange}
        >
          <MenuItem value=""><i>None</i></MenuItem>
          <MenuItem value="high">Высокая</MenuItem>;
          <MenuItem value="low">Низкая</MenuItem>
        </Select>
      </FormControl>
      {(recommendation.length
        ? <Recommendation cards={recommendation} cardNumber={cardNumber} nextCard={nextCard} />
        : <Typography variant="h6" style={{ textAlign: "center" }}>Нет фильмов</Typography>)}
    </Box>
  )
}

interface IRecommendation {
  cards: JSX.Element[]
  cardNumber: number,
  nextCard: () => void
}

const Recommendation: React.FC<IRecommendation> = ({ cards, cardNumber, nextCard }) => {
  const dataLength = cards.length;
  return (dataLength > cardNumber ?
    <Box sx={{m:1}}>
      {cards.slice(cardNumber, cardNumber + 1)}
      <Box sx={{
        display: "flex",
        columnGap: "20px",
        width: "fit-content",
        margin: "20px auto"
      }}>
        <Button variant="contained" onClick={nextCard}>Не подходит</Button>
        <Button variant="outlined" component={RoutesLink} to={`/movie/${cards[cardNumber].props.data.id}`}>Подходит</Button>
      </Box>
      <Typography sx={{ textAlign: "center" }}>
        {(cardNumber + 1)}/{dataLength}
      </Typography>
    </Box>
    : <Typography variant="h6" sx={{ textAlign: 'center' }}>Больше нет фильмов по запросам</Typography>);
}