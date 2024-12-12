///step1 submit 
const SubmitStep1 = function () {
    try {
        let err_msg = isValidStep1();
        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }
        if (BTP_OBJECT.FH_DATA_SOURCE == "FRESH" || BTP_OBJECT.FH_DATA_SOURCE == "CKYC") {
            $("#FH_PEP").show();
        }
        else {
            $("#FH_PEP").hide();
        }
        let objFrontOffice = getStep1Data();

        if (FH_PAN_VERIFICATION()) {
            ExtendedAjaxCall('InvestorDetailsSave/SubmitStep1', objFrontOffice, 'POST', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result[0].Status == 1 && !$.isEmptyObject(result[0].Msg)) {
                        BTP_OBJECT.FrontOfficeSave = true;
                        if ($.isEmptyObject($('#lblApplicationNumber').text().trim()))
                            BtpMessagePopup(result[0].Msg, "success");

                        $('#hdnApplicationNumber').val(result[0].Appl_No);
                        $('#lblApplicationNumber').text(result[0].Appl_No);
                    }
                    else if (!$.isEmptyObject(result) && result[0].Status == 0 && !$.isEmptyObject(result[0].Msg))
                        err_msg += '<p>' + result[0].Msg + '</p>';
                    else
                        err_msg += '<p>Something went wrong..!</p>';

                    $('#preloader').hide();

                } catch (e) {
                    fnException(e);
                }
            }, null, true, false, false, ErrorFunction);
        }
        else {
            return false;
        }

        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }
        return true;

    } catch (e) {
        fnException(e); return false;
    }
};

