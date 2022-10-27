import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePaginacaoPorDemandaExerciciosComponent } from './Modulos/moduloPaginacaoPorDemandaExercicios/home-paginacao-por-demanda-exercicios/home-paginacao-por-demanda-exercicios.component';
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
