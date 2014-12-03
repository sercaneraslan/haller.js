/*
*
* Haller.js v2.1.0
* http://sercaneraslan.github.io/Haller.js/
*
* (c) 2013-2014 Sercan Eraslan http://sercaneraslan.com
* License: MIT
*
*/
var Hal = function (isim, hal) {

    'use strict';

    var iyelik = 'iyelik',
        iHali = 'i',
        eHali = 'e',
        deHali = 'de',
        denHali = 'den',
        iEkleri = 'ııiiuuüü',
        sonHarf = isim[isim.length - 1],
        istisna = ~~/[ei][^ıüoö]*[au]l$|alp$/i.test(isim) * 2,   // Sapkali harf istisnasi var mı kontrol eder Orn: Alp, Resul, Cemal... 0 veya 2 degeri doner
        yumusamalar = {'k': 'ğ', 't': 'd', 'p': 'b', 'ç': 'c'},
        cinsIsimMi = !/^[A-ZÇİŞÜÖ]/.test(isim),
        sonSesli = isim.toLowerCase().match(/[aıeiouöü]/g).pop(),   // seslilerden sonuncusunu alır
                // Ek in sesli harfine karar verir
        ek = (hal === iyelik || hal === iHali) ?  // iyelik veya i hali ise
                    // Son sesli harf aıeiouöü harflerinin hangisine denk geliyorsa o index numarasıyla iEkleri nin n'inci elemanı seçilir
                    iEkleri['aıeiouöü'.indexOf(sonSesli) + istisna]
                : // e, de veya den hali ise
                    // Son sesli harf a, ı, o veya u ise ek a (istisna var ise e ), e, i, ö veya ü ise ek e harfi
                    (/[aıou]/.test(sonSesli)) ? istisna ? 'e' : 'a' : 'e';

    // Kaynastirma harflerini ekler
    if (sonHarf === sonSesli) {
        if (cinsIsimMi) {
            if (isim === 'su') {
                ek = (hal === iyelik) ? 'y' + ek : (hal === iHali || hal === eHali) ? 'y' + ek : ek;
            } else if (['o', 'bu', 'şu'].indexOf(isim) !== -1) {
                // zamirlerdeki özel durumlar
                ek = (hal === iyelik) ? 'n' + ek : (hal === iHali || hal === eHali) ? 'n' + ek : ek;
            } else {
                ek = (hal === iyelik) ? 'n' + ek : (hal === iHali || hal === eHali) ? 'y' + ek : ek;
            }

        } else {
            ek = (hal === iyelik) ? 'n' + ek : (hal === iHali || hal === eHali) ? 'y' + ek : ek;
        }
    }

    // Harf yumusamalarini kontrol eder
    if (hal === deHali || hal === denHali) {
        if (cinsIsimMi && ['o', 'bu', 'şu'].indexOf(isim) !== -1) {
            ek = 'nd' + ek;
        } else {
            ek = (/[fstkçşhp]/.test(sonHarf) ? 't' : 'd') + ek;
        }
    }

    // Iyelik veya den hali icin ek in sonuna n harfi ekler
    if (hal === iyelik || hal === denHali) {
        ek += 'n';
    }

    // Eğer cins isimse
    if (cinsIsimMi) {

        if (hal === iyelik || hal === iHali || hal === eHali) {
            if (['gönül', 'bağır'].indexOf(isim) !== -1) {
                // Ünlü düşmesine maruz kalan kelimeleri tespit et
                isim = isim.substr(0, isim.lastIndexOf(sonSesli)) + isim.substr(isim.lastIndexOf(sonSesli) + 1);
            } else if (['hak'].indexOf(isim) !== -1) {
                // Ünsüz çiftlemesine maruz kalan kelimeler
                isim = isim + sonHarf;
            } else if (/[ktpç]/.test(sonHarf)) {
                // Sert ünsüz yumuşamasını düzenler
                // Tek heceliler genellikle bu kuraldan muaftır
                if (isim.match(/[aıeiouöü]/ig).length > 1) {
                    if (isim === 'ahenk') {
                        // Ahank kelimesinde istisnai olarak k -> g olarak yumuşar
                        isim = isim.slice(0, -1) + 'g';
                    } else if (
                            // Yabancı kökenli bazı kelimelerde genelde yumuşama olmaz
                        ['millet', 'devlet', 'hürriyet', 'sanat', 'hukuk', 'hayat'].indexOf(isim) === -1 &&
                            // Fiil köklü bazı kelimeler de yumuşamaz
                            ['konut', 'taşıt'].indexOf(isim) === -1
                    ) {
                        isim = isim.slice(0, -1) + yumusamalar[sonHarf];
                    }
                } else {
                    // İstisna tek heceli kelimelerden biri ise yumuşar
                    if (['kap', 'kalp'].indexOf(isim) !== -1) {
                        isim = isim.slice(0, -1) + yumusamalar[sonHarf];
                    }
                }
            }
        }
        return isim + ek;
    }

    // Buraya kadar geldiyse kesinlikle özel isimdir
    return isim + "'" + ek;
};
