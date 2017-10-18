import {Input, Output, EventEmitter, Component, DoCheck} from "@angular/core";

@Component({
  template: ``
})
export class BaseSchemaComponent implements DoCheck {
  @Input() data: any;
  @Input() hideSubEdits?: boolean;
  @Output() dataChange: EventEmitter<any> = new EventEmitter();

  @Output() changeType: EventEmitter<any> = new EventEmitter();
  @Output() createSchema: EventEmitter<any> = new EventEmitter();
  @Output() removeSchema: EventEmitter<any> = new EventEmitter();
  @Output() scopeSchema: EventEmitter<any> = new EventEmitter();
  @Output() changeSubType: EventEmitter<any> = new EventEmitter();


  public viewDetails:boolean = false;
  public viewChildren:boolean = true;
  public hover:boolean = false;

  ngDoCheck() {
    this.dataChange.next(this.data);
  }

  onChangeType($event) {
    this.changeType.emit({type: $event.type, data: $event.data ? $event.data : this.data});
  }

  onChangeSubType($event) {
    this.changeSubType.emit({type: $event.type, data: $event.data ? $event.data : this.data});
  }

  onCreateSchema($event) {
    this.createSchema.emit({type: $event.type, data: $event.data ? $event.data : this.data});
  }

  onRemoveSchema($event) {
    this.removeSchema.emit({data: $event.data ? $event.data : this.data});
  }

  onScopeSchema($event) {
    this.scopeSchema.emit({id: $event.id? $event.id : this.data._id});
  }
}
