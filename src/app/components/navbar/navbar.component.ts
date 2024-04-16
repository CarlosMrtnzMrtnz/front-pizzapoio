 import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PizzaPoioService } from '../../services/pizza-poio.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    private services = inject(PizzaPoioService)
    formularioPedido: FormGroup

    nombrex!:string
    cantidadx!:string
    nombrePayload!:string
    rollPayload!:string
    idUsuarioPayload!: string;
    inputCorreo = new FormControl()
    inputClave = new FormControl()

    myCarts = this.services.myCarts

    constructor(private router: Router, private fb: FormBuilder){
        this.formularioPedido = this.fb.group({
            estado: ['pendiente',],
            IdUsuadio: [`${this.idUsuarioPayload}`,],
            nombre: [`${this.nombrePayload}`,],
            productos: ['',],
            total: ['',],
        })
    }

    ingresoUsuario () {
        let email = this.inputCorreo.value
        let clave = this.inputClave.value
        this.services.postIngresoUsuario({email, clave}).subscribe(data =>{
            console.log(data);
            let dataApi:any = data
            sessionStorage.setItem('token', dataApi.token)
            location.reload()

        }, err => {
            console.log(err);
            Swal.fire({
                title: 'Ingrese los datos correctamente!',
                icon: 'error',
            });
        })
        console.log(`correo = ${this.inputCorreo.value} ---- clave = ${this.inputClave.value}`);
        // this.inputClave.reset()
        // this.inputCorreo.reset()

    }

    payloadInfo() {
        let tokenSession = sessionStorage.getItem('token');
        this.services
            .postDesencriptarPayload(tokenSession)
            .subscribe((respuestaApi: any) => {
                // console.log(respuestaApi);
                this.idUsuarioPayload = respuestaApi.id;
                this.rollPayload = respuestaApi.roll
                this.nombrePayload = respuestaApi.nombre
                // console.log(this.nombrePayload);

            });
    }
    ngOnInit () {
        if (sessionStorage.getItem("token") != null) {
            this.router.navigate(['/'])
            this.payloadInfo()
        }

    }

    clearSessionStorage() {
        sessionStorage.clear();
        location.reload();
    }


    submitPedido() {
        let total = sessionStorage.getItem("total");
        let pedido = sessionStorage.getItem("producto");

        if (total && pedido) {
            try {
                let pedidoListo = JSON.parse(pedido);
                let totalListo = parseInt(total)

                for (const objeto of pedidoListo) {
                    this.nombrex = objeto.nombre;
                    this.cantidadx = objeto.cantidad;
                }

                console.log(pedidoListo);
                console.log(total);
                this.formularioPedido = this.fb.group({
                    estado: ['pendiente',],
                    IdUsuadio: [`${this.idUsuarioPayload}`,],
                    nombre: [`${this.nombrePayload}`,],
                    productos: [`${this.nombrex} X ${this.cantidadx} Unidades`,],
                    total: [`${totalListo}`,],
                })

                this.services.postPedido(this.formularioPedido.value).subscribe(respuestaApi =>{
                    Swal.fire({
                        title: "Pedido realizado correctamente",
                        icon: "success"
                    })
                    let dataApi : any = respuestaApi
                    console.log(dataApi);

                },
                error => {
                    Swal.fire({
                        title: "No se pudo Realizar el Pedido!",
                        icon: "error"
                    })
                })
                }
             catch (error) {
                console.error(error);
            }
        }
    }


    totalProducto(precio: number, unidades:number) {
        return precio * unidades
    }
    deleteProducto(id: string) {
        this.services.deleProducto(id)
    }

    totalCart () {
        const resultado = this.services.totalCart()
        sessionStorage.setItem("total", (resultado).toString())
        return resultado
    }

}
