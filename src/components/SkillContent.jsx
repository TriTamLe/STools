import { decompressString } from '../util.js';

const SKillContent = ({ skill }) => {
  const { content, title } = skill;
  console.log(decompressString(content));

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
export default SKillContent;
