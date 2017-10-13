import {Component, Output, EventEmitter} from '@angular/core';
import {BaseSchemaComponent} from "../../core/base-schema/base-schema.component";

@Component({
  selector: 'object-schema',
  templateUrl: './object-schema.component.html',
  styleUrls: ['./object-schema.component.scss']
})
export class ObjectSchemaComponent extends BaseSchemaComponent {

  hasProperties(data): boolean {
    return data.properties && data.properties.length > 0
  }
}
