import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { ShopFormService } from 'src/app/service/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice:number =0;
  totalQuantity:number=0;
  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];
  countries:Country[]=[];
  customerAddressStates:State[]=[];
  storage:Storage=sessionStorage;
  constructor(private formBuilder:FormBuilder,
    private shopService:ShopFormService,private cartService:CartService,
    private checkoutService:CheckoutService,private router:Router) { }

  ngOnInit(): void {
    this.reviewCartDetails();
    this.checkoutFormGroup=this.formBuilder.group(
      {
        customer:this.formBuilder.group(
          {
            firstName:new FormControl('',[Validators.required,Validators.minLength(2)]),
            lastName:new FormControl('',[Validators.required,Validators.minLength(2)]),
            email:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
          }
        ),
        customerAddress:this.formBuilder.group({
          street:new FormControl('',[Validators.required,Validators.minLength(2)]),
          city:new FormControl('',[Validators.required,Validators.minLength(2)]),
          country:new FormControl('',[Validators.required]),
          state:new FormControl('',[Validators.required]),
          zipCode:new FormControl('00-000',[Validators.required,Validators.minLength(2)]),
          
        }),
        creditCard:this.formBuilder.group({
          cardType:[''],
          nameOnCard:[''],
          cardNumber:[''],
          securityCode:[''],
          expirationMonth:[''],
          expirationYear:['']
          
        })

      }
    );
    const startMonth:number=new Date().getMonth()+1;
    console.log("startMonth "+startMonth);
    this.shopService.getCreditCartMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths=data;
      }
    );
    this.shopService.getCreditCartyears().subscribe(
      data=>{
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears=data;
      }
    );

    this.shopService.getCountries().subscribe(
      data=>{
        console.log("Retriced countries:" +JSON.stringify(data));
        this.countries=data;
      }
    )
  }

  reviewCartDetails() {
    
    this.cartService.totalQuantity.subscribe(
      totalQuantity=> this.totalQuantity=totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice=> this.totalPrice=totalPrice
    );
  }
  get firstName(){  return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName(){  return this.checkoutFormGroup.get('customer.lastName'); }
  get email(){  return this.checkoutFormGroup.get('customer.email'); }
  get customerAddressStreet(){  return this.checkoutFormGroup.get('customerAddress.street'); }
  get customerAddressCity(){  return this.checkoutFormGroup.get('customerAddress.city'); }
  get customerAddressState(){  return this.checkoutFormGroup.get('customerAddress.state'); }
  get customerAddressCountry(){  return this.checkoutFormGroup.get('customerAddress.country'); }
  get customerAddressZipCode(){  return this.checkoutFormGroup.get('customerAddress.zipCode'); }
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
  onSubmit(){
    console.log("Handling the submit button");
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.customerAddress = this.checkoutFormGroup.controls['customerAddress'].value;
    const customerState:State=JSON.parse(JSON.stringify(purchase.customerAddress.state));
    const customerCountry: Country = JSON.parse(JSON.stringify(purchase.customerAddress.country));
    purchase.customerAddress.state=customerState.name;
    purchase.customerAddress.country=customerCountry.name;
    purchase.order = order;
    purchase.orderItems = orderItems;
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();

      },
      error: err => {
        alert(`There was an error: ${err.message}`);
      }
    }
  );
  }
  resetCart() {
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products");
  }
  handleMonthsAndYears()
  {
    const creditCardFormGroup=this.checkoutFormGroup.get('creditCard')!;
    const currentYear:number=new Date().getFullYear();
    const selectedYear:number =Number(creditCardFormGroup.value.expirationYear);

    let startMonth:number;
    if(currentYear==selectedYear)
    {
      startMonth=new Date().getMonth()+1;
    }else{
      startMonth=1;
    }
    this.shopService.getCreditCartMonths(startMonth).subscribe(
      data=>{
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths=data;
      }
    )
    
  }
  getStates(formGroupName:string)
  {
    
    const formGroup = this.checkoutFormGroup.get(formGroupName)!;
    const countryCode=formGroup.value.country.code;
    //const countryName=formGroup.value.country.name;

    this.shopService.getStates(countryCode).subscribe(
      data=>{
        
          this.customerAddressStates=data;
        
         // formGroup.get('state').setValue(data[0]);
      }
    )
    
  };

}
