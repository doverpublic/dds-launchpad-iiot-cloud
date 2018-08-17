import { Component, OnInit ,Output,EventEmitter,ViewChild,ElementRef,NgZone} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MouseEvent } from '@agm/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl ,FormArray} from '@angular/forms';
import { CreateUsersService } from "./createUsers.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
/* import {  } from 'googlemaps';
 */import { MapsAPILoader } from '@agm/core';
import * as _ from "lodash";
import { country } from '../../country';
import { state } from '../../state';
import { log } from 'util';
import { cities } from '../../cities';
import { Timezone } from '../../Timezone';
import { TabsetComponent } from 'ngx-bootstrap';
import { UsersService } from '../Users.service';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-and-update-users',
  templateUrl: './create-and-update-users.component.html',
  styleUrls: ['./create-and-update-users.component.scss']
})
export class CreateAndUpdateUsersComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  public indexvalue;
  public currentIndex:number=0;
  users: FormGroup;
  public indextest;
  public sampleData;

  public indextestUsergroup;
  public isvalid;
  error: any = { isError: false, errorMessage: '' };
  customClass: string = 'customClass';
  isFirstOpen: false;
  oneAtATime: boolean = true;
  accordionName: any;
  obj: any;
  public indextestsate;
  public indextestcity;
  public countries;
  public states;
  public cities;
  public usergroups;
  public UserGroupRoles;
  public lng: number;
  public lat: number;
  public roleValue;
  pager: any = {};
