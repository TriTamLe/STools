import { Link } from 'react-router-dom';
import underContruction from '../assets/undraw_under_construction_-46-pa.svg';

const ContructoringPage = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={underContruction} alt='contructoring' />
      <h1>Nội dung vẫn chưa hoàn thành</h1>
      <h2>Mình vẫn đang dịch bài này, bạn vui lòng quay lại sau nhé</h2>
      <Link to='/'>
        <p>← Quay lại trang chủ</p>
      </Link>
    </div>
  );
};
export default ContructoringPage;
