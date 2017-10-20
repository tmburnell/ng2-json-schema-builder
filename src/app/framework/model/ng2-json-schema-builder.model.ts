let _id = 0;

export type SchemaConfig = {
  key?: string;
  type?: string;
  parent_id?: string;
  subType?: string;

  //root
  $root$?: boolean;
  $schema?: string;
  definitions?: any;

  // base
  title?: string;
  description?: string;
  $ref?: string;
  default?: string;
  enum?: Array<any>;
  required?: boolean;

  // object
  properties?: Array<any>;
  additionalProperties?: Array<any>;
  disallowAdditional?: boolean;
  maxProperties?: number;
  minProperties?: number;

  // Array
  items?: SchemaType;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;

  // String
  format?: string;
  pattern?: string;
  maxLength?: number;
  minLength?: number;

  // Number
  //format?: string;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  multipleOf?: number;
};
class BaseSchema {
  constructor(cfg: SchemaConfig) {
    if (cfg.$root$) {
      _id = 0;
      this.$root$ = true;
      this._id = `${_id++}`;
    } else {
      this._id = `${cfg.parent_id}.${_id++}`;
    }

    this.key = cfg.key;
    this.type = cfg.type;
    this.title = cfg.title;
    this.description = cfg.description;
    this.$ref = cfg.$ref;
    this.default = cfg.default;
    this.enum = cfg.enum;
    this.required = cfg.required;
  }

  _id: string;
  key: string;
  title: string;
  type: string;
  description?: string;
  $ref?: string;
  default?: string;
  enum?: Array<any>;
  required?: boolean;
  $root$: boolean;
  definitions: Array<SchemaType>;
}

export class ObjectSchema extends BaseSchema {
  constructor(cfg: SchemaConfig) {
    super(cfg);

    this.properties = [
      Schema.create({key: '', type: 'string', parent_id: this._id})
    ];
  };

  properties?: Array<any>;
  additionalProperties?: Array<any>;
  disallowAdditional?: boolean;
  maxProperties?: number;
  minProperties?: number;
}
export class ArraySchema extends BaseSchema {
  constructor(cfg: SchemaConfig) {
    super(cfg);

    if (cfg.subType) {
      this.items = Schema.create({type: cfg.subType, parent_id: this._id});
    } else {
      this.items = Schema.create({type: 'string', parent_id: this._id});
    }
  }

  items?: SchemaType;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
}
export class StringSchema extends BaseSchema {
  format?: string;
  pattern?: string;
  maxLength?: number;
  minLength?: number;
}
export class IntegerSchema extends BaseSchema {
  format?: string;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  multipleOf?: number;
}
export class NumberSchema extends BaseSchema {
  format?: string;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: number;
  exclusiveMinimum?: number;
  multipleOf?: number;
}
export class BooleanSchema extends BaseSchema {
}
export class NullSchema extends BaseSchema {
}
export class RefSchema extends BaseSchema {
}

const SchemaLookup = {
  array: ArraySchema,
  boolean: BooleanSchema,
  integer: IntegerSchema,
  number: NumberSchema,
  object: ObjectSchema,
  string: StringSchema,
  $ref: RefSchema
};

export class Schema {
  static create(config: SchemaConfig): SchemaType {
    const cfg: SchemaConfig = {
      ... {type: 'string'},
      ... config
    };

    return new SchemaLookup[cfg.type](cfg);
  }

  static convertObj2Schema(data:SchemaType): string {
    return JSON.stringify(this.obj2JsonString(data), null, 2);
  }

