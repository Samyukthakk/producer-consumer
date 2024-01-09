import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import ConsumerComponent from "./consumer.component";
import BridgeService from "../service/bridge.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import FormFieldComponent from "../shared/form-field.component";
import { UserInfo } from "../model";
import { Subject } from "rxjs";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import MessageComponent from "../shared/message.component";

const localStorageData = [
    {
      "id": 200,
      "firstname": "david",
      "phonenumber": "1234567890"
    },
    {
      "id": 510,
      "firstname": "rotterdam",
      "phonenumber": "0987654321"
    },
    {
      "id": 263,
      "firstname": "testone",
      "phonenumber": "4567890123"
    },
    {
      "id": 720,
      "firstname": "amsterdam",
      "phonenumber": "2345670981"
    },
    {
      "id": 95,
      "firstname": "beurs",
      "phonenumber": "1234567890"
    }
  ];

describe("Consumer component", () => {
    let component: ConsumerComponent;
    let fixture: ComponentFixture<ConsumerComponent>;
    let bridgeServiceSpy: BridgeService;
    let eventBus: Subject<UserInfo> = new Subject();

    beforeEach(waitForAsync(() => {
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return JSON.stringify(localStorageData);
            }
        }
        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        bridgeServiceSpy = jasmine.createSpyObj(BridgeService, ["sendMessage", "getEventBus"]);
        Object.getOwnPropertyDescriptor(bridgeServiceSpy, "getEventBus")?.value.and.returnValue(eventBus);
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ConsumerComponent, FormFieldComponent, MessageComponent],
            providers:[{provide: BridgeService, useValue: bridgeServiceSpy}],
            teardown: { destroyAfterEach: false }
        }).compileComponents();
        fixture = TestBed.createComponent(ConsumerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("Validate consumer component creation", () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    it("Display all messages from the localstorage after load", () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let messageContainer: DebugElement = fixture.debugElement.query(By.css("#consumer-container"));
            expect(messageContainer.children.length).toBe(5);
       });
    })
});