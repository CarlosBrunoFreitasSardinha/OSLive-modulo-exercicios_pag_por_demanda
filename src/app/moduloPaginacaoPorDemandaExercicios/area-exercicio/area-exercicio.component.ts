
import { AfterContentChecked, Component, DoCheck, AfterViewChecked, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Pagina } from 'src/app/Classes/Pagina';
import { FIFO } from '../../Classes/FIFO';
import { MemoriaFisica } from '../../Classes/MemoriaFisica';
import { Processo } from '../../Classes/Processo';

@Component({
  selector: 'app-area-exercicio',
  templateUrl: './area-exercicio.component.html',
  styleUrls: ['./area-exercicio.component.css']
})
export class AreaExercicioComponent implements OnInit, OnChanges{
  public title: string = "Exercícios de Paginação por Demanda com Substituição de Páginas";
  
  @Input() public listaProcessos: Array<Processo> = [];
  @Input() public exercicioSelecionado:Number = new Number;
  @Output() public enviarDadosMemoria = new EventEmitter();

  TAM: number = 8;
  timestamp:number = 100;
  strMemoFisicaCor: string = '#7FB174';
  strMemoVazia: string = '-';

  public memoriaF: Array<MemoriaFisica> = [];
  public filaAlgoritmoSelecionado: FIFO = new FIFO();

  public respostaMemoriaLogica: Array<Processo> = [];
  public respostaMemoriaFisica: Array<MemoriaFisica> = [];
  public filaDePaginas: Array<Pagina> = [];

  opcaoSelecionada:Array<any> = [];
  opcaoSelecionadaCorrecao:Array<boolean> = [];
  corrigir: boolean = false;

  ngOnInit(): void {
    console.log("ngOnInit")
    for(var i:number =0; i<this.TAM; i++){
      this.memoriaF.push(new MemoriaFisica(i, this.strMemoVazia, this.strMemoFisicaCor,  0));
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges")
    
      for(var i = 0; i<this.listaProcessos.length;i++){
        if(!this.listaProcessos[i].bit){
          this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 0);
  
          if(this.listaProcessos[i].pagina.length > 1) {
            this.alocaPaginaEmMemoriaFisica(this.listaProcessos[i], 1);
          }
  
          this.listaProcessos[i].bit = !this.listaProcessos[i].bit;
        }
      }
     
      if(this.exercicioSelecionado==2 || this.exercicioSelecionado==1){
        if(this.exercicioSelecionado==1)this.respostaMemoriaLogica = [];
          this.filaDePaginas = [];
    
        for(let item of this.listaProcessos){
          if(this.exercicioSelecionado==1){
            this.respostaMemoriaLogica.push(new Processo(item.nome, item.pagina.length, item.cor,));
          }
          else if(this.exercicioSelecionado==2){
            for(let i of item.pagina){// console.log("proc: "+item.nome+" qt"+item.pagina.length+" pag: "+i.toString())
              this.filaDePaginas.push(i);
            }
          }
        }
      }
      this.inicialChange();
      console.log("\n OnChange -> respostaMemoriaLogica")
      console.log(this.respostaMemoriaLogica)
      console.log("\n OnChange -> listaProcessos")
      console.log(this.listaProcessos)
  }
  
  inicialChange():void{
    console.log("\n\t inicialChange")
    if (this.exercicioSelecionado==1){
    }
    if(this.exercicioSelecionado==2){
      
      this.respostaMemoriaFisica = [];

      for(var i:number =0; i<this.TAM; i++){
         this.respostaMemoriaFisica.push(new MemoriaFisica(i, this.strMemoVazia, this.strMemoFisicaCor,  0));
      }
    }
  }

  insereResposta(event: any):void{
    console.log("\n\t InsereResposta")
    const arr = event.target.value.split(',');
    var i = Number(arr[0]);
    var j = Number(arr[1]);
    
    this.respostaMemoriaFisica[i].nome = this.filaDePaginas[j].toString();
    this.respostaMemoriaFisica[i].cor = this.filaDePaginas[j].cor;
    this.opcaoSelecionada[i] = [i,j];
    this.opcaoSelecionadaCorrecao[i] = (this.respostaMemoriaFisica[i].nome == this.memoriaF[i].nome);
  }

  correcao():void{
    this.corrigir=!this.corrigir;
  }

  alocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    console.log("|> ALOCA");
    this.filaAlgoritmoSelecionado.addPaginaEmMemoriaFisica(this.memoriaF, proc, num, this.timestamp);
    
    this.timestamp+=1;
    this.enviarDadosMemoria.emit(this.filaAlgoritmoSelecionado);
    return true;
  }
  
  desalocaPaginaEmMemoriaFisica(proc: Processo, num:number):boolean{
    var i = this.filaAlgoritmoSelecionado.removerProcesso(this.memoriaF, proc, num);
    this.enviarDadosMemoria.emit(this.filaAlgoritmoSelecionado);
    console.log("|> DESALOCA");
    if(i!=-1)return true;
    return false;
  }

  mudaStatusPagina(proc: Processo, num:number):void{
    if(proc.pagina[num].timeStamp!=0)this.desalocaPaginaEmMemoriaFisica(proc, num);
    else this.alocaPaginaEmMemoriaFisica(proc, num);
  }
  counter(i: number) {
    return new Array(i);
  }
  constructor() { }
}