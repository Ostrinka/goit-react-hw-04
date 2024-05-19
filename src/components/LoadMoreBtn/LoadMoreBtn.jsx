import css from './LoadMoreBtn.module.css';

export default function LoadMore({ loadMoreImages }) {
  return (
    <div className={css.wrapper}>
      <button className={css.btn} onClick={loadMoreImages}>Load More</button>
    </div>
  );
}

