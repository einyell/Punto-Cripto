import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public CoinForm : FormGroup

  constructor(
    public coinService : CoinService,
    public formBuilder : FormBuilder,
    public router : Router
  ) {
    this.CoinForm = this.formBuilder.group({
    coin : [''],
    price : [''],
    amount : [''],
    date : [''],
    notes : [''],
    user : [''],
    })
   }

  ngOnInit(): void {
  }


  onSubmit() {
    this.coinService.createCoin(this.CoinForm.value)
    this.router.navigate(['home'])
  }
}
