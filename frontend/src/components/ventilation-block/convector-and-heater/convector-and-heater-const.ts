export const ConvectorAndHeaterAddresses = [2810, 2842, 2910, 2942];

export enum ConvectorStatus {
  Stoped = 0,
  RunManual = 1,
  RunAuto = 2,
  AlarmHighTemperature = 3,
  AlarmStarter = 4,
  Repair = 5
};

export enum HeaterStatus {
  Stoped = 0,
  RunManual = 1,
  RunAuto = 2,
  Alarm = 3,
  Repair = 4
};
