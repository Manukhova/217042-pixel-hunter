import assert from 'assert';
import {setTime, setLives, setCurrentLevel} from './drawLevel';
import {game} from './game';

describe('Time', () => {
  describe('Set time', () => {
    it('should change time successfully', () => {
      assert.equal(setTime(game, game.time + 1).time, 1);
    });
  });
  describe('Fail time', () => {
    it('should fail if negative', () => {
      assert.throws(() => {
        setTime(game, -1);
      });
    });
  });
});

describe('Lives', () => {
  describe('Set lives', () => {
    it('should change lives successfully', () => {
      assert.equal(setLives(game, game.lives - 1).lives, 2);
    });
  });
  describe('Fail lives', () => {
    it('should fail if <= lives Limit', () => {
      assert.throws(() => {
        setLives(game, -1);
      });
    });
  });
});

describe('Level', () => {
  describe('Set level', () => {
    it('should change levels successfully', () => {
      assert.equal(setCurrentLevel(game, game.level + 1).level, 1);
    });
  });
  describe('Fail level', () => {
    it('should fail if >= level Limit', () => {
      assert.throws(() => {
        setCurrentLevel(game, 20);
      });
    });
  });
});

describe('Stats', () => {
  describe('Set stats', () => {
    it('should set stats successfully', () => {
      assert.notEqual(game.stats[game.level] = 'slow', 'unknown');
    });
  });
});
