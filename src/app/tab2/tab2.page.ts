import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
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

  constructor(private assignment:AssignmentServicesService, 
    private dataService: DataService) {}
  ngOnInit(): void {}

  createAssignment() {
    console.log(this.title,this.phone);
    let body={
        userId: this.dataService.user._id,
        title: this.title,
        deadline: this.date,
        sendEmail: true,
        sendWhatsapp: true
    }
    this.assignment.createAssignment(body).toPromise()
      .then(data=>{
        console.log(data);
      })
      .catch(err=>{
        console.log(err);
      });
  }

  fillWithSample() {
    this.title = "Sample Assignment";
    this.phone = "8286143280";
    this.date = "2020-01-01";
  }
  
}
