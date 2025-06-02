import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pacientGuard } from './pacient.guard';

describe('pacientGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pacientGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
