
//step2 submit
const SubmitStep2 = function ()
{
    try
    {
        let err_msg = "";
        let objOtherDtl = getStep2Data();

        ExtendedAjaxCall('InvestorDetailsSave/SubmitStep2', objOtherDtl, 'POST', function (result)
        {
            try
            {
                if (!$.isEmptyObject(result) && result.Status == 1)
                {
                    BTP_OBJECT.OtherDetailsSave = true;
                    if ($('#ddlSchemes').val() == 'select')
                        $('#ddlCategory').change();
                }
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
            BtpMessagePopup(err_msg, "error");
            return false;
        }

        return true;

    } catch (e)
    {
        fnException(e); return false;
    }

}

//get step2 data for save
const getStep2Data = function ()
{
    let objOtherDtl = {};

    try
    {
        let ddlDepositorsStatus = $('#ddlDepositorsStatus').val();
        objOtherDtl.Appl_No = $('#lblApplicationNumber').text().trim();
        objOtherDtl.Sub_Broker_Code = $('#txtSubBrokerCode').val().trim();
        objOtherDtl.Depositor_Status = ddlDepositorsStatus == 'select' ? null : ddlDepositorsStatus.trim();
        objOtherDtl.Physical_App_Number = $('#txtPhysicalApplNo').val();
        objOtherDtl.IsSecondHolderApplicable = $('#chkSHApplicable').prop('checked') ? true : false;
        objOtherDtl.IsThirdHolderApplicable = $('#chkTHApplicable').prop('checked') ? true : false;
        objOtherDtl.IsNomineeApplicable = $('#chkNomApplicable').prop('checked') ? true : false;
        objOtherDtl.FolioNo = $('#lblFolioNumber').text().trim();
        objOtherDtl.FDRNo = $('#lblExistingFDRNumber').text().trim();
        objOtherDtl.LastInvDate = $('#lblLastInvestmentDate').text().trim();
        objOtherDtl.Is_FH_Tax_Resident = $('#btnsldFatca').hasClass('active');
        objOtherDtl.Is_FH_Green_Card_Holder = $('#btnsldGreen').hasClass('active');
        objOtherDtl.Is_SH_Tax_Resident = $('#btnSHsldFatca').hasClass('active');
        objOtherDtl.Is_SH_Green_Card_Holder = $('#btnSHsldGreen').hasClass('active');
        objOtherDtl.Is_TH_Tax_Resident = $('#btnTHsldFatca').hasClass('active');
        objOtherDtl.Is_TH_Green_Card_Holder = $('#btnTHsldGreen').hasClass('active');

    } catch (e)
    {
        fnException(e);
    }
    return objOtherDtl;
}

//step2 reset
const Reset_step2 = function ()
{
    $('.errorbox').text('').hide();
    $('#chkSHApplicable,#chkTHApplicable,#chkNomApplicable').prop('checked', false).change();
    $('#btnSHsldFatca,#btnSHsldGreen,#btnTHsldFatca,#btnTHsldGreen').removeClass('active');
    $('#chkTHApplicable').prop('disabled', true).prop('checked', false).change();
}


$('#chkSHApplicable').change(function ()
{
    $('#btnSHsldFatca,#btnSHsldGreen').removeClass('active').change();

    if ($(this).prop('checked'))
    {
        $('#ddlHolderType option[value="02"]').show();
        $('#ddlDocHolderType option[value="02"]').show();
        //fatca
        $('.secondholdercls').show();
        $('#chkTHApplicable').prop('disabled', false);
    }
    else
    {
        $('#ddlHolderType option[value="02"]').hide();
        $('#ddlHolderType option[value="03"]').hide();
        $('#ddlDocHolderType option[value="02"]').hide();
        $('#ddlDocHolderType option[value="03"]').hide();
        $('.secondholdercls').hide();
        $('#chkTHApplicable').prop('disabled', true).prop('checked', false).change();

        BTP_OBJECT.mode = 'R';
        SHReset();
        THReset();
        BTP_OBJECT.mode = 'A';
    }
    $('#ddlHolderType').val('01').change();
});

$('#chkTHApplicable').change(function ()
{
    $('#btnTHsldFatca,#btnTHsldGreen').removeClass('active').change();

    if ($(this).prop('checked'))
    {
        $('#ddlHolderType option[value="03"]').show();
        $('#ddlDocHolderType option[value="03"]').show();
        //fatca
        $('.thirdholdercls').show();
    }
    else
    {
        $('#ddlHolderType option[value="03"]').hide();
        $('#ddlDocHolderType option[value="03"]').hide();
        $('.thirdholdercls').hide();

        BTP_OBJECT.mode = 'R';
        THReset();
        BTP_OBJECT.mode = 'A';
    }
    $('#ddlHolderType').val('01').change();
});

$('#chkNomApplicable').change(function ()
{
    if ($(this).prop('checked'))
        $('#IdBtnTabSwit06').prop('disabled', false).removeClass('DisabledControl');
    else
        $('#IdBtnTabSwit06').prop('disabled', true).addClass('DisabledControl');
});

$('#btnCancel02').bind('click', Reset_step2);

$('#btnsldFatca')
    .click(function ()
    {
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

        if ($(this).hasClass('active') || $('#btnsldGreen').hasClass('active'))
        {
            $('#DV_FH_FATCA').show();
            $('#DV_TDS_FLAG,#DV_HNG').hide();
            $('#chkTDFFlag').prop('checked', false).change();
        }
        else
        {
            $('#DV_FH_FATCA').hide();
            $('#DV_TDS_FLAG').show();
            $('#chkTDFFlag').prop('checked', false).change();
        }
    })
    .change(function ()
    {
        if ($(this).hasClass('active') || $('#btnsldGreen').hasClass('active'))
        {
            $('#DV_FH_FATCA').show();
            $('#DV_TDS_FLAG,#DV_HNG').hide();
            $('#chkTDFFlag').prop('checked', false).change();
        }
        else
        {
            $('#DV_FH_FATCA').hide();
            $('#DV_TDS_FLAG').show();
            $('#chkTDFFlag').prop('checked', false).change();
        }

    });

$('#btnsldGreen')
    .click(function ()
    {
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

        if ($(this).hasClass('active') || $('#btnsldFatca').hasClass('active'))
        {
            $('#DV_FH_FATCA').show();
            $('#DV_TDS_FLAG,#DV_HNG').hide();
            $('#chkTDFFlag').prop('checked', false).change();
        }
        else
        {
            $('#DV_FH_FATCA').hide();
            $('#DV_TDS_FLAG').show();
            $('#chkTDFFlag').prop('checked', false).change();
        }
    })
    .change(function ()
    {
        if ($(this).hasClass('active') || $('#btnsldFatca').hasClass('active'))
        {
            $('#DV_FH_FATCA').show();
            $('#DV_TDS_FLAG,#DV_HNG').hide();
            $('#chkTDFFlag').prop('checked', false).change();
        }
        else
        {
            $('#DV_FH_FATCA').hide();
            $('#chkTDFFlag').prop('checked', false).change();
        }
    });

$('#btnSHsldFatca')
    .click(function ()
    {
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

        if ($(this).hasClass('active') || $('#btnSHsldGreen').hasClass('active'))
            $('#DV_SH_FATCA').show();
        else
            $('#DV_SH_FATCA').hide();
    })
    .change(function ()
    {
        if ($(this).hasClass('active') || $('#btnSHsldGreen').hasClass('active'))
            $('#DV_SH_FATCA').show();
        else
            $('#DV_SH_FATCA').hide();
    });

$('#btnSHsldGreen')
    .click(function ()
    {
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

        if ($(this).hasClass('active') || $('#btnSHsldFatca').hasClass('active'))
            $('#DV_SH_FATCA').show();
        else
            $('#DV_SH_FATCA').hide();
    })
    .change(function ()
    {
        if ($(this).hasClass('active') || $('#btnSHsldFatca').hasClass('active'))
            $('#DV_SH_FATCA').show();
        else
            $('#DV_SH_FATCA').hide();
    });

$('#btnTHsldFatca')
    .click(function ()
    {
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

        if ($(this).hasClass('active') || $('#btnTHsldGreen').hasClass('active'))
            $('#DV_TH_FATCA').show();
        else
            $('#DV_TH_FATCA').hide();
    })
    .change(function ()
    {
        if ($(this).hasClass('active') || $('#btnTHsldGreen').hasClass('active'))
            $('#DV_TH_FATCA').show();
        else
            $('#DV_TH_FATCA').hide();
    });

$('#btnTHsldGreen')
    .click(function ()
    {
        if ($(this).hasClass('active'))
            $(this).removeClass('active');
        else
            $(this).addClass('active');

        if ($(this).hasClass('active') || $('#btnTHsldFatca').hasClass('active'))
            $('#DV_TH_FATCA').show();
        else
            $('#DV_TH_FATCA').hide();
    })
    .change(function ()
    {
        if ($(this).hasClass('active') || $('#btnTHsldFatca').hasClass('active'))
            $('#DV_TH_FATCA').show();
        else
            $('#DV_TH_FATCA').hide();
    });

