var EXC_CMS_MAPPING_FLAG = 0;

$(document).ready(function ()
{
    $('#DV_MSG_CENTER').show();

    CancelClickGen();
    //MainBtnHandler(false, false, false, false, true, true, false);

    //$("#btnCancelGen").off().on("click", CancelClickGen);

    //$("#btnSearchGen").off().on("click", SearchClick);
    getBankGen();
    getBranchGen();
    $('#txtStartDateGen, #txtEndDateGen').datepicker({ autoclose: true, format: 'dd/mm/yyyy' });

    ExtendedAjaxCall('CMS/GET_EXC_CMS_MAPPING_FLAG', null, 'GET', function (result)
    {
        if (!$.isEmptyObject(result))
        {
            EXC_CMS_MAPPING_FLAG = result[0].status;

        } else
        {
            MessageCenter('Something went wrong.', 'error');
        }
    }, null, null, false, false, ErrorFunction);

    //if (EXC_CMS_MAPPING_FLAG == 1)
    //{
    //    $('#PnlddlCMSbank').hide();
    //    $('#PnlddlEXCCMSbank').show();
    //}
    //else
    //{
    //    $('#PnlddlCMSbank').show();
    //    $('#PnlddlEXCCMSbank').hide();
    //}

    if (EXC_CMS_MAPPING_FLAG == 1)
    {
        $('#lnkCMSBranchSearchGen').show();

    }
    else
    {
        $('#lnkCMSBranchSearchGen').hide();
    }
});

$('#btnCancelGen').click(function ()
{
    CancelClickGen();
});

function CancelClickGen()
{
    $('#divGetDetailsGen').hide();
    $('#tblStagingGen > tbody').html('');
    MessageCenter("", '');
    $('#ddlStateNameGen').empty().append('<option value="0">Select</option>');
    $('#txtEndDateGen').val('');
    $('#txtStartDateGen').val('');
    $('#ddlBankNameGen,#ddlBranchNameGen').val('0');
    //$('#hdnEXCCMSbankCode,#txtEXCCMSbankName').val('');
    //MainBtnHandler(false, false, false, false, true, true, false);
    //$("#btnSearchGen").off().on("click", SearchClick);
}

$('#btnSearchGen').click(function ()
{
    SearchClick();
});

function SearchClick()
{
    MessageCenter('', '');

    if ($('#ddlBankNameGen').val() == "0")
    {
        MessageCenter('Please select CMS Bank', 'error');
        return false;
    }

    if ($('#ddlBranchNameGen').val() == "0")
    {
        MessageCenter('Please select BTP Location', 'error');
        return false;
    }

    //if (EXC_CMS_MAPPING_FLAG == 1 && $('#hdnEXCCMSbankCode').val() == "")
    //{
    //    MessageCenter('Please select CMS Branch.', 'error');
    //    return false;
    //}
    //else if (EXC_CMS_MAPPING_FLAG == 0 && $('#ddlStateName').val() == "0" || $('#ddlStateName').val() == "")
    //{
    //    MessageCenter('Please select CMS Branch.', 'error');
    //    return false;
    //}

    if ($('#ddlStateNameGen').val() == "0" || $('#ddlStateName').val() == "")
    {
        MessageCenter('Please select CMS Branch.', 'error');
        return false;
    }


    if ($('#txtStartDateGen').val() == "")
    {
        MessageCenter('Please enter from date', 'error');
        return false;
    }

    if ($('#txtEndDateGen').val() == "")
    {
        MessageCenter('Please enter End date', 'error');
        return false;
    }

    BindPayInData();
}

