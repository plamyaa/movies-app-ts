import { createAction } from '@reduxjs/toolkit';
import { IReduxData } from './reducer';

export const setPage = createAction<number>("SET_PAGE");
export const toggleAuth = createAction("TOGGLE_AUTH");
export const toggleLike = createAction<number>("TOGGLE_LIKE");
export const toggleBookmark = createAction<number>("TOGGLE_BOOKMARK");
export const toggleCheckbox = createAction<string | undefined>("TOGGLE_CHECKBOX");
export const setYear = createAction<string>("SET_YEAR");
export const setSortType = createAction<string>("SET_SORT_TYPE");
export const setNewData = createAction<IReduxData[]>("SET_NEW_DATA");
export const clearFilters = createAction("CLEAR_FILTERS");