  static obj2JsonString(data:SchemaConfig) {
    let schema: any = {};

    if(data.$root$) {
      schema.$schema = 'http://json-schema.org/draft-06/schema#';

      if(data.definitions) {
        schema.definitions = {};

        for (var i = 0; i < data.definitions.length; i++) {
          let o = data.definitions[i];
          if (o && o.type) {
            var res = this.obj2JsonString(o);
            schema.definitions[o.key] = res;
          }
        }
      }
    }

    schema.type = data.type;

    if (data.title) {
      schema.title = data.title;
    }
    if (data.description) {
      schema.description = data.description;
    }
    if (data.default) {
      schema.default = data.default;
    }

    switch (data.type) {
      case 'object':
        if (data.minProperties >= 0) {
          schema.minProperties = data.minProperties;
        }
        if (data.maxProperties >= 0) {
          schema.maxProperties = data.maxProperties;
        }
        if (data.disallowAdditional) {
          schema.additionalProperties = !data.disallowAdditional;
        }
        if (data.properties.length > 0) {
          schema.properties = {};
          schema.required = [];
          for (var i = 0; i < data.properties.length; i++) {
            let o = data.properties[i];
            if (o && o.type) {
              var res = this.obj2JsonString(o);
              schema.properties[o.key] = res;
              if (o.required) {
                schema.required.push(o.key);
              }
            }
          }
          if (schema.required.length == 0) {
            delete schema.required;
          }
        }
        break;
      case 'string':
        if (data.minLength >= 0) {
          schema.minLength = data.minLength;
        }
        if (data.maxLength >= 0) {
          schema.maxLength = data.maxLength;
        }
        if (data.pattern) {
          schema.pattern = data.pattern;
        }
        if (data.format) {
          schema.format = data.format;
        }
        break;
      case 'array':
        if (data.uniqueItems) {
          schema.uniqueItems = data.uniqueItems;
        }
        if (data.minItems >= 0) {
          schema.minItems = data.minItems;
        }
        if (data.maxItems >= 0) {
          schema.maxItems = data.maxItems;
        }
        if (data.items) {
          schema.items = this.obj2JsonString(data.items);
        }

        // if (data.items.length > 0) {
        //   schema.items = {};
        //   schema.required = [];
        //   for (var i = 0; i < data.items.length; i++) {
        //     let o = data.items[i];
        //     if (o && o.type) {
        //       var res = this.obj2JsonString(o);
        //       schema.items[o.key] = res;
        //       if (o.required) {
        //         schema.required.push(o.key);
        //       }
        //     }
        //   }
        //   if (schema.required.length == 0) {
        //     delete schema.required;
        //   }
        // }
        break;
      case 'integer':
      case 'number':
        if (data.minimum >= 0) {
          schema.minimum = data.minimum;
        }
        if (data.maximum >= 0) {
          schema.maximum = data.maximum;
        }
        if (data.exclusiveMinimum) {
          schema.exclusiveMinimum = data.exclusiveMinimum;
        }
        if (data.exclusiveMaximum) {
          schema.exclusiveMaximum = data.exclusiveMaximum;
        }
        if (data.multipleOf >= 0) {
          schema.multipleOf = data.multipleOf;
        }
        if (data.format) {
          schema.format = data.format;
        }
        break;
      case '$ref' :
        schema.type = undefined;
        schema.$ref = data.$ref;
        break;
    }
    return schema;
  }

  static convertSchema2Obj(data:string): SchemaType {
    return this.JsonString2Obj(JSON.parse(data), {key: '$root$', $root$: true});
  }

  static JsonString2Obj(data, config?: SchemaConfig):SchemaType {
    let obj,
      cfg: SchemaConfig = {
        ... config,
        ... {
          title: data.title,
          description: data.description,
          default: data.default,
          type: data.type
        }
      };

    switch (data.type) {
      case 'object':
        cfg.minProperties = data.minProperties;
        cfg.maxProperties = data.maxProperties;
        cfg.additionalProperties = data.additionalProperties;

        obj = this.create(cfg) as ObjectSchema;
        obj.properties = [];
        let prop,
          subObj:SchemaType;

        for (prop in data.properties) {
          subObj = this.JsonString2Obj(data.properties[prop], {key: prop, parent_id: obj._id});

          if(data.required && data.required.indexOf(prop) != -1) {
            subObj.required = true;
          }

          obj.properties.push(subObj);
        }
        break;
      case 'string':
        cfg.minLength = data.minLength;
        cfg.maxLength = data.maxLength;
        cfg.pattern = data.pattern;
        cfg.format = data.format;

        obj = this.create(cfg) as ObjectSchema;
        break;
      case 'array':
        cfg.uniqueItems = data.uniqueItems;
        cfg.minItems = data.minItems;
        cfg.maxItems = data.maxItems;
        cfg.subType = data.items.type;

        obj = this.create(cfg) as ArraySchema;

        if (cfg.subType = 'object') {
          obj.items = this.JsonString2Obj(data.items, {parent_id: obj._id});
        }
        break;
      case 'integer':
      case 'number':
        cfg.minimum = data.minimum;
        cfg.maximum = data.maximum;
        cfg.exclusiveMinimum = data.exclusiveMinimum;
        cfg.exclusiveMaximum = data.exclusiveMaximum;
        cfg.multipleOf = data.multipleOf;
        cfg.format = data.format;

        obj = this.create(cfg);

        break;
      case undefined:
        cfg.type = '$ref';
        cfg.$ref = data.$ref;
        obj = this.create(cfg);
        break;
      default:
        obj = this.create(cfg);
        break;
    }

    if(data.definitions) {
      let def,
        subObj:SchemaType;

      obj.definitions = [];

      for (def in data.definitions) {
        subObj = this.JsonString2Obj(data.definitions[def], {key: def, parent_id: obj._id});

        // if(data.required && data.required.indexOf(def) != -1) {
        //   subObj.required = true;
        // }

        obj.definitions.push(subObj);
      }
    }

    return obj;
  }
}

export declare type SchemaType = ObjectSchema | ArraySchema | StringSchema | IntegerSchema | NumberSchema | BooleanSchema | NullSchema;

