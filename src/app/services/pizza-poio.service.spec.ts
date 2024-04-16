import { TestBed } from '@angular/core/testing';

import { PizzaPoioService } from './pizza-poio.service';

describe('PizzaPoioService', () => {
  let service: PizzaPoioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzaPoioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
