import {createStore} from "redux";
import { rootReducer } from "./reducer";

export type RootState = ReturnType<typeof store.getState>
export const store = createStore(rootReducer);