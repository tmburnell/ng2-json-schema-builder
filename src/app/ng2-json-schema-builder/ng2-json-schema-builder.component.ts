import {Component, OnInit} from '@angular/core';

import {Schema, SchemaType, SchemaConfig, ArraySchema, ObjectSchema} from '../framework';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';

@Component({
  selector: 'ng2-json-schema-builder',
  templateUrl: './ng2-json-schema-builder.component.html',
  styleUrls: ['./ng2-json-schema-builder.component.scss']
})
export class Ng2JsonSchemaBuilderComponent implements OnInit {
  rootData: SchemaType;
  data: SchemaType;
  schemaString: string;

  editorConfig = {
    mode: 'application/json',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
  };

  scope: Array<{id, key}>;

  ngOnInit() {
    this.rootData = this.getNewSchema("object", '$root$', {$root$: true});
    this.updateScope(this.rootData._id);
  }

  onTabChange($event) {
    // TODO: maybe needs to fire an async task.  on lots of data it takes a little while to render, so may want loading spinner
    switch ($event.index) {
      case 0:
      case 1:
        this.convertSchema2Obj();
        break;
      case 2:
        this.convertObj2Schema();
        break;
    }
  }

  onCreateDefinition($event) {
    $event = {
      data: $event.data ? $event.data : this.data,
      type: $event.type ? $event.type : $event.data.type
    };

    if($event.data.$root$) {
      if($event.data.definitions && $event.data.definitions.length > 0) {
        $event.data.definitions.push(this.getNewSchema($event.type, $event.data.key, {parent_id: $event.data._id}));
      } else {
        $event.data.definitions = [this.getNewSchema($event.type, $event.data.key, {parent_id: $event.data._id})];
      }
    } else {
      this.addProp($event.type, $event.data, "")
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
    return this.scope[this.scope.length - 1].id;
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

      if(data.definitions) {
        subId = idPath.slice(0, (i + 1)).join('.');
        let temp = data.definitions.filter((obj) => obj._id === subId)[0];
        if (temp) {
          data = temp;
          newScope.push({id: data._id, key: data.key});
          i++;
        }
      }

      if(i <= length) {
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
    if (data.properties && data.properties.length >= 0) {
      data.properties.push(this.getNewSchema(type, key, {parent_id: data._id}));
    } else {
      data.properties = [this.getNewSchema(type, key, {parent_id: data._id})];
    }
  }

  changeModelType(type: string, data, subType?: string): void {
    let parent_id = data._id.substr(0, data._id.lastIndexOf('.')),
        newModel: SchemaType = this.getNewSchema(type, data.key, {parent_id: parent_id, subType: subType});
    this.updateModel(this.rootData, data._id, newModel);
    // this.refreshScope();
  }

  updateModel (data, id, newModel) {
    let idPath: Array<any> = id.split('.'),
      i,
      length = idPath.length,
      subId;

    for (i = 1; i < length; i++) {
      if(data.definitions) {
        subId = idPath.slice(0, (i + 1)).join('.');
        let temp = data.definitions.filter((obj) => obj._id === subId)[0];
        if (temp) {
          if(i == length -1) {
            data.definitions = data.definitions.map((obj) => (obj._id === subId) ? newModel : obj);
            break;
          } else {
            data = temp;
            i++;
          }
        }
      }

      if(i == length -1) {
        subId = idPath.slice(0, (i + 1)).join('.');
        data.properties = data.properties.map((obj) => (obj._id === subId) ? newModel : obj);
      } else {
        switch (data.constructor) {
          case ArraySchema:
            if (data.items.properties && data.items.properties.length > 0) {
              i++;
              subId = idPath.slice(0, (i + 1)).join('.');

              if(i == length -1) {
                data.items.properties = data.items.properties.map((obj) => (obj._id === subId) ? newModel : obj);
              } else {
                if (data._id !== id) {
                  data = data.items.properties.filter((obj) => obj._id === subId)[0];
                }
              }
            }
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
    }
  }

  removeModelData(data) {
    this.removeModel(this.rootData, data._id);
    // this.refreshScope();
  }

  removeModel(data, id) {
    let idPath: Array<any> = id.split('.'),
        i,
        length = idPath.length,
        subId;

    for (i = 1; i < length; i++) {
      if(data.definitions) {
        subId = idPath.slice(0, (i + 1)).join('.');
        let temp = data.definitions.filter((obj) => obj._id === subId)[0];
        if (temp) {
          if(i == length -1) {
            data.definitions = data.definitions.filter((obj) => obj._id !== subId);
            break;
          } else {
            data = temp;
            i++;
          }
        }
      }

      if(i == length -1) {
        subId = idPath.slice(0, (i + 1)).join('.');
        data.properties = data.properties.filter((obj) => obj._id !== subId);
      } else {
        switch (data.constructor) {
          case ArraySchema:
            if (data.items.properties && data.items.properties.length > 0) {
              i++;
              subId = idPath.slice(0, (i + 1)).join('.');

              if(i == length -1) {
                data.items.properties = data.items.properties.filter((obj) => obj._id !== subId);
              } else {
                if (data._id !== id) {
                  data = data.items.properties.filter((obj) => obj._id === subId)[0];
                }
              }
            }
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
    }
  }

  convertObj2Schema() {
    if (this.rootData) {
      this.schemaString = Schema.convertObj2Schema(this.rootData);
      this.rootData = undefined;
    }
  }

  convertSchema2Obj() {
    if (this.schemaString) {
      this.rootData = Schema.convertSchema2Obj(this.schemaString);
      this.scope = [{id: this.rootData._id, key: this.rootData.key}];
      this.refreshScope();

      this.schemaString = undefined;
    }
  }
}
