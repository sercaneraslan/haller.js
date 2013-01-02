/*
*
* Haller.js v1.0
* sercaneraslan.com
*
*/
var Haller = {};

Haller.init = function(isim, hal){
    var isim = isim.charAt(0).toUpperCase() + isim.slice(1),
        sesliHarfler = ["a", "ı", "o", "u", "e", "i", "ö", "ü"],
        sertUnsuzler = ["f", "s", "t", "k", "ç", "ş", "h", "p"],
        sapkaliHarfIsimleri = ["Alp", "Bilal", "Nihal", "Hilal", "Meral", "Seval", "Şevval", "Kemal", "Resul", "Celal", "Cemal"],
        harf = sesliHarfler.indexOf(isim.substr(isim.length-1,1)),
        harf2 = sesliHarfler.indexOf(isim.substr(isim.length-2,1)),
        harf3 = sesliHarfler.indexOf(isim.substr(isim.length-3,1)),
        sonuSertUnsuz = sertUnsuzler.indexOf(isim.substr(isim.length-1,1)),
        sapkaliIsimler = sapkaliHarfIsimleri.indexOf(isim),
        ekinSonHarfi,
        ekler,
        ek,

        eklereKararVer = function(){
            if(hal == "e"){
                ekler = ["ya", "ye", "a", "e"];
            }
            else if(hal == "de"){
                ekler = ["da", "de", "da", "de"];
            }
            else if(hal == "den"){
                ekler = ["dan", "den", "dan", "den"];
            }
            else if(hal == "i"){
                ekler = ["yı", "yu", "yi", "yü", "ı", "u", "i", "ü"];
            }
            else if(hal == "iyelik"){
                ekler = ["nın", "nun", "nin", "nün", "ın", "un", "in", "ün"];
            }
            return ekler;
        },
        ekiOlustur = function(a,b,c,d,e,f){
            if(hal == "i" || hal == "iyelik"){
                if(harf == 0 || harf == 1){
                    ek = ekler[a];
                }
                else if(harf == 2 || harf == 3){
                    ek = ekler[b];
                }
                else if(harf == 4 || harf == 5){
                    ek = ekler[c];
                }
                else if(harf == 6 || harf == 7){
                    ek = ekler[d];
                }
            }else{
                (harf <= 3) ? ek = ekler[e] : ek = ekler[f];
            }
            return ek;
        },
        ekeKararVer = function(){
            ekiOlustur(0,1,2,3,0,1);

            if(harf == -1){
                (harf2 == -1) ? harf = harf3 : harf = harf2;
                ekiOlustur(4,5,6,7,2,3);
            }
            return ek;
        },
        sapkaliHarfVarMi = function(){
            if(sapkaliIsimler !== -1){
                (hal == "i" || hal == "iyelik") ? ek = ekler[6] : ek = ekler[3];
            }
            return ek;
        },
        sonuSertUnsuzMu = function(){
            if(sonuSertUnsuz !== -1){
                if(hal == "de" || hal == "den"){
                    ekinSonHarfi = ek.slice(1, 3);
                    ek = "t" + ekinSonHarfi;
                }
            }
            return ek;
        };

    eklereKararVer();
    ekeKararVer();
    sapkaliHarfVarMi();
    sonuSertUnsuzMu();

    return isim + "'" + ek;
}

console.log(Haller.init("sercan","de"));
