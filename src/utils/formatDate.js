import moment from "moment";
import "moment/locale/ru";

export const formatDate = (date) => {
  return moment(date).locale("ru").format("D MMMM Y в LT");
};
