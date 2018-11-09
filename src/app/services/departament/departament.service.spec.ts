import { TestBed, inject } from '@angular/core/testing';

import { DepartamentService } from './departament.service';

describe('DepartamentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepartamentService]
    });
  });

  it('should be created', inject([DepartamentService], (service: DepartamentService) => {
    expect(service).toBeTruthy();
  }));
});
