'use client'

import { CardContent } from "@/shared/ui/card"
import { ElementTemplate } from "../element-template/element-template";
import { TemplateType } from "../element-template/template-const";
import { AddressData } from "@/shared/types/types";

export function CommonBlock({
  yvdData,
  grData,
  flushPumpData
}: {
  yvdData: AddressData[],
  grData: AddressData[],
  flushPumpData: AddressData[],
}) {
  return  <CardContent className="p-3 text-sm">
            {yvdData && <ElementTemplate description="Статус клапанов" items={yvdData} templateType={TemplateType.Yvd}/>}
            {grData && <ElementTemplate description="Статус измельчителя" items={grData} templateType={TemplateType.Gr1}/>}
            {flushPumpData && <ElementTemplate description="Статус насоса промывки" items={flushPumpData} templateType={TemplateType.FlushPump}/>}
          </CardContent>
}
