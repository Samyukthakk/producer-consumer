import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import ProducerComponent from "./producer.component";
import BridgeService from "../service/bridge.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import FormFieldComponent from "../shared/form-field.component";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

let dispatchFakeEvent = (element: EventTarget, type: string, bubbles: boolean) => {
    const event = document.createEvent('Event');
    event.initEvent(type, bubbles, false);
    element.dispatchEvent(event);
}

let makeClickEvent = (target: EventTarget): Partial<MouseEvent> => {
    return {
      preventDefault(): void {},
      stopPropagation(): void {},
      stopImmediatePropagation(): void {},
      type: 'click',
      target,
      currentTarget: target,
      bubbles: true,
      cancelable: true,
      button: 0
    };
}

describe('Producer component', () => {
    let component: ProducerComponent;
    let fixture: ComponentFixture<ProducerComponent>;
    let bridgeServiceSpy: BridgeService;

    beforeEach(waitForAsync(() => {
        bridgeServiceSpy = jasmine.createSpyObj(BridgeService, ["sendMessage"]);
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [ProducerComponent, FormFieldComponent],
            providers:[{provide: BridgeService, useValue: bridgeServiceSpy}],
            teardown: { destroyAfterEach: false }
        }).compileComponents();
        fixture = TestBed.createComponent(ProducerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("Validate producer component creation", () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    it("Set form fields and expect sendMessage to be called on click of save", () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();

            let firstNameInput: DebugElement = fixture.debugElement.query(By.css("#firstname"));
            firstNameInput.nativeElement.value = "Test_User";
            dispatchFakeEvent(firstNameInput.nativeElement, 'input', true);

            let phonenumberInput: DebugElement = fixture.debugElement.query(By.css("#phonenumber"));
            phonenumberInput.nativeElement.value = "123456";
            dispatchFakeEvent(phonenumberInput.nativeElement, 'input', true);

            let btnSendMessage: DebugElement = fixture.debugElement.query(By.css("#btnSave"));
            btnSendMessage.triggerEventHandler('click', makeClickEvent(btnSendMessage.nativeElement));

            expect(bridgeServiceSpy.sendMessage).toHaveBeenCalledTimes(1);
        });
    });
});