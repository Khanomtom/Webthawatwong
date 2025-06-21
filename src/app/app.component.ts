import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent], // <--- เพิ่ม NavbarComponent
  templateUrl: './app.component.html',
})
export class AppComponent {}
