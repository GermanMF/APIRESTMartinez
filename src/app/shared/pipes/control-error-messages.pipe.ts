import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessages'
})
export class ControlErrorMessagesPipe implements PipeTransform {

  transform(error: any, field?: string, ...args: unknown[]): unknown {
    console.log("Aqui error" + error.key);
    if (!error) return;

    let defaultMsg = 'Error desconocido';
    const opciones: Record<string, string> = {
      required: 'Campo requerido',
      minLenght: `Se esperan al menos ${error.value.requiredLenght} caracteres`,
      email: 'El valor debe ser un e-mail valido',
      maxlength: `Se esperan ${error.value.requiredLenght} caracteres como máximo`,
      max: `Máximo ${error.value.max} ${field}`,
      min: `Mínimo ${error.value.min} ${field}`
    }

    if (opciones[error.key]){
      defaultMsg = opciones[error.key]
    }
    return defaultMsg;
  }

}
