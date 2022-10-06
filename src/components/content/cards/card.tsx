import { Box } from "@mui/system";
import { Card, CardMedia, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleAuth, toggleBookmark, toggleLike } from "../../../store/action";
import { IReduxData } from "../../../store/reducer"
import React, { memo, useState } from "react";
import { useStorage, setInStorage } from "../../../utils";
import { Link as RouterLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Fade from '@mui/material/Fade';
import { ModalAuth } from "../../header/modalAuth";
interface MovieCardProps {
  data: IReduxData,
  index: number
  isAuth: boolean
}

enum BUTTONS {
  FAVORITE = 'favorite',
  BOOKMARK = 'bookmark'
}

export const MovieCard : React.FC<MovieCardProps> = memo(function MovieCard({data, index, isAuth} : MovieCardProps) {
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
      <MovieImage path={data.poster_path || data.backdrop_path} />
      <Box 
        sx={{
          display: 'flex',
          justifyContent: "space-between"
        }}
        id={String(data.id)}
      >
        <MovieRating rating={data.vote_average} />
        <MovieLike like={data.like} isAuth={isAuth} index={index} />
        <MovieBookmark bookmark={data.bookmark} isAuth={isAuth} index={index} />
      </Box>
      <MovieTitle title={data.title} />
      <MovieLink id={data.id} />
    </Card>
  );
})

interface IMovieButtons {
  like?: boolean;
  bookmark?: boolean;
  isAuth: boolean;
  index: number;
}

const MovieBookmark: React.NamedExoticComponent<IMovieButtons> = memo(function MovieBookmark({ bookmark, isAuth, index}: IMovieButtons) {
  const dispatch = useDispatch();
  const storage = useStorage();
  const handleBookmark = (event : React.ChangeEvent<unknown>) => {
    if (!isAuth)
      return handleOpen();
    let target = event.target as HTMLElement;
    if (target.nodeName === 'path') 
      target = target.parentNode?.parentNode as HTMLElement;
    dispatch(toggleBookmark(Number(target.id)));
    setInStorage(storage, target.parentElement?.id, BUTTONS.BOOKMARK);
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => 
    isAuth === true ? dispatch(toggleAuth()) : setOpen(true);
  return (
    <Box sx={{position: "relative"}}>
      <Fade in={bookmark}>
        {
          <BookmarkIcon
            onClick={handleBookmark}
            fontSize="large"
            id={String(index)}
            sx={{cursor: "pointer"}}
          />
        }
      </Fade>
      <Fade in={!bookmark}>
        {
          <BookmarkBorderIcon
            onClick={handleBookmark}
            fontSize="large"
            id={String(index)}
            sx={{
              position: "absolute",
              right: "0",
              cursor: "pointer"
            }}
          />
        }
      </Fade>
      <ModalAuth open={open} handleClose={() => setOpen(false)}></ModalAuth>
    </Box>
  );
})

const MovieLike: React.NamedExoticComponent<IMovieButtons> = memo(function MovieLike({ like, isAuth, index}: IMovieButtons) {
  const dispatch = useDispatch();
  const storage = useStorage();
  const handleLike = (event : React.ChangeEvent<unknown>) => {
    if (!isAuth)
      return handleOpen();
    let target = event.target as HTMLElement;
    if (target.nodeName === 'path') 
      target = target.parentNode?.parentNode as HTMLElement;
    dispatch(toggleLike(Number(target.id)));
    setInStorage(storage, target.parentElement?.id, BUTTONS.FAVORITE);
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => 
    isAuth === true ? dispatch(toggleAuth()) : setOpen(true);
  return (
    <Box sx={{position: "relative"}}>
      <Fade in={like}>
        {
          <FavoriteIcon
            onClick={handleLike}
            fontSize="large"
            id={String(index)}
            sx={{cursor: "pointer"}}
          />
        }
      </Fade>
      <Fade in={!like}>
        {
          <FavoriteBorderIcon
            onClick={handleLike}
            fontSize="large"
            id={String(index)}
            sx={{
              position: "absolute",
              right: "0",
              cursor: "pointer"
            }}
          />
        }
      </Fade>
      <ModalAuth open={open} handleClose={() => setOpen(false)}></ModalAuth>
    </Box>
  );
})

interface IMovieLink {
  id: number;
}

const MovieLink: React.NamedExoticComponent<IMovieLink> = memo(function MovieLink({id}: IMovieLink) {
  return (
    <>
      <Link sx={{
        textAlign: 'start',
        padding: '20px 30px',
        borderTop: '1px solid black'
      }}
        underline="hover"
        component={RouterLink}
        to={`/movie/${id}`}
        key={id}
      >
        Подробнее
      </Link>
    </>
  );
})

interface IMovieImage {
  path: string | null;
}
const MovieImage: React.NamedExoticComponent<IMovieImage> = memo(function MovieImage({path} : IMovieImage) {
  return (
    <>
      <CardMedia sx={{
        gridRowStart: '1',
        gridRowEnd: '4',
        width: 'auto'
      }}
        component='img'
        height='100%'
        image={`https://image.tmdb.org/t/p/w500${path}`}
        alt='Movie Picture'
      >
      </CardMedia>
    </>
  );
})

interface IMovieRating {
  rating: number;
}
const MovieRating: React.NamedExoticComponent<IMovieRating> = memo(function MovieRating({rating} : IMovieRating) {
  return (
    <>
      <Typography sx={{
          display: 'grid',
          margin: '7px 10px',
          verticalAlign: 'center'
        }}>
          Рэйтинг: {rating}
        </Typography>
    </>
  );
})

interface IMovieTitle {
  title: string;
}
const MovieTitle: React.NamedExoticComponent<IMovieTitle> = memo(function MovieTitle({title} : IMovieTitle) {
  return (
    <>
     <Typography sx={{
        margin: 'auto 10px',
        gridRowStart: '2',
        gridRowEnd: '3',
        fontWeight: '600',
      }}>
        {title}
      </Typography>
    </>
  );
})