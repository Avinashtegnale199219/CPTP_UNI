
const InvDOB_Change = function () 
{
    try
    {

        let age = GetAge($('#txtInvDOB').val());

        if (age >= 60)
        {
            $('#ddlCategory option[value="PUBLIC"]').hide();
            $('#ddlCategory option[value="EMPLOYEE"]').hide();
            $('#ddlCategory option[value="SR CITIZEN"]').show();
            $('#ddlCategory').val('SR CITIZEN').prop('disabled', true).addClass('DisabledControl');
            if (BTP_OBJECT.OtherDetailsSave)
                $('#ddlCategory').change();
        }
        else
        {
            $('#ddlCategory option[value="PUBLIC"]').show();
            $('#ddlCategory option[value="EMPLOYEE"]').hide();
            $('#ddlCategory option[value="SR CITIZEN"]').hide();
            $('#ddlCategory').val('select').prop('disabled', false).removeClass('DisabledControl');
            if (BTP_OBJECT.OtherDetailsSave)
                $('#ddlCategory').change();
        }

        $('#txtInvPan').prop('required', true);
        $('#DV_FH #ddlMaritalStatus option[value="01"]').prop('disabled', false);

        if (age < 18)
        {
            $('#txtInvPan').val('').prop('required', false);
            $('#DV_FH #ddlGuardianTitle').prop('required', true);
            $('#DV_FH #txtGuardianFName').prop('required', true);
            $('#DV_FH #txtGuardianPAN').prop('required', true);
            $('#DV_FH #ddlMaritalStatus option[value="01"]').prop('disabled', true);
            $('#DV_FH #ddlMaritalStatus').val('03');
            $('#DV_PAN').hide();
            $('#DV_FH .GUARDIAN').show();
            //$('#DV_FH .SPOUSE').hide();
        }
        else if ($('#DV_FH #ddlMaritalStatus').val() == '01')
        {
            $('#DV_FH #ddlGuardianTitle').prop('required', false);
            $('#DV_FH #txtGuardianFName').prop('required', false);
            $('#DV_FH #txtGuardianPAN').prop('required', false);
            $('#DV_PAN').show();
            $('#DV_FH .GUARDIAN').hide();
            $('#DV_FH .SPOUSE').show();
        }
        else
        {
            $('#DV_FH #ddlGuardianTitle').prop('required', false);
            $('#DV_FH #txtGuardianFName').prop('required', false);
            $('#DV_FH #txtGuardianPAN').prop('required', false);
            $('#DV_PAN').show();
            $('#DV_FH .GUARDIAN').hide();
            //$('#DV_FH .SPOUSE').hide();
        }
    } catch (e)
    {
        fnException(e); return false;
    }
}
//cheque validation
const ValidateChequeDate = function (date)
{
    try
    {
        if (!$.isEmptyObject(date))
        {
            let chequeDate = date.toString().split('-');
            chequeDate = new Date(Number(chequeDate[0]), (Number(chequeDate[1]) - 1), Number(chequeDate[2]));
            let now = new Date();
            let next = new Date();
            let prev = new Date();
            next.setDate(now.getDate() + Number(Max_Cheque_Date));
            prev.setDate(now.getDate() - Number(Min_Cheque_Date));

            if (chequeDate < prev)
                return "Cheque date cannot be less than " + Min_Cheque_Date + " days from today..!";

            if (chequeDate > next)
                return "Cheque date cannot be greater than " + Max_Cheque_Date + " days from today..!";

        }
        return null;
    } catch (e)
    {
        fnException(e); return null;
    }
}
//amount validation
const ValidateAmount = function (amount)
{
    let msg = null;
    try
    {
        let depositDetails = {
            FD_Amount: parseFloat(amount),
            SCHEME: $('#ddlSchemes').val(),
            PERIOD: $('#ddlTenure').val(),
            INTEREST_FREQ: $('#ddlInterestFrequency').val(),
            CATEGORY: $('#ddlCategory').val(),
            Mode_Status: "AF"
        }

        ExtendedAjaxCall('FDConfiguration/ValidateAmount?amount=' + amount, null, 'GET', function (result)
        {
            if (!$.isEmptyObject(result) && result != "Success")
                msg = result;
            $('#preloader').hide();
        }, null, null, false, false, ErrorFunction);

    } catch (e)
    {
        fnException(e);
    }
    return msg;
}
//PAN check
const Check_PAN = function (PAN, DOB, Appl_No, Folio)
{
    let err_msg = '';
    try
    {
        let investorDtl = {
            Appl_No: Appl_No,
            DOB: DOB,
            Folio: Folio,
            PAN: PAN
        }
        ExtendedAjaxCall('DataEntry/Check_PAN', investorDtl, 'POST', function (result)
        {
            if (!$.isEmptyObject(result) && !$.isEmptyObject(result[0].Msg))
                err_msg = '<p>' + result[0].Msg + '</p >';

        }, null, null, false, false, ErrorFunction);


    } catch (e)
    {
        fnException(e); return '<p>Something went wrong while checking PAN..!</p>';
    }
    return err_msg;
}

