import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { ApiResponse } from '../model/ApiResponse';
import { RegisterUser } from '../model/RegisterUser';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(fakeAsync (() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('registerUser should return expected data', () => {
    const expectedData='Succesfully registered with login id sasha'
    var registerRequest:RegisterUser;

    service.registerUser(registerRequest).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

   const testRequest = httpTestingController.expectOne('http://52.66.199.140:8082/api/v1.0/tweets/register');
    expect(testRequest.request.method).toEqual('POST');

    testRequest.flush(expectedData);
  });

  it('forgotPassword should return expected data', () => {
    const expectedData='Succesfully registered with login id sasha'
    var forgotPass={ques: "In what city were you born?", ans: "dog", newPassword: "qwe"};

    service.forgotPassword(forgotPass,'sasha').subscribe(data => {
      expect(data).toEqual(expectedData);
    });
    
   const testRequest = httpTestingController.expectOne('http://52.66.199.140:8082/api/v1.0/tweets/sasha/forgot');
    expect(testRequest.request.method).toEqual('POST');

    testRequest.flush(expectedData);
  });


  it('getAllusers should return expected data', () => {
    var expectedData:ApiResponse=
    { "success": true, 
  "data":
   [{ "avtar": "avtar1", 
   "loginId": "sam",
    "name": "sam harris" },
   { "avtar": "avtar1",
    "loginId": "sasha", 
    "name": "sam harris" },  
    ], "error": null }

    service.getAllUsers().subscribe(data => {
      expect(data).toEqual(expectedData);
    });
    
   const testRequest = httpTestingController.expectOne('http://3.111.245.87:9090/api/v1.0/tweets/user/all');
    expect(testRequest.request.method).toEqual('GET');

    testRequest.flush(expectedData);
  });

  it('searchUsers should return expected data', () => {
    var expectedData:ApiResponse=
    { "success": true, 
  "data":
   [{ "avtar": "avtar1", 
   "loginId": "sam",
    "name": "sam harris" },
   { "avtar": "avtar1",
    "loginId": "sasha", 
    "name": "sam harris" },  
    ], "error": null }
   

    service.searchUsers('sa').subscribe(data => {
      expect(data).toEqual(expectedData);
    });
    
   const testRequest = httpTestingController.expectOne('http://3.111.245.87:9090/api/v1.0/tweets/user/search/sa');
    expect(testRequest.request.method).toEqual('GET');

    testRequest.flush(expectedData);
  });

  
});
