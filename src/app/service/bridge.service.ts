import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { UserInfo } from "../model";

@Injectable({
    providedIn: "root"
})
export default class BridgeService implements OnInit {

    private eventBus: Subject<UserInfo> = new Subject();

    ngOnInit(): void {
    }

    sendMessage (userInfo: UserInfo): void {
        this.eventBus.next(userInfo);
    }    

    getEventBus(): Subject<UserInfo> {
        return this.eventBus;
    }

}