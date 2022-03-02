interface Date {
  date: string;
  time: {
    hours: {
      value: number;
      period: string;
    };
    minutes: number;
  };
}

export default Date;
