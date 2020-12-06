import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';

// Importar SweetAlert
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  forma : FormGroup;

  constructor(private fb : FormBuilder,
              private heroesServices : HeroesService,
              private route : ActivatedRoute) {

    this.crearFormulario();
  
   }

  ngOnInit() {
    
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.heroesServices.getHeroe(id)
          .subscribe( (resp:HeroeModel) =>{
            this.heroe = resp;
            this.heroe.id = id;
          })
    }

  }


  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get poderNoValido(){
    return this.forma.get('poder').invalid && this.forma.get('poder').touched
  }


  crearFormulario(){
    this.forma = this.fb.group({
      //firebaseid : [this.heroe.id,[]],
      //nombre : [this.heroe.nombre, [Validators.required]],
      //poder : [this.heroe.poder,[Validators.required]]//,
      firebaseid : ['',[]],
      nombre : ['', [Validators.required]],
      poder : ['',[Validators.required]]//,
      

      //estado : [this.heroe.vivo]
    })

    //this.forma.valueChanges.subscribe(val => {
    //  this.heroe = val;
    //});
  }

  
  guardar(){

    if (this.forma.invalid) {
      console.log("Error en formulario");
      return ;

    }

  

    Swal.fire({
      allowOutsideClick : false,
      title : 'Espere',
      text: 'Guardando información..',
      icon : 'info'
    });

    Swal.showLoading();

    let peticion : Observable<any>;

    if (this.heroe.id){
      peticion = this.heroesServices.actualizarHeroe(this.heroe);

    }else {
      peticion =this.heroesServices.crearHeroe(this.heroe)
    }

     peticion.subscribe( resp => {
        
      Swal.fire({
        title : this.heroe.nombre,
        text: 'Se almaceno corectamente',
        icon : 'success'
      });
  
      });

  }

}
