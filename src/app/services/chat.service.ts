import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) { }

  getChatByRoom(room) {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/chat/` + room)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  saveChat(data) {
    return new Promise((resolve, reject) => {
        this.http.post(`http://localhost:3000/chat`, data)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}