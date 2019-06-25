jQuery(function ($) {
    $('#phone').mask('8 999 999 99 99');
});

function check() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    var franch = $('#franchise').val();
     
    if(name.length != 0 && phone.length != 0 && franch.length != 0) {
        $('#button').css('backgroundColor','#0d972b');
    } else {
        $('#button').css('backgroundColor', '#a7d986');
    }
}