//
$('#txtSearchDOB,input[name="SEARCH_DOB"]').datetextentry({
    max_date: function () { return this.get_today(); },
    max_date_message: 'Date cannot be future date'
});

//investor dob
$('#txtInvDOB').datetextentry({
    min_year: '1915',
    max_date: function () { return this.get_today(); },
    max_date_message: 'Date cannot be future date',
    on_blur: InvDOB_Change
    
});

//non-individul doi
$('#txtInvDOI').datetextentry({
    max_date: function () { return this.get_today(); },
    max_date_message: 'Date cannot be future date',
});

//cheque date
$('#txtChequeDate').datetextentry({
    min_year: '1915',
    on_blur: function ()
    {
        try
        {
            let txtChequeDate = $('#txtChequeDate');
            if (!$.isEmptyObject(txtChequeDate.val()))
            {
                let chequeDate = $('#txtChequeDate').val().split('-');
                chequeDate = new Date(Number(chequeDate[0]), (Number(chequeDate[1]) - 1), Number(chequeDate[2]));
                let now = new Date();
                let next = new Date();
                let prev = new Date();
                next.setDate(now.getDate() + Number(Max_Cheque_Date));
                prev.setDate(now.getDate() - Number(Min_Cheque_Date));

                if (chequeDate < prev)
                {
                    let msg = "Cheque date cannot be less than " + Min_Cheque_Date + " days from today";
                    txtChequeDate.datetextentry('set_error', msg);
                }

                if (chequeDate > next)
                {
                    let msg = "Cheque date cannot be greater than " + Max_Cheque_Date + " days from today";
                    txtChequeDate.datetextentry('set_error', msg);
                }

            }
            return null;
        } catch (e)
        {
            fnException(e); return null;
        }
    }
});

//depositor status
$('#ddlDepositorsStatus')
    .focusin(function ()
    {
        $(this).next().text('').hide();
    })
    .change(function ()
    {
        $(this).next().text('').hide();
        BTP_OBJECT.IND_NIND = this.value;

        if (this.value == 'IND' || this.value == 'select')
        {
            $('.IND').show();
            $('.NIND').hide();
            $('#ddlInvtitle').val('select').change();
        }
        else 
        {
            $('.IND').hide();
            $('.NIND').show();
            $('#ddlInvtitle').val('M/S').change();
        }

        $('#lblDepositorCategory').text($('#ddlDepositorsStatus :Selected').text());

    });

$('#ddlInvSearchBy')
    .focusin(function ()
    {
        let ddlDepositorCategory = $('#ddlDepositorsStatus');

        ddlDepositorCategory.next().text('').hide();
        if (ddlDepositorCategory.val() == 'select')
        {
            ddlDepositorCategory.focus();
            ddlDepositorCategory.next().text('Depositor Category is required').show();
            return;
        }

    })
    .change(function ()
    {
        let ddlDepositorCategory = $('#ddlDepositorsStatus');
        let ddlInvSearchBy = $('#ddlInvSearchBy');
        let txtSearchRefNo = $('#txtSearchRefNo');
        let txtSearchDOB = $('#txtSearchDOB');

        $("#DobSearch").hide();

        txtSearchRefNo.val('').removeAttr('oninput', "this.value=this.value.replace(/[^0-9]/g,'');").change();
        txtSearchDOB.datetextentry('clear');

        if (ddlDepositorCategory.val() == "IND")
        {
            if (ddlInvSearchBy.val() == "Mobile")
            {
                txtSearchRefNo.attr('maxlength', '10').attr('oninput', "this.value=this.value.replace(/[^0-9]/g,'');");
                $("#DobSearch").show();
            }
            else if (ddlInvSearchBy.val() == "PAN")
            {
                txtSearchRefNo.attr('maxlength', '10');
                $("#DobSearch").show();
            }
            else if (ddlInvSearchBy.val() == "CKYCNo")
            {
                txtSearchRefNo.attr('maxlength', '20');
                $("#DobSearch").show();
            }
            else if (ddlInvSearchBy.val() == "FDR")
                txtSearchRefNo.attr('maxlength', '15');
            else if (ddlInvSearchBy.val() == "Folio")
                txtSearchRefNo.attr('maxlength', '15');
            else if (ddlInvSearchBy.val() == "Email")
            {
                txtSearchRefNo.removeAttr('maxlength');
                $("#DobSearch").show();
            }
        }
        else
        {
            if (ddlInvSearchBy.val() == "Mobile")
                txtSearchRefNo.attr('maxlength', '10').attr('oninput', "this.value=this.value.replace(/[^0-9]/g,'');");
            else if (ddlInvSearchBy.val() == "PAN")
                txtSearchRefNo.attr('maxlength', '10');
            else if (ddlInvSearchBy.val() == "CKYCNo")
                txtSearchRefNo.attr('maxlength', '20');
            else if (ddlInvSearchBy.val() == "FDR")
                txtSearchRefNo.attr('maxlength', '15');
            else if (ddlInvSearchBy.val() == "Folio")
                txtSearchRefNo.attr('maxlength', '15');
            else if (ddlInvSearchBy.val() == "Email")
                txtSearchRefNo.removeAttr('maxlength');
        }
    });