$('#ddlBranchNameGen').on('change', function ()
{


    MessageCenter('', '');

    if ($('#ddlBranchNameGen').val() == "0")
    {
        MessageCenter('Please select Location', 'error');
        $('#ddlStateNameGen').empty();
        ClearFormGen();
        return false;
    }
    var StateCode = $('#ddlBranchNameGen').val();

    $('#ddlStateNameGen').empty();
    ClearFormGen();
    $('#tblAlllocations > tbody').html('');
    var htmlstr = '';
    ExtendedAjaxCall('PayinSlip/GetCMSBranch?locCode=' + StateCode + '', null, 'GET', function (result)
    {

        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $('#ddlStateNameGen').empty();
                $('#ddlStateNameGen').append("<option value='0' data-row='0'>Select</option>");
                $.each(result, function (i, row)
                {

                    $('#ddlStateNameGen').append("<option value='" + row['Agency_CMS_Branch_Code'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Agency_CMC_Branch_Name'] + "</option>");
                });

            } else
            {
                $('#lblLookUpMessage').text('No Request found').addClass('red-text');
            }
        } else
        {
            $('#lblLookUpMessage').text('something went wrong while binding Request').addClass('red-text');
        }
    }, null, null, false, false, ErrorFunction);


});

function ClearFormGen()
{
    $('#txtEndDateGen').val('');
    $('#txtStartDateGen').val('');
    $('#tblStagingGen > tbody').html('');
}



