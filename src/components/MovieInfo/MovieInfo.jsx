import GoBack from '../GoBack';
import PropTypes from 'prop-types';
import imgNotFound from '../Images/imgNotFound.png';
import { useLocation } from 'react-router-dom';
import s from './MovieInfo.module.css';

export default function MovieInfo({ movie }) {
  const location = useLocation();

  const getPath = location => {
    if (location.state) {
      const { pathname = '/', search = null } = location.state;
      const path = pathname + search;
      return path;
    } else return '/';
  };

  const {
    title,
    name,
    release_date,
    first_air_date,
    overview,
    vote_average,
    poster_path,
    genres,
  } = movie ?? {};
  return (
    <>
      {movie && (
        <>
          <div className={s.cardWrapper}>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : imgNotFound
              }
              alt={title || name}
              width="300px"
            />
            <div className={s.contentWrapper}>
              <h2 className={s.title}>
                {title || name}{' '}
                {new Date(release_date || first_air_date).getFullYear() || ''}
              </h2>
              <p className={s.text}>User Score: {vote_average * 10}%</p>
              <h2 className={s.title}>Overview</h2>
              <p className={s.text}>{overview || 'Data not found'}</p>
              <h2 className={s.title}>Genres</h2>
              {genres.length ? (
                <ul>
                  {genres.map(({ name }, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p>Genres Unavailable</p>
              )}
              <GoBack path={getPath(location)} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.number,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
  }),
};
