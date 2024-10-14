import { HeatingCableStatus } from "@/components/ventilation-block/heating-cable/heating-cable-const";
import { AddressData } from "@/shared/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

enum HeatingCableVariants {
  Pipes = 3010,
  Window = 3042,
}

const filterVariant = ( address: HeatingCableVariants  ) => {
  switch( address) {
    case HeatingCableVariants.Pipes:
      return 'Греющий кабель труб'
    case HeatingCableVariants.Window:
      return 'Греющий кабель приемного окна'
  }
}

const filterStatus = ( status: HeatingCableStatus ) => {
  switch( status) {
    case HeatingCableStatus.Stoped:
      return 'Остановлен'
    case HeatingCableStatus.RunAuto:
      return 'Запущен(авто)'
    case HeatingCableStatus.RunManual:
      return 'Запущен(ручн)'
    case HeatingCableStatus.Alarm:
      return 'Авария'
    case HeatingCableStatus.Repair:
      return 'Ремонт'
  }
}

export function HeatingCableComponent({
  item
}: {
  item: AddressData
}) {
  return  <Card key={item.address} className={item.value === HeatingCableStatus.Alarm ? 'animate-pulse bg-red-600' : undefined}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {filterVariant(item.address)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{filterStatus(item.value)}</div>
            </CardContent>
          </Card>
}
