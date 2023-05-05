import { Link } from 'react-router-dom';
import pageNotFound from '../assets/undraw_page_not_found_re_e9o6.svg';

const Error = () => {
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <img src={pageNotFound} alt='page not found' />
      <h1> Không tìm thấy trang này!</h1>
      <h2>Có lẽ hệ thống vẫn chưa cập nhật, bạn vui lòng quay lại sau nhé!</h2>
      <Link to='/'>
        <h3> ← Quay lại trang chủ</h3>
      </Link>
    </div>
  );
};

export default Error;
