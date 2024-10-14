'use client'

import { CardContent, CardTitle } from "@/shared/ui/card";
import { ElementTemplate } from "../element-template/element-template";
import { TemplateType } from "@/components/element-template/template-const";
import { VentilationStatus } from "@/components/ventilation-block/ventilation-const";
import { AddressData } from "@/shared/types/types";

const filterStatus = ( status: VentilationStatus ) => {
  switch( status) {
    case VentilationStatus.Manual:
      return 'Вентиляция включена в ручном режиме'
    case VentilationStatus.LowTemperature:
      return 'Низкая температура внутри здания!'
    case VentilationStatus.AutoWithoutHeater:
      return 'Вентиляция включена в авторежиме(без калорифера)'
    case VentilationStatus.AutoWithHeater:
      return 'Вентиляция включена в авторежиме(с калорифером)'
    case VentilationStatus.Fire:
      return 'Пожар!'
    case VentilationStatus.Gas:
      return 'Загазованность!'
  }
}

const checkError = ( status: VentilationStatus ) => {
  if (status === VentilationStatus.LowTemperature || status === VentilationStatus.Fire || status === VentilationStatus.Gas) {
    return 'font-bold animate-pulse text-red-600';
  }
}

export function VentilationBlock({
  ventilationData,
  convectorAndHeaterData,
  pData,
  vData,
  heatingCableData
}: {
  ventilationData: AddressData[],
  convectorAndHeaterData: AddressData[],
  pData: AddressData[],
  vData: AddressData[],
  heatingCableData: AddressData[]
}) {
  return  <>
            <CardContent className="p-3 text-sm">
              <CardTitle className={`ml-2 mb-4 ${checkError(ventilationData[0].value)}`}>{filterStatus(ventilationData[0].value)}</CardTitle>
              {convectorAndHeaterData && <ElementTemplate description="Статус конвекторов и калориферов" items={convectorAndHeaterData} templateType={TemplateType.ConvectorAndHeater}/>}
              {pData && <ElementTemplate description="Статус приточных вентиляторов" items={pData} templateType={TemplateType.P}/>}
              {vData && <ElementTemplate description="Статус вытяжных вентиляторов" items={vData} templateType={TemplateType.V}/>}
              {heatingCableData && <ElementTemplate description="Статус греющих кабелей" items={heatingCableData} templateType={TemplateType.HeatingCable}/>}
            </CardContent>
          </>
}
