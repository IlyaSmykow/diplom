import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userLogin } from "../../redux/reducers/auth_reducer";
import { useDispatch } from "react-redux";
import { toggleActive } from "../../redux/reducers/app_reducer";
import styles from "./LoginForm.module.scss";
import { InputPassword } from "../../components/InputPassword/InputPassword";

const schema = yup
  .object()
  .shape({
    email: yup.string().required("Заполните поле!"),
    password: yup.string().required("Заполните поле!"),
  })
  .required();

export const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(userLogin(data.email, data.password));
    dispatch(toggleActive(false));
    reset();
  };

  return (
    <form className={styles.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        id="email"
        label="Email"
        {...register("email")}
        name="email"
        autoComplete="email"
      />
      <p>{errors.email?.message}</p>
      <label>Пароль</label>
      <InputPassword register={register} />
      <p>{errors.password?.message}</p>
      <button className={styles.submit__button} type="submit">
        войти
      </button>
    </form>
  );
};
