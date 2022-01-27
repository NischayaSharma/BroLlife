import { Component, OnInit } from '@angular/core';
import { AssignmentServicesService } from './assignment-services.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  title:string;
  phone:string;
  date:string;
  constructor(private assignment:AssignmentServicesService) {}
  ngOnInit(): void {
    
  }

  createAssignment(){
    console.log(this.title,this.phone);
    let body={
        userId: "123",
        title: this.title,
        deadline: this.date,
        sendEmail: true,
        sendWhatsapp: true
    }
    this.assignment.createAssignment(body).toPromise().then(data=>{
      console.log(data);
    });
  }

  createUser(){
    let body={
      name: "John",
      email: "sidmehta0201@gmail.com",
      phone:"+918286143280",
      userId:"123"
    }
    this.assignment.createUser(body).toPromise().then(data=>{
      console.log(data);
    });

  }
  
}