public country:null;
public state:null;
public city:null;
public HeaderDisplay;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  // paged items
  pagedItems: any[];
  public TimeZoneData:any[];
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobnumPattern = "^((\\+-?))?[0-9]{5,10}$"; 
  usernamePattern = "^[a-z0-9_-]{8,15}$";

  myForm:FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  Roles: any[];
  selectedItems: any[];
  dropdownSettings: any = {};
  tabs: any[] = [
    {
      title: 'User Details',
      content: 'User Details',
      customClass: 'customClass'
    },
    {
      title: 'Address',
      content: 'Address',
      customClass: 'customClass'
    },
    {
      title: 'Contact Info',
      content: 'Contact Info',
      customClass: 'customClass'
    },
  ];
  previous(i)
{

  console.log(this.staticTabs.tabs[i].active);
  this.staticTabs.tabs[i-1].active = true;

}
nextTab(i)
{
  this.staticTabs.tabs[i+1].active = true;

}
  constructor(private userService:UsersService,private router: Router, private fb: FormBuilder, private data: CreateUsersService,
    private httpService: HttpClient,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute
    ,private toastr: ToastrService) {


      
      this.countries=country;
      this.states=state;
      this.cities=cities;
      this.TimeZoneData=Timezone;
            this.usergroups=[{

              "name":"admin"
              
            },
            {

              "name":"admin1",
              
            }]
                  this.UserGroupRoles=[{
            "name":"System Admin"

                  },
                {
                  "name":"Branch Manger"
                },
              
              {
                "name":"Buisness Clerk"
              },
            {
              "name":"Maintenance Technician"
            }
]


     }
    
  ngOnInit() {
    // initial center position for the map
    this.lat = 12.9783;
    this.lng= 77.6647;
    this.createUsersForm();
    this.Roles = [
      { item_id: 1, item_text: 'System Admin' },
      { item_id: 2, item_text: 'Branch Manger' },
      { item_id: 3, item_text: 'Buisness Clerk' },
      { item_id: 4, item_text: 'Maintenance Technician' }
  ];
  this.selectedItems = [{ item_id: 1, item_text: 'System Admin' }];
  this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: this.ShowFilter
  };
  this.myForm = this.fb.group({
      role: [this.selectedItems]
  });
  }
  groups = [
    {
      title: 'User Details',
      content: 'Users',
      customClass: 'customClass'
    },
    {
      title: 'Address',
      content: 'Address',
      customClass: 'customClass'
    },
    {
      title: 'Contact',
      content: 'Contact',
      customClass: 'customClass'
    }
  ];
  add()
  {
  
  this.contactdeails.push({value:''});

  }
  remove(i)
  {
   this.contactdeails.splice(i, 1);

  } 
  statesList = [];
  citiesList = [];
  contactdeails=[{value:''}]
  selectedCountry=0;
  onRoleSelect(event)
  {
    console.log(event);
  }
  onCountrySelect(n) {
    this.statesList = [];
    this.citiesList = [];
      this.statesList = this.states.filter(function (s) {
  
      return s.country_id == n.id;
    });
   
  }
  onSateSelect(stateId) {
    this.citiesList = [];
    this.citiesList = this.cities.filter(function (i) {

      return i.state_id == stateId.id;
    });
    console.log(JSON.stringify(this.citiesList));
/* 
    if(this.citiesList.length===0){
      console.log("True");
      this.citiesList.push({"name":stateId.name,"state_id":stateId.id});
    } */
  }
  onCitySelect(cityid) {
  }

  open(group, i) {
    if (this.accordionName == group) {

      this.groups[i]["isFirstOpen"] = false;
      this.accordionName = "";

    } else if (this.accordionName == undefined) {
      this.groups[i]["isFirstOpen"] = true;
      this.accordionName = this.groups[i];
    }
    else {
      group = this.groups[i];
      for (i in this.groups) {
        this.groups[i]["isFirstOpen"] = false;

      }

      this.oneAtATime = true;
      group.isFirstOpen = !group.isFirstOpen;
      this.accordionName = group;
    }



  }
  next(group, i) {
    group.isFirstOpen = !group.isFirstOpen;

    ++i;

    group = this.groups[i];
    group.isFirstOpen = !group.isFirstOpen;

  }
  redirect() {
    this.router.navigate(['admin']);

  }
  createUsersForm()
  {
    this.users = this.fb.group({
      title:[],
      role:[],
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      lastname: ['',Validators.compose([ Validators.required, Validators.minLength(2)])],
      ToggleActive:'Active',     
      file:[''],
      userGroup:[''],
      username:['',Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(15),Validators.pattern(this.usernamePattern)])],
      email:['',Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
      address: ['',Validators.compose([ Validators.required, Validators.minLength(2)])],
      country: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      zipcode: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')])],
      phonenumber: ['',Validators.pattern(this.mobnumPattern)],
      fax: [''],
         
      EmergencyContact: this.fb.array([    
        this.fb.group({
          'firstname': [''],
          'lastname': [''],
          'email': ['', [Validators.pattern(this.emailPattern)]],
          'phone':['', [Validators.pattern(this.mobnumPattern)]]
        })
       ])
      
    });
    if (this.isEmpty(this.data.UsersData)) {
      this.HeaderDisplay=true;
      this.users = this.fb.group({
        title:[],
        role:[],
        firstname: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
        lastname: ['',Validators.compose([ Validators.required, Validators.minLength(2)])],
        ToggleActive:'Active',     
        file:[''],
        userGroup:[''],

        username:['',Validators.compose([ Validators.required, Validators.minLength(8),Validators.maxLength(15),Validators.pattern(this.usernamePattern)])],
        email:['',Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
        address: ['',Validators.compose([ Validators.required, Validators.minLength(2)])],
        country: ['',Validators.required],
        state: ['',Validators.required],
        city: ['',Validators.required],
        zipcode: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}(?:-[0-9]{5})?$')])],
        phonenumber: ['',Validators.pattern(this.mobnumPattern)],
        fax: [''],
         
        EmergencyContact: this.fb.array([    
          this.fb.group({
            'firstname': [''],
            'lastname': [''],
            'email': ['', [Validators.pattern(this.emailPattern)]],
            'phone':['', [Validators.pattern(this.mobnumPattern)]]
          })
         ])
         });

    }else{
            console.log("Eited condition");
            this.HeaderDisplay=false;
        this.users = this.fb.group({
          role:[],
          title:[],
          firstname: [this.data.UsersData.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
          lastname: [this.data.UsersData.lastName,Validators.compose([ Validators.required, Validators.minLength(2)])],
          ToggleActive:this.data.UsersData.activeFlag,     
          file:[],
          userGroup:[],
    
          username:[this.data.UsersData.userName,Validators.compose([ Validators.required, Validators.minLength(8),Validators.maxLength(15),Validators.pattern(this.usernamePattern)])],
          email:[this.data.UsersData.email,Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])],
          address: ['', Validators.required],
          country:  ['', Validators.required],
          state: ['', Validators.required],
          city: ['', Validators.required],
          zipcode: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{6}(?:-[0-9]{5})?$')])],
          phonenumber: [this.data.UsersData.phone],
          fax: [],
         
          EmergencyContact: this.fb.array([    
            this.fb.group({
              'firstname': [''],
              'lastname': [''],
              'email': ['', [Validators.pattern(this.emailPattern)]],
              'phone':['', [Validators.pattern(this.mobnumPattern)]]
            })
           ])
      
      
      });
      /* this.indextest = _.findIndex(this.countries,this.data.UsersData.country);
      this.indextestsate = _.findIndex(this.states,this.data.UsersData.state);
      this.indextestcity = _.findIndex(this.cities,this.data.UsersData.city);
      this.indextestUsergroup=_.findIndex(this.cities,this.data.UsersData.userGroup);
    this.users.controls['country'].setValue(this.countries[this.indextest], {onlySelf: true});
    this.onCountrySelect(this.data.UsersData.country);
    this.onSateSelect(this.data.UsersData.state);
     this.users.controls['state'].setValue(this.states[this.indextestsate], {onlySelf: true});
    this.url = this.data.UsersData.file;
     this.users.controls['city'].setValue(this.cities[this.indextestcity], {onlySelf: true});  
     this.users.controls['userGroup'].setValue("admin", {onlySelf: true});   */

    }


  }

  url = '';
  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png') {
        return true;
    }else if (ext.toLowerCase() == 'jpg') {
      return true;
  }
    else {
        return false;
    }
  } 
  
  public imagefile:any[];
  onSelectFile(event) {
    this.url ="";
    if (event.target.files && event.target.files[0])
     {
      if (!this.validateFile(event.target.files[0].name)) {
        this.users.controls['file'].setValue('', {onlySelf: true});
        this.imagefile=[];
        this.error= {isError:true,errorMessage:"please upload jpg ,png file"}
        return {
          error: {isError:true,errorMessage:"please upload jpg ,png file"}
         };       

    }else
    {
      var maxSize=25600;
      if(event.target.files[0].size > 25600 )
      {
        this.users.controls['file'].setValue('', {onlySelf: true});

        this.error= {isError:true,errorMessage:"file size should be < 25kb"}
        return {
          error: {isError:true,errorMessage:"file size should be < 25kb"}
         };       

      }
      else
      {
        var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
             var pattern = /image-*/;
             var reader = new FileReader();
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
     var i = Math.floor(Math.log(event.target.files[0].size) / Math.log(1024));
  
        this.imagefile=[{"name":event.target.files[0].name,
        "filesize":Math.round(event.target.files[0].size / Math.pow(1024, i))+"kb"}]
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (event:any) => { // called once readAsDataURL is completed
         this.url = event.target.result;
         this.users.patchValue({
          file: event.target.result
       });
        
      }
      this.error= {isError:false}
      return {
        error: {isError:false}
       };  
       
    }


     }
    }
  }
  public attributValue='';
  public countryAttrValue='';
  public stateAttrValue='';
  public cityAttrValue='';
