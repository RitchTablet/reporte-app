import { FormControl } from "@angular/forms";

export interface ConfigForm {
    user:FormControl<string|null>;    
    password:FormControl<string|null>; 
}