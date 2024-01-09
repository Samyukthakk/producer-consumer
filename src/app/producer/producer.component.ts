import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import BridgeService from "../service/bridge.service";

@Component({
    selector: 'producer',
    template: `
        <form [formGroup]="form" class="form-container">
            <form-field label-text="First name : ">
                <input id="firstname" class="icon-name" formControlName="firstname" placeholder="First name" type="text"/>
            </form-field>
            <form-field label-text="Phone Number : ">
                <input id="phonenumber" class="icon-phone" formControlName="phonenumber" placeholder="Phone"/>
            </form-field>
            <form-field>
                <button id="btnSave" (click)="sendMessageToConsumer()" [disabled]="!form.valid">
                    Save <i class="icon-save" ></i>
                </button>
            </form-field>
        </form>
    `
})
export default class ProducerComponent implements OnInit {
    form!: FormGroup;

    constructor(private formBuilder: FormBuilder,
        private bridgeService: BridgeService) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstname: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
            phonenumber: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[0-9]*')]]
        });
    }

    sendMessageToConsumer(): void {
        this.bridgeService.sendMessage({id: this.getMessageId() , ...this.form.value});
        this.form.reset();
    }

    getMessageId(): number {
       return Math.floor(Math.random() * 1000) + 1;
    }

}