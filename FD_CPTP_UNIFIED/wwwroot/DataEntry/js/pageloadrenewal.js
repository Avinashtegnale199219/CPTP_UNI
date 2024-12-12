var issumo = false;

$(document).ready(function ()
{
    try
    {
        //$(document).on("keydown", disableF5);

        ExtendedAjaxCall('CMS/GET_EXC_CMS_MAPPING_FLAG', null, 'GET', function (result)
        {
            if (!$.isEmptyObject(result) && result[0].status == 1)
            {
                $('#lnkCMSBranchSearch').show();

            } else if (!$.isEmptyObject(result) && result[0].status == 0)
            {
                $('#lnkCMSBranchSearch').hide();

            } else
            {
                BtpMessagePopup('Something went weong.', 'error');
            }
        }, null, null, false, false, ErrorFunction);


        ExtendedAjaxCall('HolderDetails/GetBusinessBrockerCode', null, 'GET', function (result)
        {

            try
            {
                if (!$.isEmptyObject(result))
                {
                    $('#lblBrokerCode').text(result);
                }

                $('#preloader').hide();
            } catch (e)
            {
                fnException(e);
            }
        }, null, true, false, false, ErrorFunction);

        //depositor status
        BindDDLExtendedAjaxCall('#ddlDepositorsStatus', 'FDConfiguration/Get_Depositor_StatusAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        //Search By
        BindDDLExtendedAjaxCall('#ddlInvSearchBy,select[name="SEARCH_BY"]', 'AdditionalPurchase/Get_Folio_Search_Type_MstAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        //branch
        BindDDLExtendedAjaxCall('#ddlBranch', 'HolderDetails/GetBranch', null, 'GET', null, null, true, false, false, ErrorFunction);

        //title
        BindDDLExtendedAjaxCall('select[name="TITLE"]', 'HolderDetails/Get_Salutation_MstAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        //payment mode
        BindDDLExtendedAjaxCall('#ddlInvPayment_Mode', 'FDConfiguration/GetPaymentOptionAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('#ddlDepositPayable', 'DataEntry/Get_DepositPayableAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('#ddlFdrDispatchMode', 'FDConfiguration/Get_FDR_Dispatch_ModeAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('#ddlHNG', 'DataEntry/Get_HNGAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('select[name="GENDER"]', 'DataEntry/Get_Gender_StatusAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('select[name="COUNTRY"]', 'FATCA/Get_ddl_FATCA_CountryAsync', null, 'GET', null, null, true, false, false, ErrorFunction);
        $('select[name="COUNTRY"]').val('IN').change();

        BindDDLExtendedAjaxCall('select[name="MARITAL_STATUS"]', 'DataEntry/Get_Marital_StatusAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('select[name="OCCUPATION"]', 'FATCA/Get_ddl_FATCA_OccupationAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('#ddlNomRelation', 'DataEntry/Get_Investor_Nominee_RelationAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('#ddlHolderType,#ddlDocHolderType', 'DocumentUpload/Get_HolderTypeAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('select[name="NATIONALITY"]', 'FATCA/Get_ddl_FATCA_NationalityAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('#ddlOCountry,select[name="COUNTRY_OF_TAX"]', 'FATCA/Get_ddl_FATCA_CountryOfTaxAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('select[name="TAX_IDENTIFICATION_TYPE"]', 'FATCA/Get_ddl_FATCA_TaxIdentificationTypeAsync', null, 'GET', null, null, true, false, false, ErrorFunction);


        BindDDLExtendedAjaxCall('select[name="ADDRESS_TYPE"]', 'FATCA/Get_ddl_FATCA_AddressTypeAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        BindDDLExtendedAjaxCall('select[name="ANNUAL_INCOME"]', 'DataEntry/Get_Annual_IncomeAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        //BindDDLExtendedAjaxCall('#ddlFilterDocType', 'DocumentUpload_v2/Get_FilterDocTypeAsync', null, 'GET', null, null, true, false, false, ErrorFunction);

        ExtendedAjaxCall('FATCA/Get_ddl_FATCA_CountryAsync', null, 'GET', function (result)
        {
            $('#preloader').hide();

            if (issumo == false)
            {
                var $DD = $('select[name="CITIZENSHIP"]');
                $DD.empty();//.append('<option value="select">Select</option>');

                //BindDropdown1('ddlCitizenShip_CitizenShip', result.data);
                if (result != null && result != undefined && result.length > 0)
                {
                    var html = '';
                    for (var i = 0; i < result.length; i++)
                    {
                        html += '<option value="' + result[i].Code + '">' + result[i].Desc + '</option>';
                    }
                    $DD.append(html);
                }


                $DD.SumoSelect({ search: true, selectAll: true, csvDispCount: 5 });
                issumo = true
            }
        }, null, true, false, false, ErrorFunction);
        ////ddlCitizenShip_CitizenShip multi select

        var data = {
            "SCHEME": null,
            "PERIOD": null,
            "INTEREST_FREQ": null,
            "CATEGORY": null,
            "Mode_Status": 'R'
        };
        BindDDLExtendedAjaxCall('#ddlCategory', 'FDConfiguration/Get_CategoryAsync', data, 'POST', null, null, true, false, false, ErrorFunction);

        ////$('#show_pan_details_residence').val('YES').change();

        //avinash added Occupation / sub - occupation changes
        BindDDLExtendedAjaxCall('#ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);

        Reset();
    } catch (e)
    {
        fnException(e);
    }
});

function Reset()
{
    try
    {      

        BTP_OBJECT = new BTP();
        $('#lblApplicationType,#lblApplicationNumber,#lblDepositorCategory,#lblInvestorName,#lblDOB,#lblPAN,#lblModeOfPayment,#lblAmount,#lblMobileNumber,#lblEmailID,#lblFolioNumber,#lblExistingFDRNumber,#lblLastInvestmentDate').text();
        $('#hdnApplicationNumber').val('');
        $('select').val('select').change();
        $('input[type="text"]').val('');
        $('input[type="hidden"]').val('');
        $('input[type="radio"]').prop('checked', false);

        BTP_OBJECT.mode = 'R';
        $('#chkSHApplicable').prop('checked', false).change();
        BTP_OBJECT.mode = 'R';
        $('#chkTHApplicable').prop('checked', false).change();
        BTP_OBJECT.mode = 'R';
        $('#chkNomApplicable').prop('checked', false).change();
        $('#chkTDFFlag').prop('checked', false).change();


        BTP_OBJECT.mode = 'R';
        $('#chkFHEdit').prop('checked', false).change();
        BTP_OBJECT.mode = 'R';
        $('#chkSHEdit').prop('checked', false).change();
        BTP_OBJECT.mode = 'R';
        $('#chkTHEdit').prop('checked', false).change();
        BTP_OBJECT.mode = 'R';
        $('#chkNomAddrSameAsFH').prop('checked', false).change();

        $('#btnfreshcutomer').hide();
        $('#addfreshInv').hide();

        Reset_step1();
        Reset_step2();
        Reset_step3();
        Reset_step4();
        //Reset_step5();
        Reset_step6();
        Reset_step7();
        //Reset_step8();

        //Employee categoy not applicable for CPTP
        $('#ddlCategory option[value="EMPLOYEE"]').hide();

        //fdrr dispatch mode option hide
        $('#ddlFdrDispatchMode option[value="D001"]').hide();
        $('#ddlFdrDispatchMode option[value="D002"]').hide();
        $('#ddlFdrDispatchMode option[value="D003"]').hide();
        $('#ddlFdrDispatchMode option[value="REGIS"]').hide();
        $('#ddlFdrDispatchMode option[value="RB"]').hide();

        $('#ddlHolderType').val('01').change();
        //default ONLINE mode
        $('#rdoDigital').prop('checked', true);

        //disable depositor category
        //$('#ddlDepositorsStatus').val('IND').prop('disabled', true).addClass('DisabledControl').change();
        $('#ddlDepositorsStatus option[value="HUF"]').hide();
        $('#ddlDepositorsStatus option[value="TRS"]').hide();
        $('#ddlDepositorsStatus option[value="COM"]').hide();
        $('#ddlDepositorsStatus option[value="PTF"]').hide();
        $('#ddlDepositorsStatus option[value="ASSN"]').hide();

        $('#ddlHolderType option[value="select"]').hide();

        $('.CustmTblTd2lbl, .CustmTblTd3lbl').text('');
        $('#tblInvestmentDtls tbody').html('');


        if (PaymentMode == '1')
        {
            $('#ddlInvPayment_Mode option[value="3"]').hide();
            $('#ddlInvPayment_Mode option[value="4"]').hide();
            $('#ddlInvPayment_Mode option[value="Cheque/DD"]').hide();
            $('#ddlInvPayment_Mode option[value="Cheque"]').hide();
            $('#ddlInvPayment_Mode option[value="Demand Draft"]').hide();
        }
        else if (PaymentMode == '2')
        {
            $('#ddlInvPayment_Mode option[value="1"]').hide()
            $('#ddlInvPayment_Mode option[value="2"]').hide()
            $('#ddlInvPayment_Mode option[value="RTGS/NEFT"]').hide();
            $('#ddlInvPayment_Mode option[value="RTGS / NEFT"]').hide();
            $('#ddlInvPayment_Mode option[value="Online"]').hide();
            $('#ddlInvPayment_Mode').val('Cheque');
        }

        //disable step7
        //$('#IdBtnTabSwit07').prop('disabled', true).addClass('DisabledControl');
        //set India as default country
        $('select[name="COUNTRY"]').val('IN').change();
        BTP_OBJECT.mode = 'A';


    } catch (e)
    {
        fnException(e);
    }
}

$('#ddlBranch').change(function ()
{
    if ($(this).val() == 'select')
    {
        $('#ddlCMSBranch').empty().append('<option value="select">Select</option>');
        return;
    }

    BindDDLExtendedAjaxCall('#ddlCMSBranch', 'CMS/GetCMSBankDetail/' + this.value, null, 'GET', null, null, true, false, false, ErrorFunction);
});

$('#DV_FH_FATCA #ddlCountryOfTax').change(function ()
{
    try
    {

        if ($(this).val() == 'select')
        {
            $('#DV_FH_FATCA #ddlFatcaState').empty().append('<option value="select">Select</option>').change();
            return;
        }

        BindDDLExtendedAjaxCall('#DV_FH_FATCA #ddlFatcaState', 'FATCA/Get_ddl_FATCA_StateAsync?countrycode=' + $(this).val(), null, 'GET', null, null, true, false, false, ErrorFunction);
    } catch (e)
    {
        throw fnException(e);
    }
});

$('#DV_SH_FATCA #ddlCountryOfTax').change(function ()
{
    try
    {

        if ($(this).val() == 'select')
        {
            $('#DV_SH_FATCA #ddlFatcaState').empty().append('<option value="select">Select</option>').change();
            return;
        }

        BindDDLExtendedAjaxCall('#DV_SH_FATCA #ddlFatcaState', 'FATCA/Get_ddl_FATCA_StateAsync?countrycode=' + $(this).val(), null, 'GET', null, null, true, false, false, ErrorFunction);
    } catch (e)
    {
        throw fnException(e);
    }
});

$('#DV_TH_FATCA #ddlCountryOfTax').change(function ()
{
    try
    {

        if ($(this).val() == 'select')
        {
            $('#DV_TH_FATCA #ddlFatcaState').empty().append('<option value="select">Select</option>').change();
            return;
        }

        BindDDLExtendedAjaxCall('#DV_TH_FATCA #ddlFatcaState', 'FATCA/Get_ddl_FATCA_StateAsync?countrycode=' + $(this).val(), null, 'GET', null, null, true, false, false, ErrorFunction);
    } catch (e)
    {
        throw fnException(e);
    }
});