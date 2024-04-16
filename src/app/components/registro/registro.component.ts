import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PizzaPoioService } from '../../services/pizza-poio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
formularioUsuario: FormGroup
private usuariosServices = inject(PizzaPoioService)
regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/


constructor (private fb: FormBuilder) {
    this.formularioUsuario = this.fb.group({
        nombre: ['',[Validators.required]],
        apellido: ['',[Validators.required]],
        telefono: ['',[Validators.required]],
        email: ['',[Validators.required, Validators.pattern(this.regexEmail)]],
        clave: ['',[Validators.required]],
        roll: ['',[Validators.required]]
    })
}

submitUsuario () {
    console.log(`formulario usuario ${this.formularioUsuario.value}`);

    this.usuariosServices.postUsuario(this.formularioUsuario.value).subscribe(respuestaApi => {
        Swal.fire({
            title: "Usuario creado correctamente",
            icon: "success"
        })
        let dataApi : any = respuestaApi
        console.log(dataApi);
        this.formularioUsuario.reset()

    },
    error => {
        Swal.fire({
            title: "El Prodcuto ya existe!",
            icon: "error"
        })
    })
    const inputs = document.querySelectorAll(".form-control");


}


}
