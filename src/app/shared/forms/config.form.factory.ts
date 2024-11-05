import { FormControl, Validators } from "@angular/forms";
import { ConfigForm } from "@shared/interfaces/forms/config.form";

export class ConfigFormFactory {
  static createFormControls(): ConfigForm {
    return {
        user: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    }
  }
}
