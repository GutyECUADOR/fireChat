import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../interfaces/mensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public mensaje = ''; // Nuevo mensaje que sera enviado
  public htmlElement; // Es el objeto html que recibira el foco del scroll
  constructor(public chatService: ChatService) {
    this.chatService.loadingMessages().subscribe( () => {
      // No recibimos ningun elemento pero podemos realizar logica cada vez que se cargen los mensajes
      this.htmlElement.scrollTop = this.htmlElement.scrollHeight;
    });
  }

  ngOnInit() {
    this.htmlElement = document.getElementById('app-mensajes');
  }

  sendMensaje() {
    if (this.mensaje.length > 0 ) {
      this.chatService.sendMensaje(this.mensaje).then( () => {
        console.log('Mensaje enviado');
        this.mensaje = '';
      }).catch(error => {
        console.error('Error al enviar', error);
      });
    }
  }

}
