export interface Charger {
  objectid: number;
  no: number;
  distrito: number;
  emplazamie: string;
  toma: number;
  precio_iv: string;
  potenc_ia: string;
  observacio: string;
  conector: string;
  tipo_carga: string;
  geo_point_2d: {
    lon: number;
    lat: number;
  };
}