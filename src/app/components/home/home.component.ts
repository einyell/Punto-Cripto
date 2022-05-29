import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';
//MODELO
import { Coin } from 'src/app/models/coin';
//SERVICIO
import { CoinService } from 'src/app/services/coin.service';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  Coins: Coin[]

  constructor(private usersService: UsersService, private coinService: CoinService, private toast: HotToastService) { }

  ngOnInit(): void {
    this.coinService.getCoins().subscribe((res) => {
      this.Coins = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Coin)
        };
      });
      // console.log(this.Coins)
    });
  }
  deleteRecord = (coin) => this.coinService.deleteCoin(coin);
}
