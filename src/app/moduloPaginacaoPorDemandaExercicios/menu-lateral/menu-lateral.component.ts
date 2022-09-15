import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Processo } from '../../Classes/Processo';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})

export class MenuLateralComponent implements OnInit {

  @Output() public enviarDados = new EventEmitter();

  public aleatorio: boolean = false;
  public geraAleatorio: boolean = false;
  public escalonador: string = 'FIFO';
  public nPaginas: number = 1;
  public p = new Processo('A',0,'#228B22',false);
  
  public selectedProcesso = new Processo('', 0, '#000', false);

  public listaProcessos: Array<Processo> = [];
  public listaNomes: Array<string> = ["A", "B", "C", "D"];

  
  
  ngOnInit(): void {
  }
  
  geradorAleatorio():void{
    console.log('infoxXx --' + this.aleatorio);
	
	if(this.aleatorio){
		for (var i = 0; i < this.listaNomes.length; i++) {
      var x = (Number)(Math.round(Math.random() * 2) + 2);
			this.cadastrar(new Processo(this.listaNomes[i], x, this.gera_cor(), false));
		}	
    const input = document.querySelector('#check');
     console.log(input);
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
    // console.log('CADASTRAR --> ' + proc.toString());
    
    if(this.validaP(proc) && this.elementoExiste(proc.nome)==-1)
      {
        if(proc.pagina.length!=0)this.listaProcessos.push(new Processo(proc.nome, proc.pagina.length, this.gera_cor(), proc.bit));
        else this.listaProcessos.push(new Processo(proc.nome, this.nPaginas, this.gera_cor(), proc.bit));
        // this.imprimeProcessosLog();
        this.enviarDados.emit(this.listaProcessos);
      }
    else 
      {this.cancelar();}
    
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
