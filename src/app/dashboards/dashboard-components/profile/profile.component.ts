import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile-box',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
constructor(private authService: AuthService) {}
}
