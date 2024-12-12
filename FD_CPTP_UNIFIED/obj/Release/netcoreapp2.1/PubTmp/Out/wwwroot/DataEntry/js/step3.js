
//step3 submit
const SubmitStep3 = function ()
{
    try
    {
        let err_msg = isValidStep3();
        if (!$.isEmptyObject(err_msg))
        {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }

        //Investment Details
        let InvestorDtl = getStep3Data();

        ExtendedAjaxCall('InvestorDetailsSave/SubmitStep3', InvestorDtl, 'POST', function (result)
        {
            try
            {
                if (!$.isEmptyObject(result) && result.Status == 1)
                    BTP_OBJECT.InvestmentDetailsSave = true;
                else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg))
                    err_msg += '<p>' + result[0].Msg + '</p>';
                else
                    err_msg += '<p>Something went wrong..!</p>';

                $('#preloader').hide();

            } catch (e)
            {
                fnException(e);
            }
        }, null, true, false, false, ErrorFunction);

        if (!$.isEmptyObject(err_msg))
        {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }

        return true;

    } catch (e)
    {
        fnException(e); return false;
    }
}

//step3 validations
const isValidStep3 = function ()
{
    let err_msg = "";
    try
    {
        $('.FD_DTLS').removeClass('InputBorderRed');

        //FDDetails
        let FDDetails = $('.FD_DTLS');
        for (let i = 0; i < FDDetails.length; i++)
        {
            let FDDetail = $(FDDetails[i]);
            if (FDDetail.prop('required') && ($.isEmptyObject(FDDetail.val()) || FDDetail.val() == 'select'))
            {
                err_msg += "<p>" + FDDetail.attr('errmsg') + "</p>";
                FDDetail.addClass('InputBorderRed');
            }
        }
    } catch (e)
    {
        fnException(e);
    }
    return err_msg;
}

//get step3 data for save
const getStep3Data = function ()
{
    let InvestorDtl = {};

    try
    {
        //Investment Details
        InvestorDtl.Appl_No = $('#lblApplicationNumber').text().trim();
        InvestorDtl.Depositor_Status_Code = $('#ddlDepositorsStatus').val() == 'select' ? null : $('#ddlDepositorsStatus').val();
        InvestorDtl.Category = $('#ddlCategory').val().trim();
        InvestorDtl.EmployeeCode = $('#ddlCategory').val() == 'EMPLOYEE' ? $('#txtEmpCode').val().trim() : '';
        InvestorDtl.Scheme = $('#ddlSchemes option:selected').text().trim();
        InvestorDtl.SchemeCode = $('#ddlSchemes').val().trim();
        InvestorDtl.IntRate = parseFloat($('#ddlTenure :Selected').attr('interest_rate'));
        InvestorDtl.IntFreq = $('#ddlInterestFrequency').val();
        InvestorDtl.Tenure = $('#ddlTenure').val();
        InvestorDtl.FDR_Dispatch_Mode = $('#ddlFdrDispatchMode').val();
        InvestorDtl.Renewal_For = $('#ddlRenewalFor').val() == 'select' ? null : $('#ddlRenewalFor').val();
        if (!$('#btnsldFatca').hasClass('active') && !$('#btnsldGreen').hasClass('active'))
        {
            InvestorDtl.TDS_Flag = $('#chkTDFFlag').prop('checked') ? 'Y' : 'N';
            InvestorDtl.HNG = $('#chkTDFFlag').prop('checked') ? $('#ddlHNG').val() : null;
        }
        InvestorDtl.Is_Auto_Renewal = $('#ddlAutoRenewal').val() == 'YES' ? true : false;
        InvestorDtl.Amount = isNaN(parseInt($('#lblAmount').text().trim())) ? 0 : parseInt($('#lblAmount').text().trim());
        //InvestorDtl.Payment_Mode = $('#lblModeOfPayment').text().trim();
        InvestorDtl.Payment_Mode = $('#ddlInvPayment_Mode').val().trim();
        InvestorDtl.Payment_Instruction = $('#ddlDepositPayable').val();
        InvestorDtl.Ind_Nind = BTP_OBJECT.IND_NIND;
        InvestorDtl.ApplicationDeclarationType = $('#lblApplicationType').text().trim();
        InvestorDtl.FolioNo = $('#lblFolioNumber').text().trim();
        InvestorDtl.FDRNo = $('#lblExistingFDRNumber').text().trim();
        InvestorDtl.LastInvDate = $('#lblLastInvestmentDate').text().trim();
    } catch (e)
    {
        fnException(e);
    }
    return InvestorDtl;
}

//step3 reset
const Reset_step3 = function ()
{
    $('.errorbox').text('').hide();

    if (!$('#ddlCategory').prop('disabled'))
    {
        $('#ddlCategory').val('select').change();
    }

    if (!$('#ddlFdrDispatchMode').prop('disabled'))
    {
        $('#ddlFdrDispatchMode').val('select').change();
    }

    $('#ddlSchemes,#ddlInterestFrequency,#ddlTenure,#ddlDepositPayable,#ddlAutoRenewal,#ddlRenewalFor,#ddlHNG').val('select').change();
    $('#chkTDFFlag').prop('checked', false).change();
    $('#txtEmpCode').val('');
}


