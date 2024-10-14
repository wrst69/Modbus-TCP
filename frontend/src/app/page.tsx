'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs";
import { Card } from "@/shared/ui/card";
import { Header } from "@/components/header/header";
import { TriangleAlert } from "lucide-react";
import { VentilationBlock } from "@/components/ventilation-block/ventilation-block";
import { CommonBlock } from "@/components/common-block/common-block";
import { FullPageSpinner } from "@/shared/ui/full-page-spinner";
import { useDataQuery, useDataQueryTest } from "@/query/query";
import { useEffect, useState } from "react";
import { ErrorComponent } from "@/components/error/error";
import { checkErrors, getFilteredData } from "@/shared/utils/utils";

export default function Home() {
  const [commonError, setCommonError] = useState(false);
  const [ventilationError, setVentilationError] = useState(false);
  const [currentInset, setCurrentInset] = useState('all');

  //const { data, isPending, isError } = useDataQuery();
  const { data, isPending, isError } = useDataQueryTest();

  useEffect(() => {
    setCommonError(false);
    setVentilationError(false);
    checkErrors(data, setCommonError, setVentilationError);
  }, [data])

  if (isPending) return <FullPageSpinner/>

  if (isError) return <ErrorComponent/>

  const { yvdData, grData, flushPumpData, ventilationData, convectorAndHeaterData, pData, vData, heatingCableData } = getFilteredData(data);
 
  return  <main className="space-y-6 py-12 container max-w-[1100px]">
          <Card className="overflow-hidden">
            <Header/>
            <Tabs defaultValue="all" onValueChange={(evt) => setCurrentInset(evt)}>
              <div className="flex items-center ml-2 mt-2">
                <TabsList>
                  <div className={`flex items-center ${commonError && currentInset !== 'all' ? 'animate-pulse text-red-600' : null}`}>
                    {commonError && currentInset !== 'all' && <TriangleAlert className="ml-1" size={20}/>}
                    <TabsTrigger value="all">Общие параметры</TabsTrigger>
                  </div> 
                  <div className={`flex items-center ${ventilationError && currentInset !== 'ventilation' ? 'animate-pulse text-red-600' : null}`}>
                    {ventilationError && currentInset !== 'ventilation' && <TriangleAlert className="ml-1" size={20}/>}
                    <TabsTrigger value="ventilation" className="">Система отопления и вентиляции</TabsTrigger>
                  </div>
                </TabsList> 
              </div>
              <TabsContent value="all">
                <CommonBlock 
                  yvdData={yvdData} 
                  grData={grData} 
                  flushPumpData={flushPumpData}
                />
              </TabsContent>
              <TabsContent value="ventilation">
                <VentilationBlock 
                  ventilationData={ventilationData} 
                  convectorAndHeaterData={convectorAndHeaterData}
                  pData={pData}
                  vData={vData}
                  heatingCableData={heatingCableData}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </main> 
}
