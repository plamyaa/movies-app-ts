import { Box } from "@mui/system";
import { Card, CardMedia, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleBookmark, toggleLike } from "../../../store/action";
import { IReduxData } from "../../../store/reducer"
import React, { memo } from "react";
import { useStorage, setInStorage } from "../../../utils";
import { Link as RouterLink } from "react-router-dom"

interface MovieCardProps {
  data: IReduxData,
  index: number
  isAuth: boolean
}

export const MovieCard : React.FC<MovieCardProps> = memo(function MovieCard({data, index, isAuth} : MovieCardProps) {
  const storage = useStorage();
  const dispatch = useDispatch();
  const handleLike = (event : React.ChangeEvent<unknown>) => {
    if (!isAuth) return;
    const target = event.target as HTMLElement;
    dispatch(toggleLike(Number(target.id)));
    setInStorage(storage, target.parentElement?.id, 'favorite');
  }
  const handleBookmark = (event : React.ChangeEvent<unknown>) => {
    if (!isAuth) return;
    const target = event.target as HTMLElement;
    dispatch(toggleBookmark(Number(target.id)));
    setInStorage(storage, target.parentElement?.id, 'bookmark');
  }
  const getAuthLike = () => {
    if (isAuth) {
      return (data.like ? 'StarActive.svg' : 'Star.svg')
    }
    return 'Star.svg';
  }
  const getAuthBookmark = () => {
    if (isAuth) {
      return (data.bookmark ? 'BookmarkActive.svg' : 'Bookmark.svg')
    }
    return 'Bookmark.svg';
  }
  return (
    <Card sx={{
      display: 'grid',
      width: '440px',
      height: '290px',
      border: '1px solid black',
      gridTemplateColumns: 'max-content auto',
      gridTemplateRows: '15% 65% 20%',
      margin: "0 5px"
    }}>
      <CardMedia sx={{
        gridRowStart: '1',
        gridRowEnd: '4',
      }}
        component='img'
        height='100%'
        image={`https://image.tmdb.org/t/p/w500${data.poster_path || data.backdrop_path}`}
        alt='Movie Picture'
      >
      </CardMedia>
      <Box 
        sx={{
          display: 'flex',
          justifyContent: "space-between",
        }}
        id={String(data.id)}
      >
        <Typography sx={{
          display: 'grid',
          margin: '13px 10px 10px',
          verticalAlign: 'center'
        }}>
          Рэйтинг: {data.vote_average}
        </Typography>
        <CardMedia sx={{
          marginTop: '10px',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
        }}
          component='img'
          height='100%'
          image={getAuthLike()}
          alt='Like'
          id={String(index)}
          onClick={handleLike}
        >
        </CardMedia>
        <CardMedia sx={{
          margin: '10px',
          width: '25px',
          height: '30px',
          cursor: 'pointer',
        }}
          component='img'
          height='100%'
          image={getAuthBookmark()}
          alt='Watch Later'
          id={String(index)}
          onClick={handleBookmark}
        >
        </CardMedia>
      </Box>
      <Typography sx={{
        margin: 'auto 10px',
        gridRowStart: '2',
        gridRowEnd: '3',
        fontWeight: '600',
      }}>
        {data.title}
      </Typography>
      <Link sx={{
        textAlign: 'start',
        padding: '20px 30px',
        borderTop: '1px solid black'
        
      }}
        underline="hover"
        component={RouterLink}
        to={`/movie/${data.id}`}
        key={data.id}
      >
        Подробнее
      </Link>
    </Card>
  );
})