//category change
$('#ddlCategory').change(function ()
{
    try
    {
        let lblAmount = $('#lblAmount').text();
        if ($(this).val() == 'select')
        {
            $('#ddlSchemes').empty().append('<option value="select">Select</option>').change();
            return;
        }
        if (isNaN(lblAmount) || isNaN(parseFloat(lblAmount)))
        {
            BtpMessagePopup('Fixed Deposit Amount is not valid..!', 'error');
            return false;
        }

        let Amount = parseFloat(lblAmount);

        let data = {
            SCHEME: null,
            PERIOD: null,
            INTEREST_FREQ: null,
            CATEGORY: $(this).val(),
            Amount: Amount,
            Mode_Status: 'AF'
        };

        BindDDLExtendedAjaxCall('#ddlSchemes', 'FDConfiguration/Get_FD_SchemeAsync', data, 'POST', null, null, true, false, false, ErrorFunction);

        $('#ddlSchemes').change();

        if (this.value == 'EMPLOYEE')
        {
            $('#DV_EMP_CODE').show();
            $('#txtEmpCode').prop('required', true);
        }
        else
        {
            $('#DV_EMP_CODE').hide();
            $('#txtEmpCode').prop('required', false);
        }

    } catch (e)
    {
        fnException(e); return false;
    }
});

//scheme change
$('#ddlSchemes').change(function ()
{
    try
    {
        if ($(this).val() == 'select')
        {
            $('#ddlInterestFrequency').empty().append('<option value="select">Select</option>').change();
            return;
        }

        let category = $('#ddlCategory').val();
        let lblAmount = $('#lblAmount').text();

        if (isNaN(lblAmount) || isNaN(parseFloat(lblAmount)))
        {
            BtpMessagePopup('Fixed Deposit Amount is not valid..!', 'error');
            return false;
        }
        let Amount = parseFloat(lblAmount);
        let data = {
            SCHEME: $(this).val(),
            PERIOD: null,
            INTEREST_FREQ: null,
            CATEGORY: category,
            Amount: Amount,
            Mode_Status: 'AF'
        };

        BindDDLExtendedAjaxCall('#ddlInterestFrequency', 'FDConfiguration/GetInterestFrequencyAsync', data, 'POST', null, null, true, false, false, ErrorFunction);

        if ($('#ddlSchemes').val() == 'CUMULATIVE')
            $('#ddlInterestFrequency').val('COMP. ANNUALY');

        $('#ddlInterestFrequency').change();

    } catch (e)
    {
        fnException(e); return false;
    }
});

//interest freq change
$('#ddlInterestFrequency').change(function ()
{
    try
    {
        if ($(this).val() == 'select')
        {
            $('#ddlTenure').empty().html('<option value="select">Select</option>').change();
            return;
        }

        let Category = $('#ddlCategory').val();
        let Scheme = $('#ddlSchemes').val();
        let InterestFreq = $('#ddlInterestFrequency').val();
        let lblAmount = $('#lblAmount').text();

        if (isNaN(lblAmount) || isNaN(parseFloat(lblAmount)))
        {
            BtpMessagePopup('Fixed Deposit Amount is not valid..!', 'error');
            return false;
        }
        let Amount = parseFloat(lblAmount);
        let data = {
            SCHEME: Scheme,
            PERIOD: null,
            INTEREST_FREQ: InterestFreq,
            CATEGORY: Category,
            Amount: Amount,
            Mode_Status: 'AF'
        };

        ExtendedAjaxCall('FDConfiguration/GetTenureAsync', data, 'POST', function (result)
        {
            $('#preloader').hide();
            let html = '<option value="select">Select</option>';
            if (result != null && result !== undefined && result.length > 0)
            {
                for (var i = 0; i < result.length; i++)
                {
                    html += '<option value="' + result[i].Code + '" interest_rate="' + (result[i].INTEREST_RATES).toFixed(2) + '">' + result[i].Desc + ' months - (' + (result[i].INTEREST_RATES).toFixed(2) + '%)</option>';
                }
            }
            $('#ddlTenure').html(html).change();
        }, null, true, false, false, ErrorFunction);


    } catch (e)
    {
        fnException(e); return false;
    }
});

$('#ddlAutoRenewal').change(function ()
{
    if (this.value == 'YES')
    {
        $('#DV_RENEWAL_FOR').show();
        $('#ddlRenewalFor').prop('required', true);
    }
    else
    {
        $('#DV_RENEWAL_FOR').hide();
        $('#ddlRenewalFor').prop('required', false);
    }
});

$('#chkTDFFlag').change(function ()
{
    try
    {

        if ($(this).prop('checked'))
        {
            $('#DV_HNG').show();
            $('#ddlHNG').prop('required', true);
        }
        else
        {
            $('#DV_HNG').hide();
            $('#ddlHNG').prop('required', false);
        }

        let txtInvDOB = $('#txtInvDOB').val();
        let age = GetAge(txtInvDOB);
        if (age >= 60)
            $('#ddlHNG').val("H").prop('disabled', true).addClass('DisabledControl').change();
        else
            $('#ddlHNG').val("G").prop('disabled', true).addClass('DisabledControl').change();

    } catch (e)
    {
        fnException(e); return false;
    }
});

$('#btnCancel03').bind('click', Reset_step3);


