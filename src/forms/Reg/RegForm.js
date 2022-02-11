import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistration } from "../../redux/reducers/auth_reducer";
import { useDispatch } from "react-redux";
import { toggleActive } from "../../redux/reducers/app_reducer";
import styles from "./RegForm.module.scss";
import { InputPassword } from "../../components/InputPassword/InputPassword";

const schema = yup
  .object()
  .shape({
    fullName: yup.string().required("Заполните поле!"),
    email: yup.string().required("Заполните поле!"),
    password: yup.string().required("Заполните поле!"),
  })
  .required();

export const RegForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { fullName, email, password } = data;
    dispatch(userRegistration(fullName, email, password));
    dispatch(toggleActive(false));
    reset();
  };
  return (
    <form className={styles.form__wrapper} onSubmit={handleSubmit(onSubmit)}>
      <label>Имя и фамилия</label>
      <input label="Name" {...register("fullName")} />
      <p>{errors.fullName?.message}</p>
      <label>Email</label>
      <input
        label="Email"
        {...register("email")}
        name="email"
        autoComplete="username"
      />
      <p>{errors.email?.message}</p>
      <label>Password</label>
      <InputPassword register={register} />
      <p>{errors.password?.message}</p>
      <button className={styles.submit__button} type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};
