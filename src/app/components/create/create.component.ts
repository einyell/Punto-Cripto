import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';
import { tap } from 'rxjs';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;

  public CoinForm: FormGroup

  constructor(
    private usersService: UsersService,
    public coinService: CoinService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.CoinForm = this.formBuilder.group({
      coin: [''],
      price: [''],
      amount: [''],
      date: [''],
      notes: [''],
      user: [''],
    })
  }

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.CoinForm.patchValue({ ...user });
      });
  }


  onSubmit() {
    this.coinService.createCoin(this.CoinForm.value)
    this.router.navigate(['home'])
  }
}
