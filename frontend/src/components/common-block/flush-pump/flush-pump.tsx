import { FlushPumpStatus } from "@/components/common-block/flush-pump/flush-pump-const";
import { AddressData } from "@/shared/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

enum FlushPumpVariants {
  FlushPump = 1208,
  OperatingTime = 2008,
  AccumulatedConsumption = 1448,
  MomentComsumption = 1450
}

const filterVariant = ( address: FlushPumpVariants ) => {
  switch( address) {
    case FlushPumpVariants.FlushPump:
      return 'Насос промывки NPV1'
    case FlushPumpVariants.OperatingTime:
      return 'Наработка'
    case FlushPumpVariants.AccumulatedConsumption:
      return 'Накопленный расход'
    case FlushPumpVariants.MomentComsumption:
      return 'Мгновенный расход'
  }
}

const filterStatus = ( address: FlushPumpVariants, status: FlushPumpStatus ) => {
  if (address === FlushPumpVariants.OperatingTime) {
    return `${status.toString()} ч`;
  }

  if (address === FlushPumpVariants.AccumulatedConsumption || address === FlushPumpVariants.MomentComsumption) {
    return <>
              {`${status.toString()} м`}
              <sup>3</sup>
            </>
  }

  switch( status) {
    case FlushPumpStatus.Stoped:
      return 'Остановлен'
    case FlushPumpStatus.NotExist:
      return 'code 2'
    case FlushPumpStatus.RunAuto:
      return 'Запущен(авто)'
    case FlushPumpStatus.RunManual:
      return 'Запущен(ручн)'
    case FlushPumpStatus.NotExistToo:
      return 'code 4'
    case FlushPumpStatus.Alarm:
      return 'Авария'
    case FlushPumpStatus.Repair:
      return 'Ремонт'
  }
}

export function FlushPumpComponent({
  item
}: {
  item: AddressData
}) {
  return  <Card key={item.address} className={item.value === FlushPumpStatus.Alarm ? 'animate-pulse bg-red-600' : undefined}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
              <CardTitle className="text-sm font-medium ">
                {filterVariant(item.address)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{filterStatus(item.address, item.value)}</div>
            </CardContent>
          </Card>
}
