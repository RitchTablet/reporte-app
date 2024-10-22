import { Injectable } from '@angular/core';
import { Month } from '@shared/interfaces/month';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es'); 

@Injectable({
  providedIn: 'root',
})
export class DateService {
  formatDate(dateString: string, format:string = 'DD/MM/YYYY'): string {
    return dayjs(dateString).format(format);
  }

  getDateTodayFormat(dateFormat: string = 'YYYY-MM-DD'): string {
    return dayjs().format(dateFormat); 
  }

  getMonths(): Month[] {    
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: dayjs().month(i).format('MMMM'),
    }));
  }

  getCurrentMonth(): number {
    return dayjs().month() + 1;
  }
  
  getCurrentYear(): number {
    return dayjs().year();
  }
}