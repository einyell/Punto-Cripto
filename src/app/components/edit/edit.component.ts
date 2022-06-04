import { Component, OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup
  coinRef: any

  constructor(
    public coinService: CoinService,
    public formBuilder: FormBuilder,
    public router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.editForm = this.formBuilder.group({
      coin: [''],
      amount: [''],
      price: [''],
      date: [''],
      notes: [''],
    })
  }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.coinService.getCoinByID(id).subscribe(res => {
      this.coinRef = res
      this.editForm = this.formBuilder.group({
        coin: [this.coinRef.coin],
        amount: [this.coinRef.amount],
        price: [this.coinRef.price],
        date: [this.coinRef.date],
        notes: [this.coinRef.notes],
      }
      )
    })
  }
  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.coinService.updateCoin(this.editForm.value, id)
    this.router.navigate(['/home'])
  }

}
