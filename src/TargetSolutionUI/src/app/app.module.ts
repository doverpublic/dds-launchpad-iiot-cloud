import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Http, HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './shared/services/http.service';
import { Routes, RouterModule } from '@angular/router';




/* Authorization Components */
import { MSALService } from './shared/services/msal.service';
import { AuthenticationHttpInterceptor } from './shared/services/authentication.httpInterceptor';
import {AuthGuard} from './shared/services/authguard.service';

/* Shared Components */
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { AppComponent } from './app.component';
import { AppConfig }  from './app.config';
import {AppConstants } from './config/app.constants';

/* NGX boot Components */
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal'
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { TileComponent } from './tile/tile.component';
import { ClearinputDirective } from './shared/directives/clearinput.directive';

/* Users Components */
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/Users.service';
import { CreateUsersService } from './users/create-and-update-users/createUsers.service';
import { CreateAndUpdateUsersComponent } from './users/create-and-update-users/create-and-update-users.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { UserinfoComponent } from './users/userinfo/userinfo.component';

/* Trailers Components */
import { TrailercompanyComponent } from './trailercompany/trailercompany.component';
import { CreateTrailerService } from "./trailercompany/create-and-edit-trailer-data/createTrailer.service"
import { ViewtrailerdetailComponent } from './trailercompany/viewtrailerdetail/viewtrailerdetail.component';
import { TrailerInfoComponent } from './trailercompany/trailer-info/trailer-info.component';
import { CreateAndEditTrailerDataComponent } from './trailercompany/create-and-edit-trailer-data/create-and-edit-trailer-data.component';

/* Dispatch Office Components */
import { CreateDispatchOfficeService } from './dispatchoffice/create-and-update-dispatch-office/createDispatchOffice.service';
import { DispatchofficeComponent } from './dispatchoffice/dispatchoffice.component';
import { ViewDispatchOfficeComponent } from './dispatchoffice/view-dispatch-office/view-dispatch-office.component';
import { CreateAndUpdateDispatchOfficeComponent } from './dispatchoffice/create-and-update-dispatch-office/create-and-update-dispatch-office.component';

/* Other Components */
import { AssetmanagementComponent } from './assetmanagement/assetmanagement.component'
import { LivetrackingComponent } from './livetracking/livetracking.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminstrationComponent } from './adminstration/adminstration.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagerService } from './tile/pager.service';

import { LocationsComponent } from './locations/locations.component';
import { DriversComponent } from './drivers/drivers.component';
import { OrderModule } from 'ngx-order-pipe';
import { ExcelService } from './shared/services/excel.service';
import { AlertsComponent } from './alerts/alerts.component';
import { AssetsComponent } from './assets/assets.component';
import { ToastrModule } from 'ngx-toastr';
import { DisableControlDirectiveDirective } from './shared/directives/disable-control-directive.directive';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },

  {
    path: 'asset',
    component: AssetmanagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'track',
    component: LivetrackingComponent
  },
  {
    path: 'report',
    component: ReportsComponent
  },
  {
    path: 'admin',
    component: AdminstrationComponent , canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'trailercompany', component: TrailercompanyComponent,
        children: [
          {
            path: '', redirectTo: 'view',
            pathMatch: 'full'
          },
          {
            path: 'view', component: ViewtrailerdetailComponent
          },
          {
            path: 'Edit', component: CreateAndEditTrailerDataComponent
          },
          {
            path:'trailerInfo',component:TrailerInfoComponent
          }

        ]
      }

      , {
        path: 'dispatchoffice', component: DispatchofficeComponent
        ,
        children: [{
          path: '', redirectTo: 'viewDispatchOffice',
          pathMatch: 'full'
        },

        {
          path: "viewDispatchOffice",
          component: ViewDispatchOfficeComponent
        },
        {
          path: "createUpdateDispatch",
          component: CreateAndUpdateDispatchOfficeComponent
        }

        ]
      }, {
        path: 'locations', component: LocationsComponent

      }
      , {
        path: 'drivers', component: DriversComponent

      }, {
        path: 'users', component: UsersComponent ,
        children: [{
          path: '', redirectTo: 'viewUsers',
          pathMatch: 'full'
        },

        {
          path: "viewUsers",
          component: ViewUsersComponent
        },
        {
          path: "createUpdateUsers",
          component: CreateAndUpdateUsersComponent
        },
        {
          path:"userInfo",
          component:UserinfoComponent
        }

        ]

      }, {
        path: 'alerts', component: AlertsComponent

      }, {
        path: 'assets', component: AssetsComponent
      }
    ]
  },

  {
    path: '**', component: PagenotfoundComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PagenotfoundComponent,
    HomeComponent,
    AssetmanagementComponent,
    LivetrackingComponent,
    ReportsComponent,
    AdminstrationComponent,
    CreateAndEditTrailerDataComponent,
    DashboardComponent,
    TrailercompanyComponent
    , FilterPipe,
    TileComponent,
    ClearinputDirective,
    DispatchofficeComponent,
    LocationsComponent,
    DriversComponent,
    UsersComponent,

    AlertsComponent,
    AssetsComponent,
    ViewtrailerdetailComponent,
    DisableControlDirectiveDirective,
    CreateAndUpdateDispatchOfficeComponent,
    ViewDispatchOfficeComponent,
    ViewUsersComponent,
    CreateAndUpdateUsersComponent
	,
    UserinfoComponent,
    TrailerInfoComponent
  ],
  imports: [HttpModule, HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    OrderModule,
    RouterModule.forRoot(routes),
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot(),
 ToastrModule.forRoot({
      timeOut: 1200,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDpzvxoASC9m4e9AFPMUoLUWQAqcptsn8Q',
      libraries: ["places"]
    })
  ],

  providers: [AppConstants,AppConfig,MSALService,ExcelService, CreateTrailerService,UsersService,HttpService,AuthGuard,  PagerService,CreateDispatchOfficeService,CreateUsersService,
    {
        provide: APP_INITIALIZER,
        useFactory: (config: AppConfig) => () => config.load(),
        deps: [AppConfig],
        multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => () => config.loadPrivacy(),
      deps: [AppConfig],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => () => config.loadTerms(),
      deps: [AppConfig],
      multi: true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationHttpInterceptor,
      multi: true
    }],

  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
