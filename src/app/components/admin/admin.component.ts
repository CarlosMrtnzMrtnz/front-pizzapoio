import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PizzaPoioService } from '../../services/pizza-poio.service';
import Swal from 'sweetalert2';
import { ListaProductoComponent } from '../templates/lista-producto/lista-producto.component';
import { ListaIngredientesComponent } from '../templates/lista-ingredientes/lista-ingredientes.component';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ListaProductoComponent,
    ListaIngredientesComponent

],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
    formularioProducto: FormGroup
    formularioIngrediente: FormGroup
    private ProductosServices = inject(PizzaPoioService)
    productosData = signal<any>([])
    ingredientesData = signal<any>([])


    constructor(private fb: FormBuilder) {
        this.formularioProducto = this.fb.group({
            nombre: ['', [Validators.required]],
            tipo: ['', [Validators.required]],
            imagen: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            disponibilidad: ['', [Validators.required]],
            ingredientes: ['', [Validators.required]],

        })

        this.formularioIngrediente = this.fb.group({
            nombre: ['', [Validators.required]],
            valor: ['', [Validators.required]],
            cantidad: ['', [Validators.required]],
            disponibilidad: ['', [Validators.required]],
            imagen: ['', [Validators.required]]
        })
    }

    submitProducto () {
        console.log(`formulario ${this.formularioProducto.value}`);
        this.ProductosServices.postProducto(this.formularioProducto.value).subscribe(respuestApi => {

        Swal.fire({
            title: "Usuario creado correctamente!",
            icon: "success"
        })
        let dataApi: any = respuestApi
        this.formularioProducto.reset()

        console.log(`respuesta api ${dataApi}`);

        },
        error => {
            Swal.fire({
                title: "El Correo ya existe!",
                icon: "error"
            })
        }
        );
    }

    submitIngrediente () {
        console.log(`ingredientes form ${this.formularioIngrediente.value}`);
        this.ProductosServices.postIngrediente(this.formularioIngrediente.value).subscribe(respuestaApi => {

        Swal.fire({
            title: "Ingrediente creado correctamente!",
            icon: "success"
        })
        let dataApi: any = respuestaApi
        this.formularioIngrediente.reset()
        console.log(`respusta api ${dataApi}`);

        },
        error => {
            Swal.fire({
                title: "El Ingrediente ya existe!",
                icon: "error"
            })
        })

    }

    listaProductos () {
        this.ProductosServices.getProductos().subscribe({
            next: (productos : any) => {
                this.productosData.set(productos)
            },
            error(err) {
                console.log(err);
            }
        })
    }

    listaIngredientes () {
        this.ProductosServices.getIngredientes().subscribe({
            next: (ingredientes : any) => {
                this.ingredientesData.set(ingredientes)
            },
            error(err) {
                console.log(err);
            }
        })
    }


}
