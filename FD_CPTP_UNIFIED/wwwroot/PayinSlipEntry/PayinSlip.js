var EXC_CMS_MAPPING_FLAG = 0;

$(document).ready(function ()
{
    $('.alert').show();

    $('#DV_MSG_CENTER').show();
    CancelClickEntry();
    MainBtnHandler(false, false, false, false, false, true, false);
    //$("#btnSave").off().on("click", SaveClickEntry);
    //$("#btnCancel").off().on("click", CancelClickEntry);
    $('#payinslipcount').val('0');
    $('#payinslipTotalcount').text('0');
    //$("#btnSearch").off().on("click", SearchClick);
    // $('#chkAddSelectAll').val('0')
    $('#tblStaging #chkAddSelectAll').prop('checked', false);
    getBank();
    getBranch();

    ExtendedAjaxCall('CMS/GET_EXC_CMS_MAPPING_FLAG', null, 'GET', function (result)
    {
        if (!$.isEmptyObject(result))
        {
            EXC_CMS_MAPPING_FLAG = result[0].status;

        } else
        {
            MessageCenter('Something went weong.', 'error');
        }
    }, null, null, false, false, ErrorFunction);


    if (EXC_CMS_MAPPING_FLAG == 1)
    {
        $('#lnkCMSBranchSearch').show();

    }
    else
    {
        $('#lnkCMSBranchSearch').hide();
    }

});

function BindPayinDataDtlforsave()
{

    $('#payinslipcount').text('0');
    $('#payinslipTotalcount').text('0');

    if ($('#ddlBranchName').val() == "0")
    {
        MessageCenter('Please select CPTP Location', 'error');
        return;
    }
    var BankName = $('#ddlBankName').val();

    var BranchCode = $('#ddlStateName').val();

    var BTPLocationCode = $('#ddlBranchName').val();
    var BTP_LocationDesc = $('#ddlBranchName option:selected').text();
    $('#tblStaging').DataTable().destroy();
    $('#tblStaging > tbody').html('');
    //var table = $('#tblStaging').DataTable();
    //table.destroy();
    var htmlstr = '';
    //$('#tblStaging').DataTable().destroy();
    ExtendedAjaxCall('PayinSlip/GetStagingData?CMSBankName=' + BankName + '&MFBranchCode=' + BranchCode + '&BTP_Agency_Branch_Code=' + BTPLocationCode + ' &BTP_Agency_BranchName=' + BTP_LocationDesc + '', null, 'GET', function (result)
    {

        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $.each(result, function (i, row)
                {

                    //htmlstr += '<tr>';
                    htmlstr += '<tr>';
                    if (row["Status"])
                    {
                        htmlstr += "<td class='text-center'><input type='checkbox' class='Checkbox' data-row ='" + JSON.stringify(row) + "' onchange='chechCount(this)'  /></td>";
                    }
                    else
                    {
                        htmlstr += '<td></td>';
                    }
                    //htmlstr += '<td style=display:none>' + row["Payinslip_Stg_HdrSequence"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Payinslip_SourceName"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["PortalSourceCode"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["MCP_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Scp_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["MCP_Broker_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Scp_Broker_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["CP_Trans_Ref_No"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Employee_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_Other_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_Type"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_Cust_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_RM_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Cheque_Number"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Cheque_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Cheque_Amt"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Drawn_Bank_Name"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Drawn_Branch_Name"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["SCP_Location_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["SCP_Location_Name"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["f_Entry_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Pick_Up_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Pick_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Remarks"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Queue_State"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Queue_Status"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Queue_Remarks"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["DrawnBankIFSCCode"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["DrawnBankMICRCode"] + '</td>';
                    htmlstr += '<td>' + row["ApplicationDeclarationType"] + '</td>';
                    htmlstr += '<td>' + row["Applicant_Name"] + '</td>';
                    htmlstr += '<td>' + row["Application_Number"] + '</td>';
                    htmlstr += '<td>' + row["Entry_Date"] + '</td>';
                    htmlstr += '<td align="right" >' + row["Cheque_Number"] + '</td>';
                    htmlstr += '<td>' + row["Cheque_Date"] + '</td>';
                    htmlstr += '<td align="right">' + row["Cheque_Amt"] + '</td>';
                    htmlstr += '<td>' + row["Drawn_Bank_Name"] + '</td>';
                    htmlstr += '<td>' + row["Drawn_Branch_Name"] + '</td>';
                    htmlstr += '<td>' + row["DrawnBankIFSCCode"] + '</td>';
                    htmlstr += '<td>' + row["DrawnBankMICRCode"] + '</td>';
                    htmlstr += '<td>' + row["Remark"] + '</td>';

                    htmlstr += '</tr>';

                });




                $('#tblStaging> tbody').html(htmlstr);


                //table = $('#tblStaging').DataTable({
                //    "order": [[2, "asc"]],
                //    initComplete: function () {
                //        $("#preloader").hide();
                //    }
                //});
                $('#divGetDetails').show();
                $('#payinslipTotalcount').text(result.length);
                $('#tblStaging').DataTable({
                    destroy: true,
                    initComplete: function ()
                    {
                        $("#preloader").hide();
                    }
                });



                //Bind DatePicker
                //MainBtnHandler(false, false, true, false, false, true, false);
                // $('#btnSave').bind('click', SaveClickEntry);
                //$("#btnSaveEntry").off().on("click", SaveClickEntry);
                //$('#btnCancelEntry').bind('click', CancelClickEntry);

            } else
            {
                // MessageCenter("Data not found", 'error');
                // $('#pnlSearchData').hide();
            }
        } else
        {
            //  $('#lblLookUpMessage').text('something went wrong while binding Request').addClass('red-text');
            // MessageCenter("Data not found", 'error');
        }

    }, null, null, false, true);
}

