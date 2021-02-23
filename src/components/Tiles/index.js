import React, { useEffect, useState } from "react";
import classes from "./index.module.css";
import Tile from "./Tile";
import photos from "../../photos";

const Tiles = ({ handleGameOn, gameOn, setGameWon }) => {
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [lastTile, setLastTile] = useState([]);
  const [score, setScore] = useState(0);
  const [shuffledPhotos, setShuffledPhotos] = useState([...photos]);

  const handleMatching = (tiles) => {
    setLastTile([]);
    // console.log("two tiles selected");
    const [tile1, tile2] = [...tiles];
    let s = score;

    // console.log(tile1, tile2);
    if (tile1.slug !== tile2.slug) {
      setTimeout(() => {
        tile1.toggle(true);
        tile2.toggle(true);
        tile1.enable();
        tile2.enable();
      }, 700);

      // console.log("Id not matched ");
    } else {
      tile1.disable();
      tile2.disable();
      s++;
      if (s === 8) {
        console.log("finished");
        setTimeout(() => {
          selectedTiles.forEach((tile) => tile.enable());
          handleGameOn();
          setGameWon(true);
          setSelectedTiles([]);
          setScore(0);
        }, 1000);
      }
      setScore(s);
    }
  };

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleTileClick = (tile) => {
    // console.log("Tile Clicked");

    const tiles = [...lastTile, tile];
    // console.log("[handleClick tiles--->]", tiles);
    // if (tiles.length > 2) tile.splice(-2);
    if (tiles.length === 2) handleMatching(tiles);
    else setLastTile([tile]);

    setSelectedTiles([...selectedTiles, tile]);
  };

  useEffect(() => {
    if (gameOn) {
      console.log("shuffled photos");
      const arr = shuffle(photos);
      setShuffledPhotos(arr);
    }
  }, [gameOn]);

  return (
    <>
      <div className={classes.Tiles}>
        {shuffledPhotos.map((photo) => (
          <Tile
            key={photo.id}
            photo={photo}
            handleClick={handleTileClick}
            gameOn={gameOn}
          />
        ))}
      </div>
    </>
  );
};

export default Tiles;
