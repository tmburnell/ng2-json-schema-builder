import {Component} from '@angular/core';
import {BaseSchemaComponent} from "../../core/base-schema";
import {ObjectSchema} from "../../model/";

@Component({
  selector: 'array-schema',
  templateUrl: './array-schema.component.html',
  styleUrls: ['./array-schema.component.scss']
})
export class ArraySchemaComponent extends BaseSchemaComponent {
  hasItems(data): boolean {
    if(data.items.constructor == ObjectSchema) {
      return true;
    }

    return false;
  }

  onCreateSchema($event) {
    if (!$event.data) {
      $event.data = this.data.items;
    }
    super.onCreateSchema($event);
  }
}
