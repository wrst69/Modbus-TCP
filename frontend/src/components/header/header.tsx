'use client';

import { useDataQuery } from "@/query/query";
import { CardHeader, CardTitle } from "@/shared/ui/card";

export function Header() {
  const { data, isPending, isError } = useDataQuery();

  if (isPending) return null;

  if (isError) return null;

  const outdoorTempAddress = 1648;
  const outdoorTemp = data.find(( item) => item.address === outdoorTempAddress);

  const stationTempAddress = 1658;
  const stationTemp = data.find(( item) => item.address === stationTempAddress);;

  const pHAddress = 2304;
  const pH = data.find(( item) => item.address === pHAddress);

  const conductionAddress = 2604;
  const conduction = data.find(( item) => item.address === conductionAddress);
  
  return  <CardHeader className="flex flex-row items-start bg-muted/80">
            <div className="grid gap-0.5 justify-start">
              <CardTitle className="font-bold">Станция приема ЖБО</CardTitle>
              <div className="flex flex-col mt-2">
                {outdoorTemp && <div className="font-semibold text-base">{`Температура наружного воздуха:\u00A0\ ${outdoorTemp.value} `}&deg;C</div>}
                {stationTemp && <div className="font-semibold text-base">{`Температура внутри станции:\u00A0\  ${stationTemp.value} `}&deg;C</div>}
                {pH && <div className="font-semibold text-base">{`pH:\u00A0\  ${pH.value}`}</div>}
                {conduction && <div className="font-semibold text-base">{`Проводимость:\u00A0\  ${conduction.value} мкСм/см`}</div>}
              </div>     
            </div>       
          </CardHeader>
}
