const stepper = {
    activeTabIndex: 1,
    maxTabIndex: 1
}

//call model popup
$('#btnsubmit08').on('click', function () {
    $('#btnOpenModalSuccess').click();
});

//toggle accordian 2nd and 3rd holder
const ToggleSHD = function ToggleSHD(e) {
    $(e).children('.fa').toggleClass('fa-chevron-circle-down').toggleClass('fa-chevron-circle-up');
    $('.PermAddTblOutr').slideToggle('slow');
};
const ToggleTHD = function (e) {
    $(e).children('.fa').toggleClass('fa-chevron-circle-down').toggleClass('fa-chevron-circle-up');
    $('.CorspAddTblOutr').slideToggle('slow');
};

//toggle accodian see more text
$('.btn.btn-link').on('click', function () {
    if ($(this).hasClass('collapsed')) {
        $(this).find('.badge').text('See Less');
    }
    else {
        $(this).find('.badge').text('See More');
    }
});

//tab javascript
$(".BtnTabSwit, .BtnTabSwitMob").on('click keypress', function (event) {
    // event.which === 13 means the "Enter" key is pressed
    if ((event.type === "keypress" && event.which === 13) || event.type === "click") {
        let tabClicked = parseInt($(this).data("tab-index"));

        if (parseInt(tabClicked) != stepper.activeTabIndex && parseInt(tabClicked) <= stepper.maxTabIndex)
        //if (parseInt(tabClicked) != stepper.activeTabIndex)        
        {
            $(".tab-switcher").removeClass('active');
            $(".list-group-item").removeClass('active');
            $(this).parent().addClass('active').removeClass('NoActive');
            $(".tab-container").slideUp();

            $("#allTabsContainer .tab-container").each(function () {
                if ($(this).data("tab-index") == tabClicked) {
                    $(this).slideDown();
                    return;
                }
            });

            stepper.activeTabIndex = tabClicked;
            if (stepper.maxTabIndex < stepper.activeTabIndex) {
                stepper.maxTabIndex = stepper.activeTabIndex;
            }

        }
    }
});

//toggle button
//$('#BtnStepsToggle').on('click', function () {
//    $('#IdStepsMob').slideToggle();
//});
$('#BtnStepsToggle').click(function (e) {
    e.stopPropagation();
    $('#IdStepsMob').slideToggle();
});
$('#IdStepsMob').click(function (e) {
    e.stopPropagation();
});
$('body,html').click(function (e) {
    $('#IdStepsMob').slideUp();
});

//tab back
$('#btnBack02,#btnBack03,#btnBack04,#btnBack05,#btnBack06,#btnBack07,#btnBack08').on('click', function () {
    if (this.id == 'btnBack02') {
        $('#IdBtnTabSwit01').click();
    }
    else if (this.id == 'btnBack03') {
        $('#IdBtnTabSwit02').click();
    }
    else if (this.id == 'btnBack04') {
        $('#IdBtnTabSwit03').click();
    }
    else if (this.id == 'btnBack05') {
        $('#IdBtnTabSwit04').click();
    }
    else if (this.id == 'btnBack06') {
        $('#IdBtnTabSwit05').click();
    }
    else if (this.id == 'btnBack07') {
        if ($('#chkNomApplicable').prop('checked')) {
            $('#IdBtnTabSwit06').click();
        }
        else {
            $('#IdBtnTabSwit05').click();
        }
    }
    else if (this.id == 'btnBack08') {
        $('#IdBtnTabSwit07').click();
    }


});

