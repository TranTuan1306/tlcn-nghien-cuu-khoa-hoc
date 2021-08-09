import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackingTinTucService {

  private idTinTuc = '';
  private returnIdTinTuc = new BehaviorSubject(this.idTinTuc);

  getId(): Observable<string> {
    return this.returnIdTinTuc.asObservable();
  }

  setId(link: string): void {
    if (this.idTinTuc !== link) {
      this.idTinTuc = link;
      this.returnIdTinTuc.next(link);
    }
  }
}
