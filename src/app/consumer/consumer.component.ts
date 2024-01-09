import { AfterViewInit, Component, OnInit } from "@angular/core";
import BridgeService from "../service/bridge.service";
import { STORAGE_KEY, UserInfo } from "../model";

@Component({
    selector: 'consumer',
    template: `
        <div id="consumer-container">
            <div *ngFor="let userInfo of dataProvider">
                <message-component [dataProvider]="userInfo"
                    (onDelete)="onMessageDelete($event)"></message-component>
            </div>
        </div>`
})
export default class ConsumerComponent implements OnInit, AfterViewInit {

    dataProvider: UserInfo[] = [];

    constructor(private bridgeService: BridgeService) {}

    ngOnInit(): void {
        this.bridgeService.getEventBus().subscribe((userInfo: UserInfo) => {
            this.handleMessage(userInfo);
        });
    }

    ngAfterViewInit(): void {
        // this.scrollToBottom();
    }

    handleMessage(userInfo: UserInfo): void {
        this.dataProvider.push(userInfo);
        this.scrollToBottom();
    }

    onMessageDelete(userInfo: UserInfo): void {
        this.dataProvider = this.dataProvider.filter(data =>
            (data.id !== userInfo.id));
    }

    scrollToBottom(): void {
        let divObj: HTMLElement | null = document.getElementById("consumer-container");
            setTimeout(() => {
                if (divObj != null) {
                    divObj.scrollTop = divObj?.scrollHeight;
                }
            });
    }

}