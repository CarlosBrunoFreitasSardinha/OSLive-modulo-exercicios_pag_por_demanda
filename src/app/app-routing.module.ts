import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePaginacaoPorDemandaExerciciosComponent } from './moduloPaginacaoPorDemandaExercicios/home-paginacao-por-demanda-exercicios/home-paginacao-por-demanda-exercicios.component';
import { MenuLateralComponent } from './moduloPaginacaoPorDemandaExercicios/menu-lateral/menu-lateral.component';
import { HomeProjectComponent } from './pages/home-project/home-project.component';

const routes: Routes = [
  { path:"", component: HomeProjectComponent, pathMatch: 'full'},
  { path:"PaginacaoPorDemandaExercicios", component: HomePaginacaoPorDemandaExerciciosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
