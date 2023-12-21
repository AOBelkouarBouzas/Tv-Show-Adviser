import s from "./style.module.css";
import { TvShowListItem } from "../TvShowListItem/TvShowListItem";

export const TvShowList = ({ tvShowList, onClickItem }) => {
  return (
    <>
      <div className={s.title}>You may also like:</div>
      <div className={s.list}>
        {tvShowList.map((tvShow) => {
          return (
            <span className={s.tv_show_list_item} key={tvShow.id}>
              <TvShowListItem tvShow={tvShow} onClick={onClickItem} />
            </span>
          );
        })}
      </div>
    </>
  );
};
