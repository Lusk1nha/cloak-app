export class WorldTimeRepo {
  private _endpoint = "http://worldtimeapi.org/api/";

  constructor() {
    this.getTimezoneByIPAddress = this.getTimezoneByIPAddress.bind(this);
  }

  async getTimezoneByIPAddress(ipAddress: string) {
    const uri = this._endpoint + "ip/" + ipAddress;
    const response = await fetch(uri);
    const data = await response.json();

    return data;
  }
}
