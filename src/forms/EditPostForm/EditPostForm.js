import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { getPost } from "../../redux/reducers/posts_reducer";
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getPostData, getMessage } from "../../redux/selectors/postsSelectors";
import {
  uploadImage,
  editPost,
  toggleMessage,
} from "../../redux/reducers/posts_reducer";
import { useNavigate } from "react-router-dom";
import styles from "./EditPostForm.module.scss";
import { useParams } from "react-router-dom";

export const EditPostForm = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const postData = useSelector(getPostData);
  const message = useSelector(getMessage);
  const dispatch = useDispatch();
  const [value, setValue] = useState(postData.description);
  const [title, setTitle] = useState(postData.title);
  const [text, setText] = useState(postData.text);
  const inputFileRef = useRef(null);

  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (message === "Запись обновлена") {
      navigation(`/posts/${id}`);
    }
    dispatch(toggleMessage(null));
  }, [message, id, navigation, dispatch]);

  const changeDescription = useCallback((value) => {
    setValue(value);
  }, []);

  const changeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };

  const changeText = (e) => {
    setText(e.currentTarget.value);
  };

  const changeFile = (e) => {
    const target = e.target;
    const file = target.files[0];
    inputFileRef.current = file;
  };

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("file", inputFileRef.current);
    const { url } = await dispatch(uploadImage(formData));
    dispatch(
      editPost(id, {
        title,
        text,
        photoUrl: url,
        description: value,
      })
    );
    reset();
  };

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  return (
    <div className={styles.form__wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form__title}>
          <input
            value={title}
            onChange={changeTitle}
            placeholder="Введите заголовок..."
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className={styles.form__text}>
          <label>Короткое описание</label>
          <textarea value={text} onChange={changeText} />
          {errors.text && <p>{errors.text.message}</p>}
        </div>
        <div className={styles.form__file}>
          <label>Ссылка на изображение:</label>
          <input
            required
            type="file"
            name="file"
            label="file"
            id="input__file"
            onChange={changeFile}
          />
          {errors.file && <p>Выберите изображение</p>}
        </div>
        <div className={styles.form__description}>
          <SimpleMDE
            value={value}
            onChange={changeDescription}
            options={autofocusNoSpellcheckerOptions}
          />
          {value ? null : <p>Заполните поле</p>}
        </div>
        <input className={styles.form__submit_input} type="submit" />
      </form>
    </div>
  );
};
