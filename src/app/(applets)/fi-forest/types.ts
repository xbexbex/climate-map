import { StringValueOf } from '#/common/types/general'
import { ILayerOption } from '#/common/types/map'

export enum LayerLevel {
  Parcel = 'fi_forests_parcel',
  Estate = 'fi_forests_estate',
  Municipality = 'fi_forests_municipality',
  Region = 'fi_forests_region',
  Country = 'fi_forests_country',
}

export type LayerLevelStrings = StringValueOf<LayerLevel>

export type ILayerOptions = {
  [key in LayerLevelStrings]: ILayerOption
}

export enum ForestryMethod {
  'eihakata' = 1,
  'jatkuva' = 2,
  'tasaikainen' = 3,
  'vapaa' = 4,
}
