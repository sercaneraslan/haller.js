/*
*
* Haller.js v2.0
* sercaneraslan.com
*
* Kullanımı örnekleri:
* console.log(Hal("sercan","de"));      > sercan'da
* console.log(Hal("murat","iyelik"));   > murat'ın
* console.log(Hal("osman","i"));        > osman'ı
* console.log(Hal("alp","de"));         > alp'te
* console.log(Hal("cemal","e"));        > cemal'e
*/
var Hal = function(isim, hal, undefined) {
    var sesliHarfler = 'aıeiouöü',
        sertUnsuzler = 'fstkçşhp',
        iyelik = 'iyelik',
        iHali = 'i',
        eHali = 'e',
        deHali = 'de',
        denHali = 'den',
        ekKontrolleri = {0 : 'ı', 1 : 'ı', 2 : 'i', 3 : 'i', 4 : 'u', 5 : 'u', 6 : 'ü', 7 : 'ü'},
        sonSesliIndex,
        sesliler=[],
        oncekiSesli,
        sonSesli,
        sonHarf,
        istisna,
        code,
        ek,
        i;

    for (i in isim) {    // Ismin her bir harfi icin...
        // Eger bu harf sesli ise sesliler listesine harf sira numarasini ekle,
        // bu harfin isimdeki sira numarasini sonSesliIndex degiskenine ata (integer'a cevir)
        (code = sesliHarfler.indexOf(isim[i])) > -1 && (sesliler.push(code) & (sonSesliIndex = ~~i));
        // Bu harfi sonHarf degiskenine al
        sonHarf = isim[i];
    }
    
    sonSesli = sesliler.pop();

    // Sapkali harf istisnasi var mı? Orn: Alp, Resul, Cemal...
    if ( sonSesli == 0 || sonSesli == 5) {    // Son sesli harf a veya u ise
        // son sesliden sonraki harf l ise
        if (isim[sonSesliIndex + 1] == 'l') {
            // onceki sesli e veya i ise ya da isim tek hece ise
            oncekiSesli = sesliler.pop();
            if ( oncekiSesli == undefined || oncekiSesli == 2 || oncekiSesli == 3) {
                istisna = 1;
            }
        }
    }

    ek = (hal == iyelik || hal == iHali) ?    // iyelik veya i hali ise
            // sonSesli degiskeninin degeriyle ekKontrolleri objesinin n inci elemanına karsilik gelen obje degerini alır
            ekKontrolleri[istisna ? sonSesli+2 : sonSesli]
       : // e, de ve den hali ise
            // Son sesli harf a, ı, o veya u ise ek a (istisna var ise e ), e, i, ö veya ü ise ek e harfi
            ((sonSesli <= 1 || sonSesli == 4 || sonSesli == 5) ? istisna ? 'e' : 'a' : 'e');

    // Kaynaştırma harflerini ekler
    if ( sesliHarfler.indexOf( sonHarf ) > -1 ) {    // Son harf sesli harf ise
        // hal iyelik ise ek in basina n harfi ekler, hal i ve e hali ise ek in basina y harfi ekler
        ek = (hal == iyelik) ? 'n' + ek : (hal == iHali || hal == eHali) ? 'y' + ek : ek;
    }

    // Harf yumusamalarini kontrol eder
    if (hal == deHali || hal == denHali) {    // de veya den hali ise
        // Son harf sert ünsüz ise ek in basina t harfi ekler degilse d harfi ekler
        ek = (sertUnsuzler.indexOf( sonHarf ) > -1 ? 't' : 'd') + ek;
    }

    // iyelik veya den hali icin ek in sonuna n harfi ekler
    if (hal == iyelik || hal == denHali) {
        ek += 'n' 
    }

    return isim + "'" + ek;
};
