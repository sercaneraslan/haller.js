/*
* Copyright 2012 Sercan Eraslan
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/*
*
* Haller.js v2.1
* http://sercaneraslan.github.io/Selider/
*
* Github : @sercaneraslan
* Twitter : @sercan_eraslan
* Web : sercaneraslan.com
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
