export interface YrSunrise {
  location: {
    height: string;
    latitude: string;
    longitude: string;
    time: [
      {
        date: string;
        high_moon: {
          desc: string;
          elevation: string;
          time: string;
        };
        low_moon: {
          desc: string;
          elevation: string;
          time: string;
        };
        moonphase: {
          desc: string;
          time: string;
          value: string;
        };
        moonposition: {
          azimuth: string;
          desc: string;
          elevation: string;
          phase: string;
          range: string;
          time: string;
        };
        moonrise: {
          desc: string;
          time: string;
        };
        moonset: {
          desc: string;
          time: string;
        };
        moonshadow: {
          azimuth: string;
          desc: string;
          elevation: string;
          time: string;
        };
        solarmidnight: {
          desc: string;
          elevation: string;
          time: string;
        };
        solarnoon: {
          desc: string;
          elevation: string;
          time: string;
        };
        sunrise: {
          desc: string;
          time: string;
        };
        sunset: {
          desc: string;
          time: string;
        };
      },
      {
        date: string;
        moonposition: {
          azimuth: string;
          desc: string;
          elevation: string;
          phase: string;
          range: string;
          time: string;
        };
      }
    ];
  };
  meta: {
    licenseurl: string;
  };
}
