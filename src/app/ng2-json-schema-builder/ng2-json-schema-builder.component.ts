import {Component, OnInit} from '@angular/core';

import {Schema, SchemaType, SchemaConfig, ArraySchema, ObjectSchema} from '../framework';

@Component({
  selector: 'ng2-json-schema-builder',
  templateUrl: './ng2-json-schema-builder.component.html',
  styleUrls: ['./ng2-json-schema-builder.component.scss']
})
export class Ng2JsonSchemaBuilderComponent implements OnInit {
  rootData: SchemaType;
  data: SchemaType;
  schemaString: string;

  scope: Array<{id, key}>;

  ngOnInit() {
    this.rootData = this.getNewSchema("object", '$root$', {$root$: true});
    this.updateScope(this.rootData._id);
  }

  onTabChange($event) {
    switch ($event.index) {
      case 0:
        this.convertSchema2Obj();
        break;
      case 1:
        this.convertObj2Schema();
        break;
    }
  }

  onCreateSchema($event) {
    switch ($event.data.constructor) {
      // case ArraySchema:
      //   this.addItem($event.type ? $event.type : $event.data.type, $event.data, "");
      //   break;
      case ObjectSchema:
      default:
        this.addProp($event.type ? $event.type : $event.data.type, $event.data, "");
        break;
    }
  }

  onRemoveModel($event) {
    this.removeModelData($event.data);
  }

  onChangeType($event) {
    this.changeModelType($event.type, $event.data);
  }

  onChangeSubType($event) {
    this.changeModelType($event.data.type, $event.data, $event.type);
  }

  onScopeChange($event) {
    this.updateScope($event.id);
  }

  refreshScope() {
    this.updateScope(this.getScopeId());
  }

  getScopeId() {
    return this.scope[this.scope.length -1].id;
  }

  updateScope(id: string) {
    let newScope: Array<{id, key}> = [],
      idPath: Array<any> = id.split('.'),
      i,
      length = idPath.length,
      data: any = this.rootData,
      subId;

    for (i = 1; i <= length; i++) {
      newScope.push({id: data._id, key: data.key});

      switch (data.constructor) {
        case ArraySchema:
          if (data.items.properties && data.items.properties.length > 0) {
            i++;
            if (data._id !== id) {
              subId = idPath.slice(0, (i + 1)).join('.');
              data = data.items.properties.filter((obj) => obj._id === subId)[0];
            }
          }
          // if (data.items && data.items.length > 0) {
          //   subId = idPath.slice(0, (i + 1)).join('.');
          //   if (data._id !== id) {
          //     data = data.items.filter((obj) => obj._id === subId)[0];
          //   }
          // }
          break;
        case ObjectSchema:
        default:
          if (data.properties && data.properties.length > 0) {
            if (data._id !== id) {
              subId = idPath.slice(0, (i + 1)).join('.');
              data = data.properties.filter((obj) => obj._id === subId)[0];
            }
          }
          break;
      }
    }

    this.scope = newScope;
    this.data = data;
  }

  getNewSchema(type: string, key: string, additionalParams?: SchemaConfig): SchemaType {
    const cfg: SchemaConfig = {
      ... {
        type: type,
        key: key
      },
      ... additionalParams
    };

    return Schema.create(cfg);
  }

  addProp(type, data: ObjectSchema, key): void {
    if (data.properties && data.properties.length >= 0
    ) {
      data.properties.push(this.getNewSchema(type, key, {parent_id: data._id}));
    }
    else {
      data.properties = [this.getNewSchema(type, key, {parent_id: data._id})];
    }
  }

  // addItem(type, data: ArraySchema, key): void {
  //   if (data.items && data.items.length >= 0
  //   ) {
  //     data.items.push(this.getNewSchema(type, key, {parent_id: data._id}));
  //   }
  //   else {
  //     data.items = [this.getNewSchema(type, key, {parent_id: data._id})];
  //   }
  // }

  changeModelType(type: string, data, subType?: string): void {
    let parent_id = data._id.substr(0, data._id.lastIndexOf('.')),
      newModel: SchemaType = this.getNewSchema(type, data.key, {parent_id: parent_id, subType: subType});
    if (this.updateModel(this.rootData, data._id, newModel)) {
      this.rootData = newModel;
      this.rootData.$root$ = true;
    }
    // this.refreshScope();
  }

  updateModel(data, id, newModel): boolean | void {
    if (data._id == id) {
      return true;
    }
    if (id.indexOf(data._id, 0) == -1) {
      return;
    }
    let i;

    switch (data.constructor) {
      case ArraySchema:
        for (i = 0; i < data.items.properties.length; i++) {
          if (this.updateModel(data.items.properties[i], id, newModel)) {
            data.items.properties[i] = newModel;
          }
        }
        // for (i = 0; i < data.items.length; i++) {
        //   if (this.updateModel(data.items[i], id, newModel)) {
        //     data.items[i] = newModel;
        //   }
        // }
        break;
      case ObjectSchema:
        for (i = 0; i < data.properties.length; i++) {
          if (this.updateModel(data.properties[i], id, newModel)) {
            data.properties[i] = newModel;
          }
        }
        break;
    }
  }

  removeModelData(data) {
    this.removeModel(this.rootData, data._id);
    // this.refreshScope();
  }

  removeModel(data, id): boolean | void {
    if (data._id == id) {
      return true;
    }
    let i;

    switch (data.constructor) {
      case ArraySchema:
        for (i = 0; i < data.items.properties.length; i++) {
          if (this.removeModel(data.items.properties[i], id)) {
            data.items.properties = data.items.properties.filter((e) => e._id !== id);
          }
        }
        // for (i = 0; i < data.items.length; i++) {
        //   if (this.removeModel(data.items[i], id)) {
        //     data.items = data.items.filter((e) => e._id !== id);
        //   }
        // }
        break;
      case ObjectSchema:
        for (i = 0; i < data.properties.length; i++) {
          if (this.removeModel(data.properties[i], id)) {
            data.properties = data.properties.filter((e) => e._id !== id);
          }
        }
        break;
    }
  }

  convertObj2Schema() {
    this.schemaString = Schema.convertObj2Schema(this.rootData);
  }

  convertSchema2Obj() {
    this.rootData = Schema.convertSchema2Obj(this.schemaString);
    this.scope = [{id: this.rootData._id, key: this.rootData.key}];
    this.refreshScope();
  }
}
