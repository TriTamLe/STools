import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header>
      <div className={classes.navbar}>
        <Link className={classes.logo} to='/'>
          untools.vietnamese
        </Link>
        <div className={classes.guide}>
          <Link to='/skills'>Hướng dẫn sử dụng</Link>
        </div>
        <div className={classes.right}>
          <Link to='https://untools.co/'>Nguồn sao chép</Link>{' '}
          <Link to='/skills/create'>Thêm kỹ năng</Link>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
