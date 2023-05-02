import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlineDirective } from './directives/online.directive';
import { LocacionPipe } from './pipes/locacion.pipe';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';


@NgModule({
  declarations: [
    OnlineDirective,
    LocacionPipe,
    NombreCompletoPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    OnlineDirective,
    LocacionPipe,
    NombreCompletoPipe]
})
export class SharedModule { }
