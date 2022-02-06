import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { uploadComment } from "../../redux/reducers/comments_reducer";
import styles from "./CreateCommentForm.module.scss";
import { getAuth } from "../../redux/selectors/authSelectors";

const schema = yup
  .object()
  .shape({
    text: yup.string().required("Заполните поле!"),
  })
  .required();

export const CreateCommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(uploadComment({ text: data.text, postId }, postId));
    reset();
  };

  return (
    <div className={styles.form__wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Добавить комментарий</label>
        <input label="text" {...register("text")} />
        <p>{errors.text?.message}</p>
        <button
          type="submit"
          disabled={!auth}
          className={auth ? styles.button_active : styles.button_disabled}
        >
          Отправить
        </button>
      </form>
    </div>
  );
};
