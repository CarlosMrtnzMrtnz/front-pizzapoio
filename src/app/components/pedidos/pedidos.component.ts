import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PizzaPoioService } from '../../services/pizza-poio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
    formularioPedido: FormGroup


    constructor(private router: Router, private fb: FormBuilder){
        this.formularioPedido = this.fb.group({
            estado: ['',],
            IdUsuadio: ["",],
            nombre: ['',],
            productos: ['',],
            total: ['',],
        })
    }

    private services = inject(PizzaPoioService)
    pedidosData = signal<any>([])
    nombrePayload!:string
    rollPayload!:string
    idUsuarioPayload!: string;


    ngOnInit () {
        this.listaPedidos ()
        this.payloadInfo()
        console.log(this.idUsuarioPayload);

    }

    listaPedidos ( ) {

            this.services.getPedidos().subscribe({
                next: (pedidos : any) => {
                    this.pedidosData.set(pedidos)
                },
                error(err) {
                    console.log(err);
                }
            })
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

    actulizarPedido ( idPedido: string) {
        console.log(idPedido);


        this.services.getUnPedido(idPedido).subscribe({
            next: (pedido) => {
                let dataPedido: any = pedido
                console.log(dataPedido);


                if (dataPedido.estado == "pendiente") {
                    dataPedido.estado = "enviado"
                }


                this.formularioPedido.setValue({
                    estado: dataPedido.estado,
                    IdUsuadio: dataPedido.IdUsuadio,
                    nombre: dataPedido.nombre,
                    productos: dataPedido.productos,
                    total: dataPedido.total,
                })

            this.services.putPedido(idPedido, this.formularioPedido.value).subscribe( respuestaApi => {
                Swal.fire({
                    title: "Pedido actualizado correctamente",
                    icon: "success"
                });
            } )

            },
            error: (err) => {
                console.log(err);
            }
        })
    }

}

