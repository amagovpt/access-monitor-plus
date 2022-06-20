import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private server: string;

  constructor() {
    const host = location.hostname;

    if (host === "localhost") {
      this.server = "http://localhost:3000";
    } else {
      this.server = "/api2";
    }
  }

  getServer(service: string): string {
    return this.server + service;
  }
}
