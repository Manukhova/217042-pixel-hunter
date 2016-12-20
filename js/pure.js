export const setCurrentLevel = (currentGame, level) => {
  if (level > 10) {
    throw new RangeError('No such Level');
  }
  return Object.assign({}, currentGame, {
    level: level
  });
};

export const setTime = (currentGame, time) => {
  if (time < 0) {
    throw new RangeError('Time can\'t be negative');
  }
  return Object.assign({}, currentGame, {
    time: time
  });
};

export const setLives = (currentGame, lives) => {
  if (lives < 0) {
    throw new RangeError('Number of lives can\'t be negative');
  }
  if (lives > 3) {
    throw new RangeError('Number of lives can\'t be negative');
  }
  return Object.assign({}, currentGame, {
    lives: lives
  });
};
