import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-app';

  public userInput: any;

  //instance d'un observable WebSocket
  private _socket: WebSocketSubject<any>;

  //Tableau pour recevoir les messages du serveur
  public serverMessages: any[];

  constructor() {
    console.log('Connexion client WebSocket');

    this._socket = new WebSocketSubject('ws:127.0.0.1:8999');

    //initialise le tableau des messages
    this.serverMessages = [];

    //Juste pour tester la comm sortante
    //this._send();

    this._socket
      .subscribe((message) => {
        console.log('le serveur envoie ' + JSON.stringify(message));
        this.serverMessages.push(message);
      },
        (err) => console.error('erreur levée: ' + JSON.stringify(err)),
        () => console.warn('completed')
      );
  }

  public _send(): void {
  console.log('envoie un nouveau message vers le serveur');
  this._socket.next(this.userInput);
  this.userInput="";
  }

}
