import createGame, { Game } from "../game";

describe("Game", () => {

  let game = {} as Game;

  const rollsMany = (n: number, pins: number) => {
    for (let i = 0; i < n; i++) {
      game.roll(pins);
    }
  };
  const rollSpare = () => {
    game.roll(5);
    game.roll(5);
  };

  const rollStrike = () => {
    game.roll(10);
  };

  beforeEach(() => {
    game = createGame();
  });

  it("Gutter Game", () => {
    rollsMany(20, 0);
    expect(game.score()).toBe(0);
  });

  it("All Ones", () => {
    rollsMany(20, 1);
    expect(game.score()).toBe(20);
  });

  it("One Spare", () => {
    rollSpare();
    game.roll(3);
    rollsMany(17, 0);
    expect(game.score()).toBe(16);
  });

  it("On Strike", () => {
    rollStrike();
    game.roll(3);
    game.roll(4);
    rollsMany(16, 0);
    expect(game.score()).toBe(24);
  });
});
