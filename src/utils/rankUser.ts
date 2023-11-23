import {MyColors} from '../constants';

export const getRankTitle = (
  point: number,
): 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | undefined => {
  if (point < 1000) return undefined;
  if (point < 2000) return 'Bronze';
  if (point < 5000) return 'Silver';
  if (point < 10000) return 'Gold';
  return 'Diamond';
};

export const getRankColor = (
  rank?: 'Bronze' | 'Silver' | 'Gold' | 'Diamond',
) => {
  switch (rank) {
    case 'Bronze':
      return MyColors.bronze;
    case 'Silver':
      return MyColors.silver;
    case 'Gold':
      return MyColors.gold;
    default:
      return MyColors.diamond;
  }
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
