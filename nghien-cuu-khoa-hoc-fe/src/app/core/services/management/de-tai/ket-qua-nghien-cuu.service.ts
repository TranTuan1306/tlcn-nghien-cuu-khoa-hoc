import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { KetQuaNghienCuuBM1011 } from 'src/app/core/models/bieu-mau/bm10-11-ket-qua-nghien-cuu.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class KetQuaNghienCuuService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.KET_QUA_NGHIEN_CUU;
  }

  updateKetQuaNghienCuu(model: KetQuaNghienCuuBM1011, deTaiId: string): Observable<KetQuaNghienCuuBM1011> {
    return this.http.put<KetQuaNghienCuuBM1011>(this.apiUrl + `/${deTaiId}/thong-tin-ket-qua-nghien-cuu`, model)
      .pipe(catchError(this.handleService.handleError));
  }
}
