
//step6 submit
function SubmitStep6() {
    try {
        let err_msg = isValidStep6();
        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, "error");
            return false;
        }

        //Nominee Dtls            
        let Nominee_Dtl = getStep6Data();

        ExtendedAjaxCall('RenewInvestorDetailsSave/SubmitStep6', Nominee_Dtl, 'POST', function (result) {
            try {
                if (!$.isEmptyObject(result) && result.Status == 1)
                    BTP_OBJECT.NomDetailsSave = true;
                else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg))
                    err_msg += '<p>' + result[0].Msg + '</p>';
                else
                    err_msg += '<p>Something went wrong..!</p>';

                $('#preloader').hide();

            } catch (e) {
                fnException(e);
            }
        }, null, true, false, false, ErrorFunction);

        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, "error");
            return false;
        }

        return true;
    } catch (e) {
        fnException(e); return false;
    }
}

//step6 save validations
function isValidStep6() {
    let err_msg = "";

    try {
        $('.form-control').removeClass('InputBorderRed');

        let $ddlNomTitle = $('#ddlNomTitle');
        let $txtNomFName = $('#txtNomFName');
        let $ddlNomRelation = $('#ddlNomRelation');
        let $txtNomDOB = $('#txtNomDOB');
        let $ddlNomGuardianTitle = $('#ddlNomGuardianTitle');
        let $txtNomGuardianFName = $('#txtNomGuardianFName');
        let $txtAdd1 = $('#DV_NOM #txtAdd1');
        let $ddlCountry = $('#DV_NOM #ddlCountry');
        let $txtPin = $('#DV_NOM #txtPin');
        let $txtState = $('#DV_NOM #txtState');
        let $txtDistrict = $('#DV_NOM #txtDistrict');
        let $txtCity = $('#DV_NOM #txtCity');
        let $txtMobileNo = $('#DV_NOM #txtMobileNo');
        let $txtEmailId = $('#DV_NOM #txtEmailId');

        if ($ddlNomTitle.val() == 'select') {
            err_msg += '<p>Nominee Salutation is required..!</p>';
            $ddlNomTitle.addClass('InputBorderRed');
        }

        if ($txtNomFName.val() == '') {
            err_msg += '<p>Nominee First Name is required..!</p>';
            $txtNomFName.addClass('InputBorderRed');
        }

        if ($ddlNomRelation.val() == 'select') {
            err_msg += '<p>Nominee Relation is required..!</p>';
            $ddlNomRelation.addClass('InputBorderRed');
        }

        if ($('#chkIsNomMinor').prop('checked')) {
            if ($txtNomDOB.val() == '') {
                err_msg += '<p>Nominee DOB is required..!</p>';
                $txtNomDOB.parent().addClass('InputBorderRed');
            }
            else {
                $txtNomDOB.parent().removeClass('InputBorderRed');
            }

            if ($ddlNomGuardianTitle.val() == 'select') {
                err_msg += "<p>Nominee Guardian's Prefix is required..!</p>";
                $ddlNomGuardianTitle.addClass('InputBorderRed');
            }

            if ($txtNomGuardianFName.val() == '') {
                err_msg += "<p>Nominee Giardian's Name is required..!</p>";
                $txtNomGuardianFName.addClass('InputBorderRed');
            }
        }

        if ($.isEmptyObject($('#lblFolioNumber').text())) {
            if ($txtAdd1.val() == '') {
                err_msg += '<p>Nominee Address Line 1 is required..!</p>';
                $txtAdd1.addClass('InputBorderRed');
            }

            if ($ddlCountry.val() == 'select') {
                err_msg += '<p>Nominee Country is required..!</p>';
                $ddlCountry.addClass('InputBorderRed');
            }

            if ($txtPin.val() == '') {
                err_msg += '<p>Nominee Postal Code is required..!</p>';
                $txtPin.addClass('InputBorderRed');
            }

            if ($txtState.val() == '') {
                err_msg += '<p>Nominee State is required..!</p>';
                $txtState.addClass('InputBorderRed');
            }

            if ($ddlCountry.val() == 'IN' && $txtDistrict.val() == '') {
                err_msg += '<p>Nominee District is required..!</p>';
                $txtDistrict.addClass('InputBorderRed');
            }

            if ($txtCity.val() == '') {
                err_msg += '<p>Nominee City is required..!</p>';
                $txtCity.addClass('InputBorderRed');
            }
        }

        if (!$.isEmptyObject($txtMobileNo.val()) && !IsValidMobile($txtMobileNo.val())) {
            err_msg += "<p>Nominee Mobile No is not valid..!</p>";
            $txtMobileNo.addClass('InputBorderRed');
        }

        if (!$.isEmptyObject($txtEmailId.val()) && !IsValidEmail($txtEmailId.val())) {
            err_msg += "<p>Nominee Email Address is not valid..!</p>";
            $txtEmailId.addClass('InputBorderRed');
        }

    } catch (e) {
        fnException(e);
    }
    return err_msg;
}

