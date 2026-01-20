import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: sans-serif;">
      <h1>Hello Angular!</h1>
      <p>Start building your app.</p>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "angular-playground";
}
