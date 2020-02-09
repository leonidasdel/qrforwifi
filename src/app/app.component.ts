import { Component, Input, ValueProvider } from '@angular/core';
import QRCode from "qrcode"
import * as pdfMake from '../../node_modules/pdfmake/build/pdfmake';
import * as pdfFonts from '../../node_modules/pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
constructor(){
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
}
dd;
  ssid:String;
  password:String;
  encryption:String="WPA";
  options={width:400}
  revealpassword(){
    var password = (<HTMLInputElement>document.querySelector(".pwd"));
    if(password.type==="password"){
      password.type="text"
    }
    else{
      password.type="password"
    }
    var eye= document.getElementById('eye')
    console.log(eye.classList[1])
    if(eye.classList[1]=='fa-eye-slash'){
      eye.className='fa fa-eye'
    }
    else{
      eye.className='fa fa-eye-slash'
    }
  }
  addssid($event){
    this.ssid=$event.target.value
  }
  addpassword($event){
    this.password=$event.target.value
  }
  addencryption($event){
    this.encryption=$event.target.value
  }
  preventRefresh($event){
      $event.preventDefault();
     QRCode.toCanvas(document.getElementById('canvas'),  "WIFI:"+ "T:" + this.encryption + ";"+ "S:" + this.ssid + ";" + "P:" + this.password +";" + "H:" + "true" + ";" + ";",this.options, function (error) {
   if (error) console.error(error)
    console.log('success!');
  }) 
    

  

  }

  generatepdf($event){
    
    this.dd = {
      pageSize: 'A4',
      
      content: [
     {text:`Wifi name: ${this.ssid}`,alignment:'center',
     fontSize:30,margin:[0,195,0,0]},{text:`Wifi password: ${this.password}`,
     alignment:'center',fontSize:30,margin:[0,25,0,0]},{ qr: "WIFI:"+ "T:" + this.encryption + ";"+ "S:" + this.ssid + ";" + "P:" + 
     this.password +";" + "H:" + "true" + ";" + ";",alignment:'center', margin:[0,35,0,0],fit: '250'}
    ]
  }
    pdfMake.createPdf(this.dd).open({}, window);

  }
  scrollpx($event){
    // window.scrollBy({ 
    //   top: 150, // negative value acceptable
    //   left: 0, 
    //   behavior: 'smooth' 
    // });
    $event.preventDefault()
    document.querySelector('#buttonhelper').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
}
