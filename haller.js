/*
*
* Haller.js v1.0
* sercaneraslan.com
*
*/
var Haller = (function(){

    function Haller(isim, hal){
        this.isim = isim.charAt(0).toUpperCase() + isim.slice(1);
        this.hal = hal;
        this.calistir();
    }

    Haller.prototype = {
        sesliHarfler : ["a", "ı", "o", "u", "e", "i", "ö", "ü"],
        sertUnsuzler : ["f", "s", "t", "k", "ç", "ş", "h", "p"],
        sapkaliHarfIcerenIsimler : ["Alp", "Şevval", "Kemal", "Bilal", "Nihal", "Hilal", "Meral", "Resul", "Celal", "Cemal", "Seval"],

        isminSonSesliHarfi: function(sayi){
            return this.sesliHarfler.indexOf(this.isim.substr(this.isim.length-sayi,1));
        },
        eklereKararVer: function(){
            if(this.hal == "e"){
                this.ekler = ["ya", "ye", "a", "e"];
            }
            else if(this.hal == "de"){
                this.ekler = ["da", "de", "da", "de"];
            }
            else if(this.hal == "den"){
                this.ekler = ["dan", "den", "dan", "den"];
            }
            else if(this.hal == "i"){
                this.ekler = ["yı", "yu", "yi", "yü", "ı", "u", "i", "ü"];
            }
            else if(this.hal == "iyelik"){
                this.ekler = ["nın", "nun", "nin", "nün", "ın", "un", "in", "ün"];
            }
            return this.ekler;
        },
        ekiOlustur: function(a,b,c,d,e,f){
            if(this.hal == "i" || this.hal == "iyelik"){
                if(this.harf == 0 || this.harf == 1){
                    this.ek = this.ekler[a];
                }
                else if(this.harf == 2 || this.harf == 3){
                    this.ek = this.ekler[b];
                }
                else if(this.harf == 4 || this.harf == 5){
                    this.ek = this.ekler[c];
                }
                else if(this.harf == 6 || this.harf == 7){
                    this.ek = this.ekler[d];
                }
            }else{
                (this.harf <= 3) ? this.ek = this.ekler[e] : this.ek = this.ekler[f];
            }
            return this.ek;
        },
        ekeKararVer: function(){
            this.harf = this.isminSonSesliHarfi(1);
            this.ekiOlustur(0,1,2,3,0,1);

            if(this.harf == -1){
                (this.isminSonSesliHarfi(2) == -1) ? this.harf = this.isminSonSesliHarfi(3) : this.harf = this.isminSonSesliHarfi(2);
                this.ekiOlustur(4,5,6,7,2,3);
            }
            return this.ek;
        },
        sapkaliHarfVarMi: function(){
            if(this.sapkaliHarfIcerenIsimler.indexOf(this.isim) !== -1){
                (this.hal == "i" || this.hal == "iyelik") ? this.ek = this.ekler[6] : this.ek = this.ekler[3];
            }
            return this.ek;
        },
        sonuSertUnsuzMu: function(){
            if(this.sertUnsuzler.indexOf(this.isim.substr(this.isim.length-1,1)) !== -1){
                if(this.hal == "de" || this.hal == "den"){
                    this.ekinSonHarfi = this.ek.slice(1, 3);
                    this.ek = "t" + this.ekinSonHarfi;
                }
            }
            return this.ek;
        },
        calistir: function(){
            this.eklereKararVer();
            this.ekeKararVer();
            this.sapkaliHarfVarMi();
            this.sonuSertUnsuzMu();

        },
        toString : function () {
            return this.isim + "'" + this.ek;        
        }
    }

    return Haller;    
}());

//ornek
var sonuc = new Haller('Sercan', 'de');
console.log("Sonuc : " + sonuc, sonuc, sonuc.toString());
