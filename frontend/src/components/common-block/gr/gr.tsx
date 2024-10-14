import { GrStatus } from "@/components/common-block/gr/gr-const";
import { AddressData } from "@/shared/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

enum GrVariants {
  gr1 = 1016,
  amperage = 962,
  operatingTime = 2002
}

const filterVariant = ( address: GrVariants ) => {
  switch( address) {
    case GrVariants.gr1:
      return 'Измельчитель GR1'
    case GrVariants.amperage:
      return 'Сила тока'
    case GrVariants.operatingTime:
      return 'Наработка'
  }
}

const filterStatus = ( address: GrVariants, status: GrStatus ) => {
  if (address === GrVariants.amperage) {
    return `${status.toString()} A`;
  }
  
  if (address === GrVariants.operatingTime) {
    return `${status.toString()} ч`;
  }
  
  switch( status) {
    case GrStatus.Stoped:
      return 'Остановлен'
    case GrStatus.ForwardDirectionAuto:
      return 'Прямое направление(авто)'
    case GrStatus.ReverseDirectionAuto:
      return 'Обратное направление(авто)'
    case GrStatus.ForwardDirectionManual:
      return 'Прямое направление(ручн)'
    case GrStatus.ReverseDirectionManual:
      return 'Обратное направление(ручн)'
    case GrStatus.Alarm:
      return 'Авария'
    case GrStatus.Repair:
      return 'Ремонт'
  }
}

export function GrComponent({
  item
}: {
  item: AddressData
}) {
  return  <Card key={item.address} className={item.value === GrStatus.Alarm ? 'animate-pulse bg-red-600' : undefined}>
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
