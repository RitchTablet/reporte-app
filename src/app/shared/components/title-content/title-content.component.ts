import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-content',
  standalone: true,  
  template: `
    <div class="inline-block">
      <h3 class="font-semibold text-foreground">{{title}}</h3>
      <div class="space-x-1 text-xs font-medium text-muted-foreground">
        <a href="" class="hover:text-primary">{{subtitle}}</a>
      </div>
    </div>
  `,
})
export class TitleContentComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
