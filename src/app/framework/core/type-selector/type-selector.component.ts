import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.scss']
})
export class TypeSelectorComponent {

  @Input() buttonlabel: string;
  @Input() tooltip: string;

  @Output() typeSelected: EventEmitter<any> = new EventEmitter();

  onSelect(type: string):void {
    this.typeSelected.emit({type: type});
  }
}
