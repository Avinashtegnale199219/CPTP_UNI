

$(document).ready(function () {
    if (LOCK == '1') {
        $('#liAddApplication,#liEditApplication,#liCopyApplication').hide();
        $('#liAddApplication2,#liEditApplication2,#liCopyApplication2').hide();
        $('#liAddApplicationRenw,#liEditApplicationRenw').hide();//added on 14-11-2022
    }
    else {
        $('#liAddApplication,#liEditApplication,#liCopyApplication').show();
        $('#liAddApplication2,#liEditApplication2,#liCopyApplication2').show();
        $('#liAddApplicationRenw,#liEditApplicationRenw').show();//added on 14-11-2022
    }

    $('input[type=radio]').on('change', function () {
        $('.flowImgOutr label').removeClass('ActvBox');
        $(this).parent().addClass('ActvBox');
        if ($('input[name=actveMe]:checked').val() == "0") {
            $('.ImgOnline').hide();
            $('.ImgOffline').show();
        }
        else {
            $('.ImgOffline').hide();
            $('.ImgOnline').show();
        }
    });

    $('input[name=actveMe1]').on('change', function () {
        $('.MainBoxesOutr .flowRdBtnOutr label').removeClass('ActvBox');
        $('.boxOutrDiv1').toggle();
        $(this).parent().addClass('ActvBox');
        $('.boxOutrDiv2').toggle();
    });
});

//js of toggle drpdown options
$('.boxInrDiv').on('click', function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next('.boxInrToggleDiv').slideUp();
    }
    else {
        $('.boxInrDiv').removeClass('active');
        $('.boxInrDiv').next('.boxInrToggleDiv').slideUp();
        $(this).addClass('active');
        $(this).next('.boxInrToggleDiv').slideDown();
    }
});
//when click outside of toggle div close toggle expand section
$(document).on('click', function (e) {
    if ($(e.target).closest(".boxInrDiv").length === 0) {
        $('.boxInrDiv').removeClass('active');
        $('.boxInrDiv').next('.boxInrToggleDiv').slideUp();
    }
});

$('input[name=toggleName]').on('change', function () {
    if ($('input[name=toggleName]:checked').val() == "0") {
        $('#idRenewalBox').slideUp();
        setTimeout(() => {

            $('#idPurchaseBox').show();
        }, "200")

    }
    else {
        $('#idPurchaseBox').slideUp();
        setTimeout(() => {

            $('#idRenewalBox').show();
        }, "200")
    }
});