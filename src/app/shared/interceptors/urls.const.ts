import { environment } from "@environments/environment";

export const urlMappingsConst = new Map([    
    ['@api-platform', { url: environment?.apiPlatform, requiresAuth: true }],
]);