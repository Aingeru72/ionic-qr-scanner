/**
 * Modelo de datos para los códigos QR escaneados
 * @param data: string con el resultado del código QR escaneado.
 * @param tipo: string con el tipo de resultado:
 * web (http(s)), geolocalización, teléfono, SMS, VCard (contacto), email, evento, WiFi...
 * @param icon: string con el src del icono dependiente del tipo de resultado.
 */
export class ScanData {

    /** Data obtenida del escaner */
  public data: string;
    /** Tipo de dato escaneado */
  public tipo: string;
    /** Icono identificativo para el tipo de dato */
  public icon: string;

  constructor(data: string) {
      this.data = data;

      if (data.startsWith('http')) {
            // URL web address
          this.tipo = TipoDato.url;
          this.icon = 'assets/imgs/chrome_logo.svg';
        } else if (data.startsWith('TEL')) {
            // Phonenumber
          this.tipo = TipoDato.tel;
          this.icon = 'assets/imgs/phone.jpg';
        } else if (data.startsWith('geo')) {
            // Geolocation (maps coords)
          this.tipo = TipoDato.geo;
          this.icon = 'assets/imgs/maps_round_logo.jpg';
        } else if (data.startsWith('BEGIN:VCARD')) {
            // VCARD (Contact)
          this.tipo = TipoDato.vcard;
          this.icon = 'assets/imgs/contacts_logo.png';
        } else if (data.toLocaleLowerCase().startsWith('mailto') || data.toLowerCase().startsWith('matmsg')) {
            // Email
          this.tipo = TipoDato.email;
          this.icon = 'assets/imgs/email.svg';
        } else {
            // Unknown
          this.tipo = TipoDato.none;
          this.icon = 'assets/imgs/unknown.svg';
        }
    }
}

/** Enumerado con los posibles tipos de dato resultantes del escaner QR */
export enum TipoDato {
    url = 'url',
    tel = 'tel',
    geo = 'geo',
    vcard = 'vcard',
    text = 'text',
    email = 'email',
    sms = 'sms',
    pdf = 'pdf',
    mp3 = 'mp3',
    app = 'app',
    img = 'img',
    none = 'none',
}
