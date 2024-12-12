//$(document).ready(function () {
//    //Bank Details autocomplete:
//    AutoCompleteBankDetails('txtSearchBank', 'txtMICRCode', 'txtNEFTCode', 'txtBankName', 'txtBranchName');//Repayment Bank Details
//    AutoCompleteBankDetails('txtInvDrawn_Bank_Search', 'txtInvBank_MICR', 'txtInvBank_NEFT', 'txtInvDrawn_Bank_Name', 'txtInvBank_Branch_Name');//Repayment Bank Details

//});

$('#txtInvDrawn_Bank_Search').autocomplete({
    minLength: 3,
    source: function (request, response) 
    {
        ExtendedAjaxCall("BankDetails/Get_BankDtls/" + $('#txtInvDrawn_Bank_Search').val(), null, 'GET', function (data)
        {
            try
            {
                if (!$.isEmptyObject(data))
                {
                    response($.map(data, function (item)
                    {
                        return {
                            label: item.LABEL,
                            value: item.LABEL,
                            micrcode: item.MICR_CODE,
                            bankname: item.BANK_NAME,
                            bankbranch: item.BANK_BRANCH,
                            neftcode: item.NEFT_CODE
                        }
                    }));
                }
                else
                {
                    response([{ label: 'No Record Found !!', value: '' }]);
                }
            } catch (e)
            {
                fnException(e);
            }
        }, function ()
        {
            $('#preloader').hide();
        }, null, true, false, ErrorFunction);

    },
    select: function (event, ui)
    {
        if (ui.item.value == '' || ui.item.value == 'No Record Found !!')
        {
            $('#hdnBank_MICR').val('');
            $('#hdnBank_NEFT').val('');
            $('#hdnDrawn_Bank_Name').val('');
            $('#hdnBank_Branch_Name').val('');
            $(this).val("");
            return false;
        } else
        {
            $('#txtInvDrawn_Bank_Search').val('');
            $('#hdnBank_MICR').val(ui.item.micrcode);
            $('#hdnBank_NEFT').val(ui.item.neftcode);
            $('#hdnDrawn_Bank_Name').val(ui.item.bankname);
            $('#hdnBank_Branch_Name').val(ui.item.bankbranch);
            $(this).val("");
        }
    },
    focus: function (event, ui)
    {
        event.preventDefault();
    }
});

$('#txtSearchBank').autocomplete({
    minLength: 3,
    source: function (request, response) 
    {
        ExtendedAjaxCall("BankDetails/Get_BankDtls/" + $('#txtSearchBank').val(), null, 'GET', function (data)
        {
            try
            {
                if (!$.isEmptyObject(data))
                {
                    response($.map(data, function (item)
                    {
                        return {
                            label: item.LABEL,
                            value: item.BANK_NAME,
                            micrcode: item.MICR_CODE,
                            bankname: item.BANK_NAME,
                            bankbranch: item.BANK_BRANCH,
                            neftcode: item.NEFT_CODE
                        }
                    }));
                }
                else
                {
                    response([{ label: 'No Record Found !!', value: '' }]);
                }
            } catch (e)
            {
                fnException(e);
            }
        }, function ()
        {
            $('#preloader').hide();
        }, null, true, false, ErrorFunction);

    },
    select: function (event, ui)
    {
        if (ui.item.value == '' || ui.item.value == 'No Record Found !!')
        {
            $('#txtMICRCode').val('');
            $('#txtNEFTCode').val('');
            $('#txtBankName').val('');
            $('#txtBranchName').val('');
            $('#txtBankAccountNo').val('');
            $('#txtConfirmBankAccountNo').val('');
            $(this).val("");
            return false;
        } else
        {
            $('#txtSearchBank').val('');
            $('#txtMICRCode').val(ui.item.micrcode);
            $('#txtNEFTCode').val(ui.item.neftcode);
            $('#txtBankName').val(ui.item.bankname);
            $('#txtBranchName').val(ui.item.bankbranch);
            $('#txtBankAccountNo').val('');
            $('#txtConfirmBankAccountNo').val('');
            $(this).val(""); 
            $('#DV_OR_ADD_NEW').show();
            
        }
    },
    focus: function (event, ui)
    {
        event.preventDefault();
    }
});



