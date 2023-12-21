import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

export const SearchBar = ({ onSubmit }) => {
  function submit(e) {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      console.log(e.target.value);
      onSubmit(e.target.value);
    }
  }

  return (
    <>
      <SearchIcon size={27} className={s.icon} />
      <input
        className={s.input}
        type="text"
        placeholder="Search a Tv show you may like"
        onKeyUp={submit}
      />
    </>
  );
};
