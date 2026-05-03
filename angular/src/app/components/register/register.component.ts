import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    username = '';
    password = '';
    role = 'user';
    message = '';
    error = '';

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        this.message = '';
        this.error = '';

        this.authService.register(this.username, this.password, this.role)
            .subscribe({
                next: (res: any) => {
                    this.message = 'Registration successful!';
                    this.router.navigate(['/books']);
                },
                error: (err: any) => {
                    this.error = err.error?.message || 'Registration failed';
                }
            });
    }
}