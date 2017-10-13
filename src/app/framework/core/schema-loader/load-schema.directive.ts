import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[load-schema]'
})
export class LoadSchemaDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
