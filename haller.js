/*
*
* Haller.js v1.0
* sercaneraslan.com
*
*/

(function(){

    function Haller(isim, hal){
        this.isim                = isim.charAt(0).toUpperCase() + isim.slice(1);
        this.hal                 = hal;
        this.sesliHarfler        = ["a", "ı", "o", "u", "e", "i", "ö", "ü"];
        this.sertUnsuzler        = ["f", "s", "t", "k", "ç", "ş", "h", "p"];
        this.sapkaliHarfIsimleri = ["Alp", "Şevval", "Kemal", "Bilal", "Nihal", "Hilal", "Meral", "Resul", "Celal", "Cemal"];
        this.harf                = this.sesliHarfler.indexOf(this.isim.substr(this.isim.length-1,1));
        this.harf2               = this.sesliHarfler.indexOf(this.isim.substr(this.isim.length-2,1));
        this.harf3               = this.sesliHarfler.indexOf(this.isim.substr(this.isim.length-3,1));
        this.sonuSertUnsuz       = this.sertUnsuzler.indexOf(this.isim.substr(this.isim.length-1,1));
        this.sapkaliIsimler      = this.sapkaliHarfIsimleri.indexOf(this.isim);
        this.ekinSonHarfi;
        this.ekler;
        this.ek;
    }

    Haller.prototype = {
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
        ekeKararVer : function(){
            this.ekiOlustur(0,1,2,3,0,1);

            if(this.harf == -1){
                (this.harf2 == -1) ? this.harf = this.harf3 : this.harf = this.harf2;
                this.ekiOlustur(4,5,6,7,2,3);
            }
            return this.ek;
        },
        sapkaliHarfVarMi: function(){
            if(this.sapkaliIsimler !== -1){
                (this.hal == "i" || this.hal == "iyelik") ? this.ek = this.ekler[6] : this.ek = this.ekler[3];
            }
            return this.ek;
        },
        sonuSertUnsuzMu: function(){
            if(this.sonuSertUnsuz !== -1){
                if(this.hal == "de" || this.hal == "den"){
                    ekinSonHarfi = this.ek.slice(1, 3);
                    this.ek = "t" + ekinSonHarfi;
                }
            }
            return this.ek;
        },
        calistir: function(){
            this.eklereKararVer();
            this.ekeKararVer();
            this.sapkaliHarfVarMi();
            this.sonuSertUnsuzMu();
            return this.isim + "'" + this.ek;
        }
    }

    var haller = new Haller('sercan', 'de'),
        sonuc = haller.calistir();

    return sonuc;
}());
