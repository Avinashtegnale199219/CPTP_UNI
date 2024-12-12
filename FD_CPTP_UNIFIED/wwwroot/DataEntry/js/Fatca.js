var FH_CNT = 1;
var FH_Action = 'ADD';
var SH_CNT = 1;
var SH_Action = 'ADD';
var TH_CNT = 1;
var TH_Action = 'ADD';

$('input[name="TRC_EXP_DATE"]').datetextentry({
    min_date: function () { return this.get_today(); },
    min_date_message: 'Date cannot be past date'
});

//FH-------------------------------------------------------------------------
$('#DV_FH_FATCA #btnBind').on('click', function (result)
{
    try
    {

        $('#preloader').show();
        if (iSFHFATCAValidate())
        {

            if ($('#DV_FH_FATCA #tblDetailList tbody tr').hasClass('empty_table'))
            {
                $('#DV_FH_FATCA #tblDetailList tbody').empty();
            }

            var $trs = $('#DV_FH_FATCA #tblDetailList').children("tr");
            var ddlCountryOfTax = $('#DV_FH_FATCA #ddlCountryOfTax').val();
            var ddlCountryOfTaxDesc = $('#DV_FH_FATCA #ddlCountryOfTax :selected').text();
            var ddlTaxIndentityType = $('#DV_FH_FATCA #ddlTaxIndentityType').val();
            var ddlTaxIndentityTypeDesc = $('#DV_FH_FATCA #ddlTaxIndentityType :selected').text();
            var txttaxIdentityNo = $('#DV_FH_FATCA #txttaxIdentityNo').val();
            var txtexpTRCDate = $('#DV_FH_FATCA #txtexpTRCDate').val();
            var ddlAddressType = $('#DV_FH_FATCA #ddlAddressType').val();
            var ddlAddressTypeDesc = $('#DV_FH_FATCA #ddlAddressType :selected').text();
            var txtFatcaAdd1 = $('#DV_FH_FATCA #txtFatcaAdd1').val();
            var txtFatcaAdd2 = $('#DV_FH_FATCA #txtFatcaAdd2').val();
            var txtFatcaLandmark = $('#DV_FH_FATCA #txtFatcaLandmark').val();
            var ddlFatcaState = $('#DV_FH_FATCA #ddlFatcaState').val();
            var ddlFatcaStateDesc = $('#DV_FH_FATCA #ddlFatcaState :selected').text();
            var txtFatcaCity = $('#DV_FH_FATCA #txtFatcaCity').val();
            var txtFatcaPostalcode = $('#DV_FH_FATCA #txtFatcaPostalcode').val();
            var txtSTDCodePrimary = $('#DV_FH_FATCA #txtSTDCodePrimary').val();
            var txtTelephoneNumberPrimary = $('#DV_FH_FATCA #txtTelephoneNumberPrimary').val();
            var txtMobileNumberPrimary = $('#DV_FH_FATCA #txtMobileNumberPrimary').val();
            var txtSTDCodeOther = $('#DV_FH_FATCA #txtSTDCodeOther').val();
            var txtTelephoneNumberOther = $('#DV_FH_FATCA #txtTelephoneNumberOther').val();
            var txtMobileNumberOther = $('#DV_FH_FATCA #txtMobileNumberOther').val();

            if (FH_Action == 'ADD')
            {
                var htmlstr = ''
                htmlstr += '<tr class="Key" id="' + FH_CNT + '">';

                htmlstr += '<td class="text-center"><button type="button" id="FH_btnedit' + FH_CNT + '" class="btn btn-orange btn-small btnTblEdit" onclick="FH_tbledit(this,' + FH_CNT + ')">Edit</button></td>';
                htmlstr += "<td class='text-center'><button type='button'  class='btn btn-orange btn-small btnTblDelete' onclick='FH_Delete(this)'>Delete</button></td>";
                htmlstr += '<td id="country' + FH_CNT + '" code="' + ddlCountryOfTax + '">' + ddlCountryOfTaxDesc + '</td>';
                htmlstr += '<td id="taxIdentity' + FH_CNT + '"  code="' + ddlTaxIndentityType + '">' + ddlTaxIndentityTypeDesc + '</td>';
                htmlstr += '<td id="tax' + FH_CNT + '">' + txttaxIdentityNo + '</td>';
                htmlstr += '<td id="trcDate' + FH_CNT + '">' + txtexpTRCDate + '</td>';
                htmlstr += '<td id="addressType' + FH_CNT + '" code="' + ddlAddressType + '" >' + ddlAddressTypeDesc + '</td>';
                htmlstr += '<td id="address1' + FH_CNT + '">' + txtFatcaAdd1 + '</td>';
                htmlstr += '<td id="address2' + FH_CNT + '">' + txtFatcaAdd2 + '</td>';
                htmlstr += '<td id="Landmark' + FH_CNT + '">' + txtFatcaLandmark + '</td>';
                htmlstr += '<td id="state' + FH_CNT + '" code="' + ddlFatcaState + '">' + ddlFatcaStateDesc + '</td>';
                htmlstr += '<td id="city' + FH_CNT + '">' + txtFatcaCity + '</td>';
                htmlstr += '<td id="postalcode' + FH_CNT + '">' + txtFatcaPostalcode + '</td>';
                htmlstr += '<td id="stdCodePrimary' + FH_CNT + '">' + txtSTDCodePrimary + '</td>';
                htmlstr += '<td id="telNumberpriamry' + FH_CNT + '">' + txtTelephoneNumberPrimary + '</td>';
                htmlstr += '<td id="MobNumberprimary' + FH_CNT + '">' + txtMobileNumberPrimary + '</td>';
                htmlstr += '<td id="stdCodeother' + FH_CNT + '">' + txtSTDCodeOther + '</td>';
                htmlstr += '<td id="telNumberother' + FH_CNT + '">' + txtTelephoneNumberOther + '</td>';
                htmlstr += '<td id="mobNumberother' + FH_CNT + '">' + txtMobileNumberOther + '</td>';
                htmlstr += '</tr>';
                $('#DV_FH_FATCA #tblDetailList>tbody').append(htmlstr);

                FH_CNT += 1;

            }
            else if (FH_Action == 'Update')
            {

                var value = $('#DV_FH_FATCA #currentRow').text();

                $('#DV_FH_FATCA #country' + value).text(ddlCountryOfTaxDesc);
                $('#DV_FH_FATCA #country' + value).attr('code', ddlCountryOfTax);
                $('#DV_FH_FATCA #taxIdentity' + value).text(ddlTaxIndentityTypeDesc);
                $('#DV_FH_FATCA #taxIdentity' + value).attr('code', ddlTaxIndentityType);
                $('#DV_FH_FATCA #tax' + value).text(txttaxIdentityNo);
                $('#DV_FH_FATCA #trcDate' + value).text(txtexpTRCDate);
                $('#DV_FH_FATCA #address1' + value).text(txtFatcaAdd1);
                $('#DV_FH_FATCA #address2' + value).text(txtFatcaAdd2);
                $('#DV_FH_FATCA #Landmark' + value).text(txtFatcaLandmark);
                $('#DV_FH_FATCA #state' + value).text(ddlFatcaStateDesc);
                $('#DV_FH_FATCA #state' + value).attr('code', ddlFatcaState);
                $('#DV_FH_FATCA #addressType' + value).text(ddlAddressTypeDesc);
                $('#DV_FH_FATCA #addressType' + value).attr('code', ddlAddressType);
                $('#DV_FH_FATCA #city' + value).text(txtFatcaCity);
                $('#DV_FH_FATCA #postalcode' + value).text(txtFatcaPostalcode);
                $('#DV_FH_FATCA #stdCodePrimary' + value).text(txtSTDCodePrimary);
                $('#DV_FH_FATCA #telNumberpriamry' + value).text(txtTelephoneNumberPrimary);
                $('#DV_FH_FATCA #MobNumberprimary' + value).text(txtMobileNumberPrimary);
                $('#DV_FH_FATCA #stdCodeother' + value).text(txtSTDCodeOther);
                $('#DV_FH_FATCA #telNumberother' + value).text(txtTelephoneNumberOther);
                $('#DV_FH_FATCA #mobNumberother' + value).text(txtMobileNumberOther);
         
            }
            FH_clear();
            FH_Action = 'ADD';
        }
        $('#preloader').hide();


    } catch (e)
    {
        fnException(e);
    }
});

