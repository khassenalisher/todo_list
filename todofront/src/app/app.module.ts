import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { MainComponent } from "./main/main.component";
import { ProviderService } from "./shared/services/provider.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [FormsModule, BrowserModule, HttpClientModule],
  providers: [ProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
