import { VStatus } from "@/components/ventilation-block/v/v-const";
import { AddressData } from "@/shared/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

enum VVariants {
  V1 = 1549,
  V2 = 1571,
  operatingTimeV1 = 2026,
  operatingTimeV2 = 2032
}

const filterVariant = ( address: VVariants  ) => {
  switch( address) {
    case VVariants.V1:
      return 'Вытяжной вентилятор В1'
    case VVariants.V2:
      return 'Вытяжной вентилятор В2'
    case VVariants.operatingTimeV1:
      return 'Наработка В1'
    case VVariants.operatingTimeV2:
      return 'Наработка В2'
  }
}

const filterStatus = ( address: VVariants, status: VStatus ) => {
  if (address === VVariants.operatingTimeV1 || address === VVariants.operatingTimeV2) {
    return `${status.toString()} ч`;
  }

  switch( status) {
    case VStatus.Stoped:
      return 'Остановлен'
    case VStatus.RunAuto:
      return 'Запущен(авто)'
    case VStatus.RunManual:
      return 'Запущен(ручн)'
    case VStatus.Alarm:
      return 'Авария'
    case VStatus.Repair:
      return 'Ремонт'
  }
}

export function VComponent({
  item
}: {
  item: AddressData
}) {
  return  <Card key={item.address} className={item.value === VStatus.Alarm ? 'animate-pulse bg-red-600' : undefined}>
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
