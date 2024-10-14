import { PStatus } from "@/components/ventilation-block/p/p-const";
import { AddressData } from "@/shared/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

enum PVariants {
  P1 = 1505,
  P2 = 1527,
  operatingTimeP1 = 2014,
  operatingTimeP2 = 2020
}

const filterVariant = ( address: PVariants  ) => {
  switch( address) {
    case PVariants.P1:
      return 'Приточный вентилятор П1'
    case PVariants.P2:
      return 'Приточный вентилятор П2'
    case PVariants.operatingTimeP1:
      return 'Наработка П1'
    case PVariants.operatingTimeP2:
      return 'Наработка П2'
  }
}

const filterStatus = ( address: PVariants, status: PStatus ) => {
  if (address === PVariants.operatingTimeP1 || address === PVariants.operatingTimeP2) {
    return `${status.toString()} ч`;
  }

  switch( status) {
    case PStatus.Stoped:
      return 'Остановлен'
    case PStatus.RunAuto:
      return 'Запущен(авто)'
    case PStatus.RunManual:
      return 'Запущен(ручн)'
    case PStatus.Alarm:
      return 'Авария'
    case PStatus.Repair:
      return 'Ремонт'
  }
}

export function PComponent({
  item
}: {
  item: AddressData
}) {
  return  <Card key={item.address} className={item.value === PStatus.Alarm ? 'animate-pulse bg-red-600' : undefined}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {filterVariant(item.address)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{filterStatus(item.address, item.value)}</div>
            </CardContent>
          </Card>
}
