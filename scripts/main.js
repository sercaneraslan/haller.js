$(function() {
    $("#send").click(function() {
        var yourName = $("#yourName").val(),
            nameStatus = $("#nameStatus").val(),
            result = $("#result"),
            additionals = ["e", "i", "de", "den", "iyelik"],
            isAdditional = additionals.indexOf(nameStatus);

        if (yourName !== '' && nameStatus !== '') {
            if (isAdditional !== -1) {
                result.text( Hal(yourName, nameStatus) );
            } else {
                result.text("Lütfen doğru hal bilgisi giriniz!");
            }
        } else {
            result.text("Lütfen eksik bilgileri giriniz!");
        }
    });
});
