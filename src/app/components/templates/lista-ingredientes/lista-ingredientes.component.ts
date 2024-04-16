import { Component, Input, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { PizzaPoioService } from '../../../services/pizza-poio.service';

@Component({
  selector: 'app-lista-ingredientes',
  standalone: true,
  imports: [],
  templateUrl: './lista-ingredientes.component.html',
  styleUrl: './lista-ingredientes.component.css'
})
export class ListaIngredientesComponent {
    private ingredientesServices = inject(PizzaPoioService)


    @Input() rutaNombre!: string
    @Input() rutaIngredientes!: string
    @Input() rutaValor!: number
    @Input() rutaImagen!: string
    @Input() rutaId!: string
    @Input() rutaTipo!: string
    @Input() rutaCantidad!: string



    // eliminarIngrediente(idIngrediente: string) {
    //     try {
    //             let mensaje =
    //                 'Tenga en cuenta que al eliminar esta publicacion no se podrá restablecer';
    //             // console.log(idPublicacion);

    //             const result = Swal.fire({
    //                 title: '¿Estás seguro que quieres eliminar este producto?',
    //                 icon: 'question',
    //                 text: mensaje,
    //                 showCancelButton: true,
    //                 confirmButtonColor: '#3085d6',
    //                 cancelButtonColor: '#d33',
    //                 confirmButtonText: 'Si, eliminar!',
    //                 cancelButtonText: 'No, cancelar!',
    //             }).then((result) => {

    //             if (result) {
    //                 this.ingredientesServices.deleteIngrediente(idIngrediente).toPromise()

    //                 Swal.fire({
    //                     title: 'Ingrediente eliminado correctamente!',
    //                     icon: 'success',
    //                 });
    //                 setTimeout(() => {
    //                     // location.reload();
    //                 }, 2000);
    //             }

    //     }} catch (error) {

    //     }
    // }
    eliminarIngrediente(idIngrediente: string) {
        try {
            console.log(idIngrediente);

            this.ingredientesServices.deleteIngrediente(idIngrediente).subscribe({

            })
            Swal.fire({
                title: "Ingrediente Eliminado correctamente!",
                icon: "success"
            })
        } catch (error) {
            Swal.fire({
                title: "No se pudo Eliminar el Ingrediente!",
                icon: "error"
            })
        }
    }

}