//tab save
$('#btnsubmit01,#btnsubmit02,#btnsubmit03,#btnsubmit04,#btnsubmit05,#btnsubmit06,#btnsubmit07,#btnsubmit08').on('click', function () {
    if (this.id == 'btnsubmit01') {

        if (SubmitStep1()) {

            GET_APPL_DTLS($('#lblApplicationNumber').text().trim());

            if (stepper.maxTabIndex == stepper.activeTabIndex)
                stepper.maxTabIndex += 1

            $('#IdInfoDiv').slideDown();
            $('#IdBtnTabSwit02').click();
            //$('#IdBtnTabSwit01').css('border-color', '#047904');
            $('#IdBtnTabSwit01').parent().addClass('Active');
        }

    }
    else if (this.id == 'btnsubmit02') {
        if (SubmitStep2()) {
            if (stepper.maxTabIndex == stepper.activeTabIndex)
                stepper.maxTabIndex += 1

            $('#IdBtnTabSwit03').click();
            //$('#IdBtnTabSwit02').css('border-color', '#047904');
            $('#IdBtnTabSwit02').parent().addClass('Active');
        }
    }
    else if (this.id == 'btnsubmit03') {
        if (SubmitStep3()) {
            if (stepper.maxTabIndex == stepper.activeTabIndex)
                stepper.maxTabIndex += 1

            $('#IdBtnTabSwit04').click();
            //$('#IdBtnTabSwit03').css('border-color', '#047904');
            $('#IdBtnTabSwit03').parent().addClass('Active');
        }
    }
    else if (this.id == 'btnsubmit04') {
        if (SubmitStep4()) {
            if (stepper.maxTabIndex == stepper.activeTabIndex)
                stepper.maxTabIndex += 1

            $('#IdBtnTabSwit05').click();
            //$('#IdBtnTabSwit04').css('border-color', '#047904');
            $('#IdBtnTabSwit04').parent().addClass('Active');
        }
    }
    else if (this.id == 'btnsubmit05') {
        if (SubmitStep5()) {
            BindOVD($('#lblApplicationNumber').text().trim());
            if ($('#chkNomApplicable').prop('checked')) {
                if (stepper.maxTabIndex == stepper.activeTabIndex)
                    stepper.maxTabIndex += 1

                $('#IdBtnTabSwit06').click();
                //$('#IdBtnTabSwit05').css('border-color', '#047904');
                $('#IdBtnTabSwit05').parent().addClass('Active');
            }
            //else if ($.isEmptyObject(IsDocUploaded()) && BTP_OBJECT.OVDSave == false)
            //{
            //    if (stepper.maxTabIndex == stepper.activeTabIndex)
            //        stepper.maxTabIndex += 3

            //    $('#IdBtnTabSwit08').click();
            //    //$('#IdBtnTabSwit07').css('border-color', '#047904');
            //    $('#IdBtnTabSwit05').parent().addClass('Active');
            //    $('#IdBtnTabSwit07').parent().addClass('Active');
            //}
            else {
                if (stepper.maxTabIndex == stepper.activeTabIndex)
                    stepper.maxTabIndex += 2

                $('#IdBtnTabSwit05').parent().addClass('Active');
                $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');
                $('#IdBtnTabSwit07').click();
            }
        }
    }
    else if (this.id == 'btnsubmit06') {
        if (SubmitStep6()) {
            BindOVD($('#lblApplicationNumber').text().trim());

            //if ($.isEmptyObject(IsDocUploaded()) && BTP_OBJECT.OVDSave == false)
            if (false) {
                if (stepper.maxTabIndex == stepper.activeTabIndex)
                    stepper.maxTabIndex += 2

                $('#IdBtnTabSwit08').click();
                $('#IdBtnTabSwit06').parent().addClass('Active');
                $('#IdBtnTabSwit07').parent().addClass('Active');
            }
            else {
                if (stepper.maxTabIndex == stepper.activeTabIndex)
                    stepper.maxTabIndex += 1

                $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');
                $('#IdBtnTabSwit07').click();
                $('#IdBtnTabSwit06').parent().addClass('Active');
            }
        }
    }
    else if (this.id == 'btnsubmit07') {
        BindOVD($('#lblApplicationNumber').text().trim());

        if (SubmitStep7()) {
            if (stepper.maxTabIndex == stepper.activeTabIndex)
                stepper.maxTabIndex += 1

            $('#IdBtnTabSwit08').click();
            //$('#IdBtnTabSwit07').css('border-color', '#047904');
            $('#IdBtnTabSwit07').parent().addClass('Active');
        }
    }
});