//get step6 data for save
function getStep6Data() {
    let Nominee_Dtl = {};
    try {
        //Nominee Dtls            
        Nominee_Dtl.Appl_No = $('#lblApplicationNumber').text().trim();
        Nominee_Dtl.Nominee_Salutation = $("#ddlNomTitle").val() == 'select' ? null : $("#ddlNomTitle").val();
        Nominee_Dtl.Nominee_First_Name = $("#txtNomFName").val().trim();
        Nominee_Dtl.Nominee_Middle_Name = $("#txtNomMName").val().trim();
        Nominee_Dtl.Nominee_Last_Name = $("#txtNomLName").val().trim();
        Nominee_Dtl.Nominee_Name = $("#txtNomFName").val().trim() + ' ' + $("#txtNomMName").val().trim() + ' ' + $("#txtNomLName").val().trim();
        Nominee_Dtl.Nominee_Relations = $("#ddlNomRelation").val();
        Nominee_Dtl.Nominee_DOB = $("#txtNomDOB").val();
        Nominee_Dtl.Is_Nominee_Minor = $('#chkIsNomMinor').prop('checked');//Nominee_Dtl.IsMinor();
        Nominee_Dtl.Address1 = $("#DV_NOM #txtAdd1").val().trim();
        Nominee_Dtl.Address2 = $("#DV_NOM #txtAdd2").val().trim();
        Nominee_Dtl.Address3 = $("#DV_NOM #txtAdd3").val().trim();
        Nominee_Dtl.City = $("#DV_NOM #txtCity").val().trim();
        Nominee_Dtl.Country = $("#DV_NOM #ddlCountry").val();
        Nominee_Dtl.CountryCode = $("#DV_NOM #ddlCountry").val();
        Nominee_Dtl.CountryName = $("#DV_NOM #ddlCountry option:selected").text().trim();
        Nominee_Dtl.StateName = $("#DV_NOM #txtState").val().trim();
        Nominee_Dtl.DistrictName = $("#DV_NOM #txtDistrict").val().trim();
        Nominee_Dtl.PIN = $("#DV_NOM #txtPin").val();
        Nominee_Dtl.EmailID = $("#DV_NOM #txtEmailId").val().trim();
        Nominee_Dtl.MobileNo = $("#DV_NOM #txtMobileNo").val().trim();
        Nominee_Dtl.TelephoneNo = $("#DV_NOM #txtTelephone").val().trim();
        if ($('#chkIsNomMinor').prop('checked') && $("#txtNomGuardianFName").val().trim() != '') {
            Nominee_Dtl.Guardian_Salutation = $("#ddlNomGuardianTitle").val() == 'select' ? null : $("#ddlNomGuardianTitle").val();
            Nominee_Dtl.Guardian_First_Name = $("#txtNomGuardianFName").val().trim();
            Nominee_Dtl.Guardian_Middle_Name = $("#txtNomGuardianMName").val().trim();
            Nominee_Dtl.Guardian_Last_Name = $("#txtNomGuardianLName").val().trim();
            Nominee_Dtl.GuardianName = $("#txtNomGuardianFName").val().trim() + ' ' + $("#txtNomGuardianMName").val().trim() + ' ' + $("#txtNomGuardianLName").val().trim();
        }
        Nominee_Dtl.FolioNo = $('#lblFolioNumber').text().trim();
        Nominee_Dtl.FDRNo = $('#lblExistingFDRNumber').text().trim();
        Nominee_Dtl.LastInvDate = $('#lblLastInvestmentDate').text().trim();

    } catch (e) {
        fnException(e);
    }
    return Nominee_Dtl;
}

