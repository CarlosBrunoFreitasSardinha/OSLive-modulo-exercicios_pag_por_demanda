import { TmplAstBoundAttribute } from '@angular/compiler';
import { AfterContentChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FIFO } from '../../Classes/FIFO';
import { MemoriaFisica } from '../../Classes/MemoriaFisica';
import { Processo } from '../../Classes/Processo';

@Component({
  selector: 'app-area-exercicio',
  templateUrl: './area-exercicio.component.html',
  styleUrls: ['./area-exercicio.component.css']
})
export class AreaExercicioComponent implements OnInit, AfterContentChecked {
  public title: string = "Exercícios de Paginação por Demanda com Substituição de Páginas";
  
  @Input() public listaProcessos: Array<Processo> = [];
  @Output() public enviarDadosMemoria = new EventEmitter();

  TAM: number = 8;
  timestamp:number = 100;
  strMemoFisicaCor: string = '#7FB174';
  strMemoVazia: string = '-';

  processos: Array<Processo> = [];
  public memoriaF: Array<MemoriaFisica> = [];//new Date().getTime()
  public fila: FIFO = new FIFO();

  ngOnInit(): void {
    for(var i:number =0; i<this.TAM; i++){
      this.memoriaF.push(new MemoriaFisica(i, this.strMemoVazia, this.strMemoFisicaCor,  0));
    }
  }
  ngAfterContentChecked(): void {
    this.alocaPaginaInicialmente();
  }

  counter(i: number) {
    return new Array(i);
  }

  alocaPaginaInicialmente(){
    for(var i =0; i<this.listaProcessos.length;i++){
      if(!this.listaProcessos[i].bit){
        this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 0);

        if(this.listaProcessos[i].pagina.length > 1) {
          this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 1);
        }

        this.listaProcessos[i].bit = !this.listaProcessos[i].bit;
      }
    }
  }

  paginaStatus(proc: Processo, num:number):void{
    if(proc.pagina[num].timeStamp!=0)this.desalocaPaginaEmMemoriaFisica(proc, num);
    else this.alocaPaginaEmMemoriaFisica(proc, num);
  }

  alocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    console.log("-------------> alocaPaginaEmMemoriaFisica");
    this.fila.addPaginaEmMemoriaFisica(this.memoriaF, proc, num, this.timestamp);
    this.timestamp+=1;
    this.enviarDadosMemoria.emit(this.fila);
    return true;
  }
  
  desalocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    var i = this.fila.removerProcesso(this.memoriaF, proc, num);
    this.enviarDadosMemoria.emit(this.fila);
    console.log("DESALOCA =======");// console.log('Nome: ' + this.memoriaF[i].nome + ' horaCarga ' + this.memoriaF[i].horaCarga);
    if(i!=-1)return true;
    return false;
  }

  constructor() { }
}