function FH_tbledit(btn, cnt)
{
    try
    {
        $('#preloader').show();
        FH_Action = 'Update';

        $('#DV_FH_FATCA #currentRow').text(cnt)
        $('#DV_FH_FATCA #ddlCountryOfTax').val($('#DV_FH_FATCA #country' + cnt).attr('code'));
        $('#DV_FH_FATCA #ddlCountryOfTax').change();
        $('#DV_FH_FATCA #ddlTaxIndentityType').val($('#DV_FH_FATCA #taxIdentity' + cnt).attr('code'));
        $('#DV_FH_FATCA #txttaxIdentityNo').val($('#DV_FH_FATCA #tax' + cnt).html());
        $('#DV_FH_FATCA #txtexpTRCDate').datetextentry('set_date', $('#DV_FH_FATCA #trcDate' + cnt).html());
        $('#DV_FH_FATCA #ddlAddressType').val($('#DV_FH_FATCA #addressType' + cnt).attr('code'));
        $('#DV_FH_FATCA #txtFatcaAdd1').val($('#DV_FH_FATCA #address1' + cnt).html());
        $('#DV_FH_FATCA #txtFatcaAdd2').val($('#DV_FH_FATCA #address2' + cnt).html());
        $('#DV_FH_FATCA #txtFatcaLandmark').val($('#DV_FH_FATCA #Landmark' + cnt).html());
        $('#DV_FH_FATCA #ddlFatcaState').val($('#DV_FH_FATCA #state' + cnt).attr('code'));
        $('#DV_FH_FATCA #txtFatcaCity').val($('#DV_FH_FATCA #city' + cnt).html());
        $('#DV_FH_FATCA #txtFatcaPostalcode').val($('#DV_FH_FATCA #postalcode' + cnt).html());
        $('#DV_FH_FATCA #txtSTDCodePrimary').val($('#DV_FH_FATCA #stdCodePrimary' + cnt).html());
        $('#DV_FH_FATCA #txtTelephoneNumberPrimary').val($('#DV_FH_FATCA #telNumberpriamry' + cnt).html());
        $('#DV_FH_FATCA #txtMobileNumberPrimary').val($('#DV_FH_FATCA #MobNumberprimary' + cnt).html());
        $('#DV_FH_FATCA #txtSTDCodeOther').val($('#DV_FH_FATCA #stdCodeother' + cnt).html());
        $('#DV_FH_FATCA #txtTelephoneNumberOther').val($('#DV_FH_FATCA #telNumberother' + cnt).html());
        $('#DV_FH_FATCA #txtMobileNumberOther').val($('#DV_FH_FATCA #mobNumberother' + cnt).html());
        //$('#ddlCountry option:selected').text($('#country' + cnt).text()));
        $("#DV_FH_FATCA #tblDetailList_default td").val($(btn).closest('tr')).length;
        $('#DV_FH_FATCA #txtSTDCodeOther').val($('#DV_FH_FATCA #stdCodeother' + cnt).html());
        $('#DV_FH_FATCA #currentRow').val($('#DV_FH_FATCA #Key' + cnt).html());

        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

function FH_Delete(btn)
{
    try
    {
        $('#preloader').show();

        $(btn).closest("tr").remove();

        if ($('#DV_FH_FATCA #tblDetailList tbody tr').length == 0)
        {
            $('#DV_FH_FATCA #tblDetailList tbody').html("<tr class='empty_table'><td colspan='19'>No Records Found..!</td></tr>");
        }
        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

function FH_clear()
{
    try
    {
        $('#preloader').show();

        $('#DV_FH_FATCA .fatca').removeClass('InputBorderRed');
        $('#DV_FH_FATCA .fatca').parent().removeClass('InputBorderRed');

        $('#DV_FH_FATCA #ddlCountryOfTax').val('select');
        $('#DV_FH_FATCA #ddlTaxIndentityType').val('select');
        $('#DV_FH_FATCA #txttaxIdentityNo').val('');
        $('#DV_FH_FATCA #ddlAddressType').val('select');
        $('#DV_FH_FATCA #ddlFatcaState').val('select');
        $('#DV_FH_FATCA #txtFatcaAdd1').val('');
        $('#DV_FH_FATCA #txtAddress1_DetailModel').val();
        $('#DV_FH_FATCA #txtFatcaAdd2').val('');
        $('#DV_FH_FATCA #txtFatcaLandmark').val('');
        $('#DV_FH_FATCA #txtFatcaCity').val('');
        $('#DV_FH_FATCA #txtFatcaPostalcode').val('');
        $('#DV_FH_FATCA #txtSTDCodePrimary').val('');
        $('#DV_FH_FATCA #txtTelephoneNumberPrimary').val('');
        $('#DV_FH_FATCA #txtMobileNumberPrimary').val('');
        $('#DV_FH_FATCA #txtSTDCodeOther').val('');
        $('#DV_FH_FATCA #txtTelephoneNumberOther').val('');
        $('#DV_FH_FATCA #txtMobileNumberOther').val('');
        $('#DV_FH_FATCA #txtexpTRCDate').datetextentry('set_date', '');

        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

// validation
function iSFHFATCAValidate()
{
    try
    {
        $('#preloader').show();

        $('#DV_FH_FATCA .fatca').removeClass('InputBorderRed');
        $('#DV_FH_FATCA .fatca').parent().removeClass('InputBorderRed');

        var isError = false;
        var errMessage = "";

        $('#DV_FH_FATCA .fatca').each(function ()
        {
            var $this = $(this);
            if ($this.val() == "" || $this.val() == '-1' || $this.val() == 'Select' || $this.val() == 'select' || $this.val() == undefined)
            {
                if ($this.attr('errmsg') != '' && $this.attr('errmsg') != undefined)
                {
                    errMessage += "<p>" + $this.attr('errmsg'); +"</p>";
                }

                if ($this.hasClass('D_T_E'))
                {
                    $this.parent().addClass('InputBorderRed');
                }
                else
                {
                    $this.addClass('InputBorderRed');
                }
                isError = true;
            }           
        });


        $('#DV_FH_FATCA .mobileF').each(function ()
        {
            var $this = $(this);
            if ($this.val() != "" && !IsValidMobile($this.val()))
            {
                errMessage += "<p>Mobile Number is Not Valid.</p>";
                $this.addClass('InputBorderRed');
                isError = true;
            }           
        });


        if (isError)
        {
            //$('#dvErrorMsg').html(errMessage);
            //$('#btnOpenModalError').click();
            BtpMessagePopup(errMessage, 'error');
            return false;
        }

        $('#preloader').hide();

        return true;

       
    } catch (e)
    {
        fnException(e)
    }
}

$("#DV_FH_FATCA #btnOpenDetailModel").click(function ()
{
    $("#DV_FH_FATCA #DV_FATCA_DETAILS").toggle();
});

$('#DV_FH_FATCA #btnFatacClear').click(function ()
{
    FH_clear();
});

//SH-------------------------------------------------------------------------------------
$('#DV_SH_FATCA #btnBind').on('click', function (result)
{
    try
    {

        $('#preloader').show();
        if (iSSHFATCAValidate())
        {

            if ($('#DV_SH_FATCA #tblDetailList tbody tr').hasClass('empty_table'))
            {
                $('#DV_SH_FATCA #tblDetailList tbody').empty();
            }

            var $trs = $('#DV_SH_FATCA #tblDetailList').children("tr");
            var ddlCountryOfTax = $('#DV_SH_FATCA #ddlCountryOfTax').val();
            var ddlCountryOfTaxDesc = $('#DV_SH_FATCA #ddlCountryOfTax :selected').text();
            var ddlTaxIndentityType = $('#DV_SH_FATCA #ddlTaxIndentityType').val();
            var ddlTaxIndentityTypeDesc = $('#DV_SH_FATCA #ddlTaxIndentityType :selected').text();
            var txttaxIdentityNo = $('#DV_SH_FATCA #txttaxIdentityNo').val();
            var txtexpTRCDate = $('#DV_SH_FATCA #txtexpTRCDate').val();
            var ddlAddressType = $('#DV_SH_FATCA #ddlAddressType').val();
            var ddlAddressTypeDesc = $('#DV_SH_FATCA #ddlAddressType :selected').text();
            var txtFatcaAdd1 = $('#DV_SH_FATCA #txtFatcaAdd1').val();
            var txtFatcaAdd2 = $('#DV_SH_FATCA #txtFatcaAdd2').val();
            var txtFatcaLandmark = $('#DV_SH_FATCA #txtFatcaLandmark').val();
            var ddlFatcaState = $('#DV_SH_FATCA #ddlFatcaState').val();
            var ddlFatcaStateDesc = $('#DV_SH_FATCA #ddlFatcaState :selected').text();
            var txtFatcaCity = $('#DV_SH_FATCA #txtFatcaCity').val();
            var txtFatcaPostalcode = $('#DV_SH_FATCA #txtFatcaPostalcode').val();
            var txtSTDCodePrimary = $('#DV_SH_FATCA #txtSTDCodePrimary').val();
            var txtTelephoneNumberPrimary = $('#DV_SH_FATCA #txtTelephoneNumberPrimary').val();
            var txtMobileNumberPrimary = $('#DV_SH_FATCA #txtMobileNumberPrimary').val();
            var txtSTDCodeOther = $('#DV_SH_FATCA #txtSTDCodeOther').val();
            var txtTelephoneNumberOther = $('#DV_SH_FATCA #txtTelephoneNumberOther').val();
            var txtMobileNumberOther = $('#DV_SH_FATCA #txtMobileNumberOther').val();

            if (SH_Action == 'ADD')
            {
                var htmlstr = ''
                htmlstr += '<tr class="Key" id="' + SH_CNT + '">';

                htmlstr += '<td class="text-center"><button type="button" id="SH_btnedit' + SH_CNT + '" class="btn btn-orange btn-small btnTblEdit" onclick="SH_tbledit(this,' + SH_CNT + ')">Edit</button></td>';
                htmlstr += "<td class='text-center'><button type='button'  class='btn btn-orange btn-small' onclick='SH_Delete(this)'>Delete</button></td>";
                htmlstr += '<td id="country' + SH_CNT + '" code="' + ddlCountryOfTax + '">' + ddlCountryOfTaxDesc + '</td>';
                htmlstr += '<td id="taxIdentity' + SH_CNT + '"  code="' + ddlTaxIndentityType + '">' + ddlTaxIndentityTypeDesc + '</td>';
                htmlstr += '<td id="tax' + SH_CNT + '">' + txttaxIdentityNo + '</td>';
                htmlstr += '<td id="trcDate' + SH_CNT + '">' + txtexpTRCDate + '</td>';
                htmlstr += '<td id="addressType' + SH_CNT + '" code="' + ddlAddressType + '" >' + ddlAddressTypeDesc + '</td>';
                htmlstr += '<td id="address1' + SH_CNT + '">' + txtFatcaAdd1 + '</td>';
                htmlstr += '<td id="address2' + SH_CNT + '">' + txtFatcaAdd2 + '</td>';
                htmlstr += '<td id="Landmark' + SH_CNT + '">' + txtFatcaLandmark + '</td>';
                htmlstr += '<td id="state' + SH_CNT + '" code="' + ddlFatcaState + '">' + ddlFatcaStateDesc + '</td>';
                htmlstr += '<td id="city' + SH_CNT + '">' + txtFatcaCity + '</td>';
                htmlstr += '<td id="postalcode' + SH_CNT + '">' + txtFatcaPostalcode + '</td>';
                htmlstr += '<td id="stdCodePrimary' + SH_CNT + '">' + txtSTDCodePrimary + '</td>';
                htmlstr += '<td id="telNumberpriamry' + SH_CNT + '">' + txtTelephoneNumberPrimary + '</td>';
                htmlstr += '<td id="MobNumberprimary' + SH_CNT + '">' + txtMobileNumberPrimary + '</td>';
                htmlstr += '<td id="stdCodeother' + SH_CNT + '">' + txtSTDCodeOther + '</td>';
                htmlstr += '<td id="telNumberother' + SH_CNT + '">' + txtTelephoneNumberOther + '</td>';
                htmlstr += '<td id="mobNumberother' + SH_CNT + '">' + txtMobileNumberOther + '</td>';
                htmlstr += '</tr>';
                $('#DV_SH_FATCA #tblDetailList>tbody').append(htmlstr);

                SH_CNT += 1;

            }
            else if (SH_Action == 'Update')
            {

                var value = $('#DV_SH_FATCA #currentRow').text();

                $('#DV_SH_FATCA #country' + value).text(ddlCountryOfTaxDesc);
                $('#DV_SH_FATCA #country' + value).attr('code', ddlCountryOfTax);
                $('#DV_SH_FATCA #taxIdentity' + value).text(ddlTaxIndentityTypeDesc);
                $('#DV_SH_FATCA #taxIdentity' + value).attr('code', ddlTaxIndentityType);
                $('#DV_SH_FATCA #tax' + value).text(txttaxIdentityNo);
                $('#DV_SH_FATCA #trcDate' + value).text(txtexpTRCDate);
                $('#DV_SH_FATCA #address1' + value).text(txtFatcaAdd1);
                $('#DV_SH_FATCA #address2' + value).text(txtFatcaAdd2);
                $('#DV_SH_FATCA #Landmark' + value).text(txtFatcaLandmark);
                $('#DV_SH_FATCA #state' + value).text(ddlFatcaStateDesc);
                $('#DV_SH_FATCA #state' + value).attr('code', ddlFatcaState);
                $('#DV_SH_FATCA #addressType' + value).text(ddlAddressTypeDesc);
                $('#DV_SH_FATCA #addressType' + value).attr('code', ddlAddressType);
                $('#DV_SH_FATCA #city' + value).text(txtFatcaCity);
                $('#DV_SH_FATCA #postalcode' + value).text(txtFatcaPostalcode);
                $('#DV_SH_FATCA #stdCodePrimary' + value).text(txtSTDCodePrimary);
                $('#DV_SH_FATCA #telNumberpriamry' + value).text(txtTelephoneNumberPrimary);
                $('#DV_SH_FATCA #MobNumberprimary' + value).text(txtMobileNumberPrimary);
                $('#DV_SH_FATCA #stdCodeother' + value).text(txtSTDCodeOther);
                $('#DV_SH_FATCA #telNumberother' + value).text(txtTelephoneNumberOther);
                $('#DV_SH_FATCA #mobNumberother' + value).text(txtMobileNumberOther);
                
            }
            SH_clear();
            SH_Action = 'ADD';
        }
        $('#preloader').hide();


    } catch (e)
    {
        fnException(e);
    }
});

function SH_tbledit(btn, cnt)
{
    try
    {
        $('#preloader').show();
        SH_Action = 'Update';

        $('#DV_SH_FATCA #currentRow').text(cnt)
        $('#DV_SH_FATCA #ddlCountryOfTax').val($('#DV_SH_FATCA #country' + cnt).attr('code'));
        $('#DV_SH_FATCA #ddlCountryOfTax').change();
        $('#DV_SH_FATCA #ddlTaxIndentityType').val($('#DV_SH_FATCA #taxIdentity' + cnt).attr('code'));
        $('#DV_SH_FATCA #txttaxIdentityNo').val($('#DV_SH_FATCA #tax' + cnt).html());
        $('#DV_SH_FATCA #txtexpTRCDate').datetextentry('set_date', $('#DV_SH_FATCA #trcDate' + cnt).html());
        $('#DV_SH_FATCA #ddlAddressType').val($('#DV_SH_FATCA #addressType' + cnt).attr('code'));
        $('#DV_SH_FATCA #txtFatcaAdd1').val($('#DV_SH_FATCA #address1' + cnt).html());
        $('#DV_SH_FATCA #txtFatcaAdd2').val($('#DV_SH_FATCA #address2' + cnt).html());
        $('#DV_SH_FATCA #txtFatcaLandmark').val($('#DV_SH_FATCA #Landmark' + cnt).html());
        $('#DV_SH_FATCA #ddlFatcaState').val($('#DV_SH_FATCA #state' + cnt).attr('code'));
        $('#DV_SH_FATCA #txtFatcaCity').val($('#DV_SH_FATCA #city' + cnt).html());
        $('#DV_SH_FATCA #txtFatcaPostalcode').val($('#DV_SH_FATCA #postalcode' + cnt).html());
        $('#DV_SH_FATCA #txtSTDCodePrimary').val($('#DV_SH_FATCA #stdCodePrimary' + cnt).html());
        $('#DV_SH_FATCA #txtTelephoneNumberPrimary').val($('#DV_SH_FATCA #telNumberpriamry' + cnt).html());
        $('#DV_SH_FATCA #txtMobileNumberPrimary').val($('#DV_SH_FATCA #MobNumberprimary' + cnt).html());
        $('#DV_SH_FATCA #txtSTDCodeOther').val($('#DV_SH_FATCA #stdCodeother' + cnt).html());
        $('#DV_SH_FATCA #txtTelephoneNumberOther').val($('#DV_SH_FATCA #telNumberother' + cnt).html());
        $('#DV_SH_FATCA #txtMobileNumberOther').val($('#DV_SH_FATCA #mobNumberother' + cnt).html());
        //$('#ddlCountry option:selected').text($('#country' + cnt).text()));
        $("#DV_SH_FATCA #tblDetailList_default td").val($(btn).closest('tr')).length;
        $('#DV_SH_FATCA #txtSTDCodeOther').val($('#DV_SH_FATCA #stdCodeother' + cnt).html());
        $('#DV_SH_FATCA #currentRow').val($('#DV_SH_FATCA #Key' + cnt).html());

        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

function SH_Delete(btn)
{
    try
    {
        $('#preloader').show();

        $(btn).closest("tr").remove();

        if ($('#DV_SH_FATCA #tblDetailList tbody tr').length == 0)
        {
            $('#DV_SH_FATCA #tblDetailList tbody').html("<tr class='empty_table'><td colspan='19'>No Records Found..!</td></tr>");
        }
        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

function SH_clear()
{
    try
    {
        $('#preloader').show();

        $('#DV_SH_FATCA .fatca').removeClass('InputBorderRed');
        $('#DV_SH_FATCA .fatca').parent().removeClass('InputBorderRed');

        $('#DV_SH_FATCA #ddlCountryOfTax').val('select');
        $('#DV_SH_FATCA #ddlTaxIndentityType').val('select');
        $('#DV_SH_FATCA #txttaxIdentityNo').val('');
        $('#DV_SH_FATCA #ddlAddressType').val('select');
        $('#DV_SH_FATCA #ddlFatcaState').val('select');
        $('#DV_SH_FATCA #txtFatcaAdd1').val('');
        $('#DV_SH_FATCA #txtAddress1_DetailModel').val();
        $('#DV_SH_FATCA #txtFatcaAdd2').val('');
        $('#DV_SH_FATCA #txtFatcaLandmark').val('');
        $('#DV_SH_FATCA #txtFatcaCity').val('');
        $('#DV_SH_FATCA #txtFatcaPostalcode').val('');
        $('#DV_SH_FATCA #txtSTDCodePrimary').val('');
        $('#DV_SH_FATCA #txtTelephoneNumberPrimary').val('');
        $('#DV_SH_FATCA #txtMobileNumberPrimary').val('');
        $('#DV_SH_FATCA #txtSTDCodeOther').val('');
        $('#DV_SH_FATCA #txtTelephoneNumberOther').val('');
        $('#DV_SH_FATCA #txtMobileNumberOther').val('');
        $('#DV_SH_FATCA #txtexpTRCDate').datetextentry('set_date', '');

        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

// validation
function iSSHFATCAValidate()
{
    try
    {
        $('#preloader').show();

        $('#DV_SH_FATCA .fatca').removeClass('InputBorderRed');
        $('#DV_SH_FATCA .fatca').parent().removeClass('InputBorderRed');

        var isError = false;
        var errMessage = "";

        $('#DV_SH_FATCA .fatca').each(function ()
        {
            var $this = $(this);
            if ($this.val() == "" || $this.val() == '-1' || $this.val() == 'Select' || $this.val() == 'select' || $this.val() == undefined)
            {
                if ($this.attr('errmsg') != '' && $this.attr('errmsg') != undefined)
                {
                    errMessage += "<p>" + $this.attr('errmsg'); +"</p>";
                }

                if ($this.hasClass('D_T_E'))
                {
                    $this.parent().addClass('InputBorderRed');
                }
                else
                {
                    $this.addClass('InputBorderRed');
                }
                isError = true;
            }
        });


        $('#DV_SH_FATCA .mobileF').each(function ()
        {
            var $this = $(this);
            if ($this.val() != "" && !IsValidMobile($this.val()))
            {
                errMessage += "<p>Mobile Number is Not Valid.</p>";
                $this.addClass('InputBorderRed');
                isError = true;
            }
        });


        if (isError)
        {
            //$('#dvErrorMsg').html(errMessage);
            //$('#btnOpenModalError').click();
            BtpMessagePopup(errMessage, 'error');
            return false;
        }

        $('#preloader').hide();

        return true;


    } catch (e)
    {
        fnException(e)
    }
}

$("#DV_SH_FATCA #btnOpenDetailModel").click(function ()
{
    $("#DV_SH_FATCA #DV_FATCA_DETAILS").toggle();
});

$('#DV_SH_FATCA #btnFatacClear').click(function ()
{
    SH_clear();
});


//TH------------------------------------------------------------------------------------
$('#DV_TH_FATCA #btnBind').on('click', function (result)
{
    try
    {

        $('#preloader').show();
        if (iSTHFATCAValidate())
        {

            if ($('#DV_TH_FATCA #tblDetailList tbody tr').hasClass('empty_table'))
            {
                $('#DV_TH_FATCA #tblDetailList tbody').empty();
            }

            var $trs = $('#DV_TH_FATCA #tblDetailList').children("tr");
            var ddlCountryOfTax = $('#DV_TH_FATCA #ddlCountryOfTax').val();
            var ddlCountryOfTaxDesc = $('#DV_TH_FATCA #ddlCountryOfTax :selected').text();
            var ddlTaxIndentityType = $('#DV_TH_FATCA #ddlTaxIndentityType').val();
            var ddlTaxIndentityTypeDesc = $('#DV_TH_FATCA #ddlTaxIndentityType :selected').text();
            var txttaxIdentityNo = $('#DV_TH_FATCA #txttaxIdentityNo').val();
            var txtexpTRCDate = $('#DV_TH_FATCA #txtexpTRCDate').val();
            var ddlAddressType = $('#DV_TH_FATCA #ddlAddressType').val();
            var ddlAddressTypeDesc = $('#DV_TH_FATCA #ddlAddressType :selected').text();
            var txtFatcaAdd1 = $('#DV_TH_FATCA #txtFatcaAdd1').val();
            var txtFatcaAdd2 = $('#DV_TH_FATCA #txtFatcaAdd2').val();
            var txtFatcaLandmark = $('#DV_TH_FATCA #txtFatcaLandmark').val();
            var ddlFatcaState = $('#DV_TH_FATCA #ddlFatcaState').val();
            var ddlFatcaStateDesc = $('#DV_TH_FATCA #ddlFatcaState :selected').text();
            var txtFatcaCity = $('#DV_TH_FATCA #txtFatcaCity').val();
            var txtFatcaPostalcode = $('#DV_TH_FATCA #txtFatcaPostalcode').val();
            var txtSTDCodePrimary = $('#DV_TH_FATCA #txtSTDCodePrimary').val();
            var txtTelephoneNumberPrimary = $('#DV_TH_FATCA #txtTelephoneNumberPrimary').val();
            var txtMobileNumberPrimary = $('#DV_TH_FATCA #txtMobileNumberPrimary').val();
            var txtSTDCodeOther = $('#DV_TH_FATCA #txtSTDCodeOther').val();
            var txtTelephoneNumberOther = $('#DV_TH_FATCA #txtTelephoneNumberOther').val();
            var txtMobileNumberOther = $('#DV_TH_FATCA #txtMobileNumberOther').val();

            if (TH_Action == 'ADD')
            {
                var htmlstr = ''
                htmlstr += '<tr class="Key" id="' + TH_CNT + '">';

                htmlstr += '<td class="text-center"><button type="button" id="TH_btnedit' + TH_CNT + '" class="btn btn-orange btn-small btnTblEdit" onclick="TH_tbledit(this,' + TH_CNT + ')">Edit</button></td>';
                htmlstr += "<td class='text-center'><button type='button'  class='btn btn-orange btn-small' onclick='TH_Delete(this)'>Delete</button></td>";
                htmlstr += '<td id="country' + TH_CNT + '" code="' + ddlCountryOfTax + '">' + ddlCountryOfTaxDesc + '</td>';
                htmlstr += '<td id="taxIdentity' + TH_CNT + '"  code="' + ddlTaxIndentityType + '">' + ddlTaxIndentityTypeDesc + '</td>';
                htmlstr += '<td id="tax' + TH_CNT + '">' + txttaxIdentityNo + '</td>';
                htmlstr += '<td id="trcDate' + TH_CNT + '">' + txtexpTRCDate + '</td>';
                htmlstr += '<td id="addressType' + TH_CNT + '" code="' + ddlAddressType + '" >' + ddlAddressTypeDesc + '</td>';
                htmlstr += '<td id="address1' + TH_CNT + '">' + txtFatcaAdd1 + '</td>';
                htmlstr += '<td id="address2' + TH_CNT + '">' + txtFatcaAdd2 + '</td>';
                htmlstr += '<td id="Landmark' + TH_CNT + '">' + txtFatcaLandmark + '</td>';
                htmlstr += '<td id="state' + TH_CNT + '" code="' + ddlFatcaState + '">' + ddlFatcaStateDesc + '</td>';
                htmlstr += '<td id="city' + TH_CNT + '">' + txtFatcaCity + '</td>';
                htmlstr += '<td id="postalcode' + TH_CNT + '">' + txtFatcaPostalcode + '</td>';
                htmlstr += '<td id="stdCodePrimary' + TH_CNT + '">' + txtSTDCodePrimary + '</td>';
                htmlstr += '<td id="telNumberpriamry' + TH_CNT + '">' + txtTelephoneNumberPrimary + '</td>';
                htmlstr += '<td id="MobNumberprimary' + TH_CNT + '">' + txtMobileNumberPrimary + '</td>';
                htmlstr += '<td id="stdCodeother' + TH_CNT + '">' + txtSTDCodeOther + '</td>';
                htmlstr += '<td id="telNumberother' + TH_CNT + '">' + txtTelephoneNumberOther + '</td>';
                htmlstr += '<td id="mobNumberother' + TH_CNT + '">' + txtMobileNumberOther + '</td>';
                htmlstr += '</tr>';
                $('#DV_TH_FATCA #tblDetailList>tbody').append(htmlstr);

                TH_CNT += 1;

            }
            else if (TH_Action == 'Update')
            {

                var value = $('#DV_TH_FATCA #currentRow').text();

                $('#DV_TH_FATCA #country' + value).text(ddlCountryOfTaxDesc);
                $('#DV_TH_FATCA #country' + value).attr('code', ddlCountryOfTax);
                $('#DV_TH_FATCA #taxIdentity' + value).text(ddlTaxIndentityTypeDesc);
                $('#DV_TH_FATCA #taxIdentity' + value).attr('code', ddlTaxIndentityType);
                $('#DV_TH_FATCA #tax' + value).text(txttaxIdentityNo);
                $('#DV_TH_FATCA #trcDate' + value).text(txtexpTRCDate);
                $('#DV_TH_FATCA #address1' + value).text(txtFatcaAdd1);
                $('#DV_TH_FATCA #address2' + value).text(txtFatcaAdd2);
                $('#DV_TH_FATCA #Landmark' + value).text(txtFatcaLandmark);
                $('#DV_TH_FATCA #state' + value).text(ddlFatcaStateDesc);
                $('#DV_TH_FATCA #state' + value).attr('code', ddlFatcaState);
                $('#DV_TH_FATCA #addressType' + value).text(ddlAddressTypeDesc);
                $('#DV_TH_FATCA #addressType' + value).attr('code', ddlAddressType);
                $('#DV_TH_FATCA #city' + value).text(txtFatcaCity);
                $('#DV_TH_FATCA #postalcode' + value).text(txtFatcaPostalcode);
                $('#DV_TH_FATCA #stdCodePrimary' + value).text(txtSTDCodePrimary);
                $('#DV_TH_FATCA #telNumberpriamry' + value).text(txtTelephoneNumberPrimary);
                $('#DV_TH_FATCA #MobNumberprimary' + value).text(txtMobileNumberPrimary);
                $('#DV_TH_FATCA #stdCodeother' + value).text(txtSTDCodeOther);
                $('#DV_TH_FATCA #telNumberother' + value).text(txtTelephoneNumberOther);
                $('#DV_TH_FATCA #mobNumberother' + value).text(txtMobileNumberOther);
                
            }
            TH_clear();
            TH_Action = 'ADD';
        }
        $('#preloader').hide();


    } catch (e)
    {
        fnException(e);
    }
});

function TH_tbledit(btn, cnt)
{
    try
    {
        $('#preloader').show();
        TH_Action = 'Update';

        $('#DV_TH_FATCA #currentRow').text(cnt)
        $('#DV_TH_FATCA #ddlCountryOfTax').val($('#DV_TH_FATCA #country' + cnt).attr('code'));
        $('#DV_TH_FATCA #ddlCountryOfTax').change();
        $('#DV_TH_FATCA #ddlTaxIndentityType').val($('#DV_TH_FATCA #taxIdentity' + cnt).attr('code'));
        $('#DV_TH_FATCA #txttaxIdentityNo').val($('#DV_TH_FATCA #tax' + cnt).html());
        $('#DV_TH_FATCA #txtexpTRCDate').datetextentry('set_date', $('#DV_TH_FATCA #trcDate' + cnt).html());
        $('#DV_TH_FATCA #ddlAddressType').val($('#DV_TH_FATCA #addressType' + cnt).attr('code'));
        $('#DV_TH_FATCA #txtFatcaAdd1').val($('#DV_TH_FATCA #address1' + cnt).html());
        $('#DV_TH_FATCA #txtFatcaAdd2').val($('#DV_TH_FATCA #address2' + cnt).html());
        $('#DV_TH_FATCA #txtFatcaLandmark').val($('#DV_TH_FATCA #Landmark' + cnt).html());
        $('#DV_TH_FATCA #ddlFatcaState').val($('#DV_TH_FATCA #state' + cnt).attr('code'));
        $('#DV_TH_FATCA #txtFatcaCity').val($('#DV_TH_FATCA #city' + cnt).html());
        $('#DV_TH_FATCA #txtFatcaPostalcode').val($('#DV_TH_FATCA #postalcode' + cnt).html());
        $('#DV_TH_FATCA #txtSTDCodePrimary').val($('#DV_TH_FATCA #stdCodePrimary' + cnt).html());
        $('#DV_TH_FATCA #txtTelephoneNumberPrimary').val($('#DV_TH_FATCA #telNumberpriamry' + cnt).html());
        $('#DV_TH_FATCA #txtMobileNumberPrimary').val($('#DV_TH_FATCA #MobNumberprimary' + cnt).html());
        $('#DV_TH_FATCA #txtSTDCodeOther').val($('#DV_TH_FATCA #stdCodeother' + cnt).html());
        $('#DV_TH_FATCA #txtTelephoneNumberOther').val($('#DV_TH_FATCA #telNumberother' + cnt).html());
        $('#DV_TH_FATCA #txtMobileNumberOther').val($('#DV_TH_FATCA #mobNumberother' + cnt).html());
        //$('#ddlCountry option:selected').text($('#country' + cnt).text()));
        $("#DV_TH_FATCA #tblDetailList_default td").val($(btn).closest('tr')).length;
        $('#DV_TH_FATCA #txtSTDCodeOther').val($('#DV_TH_FATCA #stdCodeother' + cnt).html());
        $('#DV_TH_FATCA #currentRow').val($('#DV_TH_FATCA #Key' + cnt).html());

        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

function TH_Delete(btn)
{
    try
    {
        $('#preloader').show();

        $(btn).closest("tr").remove();

        if ($('#DV_TH_FATCA #tblDetailList tbody tr').length == 0)
        {
            $('#DV_TH_FATCA #tblDetailList tbody').html("<tr class='empty_table'><td colspan='19'>No Records Found..!</td></tr>");
        }
        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

function TH_clear()
{
    try
    {
        $('#preloader').show();

        $('#DV_TH_FATCA .fatca').removeClass('InputBorderRed');
        $('#DV_TH_FATCA .fatca').parent().removeClass('InputBorderRed');

        $('#DV_TH_FATCA #ddlCountryOfTax').val('select');
        $('#DV_TH_FATCA #ddlTaxIndentityType').val('select');
        $('#DV_TH_FATCA #txttaxIdentityNo').val('');
        $('#DV_TH_FATCA #ddlAddressType').val('select');
        $('#DV_TH_FATCA #ddlFatcaState').val('select');
        $('#DV_TH_FATCA #txtFatcaAdd1').val('');
        $('#DV_TH_FATCA #txtAddress1_DetailModel').val();
        $('#DV_TH_FATCA #txtFatcaAdd2').val('');
        $('#DV_TH_FATCA #txtFatcaLandmark').val('');
        $('#DV_TH_FATCA #txtFatcaCity').val('');
        $('#DV_TH_FATCA #txtFatcaPostalcode').val('');
        $('#DV_TH_FATCA #txtSTDCodePrimary').val('');
        $('#DV_TH_FATCA #txtTelephoneNumberPrimary').val('');
        $('#DV_TH_FATCA #txtMobileNumberPrimary').val('');
        $('#DV_TH_FATCA #txtSTDCodeOther').val('');
        $('#DV_TH_FATCA #txtTelephoneNumberOther').val('');
        $('#DV_TH_FATCA #txtMobileNumberOther').val('');
        $('#DV_TH_FATCA #txtexpTRCDate').datetextentry('set_date', '');

        $('#preloader').hide();
    } catch (e)
    {
        fnException(e);
    }
}

// validation
function iSTHFATCAValidate()
{
    try
    {
        $('#preloader').show();

        $('#DV_TH_FATCA .fatca').removeClass('InputBorderRed');
        $('#DV_TH_FATCA .fatca').parent().removeClass('InputBorderRed');

        var isError = false;
        var errMessage = "";

        $('#DV_TH_FATCA .fatca').each(function ()
        {
            var $this = $(this);
            if ($this.val() == "" || $this.val() == '-1' || $this.val() == 'Select' || $this.val() == 'select' || $this.val() == undefined)
            {
                if ($this.attr('errmsg') != '' && $this.attr('errmsg') != undefined)
                {
                    errMessage += "<p>" + $this.attr('errmsg'); +"</p>";
                }

                if ($this.hasClass('D_T_E'))
                {
                    $this.parent().addClass('InputBorderRed');
                }
                else
                {
                    $this.addClass('InputBorderRed');
                }
                isError = true;
            }
        });


        $('#DV_TH_FATCA .mobileF').each(function ()
        {
            var $this = $(this);
            if ($this.val() != "" && !IsValidMobile($this.val()))
            {
                errMessage += "<p>Mobile Number is Not Valid.</p>";
                $this.addClass('InputBorderRed');
                isError = true;
            }
        });


        if (isError)
        {
            //$('#dvErrorMsg').html(errMessage);
            //$('#btnOpenModalError').click();
            BtpMessagePopup(errMessage, 'error');
            return false;
        }

        $('#preloader').hide();

        return true;


    } catch (e)
    {
        fnException(e)
    }
}

$("#DV_TH_FATCA #btnOpenDetailModel").click(function ()
{
    $("#DV_TH_FATCA #DV_FATCA_DETAILS").toggle();
});

$('#DV_TH_FATCA #btnFatacClear').click(function ()
{
    TH_clear();
});



