import { Component, OnInit } from '@angular/core';
import { TAM } from 'src/app/Bibliotecas/Constantes';

@Component({
  selector: 'app-infortivo',
  templateUrl: './infortivo.component.html',
  styleUrls: ['./infortivo.component.css']
})
export class InfortivoComponent implements OnInit {
  public title: string = "Determine a Página Vítima";
  
  TAM: number = TAM;

  constructor() { }

  ngOnInit(): void {
  }

}
