import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './moduloPaginacaoPorDemandaExercicios/menu-lateral/menu-lateral.component';
import { AreaExercicioComponent } from './moduloPaginacaoPorDemandaExercicios/area-exercicio/area-exercicio.component';
import { AnimacaoTempoExecucaoComponent } from './moduloPaginacaoPorDemandaExercicios/animacao-tempo-execucao/animacao-tempo-execucao.component';
import { FormsModule } from '@angular/forms';
import { HomePaginacaoPorDemandaExerciciosComponent } from './moduloPaginacaoPorDemandaExercicios/home-paginacao-por-demanda-exercicios/home-paginacao-por-demanda-exercicios.component';
import { PaginaVitimaComponent } from './pagina-vitima/pagina-vitima.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    AreaExercicioComponent,
    AnimacaoTempoExecucaoComponent,
    HomePaginacaoPorDemandaExerciciosComponent,
    PaginaVitimaComponent,
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
