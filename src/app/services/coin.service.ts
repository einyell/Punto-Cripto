import { Injectable } from '@angular/core';

//IMPORTAMOS LAS CLASES DE FIRESTORE
import { AngularFirestore } from '@angular/fire/compat/firestore';

//IMPORTAMOS NUESTRO MODELO DE MONEDA
import { Coin } from 'src/app/models/coin';

@Injectable({
  providedIn: 'root'
})

export class CoinService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCoins() {
    return this.angularFirestore.collection("coins").snapshotChanges()
  }

  getCoinByID(id) {
    return this.angularFirestore.collection("coins").doc(id).valueChanges()
  }

  getCoinByuser(user) {
    return this.angularFirestore.collection("coins").doc(user).valueChanges()
  }

  createCoin(coin: Coin) {
    return new Promise<any>((reolve, reject) => {
      this.angularFirestore.collection("coins").add(coin).
        then((response) => {
          console.log(response)
        },
          (error) => {
            reject(error)
          })
    }

    )
  }

  updateCoin(coin: Coin, id) {
    return this.angularFirestore.collection("coins").doc(id).update({
      amount: coin.amount,
      coin: coin.coin,
      date: coin.date,
      notes: coin.notes
    })
  }

  deleteCoin(coin) {
    return this.angularFirestore.collection("coins").doc(coin.id).delete();
  }

  deletePost(coin) {
    return this.angularFirestore
      .collection("coins")
      .doc(coin.id)
      .delete();
  }

}
