import { NavLink } from 'react-router-dom';

function MyNavLink(props) {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return <NavLink {...props} onClick={handleClick} />;
}

export default MyNavLink