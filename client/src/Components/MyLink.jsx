import { Link } from 'react-router-dom';

function MyLink(props) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return <Link {...props} onClick={handleClick} />;
}

export default MyLink