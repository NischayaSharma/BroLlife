import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AssignmentServicesService {

  constructor(private http:HttpClient) { }

  createAssignment(body:any){
    return this.http.post('http://localhost:3000/assignment/create',body);
  }

  createUser(body:any){
    return this.http.post('http://localhost:3000/user/register',body);
  }
}
