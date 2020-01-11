export interface Game {
  roll: (pins: number) => void;
  score: () => number;
}

const createGame = (): Game => {
  let currentRole = 0;
  let rolls: number[] = Array(21).fill(0);

  const isStrike = (frameIndex: number): boolean => rolls[frameIndex] === 10;

  const strikeBonus = (frameIndex: number): number =>
    rolls[frameIndex + 1] + rolls[frameIndex + 2];

  const isSpare = (frameIndex: number): boolean => {
    return rolls[frameIndex] + rolls[frameIndex + 1] === 10;
  };

  const spareBonus = (frameIndex: number): number => rolls[frameIndex + 2];

  const sumOfBallsInFrame = (frameIndex: number): number =>
    rolls[frameIndex] + rolls[frameIndex + 1];

  return {
    roll: (pins: number): void => {
      rolls[currentRole++] = pins;
    },
    score: (): number => {
      const frames = [...Array(10)];
      let frameIndex = 0;

      return frames.reduce(acc => {
        let score = acc;
        if (isStrike(frameIndex)) {
          score += 10 + strikeBonus(frameIndex);
          frameIndex++;
        } else if (isSpare(frameIndex)) {
          score += 10 + spareBonus(frameIndex);
          frameIndex = frameIndex + 2;
        } else {
          score += sumOfBallsInFrame(frameIndex);
          frameIndex = frameIndex + 2;
        }

        return score;
      }, 0);
    }
  };
};

export default createGame;
