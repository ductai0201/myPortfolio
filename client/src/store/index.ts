import blogApi, { blogReducer } from "@/api/Blog";
import projectApi, { projectReducer } from "@/api/Project";
import reviewApi, { reviewReducer } from "@/api/Review";
import tagApi, { tagReducer } from "@/api/Tag";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  blogApi: blogReducer,
  projectApi: projectReducer,
  tagApi: tagReducer,
  reviewApi: reviewReducer
});
const middleware = [
  blogApi.middleware,
  projectApi.middleware,
  tagApi.middleware,
  reviewApi.middleware
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default persistStore(store);
