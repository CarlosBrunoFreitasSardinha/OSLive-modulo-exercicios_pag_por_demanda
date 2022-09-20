import { Component, EventEmitter, OnInit, Output, AfterContentChecked } from '@angular/core';
import { count } from 'rxjs';
import { Processo } from '../../Classes/Processo';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})

export class MenuLateralComponent implements OnInit, AfterContentChecked {

  @Output() public enviarRespostaMemoriaLogica:EventEmitter<any> = new EventEmitter();
  @Output() public enviarDados:EventEmitter<any> = new EventEmitter();
  
  @Output() public enviarTipoExercicio:EventEmitter<any> = new EventEmitter();
  @Output() public enviarTipoAlgoritmo:EventEmitter<any> = new EventEmitter();

  public aleatorio: boolean = false;
  public geraAleatorio: boolean = false;
  public nPaginas: number = 1;
  public p = new Processo('A',0,'#228B22',false);
  
  public selectedProcesso = new Processo('', 0, '#000', false);

  public listaProcessos: Array<Processo> = [];
  public respostaMemoriaLogica: Array<Processo> = [];
  public listaNomes: Array<string> = ["A", "B", "C", "D"];
  public listaDeExercicios: Array<{tipo:string, exec: Number}> =[
                            {tipo:"Sequência de Alocação da Memória Física", exec: 0},
                            {tipo:"Preencher Memória Lógica", exec: 1},
                            {tipo:"Preencher Memória Fisica", exec: 2},
                            {tipo:"Determinar Página Vítima", exec: 3},
                          ];
  public algoritmoEscalonamento: Array<{tipo:string, exec: Number}> =[
                            {tipo:"FCFS (first-come-first-served)", exec: 0},
                            {tipo:"Histórico de bits de referência", exec: 1},
                            {tipo:"Segunda Chance", exec: 2},
                          ];

  public exercicioSelecionado:{tipo:string, exec: Number} = {tipo:"", exec: 0};
  public escalonador: {tipo:string, exec: Number} = {tipo:"", exec: 0};

  
  
  ngOnInit(): void {
  }
  
  ngAfterContentChecked(): void {
  }

  escolheExercicio(event:any){
    const arr = event.target.value.split(',');    
    this.exercicioSelecionado={tipo:arr[0], exec: Number(arr[1])};
    console.log("numExecEmitido: "+Number(arr[1]))
    this.enviarTipoExercicio.emit(Number(arr[1]));
  }

  escolheEscalonador(event:any){
    const arr = event.target.value.split(',');    
    this.escalonador={tipo:arr[0], exec: Number(arr[1])};
    console.log("numEscalonadorEmitido: "+Number(arr[1]))
    this.enviarTipoAlgoritmo.emit(Number(arr[1]));
  }
  
  geradorAleatorio():void{
    console.log('infoxXx --' + this.aleatorio);
	
      if(this.aleatorio){
        for (var i = 0; i < this.listaNomes.length; i++) {
          var x = (Number)(Math.round(Math.random() * 2) + 2);
          this.cadastrar(new Processo(this.listaNomes[i], x, this.gera_cor()));
        }	
        // const input = document.querySelector('#check');
        // console.log("input->")
        // console.log(input.v);
      }else{
        console.log('-- .:: xXx ::. --' );      
        }
    this.aleatorio = false;
  }

  gera_cor(): string{		// gera cor aleatoria
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';
    // Pega um número aleatório no array acima
    for (var i = 0; i < 6; i++ ) {
    //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  elementoExiste(str:string):number{
    for(var i=0; i<this.listaProcessos.length;i++){
      if(this.listaProcessos[i].nome == str){
        return i;
      }
    }
    return -1;
  }

  excluir(proc: Processo):void{ 
    // console.log('REMOVER ----------------> ' + proc.toString());
    var v:number = this.elementoExiste(proc.nome);
    if(v!=-1 && this.validaP(proc)){
      this.listaProcessos.splice(v,1);
      console.log('Sucesso!!! '+v);
    }
  }

  cadastrar(proc: Processo):void{ 
    console.log('CADASTRAR --> ' + proc.toString());
    
    if(this.validaP(proc) && this.elementoExiste(proc.nome)==-1){

        if(proc.pagina.length!=0){
          this.listaProcessos.push(new Processo(proc.nome, proc.pagina.length, this.gera_cor(), proc.bit));
          this.respostaMemoriaLogica.push(new Processo(proc.nome, proc.pagina.length, this.gera_cor(), proc.bit));
        }
        else{
          this.listaProcessos.push(new Processo(proc.nome, this.nPaginas, this.gera_cor(), proc.bit));
          this.respostaMemoriaLogica.push(new Processo(proc.nome, this.nPaginas, this.gera_cor(), proc.bit));
        } 
        this.enviarDados.emit(this.listaProcessos);
        this.enviarRespostaMemoriaLogica.emit(this.respostaMemoriaLogica);
        this.enviarRespostaMemoriaLogica = new EventEmitter();
      }
    else {this.cancelar();}
    
  }

  validaP(proc: Processo):boolean{
    if (proc.nome == '' || this.nPaginas == 0) return false;
    else {
      for(let i of proc.pagina){
        if(i.timeStamp!=0) return false;
      }
    }
    
    return true;
  }

  cancelar():void{
    console.log('<---------------- OPERAÇÃO CANCELADA ----------------> ');
    this.p.nome = '';
    this.p.pagina = [];
    this.p.bit = false;
  }

  onSelect(proc: Processo): void {
    // this.selectedProcesso = proc;
  }
  constructor(){}
}