$('#txtSearchRefNo')
    .keyup(function ()
    {
        $(this).next().text('').hide();
        let ddlInvSearchBy = $('#ddlInvSearchBy');

        if (!$.isEmptyObject(this.value))
        {
            if (ddlInvSearchBy.val() == 'PAN' && !IsValidPAN(this.value))
                $(this).next().text('Please Enter valid PAN').show();
            else if (ddlInvSearchBy.val() == 'Mobile' && !IsValidMobile(this.value))
                $(this).next().text('Please Enter valid Mobile').show();
            else if (ddlInvSearchBy.val() == 'Email' && !IsValidEmail(this.value))
                $(this).next().text('Please Enter valid Email').show();
        }

    })
    .change(function ()
    {
        if ($.isEmptyObject(this.value))
            $(this).next().text('').hide();
    });

//amount
$('#txtAmount')
    .change(function ()
    {
        $('#ddlCategory').val('select').prop('disabled', false).removeClass('DisabledControl').change();
    })
    .keyup(function ()
    {
        $(this).next().text('').hide();

        if (!$.isEmptyObject(this.value) && isNaN(this.value))
            $(this).next().text('Amount is not valid').show();
        else if (!$.isEmptyObject(this.value) && parseInt(this.value) < Min_Amount)
        {
            let msg = 'Amount can not be less than ' + Min_Amount;
            $(this).next().text(msg).show();
        }
        else if (!$.isEmptyObject(this.value))
        {
            ExtendedAjaxCall('FDConfiguration/ValidateAmount?amount=' + $(this).val(), null, 'GET', function (result) 
            {
                if (!$.isEmptyObject(result) && result.toUpperCase() != 'SUCCESS')
                    $(this).next().text(result).show();
            }, function ()
                {

                }, null, true, false, ErrorFunction);
        }
    })
    .focusout(function ()
    {
        let amountinword = convertNumberToWords(this.value);
        $('#txtamountinwords').text(amountinword);
    });

//Investor title
$('#ddlInvtitle').change(function ()
{
    if ($(this).val() == 'MR' || $(this).val() == 'SHRI')
        $('#DV_FH #ddlGender').val('M');

    if ($(this).val() == 'MS' || $(this).val() == 'MRS')
        $('#DV_FH #ddlGender').val('F');
});

//invester PAN
$('#txtInvPan').keyup(function ()
{
    $(this).next().text('').removeClass('successBox').hide();

    if (!$.isEmptyObject(this.value) && !IsValidPAN(this.value))
        $(this).next().text('PAN is not valid').show();
    else
    {

    }
});

//payment mode
$('#ddlInvPayment_Mode').change(function ()
{
    BTP_OBJECT.payment_mode = this.value;
    $('#lblModeOfPayment').text(this.value);
    $('#txtInvDrawn_Bank_Search,#hdnDrawn_Bank_Name,#hdnBank_Branch_Name,#hdnBank_MICR,#hdnBank_NEFT,#txtInvCheque_DD_No').val('');
    $('#ddlCMSBranch').val('select');

    if (this.value == '3' || this.value == '4' ||this.value == 'Cheque/DD' || this.value == "Cheque" || this.value == "Demand Draft")
        $('#divChequeDtl').show();
    else
        $('#divChequeDtl').hide();
});

//cheque no
$('#txtInvCheque_DD_No').keyup(function ()
{
    $(this).next().text('').hide();
    if (!$.isEmptyObject(this.value) && this.value.length < 6)
        $(this).next().text('Instrument Number is not valid').show();
});

//investor mobile
$('#txtMobile').keyup(function ()
{
    $(this).next().text('').hide();
    if (!$.isEmptyObject(this.value) && !IsValidMobile(this.value))
        $(this).next().text('Mobile Number is not valid').show();
});

//investor email
$('#txtEmail').keydown(function ()
{
    $(this).next().text('').hide();
    if (!$.isEmptyObject(this.value) && !IsValidEmail(this.value))
        $(this).next().text('Email Id is not valid').show();
});

//application type
$('#rdoPhysical,#rdoDigital').change(function ()
{
    if (this.id == 'rdoPhysical')
    {
        BTP_OBJECT.appl_dec_type = 'PHYSICAL';
        $('#lblApplicationType').text('PHYSICAL');
        $('#DV_FH_CKYC_SEARCH').hide();
        $('#DV_INV_DETAILS').show();
        $('#spnApplFormUpload').text('*');
        $('#DV_APPL_UPLOAD').show();
    }
    else
    {
        BTP_OBJECT.appl_dec_type = 'DIGITAL';
        $('#lblApplicationType').text('DIGITAL');
        if ($.isEmptyObject($('#txtInvFirstName').val()))
        {
            $('#DV_FH_CKYC_SEARCH').show();
            $('#DV_INV_DETAILS').hide();
        }
        else
        {
            $('#DV_FH_CKYC_SEARCH').hide();
            $('#DV_INV_DETAILS').show();
        }
        $('#spnApplFormUpload').text('');
        $('#DV_APPL_UPLOAD').hide();
    }
});
