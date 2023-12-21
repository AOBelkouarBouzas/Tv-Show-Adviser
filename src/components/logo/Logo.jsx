import s from "./style.module.css";

export const Logo = ({ image, title, subtitle }) => {
  return (
    <>
      <div className={s.container}>
        <img
          className={s.img}
          src={image}
        />
        <span className={s.title}>{title}</span>
      </div>
      <span className={s.subtitle}>{subtitle}</span>
    </>
  );
};
