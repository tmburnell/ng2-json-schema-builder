import {Component, AfterViewInit, ComponentFactoryResolver, Input, ViewChild} from '@angular/core';
import {LoadSchemaDirective} from "./load-schema.directive";
import {ArraySchemaComponent, BooleanSchemaComponent, IntegerSchemaComponent, NullSchemaComponent,
        NumberSchemaComponent, ObjectSchemaComponent, StringSchemaComponent, RefSchemaComponent} from "../../schemas";
import {BaseSchemaComponent} from "../base-schema";

@Component({
  selector: 'schema-loader',
  templateUrl: './schema-loader.component.html',
  styleUrls: ['./schema-loader.component.scss']
})
export class SchemaLoaderComponent extends BaseSchemaComponent implements AfterViewInit {
  @Input() data: any;
  @ViewChild(LoadSchemaDirective) loadSchema: LoadSchemaDirective;

  private schemaLookup = {
    "array": ArraySchemaComponent,
    "boolean": BooleanSchemaComponent,
    "integer": IntegerSchemaComponent,
    "null": NullSchemaComponent,
    "number": NumberSchemaComponent,
    "object": ObjectSchemaComponent,
    "string": StringSchemaComponent,
    "$ref": RefSchemaComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  loadComponent() {
    const schema = this.schemaLookup[this.data.type];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(schema);

    let viewContainerRef = this.loadSchema.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<BaseSchemaComponent>componentRef.instance).data = this.data;
    (<BaseSchemaComponent>componentRef.instance).hideSubEdits = this.hideSubEdits;
    (<BaseSchemaComponent>componentRef.instance).changeType.subscribe(($event) => this.onChangeType($event));
    (<BaseSchemaComponent>componentRef.instance).changeSubType.subscribe(($event) => this.onChangeSubType($event));
    (<BaseSchemaComponent>componentRef.instance).createSchema.subscribe(($event) => this.onCreateSchema($event));
    (<BaseSchemaComponent>componentRef.instance).removeSchema.subscribe(($event) => this.onRemoveSchema($event));
    (<BaseSchemaComponent>componentRef.instance).scopeSchema.subscribe(($event) => this.onScopeSchema($event));
    componentRef.changeDetectorRef.detectChanges();
  }

}
