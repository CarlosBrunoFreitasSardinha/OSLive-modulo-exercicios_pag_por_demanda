import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './moduloPaginacaoPorDemandaExercicios/menu-lateral/menu-lateral.component';
import { AreaExercicioComponent } from './moduloPaginacaoPorDemandaExercicios/area-exercicio/area-exercicio.component';
import { HomePaginacaoPorDemandaExerciciosComponent } from './moduloPaginacaoPorDemandaExercicios/home-paginacao-por-demanda-exercicios/home-paginacao-por-demanda-exercicios.component';
import { PaginaVitimaComponent } from './moduloPaginacaoPorDemandaExercicios/pagina-vitima/pagina-vitima.component';
import { HomeProjectComponent } from './pages/home-project/home-project.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    AreaExercicioComponent,
    HomePaginacaoPorDemandaExerciciosComponent,
    PaginaVitimaComponent,
    HomeProjectComponent,
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
