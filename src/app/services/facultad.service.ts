import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facultad } from '../models/facultad.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class FacultadService {

  private baseUrl = 'http://localhost:8080/api/v1/facultades';

  constructor(private http: HttpClient) {}

  crear(facultad: Facultad): Observable<ApiResponse<Facultad>> {
    return this.http.post<ApiResponse<Facultad>>(this.baseUrl, facultad);
  }

  listar(): Observable<ApiResponse<Facultad[]>> {
    return this.http.get<ApiResponse<Facultad[]>>(this.baseUrl);
  }
}
