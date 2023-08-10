import { Style as MbStyle, AnyLayer, MapboxGeoJSONFeature } from 'mapbox-gl'
import Feature from 'ol/Feature'
import { ReactNode } from 'react'

import { Actions as MapStoreActions } from '#/common/store/mapStore'
// interface mapFunctions {}

export type PopupProps = { features: PopupFeature[] }

export type Popup = (props: PopupProps) => ReactNode

export type SourceType =
  | 'geojson'
  | 'vector'
  | 'raster'
  | 'image'
  | 'video'
  | 'canvas'

export type LayerOpt = {
  id: string
  source: string
  name: string
  layerType: LayerType
  selectable: boolean
  multiSelectable: boolean
  popup: Popup | false
  useMb: boolean
}

export type LayerOpts = {
  [key: string]: LayerOpt
}

export interface CustomLayerGroupAddOptions {
  layerConf?: LayerConfAnyId
  isAddedBefore?: boolean
  neighboringLayerGroupId?: LayerGroupId | string
  isHidden?: boolean
  persist?: boolean
  mapContext?: MapContext
}

export interface LayerGroupAddOptions extends CustomLayerGroupAddOptions {
  layerConf?: LayerConf
}

export interface LayerGroupAddOptionsWithConf extends LayerGroupAddOptions {
  layerConf: LayerConf
}

export type LayerGroupId =
  | 'building_energy_certs'
  | 'no2'
  | 'snow_cover_loss'
  | 'fi_buildings'
  | 'helsinki_buildings'
  | 'hsy_solarpotential'
  | 'fi_bogs'
  | 'cifor_peatdepth'
  | 'cifor_wetlands'
  | 'metsaan_ete_basic'
  | 'metsaan_ete_important'
  | 'zonation'
  | 'natura2000'
  | 'hansen'
  | 'fi_mature_forests'
  | 'mangrove_forests'
  | 'gfw_tree_plantations'
  | 'fi_forests'
  | 'terramonitor'

export type ExtendedAnyLayer = AnyLayer & {
  source: string
  selectable?: boolean // whether a feature can be highlighted
  multiSelectable?: boolean // whether multiple features can be highlighted
}

export type ExtendedMbStyle = MbStyle & {
  layers: ExtendedAnyLayer[]
}

export type LayerConfAnyId = {
  id: string
  style: () => Promise<ExtendedMbStyle>
  popup?: Popup
  useMb?: boolean
}

export interface LayerConf extends LayerConfAnyId {
  id: LayerGroupId
}

// For checking if layer name adheres to LayerType, in runtime
export const layerTypes: readonly string[] = [
  'fill',
  'highlighted',
  'outline',
  'symbol',
  'raster',
]

export type LayerType = (typeof layerTypes)[number] | 'invalid'

export type OverlayMessage = {
  message: string | null
  layerGroupId: LayerGroupId
}

export type MapLibraryMode = 'hybrid' | 'mapbox'

export enum QueuePriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export interface PopupOpts {
  features: Feature[] | MapboxGeoJSONFeature[]
  PopupElement: React.FC<{ features: any }>
}

export type PopupFeature = {
  properties: any
}

export interface ILayerOption {
  serverId: string
  minzoom: number
  maxzoom?: number
  layerMinzoom?: number | null
  layerMaxzoom?: number | null
}

export type QueueOptions = {
  skipQueue?: boolean
  priority?: QueuePriority
}

export type QueueFunctionFuncName = keyof MapStoreActions

export type QueueFunction = {
  fn: (...args: any) => Promise<void>
  args: any[]
  priority?: QueuePriority
}

export type FunctionQueue = (QueueFunction & {
  promise: { resolve: any; reject: any }
})[]

export type MapContext = 'main' | string
