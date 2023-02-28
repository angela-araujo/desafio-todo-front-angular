import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPerson } from '../models/Person.model';

@Injectable()
export class PersonService {
    apiUrlBase = 'http://localhost:3000/api/v1';

    constructor(
        private http: HttpClient
    ) {}

    getPersons(): Observable<IPerson[]> {
        return this.http.get<IPerson[]>(`${this.apiUrlBase}/person`);
    }

    createPerson(dataPerson: IPerson): Observable<IPerson> {
        return this.http.post<IPerson>(`${this.apiUrlBase}/person`, dataPerson)
    }

    editPerson(id: number, dataPerson: IPerson): Observable<IPerson> {
        return this.http.patch<IPerson>(`${this.apiUrlBase}/person/${id}`, dataPerson);
    }

    deletePerson(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrlBase}/person/${id}`);
    }

}