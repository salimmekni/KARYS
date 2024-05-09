import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private api_key: string = "RGAPI-07441970-dc9d-41a3-9543-298bcfa39eee";
  private api_url: string = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/litherin";

  constructor(private http: HttpClient) { }

  getPlayerInfo() {
    const api_url_with_key = `${this.api_url}?api_key=${this.api_key}`;
    return this.http.get(api_url_with_key);
  }
}