function BindPayInData()
{
    var BTPlocname = $('#ddlBranchNameGen option:selected').text();
    var BTPlocCode = $('#ddlBranchNameGen').val();

    //if (EXC_CMS_MAPPING_FLAG == 1)
    //{
    //    var CMSlocname = $('#txtEXCCMSbankName').val();
    //    var CMSlocCode = $('#hdnEXCCMSbankCode').val();
    //}
    //else if (EXC_CMS_MAPPING_FLAG == 1)
    //{
    //    var CMSlocname = $('#ddlStateName option:selected').text();
    //    var CMSlocCode = $('#ddlStateName').val();
    //}

    var CMSlocname = $('#ddlStateNameGen option:selected').text();
    var CMSlocCode = $('#ddlStateNameGen').val();

    var BranchCode = $('#ddlStateNameGen').val();

    var BankName = $('#ddlBankNameGen').val();
    var fromdate = $('#txtStartDateGen').val();
    var todate = $('#txtEndDateGen').val();

    $('#tblStagingGen > tbody').html('');
    var htmlstr = '';
    $('#tblStaging').DataTable().destroy();
    ExtendedAjaxCall('PayinSlip/GetpainsliphdrData?CMSBankName=' + BankName + '&MFBranchCode=' + BranchCode + '&CMSLOCCODE=' + CMSlocCode + '&CMSLOCNAME=' + CMSlocname + '&fromdate=' + fromdate + '&todate=' + todate + '&BTP_LocationCode=' + BTPlocCode + '&BTP_LocationDesc=' + BTPlocname + '', null, 'GET', function (result)
    {

        if (result !== null && typeof (result) !== 'undefined')
        {

            if (result.length > 0)
            {
                $.each(result, function (i, row)
                {
                    // htmlstr += '<tr>';
                    htmlstr += '<tr><td class="text-center">';
                    htmlstr += "<input type='radio' name='PAYINSLIP' data-row ='" + JSON.stringify(row) + "'/></td>";
                    htmlstr += '<td style=display:none>' + row["Payinslip_HdrSequence"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Payinslip_Stg_HdrSequence"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Payinslip_SourceName"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["PortalSourceCode"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["MCP_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["SCP_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["MCP_Broker_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["SCP_Broker_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Employee_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["ADO_Indicator"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["CMS_Type"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["CMS_Bank_Name"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["CMS_Branch_Name"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["CMS_Bank_IFSC_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["CMS_Bank_MICR_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["MF_Branch_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["MF_Branch_Name"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["SCP_Location_Code"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["SCP_Location_Name"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Entry_Date"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Pickup_Date"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Payinslip_No"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Remarks"] + '</td>';
                    htmlstr += '<td style=display:none>' + row["Queue_Remarks"] + '</td>';
                    htmlstr += '<td align="center">' + row["Payinslip_No"] + '</td>';
                    htmlstr += '<td align="center">' + row["PayInSlipGeneratedDate"] + '</td>';
                    htmlstr += '<td align="center">' + row["CreatedByUser"] + '</td>';
                    htmlstr += '<td align="center">' + row["ChequeCount"] + '</td>';

                    htmlstr += '</tr>';

                });
                $('#tblStagingGen > tbody').html(htmlstr);

                $('#divGetDetailsGen').show();

                $('#tblStagingGen').DataTable({
                    destroy: true,
                    initComplete: function ()
                    {
                        $("#preloader").hide();
                    }
                });
                // MainBtnHandler(false, false, true, false, false, true, false);
                //$('#btnCancelGen').bind('click', CancelClickGen);

            } else
            {
                MessageCenter("Data not found", 'error');

            }
        } else
        {

            MessageCenter("Data not found", 'error');
        }

    }, null, null, false, false, ErrorFunction);

}

function getBankGen()
{



    ExtendedAjaxCall('PayinSlip/GetBank', null, 'GET', function (result)
    {
        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $('#ddlBankNameGen').empty();
                $('#ddlBankNameGen').append("<option value='0' data-row='0'>Select</option>");
                $.each(result, function (i, row)
                {

                    $('#ddlBankNameGen').append("<option value='" + row['Cms_Bank_Code'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Cms_Bank_Name'] + "</option>");
                });

            } else
            {
                $('#lblLookUpMessage').text('No Request found').addClass('red-text');
            }
        } else
        {
            $('#lblLookUpMessage').text('something went wrong while binding Request').addClass('red-text');
        }
    }, null, null, false, false, ErrorFunction);
}

var d = new Date();

var month = d.getMonth() + 1;
var day = d.getDate();

//var output = (day < 10 ? '0' : '') + day + '/' +
//    (month < 10 ? '0' : '') + month + '/' +
//    d.getFullYear();
var output = (day < 10 ? '0' : '') + day +
    (month < 10 ? '0' : '') + month +
    d.getFullYear();


function getBranchGen()
{

    ExtendedAjaxCall('PayinSlip/GetBranch', null, 'GET', function (result)
    {
        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $('#ddlBranchNameGen').empty();
                $('#ddlBranchNameGen').append("<option value='0' data-row='0'>Select</option>");
                $.each(result, function (i, row)
                {

                    $('#ddlBranchNameGen').append("<option value='" + row['Agency_Loc_Cd'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Agency_Loc_Desc'] + "</option>");
                });

            } else
            {
                $('#lblLookUpMessage').text('No Request found').addClass('red-text');
            }
        } else
        {
            $('#lblLookUpMessage').text('something went wrong while binding Request').addClass('red-text');
        }
    }, null, null, false, false, ErrorFunction);
}


$('#tblStagingGen #chkAddSelectAll').on('change', function ()
{
    if ($('#tblStagingGen #chkAddSelectAll').prop('checked'))
    {
        $('#tblStagingGen input[type=checkbox]').each(function (key, element)
        {
            $(element).prop('checked', true);
        });
    } else
    {
        $('#tblStagingGen input[type=checkbox]').each(function (key, element)
        {
            $(element).prop('checked', false);
        });
    }
});

$('#btnGenerate').on('click', function ()
{
    try
    {

        var BLocCode = $('#ddlBranchNameGen').val();
        var CMSLocCode = $('#ddlStateNameGen').val();

        var PIS = "PIS";
        MessageCenter('', '');
        var HdrSeq = "";
        var payslipno = "";
        $('#tblStagingGen  > tbody input[type=radio]:checked').each(function (key, element)
        {
            //select row
            var row = $(element).data('row');

            HdrSeq = row["Payinslip_HdrSequence"];
        });

        if (HdrSeq == "")
        {
            MessageCenter("Please select Atleast on record", 'error');
            return false;

        } else
        {
            //$('#tblStaging1 > thead').html('');
            $('#tblStaging1 > tbody').html('');
            var htmlstr = "";
            var htmlClientDtl = "";
            ExtendedAjaxCall('PayinSlip/GetPayinslipDtlData?HdrSeq=' + HdrSeq + '', null, 'GET', function (result)
            {

                if (result !== null && typeof (result) !== 'undefined')
                {
                    if (result.Table.length > 0)
                    {
                        var clientcode = "(" + result.Table1[0].f_Bank_Client_Id + ")";

                      
                        htmlClientDtl += '<tr>';
                        htmlClientDtl += '<td>' + result.Table1[0].f_Bank_Client_Id + '</td>';
                        htmlClientDtl +='<td>' + result.Table1[0].f_Bank_Client_Name + '</td>';
                        htmlClientDtl += '</tr>';
                        htmlClientDtl += '<tr>';
                        htmlClientDtl += '</tr>';
                        $('#tblClientDtl> tbody').html(htmlClientDtl);



                        //htmlstr += '<tr style="border:1px solid #000;">';
                        //htmlstr += '<th>SR NO</th>';
                        //htmlstr += '<th><span id="spClientCode">' + clientcode + '</span>PAY IN SLIP NO</th>';
                        //htmlstr += '<th>Entry Date</th>';
                        //htmlstr += '<th>Pick Up Date</th>';
                        //htmlstr += '<th>Branch</th>';
                        //htmlstr += '<th>Appl No</th>';
                        //htmlstr += '<th>Applicant Name</th>';
                        //htmlstr += '<th>Amount</th>';
                        //htmlstr += '<th>Cheque No</th>';
                        //htmlstr += '<th>Bank</th>';
                        //htmlstr += '<th>PAYIN SLIP BATCH NO</th>';
                        //htmlstr += '</tr>';
                        //$('#tblStaging1> thead').html(htmlstr);


                        htmlstr = '';
                        $.each(result.Table, function (i, row)
                        {
                            payslipno = row["PayslipNo"];
                            htmlstr += '<tr>';

                            htmlstr += '<td>' + row["SRNO"] + '</td>';
                            htmlstr += '<td>' + row["PayslipNo"] + '</td>';
                            htmlstr += '<td>' + row["Entry Date"] + '</td>';
                            htmlstr += '<td>' + row["Pick Up Date"] + '</td>';
                            htmlstr += '<td>' + row["f_MF_Branch_Name"] + '</td>';
                            htmlstr += '<td>' + row["f_Application_Number"] + '</td>';
                            htmlstr += '<td>' + row["f_Applicant_Name"] + '</td>';
                            htmlstr += '<td>' + row["f_Cheque_Amt"] + '</td>';
                            htmlstr += '<td>' + row["f_Cheque_Number"] + '</td>';
                            htmlstr += '<td>' + row["f_Drawn_Bank_Name"] + '</td>';
                            htmlstr += '<td>' + row["f_Payinslip_HdrSequence"] + '</td>';

                            htmlstr += '</tr>';

                        });
                        $('#tblStaging1> tbody').html(htmlstr);

                        $("#spClientCode").text(clientcode);

                        var doc = new jsPDF('l', 'in', 'a3');

                        doc.autoTable({
                            html: '#tblClientDtl',
                            theme: 'plain',
                            styles: {                                                              
                                tableWidth: 'auto',
                                columnStyles: 'auto'
                            },
                        });
                        doc.autoTable({ html: '#tblStaging1', theme: 'plain' });

                        doc.save(PIS + '_' + output + '_' + BLocCode + '_' + CMSLocCode + '_' + '.pdf');
                        // alert('Pdf downloaded please check');
                        MessageCenter("PayInSlip generated successfully for " + payslipno, 'success');



                    } else
                    {
                        MessageCenter("Data not found", 'error');

                    }
                } else
                {
                    $('#lblLookUpMessage').text('something went wrong while binding Request').addClass('red-text');

                }
            }, null, null, false, false, ErrorFunction);

        }



    } catch (e)
    {
        console.error(e);
    }

});


function rdoCMS_select_Gen(btn)
{

    var code = $(btn).val();
    var name = $($(btn).closest('tr').find('td')[1]).text();
    if ($("#ddlStateNameGen option[value='" + code + "']").length != 0)
    {
        // it exists!
        $('#ddlStateNameGen').val(code).change();
    }
    else
    {
        var html = '<option value="' + code + '">' + name + '</option>';
        $('#ddlStateNameGen').append(html).val(code).change();
    }
    $('#ModelCMSBranchCloseGen').click();
    $('#ddlStateGen').val('select').change();
    $('#ddlEXCCMSBranchGen').val('select');
    //$('#modellblErrormsg').text('');
};


