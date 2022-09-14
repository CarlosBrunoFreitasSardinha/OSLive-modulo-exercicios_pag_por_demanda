import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';
import { FIFO } from '../FIFO';
import { MemoriaFisica } from '../MemoriaFisica';
import { Pagina } from '../Pagina';

@Component({
  selector: 'app-animacao-tempo-execucao',
  templateUrl: './animacao-tempo-execucao.component.html',
  styleUrls: ['./animacao-tempo-execucao.component.css']
})
export class AnimacaoTempoExecucaoComponent implements OnInit, AfterContentChecked {
  
  @Input() public filaFIFO: FIFO = new FIFO();


  constructor() { }
  ngAfterContentChecked(): void {
    // this.listaAnimacaoAlocacaoMemoriaFisica = [];
    // for(let i of this.listaMemoriaFisica){
    //   this.listaAnimacaoAlocacaoMemoriaFisica.push(i);
    // }
    // this.listaAnimacaoAlocacaoMemoriaFisica = this.aplicarEscalonamento(this.listaAnimacaoAlocacaoMemoriaFisica);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  ngOnInit(): void {}

}
