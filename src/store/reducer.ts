import { combineReducers } from "redux";
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  setPage,
  toggleAuth,
  toggleBookmark,
  toggleCheckbox,
  toggleLike,
  setYear,
  setSortType,
  setNewData,
  clearFilters,
} from "./action";
import {
  genresData,
  IGenresData,
} from "../components/content/filter/genresData";
import { data, IData } from "../components/content/cards/moviesData";

export interface IGenresList extends IGenresData {
  checked: boolean;
}

export const genresList: IGenresList[] = [
  ...genresData.map((genre) => {
    return {
      ...genre,
      checked: false,
    };
  }),
];

export interface IReduxData extends IData {
  like: boolean;
  bookmark: boolean;
}

const favoriteMovies =
  JSON.parse(localStorage.getItem("favorite") as string) || [];
const bookmarkedMovies =
  JSON.parse(localStorage.getItem("bookmark") as string) || [];
export const reduxData: IReduxData[] = [
  ...data.map((movieData) => {
    const reduxMovie = { ...movieData, like: false, bookmark: false };
    const favoriteMovieInStorage: boolean = favoriteMovies.includes(
      movieData.id.toString()
    );
    const bookmarkMovieInStorage: boolean = bookmarkedMovies.includes(
      movieData.id.toString()
    );
    if (favoriteMovieInStorage) reduxMovie.like = true;
    if (bookmarkMovieInStorage) reduxMovie.bookmark = true;
    return reduxMovie;
  }),
];

const dataHolder = createReducer(
  { sortedData: reduxData, mainData: reduxData },
  (builder) => {
    builder
      .addCase(
        setNewData.type,
        (state, action: PayloadAction<IReduxData[]>) => {
          const data: IReduxData[] = action.payload;
          state.sortedData = data;
        }
      )
      .addCase(toggleLike.type, (state, action: PayloadAction<string>) => {
        const cardId: string = action.payload;
        state.mainData[Number(cardId)].like =
          !state.mainData[Number(cardId)].like;
        state.sortedData[Number(cardId)].like =
          !state.sortedData[Number(cardId)].like;
      })
      .addCase(toggleBookmark.type, (state, action: PayloadAction<string>) => {
        const cardId: string = action.payload;
        state.mainData[Number(cardId)].bookmark =
          !state.mainData[Number(cardId)].bookmark;
        state.sortedData[Number(cardId)].bookmark =
          !state.sortedData[Number(cardId)].bookmark;
      });
  }
);

const filterData = createReducer(
  { page: 1, year: ``, type: ``, genres: genresList },
  (builder) => {
    builder
      .addCase(setPage.type, (state, action: PayloadAction<string>) => {
        state.page = Number(action.payload);
      })
      .addCase(setSortType.type, (state, action: PayloadAction<string>) => {
        const type: string = action.payload;
        state.type = type;
        state.page = 1;
      })
      .addCase(setYear.type, (state, action: PayloadAction<string>) => {
        const year: string = action.payload;
        state.year = year;
        state.page = 1;
      })
      .addCase(
        toggleCheckbox.type,
        (state, action: PayloadAction<string | undefined>) => {
          const idIndex: string | undefined = action.payload;
          state.genres[Number(idIndex)].checked =
            !state.genres[Number(idIndex)].checked;
          state.page = 1;
        }
      )
      .addCase(clearFilters.type, (state) => {
        state.genres.forEach((element) => {
          element.checked = false;
        });
        state.page = 1;
        state.year = "";
        state.type = "";
      });
  }
);

const isAuth = localStorage.getItem("auth");
const auth = { auth: Boolean(isAuth) };

const authToggler = createReducer(auth, (builder) => {
  builder.addCase(toggleAuth.type, (state) => {
    state.auth = !state.auth;
    localStorage.setItem("auth", String(state.auth));
  });
});
export interface IRootReducer {
  state: IRootReducer;
  dataHolder: {
    sortedData: IReduxData[];
    mainData: IReduxData[];
  };
  authToggler: {
    auth: boolean;
  };
  filterData: {
    year: string;
    type: string;
    page: number;
    genres: IGenresList[];
  };
}

export const rootReducer = combineReducers({
  authToggler,
  dataHolder,
  filterData,
});
