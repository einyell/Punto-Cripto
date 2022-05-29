import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Coin {
  market_cap_rank: number;
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  coins: Coin[] = [];
  filteredCoins: Coin[] = [];
  api: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  titles: string[] = [
    'Ranking',
    'Icono',
    'Moneda',
    'Simbolo',
    'Precio Actual',
    'Cambio diario',
    'Volumen 24 horas',
    'Cap. de mercado',
  ];

  searchText = '';

  constructor(private http: HttpClient) { }

  searchCoin() {
    this.filteredCoins = this.coins.filter(coin =>
      coin.name.toUpperCase().includes(this.searchText.toUpperCase()) ||
      coin.symbol.toUpperCase().includes(this.searchText.toUpperCase()))
  }



  ngOnInit() {
    this.http.get<Coin[]>(this.api).subscribe((res) => {
      this.coins = res;
      this.filteredCoins = res;
      console.log(res);
    }
    );
  }

}
