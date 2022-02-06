import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./reducers/auth_reducer";
import { appReducer } from "./reducers/app_reducer";
import { postsReducer } from "./reducers/posts_reducer";
import { commentsReducer } from "./reducers/comments_reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

window.__store__ = store;

export default store;
