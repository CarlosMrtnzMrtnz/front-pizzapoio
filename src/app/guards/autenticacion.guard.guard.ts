import { inject  } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { PizzaPoioService } from '../services/pizza-poio.service';

export const autenticacionGuardGuard: CanMatchFn = (route, segments) => {
    const pizzaPoio = inject(PizzaPoioService)
    return pizzaPoio.estaLogueado()
};
