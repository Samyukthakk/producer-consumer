import { Component, Input } from "@angular/core";

@Component({
    selector: 'form-field',
    template: `
        <div class="form-field-container">
            <label>{{label}}</label>
            <div class="content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [`
        label {
            font-size: 16px;
            width: 110px;
        }

        .form-field-container {
            width: 300px;
            display: flex;
            align-items: center;
            padding: 10px;
        }

        .content {
            align-content: center;
            padding-left: 15px;
        }
    `]
})
export default class FormFieldComponent {
    @Input("label-text")
    label: string | undefined;
}