setAttribute(event,type)
{
  
  if(type=='country')
  {
    this.countryAttrValue=event.target.value;

  }else if(type=='state')
{
  this.stateAttrValue=event.target.value;

}
else if(type=='city')
{
  this.cityAttrValue=event.target.value;


}else
{
  this.attributValue=event.target.value;

}
}


initEmergencyContacts() {
     
  return  this.fb.group({
      'firstname': [''],
      'lastname': [''],
      'email': ['', [Validators.pattern(this.emailPattern)]],
      'phone':['', [Validators.pattern(this.mobnumPattern)]]
   })
}

addNewRow() {
  const control = <FormArray>this.users.controls['EmergencyContact'];
  control.push(this.initEmergencyContacts());
}

deleteRow(index: number) {
  const control = <FormArray>this.users.controls['EmergencyContact'];
  control.removeAt(index);
}

  cancelEdit() {
    this.data.UsersData = [];
    this.users.reset();
    this.router.navigate(['/admin/users/viewUsers']);


  }
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  getSampleData()
  {
    this.userService.getNewSample().subscribe(data => {
      this.sampleData=data;
      console.log(JSON.stringify(data));
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  }

  createUserFunction(obj)
  {
    this.userService.createUserData(obj)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['/admin/users/viewUsers']); 
      
    }, (err: HttpErrorResponse) => {
      console.log(err);
      if (err.error instanceof Error) {
        console.log("Client-side error occured.");
      } else {
        console.log("Server-side error occured.");
      }
    });
  }
  Submit({ value, valid }: { value: CreateUsersService, valid: boolean }) {
    if (this.isEmpty(this.data.UsersData)) {
      console.log("create User data");
      this.data.UsersData=value;

      this.getSampleData();
      this.userService.getNewSample().subscribe(data => {
        this.sampleData=data;
        this.sampleData["firstName"]=this.data.UsersData.firstname;
        this.sampleData["lastName"]=this.data.UsersData.lastname;
        
        this.sampleData["userName"]=this.data.UsersData.username;
        
        this.sampleData["email"]=this.data.UsersData.email;
        
        this.sampleData["phone"]=this.data.UsersData.phonenumber;
        this.sampleData["activeFlag"]=this.data.UsersData.ToggleActive;
        console.log(this.sampleData);

        this.createUserFunction(this.sampleData);


          }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });


      

    }else
    {
      console.log("Edit User data");
      console.log(this.data.UsersData);
      var obj={};
      obj["firstName"]=value.firstname;
      obj["lastName"]=value.lastname;
      
      obj["userName"]=value.username;
      
      obj["email"]=value.email;
      
      obj["phone"]=value.phonenumber;
      obj["activeFlag"]=value.ToggleActive;
      obj["id"]=this.data.UsersData.id;
      obj["_id"]=this.data.UsersData._id;

      console.log(obj);
      this.userService.EditUser(obj)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/admin/users/viewUsers']); 
        
      }, (err: HttpErrorResponse) => {
        console.log(err);
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });

    }
    /* this.data.UsersData=value;
    console.log(this.data.UsersData);
    this.toastr.info('Successfully created');
    this.users.reset();

    this.router.navigate(['/admin/users/viewUsers']); */

  }
  // google maps zoom level
  zoom: number = 15;

  

  clickedMarker(label: string, index: number) {
  }

  mapClicked($event: MouseEvent) {
    /* this.markers=[];
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
   */
    this.users.controls['latitude'].setValue( $event.coords.lat, {onlySelf: true});
    this.users.controls['longitude'].setValue( $event.coords.lng, {onlySelf: true});
  
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
  }

  markers: marker[] = [
    {
      lat: 12.9783,
      lng: 77.6647,
      label: 'A',
      draggable: true
    }
  ]
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}