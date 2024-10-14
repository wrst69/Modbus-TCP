import { Spinner } from "./spinner";

export function FullPageSpinner() {
  return  <div className="inset-0 flex items-center justify-center absolute">
            <Spinner className="w-10 h-10 text-primary" aria-label="Загрузка страницы" />
          </div> 
}
