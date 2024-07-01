export interface IPAddress {
  ip: string;
  location: Location;
  as: As;
  isp: string;
  proxy: Proxy;
}

export interface Location {
  country: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
  postalCode: string;
  timezone: string;
  geonameId: number;
}

export interface As {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

export interface Proxy {
  proxy: boolean;
  vpn: boolean;
  tor: boolean;
}

export class GeolocalizationRepo {
  private _endpoint =
    "https://geo.ipify.org/api/v1?apiKey={api_key}&ipAddress=";
  private _apiKey = import.meta.env.VITE_API_KEY;

  constructor() {
    this.getUserCurrentIPAddress = this.getUserCurrentIPAddress.bind(this);
  }

  async getUserCurrentIPAddress(): Promise<IPAddress> {
    const uri = this._endpoint.replace("{api_key}", this._apiKey);
    const response = await fetch(uri);
    const data = await response.json();

    return data;
  }
}
