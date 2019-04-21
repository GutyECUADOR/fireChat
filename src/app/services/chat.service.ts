import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[];
  public usuario: any;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(userAuthenticated => {
      console.log('Usuario Authenticado', userAuthenticated); // Objecto de firebase con toda la info del usuario
      if (this.usuario) {
        this.usuario.nombre = userAuthenticated.displayName;
        this.usuario.ID = userAuthenticated.uid;
      }
    });

  }

  /*Revisar documentacion de Firebase  */
  public loadingMessages() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.limit(10).orderBy('fecha', 'asc') );

    return this.itemsCollection.valueChanges()// Retornamos el observable
      .pipe(map((res: Mensaje[]) => {
        console.log(res);
        this.chats = res;
      }));
  }

  public login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  public sendMensaje(texto) {
    const mensaje: Mensaje = {
      usuario: 'Jose',
      mensaje: texto,
      fecha: Date.now()
    };
    console.log(mensaje);
    return this.itemsCollection.add(mensaje); // Metodo retorna una promesa

  }
}
