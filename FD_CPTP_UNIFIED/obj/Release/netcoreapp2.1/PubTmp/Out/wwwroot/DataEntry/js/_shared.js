

//globle object to store application data
var BTP_OBJECT = null;
//globle object to store application data
const BTP = function () {
    this.IND_NIND = 'IND'; //DepositorStatus
    this.appl_no = '';
    this.appl_dec_type = '';
    this.payment_mode = '';

    this.FH_DATA_SOURCE = 'FRESH';
    this.SH_DATA_SOURCE = 'FRESH';
    this.TH_DATA_SOURCE = 'FRESH';

    this.FH_CKYC_COMPLIANT = 'N';
    this.SH_CKYC_COMPLIANT = 'N';
    this.TH_CKYC_COMPLIANT = 'N';

    this.mode = 'A';//to disable alert popup on reset
    this.ApplicationType = 'F';

    //Diff between last FDR and currect date
    this.InvCountFolioYear = 4;
    this.SHCountFolioYear = 4;
    this.THCountFolioYear = 4;

    this.FrontOfficeSave = false;
    this.OtherDetailsSave = false;
    this.InvestmentDetailsSave = false;
    this.BankDetailsSave = false;
    this.FHDetailsSave = false;
    this.SHDetailsSave = false;
    this.THDetailsSave = false;
    this.NomDetailsSave = false;
    this.OVDSave = false;

    this.IsProvBank = false;

}
//diable F5 
//const disableF5 = function (e) {
//    if (e.target.type == 'text') {
//        if (e.which == 32 && e.target.selectionStart === 0)
//            return false;
//        return true;
//    }

//    if (e.target.type == 'textarea') {
//        if (e.which == 32 && e.target.selectionStart === 0)
//            return false;
//        return true;
//    }

//    if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) {
//        e.preventDefault();
//        alert('This operation is not allowed !!');
//    }
//}
function disableF5(e) {
    if (e.target.type == 'text') {
        if (e.which == 32 && e.target.selectionStart === 0)
            return false;
        return true;
    }

    if (e.target.type == 'textarea') {
        if (e.which == 32 && e.target.selectionStart === 0)
            return false;
        return true;
    }

    if ((e.which || e.keyCode) == 116 || (e.which || e.keyCode) == 82) {
        e.preventDefault();
        alert('This operation is not allowed !!');
    }
}

