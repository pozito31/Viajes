import { ICountry } from "../interfaces/icountry";
import * as _ from 'lodash';

export class Country implements ICountry {

  constructor(data) {
    _.set(this, 'data', data);
  }

  get name(): string{
    return _.get(this, 'data.name');
  }

  get flag(): string{
    return _.get(this, 'data.flag');
  }
}