//step6 reset
function Reset_step6() {
    $('.errorbox').text('').hide();
    $('.form-control').removeClass('InputBorderRed');

    $('#ddlNomTitle').val('select');
    $('#txtNomFName').val('');
    $('#txtNomMName').val('');
    $('#txtNomLName').val('');
    $('#ddlNomRelation').val('select');
    $('#txtNomDOB').datetextentry('set_date', null);
    $('#ddlNomGuardianTitle').val('select');
    $('#txtNomGuardianFName').val('');
    $('#txtNomGuardianMName').val('');
    $('#txtNomGuardianLName').val('');

    $('#DV_NOM #txtAdd1').val('');
    $('#DV_NOM #txtAdd2').val('');
    $('#DV_NOM #txtAdd3').val('');
    $('#DV_NOM #txtCity').val('');
    $('#DV_NOM #ddlCountry').val('IN').change();
    $('#DV_NOM #txtPin').val('').keyup();
    $('#DV_NOM #txtState').val('');
    $('#DV_NOM #txtDistrict').val('');

    $('#DV_NOM #txtTelephone').val('');
    $('#DV_NOM #txtMobileNo').val('');
    $('#DV_NOM #txtEmailId').val('');

    $('#chkIsNomMinor').prop('checked', false);
    $('#chkNomAddrSameAsFH').prop('checked', false);

    if (!$.isEmptyObject($('#lblFolioNumber').text())) {
        $('#ddlProvNominee').val('select');
        $('#DV_PROV_NOM').show();
        $('#DV_NOM_DTLS').hide();
    }
    else {
        $('#DV_PROV_NOM').hide();
        $('#DV_NOM_DTLS').show();
    }
}


$('#IdBtnTabSwit06').click(function () {
    try {
        if (!$.isEmptyObject($('#lblFolioNumber').text())) {
            $('#DV_NOM_ADDR .red-text').text('');
            let objBO = {
                Folio: $('#lblFolioNumber').text()
            };

            BindDDLExtendedAjaxCall('#ddlProvNominee', 'HolderDetails/GetProvNomineeDtls', objBO, 'POST', null, null, true, false, false, ErrorFunction);
        }
        else {
            $('#DV_NOM_ADDR .red-text').text('*');
            $('#DV_PROV_NOM').hide();
            $('#DV_NOM_DTLS').show();
        }
    } catch (e) {
        fnException(e); return false;
    }
});

$('#ddlProvNominee').change(function () {
    try {
        if (!$.isEmptyObject(this.value) && this.value != 'select') {
            let objBO = {
                Id: this.value
            };

            ExtendedAjaxCall('HolderDetails/GetProvNomineeDtls', objBO, 'POST', function (result) {
                if (!$.isEmptyObject(result)) {
                    $('#ddlNomTitle').val(result[0].Nominee_Salutation);
                    $('#txtNomFName').val(result[0].Nominee_First_Name);
                    $('#txtNomMName').val(result[0].Nominee_Middle_Name);
                    $('#txtNomLName').val(result[0].Nominee_Last_Name);
                    $('#ddlNomRelation').val(result[0].Nominee_Relations);
                    $('#txtNomDOB').datetextentry('set_date', result[0].Nominee_DOB);
                    $('#ddlNomGuardianTitle').val(result[0].Guardian_Salutation);
                    $('#txtNomGuardianFName').val(result[0].Guardian_FirstName);
                    $('#txtNomGuardianMName').val(result[0].Guardian_MiddleName);
                    $('#txtNomGuardianLName').val(result[0].Guardian_LastName);

                    $('#DV_NOM #txtAdd1').val(result[0].Address1);
                    $('#DV_NOM #txtAdd2').val(result[0].Address2);
                    $('#DV_NOM #txtAdd3').val(result[0].Address3);
                    $('#DV_NOM #txtCity').val(result[0].City);
                    $('#DV_NOM #ddlCountry').val(result[0].CountryCode).change();
                    $('#DV_NOM #txtPin').val(result[0].PIN).keyup();
                    $('#DV_NOM #txtTelephone').val(result[0].EmailID);
                    $('#DV_NOM #txtMobileNo').val(result[0].MobileNo);
                    $('#DV_NOM #txtEmailId').val(result[0].Telephone_No);
                    if (result[0].Is_Nominee_Minor)
                        $('#chkIsNomMinor').prop('checked', true);
                    else
                        $('#chkIsNomMinor').prop('checked', false);
                    $('#DV_PROV_NOM').hide();
                    $('#DV_NOM_DTLS').show();
                }

                $('#preloader').hide();
            }, null, true, false, false, ErrorFunction);
        }
    } catch (e) {
        fnException(e); return false;
    }
});

$('#btnAddNewNominee').click(function () {
    $('#DV_PROV_NOM').hide();
    $('#DV_NOM_DTLS').show();
});

