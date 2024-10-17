import { FlushPumpStatus } from '@/components/common-block/flush-pump/flush-pump-const';
import { GrStatus } from '@/components/common-block/gr/gr-const';
import { AddressData } from '@/shared/types/types';
import { useQuery } from '@tanstack/react-query';

const dataKey =['data'];

export const useDataQuery = () => {
  return useQuery({
    queryKey: dataKey,
    queryFn: async (): Promise<Array<AddressData>> => {
      const response = await fetch('http://localhost:5000/data')
      return await response.json()
    },
    retry: 5,
    refetchInterval: 3000
  });
};

export const useDataQueryTest = () => {
  const getRandomNumber = (min: number, max: number, isReal?: boolean) => {
    if (isReal) {
      return Number((Math.random() * (max - min) + min).toFixed(2));
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return useQuery({
    queryKey: dataKey,
    queryFn: async (): Promise<Array<AddressData>> => {
      const grStatus = getRandomNumber(0, 6);
      const grPower = () => {
        if( grStatus === GrStatus.Alarm || grStatus === GrStatus.Repair || grStatus === GrStatus.Stoped) {
          return 0.00;
        }

        return getRandomNumber(0, 30, true)
      }

      const flushPumpStatus = () => {
        let status = getRandomNumber(0, 6);

        if (status === FlushPumpStatus.NotExist || status === FlushPumpStatus.NotExistToo) {
          status = status + 1;
        }

        return status;
      }

      return [
        {"address":1648, "value": getRandomNumber(-40, 30, true)},            //outdoorTemp
        {"address":1658, "value": getRandomNumber(0, 30, true)},              //stationTemp
        {"address":2304, "value": getRandomNumber(6, 8, true)},               //pH
        {"address":2604, "value": getRandomNumber(100, 150, true)},           //conduction

        {"address":809, "value": getRandomNumber(0, 4)},  //yvd 1
        {"address":835, "value": getRandomNumber(0, 4)},  //yvd 2
        {"address":861, "value": getRandomNumber(0, 4)},  //yvd 3
        {"address":887, "value": getRandomNumber(0, 4)},  //yvd 4

        {"address":1016, "value": grStatus},  //grStatus
        {"address":962, "value": grPower()},  //grPower
        {"address":2002, "value": getRandomNumber(0, 200)},  //grOperatingTime

        {"address":1208, "value": flushPumpStatus() },  //flushPumpStatus
        {"address":2008, "value": getRandomNumber(0, 200)},  //flushPumpOperatingTime
        {"address":1448, "value": getRandomNumber(0, 200)},  //flushPumpCountMoment
        {"address":1450, "value": getRandomNumber(0, 15)},  //flushPumpCountMoment

        {"address":2712, "value": getRandomNumber(0, 5)}, //ventilation
        {"address":2810, "value": getRandomNumber(0, 5)},  //convector 1
        {"address":2842, "value": getRandomNumber(0, 5)},  //convector 2
        {"address":2910, "value": getRandomNumber(0, 4)},  //heater 1
        {"address":2942, "value": getRandomNumber(0, 4)},  //heater 2
        {"address":1505, "value": getRandomNumber(0, 4)},  //p1
        {"address":1527, "value": getRandomNumber(0, 4)},  //p2
        {"address":2014, "value": getRandomNumber(0, 300)},  //p1OperatingTime
        {"address":2020, "value": getRandomNumber(0, 300)},  //p2OperatingTime
        {"address":1549, "value": getRandomNumber(0, 4)},   //v1
        {"address":1571, "value": getRandomNumber(0, 4)},   //v2
        {"address":2026, "value": getRandomNumber(0, 300)},  //v1OperatingTime
        {"address":2032, "value": getRandomNumber(0, 300)},  //v2OperatingTime
        {"address":3010, "value": getRandomNumber(0, 4)},  //heatingCable1
        {"address":3042, "value": getRandomNumber(0, 4)},  //heatingCable2
      ]
    },
    refetchInterval: 1000
  });
};
