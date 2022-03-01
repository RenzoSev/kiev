export interface Date {
  date: string;
  time: {
    hours: {
      value: number;
      period: string;
    };
    minutes: number;
  };
}

export const months = {
  jan: 1,
  fev: 2,
  mar: 3,
  abr: 4,
  jun: 5,
  jul: 7,
  ago: 8,
  set: 9,
  out: 10,
  nov: 11,
  dez: 12,
};

export function getFullDate() {
  const date = new Date();

  const FIX_MONTH_STARTS_AT_0 = 1;

  const month = date.getMonth() + FIX_MONTH_STARTS_AT_0;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function getFullTime({ m, h }: { m?: number; h?: number }) {
  const date = new Date();

  const minutesWithDiscount = m ? date.getMinutes() - m : date.getMinutes();
  const minutes = parseMinutes(minutesWithDiscount);
  const hoursWithDiscount = h ? date.getHours() - h : date.getHours();
  const hours = parseHours(hoursWithDiscount, minutesWithDiscount);

  return { hours, minutes };
}

export function parseMinutes(minutes: number) {
  if (minutes < 0) {
    const fullMinutes = 60;
    return fullMinutes + minutes;
  }

  return minutes;
}

export function parseHours(hours: number, minutes: number) {
  const brTimeAbstract = 12;
  const hourWithoutAbstract = hours - brTimeAbstract;
  const hourWithMinuteDiscount =
    minutes < 0 ? hourWithoutAbstract - 1 : hourWithoutAbstract;

  if (hourWithMinuteDiscount > 0) {
    return {
      value: hourWithMinuteDiscount,
      period: 'PM',
    };
  }

  return {
    value: hourWithMinuteDiscount * -1,
    period: 'AM',
  };
}

export function parseMonth(month: keyof typeof months) {
  return months[month];
}
