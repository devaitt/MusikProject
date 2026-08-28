import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header" style={{ marginBottom: "10px" }}>
      <div className="header__container _container">
        <Link to="/" className="header__link">
          <h1 className="header__title">musik</h1>
        </Link>
        {/* <div className="header__nav">
          <Link to="/favoriteAlbums">FavoriteAlbums</Link>
        </div> */}
        {/* <img src="/earpods.png" alt="" className="header__earpods" /> */}
      </div>
    </header>
  );
}
