import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { AlertCircle } from "lucide-react";

export function ErrorComponent() {
  return  <div className="flex h-screen justify-center items-center">
            <Alert variant="destructive" className="w-1/4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Ошибка</AlertTitle>
              <AlertDescription>
                Нет связи с контроллером
              </AlertDescription>
            </Alert>
          </div>;
}
