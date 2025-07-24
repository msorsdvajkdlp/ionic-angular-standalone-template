import { makeEnvironmentProviders } from '@angular/core';
// import { ExampleService } from '../app/core/example.service';
// import { ExampleServiceMock } from './example.service.mock';

export function provideTestingMocks() {
  return makeEnvironmentProviders([
    // { provide: ExampleService, useClass: SecureStorageServiceMock }
  ]);
}
