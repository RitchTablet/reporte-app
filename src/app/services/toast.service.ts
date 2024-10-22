import { Injectable } from '@angular/core';

import { toast } from 'ngx-sonner';

@Injectable({ providedIn: 'root' })
export class ToastService {
  errorHttp(statusText: string, statusCode: number, msg: string) {
    toast.error(`Error: ${statusText} - ${statusCode}`, {
      position: 'bottom-right',
      description: msg,
      action: {
        label: 'Undo',
        onClick: () => console.log('Action!'),
      },
      actionButtonStyle: 'background-color:#DC2626; color:white;',
    });
  }
}