$('#btnSaveEntry').click(function ()
{
    SaveClickEntry();
});

function SaveClickEntry()
{
    if ($('#tblStaging > tbody input[type=checkbox]').length > 0)
    {
        if ($('#tblStaging  > tbody input[type=checkbox]:checked').prop('checked') == true)
        {

            var obj1 = [];
            $('#tblStaging  > tbody input[type=checkbox]:checked').each(function (key, element)
            {
                //select row
                var row = $(element).data('row');

                var PayinslipStaging = {
                    Payinslip_Stg_HdrSequence: row["Payinslip_Stg_HdrSequence"],
                    Payinslip_Source_Name: row["Payinslip_SourceName"],
                    PortalSourceCode: row["PortalSourceCode"],
                    MCP_Code: row["MCP_Code"],
                    SCP_Code: row["Scp_Code"],
                    MCP_Broker_Code: row["MCP_Broker_Code"],
                    SCP_Broker_Code: row["Scp_Broker_Code"],
                    Employee_Code: row["Employee_Code"],
                    ADO_Indicator: "",
                    CMS_Type: row["CMS_Type"],
                    CP_Trans_Ref_No: row["CP_Trans_Ref_No"],
                    MF_Sys_Ref_No: "",
                    Ref_Type: row["Ref_Type"],
                    Ref_Cust_Code: row["Ref_Cust_Code"],
                    Ref_RM_Code: row["Ref_RM_Code"],
                    Ref_Other_Code: row["Ref_Other_Code"],
                    Cheque_Number: row["Cheque_Number"],
                    Process_Remarks: "",
                    CMS_Bank_Name: row["CMS_Bank_Name"],
                    CMS_Branch_Name: row["CMS_Branc_Name"],
                    CMS_IFSC_Code: row["CMS_Bank_IFSC_Code"],
                    CMS_MICR_Code: row["CMS_Bank_MICR_Code"],
                    Drawn_Bank_Name: row["Drawn_Bank_Name"],
                    Drawn_Branch_name: row["Drawn_Branch_Name"],
                    Applicant_Name: row["Applicant_Name"],
                    Application_No: row["Application_Number"],
                    MF_Branch_Name: row["MF_Branch_Name"],
                    MF_Branch_Code: row["MF_Branch_Code"],
                    SCP_Location_Code: row["SCP_Location_Code"],
                    SCP_Location_Name: row["SCP_Location_Name"],
                    Entry_Date: row["f_Entry_Date"],
                    Cheque_Date: row["Cheque_Date"],
                    Cheque_Amount: row["Cheque_Amt"],
                    Payinslip_No: "",
                    Remarks: row["Remarks"],
                    Pickup_Date: row["Pick_Up_Date"],
                    Req_Remarks: row["Queue_Remarks"],
                    Req_State: row["Queue_State"],
                    Req_Status: row["Queue_Status"],
                    CMS_LOC_CODE: row["CMS_Location_Code"],
                    CMS_LOC_NAME: row["CMS_Location_Name"],
                    Drawn_Bank_IFSC: row["DrawnBankIFSCCode"],
                    Drawn_Bank_MICR: row["DrawnBankMICRCode"],
                    BTP_LOC_CODE: $('#ddlBranchName').val(),
                    BTP_LOC_DESC: $('#ddlBranchName option:selected').text(),
                    count: $('#payinslipcount').text()
                };
                //Push to list
                obj1.push(PayinslipStaging);
            });

            var payinSlip = {

                payinslipBos: obj1,

            };
            ExtendedAjaxCall('PayinSlip/Save', payinSlip, 'POST', function (result)
            {


                if (result.isResponce)
                {
                    MessageCenter(result.result, "success");

                    $('#divGetDetails').hide();
                    $('#tblStaging > tbody').html('');
                    $('#payinslipcount').text('0');
                    $('#payinslipTotalcount').text('0');
                    $('#tblStaging #chkAddSelectAll').prop('checked', false);
                    // BindPayinDataDtl()
                    BindPayinDataDtlforsave();
                } else
                {
                    MessageCenter(result.result, "error");
                }

            }, null, null, false, true);

           // $('#btnCancelEntry').bind('click', CancelClickEntry);
        } else
        {
            MessageCenter("Please select atlest one request", "error");
            return false;
        }
    }
    else
    {
        MessageCenter("No Record Found for Save", "error");
        return false;

    }
}

