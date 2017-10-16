import {Component} from '@angular/core';
import {BaseSchemaComponent} from "../../core/base-schema";
import {ObjectSchema, RefSchema} from "../../model/";

@Component({
  selector: 'array-schema',
  templateUrl: './array-schema.component.html',
  styleUrls: ['./array-schema.component.scss']
})
export class ArraySchemaComponent extends BaseSchemaComponent {
  hasItems(data): boolean {
    if( this.isObjectSchema(data)) {
      return true;
    }

    return false;
  }
  isObjectSchema(data): boolean {
    return data.items.constructor == ObjectSchema;
  }
  isRefSchema(data): boolean {
    return data.items.constructor == RefSchema;
  }

  onCreateSchema($event) {
    if (!$event.data) {
      $event.data = this.data.items;
    }
    super.onCreateSchema($event);
  }
}
