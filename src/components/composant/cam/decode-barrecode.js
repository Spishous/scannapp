import Quagga from '@ericblade/quagga2';

export class scanner {
  multipleVerification = [0, 0];
  resetQuagga() {
    this.multipleVerification = [0, 0];
  }
  startQuagga(data, callback) {
    let locate = true;
    if (data.includes("data:", 0)) locate = false;
    let that=this;
    Quagga.decodeSingle(
      {
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            //"i2of5_reader"
          ],
        },
        locate: locate,
        src: data,
      },
      function (result) {
        if (result.codeResult) {
          that.multipleVerification.unshift(result.codeResult.code);
          that.multipleVerification.pop();
          //Multiple verif ok
          let verifPass = true;
          that.multipleVerification.forEach((item) => {
            if (item !== that.multipleVerification[0]) {
              verifPass = false;
            }
          });
          if (verifPass) {
            callback(result.codeResult.code);
            that.resetQuagga();
          } else {
            callback(0);
          }
        } else {
          callback(-1);
        }
      }
    );
  }
}
