import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { DataService } from '../services/data.service'
import { ElectronService } from '../services/electron.service'
import { EventService } from '../services/events.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  public db: any
  public dbInfo: Object
  public electron: any

  constructor(
    public electronService: ElectronService,
    private data: DataService,
    private events: EventService,
    private router:Router
  ) {
    this.events.subscribe('database:available', (info) => {
      console.log('Database is now available')
      this.db = this.data.db
      this.dbInfo = info
    })
  }

  ngOnInit () {
    const ctx = this

    ctx.electron = ctx.electronService

    if (ctx.electron.isElectronApp) {
      ctx.db = ctx.data.db
      ctx.data.db.info()
      .then(info => ctx.dbInfo = info)
      .catch(err => console.log(err))
    }
  }

  navigate(page:string){
    this.router.navigateByUrl('/tabs/tab2')
    console.log('Navigating to ' + this.router.url)

  }

}

// import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
// import * as io from "socket.io-client";
// import { ChatService } from '../services/chat.service';

// @Component({
//   selector: 'app-tab1',
//   templateUrl: 'tab1.page.html',
//   styleUrls: ['tab1.page.scss']
// })
// export class Tab1Page  implements OnInit {

//   @ViewChild('scrollMe') private myScrollContainer: ElementRef;

//   chats: any;
//   joinned: boolean = false;
//   newUser = { nickname: '', room: '' };
//   msgData = { room: '', nickname: '', message: '' };
//   socket = io.io('http://localhost:4000');

//   constructor(private chatService: ChatService) {}

//   ngOnInit() {
//     var user = JSON.parse(localStorage.getItem("user"));
//     if(user!==null) {
//       this.getChatByRoom(user.room);
//       this.msgData = { room: user.room, nickname: user.nickname, message: '' }
//       this.joinned = true;
//       this.scrollToBottom();
//     }
//     this.socket.on('new-message', function (data) {
//       if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
//         this.chats.push(data.message);
//         this.msgData = { room: user.room, nickname: user.nickname, message: '' }
//         this.scrollToBottom();
//       }
//     }.bind(this));
//   }

//   ngAfterViewChecked() {
//     this.scrollToBottom();
//   }

//   scrollToBottom(): void {
//     try {
//       this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
//     } catch(err) { }
//   }

//   getChatByRoom(room) {
//     this.chatService.getChatByRoom(room).then((res) => {
//       this.chats = res;
//     }, (err) => {
//       console.log(err);
//     });
//   }

//   joinRoom() {
//     var date = new Date();
//     localStorage.setItem("user", JSON.stringify(this.newUser));
//     this.getChatByRoom(this.newUser.room);
//     this.msgData = { room: this.newUser.room, nickname: this.newUser.nickname, message: '' };
//     this.joinned = true;
//     this.socket.emit('save-message', { room: this.newUser.room, nickname: this.newUser.nickname, message: 'Join this room', updated_at: date });
//   }

//   sendMessage() {
//     this.chatService.saveChat(this.msgData).then((result) => {
//       this.socket.emit('save-message', result);
//     }, (err) => {
//       console.log(err);
//     });
//   }

//   logout() {
//     var date = new Date();
//     var user = JSON.parse(localStorage.getItem("user"));
//     this.socket.emit('save-message', { room: user.room, nickname: user.nickname, message: 'Left this room', updated_at: date });
//     localStorage.removeItem("user");
//     this.joinned = false;
//   }

// }