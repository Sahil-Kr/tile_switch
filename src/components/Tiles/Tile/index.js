import classes from "./index.module.css";
import React, { useEffect, useState } from "react";

const Tile = ({ photo, handleClick, gameOn }) => {
  const frontClick = classes.Clicked;
  const backClick = classes.ClickedBack;
  const [frontClasses, setFrontClasses] = useState(classes.Img);
  const [backClasses, setBackClasses] = useState(classes.Back);
  const [disabled, setDisabled] = useState(false);

  const toggleClassName = (flipped) => {
    // console.log(flipped);
    if (frontClasses.split(" ").length > 1 || flipped) {
      setFrontClasses(classes.Img);
      setBackClasses(classes.Back);
    } else {
      setFrontClasses(classes.Img + " " + frontClick);
      setBackClasses(classes.Back + " " + backClick);
    }
  };

  const onTileClick = () => {
    if (!gameOn) return;
    toggleClassName();
    handleClick({
      slug: photo.slug,
      toggle: toggleClassName,
      disable: disableTile,
    });
  };

  const disableTile = () => {
    setDisabled(true);
  };

  useEffect(() => {
    if (!gameOn) {
      setFrontClasses(classes.Img);
      setBackClasses(classes.Back);
    }
  }, [gameOn]);

  return (
    <div className={classes.Tile} onClick={disabled ? null : onTileClick}>
      <img
        src={photo.photo}
        alt={photo.id + "photo"}
        className={frontClasses}
        id={photo.id}
      />
      <div className={backClasses}>?</div>
    </div>
  );
};

export default Tile;