var selectedDataCount = 0;

function SetSelectedRowCount()
{
    if ($('#tblStaging #chkAddSelectAll').prop("checked"))
    {
        selectedDataCount = parseInt(selectedDataCount) + 1;
    }
    else if (!$('#tblStaging #chkAddSelectAll').prop("checked"))
    {
        selectedDataCount = parseInt(selectedDataCount) - 1;
    }
}

$('#btnSaveEntry').click(function ()
{
    CancelClickEntry();
});

function CancelClickEntry()
{
    $('#divGetDetails').hide();
    $('#tblStaging > tbody').html('');
    $('#payinslipcount').text('0');
    $('#payinslipTotalcount').text('0');
    $('#ddlBranchName').val('0');
    $('#ddlBankName').val('0');
    $('#ddlStateName').empty().append('<option value="0">Select</option>');
    MessageCenter("", '');
    $('#ddlBankName,#ddlBranchName').val('0');
    //$('#hdnEXCCMSbankCode,#txtEXCCMSbankName').val('');
    MainBtnHandler(false, false, false, false, false, true, false);
    $('#tblStaging #chkAddSelectAll').prop('checked', false);
}


$('#ddlBranchName').on('change', function ()
{
    MessageCenter('', '');
    if ($('#ddlBranchName').val() == "0")
    {
        MessageCenter('Please select Branch', 'error');
        return;
    }
    var StateCode = $('#ddlBranchName').val();

    $('#ddlStateName').empty();
    ClearFormEntry();
    $('#tblAlllocations > tbody').html('');
    var htmlstr = '';
    ExtendedAjaxCall('PayinSlip/GetCMSBranch?locCode=' + StateCode + '', null, 'GET', function (result)
    {

        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $('#ddlStateName').empty();
                $('#ddlStateName').append("<option value='0' data-row='0'>Select</option>");
                $.each(result, function (i, row)
                {
                    $('#ddlStateName').append("<option value='" + row['Agency_CMS_Branch_Code'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Agency_CMC_Branch_Name'] + "</option>");
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

$('#ddlStateName').on('change', function ()
{
    MessageCenter('', '');
    $('#payinslipcount').text('0');
    $('#payinslipTotalcount').text('0');

    if ($('#ddlBranchName').val() == "0")
    {
        MessageCenter('Please select CPTP Location', 'error');
        return;
    }
    var BankName = $('#ddlBankName').val();
    var BranchCode = $('#ddlStateName option:selected').val();
    var BTPLocationCode = $('#ddlBranchName').val();
    var BTP_LocationDesc = $('#ddlBranchName option:selected').text();
    $('#tblStaging').DataTable().destroy();
    $('#tblStaging > tbody').html('');
    //var table = $('#tblStaging').DataTable();
    //table.destroy();
    var htmlstr = '';
    //$('#tblStaging').DataTable().destroy();
    ExtendedAjaxCall('PayinSlip/GetStagingData?CMSBankName=' + BankName + '&MFBranchCode=' + BranchCode + '&BTP_Agency_Branch_Code=' + BTPLocationCode + ' &BTP_Agency_BranchName=' + BTP_LocationDesc + '', null, 'GET', function (result)
    {


        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $.each(result, function (i, row)
                {

                    //htmlstr += '<tr>';
                    htmlstr += '<tr>';
                    if (row["Status"])
                    {
                        htmlstr += "<td class='text-center'><input type='checkbox' class='Checkbox' data-row ='" + JSON.stringify(row) + "' onchange='chechCount(this)'  /></td>";
                    }
                    else
                    {
                        htmlstr += '<td></td>';
                    }
                    //htmlstr += '<td style=display:none>' + row["Payinslip_Stg_HdrSequence"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Payinslip_SourceName"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["PortalSourceCode"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["MCP_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Scp_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["MCP_Broker_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Scp_Broker_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["CP_Trans_Ref_No"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Employee_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_Other_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_Type"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_Cust_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Ref_RM_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Cheque_Number"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Cheque_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Cheque_Amt"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Drawn_Bank_Name"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Drawn_Branch_Name"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["SCP_Location_Code"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["SCP_Location_Name"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["f_Entry_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Pick_Up_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Pick_Date"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Remarks"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Queue_State"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Queue_Status"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["Queue_Remarks"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["DrawnBankIFSCCode"] + '</td>';
                    //htmlstr += '<td style=display:none>' + row["DrawnBankMICRCode"] + '</td>';
                    htmlstr += '<td>' + row["ApplicationDeclarationType"] + '</td>';
                    htmlstr += '<td>' + row["Applicant_Name"] + '</td>';
                    htmlstr += '<td>' + row["Application_Number"] + '</td>';
                    htmlstr += '<td>' + row["Entry_Date"] + '</td>';
                    htmlstr += '<td align="right" >' + row["Cheque_Number"] + '</td>';
                    htmlstr += '<td>' + row["Cheque_Date"] + '</td>';
                    htmlstr += '<td align="right">' + row["Cheque_Amt"] + '</td>';
                    htmlstr += '<td>' + row["Drawn_Bank_Name"] + '</td>';
                    htmlstr += '<td>' + row["Drawn_Branch_Name"] + '</td>';
                    htmlstr += '<td>' + row["DrawnBankIFSCCode"] + '</td>';
                    htmlstr += '<td>' + row["DrawnBankMICRCode"] + '</td>';
                    htmlstr += '<td>' + row["Remark"] + '</td>';

                    htmlstr += '</tr>';

                });




                $('#tblStaging> tbody').html(htmlstr);


                //table = $('#tblStaging').DataTable({
                //    "order": [[2, "asc"]],
                //    initComplete: function () {
                //        $("#preloader").hide();
                //    }
                //});
                $('#divGetDetails').show();
                $('#payinslipTotalcount').text(result.length);
                $('#tblStaging').DataTable({
                    destroy: true,
                    initComplete: function ()
                    {
                        $("#preloader").hide();
                    }
                });



                //Bind DatePicker
                //MainBtnHandler(false, false, true, false, false, true, false);
                //$('#btnSave').bind('click', SaveClickEntry);
                //$('#btnCancel').bind('click', CancelClickEntry);

            } else
            {
                MessageCenter("Data not found", 'error');
                // $('#pnlSearchData').hide();
            }
        } else
        {
            //  $('#lblLookUpMessage').text('something went wrong while binding Request').addClass('red-text');
            MessageCenter("Data not found", 'error');
        }

    }, null, null, false, false, ErrorFunction);

});


function chechCount(btn)
{
    var count = 0;
    $('#tblStaging .Checkbox').each(function ()
    {
        if ($(this).prop('checked'))
        {
            count += 1;
        }
    });
    $('#payinslipcount').text(count);

}

$('#tblStaging #chkAddSelectAll').on('change', function ()
{
    var count = 0;
    if ($('#tblStaging #chkAddSelectAll').prop('checked'))
    {
        $('#tblStaging .Checkbox').each(function (key, element)
        {
            $(element).prop('checked', true);
            count += 1;
        });
    } else
    {
        $('#tblStaging .Checkbox').each(function (key, element)
        {
            $(element).prop('checked', false);
        });
    }

    $('#payinslipcount').text(count);
});

function getBank()
{

    ExtendedAjaxCall('PayinSlip/GetBank', null, 'GET', function (result)
    {

        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $('#ddlBankName').empty();
                $('#ddlBankName').append("<option value='0' data-row='0'>Select</option>");
                $.each(result, function (i, row)
                {

                    $('#ddlBankName').append("<option value='" + row['Cms_Bank_Code'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Cms_Bank_Name'] + "</option>");
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

function getBranch()
{

    ExtendedAjaxCall('PayinSlip/GetBranch', null, 'GET', function (result)
    {

        if (result !== null && typeof (result) !== 'undefined')
        {
            if (result.length > 0)
            {
                $('#ddlBranchName').empty();
                $('#ddlBranchName').append("<option value='0' data-row='0'>Select</option>");
                $.each(result, function (i, row)
                {

                    $('#ddlBranchName').append("<option value='" + row['Agency_Loc_Cd'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Agency_Loc_Desc'] + "</option>");
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

function ClearFormEntry()
{

    $('#ddlStateName').empty();
    $('#tblStaging > tbody').html('');
    $('#payinslipcount').text('0');
    $('#payinslipTotalcount').text('0');
}

function rdoCMS_select(btn)
{

    var code = $(btn).val();
    var name = $($(btn).closest('tr').find('td')[1]).text();
    if ($("#ddlStateName option[value='" + code + "']").length != 0)
    {
        // it exists!
        $('#ddlStateName').val(code).change();
    }
    else
    {
        var html = '<option value="' + code + '">' + name + '</option>';
        $('#ddlStateName').append(html).val(code).change();
    }
    $('#ModelCMSBranchClose').click();
    $('#ddlState').val('select').change();
    $('#ddlEXCCMSBranch').val('select');
    $('#modellblErrormsg').text('');
};


