import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserInfo } from "../model";

@Component({
    selector: "message-component",
    template: `
        <div class="message-container">
            <div class="message-label-container">
                <label> First Name : {{data.firstname}}</label>
                <label> Phone Number : {{data.phonenumber}}</label>
            </div>
            <div class="delete-btn-container">
                <img class="delete-btn" src="../assets/delete.png" (click)="onDelete()"/>
            </div>
        </div>
    `
})
export default class MessageComponent implements OnInit {

    @Input("dataProvider")
    data!: UserInfo

    @Output("onDelete")
    eventEmmiter: EventEmitter<UserInfo> = new EventEmitter();

    ngOnInit(): void {
    }

    onDelete(): void {
        this.eventEmmiter.emit(this.data);
    }


}