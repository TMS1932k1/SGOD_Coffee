import {MyColors} from '../constants';

export const getRankTitle = (
  point: number,
): 'bronze' | 'silver' | 'gold' | 'diamond' | undefined => {
  if (point < 1000) return undefined;
  if (point < 2000) return 'bronze';
  if (point < 5000) return 'silver';
  if (point < 10000) return 'gold';
  return 'diamond';
};

export const getRankColor = (
  rank?: 'bronze' | 'silver' | 'gold' | 'diamond',
) => {
  switch (rank) {
    case 'bronze':
      return MyColors.bronze;
    case 'silver':
      return MyColors.silver;
    case 'gold':
      return MyColors.gold;
    default:
      return MyColors.diamond;
  }
};

export const getRankPromo = (point: number) => {
  if (point < 1000) return 0;
  if (point < 2000) return 5;
  if (point < 5000) return 10;
  if (point < 10000) return 15;
  return 20;
};

export const getAddPoint = (price: number) => {
  return price / 10000;
};

export const getDetailNextRank = (point: number) => {
  let maxPoint = 10000;
  if (point < 1000) {
    maxPoint = 1000;
  } else if (point < 2000) {
    maxPoint = 2000;
  } else if (point < 5000) {
    maxPoint = 5000;
  }

  return {
    maxPoint: maxPoint,
    nextRank: getRankTitle(maxPoint),
    color: getRankColor(getRankTitle(maxPoint)),
  };
};
