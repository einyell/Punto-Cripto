import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UsersService } from 'src/app/services/users.service';
import { tap } from 'rxjs';


@UntilDestroy()
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  constructor(
    private usersService: UsersService,
    public coinService: CoinService,
    public formBuilder: FormBuilder,
    public router: Router
  ) { }

  userRef: any

  addForm = new FormGroup({
    coin: new FormControl(''),
    amount: new FormControl(''),
    price: new FormControl(''),
    date: new FormControl(''),
    notes: new FormControl(''),
    displayName: new FormControl(''),
  });



  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.addForm.patchValue({ ...user });
        console.log(user.displayName);
      });
  }


  onSubmit() {
    this.coinService.createCoin(this.addForm.value)
    this.router.navigate(['home'])
  }
}
