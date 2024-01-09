import { AfterViewInit, Component, OnInit } from "@angular/core";
import BridgeService from "../service/bridge.service";
import { STORAGE_KEY, UserInfo } from "../model";

@Component({
    selector: 'consumer',
    template: `
        <div id="consumer-container">
            <div *ngFor="let userInfo of dataProvider; index as i">
                <message-component [dataProvider]="userInfo" [sequence]="i"
                    (onDelete)="onMessageDelete($event)"></message-component>
            </div>
        </div>`
})
export default class ConsumerComponent implements OnInit, AfterViewInit {

    dataProvider!: UserInfo[];

    constructor(private bridgeService: BridgeService) {}

    ngOnInit(): void {
        this.bridgeService.getEventBus().subscribe((userInfo: UserInfo) => {
            this.handleMessage(userInfo);
        });
        this.dataProvider = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    }

    ngAfterViewInit(): void {
        // this.scrollToBottom();
    }

    handleMessage(userInfo: UserInfo): void {
        this.dataProvider.push(userInfo);
        this.saveMessage();
    }

    onMessageDelete(userInfo: UserInfo): void {
        this.dataProvider = this.dataProvider.filter(data =>
            (data.id !== userInfo.id));
        this.saveMessage();
    }

    saveMessage(): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.dataProvider));
        this.scrollToBottom();
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