const BindDDLExtendedAjaxCall = function (dropDownId, sUrLWcfMethod, sParam, type, successCallBack, beforeSendCall, completeCall, IsAsync, IsTokenRequired, errorCallBack, dataType) {

    if ($.isEmptyObject(successCallBack)) {
        successCallBack = function (result) {

            try {
                var html = '<option value="select">Select</option>';
                if (!$.isEmptyObject(result) && result.length > 0) {
                    for (var i = 0; i < result.length; i++) {
                        html += '<option value="' + result[i].Code + '">' + result[i].Desc + '</option>';
                    }
                }

                $(dropDownId).empty().append(html);
                $('#preloader').hide();

            } catch (e) {
                $('#preloader').hide();
                fnException(e);
            }
        }
    }

    ExtendedAjaxCall(sUrLWcfMethod, sParam, type, successCallBack, beforeSendCall, completeCall, IsAsync, IsTokenRequired, errorCallBack, dataType);

}
const ErrorFunction = function (jqXHR, textStatus, err) {
    OnError(jqXHR, textStatus, err);

    if (jqXHR.status == 500) {
        jqXHR.abort();
        $('#dvErrorMsg').html("<p>An error occurred while processing your request. Please try again.</p>");
        $('#ModelError').modal('show');
    }

    if (jqXHR.status == 408) {
        jqXHR.abort();

        $('#dvErrorMsg').html("<p>Looks like the server is taking to long to respond. Please try again.</p>");
        $('#ModelError').modal('show');
    }

    return false;
}
//Dropdown bind (Code,Dec)
const BindDropdown1 = function (id, result) {
    try {
        var DDL = $('#' + id);
        var html = '<option value="select">Select</option>';

        if (!$.isEmptyObject(result) && result.length > 0) {

            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].code + '">' + result[i].dec + '</option>';
            }
        }

        DDL.empty().append(html).change();

    } catch (e) {
        fnException(e);
    }
}
//Dropdown bind (Code,Name)
const BindDropdown2 = function (id, result) {
    try {

        var DDL = $('#' + id);
        var html = '<option value="select">Select</option>';

        if (!$.isEmptyObject(result) && result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].Code + '">' + result[i].Name + '</option>';
            }
        }

        DDL.empty().append(html).change();

    } catch (e) {
        fnException(e);
    }
}
const fnException = function (ex) {
    $('#preloader').hide();
    BtpMessagePopup('', 'error');
    throw ex;
}
//Default country India
const SetDefaultCountry = function (Id) {
    $('#' + Id).val('IN').change();
    return false;
}
//Error or Success modal popup
const BtpMessagePopup = function (message, type) {
    try {
        $('#preloader').hide();
        if (type.toUpperCase() == 'SUCCESS') {
            $('#dvSuccessMsg').html(message);
            $('#ModelSuccess').modal('show');
        }
        else if (type.toUpperCase() == 'ERROR') {
            message = $.isEmptyObject(message) || message.toUpperCase() == 'ERROR' ? '<p>Something went wrong..!</p>' : message;
            $('#dvErrorMsg').html(message);
            $('#ModelError').modal('show');
        }

    } catch (e) {
        console.error(e);
    }
}
//Minor check
const IsMinor = function (date) {
    try {

        if (!$.isEmptyObject(date)) {
            //var splinombirth = date.toString().split('-');
            //date = splinombirth[2] + '-' + splinombirth[1] + '-' + splinombirth[0];           
            return GetAge(date) < 18 ? true : false;
        }

    } catch (e) {
        fnException(e);
    }
}
const IsValidPAN = function (pan) {
    var regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(pan.toUpperCase());
}
const IsValidMobile = function (mobile_no) {
    var regex = /^[6789]\d{9}$/;
    return regex.test(mobile_no);
}
const IsValidEmail = function (email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}
const GetAge = function (date) {
    try {

        if (!$.isEmptyObject(date)) {
            var splitbirth = date.toString().split('-');
            var birthdate = new Date(Number(splitbirth[0]), (Number(splitbirth[1]) - 1), Number(splitbirth[2]));
            var currdate = new Date();
            var age = currdate.getFullYear() - birthdate.getFullYear();
            var age_month = currdate.getMonth() - birthdate.getMonth();
            var age_day = currdate.getDate() - birthdate.getDate();
            if (age_month < 0 || (age_month == 0 && age_day < 0)) {
                age = parseInt(age) - 1;
            }
            return age;
        }
    } catch (e) {
        fnException(e);
    }
}
const GetFormatedDate = function (date_str) {
    try {

        if (!$.isEmptyObject(date_str)) {
            var date = date_str.split(' ')[0].split('/');
            var dd = date[1];
            if (Number(dd) < 10) {
                dd = '0' + dd;
            }
            var mm = date[0];
            if (Number(mm) < 10) {
                mm = '0' + mm
            }
            return date[2] + '-' + mm + '-' + dd;
        }
        return null;

    } catch (e) {
        fnException(e);
    }
}
const convertNumberToWords = function (amount) {
    try {

        var words = new Array();
        words[0] = '';
        words[1] = 'One';
        words[2] = 'Two';
        words[3] = 'Three';
        words[4] = 'Four';
        words[5] = 'Five';
        words[6] = 'Six';
        words[7] = 'Seven';
        words[8] = 'Eight';
        words[9] = 'Nine';
        words[10] = 'Ten';
        words[11] = 'Eleven';
        words[12] = 'Twelve';
        words[13] = 'Thirteen';
        words[14] = 'Fourteen';
        words[15] = 'Fifteen';
        words[16] = 'Sixteen';
        words[17] = 'Seventeen';
        words[18] = 'Eighteen';
        words[19] = 'Nineteen';
        words[20] = 'Twenty';
        words[30] = 'Thirty';
        words[40] = 'Forty';
        words[50] = 'Fifty';
        words[60] = 'Sixty';
        words[70] = 'Seventy';
        words[80] = 'Eighty';
        words[90] = 'Ninety';
        amount = amount.toString();
        var atemp = amount.split(".");
        var number = atemp[0].split(",").join("");
        var n_length = number.length;
        var words_string = "";
        if (n_length <= 9) {
            var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
            var received_n_array = new Array();
            for (var i = 0; i < n_length; i++) {
                received_n_array[i] = number.substr(i, 1);
            }
            for (var i = 9 - n_length, j = 0; i < 9; i++ , j++) {
                n_array[i] = received_n_array[j];
            }
            for (var i = 0, j = 1; i < 9; i++ , j++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    if (n_array[i] == 1) {
                        n_array[j] = 10 + parseInt(n_array[j]);
                        n_array[i] = 0;
                    }
                }
            }
            value = "";
            for (var i = 0; i < 9; i++) {
                if (i == 0 || i == 2 || i == 4 || i == 7) {
                    value = n_array[i] * 10;
                } else {
                    value = n_array[i];
                }
                if (value != 0) {
                    words_string += words[value] + " ";
                }
                if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Crores ";
                }
                if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Lakhs ";
                }
                if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                    words_string += "Thousand ";
                }
                if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                    words_string += "Hundred and ";
                } else if (i == 6 && value != 0) {
                    words_string += "Hundred ";
                }
            }
            words_string = words_string.split("  ").join(" ");
        }
        return words_string + " Rupees Only";

    } catch (e) {
        fnException(e);

    }
}
const ViewDocumentLog = function (DocumentLog) {
    try {

        ExtendedAjaxCall('DataEntry/ViewDocumentLogAsync', DocumentLog, 'POST', null, function (request) {
            //beforeSend function
        }, true, true, false, ErrorFunction);

    } catch (e) {
        $('#preloader').hide();
        console.error(e);
        BtpMessagePopup('', 'error');
    }
}
const CheckIsMinor = function (DOB) {
    if (!$.isEmptyObject(DOB)) {
        return GetAge(DOB) < 18 ? true : false;
    }
    return false;
}
const CheckIsMarried = function (status) {
    return status == '01' ? true : false;
}
//first holder ckyc validations
const FH_KYC_Validations = function () {
    try {
        let ddlInvtitle = $('#ddlInvtitle');
        let txtInvFirstName = $('#txtInvFirstName');
        let ddlGender = $('#DV_FH #ddlGender');
        let ddlOccupation = $('#DV_FH #ddlOccupation');
        let ddlAnnualIncome = $('#DV_FH #ddlAnnualIncome');
        let txtInvDOB = $('#txtInvDOB');
        let txtInvDOI = $('#txtInvDOI');
        let txtInvPan = $('#txtInvPan');
        let txtGuardianPAN = $('#DV_FH #txtGuardianPAN');
        let ddlGuardianTitle = $('#DV_FH #ddlGuardianTitle');

        //title  
        if (BTP_OBJECT.IND_NIND == 'IND') {
            if (ddlInvtitle.val() == 'select') {
                ddlInvtitle.prop('required', true).prop('disabled', false).addClass('DisabledControl');
            }
            else {
                ddlInvtitle.prop('required', true).prop('disabled', false).removeClass('DisabledControl');
            }
        }
        else
            ddlInvtitle.val("M/S").prop('required', true).prop('disabled', true).addClass('DisabledControl');

        //name
        if ($.isEmptyObject(txtInvFirstName.val())) {
            txtInvFirstName.prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#txtInvMiddleName,#txtInvLastName').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else
            $('#txtInvFirstName,#txtInvMiddleName,#txtInvLastName').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //gender
        if (ddlGender.val() == 'select') {
            ddlGender.prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            ddlGender.prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //dob
        if (BTP_OBJECT.IND_NIND == 'IND') {
            if ($.isEmptyObject(txtInvDOB.val())) {
                txtInvDOB.datetextentry('set_readonly', false);
                txtInvDOB.parent().addClass('InputBordeRed');
            }
            else {
                txtInvDOB.datetextentry('set_readonly', true);
                txtInvDOB.parent().removeClass('InputBordeRed');
            }
        }
        else {
            if ($.isEmptyObject(txtInvDOI.val())) {
                txtInvDOI.datetextentry('set_readonly', false);
                txtInvDOI.parent().addClass('InputBordeRed');
            }
            else {
                txtInvDOI.datetextentry('set_readonly', true);
                txtInvDOI.parent().removeClass('InputBordeRed');
            }
        }
        //else
        //{
        //    $('#txtInvDOB,#txtInvDOI').datetextentry('set_date', null).datetextentry('set_readonly', false);
        //}

        //pan
        if ($.isEmptyObject(txtInvPan.val()) && (!IsMinor(txtInvDOB.val()) || BTP_OBJECT.IND_NIND != 'IND'))
            txtInvPan.prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            txtInvPan.prop('required', true).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        if (IsMinor(txtInvDOB.val()) && BTP_OBJECT.IND_NIND == 'IND') {
            //Guard pan 
            if ($.isEmptyObject(txtGuardianPAN.val())) {
                txtGuardianPAN.prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

                //Guard title 
                if ($.isEmptyObject(ddlGuardianTitle.val()))
                    ddlGuardianTitle.prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

                //Guard name 
                if ($.isEmptyObject($('#DV_FH #txtGuardianFName').val()))
                    $('#DV_FH #txtGuardianFName').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            }
            else
                txtGuardianPAN.prop('required', false).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //mobile/email validations
        if ($('#DV_FH #hdnMobilisationMode').val() == "W" || $('#DV_FH #hdnMobilisationMode').val() == "WEB") {
            //mobile
            if ($.isEmptyObject($('#txtMobile').val()))
                $('#txtMobile').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            else
                $('#txtMobile').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

            //email
            if ($.isEmptyObject($('#txtEmail').val()))
                $('#txtEmail').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            else
                $('#txtEmail').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        }
        else {
            $('#txtMobile').prop('disabled', false).removeClass('DisabledControl');
            $('#txtEmail').prop('disabled', false).removeClass('DisabledControl');
        }

        //either father/mother/spouse name is required
        if ($.isEmptyObject($('#DV_FH #txtFatherFName').val())
            && $.isEmptyObject($('#DV_FH #txtMotherFName').val())
            && $.isEmptyObject($('#DV_FH #txtSpouseFName').val())) {
            $('#DV_FH #ddlFatherTitle').val('MR').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_FH #ddlMotherTitle').val('MRS').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_FH #ddlSpouseTitle').val('select').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');
        }

        //ckyc no
        if ($.isEmptyObject($('#DV_FH #txtCKYCNumber').val()))
            $('#DV_FH #txtCKYCNumber').prop('disabled', false).removeClass('DisabledControl');
        else
            $('#DV_FH #txtCKYCNumber').prop('disabled', true).addClass('DisabledControl');

        //Occupation
        if (ddlOccupation.val() == 'select') {
            ddlOccupation.prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            ddlOccupation.prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //AnnualIncome
        if (ddlAnnualIncome.val() == 'select') {
            ddlAnnualIncome.prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            ddlAnnualIncome.prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent address1
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtAdd1').val())) {
            $('#DV_FH_P_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_FH_P_ADDR #txtAdd2,#DV_FH_P_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_FH_P_ADDR #ddlCountry').val() == 'select')
            $('#DV_FH_P_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent pincode
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtPin').val()))
            $('#DV_FH_P_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent city
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtCity').val()))
            $('#DV_FH_P_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent state/district
        if ($('#DV_FH_P_ADDR #ddlCountry').val() != 'IN') {
            if ($.isEmptyObject($('#DV_FH_P_ADDR #txtState').val()))
                $('#DV_FH_P_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_FH_P_ADDR #txtDistrict').val()))
                $('#DV_FH_P_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtAdd1').val())) {
            $('#DV_FH_M_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_FH_M_ADDR #txtAdd2,#DV_FH_M_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_FH_M_ADDR #ddlCountry').val() == 'select')
            $('#DV_FH_M_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing pincode
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtPin').val()))
            $('#DV_FH_M_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing city
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtCity').val()))
            $('#DV_FH_M_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        if ($('#DV_FH_M_ADDR #ddlCountry').val() != 'IN') {
            if ($.isEmptyObject($('#DV_FH_M_ADDR #txtState').val()))
                $('#DV_FH_M_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_FH_M_ADDR #txtDistrict').val()))
                $('#DV_FH_M_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //overseas address1
        if ($('#chkIdOverSeasAddress').prop('checked')) {
            if ($.isEmptyObject($('#txtOAdd1').val())) {
                $('#txtOAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
                $('#txtOAdd2,#txtOAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
            }

            //overseas country
            if ($('#ddlOCountry').val() == 'select')
                $('#ddlOCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            //overseas pincode
            if ($.isEmptyObject($('#txtOPin').val()))
                $('#txtOPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            //overseas city
            if ($.isEmptyObject($('#txtOCity').val()))
                $('#txtOCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#txtOState').val()))
                $('#txtOState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

    } catch (e) {
        fnException(e);
    }
}
//second holder ckyc validations
const SH_KYC_Validations = function () {
    try {
        //$('#DV_SH .HOLD_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        //$('#DV_SH .MORE_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //title  
        $('#DV_SH #ddlTitle').prop('required', true).prop('disabled', false).removeClass('DisabledControl');

        //name
        if ($.isEmptyObject($('#DV_SH #txtFName').val())) {
            $('#DV_SH #txtFName').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_SH #txtMName,#DV_SH #txtLName').val('').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else
            $('#DV_SH #txtFName,#DV_SH #txtMName,#DV_SH #txtLName').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //gender
        $('#DV_SH #ddlGender').prop('required', true).prop('disabled', false).removeClass('DisabledControl');

        //dob
        if ($.isEmptyObject($('#DV_SH #txtDOB').val())) {
            $('#DV_SH #txtDOB').datetextentry('set_readonly', false);
            $('#DV_SH #txtDOB').parent().addClass('InputBorderRed');
        }
        else {
            $('#DV_SH #txtDOB').datetextentry('set_readonly', true);
            $('#DV_SH #txtDOB').parent().removeClass('InputBorderRed');
        }

        //pan
        if ($.isEmptyObject($('#DV_SH #txtPAN').val()) && !IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #txtPAN').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            $('#DV_SH #txtPAN').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //Guard pan 
        if ($.isEmptyObject($('#DV_SH #txtGuardianPAN').val()) && IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #txtGuardianPAN').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard title 
        if ($.isEmptyObject($('#DV_SH #ddlGuardianTitle').val()) && IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #ddlGuardianTitle').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard name 
        if ($.isEmptyObject($('#DV_SH #txtGuardianFName').val()) && IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #txtGuardianFName').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mobile
        if ($.isEmptyObject($('#DV_SH #txtMobileNo').val()))
            $('#DV_SH #txtMobileNo').prop('disabled', false).removeClass('DisabledControl');

        //email
        if ($.isEmptyObject($('#DV_SH #txtEmailId').val()))
            $('#DV_SH #txtEmailId').prop('disabled', false).removeClass('DisabledControl');

        //either father/mother/spouse name is required
        if ($.isEmptyObject($('#DV_SH #txtFatherFName').val())
            && $.isEmptyObject($('#DV_SH #txtMotherFName').val())
            && $.isEmptyObject($('#DV_SH #txtSpouseFName').val())) {
            $('#DV_SH #ddlFatherTitle').val('MR').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_SH #ddlMotherTitle').val('MRS').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_SH #ddlSpouseTitle').val('select').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');
        }

        //ckyc no
        if ($.isEmptyObject($('#DV_SH #txtCKYCNumber').val()))
            $('#DV_SH #txtCKYCNumber').prop('disabled', false).removeClass('DisabledControl');
        else
            $('#DV_SH #txtCKYCNumber').prop('disabled', true).addClass('DisabledControl');

        //Occupation
        if ($('#DV_SH #ddlOccupation').val() == 'select') {
            $('#DV_SH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_SH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //AnnualIncome
        if ($('#DV_SH #ddlAnnualIncome').val() == 'select') {
            $('#DV_SH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_SH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent address1
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtAdd1').val())) {
            $('#DV_SH_P_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_SH_P_ADDR #txtAdd2,#DV_SH_P_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_SH_P_ADDR #ddlCountry').val() == 'select')
            $('#DV_SH_P_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent pincode
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtPin').val()))
            $('#DV_SH_P_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent city
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtCity').val()))
            $('#DV_SH_P_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent state/district
        if ($('#DV_SH_P_ADDR #ddlCountry').val() != 'IN') {
            if ($.isEmptyObject($('#DV_SH_P_ADDR #txtState').val()))
                $('#DV_SH_P_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_SH_P_ADDR #txtDistrict').val()))
                $('#DV_SH_P_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtAdd1').val())) {
            $('#DV_SH_M_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_SH_M_ADDR #txtAdd2,#DV_SH_M_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_SH_M_ADDR #ddlCountry').val() == 'select')
            $('#DV_SH_M_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing pincode
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtPin').val()))
            $('#DV_SH_M_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing city
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtCity').val()))
            $('#DV_SH_M_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        if ($('#DV_SH_M_ADDR #ddlCountry').val() != 'IN') {
            if ($.isEmptyObject($('#DV_SH_M_ADDR #txtState').val()))
                $('#DV_SH_M_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_SH_M_ADDR #txtDistrict').val()))
                $('#DV_SH_M_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }


    } catch (e) {
        fnException(e);
    }
}
//third holder ckyc validations
const TH_KYC_Validations = function () {
    try {
        //$('#DV_TH .HOLD_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        //$('#DV_TH .MORE_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //title  
        $('#DV_TH #ddlTitle').prop('required', true).prop('disabled', false).removeClass('DisabledControl');

        //name
        if ($.isEmptyObject($('#DV_TH #txtFName').val())) {
            $('#DV_TH #txtFName').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_TH #txtMName,#DV_TH #txtLName').val('').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else
            $('#DV_TH #txtFName,#DV_TH #txtMName,#DV_TH #txtLName').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //gender
        $('#DV_TH #ddlGender').prop('required', true).prop('disabled', false).removeClass('DisabledControl');

        //dob
        if ($.isEmptyObject($('#DV_TH #txtDOB').val())) {
            $('#DV_TH #txtDOB').datetextentry('set_readonly', false);
            $('#DV_TH #txtDOB').parent().addClass('InputBorderRed');
        }
        else {
            $('#DV_TH #txtDOB').datetextentry('set_readonly', true);
            $('#DV_TH #txtDOB').parent().removeClass('InputBorderRed');
        }

        //pan
        if ($.isEmptyObject($('#DV_TH #txtPAN').val()) && !IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #txtPAN').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            $('#DV_TH #txtPAN').prop('required', true).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //Guard pan 
        if ($.isEmptyObject($('#DV_TH #txtGuardianPAN').val()) && IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #txtGuardianPAN').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard title 
        if ($.isEmptyObject($('#DV_TH #ddlGuardianTitle').val()) && IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #ddlGuardianTitle').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard name 
        if ($.isEmptyObject($('#DV_TH #txtGuardianFName').val()) && IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #txtGuardianFName').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mobile
        if ($.isEmptyObject($('#DV_TH #txtMobileNo').val()))
            $('#DV_TH #txtMobileNo').prop('disabled', false).removeClass('DisabledControl');

        //email
        if ($.isEmptyObject($('#DV_TH #txtEmailId').val()))
            $('#DV_TH #txtEmailId').prop('disabled', false).removeClass('DisabledControl');

        //either father/mother/spouse name is required
        if ($.isEmptyObject($('#DV_TH #txtFatherFName').val())
            && $.isEmptyObject($('#DV_TH #txtMotherFName').val())
            && $.isEmptyObject($('#DV_TH #txtSpouseFName').val())) {
            $('#DV_TH #ddlFatherTitle').val('MR').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_TH #ddlMotherTitle').val('MRS').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_TH #ddlSpouseTitle').val('select').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');
        }

        //ckyc no
        if ($.isEmptyObject($('#DV_TH #txtCKYCNumber').val()))
            $('#DV_TH #txtCKYCNumber').prop('disabled', false).removeClass('DisabledControl');
        else
            $('#DV_TH #txtCKYCNumber').prop('disabled', true).addClass('DisabledControl');

        //Occupation
        if ($('#DV_TH #ddlOccupation').val() == 'select') {
            $('#DV_TH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_TH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //AnnualIncome
        if ($('#DV_TH #ddlAnnualIncome').val() == 'select') {
            $('#DV_TH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_TH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent address1
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtAdd1').val())) {
            $('#DV_TH_P_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_TH_P_ADDR #txtAdd2,#DV_TH_P_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_TH_P_ADDR #ddlCountry').val() == 'select')
            $('#DV_TH_P_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent pincode
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtPin').val()))
            $('#DV_TH_P_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent city
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtCity').val()))
            $('#DV_TH_P_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent state/district
        if ($('#DV_TH_P_ADDR #ddlCountry').val() != 'IN') {
            if ($.isEmptyObject($('#DV_TH_P_ADDR #txtState').val()))
                $('#DV_TH_P_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_TH_P_ADDR #txtDistrict').val()))
                $('#DV_TH_P_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtAdd1').val())) {
            $('#DV_TH_M_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_TH_M_ADDR #txtAdd2,#DV_TH_M_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_TH_M_ADDR #ddlCountry').val() == 'select')
            $('#DV_TH_M_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing pincode
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtPin').val()))
            $('#DV_TH_M_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing city
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtCity').val()))
            $('#DV_TH_M_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        if ($('#DV_TH_M_ADDR #ddlCountry').val() != 'IN') {
            if ($.isEmptyObject($('#DV_TH_M_ADDR #txtState').val()))
                $('#DV_TH_M_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_TH_M_ADDR #txtDistrict').val()))
                $('#DV_TH_M_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }


    } catch (e) {
        fnException(e);
    }
}

////--V2
//const GetAgeFromDate = () =>
//{
//    try
//    {

//        if (!$.isEmptyObject(this.value))
//        {
//            let splitbirth = date.toString().split('-');
//            let birthdate = new Date(Number(splitbirth[0]), (Number(splitbirth[1]) - 1), Number(splitbirth[2]));
//            let currdate = new Date();
//            let age = currdate.getFullYear() - birthdate.getFullYear();
//            let age_month = currdate.getMonth() - birthdate.getMonth();
//            let age_day = currdate.getDate() - birthdate.getDate();
//            if (age_month < 0 || (age_month == 0 && age_day < 0))
//            {
//                age = parseInt(age) - 1;
//            }
//            return age;
//        }
//    } catch (e)
//    {
//        fnException(e);
//    }
//}
//const IsMinorHolder = () =>
//{
//    try
//    {
//        if (!$.isEmptyObject(this.value))
//        {
//            let splinombirth = date.toString().split('-');
//            date = splinombirth[2] + '-' + splinombirth[1] + '-' + splinombirth[0];
//            return this.GetAgeFromDate() < 18 ? true : false;
//        }

//    } catch (e)
//    {
//        fnException(e);
//    }
//}

//remove red border
$('.form-control').change(function () {
    $(this).removeClass('InputBorderRed');
    $(this).parent().removeClass('InputBorderRed');
});
//PAN validations
$('input[name="PAN"]').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value) && !IsValidPAN(this.value)) {
        $(this).next().text('PAN is not valid').show();
    }
});
//Mobile no validations
$('input[name="MOBILE"]').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value) && !IsValidMobile(this.value)) {
        $(this).next().text('Mobile Number is not valid').show();
    }
});
//Email validations
$('input[name="EMAIL"]').keydown(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value) && !IsValidEmail(this.value)) {
        $(this).next().text('Email Id is not valid').show();
    }
});
//No special cha allowed except ( , # . / )
$('.NoSpecialChar').keydown(function (e) {
    var str = e.key;
    if (/^[a-zA-Z0-9-\' ]*$/.test(str) == false)
        return false;

    return true;
});
$('[name="ADD1"],[name="ADD2"],[name="ADD3"]').keyup(function () {
    //var regexpSpace = /[-]+$/g;
    //if ($(this).val().match(regexpSpace)) {
    //    $(this).val($(this).val().replace('-', ''));
    //    return false;
    //}

    //var regexp = /[^a-zA-Z0-9-.,/# ]/g;

    var regexp = /[^0-9a-zA-Z\s\,\.\-\#\/]+$/g;
    if ($(this).val().match(regexp)) {
        $(this).val($(this).val().replace(regexp, ''));
    }

});
//convert input into uppercase
$('.uppercase').keyup(function () {
    this.value = this.value.toUpperCase();
}).change(function () {
    this.value = this.value.toUpperCase();
});;
$('.RemoveSpace').keypress(function (e) {
    var v1 = $(this).val();
    v1 = v1.replace(/\s\s+/g, ' ');
    $(this).val(v1);

    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || keyCode == 8 || keyCode == 32);
    return ret;

});

