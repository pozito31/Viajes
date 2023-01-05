import { IRegion } from "../interfaces/iregion";
import * as _ from 'lodash';

export class Region implements IRegion {

  constructor(data) {
    _.set(this, 'data', data);
  }

  get code(): string{
    return _.get(this, 'data.code');
  }

  get name(): string{
    return _.get(this, 'data.name');
  }
}
