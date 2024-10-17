import { ConvectorStatus, HeaterStatus } from "@/components/ventilation-block/convector-and-heater/convector-and-heater-const";
import { useDataQuery } from "@/query/query";
import { AddressData } from "@/shared/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

enum ConvectorAndHeaterVariants {
  Convector1 = 2810,
  Convector2 = 2842,
  Heater1 = 2910,
  Heater2 = 2942
}

const filterVariant = ( address: ConvectorAndHeaterVariants  ) => {
  switch( address) {
    case ConvectorAndHeaterVariants.Convector1:
      return 'Конвектор 1'
    case ConvectorAndHeaterVariants.Convector2:
      return 'Конвекторы 2 и 3'
    case ConvectorAndHeaterVariants.Heater1:
      return 'Калорифер 1'
    case ConvectorAndHeaterVariants.Heater2:
      return 'Калорифер 2'
  }
}

const filterStatus = ( address: ConvectorAndHeaterVariants, status: ConvectorStatus | HeaterStatus ) => {
  if (address === ConvectorAndHeaterVariants.Convector1 || address === ConvectorAndHeaterVariants.Convector2) {
    switch( status) {
      case ConvectorStatus.Stoped:
        return 'Остановлен'
      case ConvectorStatus.RunAuto:
        return 'Запущен(авто)'
      case ConvectorStatus.RunManual:
        return 'Запущен(ручн)'
      case ConvectorStatus.AlarmHighTemperature:
        return 'Авария(высокая температура)'
      case ConvectorStatus.AlarmStarter:
        return 'Авария(Не включается пускатель)'
      case ConvectorStatus.Repair:
        return 'Ремонт'
    }
  }

  if (address === ConvectorAndHeaterVariants.Heater1 || address === ConvectorAndHeaterVariants.Heater2) {
    switch( status) {
      case HeaterStatus.Stoped:
        return 'Остановлен'
      case HeaterStatus.RunAuto:
        return 'Запущен(авто)'
      case HeaterStatus.RunManual:
        return 'Запущен(ручн)'
      case HeaterStatus.Alarm:
        return 'Авария'
      case HeaterStatus.Repair:
        return 'Ремонт'
    }
  }
}

const checkError = ( item: AddressData ) => {
  if(item.address === ConvectorAndHeaterVariants.Convector1 || item.address === ConvectorAndHeaterVariants.Convector2) {
    if (item.value === ConvectorStatus.AlarmHighTemperature || item.value === ConvectorStatus.AlarmStarter) {
      return true;
    }
  }

  if(item.address === ConvectorAndHeaterVariants.Heater1 || item.address === ConvectorAndHeaterVariants.Heater2) {
    if (item.value === HeaterStatus.Alarm) {
      return true;
    }
  }

  return false;
}

export function ConvectorAndHeaterComponent({
  item,
}: {
  item: AddressData,
}) {
  const { data, isPending, isError } = useDataQuery();

  if (isPending) return null;

  if (isError) return null;

  const heaterTempAddress = 1668;
  const heaterTemp = data.find(( item) => item.address === heaterTempAddress);
  
  return  <Card key={item.address} className={checkError(item) ? 'animate-pulse bg-red-600' : undefined}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {filterVariant(item.address)}
              </CardTitle>
              {heaterTemp && item.address === ConvectorAndHeaterVariants.Heater1 && <div className="font-bold text-base">{Math.floor(heaterTemp.value)} &deg;C</div>}
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{filterStatus(item.address, item.value)}</div>
            </CardContent>
          </Card>
}
