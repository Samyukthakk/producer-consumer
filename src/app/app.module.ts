import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import ProducerComponent from './producer/producer.component';
import ConsumerComponent from './consumer/consumer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import FormFieldComponent from './shared/form-field.component';
import MessageComponent from './shared/message.component';

@NgModule({
  declarations: [
    AppComponent,
    ProducerComponent,
    ConsumerComponent,
    FormFieldComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
