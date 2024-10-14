import { Dispatch } from "react"
import { AddressData } from "../types/types"
import { yvdAddresses, YvdStatus } from "@/components/common-block/yvd/yvd-const"
import { GrAddresses, GrStatus } from "@/components/common-block/gr/gr-const"
import { FlushPumpAddresses, FlushPumpStatus } from "@/components/common-block/flush-pump/flush-pump-const"
import { VentilationAddresses, VentilationStatus } from "@/components/ventilation-block/ventilation-const"
import { ConvectorAndHeaterAddresses, ConvectorStatus, HeaterStatus } from "@/components/ventilation-block/convector-and-heater/convector-and-heater-const"
import { PAddresses, PStatus } from "@/components/ventilation-block/p/p-const"
import { VAddresses, VStatus } from "@/components/ventilation-block/v/v-const"
import { HeatingCableAddresses, HeatingCableStatus } from "@/components/ventilation-block/heating-cable/heating-cable-const"

export const checkErrors = ( data: AddressData[] | undefined, setCommonError: Dispatch<boolean>, setVentilationError: Dispatch<boolean> ) => {
  data?.filter(( item ) => yvdAddresses.includes(item.address)).forEach(( item ) => {
    if (item.value === YvdStatus.Alarm) {
      setCommonError(true)
    }
  })

  data?.filter(( item ) => GrAddresses.includes(item.address)).forEach(( item ) => {
    if (item.value === GrStatus.Alarm) {
      setCommonError(true)
    }
  })

  data?.filter(( item ) => FlushPumpAddresses.includes(item.address)).forEach(( item ) => {
    if (item.value === FlushPumpStatus.Alarm) {
      setCommonError(true)
    }
  })

  data?.filter(( item ) => VentilationAddresses.includes(item.address)).forEach(( item ) => {
    if (item.value === VentilationStatus.Fire || item.value === VentilationStatus.Gas || item.value === VentilationStatus.LowTemperature) {
      setVentilationError(true)
    }
  })

  data?.filter(( item ) => ConvectorAndHeaterAddresses.includes(item.address)).forEach(( item ) => {
    enum ConvectorAndHeaterVariants {
      Convector1 = 2810,
      Convector2 = 2842,
      Heater1 = 2910,
      Heater2 = 2942
    }
    
    if(item.address === ConvectorAndHeaterVariants.Convector1 || item.address === ConvectorAndHeaterVariants.Convector2) {
      if (item.value === ConvectorStatus.AlarmHighTemperature || item.value === ConvectorStatus.AlarmStarter) {
        setVentilationError(true)
      }
    }

    if(item.address === ConvectorAndHeaterVariants.Heater1 || item.address === ConvectorAndHeaterVariants.Heater2) {
      if (item.value === HeaterStatus.Alarm) {
        setVentilationError(true)
      }
    }
  })

  data?.filter(( item ) => PAddresses.includes(item.address)).forEach(( item ) => {
    if (item.value === PStatus.Alarm) {
      setVentilationError(true)
    }
  })

  data?.filter(( item ) => VAddresses.includes(item.address)).forEach(( item ) => {
    if (item.value === VStatus.Alarm) {
      setVentilationError(true)
    }
  })

  data?.filter(( item ) => HeatingCableAddresses.includes(item.address)).forEach(( item ) => {
    if (item.value === HeatingCableStatus.Alarm) {
      setVentilationError(true)
    }
  })
}

export const getFilteredData = (data: AddressData[]) => {
  const yvdData = data.filter(( item ) => yvdAddresses.includes(item.address));
  const grData = data.filter(( item ) => GrAddresses.includes(item.address));
  const flushPumpData = data.filter(( item ) => FlushPumpAddresses.includes(item.address));

  const ventilationData = data.filter(( item ) => VentilationAddresses.includes(item.address));
  const convectorAndHeaterData = data.filter(( item ) => ConvectorAndHeaterAddresses.includes(item.address));
  const pData = data.filter(( item ) => PAddresses.includes(item.address));
  const vData = data.filter(( item ) => VAddresses.includes(item.address));
  const heatingCableData = data.filter(( item ) => HeatingCableAddresses.includes(item.address));

  return {
    yvdData,
    grData,
    flushPumpData,
    ventilationData,
    convectorAndHeaterData,
    pData,
    vData,
    heatingCableData
  }
}
