import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { AuthService } from './auth.service';
import { cold } from 'jasmine-marbles';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let localstorage: LocalStorageService;

  const email = 'anakin@disney.com';
  const password = '!makeamericagreatagain2016!';
  const token = 'Bearer 123456';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: { get: () => {}, post: () => {} } },
        { provide: LocalStorageService, useValue: { getItem: () => {} } },
        AuthService,
      ],
    });

    localstorage = TestBed.inject(LocalStorageService);
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(AuthService);
  });

  it('should create an instance successfully', () => {
    expect(service).toBeDefined();
  });

  it('should log in', () => {
    const user = { user: { email, password } };
    const expected = cold('-a|', { a: user });
    spyOn(http, 'post').and.returnValue(expected);

    expect(service.login(email, password)).toBeObservable(expected);
    expect(http.post).toHaveBeenCalledWith(
      `${AuthService.BASE_URL}/login`,
      user
    );
  });

  it('should get token from localstorage', () => {
    spyOn(localstorage, 'getItem').and.returnValue({ token });
    expect(service.getToken()).toEqual({ token });
  });
});
