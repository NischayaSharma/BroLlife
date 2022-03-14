import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { DataService } from '../../services/data.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent implements OnInit {
  message = "";
  chatLoaded = false;
  chats: any = [];
  socket = io.io('http://localhost:4000');
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  constructor(
    private dataService: DataService,
    private chatService: ChatService,
  ) { }

  ngOnInit() {
    this.chatService.getChatByRoom('SampleRoom').then(res => {
      this.chats = res;
      this.chatLoaded = true;
    })
    this.socket.on('new-message', function (data) {
      if(data.message.room === JSON.parse(localStorage.getItem("user")).room) {
        this.chats.push(data.message);
        this.scrollToBottom();
        console.log(data)
      }
    }.bind(this));
  }

  me(userId) {
    return userId === '61f43696f6bc4e5ba22f042c' ? true : false;
  }

  scrollToBottom(){
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err)
    }
  }

  sendMessage() {
    const mssg = {
      room: 'SampleRoom',
      nickname: 'SampleNickname',
      message: this.message,
      messageFrom: this.dataService.user._id
    }
    this.chatService.saveChat(mssg).then(res => {
      console.log(res);
      this.socket.emit('save-message', res); 
    });
  }

}
