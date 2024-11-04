import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Reports',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/arrow-up-on-square.svg',
          label: 'Upload',
          route: '/reports/upload',
        },
        {
          icon: 'assets/icons/heroicons/outline/document.svg',
          label: 'History',
          route: '/reports/history',
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Configuration',
          route: '/config',
        },
      ],
    },
  ];
}
