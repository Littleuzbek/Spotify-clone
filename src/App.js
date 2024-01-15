import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import Header from "./components/header/header";
import MainSection from "./components/mainSection/MainSection";
import Player from "./components/player/Player";
import Login from "./Login";
import { setClientToken } from "./spotify";
import RightSection from "./components/rightSection/RightSection";
import WelcomeUsers from "./WelcomeUsers";
import { useSelector } from "react-redux";
import ImgChanger from "./ImgChanger";
import Message from "./message";
import AnimationForBody from "./AnimationForBody";
import i1 from "./images/1.jpg";
import i2 from "./images/2.jpg";
import i3 from "./images/3.jpg";
import i4 from "./images/4.jpg";
import i5 from "./images/5.jpg";
import i6 from "./images/6.jpg";
import i7 from "./images/7.jpg";
import i8 from "./images/8.jpg";
import i9 from "./images/9.jpg";
import i10 from "./images/10.jpg";

function App() {
  const [toKen, setToken] = useState("");
  const [num, setNum] = useState(0);
  const [bodyToggle, setBodyToggle] = useState(false);
  const showMessage = useSelector((state) => state.auth.showMessage);
  const track = useSelector((state) => state.link.track);
  const imgStore = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10];

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyPress, true);
  }, []);

  const keyPress = (e) => {
    if (e.key === "+") {
      window.localStorage.clear();
      window.location.reload();
    }
  };

  const next = () => {
    let exp;
    if (num === imgStore.length - 1) {
      exp = 0;
    } else {
      exp = num + 1;
    }
    setNum(exp);
  };

  const prev = () => {
    let exp;
    if (num < 1 && num < imgStore.length - 1) {
      exp = imgStore.length - 1;
    } else {
      exp = num - 1;
    }
    setNum(exp);
  };

  const toggle = () => {
    setBodyToggle(!bodyToggle);
  };
  
  try {
    return !toKen ? (
      <Login />
    ) : (
      <div className={classes.outOfBody} onKeyDown={keyPress}>
        <img src={imgStore[num]} className={classes.img} alt="" />
        <AnimationForBody toggle={toggle} bodyToggle={bodyToggle} />
        {showMessage && <Message />}
        <ImgChanger setNum={setNum} next={next} prev={prev} />
        <div className={bodyToggle ? classes.bodyRemoved : classes.body}>
          <div>
            <Header />
            <MainSection />
            {track.length > 0 ? <RightSection /> : <WelcomeUsers />}
          </div>
          <div>
            <Player />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    window.location.reload();
  }
}

export default App;
