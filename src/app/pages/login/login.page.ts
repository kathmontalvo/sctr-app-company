import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { SessionService } from "src/app/services/session.service";
import { CompanyService } from "src/app/services/company.service";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading: any;
  validation_messages = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "Email no es válido" },
    ],
    password: [
      { type: "required", message: "La contraseña es requerida" },
      { type: "minLength", message: "Mínimo 6 caracteres " },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private companyService: CompanyService,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  ngOnInit() {}

  loginUser(credentials) {
    const grant_type = "password";
    const client_id = "2";
    const client_secret = "XrDnYGDzV8bLe0ZHWv71uKJP4vgYsCuvBQZ5fnpV";
    this.showLoading();
    const btn = document.getElementById("login-btn");
    this.authService
      .login(
        grant_type,
        client_id,
        client_secret,
        credentials.email,
        credentials.password
      )
      .subscribe(
        async (response) => {
          console.log(response);
          await this.sessionService.setItem(
            "access_token",
            response["access_token"]
          );
          this.getUser();
          // this.loading.dismiss();
          // this.router.navigate(["/home"]);
        },
        (error) => {
          this.loading.dismiss();
          this.presentAlert(
            "Error",
            "Usuario y/o contraseña incorrectos. Verifique la información.",
            "Aceptar"
          );
        }
      );
  }
  getUser() {
    if (this.sessionService.getItem("access_token")) {
      this.companyService.getData().subscribe(
        (user) => {
          this.loading.dismiss();
          this.sessionService.setObject("user", user["data"]);
          console.log(this.sessionService.getObject("user"));
          if(user['data'].role === 4){
            this.router.navigate(["/home"]);
          } else {
            this.presentAlert(
              "Error",
              "Usuario no válido. Por favor, verifique e intente nuevamente.",
              "Aceptar"
            );
          }
        },
        (error) => {
          console.log(error);
          this.loading.dismiss();
          this.presentAlert(
            "Error",
            "Error en las credenciales. Volver a intentar.",
            "Aceptar"
          );
        }
      );
    }
  }
  async presentAlert(title, message, btn) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: btn,
        },
      ],
    });
    await alert.present();
  }
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: "",
    });

    this.loading.present();
  }
}
