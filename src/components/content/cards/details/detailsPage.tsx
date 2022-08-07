import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { memo } from "react";
import { useParams } from "react-router-dom";
import { getMovieData } from "../../../../utils";
import { genresData } from "../../filter/genresData";

export const Details: React.FC = memo(function Details() {
  const params = useParams();
  const {
    title,
    overview,
    backdrop_path,
    original_language,
    poster_path,
    popularity,
    release_date,
    vote_average,
    genre_ids,
  } = getMovieData(Number(params.filmId))[0]
  const imagePath = poster_path || backdrop_path;
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: 'grid',
          gridTemplateColumns: '32% 68%',
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${imagePath})`,
          backgroundSize: '60% 100%',
          backgroundPosition: 'right',
          boxShadow: '600px 2px 80px -4px rgba(0, 0, 0, 1) inset',
          height: '80vh',
        }}
      >
        <Box sx={{ mt: '50px' }}>
          <Typography sx={{ color: 'white', fontWeight: '700' }} variant="h3">
            {title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'gray', fontWeight: '400' }}>
            <span style={getVoteStyle(vote_average)}>{vote_average} </span>
            <span style={{ marginRight: '10px' }}>{popularity}</span>
            <span>{new Date(release_date).getFullYear()}, </span>
            <span>{original_language.toUpperCase()}, RU </span>
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'gray', fontWeight: '400' }}>
            {getGenresString(genre_ids)}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: '300' }}>
            {overview}
          </Typography>
        </Box>
      </Container>
    </>
  );
})

function getVoteStyle(vote: number) {
  return {
    color: vote > 6.9 ? 'green' : 'red',
    fontWeight: '700',
    fontSize: '20px',
  };
}
export function getGenresString(genres: number[]) {
  const result: string[] = [];
  genresData.forEach((element) => {
    if (genres.includes(element.id)) result.push(element.name);
  });
  return result.join(', ');
}