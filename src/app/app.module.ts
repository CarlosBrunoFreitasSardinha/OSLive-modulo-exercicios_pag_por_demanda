import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './Modulos/moduloPaginacaoPorDemandaExercicios/menu-lateral/menu-lateral.component';
import { AreaExercicioComponent } from './Modulos/moduloPaginacaoPorDemandaExercicios/area-exercicio/area-exercicio.component';
import { HomePaginacaoPorDemandaExerciciosComponent } from './Modulos/moduloPaginacaoPorDemandaExercicios/home-paginacao-por-demanda-exercicios/home-paginacao-por-demanda-exercicios.component';
import { PaginaVitimaComponent } from './Modulos/moduloPaginacaoPorDemandaExercicios/pagina-vitima/pagina-vitima.component';
import { HomeProjectComponent } from './pages/home-project/home-project.component';
import { InfortivoComponent } from './Modulos/moduloPaginacaoPorDemandaExercicios/infortivo/infortivo.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    AreaExercicioComponent,
    HomePaginacaoPorDemandaExerciciosComponent,
    PaginaVitimaComponent,
    HomeProjectComponent,
    InfortivoComponent,
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
