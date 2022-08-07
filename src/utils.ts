import { IReduxData } from "./store/reducer";
import { store } from "./store/store";

export function getFilteredData() {
  const genres = store
    .getState()
    .filterData.genres.filter((element) => element.checked === true)
    .map((element) => element.id);
  const sorts = store.getState().filterData;
  const { year, type } = sorts;
  let data: IReduxData[] = store.getState().dataHolder.mainData;
  if (type !== "") {
    data = getTypeSort(data, type);
  }
  if (year !== "") {
    data = getYearSort(data, year);
  }
  if (genres.length) {
    data = getGenresSort(data, genres);
  }
  return data;
}

function getTypeSort(data: IReduxData[], type: string): IReduxData[] {
  return data.slice().sort((a: IReduxData, b: IReduxData): number => {
    if (type === "Популярные по убыванию") {
      return b.popularity - a.popularity;
    }
    if (type === "Популярные по возростанию") {
      return a.popularity - b.popularity;
    }
    if (type === "Рейтинг по убыванию") {
      return b.vote_average - a.vote_average;
    }
    if (type === "Рейтинг по возрастанию") {
      return a.vote_average - b.vote_average;
    }
    return 0;
  });
}

function getYearSort(data: IReduxData[], year: string): IReduxData[] {
  return data.filter((movieData: IReduxData) => {
    if (movieData.release_date.slice(0, 4) === year) {
      return movieData;
    }
    return null;
  });
}

export function getGenresSort(data: IReduxData[], genres: number[]) {
  return data.filter((movieData) => genresCheck(movieData.genre_ids, genres));
}

export function genresCheck(movieIds: number[], genres: number[]) {
  const ids = movieIds.filter((id) => {
    if (genres.includes(id)) {
      return true;
    }
    return false;
  });
  if (ids.length >= genres.length) {
    return true;
  }
  return false;
}

export function useStorage() {
  function setItem(key: string, value: string): void {
    try {
      const item: string = JSON.stringify(value);
      localStorage.setItem(key, item);
    } catch (e) {
      console.log(e);
    }
  }
  function getItem(key: string): string | undefined {
    const item: string | null = String(localStorage.getItem(key));
    return item !== null ? JSON.parse(item) : item;
  }
  return { setItem, getItem };
}

interface IStorage {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => any;
}

export function setInStorage(
  storage: IStorage,
  cardId: string | undefined,
  key: string
): void {
  const currentStorage = storage.getItem(key) || [];
  const isDuplicate = currentStorage.find((id: string) => id === cardId);
  if (isDuplicate) {
    const newStorage = currentStorage.filter((id: string) => id !== cardId);
    storage.setItem(key, newStorage);
  } else {
    currentStorage.push(cardId);
    storage.setItem(key, currentStorage);
  }
}

export function getSearchData(
  genre: string,
  rating: string,
  popularity: string
): IReduxData[] {
  let data = store.getState().dataHolder.mainData;
  if (genre !== "") {
    data = getGenresSort(data, [Number(genre)]);
  }
  if (rating !== "") {
    data = ratingSort(data, rating);
  }
  if (popularity !== "") {
    data = popularitySort(data, popularity);
  }
  return data;
}

export function ratingSort(data: IReduxData[], grade: string): IReduxData[] {
  return data.slice().filter((movieData: IReduxData) => {
    if (grade === "high" && movieData.vote_average > 5) {
      return movieData;
    }
    if (grade === "low" && movieData.vote_average <= 5) {
      return movieData;
    }
    return null;
  });
}

export function popularitySort(
  data: IReduxData[],
  popularity: string
): IReduxData[] {
  return data.slice().filter((movieData: IReduxData) => {
    if (
      popularity === "high" &&
      movieData.popularity > 100 &&
      movieData.vote_count > 200
    ) {
      return movieData;
    }
    if (
      popularity === "low" &&
      movieData.popularity <= 100 &&
      movieData.vote_count <= 200
    ) {
      return movieData;
    }
    return null;
  });
}

export function getLiked() {
  const data: IReduxData[] = store.getState().dataHolder.mainData;
  if (data) {
    return data.filter((movieData) => {
      if (movieData.like) {
        return movieData;
      }
      return null;
    });
  }
  return [];
}

export function getBookmarked() {
  const data: IReduxData[] = store.getState().dataHolder.mainData;
  if (data) {
    return data.filter((movieData) => {
      if (movieData.bookmark) {
        return movieData;
      }
      return null;
    });
  }
  return [];
}

export function getMovieData(movieId: number) {
  const data = store.getState().dataHolder.mainData;
  return data.filter((movieData) => {
    if (movieData.id === movieId) {
      return movieData;
    }
    return null;
  });
}
