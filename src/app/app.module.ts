import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatMenuModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatCardModule, MatTabsModule,
        MatTooltipModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {Ng2JsonSchemaBuilderComponent} from './ng2-json-schema-builder/ng2-json-schema-builder.component';
import {BaseSchemaComponent,LoadSchemaDirective,SchemaLoaderComponent,StandardInputComponent,TypeSelectorComponent} from './framework/core';
import {ArraySchemaComponent,BooleanSchemaComponent,IntegerSchemaComponent,NullSchemaComponent,
        NumberSchemaComponent,ObjectSchemaComponent,StringSchemaComponent} from './framework/schemas';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,

    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    BrowserAnimationsModule,

    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    Ng2JsonSchemaBuilderComponent,
    ArraySchemaComponent,
    BooleanSchemaComponent,
    IntegerSchemaComponent,
    NullSchemaComponent,
    NumberSchemaComponent,
    ObjectSchemaComponent,
    StringSchemaComponent,
    TypeSelectorComponent,
    StandardInputComponent,
    BaseSchemaComponent,
    SchemaLoaderComponent,
    LoadSchemaDirective
  ],
  entryComponents: [
    ArraySchemaComponent,
    BooleanSchemaComponent,
    IntegerSchemaComponent,
    NullSchemaComponent,
    NumberSchemaComponent,
    ObjectSchemaComponent,
    StringSchemaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
