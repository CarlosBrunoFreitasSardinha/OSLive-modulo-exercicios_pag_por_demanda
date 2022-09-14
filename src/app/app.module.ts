import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { AreaExercicioComponent } from './area-exercicio/area-exercicio.component';
import { AnimacaoTempoExecucaoComponent } from './animacao-tempo-execucao/animacao-tempo-execucao.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    AreaExercicioComponent,
    AnimacaoTempoExecucaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