///step1 validations
const isValidStep1 = function () {
    let err_msg = "";

    try {
        $('.FO_DTLS').removeClass('InputBorderRed');
        $('.D_T_E').removeClass('InputBorderRed');

        let regexNoSpecialChar = /^[a-zA-Z ]+$/;
        let regexNumberOnly = /[0-9]+/;
        let regexMob = /^[6789]\d{9}$/;

        let ddlDepositorsStatus = $('#lblDepositorCategory').text().toUpperCase();
        let ApplicationType = $('[name="ApplicationType"]:Checked').val();
        let txtPhysicalApplNo = $('#txtPhysicalApplNo');
        let ddlInvtitle = $('#ddlInvtitle');
        let txtInvFirstName = $('#txtInvFirstName');
        let txtInvMiddleName = $('#txtInvMiddleName');
        let txtInvLastName = $('#txtInvLastName');
        let txtInvDOB = $('#txtInvDOB');
        let txtInvDOI = $('#txtInvDOI');
        let txtInvPan = $('#txtInvPan');
        let txtInvCKYCNumber = $('#txtInvCKYCNumber');
        let txtAmount = $('#txtAmount');
        let ddlBranch = $('#ddlBranch');
        let ddlInvPayment_Mode = $('#ddlInvPayment_Mode');
        let txtInvDrawn_Bank_Search = $('#txtInvDrawn_Bank_Search');
        let hdnDrawn_Bank_Name = $('#hdnDrawn_Bank_Name').val();
        let hdnBank_Branch_Name = $('#hdnBank_Branch_Name').val();
        let hdnBank_MICR = $('#hdnBank_MICR').val();
        let hdnBank_NEFT = $('#hdnBank_NEFT').val();
        let txtInvCheque_DD_No = $('#txtInvCheque_DD_No');
        let txtChequeDate = $('#txtChequeDate');
        let ddlCMSBranch = $('#ddlCMSBranch');
        let txtMobile = $('#txtMobile');
        let txtEmail = $('#txtEmail');
        let txtSubBrokerCode = $('#txtSubBrokerCode');
        let txtRemark = $('#txtRemark');

        //depositor status
        if (ddlDepositorsStatus == '')
            err_msg += "<p>Depositor Status is required..!</p>";

        //application type
        if ($.isEmptyObject(ApplicationType))
            err_msg += "<p>Application Type is required..!</p>";

        //physical application no
        if ($.isEmptyObject(txtPhysicalApplNo.val())) {
            err_msg += "<p>Physical App No is required...!</p>";
            txtPhysicalApplNo.addClass('InputBorderRed');
        }

        //investor title
        if (ddlInvtitle.val() == 'select' || ddlInvtitle.val() == '' || ddlInvtitle.val() == null) {
            err_msg += "<p>Name Prefix is required...!</p>";
            ddlInvtitle.addClass('InputBorderRed');
        }

        //investor first name
        if ($.isEmptyObject(txtInvFirstName.val())) {
            err_msg += "<p>First Name is required..!</p>";
            txtInvFirstName.addClass('InputBorderRed');
        }
        else if (!regexNoSpecialChar.test(txtInvFirstName.val())) {
            err_msg += "<p>First Name is not valid..!</p>";
            txtInvFirstName.addClass('InputBorderRed');
        }

        //investor middle name
        if (!$.isEmptyObject(txtInvMiddleName.val()) && !regexNoSpecialChar.test(txtInvMiddleName.val())) {
            err_msg += "<p>Middle Name is not valid..!</p>";
            txtInvMiddleName.addClass('InputBorderRed');
        }

        //investor last name
        if (!$.isEmptyObject(txtInvLastName.val()) && !regexNoSpecialChar.test(txtInvLastName.val())) {
            err_msg += "<p>Last Name is not valid..!</p>";
            txtInvLastName.addClass('InputBorderRed');
        }

        //individual DOB
        if ($.isEmptyObject(txtInvDOB.val()) && ddlDepositorsStatus == 'INDIVIDUAL') {
            err_msg += "<p>DOB is required..!</p>";
            txtInvDOB.parent().addClass('InputBorderRed');
        }
        //non-individual DOI
        else if ($.isEmptyObject(txtInvDOI.val()) && ddlDepositorsStatus != 'INDIVIDUAL' && ddlDepositorsStatus != 'select') {
            err_msg += "<p>Date of Incorporation is required..!</p>";
            txtInvDOI.parent().addClass('InputBorderRed');
        }

        //PAN
        if (ddlDepositorsStatus == 'INDIVIDUAL' && $.isEmptyObject(txtInvPan.val()) && !IsMinor(txtInvDOB.val())) {
            err_msg += "<p>PAN is required..!</p>";
            txtInvPan.addClass('InputBorderRed');
        }
        else if (ddlDepositorsStatus != 'INDIVIDUAL' && $.isEmptyObject(txtInvPan.val())) {
            err_msg += "<p>PAN is required..!</p>";
            txtInvPan.addClass('InputBorderRed');
        }
        else if (!$.isEmptyObject(txtInvPan.val()) && !IsValidPAN(txtInvPan.val())) {
            err_msg += "<p>PAN is not valid..!</p>";
            txtInvPan.addClass('InputBorderRed');
        }
        else if (ddlDepositorsStatus == 'INDIVIDUAL' && IsValidPAN(txtInvPan.val()) && !IsMinor(txtInvDOB.val())) {
            err_msg += Check_PAN(txtInvPan.val(), txtInvDOB.val(), $('#lblApplicationNumber').text(), $('#lblFolioNumber').text().trim());
            //check fourth letter pan should be P only, otherwise not save
            var CheckFourthletter = /[A-Z]{3}[P]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/;
           
            if (!$.isEmptyObject(err_msg)) {
                txtInvPan.addClass('InputBorderRed');
            }
            else if (!CheckFourthletter.test(txtInvPan.val().toUpperCase().trim())) {
                err_msg += "<p>PAN is Invalid..!</p>";
                txtInvPan.addClass('InputBorderRed');
            }
            else {
                txtInvPan.removeClass('InputBorderRed');
            }
        }
        else {
            txtInvPan.removeClass('InputBorderRed');
        }

        //amount
        if ($.isEmptyObject(txtAmount.val())) {
            err_msg += "<p>Amount is required..!</p>";
            txtAmount.addClass('InputBorderRed');
        }
        else if (!regexNumberOnly.test(txtAmount.val())) {
            err_msg += "<p>Amount is not valid..!</p>";
            txtAmount.addClass('InputBorderRed');
        }
        else if (parseInt(txtAmount.val()) < parseInt(Min_Amount)) {
            err_msg += "<p>Amount cannot be less than " + Min_Amount + "..!</p>";
            txtAmount.addClass('InputBorderRed');
        }
        else {
            ExtendedAjaxCall('FDConfiguration/ValidateAmount?amount=' + txtAmount.val(), null, 'GET', function (result) {

                if (!$.isEmptyObject(result) && result.toUpperCase() != 'SUCCESS') {
                    err_msg += "<p>" + result + "</p>";
                    txtAmount.addClass('InputBorderRed');
                }
            }, null, null, false, false, ErrorFunction);
        }

        //branch
        if (ddlBranch.val() == 'select') {
            err_msg += "<p>Branch is required..!</p>";
            ddlBranch.addClass('InputBorderRed');
        }

        //payment mode
        if (ddlInvPayment_Mode.val() == 'select') {
            err_msg += "<p>Mode Of Payment is required..!</p>";
            ddlInvPayment_Mode.addClass('InputBorderRed');
        }
        else if (ddlInvPayment_Mode.val() == "3" || ddlInvPayment_Mode.val() == "4" || ddlInvPayment_Mode.val() == "Cheque/DD" || ddlInvPayment_Mode.val() == "Cheque" || ddlInvPayment_Mode.val() == "Demand Draft") {
            if ($.isEmptyObject(hdnDrawn_Bank_Name)) {
                err_msg += "<p>Please Enter Valid Bank name..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }
            if (hdnBank_Branch_Name.trim() == '') {
                err_msg += "<p>Please Enter Valid Bank Branch name..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }
            if (hdnBank_NEFT.trim() == '') {
                err_msg += "<p>Please Enter Valid Bank IFSC CODE ..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }
            if (hdnBank_MICR.trim() == '') {
                err_msg += "<p>Please Enter Valid MICR CODE..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }

            if (txtInvCheque_DD_No.val().trim() == '') {
                err_msg += "<p>Please Enter Instrument Number..!</p>";
                txtInvCheque_DD_No.addClass('InputBorderRed');
            }
            else if (txtInvCheque_DD_No.val().length < 6) {
                err_msg += "<p>Please Enter Valid Instrument Number..!</p>";
                txtInvCheque_DD_No.addClass('InputBorderRed');
            }

            if (txtChequeDate.val().trim() == '') {
                err_msg += "<p>Please Enter cheque Date..!</p>";
                txtChequeDate.parent().addClass('InputBorderRed');
            }

            let chequeMsg = ValidateChequeDate(txtChequeDate.val().trim());
            if (chequeMsg != null) {
                err_msg += "<p>" + chequeMsg + "</p>";
                txtChequeDate.parent().addClass('InputBorderRed');
            }

            //if (EXC_CMS_MAPPING_FLAG == 1 && $('#hdnEXCCMSbankCode').val() == '')
            //{
            //    $("#txtEXCCMSbankName").css("border", "solid 1px red");
            //    errMessage += "<p>Please Select CMS Location ..!</p>";
            //    isError = true;
            //}
            //else if (EXC_CMS_MAPPING_FLAG == 0 && $('#ddlCMSbank').val().trim() == '0')
            //{
            //    $("#ddlCMSbank").css("border", "solid 1px red");
            //    errMessage += "<p>Please Select CMS Location ..!</p>";
            //    isError = true;

            //}

            if (ddlCMSBranch.val().trim() == 'select') {
                err_msg += "<p>Please Select CMS Location ..!</p>";
                ddlCMSBranch.addClass('InputBorderRed');
            }
        }

        //mobile
        if (txtMobile.val() == "") {
            err_msg += "<p>Please Enter Mobile Number..!</p>";
            txtMobile.addClass('InputBorderRed');
        }
        else if (!IsValidMobile(txtMobile.val())) {
            err_msg += "<p>Please Enter Valid Mobile Number..!</p>";
            txtMobile.addClass('InputBorderRed');
        }

        //email
        if (txtEmail.val() == "") {
            err_msg += "<p>Please Enter Email ID..!</p>";
            txtEmail.addClass('InputBorderRed');
        }
        else if (!IsValidEmail(txtEmail.val())) {
            err_msg += "<p>Please Enter Valid Email ID..!</p>";
            txtEmail.addClass('InputBorderRed');
        }

    } catch (e) {
        fnException(e); return '<p>Something went wrong..!</p>';
    }
    return err_msg;
}

//get step1 data for save
const getStep1Data = function () {
    let objFrontOffice = {}
    try {
        let ddlDepositorsStatus = $('#ddlDepositorsStatus').val();
        let ApplicationType = $('[name="ApplicationType"]:Checked').val();
        let txtPhysicalApplNo = $('#txtPhysicalApplNo').val();
        let ddlInvtitle = $('#ddlInvtitle').val();
        let txtInvFirstName = $('#txtInvFirstName').val();
        let txtInvMiddleName = $('#txtInvMiddleName').val();
        let txtInvLastName = $('#txtInvLastName').val();
        let txtInvDOB = $('#txtInvDOB').val();
        let txtInvDOI = $('#txtInvDOI').val();
        let txtInvPan = $('#txtInvPan').val();
        let txtInvCKYCNumber = $('#txtInvCKYCNumber').val();
        let txtAmount = $('#txtAmount').val();
        let ddlBranch = $('#ddlBranch').val();
        let ddlInvPayment_Mode = $('#ddlInvPayment_Mode').val();
        let txtInvDrawn_Bank_Search = $('#txtInvDrawn_Bank_Search').val();
        let hdnDrawn_Bank_Name = $('#hdnDrawn_Bank_Name').val();
        let hdnBank_Branch_Name = $('#hdnBank_Branch_Name').val();
        let hdnBank_MICR = $('#hdnBank_MICR').val();
        let hdnBank_NEFT = $('#hdnBank_NEFT').val();
        let txtInvCheque_DD_No = $('#txtInvCheque_DD_No').val();
        let txtChequeDate = $('#txtChequeDate').val();
        let ddlCMSBranch = $('#ddlCMSBranch').val();
        let txtMobile = $('#txtMobile').val();
        let txtEmail = $('#txtEmail').val();
        let txtSubBrokerCode = $('#txtSubBrokerCode').val();
        let txtRemark = $('#txtRemark').val();

        if (!$.isEmptyObject($('#lblApplicationNumber').text().trim()))
            objFrontOffice.Appl_No = $('#lblApplicationNumber').text().trim();
        objFrontOffice.DepositorCategory = ddlDepositorsStatus == 'select' ? null : ddlDepositorsStatus.trim();
        objFrontOffice.ApplicationDeclarationType = ApplicationType;
        objFrontOffice.Physical = txtPhysicalApplNo.trim();
        objFrontOffice.Salutation = ddlInvtitle == 'select' ? null : ddlInvtitle.trim();
        objFrontOffice.FirstName = txtInvFirstName.trim();
        objFrontOffice.MiddleName = txtInvMiddleName.trim();
        objFrontOffice.LastName = txtInvLastName.trim();
        if (ddlDepositorsStatus == 'IND')
            objFrontOffice.DOB = txtInvDOB.trim();
        else
            objFrontOffice.DOB = txtInvDOI.trim();
        objFrontOffice.PAN = txtInvPan.trim();
        objFrontOffice.CKYCNumber = txtInvCKYCNumber.trim();
        objFrontOffice.Amount = txtAmount.trim();
        objFrontOffice.Agency_Usr_Branch_Name = ddlBranch == 'select' ? null : $('#ddlBranch option:selected').text().trim();
        objFrontOffice.Agency_Usr_Branch_Cd = ddlBranch == 'select' ? null : ddlBranch.trim();
        objFrontOffice.ModeOfPayment = ddlInvPayment_Mode == 'select' ? null : ddlInvPayment_Mode.trim();
        objFrontOffice.BankName = hdnDrawn_Bank_Name.trim();
        objFrontOffice.BranchName = hdnBank_Branch_Name.trim();
        objFrontOffice.IFSC_Code = hdnBank_NEFT.trim();
        objFrontOffice.MICR_Code = hdnBank_MICR.trim();
        objFrontOffice.Instrument_No = txtInvCheque_DD_No.trim();
        objFrontOffice.Cheque_Date = txtChequeDate.trim();
        if (!$.isEmptyObject(ddlCMSBranch)) {
            objFrontOffice.Cms_Location_Code = ddlCMSBranch == 'select' ? null : ddlCMSBranch.trim();
            objFrontOffice.Cms_Location_Name = ddlCMSBranch == 'select' ? null : $('#ddlCMSBranch :Selected').text().trim();
        }
        objFrontOffice.Mobile = txtMobile.trim();
        objFrontOffice.Email = txtEmail.trim();
        objFrontOffice.SubBrokerCode = txtSubBrokerCode.trim();
        objFrontOffice.Remarks = txtRemark.trim();
        objFrontOffice.Existing_FDR_No = $('#lblExistingFDRNumber').text().trim();
        objFrontOffice.Folio_No = $('#lblFolioNumber').text().trim();
        objFrontOffice.Data_Source = BTP_OBJECT.FH_DATA_SOURCE;
        objFrontOffice.ApplicationType = BTP_OBJECT.ApplicationType == 'A' ? 'Existing' : 'Fresh';


        //if (EXC_CMS_MAPPING_FLAG == 1)
        //{
        //    objFrontOffice.CMSBankLocationcode = $('#hdnEXCCMSbankCode').val().trim();
        //    objFrontOffice.CMSBankLocationname = $('#txtEXCCMSbankName').val().trim();
        //}
        //else if (EXC_CMS_MAPPING_FLAG == 0)
        //{
        //    objFrontOffice.CMSBankLocationcode = $('#ddlCMSbank').val().trim();
        //    objFrontOffice.CMSBankLocationname = $('#ddlCMSbank option:selected').text().trim();
        //}

    } catch (e) {
        fnException(e);
    }
    return objFrontOffice;
}

const FH_PAN_VERIFICATION = function () {
    let isVerified = false;

    try {
        /*if (!$.isEmptyObject($('#txtInvPan').val()) && IsValidPAN($('#txtInvPan').val()) && BTP_OBJECT.FH_DATA_SOURCE == 'CKYC') {*/
        if (!$.isEmptyObject($('#txtInvPan').val()) && IsValidPAN($('#txtInvPan').val()) && (BTP_OBJECT.FH_DATA_SOURCE == 'CKYC' || BTP_OBJECT.FH_DATA_SOURCE == 'FRESH')) {
            let objReqBO = {};
            objReqBO.Source_Type = "CPTP_UNI";
            objReqBO.Holder_Type = '01';
            objReqBO.User_Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
            objReqBO.Remarks = "CPTP_UNI";
            objReqBO.PAN_Holder_Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
            objReqBO.PAN_Holder_DOB = $('#txtInvDOB').val().trim();
            objReqBO.PAN_No = $('#txtInvPan').val();


            ExtendedAjaxCall('PAN_Verification', objReqBO, 'POST', function (result) {
                if (!$.isEmptyObject(result) && result.PAN_DOB_Match_Status == '1') {
                    //$('#txtInvPan').next().addClass('successBox').text('PAN verified successfully from NSDL.').fadeIn('slow').delay(5000).hide(1);
                    isVerified = true;
                }
                else if (!$.isEmptyObject(result) && result.PAN_DOB_Match_Status == '0') {
                    $('#Model_FH_PAN_VERIFICATION_Msg_1').modal('show');
                }
                else {
                    $('#Model_FH_PAN_VERIFICATION_Msg').modal('show');
                }

                $('#preloader').hide();

            }, null, true, false, false);
        }
        else {
            isVerified = true;
        }

    } catch (e) {
        fnException(e);
    }
    return isVerified;
}

const Reset_step1 = function () {
    $('.errorbox').text('').hide();
    $('.form-control').removeClass('InputBorderRed');
    $('.D_T_E').removeClass('InputBorderRed');

    if (!$.isEmptyObject($('#lblApplicationNumber').text())) {
        if ($.isEmptyObject($('#lblFolioNumber').text())) {
            $('#rdoDigital').prop('checked', true).change();

            $('#ddlInvtitle').val('select').prop('disabled', false).removeClass('DisabledControl').change();
            $('#txtInvFirstName').val('').prop('disabled', false).removeClass('DisabledControl').change();
            $('#txtInvMiddleName').val('').prop('disabled', false).removeClass('DisabledControl').change();
            $('#txtInvLastName').val('').prop('disabled', false).removeClass('DisabledControl').change();
            $('#txtInvPan').val('').prop('disabled', false).removeClass('DisabledControl').change();
            $('#txtMobile').val('').prop('disabled', false).removeClass('DisabledControl').change();
            $('#txtEmail').val('').prop('disabled', false).removeClass('DisabledControl').change();
            $('#txtInvDOB').datetextentry('set_date', null);
            $('#txtInvDOI').datetextentry('set_date', null);
        }
        else {
            // $('#txtInvDOB').datetextentry('set_date', null);
        }
    }
    else {
        $('#ddlInvSearchBy').val('select').change();
        $('#txtSearchRefNo').val('').change();
        $('#txtSearchDOB').datetextentry('set_date', null);

        $('#ddlInvtitle').val('select').prop('disabled', false).removeClass('DisabledControl').change();
        $('#txtInvFirstName').val('').prop('disabled', false).removeClass('DisabledControl').change();
        $('#txtInvMiddleName').val('').prop('disabled', false).removeClass('DisabledControl').change();
        $('#txtInvLastName').val('').prop('disabled', false).removeClass('DisabledControl').change();
        $('#txtInvDOB').datetextentry('set_date', null);
        $('#txtInvDOI').datetextentry('set_date', null);
        $('#txtInvPan').val('').prop('disabled', false).removeClass('DisabledControl').change();
        $('#txtMobile').val('').prop('disabled', false).removeClass('DisabledControl').change();
        $('#txtEmail').val('').prop('disabled', false).removeClass('DisabledControl').change();
        $('#rdoDigital').prop('checked', true).change();

        $('#btnfreshcutomer').hide();
        $('#IdInvestorSearch').show();
        $('#IdInvestorInfo').hide();
        $('#DV_INV_DETAILS').hide();
        $('#DV_FH_CKYC_SEARCH').show();

    }
    $('#txtInvDrawn_Bank_Search,#hdnDrawn_Bank_Name,#hdnBank_Branch_Name,#hdnBank_MICR,#hdnBank_NEFT,#txtInvCheque_DD_No,#txtPhysicalApplNo,#txtAmount,#txtSubBrokerCode,#txtRemark').val('');
    $('#ddlBranch,#ddlInvPayment_Mode,#ddlCMSBranch').val('select').prop('disabled', false).removeClass('DisabledControl').change();
    $('#txtChequeDate').datetextentry('set_date', null);
    $('#txtamountinwords').text('');
    $('#txtPhysicalApplNo').val('0000').prop('disabled', false).removeClass('DisabledControl');
    $('#txtInvCKYCNumber').val('').prop('disabled', false).removeClass('DisabledControl').change();


}

$('#btn_FH_PAN_Match_No').click(function () {
    Reset_step1();
});

$('#btnCancel01').bind('click', Reset_step1);



$('#btn_FH_PAN_Match_No_1').click(function () {
    $('#Model_FH_PAN_VERIFICATION_Msg_1').modal('hide');
});



