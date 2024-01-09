import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import ProducerComponent from './producer/producer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import FormFieldComponent from './shared/form-field.component';

@NgModule({
  declarations: [
    AppComponent,
    ProducerComponent,
    FormFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
