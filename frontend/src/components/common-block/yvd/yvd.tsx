import { AddressData } from "@/shared/types/types";
import { YvdStatus } from "./yvd-const";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

enum YvdVariants {
  yvd1 = 809,
  yvd2 = 835,
  yv1 = 861,
  yv2 = 887
}

const filterVariant = ( address: number ) => {
  switch( address) {
    case YvdVariants.yvd1:
      return 'YVD1 (от приемного окна)'
    case YvdVariants.yvd2:
      return 'YVD2 (байпас)'
    case YvdVariants.yv1:
      return 'YV1 (подача воды)'
    case YvdVariants.yv2:
      return 'YV2 (промывка)'
  }
}

const filterStatus = ( status: number ) => {
  switch( status) {
    case YvdStatus.Closed:
      return 'Закрыт'
    case YvdStatus.Opened:
      return 'Открыт'
    case YvdStatus.ManualOpened:
      return 'Открыт вручную'
    case YvdStatus.Closing:
      return 'Закрывается'
    case YvdStatus.Alarm:
    return 'Авария'
  }
}

export function YvdComponent({
  item
}: {
  item: AddressData
}) {
  return  <Card key={item.address} className={item.value === YvdStatus.Alarm ? 'animate-pulse bg-red-600' : undefined}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {filterVariant(item.address)}
              </CardTitle>          
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold ">{filterStatus(item.value)}</div>
            </CardContent>
          </Card>
}
