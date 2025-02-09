export const Button = ({ text, onClick }) => {
  return (
    <>
      <button 
        className="button button--gradient"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};