import { Separator } from '@/shared/ui/separator';
import { AddressData } from '../../shared/types/types';
import { YvdComponent } from '../common-block/yvd/yvd';
import { TemplateType } from './template-const';
import { GrComponent } from '../common-block/gr/gr';
import { FlushPumpComponent } from '../common-block/flush-pump/flush-pump';
import { PComponent } from '../ventilation-block/p/p';
import { VComponent } from '../ventilation-block/v/v';
import { ConvectorAndHeaterComponent } from '../ventilation-block/convector-and-heater/convector-and-heater';
import { HeatingCableComponent } from '../ventilation-block/heating-cable/heating-cable';

export function ElementTemplate({
  description,
  items,
  templateType,
}: {
  description: string, 
  items: AddressData[],
  templateType: TemplateType,
}) {
  const separatorCheck = () => (templateType === TemplateType.ConvectorAndHeater || templateType === TemplateType.Gr1 || templateType === TemplateType.P || templateType === TemplateType.V || templateType === TemplateType.Yvd)
  
  return  <div className="grid gap-3">
            <div className="font-bold ml-3 mt-2">{description}</div>
            <div className={templateType === TemplateType.HeatingCable ? 'grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-2' : 'grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4'}>
              {items.map(( item ) => {
                if (templateType === TemplateType.Yvd) {
                  return <YvdComponent key={item.address} item={item}/>
                }

                if (templateType === TemplateType.Gr1) {
                  return <GrComponent key={item.address} item={item}/>
                }

                if (templateType === TemplateType.FlushPump) {
                  return <FlushPumpComponent key={item.address} item={item}/>
                }
                
                if (templateType === TemplateType.ConvectorAndHeater) {
                  return <ConvectorAndHeaterComponent key={item.address} item={item}/>
                }

                if (templateType === TemplateType.P) {
                  return <PComponent key={item.address} item={item}/>
                }

                if (templateType === TemplateType.V) {
                  return  <VComponent key={item.address} item={item}/>
                }

                if (templateType === TemplateType.HeatingCable) {
                  return <HeatingCableComponent key={item.address} item={item}/>
                }
              })}
            </div>
            {separatorCheck() && <Separator className='mb-1'/>}
          </div>
}
