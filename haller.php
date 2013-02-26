<!DOCTYPE html>
<html lang="">
<head>
<meta charset="utf-8">
<title>haller.php</title>
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<meta name="robots" content="" />
</head>
<body>
<?php
	echo (Hal("Kemal Sunal","i"))."<br>";
	echo (Hal("Kemal Sunal","e"))."<br>";
	echo (Hal("Kemal Sunal","de"))."<br>";
	echo (Hal("Kemal Sunal","den"))."<br>";
?>
</body>
</html>
<?php
/**
 * haller.php
 *
 * https://github.com/ruhokuzu
 *
 * Javascript versiyon: Sercan Eraslan - https://github.com/skatersercan/Haller.js
 *
 * Katkılar:
 * Emre Erkan - https://github.com/karalamalar
 *
 */
function Hal($isim, $hal) {
	$iyelik = 'iyelik';
	$iHali = 'i';
	$eHali = 'e';
	$deHali = 'de';
	$denHali = 'den';
	$iEkleri = array( 'ı', 'i', 'u', 'ü' );
	$sesliIndex = array( 'a', 'ı', 'e', 'i', 'o', 'u', 'ö', 'ü' );
	$sonHarf = $isim[mb_strlen($isim)- 1];
	$istisna = (preg_match('/[ei][^auıüoö]*[au]l$|alp$/ui',$isim))? 2 : 0;

	preg_match_all('/[aıeiouöü]/ui', $isim, $sesliler);

	$sonSesli = end($sesliler[0]);
	$pos = array_search( $sonSesli, $sesliIndex );

	$iEki = 0;
	if($pos !== false){
		$iEki = floor( ($pos + $istisna) / 2 );
	}

	if($hal == $iyelik || $hal == $iHali) {
		$ek = $iEkleri[ $iEki ];
	}else{
		$ek = (preg_match('/[aıou]/',$sonSesli)) ? (($istisna) ? 'e' : 'a') : 'e';
	}

	if ( $sonHarf == $sonSesli ) {
		$ek = ($hal == $iyelik) ? 'n'.$ek : ($hal == $iHali || $hal == $eHali) ? 'y'.$ek : $ek;
	}

	if ($hal == $deHali || $hal == $denHali) {
		$ek = ( preg_match('/[fstkçşhp]/',$sonHarf) ) ? 't'.$ek : 'd'.$ek;
	}

	if ($hal == $iyelik || $hal == $denHali) {
		$ek .= 'n';
	}

	return $isim."'".$ek;
}
?>