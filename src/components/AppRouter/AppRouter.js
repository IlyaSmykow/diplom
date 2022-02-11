import { Routes, Route } from "react-router-dom";
import { MainPage } from "../../pages/Main/MainPage";
import { UserProfilePage } from "../../pages/UserProfilePage/UserProfilePage";
import { Page404 } from "../../pages/404/Page404";
import { CreatePostPage } from "../../pages/CreateEditPost/CreatePostPage";
import { EditPostPage } from "../../pages/CreateEditPost/EditPostPage";
import { PostPage } from "../../pages/Post/PostPage";

export const AppRouter = () => {
  return (
    <nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<EditPostPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </nav>
  );
};
