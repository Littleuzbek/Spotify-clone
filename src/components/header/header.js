import classes from "./header.module.css";
import { HiMiniHome } from "react-icons/hi2";
import { ImSearch } from "react-icons/im";
import { BiLibrary } from "react-icons/bi";
import { authActions } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import LibraryItems from "./LibraryItems";
import { useEffect, useState } from "react";
import APIKit from "../../spotify";

const Header = () => {
  const [library, setLibrary] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    APIKit.get(`me/playlists`).then((response) => {
      setLibrary(response.data.items);
    });
  }, []);

  const libraryItems = library?.map((library) => (
    <LibraryItems
      key={library.id}
      id={library.id}
      name={library.name}
      img={library.images}
      type={library.type}
      display_name={library.owner.display_name}
      link={library}
    />
  ));

  const searcheHandler = () => {
    dispatch(authActions.toggleSearche(true));
    dispatch(authActions.toggleAlbum(true));
  };

  const homeHandler = () => {
    dispatch(authActions.toggleAlbum(false));
    dispatch(authActions.toggleSearcheResults(false));
  };

  return (
    <header>
      <div>
        <span
          onClick={() => {
            homeHandler();
          }}
        >
          <HiMiniHome className={classes.panelBtn} />
          <p>Home</p>
        </span>
        <span
          onClick={() => {
            searcheHandler();
          }}
        >
          <ImSearch className={classes.panelBtn} />
          <p>Search</p>
        </span>
      </div>
      <div className={classes.yourLibrary}>
        <span>
          <BiLibrary className={classes.panelBtn} />
          <p>Your Library</p>
        </span>
        <div>{libraryItems}</div>
      </div>
    </header>
  );
};

export default Header;
