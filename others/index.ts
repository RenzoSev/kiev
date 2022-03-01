import connection from '../kiev-utils/database/connection';
import KievNew from '../kiev-utils/database/model/KievNew';
import { HierarchyNew } from '../kiev-utils/types/New';

const news: HierarchyNew[] = [
  {
    title: 'Forças russas atacam torre de TV em Kiev, diz governo ucraniano',
    srcImage:
      'https://s2.glbimg.com/7_tzgc9hSyu1_1qwH1N7NRMxurQ=/540x304/top/smart/filters:max_age(3600)/https://s01.video.glbimg.com/deo/vi/85/66/10346685',
    date: {
      date: '3/1/2022',
      time: { hours: { period: 'PM', value: 22 }, minutes: 30 },
    },
    hierarchy: 'normal',
  },
  {
    title:
      "'Se Putin acha que vai fazer a Otan recuar, ele está enganado', diz Boris Johnson",
    srcImage:
      'https://s2.glbimg.com/4JbaBZFraDp0gZqeWqdHhLmV1r8=/540x304/top/smart/filters:max_age(3600)/https://s01.video.glbimg.com/deo/vi/40/64/10346440',
    date: {
      date: '3/1/2022',
      time: { hours: { period: 'PM', value: 22 }, minutes: 30 },
    },
    hierarchy: 'normal',
  },
];

(async () => {
  await connection();

  await KievNew.insertMany(news);
})();
