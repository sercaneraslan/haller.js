/*
*
* Haller.js v2.1
* sercaneraslan.com
*
*/
var Hal = function(isim, hal) {
    var iyelik = 'iyelik',
        iHali = 'i',
        eHali = 'e',
        deHali = 'de',
        denHali = 'den',
        iEkleri = 'ııiiuuüü',
        sonHarf = isim[isim.length - 1],
        istisna = ~~/[ei][^ıüoö]*[au]l$|alp$/.test(isim) * 2,   // Sapkali harf istisnasi var mı kontrol eder Orn: Alp, Resul, Cemal... 0 veya 2 degeri doner
        sonSesli = isim.match(/[aıeiouöü]/g).pop(),   // seslilerden sonuncusunu alır

        // Ek in sesli harfine karar verir
        ek = (hal == iyelik || hal == iHali) ?  // iyelik veya i hali ise
                // Son sesli harf aıeiouöü harflerinin hangisine denk geliyorsa o index numarasıyla iEkleri nin n'inci elemanı seçilir
                iEkleri[ 'aıeiouöü'.indexOf(sonSesli) + istisna ]
            : // e, de veya den hali ise
                // Son sesli harf a, ı, o veya u ise ek a (istisna var ise e ), e, i, ö veya ü ise ek e harfi
                (/[aıou]/.test(sonSesli)) ? istisna ? 'e' : 'a' : 'e';

    // Kaynastirma harflerini ekler
    if ( sonHarf == sonSesli ) {
        ek = (hal == iyelik) ? 'n' + ek : (hal == iHali || hal == eHali) ? 'y' + ek : ek
    }

    // Harf yumusamalarini kontrol eder
    if (hal == deHali || hal == denHali) {
        ek = (/[fstkçşhp]/.test( sonHarf ) ? 't' : 'd') + ek
    }

    // Iyelik veya den hali icin ek in sonuna n harfi ekler
    if (hal == iyelik || hal == denHali) {
        ek += 'n'
    }

    return isim + "'" + ek;
};
