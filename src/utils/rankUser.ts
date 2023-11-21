import {MyColors} from '../constants';

export const getRankTitle = (
  point: number,
): 'Bronze' | 'Silver' | 'Gold' | 'Diamond' => {
  if (point <= 1000) return 'Bronze';
  if (point <= 2000) return 'Silver';
  if (point <= 5000) return 'Gold';
  return 'Diamond';
};

export const getRankColor = (
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Diamond',
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