$('#txtNomDOB').datetextentry({
    min_year: '1915',
    max_date: function () { return this.get_today(); },
    max_date_message: 'Date cannot be future date',
});

$('#chkIsNomMinor').change(function () {
    if ($(this).prop('checked')) {
        $('#SPN_DOB').text('*');
        $('.N_GUARDIAN').slideDown();
        $('#txtNomDOB, #ddlNomGuardianTitle, #txtNomGuardianFName').prop('required', true);
    }
    else {
        $('#SPN_DOB').text('');
        $('.N_GUARDIAN').slideUp();
        $('#txtNomDOB, #ddlNomGuardianTitle, #txtNomGuardianFName').prop('required', false).removeClass('InputBorderRed');
    }
});

$('#chkNomAddrSameAsFH').change(function () {
    if ($(this).prop('checked')) {
        $('#DV_NOM #txtAdd1').val($('#DV_FH_P_ADDR #txtAdd1').val());
        $('#DV_NOM #txtAdd2').val($('#DV_FH_P_ADDR #txtAdd2').val());
        $('#DV_NOM #txtAdd3').val($('#DV_FH_P_ADDR #txtAdd3').val());
        $('#DV_NOM #txtCity').val($('#DV_FH_P_ADDR #txtCity').val());
        $('#DV_NOM #ddlCountry').val($('#DV_FH_P_ADDR #ddlCountry').val()).change();
        $('#DV_NOM #txtPin').val($('#DV_FH_P_ADDR #txtPin').val()).keyup();
        $('#DV_NOM #txtState').val($('#DV_FH_P_ADDR #txtState').val());
        $('#DV_NOM #txtDistrict').val($('#DV_FH_P_ADDR #txtDistrict').val());
    }
    else {
        if (BTP_OBJECT.mode == 'A') {
            if (confirm('Are you sure you want to clear Nominee\'s Address..?')) {
                $('#DV_NOM #txtAdd1').val('');
                $('#DV_NOM #txtAdd2').val('');
                $('#DV_NOM #txtAdd3').val('');
                $('#DV_NOM #txtCity').val('');
                $('#DV_NOM #ddlCountry').val('IN').change();
                $('#DV_NOM #txtPin').val('').keyup();
                $('#DV_NOM #txtState').val('');
                $('#DV_NOM #txtDistrict').val('');
            }
            else
                $(this).prop('checked', true);
        }
        else {
            $('#DV_NOM #txtAdd1').val('');
            $('#DV_NOM #txtAdd2').val('');
            $('#DV_NOM #txtAdd3').val('');
            $('#DV_NOM #txtCity').val('');
            $('#DV_NOM #ddlCountry').val('IN').change();
            $('#DV_NOM #txtPin').val('').keyup();
            $('#DV_NOM #txtState').val('');
            $('#DV_NOM #txtDistrict').val('');
        }

    }
});

$('#DV_NOM #ddlCountry').change(function () {
    if (this.value == 'IN') {
        $('#DV_NOM #txtState').prop('disabled', true).addClass('DisabledControl');
        $('#DV_NOM #txtDistrict').prop('disabled', true).addClass('DisabledControl');
    }
    else {
        $('#DV_NOM #txtState').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_NOM #txtDistrict').prop('disabled', false).removeClass('DisabledControl');
    }
});

$('#DV_NOM #txtPin').keyup(function () {
    $(this).next().text('').hide();
    if (!$.isEmptyObject(this.value) && $('#DV_NOM #ddlCountry').val('IN')) {
        if (this.value.length >= 6) {
            ExtendedAjaxCall('DataEntry/SearchPincode/' + this.value, null, 'GET', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.length > 0) {
                        $('#DV_NOM #txtState').val(result[0].State).prop('disabled', true).addClass('DisabledControl');
                        $('#DV_NOM #txtDistrict').val(result[0].District).prop('disabled', true).addClass('DisabledControl');
                        $('#DV_NOM #txtCity').val(result[0].District);
                    }
                    else {
                        $('#DV_NOM #txtState').val('');
                        $('#DV_NOM #txtDistrict').val('');
                        $('#DV_NOM #txtPin').next().text('Please enter valid Pincode').show();
                    }
                } catch (e) {
                    fnException(e);
                }
                $('#preloader').hide();

            }, null, true, false, false, ErrorFunction);
        }
        else {
            $('#DV_NOM #txtState').val('');
            $('#DV_NOM #txtDistrict').val('');
            $(this).next().text('Please enter valid Pincode').show();
        }
    }
});

$('#btnCancel06').bind('click', Reset_step6);
