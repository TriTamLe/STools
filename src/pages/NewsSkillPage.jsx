import NewSkillForm from '../components/NewSkillForm';

const NewSkillPage = () => {
  return (
    <div
      style={{
        marginTop: '8rem',
        maxWidth: '100%',
        minWidth: '50rem',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 10rem 4rem 10rem',
      }}
    >
      <NewSkillForm />
    </div>
  );
};

export default NewSkillPage;
