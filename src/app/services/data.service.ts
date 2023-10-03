import { Injectable } from '@angular/core';
import { Libro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  libro!: Libro;
  constructor() { }
}
