import { Component, OnInit } from '@angular/core';
import Quagga from 'quagga'

@Component({
  selector: 'app-bar-code',
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.scss']
})
export class BarCodeComponent implements OnInit {
  errorMessage: string;

  constructor() { }

  ngOnInit() {
    Quagga.init({
      inputStream: {
        constraints: {
          facingMode: 'environment' // restrict camera type
        },
        area: { // defines rectangle of the detection
          top: '40%',    // top offset
          right: '0%',  // right offset
          left: '0%',   // left offset
          bottom: '40%'  // bottom offset
        },
      },
      decoder: {
        readers: ['ean_reader'] // restrict code types
      },
    },
    (err) => {
      if (err) {
        this.errorMessage = `QuaggaJS could not be initialized, err: ${err}`;
      } else {
        Quagga.start();
        Quagga.onDetected((res) => {
          window.alert(`code: ${res.codeResult.code}`);
        })
      }
    });
    
  }
  


}
