$('#txtSearchDOB,#txtReqDt,#txtDepDate,#txtMatDate').datetextentry();

const Is_Valid_Emp_Or_Broker_Code = function (code)
{
    var isValid = 0;

    if (!$.isEmptyObject(code))
    {
        ExtendedAjaxCall('DataEntry/Is_Valid_Emp_Or_Broker_CodeAsync/' + code, null, 'GET', function (result)
        {
            if (!$.isEmptyObject(result))
            {
                isValid = result[0].status;
            }
        }, null, null, false, false, ErrorFunction);
    }

    if (isValid == 1)
        return true;

    return false;
}
const ShowMessage = function ()
{
    let message = 'Please Select Renewal Option';
    if ($('#ddlRenewedAmt').val() == 'P')
    {
        message = '<p>You have selected Renewal of Principal amount only, the interest amount after deduction of tax, if any, will be credited to registered bank account. </p> <p>Please verify FD application before proceeding.</p>';
    }
    else if ($('#ddlRenewedAmt').val() == 'F')
    {
        message = '<p>You have selected Renewal of Principal with interest amount, Fixed Deposit will be renewed accordingly. </p> <p>Please verify FD application before proceeding.</p>';
    }

    $('#dvModalMsg').empty().html(message);
    $('#ModelMessage').modal('show');
}
const GetData = function (btn)
{
    try
    {

        let FDR_NO = $(btn).val();

        if (!$.isEmptyObject(FDR_NO))
        {

            let requestBO = {
                FDR: FDR_NO,
            }

            ExtendedAjaxCall('RenewApplication/GetDashboardAsync', requestBO, 'POST', function (result)
            {
                try
                {

                    $('#preloader').hide();
                    $('#dvAlertMsg').empty().html('<p>Please write your Broker Code legibly on the Application/FDR copy</p> <p>Please select Principal or Principal with interest as mentioned in FD application</p>');
                    $('#ModelAlert').modal('show');

                    let htmlstr = "";
                    if (!$.isEmptyObject(result) && !$.isEmptyObject(result.dt))
                    {
                        $('#txtReqNo').val('NEW').prop('disabled', true).addClass('DisabledControl');

                        let d = new Date();
                        let mm = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
                        let dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
                        let today = d.getFullYear() + "-" + mm + "-" + dd;
                        let ReqBatch = dd.toString() + mm.toString() + d.getFullYear().toString();

                        $('#txtReqDt').datetextentry('set_date', today).datetextentry('set_readonly', true);
                        $('#txtDepNo').val(result.dt[0].fdr_no).prop('disabled', true).addClass('DisabledControl');
                        $('#txtFolioNo').val(result.dt[0].folio).prop('disabled', true).addClass('DisabledControl');
                        $('#ddlReqType').val('RENEWAL').prop('disabled', true).addClass('DisabledControl');
                        $('#ddlRenewedAmt').val('select').prop('disabled', false).removeClass('DisabledControl');
                        if (result.dt[0].scheme == 'NON-CUMULATIVE')
                        {
                            $('#ddlRenewedAmt option[value="F"]').hide();
                            $('#ddlRenewedAmt').val('P');
                            $('#spnRenewedAmount').text(result.dt[0].amount);
                        }
                        else
                        {
                            $('#ddlRenewedAmt option[value="F"]').show();
                            $('#spnRenewedAmount').text('');
                        }
                        $('#ddlRenewedAmtRemark').val('select').prop('disabled', false).removeClass('DisabledControl');
                        $('#txtReqBatch').val(ReqBatch).prop('disabled', true).addClass('DisabledControl');
                        $('#txtOldBrokerCode').val(result.dt[0].BROK_CODE).prop('disabled', true).addClass('DisabledControl');
                        //$('#txtNewBrokerCode').val(result.Busi_Broker_Cd).prop('disabled', true).addClass('DisabledControl');
                        $('#txtNewBrokerCode').val('').prop('disabled', false).removeClass('DisabledControl');
                        $('#txtReqUser').val($('#lbl_SapCode').text().trim()).prop('disabled', true).addClass('DisabledControl');
                        $('#ddlReqStatus').prop('disabled', true).addClass('DisabledControl');

                        $('#txtName').val(result.dt[0].name).prop('disabled', true).addClass('DisabledControl');
                        $('#txtPremises').val(result.dt[0].add1).prop('disabled', true).addClass('DisabledControl');
                        $('#txtRoadName').val(result.dt[0].add2).prop('disabled', true).addClass('DisabledControl');
                        $('#txtLandmark').val(result.dt[0].add3).prop('disabled', true).addClass('DisabledControl');
                        $('#txtCity').val(result.dt[0].city).prop('disabled', true).addClass('DisabledControl');
                        $('#txtArea').val('').prop('disabled', true).addClass('DisabledControl');

                        $('#txtDepDate').datetextentry('set_date', result.dt[0].fdr_date).datetextentry('set_readonly', true);
                        $('#txtMatDate').datetextentry('set_date', result.dt[0].maturity_date).datetextentry('set_readonly', true);
                        $('#txtDepAmount').val(result.dt[0].amount).prop('disabled', true).addClass('DisabledControl');
                        $('#txtMatAmount').val(result.dt[0].maturity_amount).prop('disabled', true).addClass('DisabledControl');
                        $('#txtScheme').val(result.dt[0].scheme).prop('disabled', true).addClass('DisabledControl');
                        $('#txtIntRate').val(result.dt[0].int_rate).prop('disabled', true).addClass('DisabledControl');
                        $('#txtTenure').val(result.dt[0].tenure).prop('disabled', true).addClass('DisabledControl');

                        $('#txtMicrCd').val(result.dt[0].micr_code).prop('disabled', true).addClass('DisabledControl');
                        $('#txtRtgsCd').val(result.dt[0].neft_code).prop('disabled', true).addClass('DisabledControl');
                        $('#txtBankName').val(result.dt[0].bank_name).prop('disabled', true).addClass('DisabledControl');
                        $('#txtAccountNo').val(result.dt[0].acc_no).prop('disabled', true).addClass('DisabledControl');

                        $('#divSearch').hide();
                        $('#divGetDetails').show();

                        BindUploadedDocs(result.dt[0].fdr_no);
                    }

                } catch (e)
                {
                    fnException(e);
                }
            }, null, true, true, false, ErrorFunction);
        }

    } catch (e)
    {
        fnException(e);
    }
}
const Cancel = function ()
{
    Clear();
    $('#txtSearchFDRNo').val('');
    $('#txtSearchFolio').val('');
    $('#txtSearchPAN').val('');
    $('#txtSearchDOB').datetextentry('set_date', null);
    //$('#tblRequestData').DataTable().destroy();
    $('#tblRequestData tbody').html('<tr style="text-align:center"><td colspan="11">No data available in table</td></tr>');
    //$('#tblRequestData').DataTable({
    //    destroy: true,
    //    initComplete: function ()
    //    {

    //    }
    //});
    $('#divSearch').show();
    $('#divGetDetails').hide();
}
const Clear = function ()
{
    $('#txtReqNo').val('NEW').prop('disabled', false).removeClass('DisabledControl');
    var d = new Date();
    var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var ReqBatch = d.getDate().toString() + (d.getMonth() + 1).toString() + d.getFullYear().toString();
    $('#txtReqDt').datetextentry('set_date', today).datetextentry('set_readonly', false);
    $('#txtDepNo,#txtFolioNo').val('').prop('disabled', false).removeClass('DisabledControl');
    $('#ddlReqType').val('RENEWAL').prop('disabled', false).removeClass('DisabledControl');
    $('#ddlRenewedAmt').val('select').prop('disabled', false).removeClass('DisabledControl');
    $('#spnRenewedAmount').text('');
    $('#ddlRenewedAmtRemark').val('select').prop('disabled', false).removeClass('DisabledControl');
    $('#txtReqBatch').val(ReqBatch).prop('disabled', false).removeClass('DisabledControl');
    $('#txtReqUser,#ddlReqStatus,#txtOldBrokerCode,#txtNewBrokerCode,#txtName,#txtPremises,#txtRoadName,#txtLandmark,#txtCity,#txtArea').val('').prop('disabled', true).removeClass('DisabledControl');

    $('#txtDepDate,#txtMatDate').datetextentry('set_date', null).datetextentry('set_readonly', false);
    $('#txtDepAmount,#txtMatAmount,#txtScheme,#txtIntRate,#txtTenure').val('').prop('disabled', false).removeClass('DisabledControl');

    $('#txtMicrCd,#txtRtgsCd,#txtBankName,#txtAccountNo').val('').prop('disabled', false).removeClass('DisabledControl');

    //$('#txtLoanFlag').val('').prop('disabled', false);

    $('#btnUploadApplicationForm').prop('disabled', false);
    $('#flvApplicationFormUpload').val('');
    $('#msgFormUpload').text('');
    $('#tblRequestData tbody').html('<tr style="text-align:center"><td colspan="11">No data available in table</td></tr>');
};
//file size validation => max 4mb
const FileSizeValidation = function (file)
{
    try
    {
        if (!$.isEmptyObject(file) && Math.round((file.size / 1024 / 1024), 2) > 4.00)
        {
            BtpMessagePopup('<p>Selected document could not be uploaded. Exceeding the maximum file size of 4MB !!</p>', 'error');
            return false;
        }
        return true;

    } catch (e)
    {
        fnException();
    }
}
const BindUploadedDocs = function (FDR_NO)
{
    try
    {
        if (!$.isEmptyObject(FDR_NO))
        {
            ExtendedAjaxCall('RenewApplication/Get_DocsAsync/' + FDR_NO, null, 'GET', function (result)
            {
                try
                {

                    $('#tblDocList > tbody').empty();
                    if (!$.isEmptyObject(result) && result.length > 0)
                    {
                        $.each(result, function (i, data)
                        {
                            let HTML = '';
                            HTML += '<tr>';
                            HTML += '<td colspan="2">' + data.FileName + '</td>';
                            HTML += '<td><button id="' + data.DOC_ID + '" type="button" class="btn btn-red OVD_VIEW" onclick="ViewDocument(this)">View</button></td>';
                            HTML += '<td><button id="' + data.DOC_ID + '" type="button" class="btn btn-red OVD_DELETE" onclick="DeleteDocument(this)">Delete</button></td>';
                            HTML += '</tr>';

                            $('#tblDocList > tbody').append(HTML);

                        });
                    }
                    else
                        $('#tblDocList >tbody').html('<tr class="empty_table"><td style="text-align:center;" colspan="3">No Record..!</td></tr>');

                    $('#preloader').hide();


                } catch (e)
                {
                    fnException(e);
                }
            }, null, null, false, false, ErrorFunction);
        }
    } catch (e)
    {
        fnException(e);
    }
}
const ViewDocument = function (btn)
{
    try
    {
        byteArry = null;
        filename = null;

        $('#IdViewImageDiv')
            .empty()
            .html('');

        var id = $(btn).prop('id');

        ExtendedAjaxCall('RenewApplication/Get_ImgFullscreenAsync/' + id, null, 'GET', function (result)
        {

            if (result != null)
            {
                if (result.fileExt.toLowerCase() == 'pdf')
                {
                    if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1))
                    {
                        //set byteArry and filename
                        byteArry = result.byteArry;
                        filename = result.filename;

                        var _html = "";

                        _html = _html + '<p>You don\'t have Adobe Reader or PDF support in this web browser. </ br> <a id="DocFullscreenOBJ_A" onclick="DownloadFile()">Click here to download the PDF</a>.</p>';

                        $('#IdViewImageDiv').html(_html);

                        var byteCharacters = atob(result.byteArry);
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++)
                        {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var blob = new Blob([byteArray], { type: 'application/pdf' });
                        window.navigator.msSaveOrOpenBlob(blob, result.filename);
                    }
                    else
                    {
                        var _html = '<object id="DocFullscreenOBJ"  type="application/pdf" height="450px" width="100%">';
                        $('#IdViewImageDiv').html(_html);
                        $('#DocFullscreenOBJ').attr('data', '').attr('data', result.doc_base64);
                        $('#Modal_View_Document').modal('show');
                    }
                }
                else
                {
                    var _html = '<object id="DocFullscreenOBJ"  type="application/pdf" height="auto" width="100%" style="max-width:800px;">';
                    $('#IdViewImageDiv').html(_html);
                    $('#DocFullscreenOBJ').attr('data', result.doc_base64);
                    $('#Modal_View_Document').modal('show');
                }


            }

            $('#preloader').hide();
        }, null, null, false, false, ErrorFunction);

    } catch (e)
    {
        fnException(e);
    }
}
const DownloadFile = function ()
{
    try
    {

        var byteCharacters = atob(byteArry);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++)
        {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'application/pdf' });
        window.navigator.msSaveOrOpenBlob(blob, filename);

    } catch (e)
    {
        fnException(e);
    }
}
const DeleteDocument = function (btn)
{
    try
    {
        var FDR_NO = $('#txtDepNo').val();
        var id = $(btn).prop('id');

        if (confirm('Are you sure you want to delete this..?'))
        {
            ExtendedAjaxCall('RenewApplication/Delete_Doc/' + id, null, 'GET', function (result)
            {
                $('#preloader').hide();
                if (result != null)
                {
                }
                BindUploadedDocs(FDR_NO);

                $('#imageFullScreen').attr('src', '');
            }, null, true, false, false, ErrorFunction);
        }
    } catch (e)
    {
        fnException(e);
    }
}
const Save = function ()
{
    try
    {
        let entryBO = {
            FDR_NO: $('#txtDepNo').val(),
            RenewalFor: $('#ddlRenewedAmt').val() == 'select' ? null : $('#ddlRenewedAmt').val(),
            BatchNo: $('#txtReqBatch').val(),
            NewBrokerCode: $('#txtNewBrokerCode').val()
        }

        ExtendedAjaxCall('RenewApplication/Save_Renewal_Request_Entry', entryBO, 'POST', function (result)
        {
            try
            {

                $('#preloader').hide();
                var htmlstr = "";
                if (result != null && typeof (result) != 'undefined' && result.status == '1' && !$.isEmptyObject(result.msg))
                {
                    BtpMessagePopup('Renewal request entry generated successfully', 'success');
                    Cancel();
                }
                else if (result != null && typeof (result) != 'undefined' && result.status == '0' && !$.isEmptyObject(result.msg))
                {
                    BtpMessagePopup(result.msg, 'error');
                }
                else
                {
                    BtpMessagePopup('', 'error');
                }


            } catch (e)
            {
                fnException(e);
            }
        }, null, true, true, false, ErrorFunction);

    } catch (e)
    {
        throw e;
    }
}

$(document).ready(function ()
{
    $('#DV_MSG_CENTER').show();
    $('#divGetDetails').hide();
    Clear();
});

$("#txtNewBrokerCode").autocomplete({
    minLength: 1,
    source: function (request, response)
    {
        ExtendedAjaxCall("DataEntry/GetBrokerDtlAsync/" + $("#txtNewBrokerCode").val(), null, 'GET', function (data)
        {
            try
            {
                if (!$.isEmptyObject(data))
                {
                    response($.map(data, function (item)
                    {
                        return {
                            label: item.LABEL,
                            value: item.CODE,
                            CODE: item.CODE,
                            NAME: item.NAME

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
            $(this).val("");
            return false;
        } else
        {
            $(this).val(ui.item.CODE);
        }
    },
    focus: function (event, ui)
    {
        event.preventDefault();
    }
});
$('#btnSearchRenewalRequest').click(function ()
{
    try
    {
        if ($.isEmptyObject($('#txtSearchFDRNo').val())
            && $.isEmptyObject($('#txtSearchFolio').val())
            && $.isEmptyObject($('#txtSearchPAN').val())
            && $.isEmptyObject($('#txtSearchDOB').val()))
        {
            BtpMessagePopup('Please select search criteria', 'error');
            return false;
        }

        if (!$.isEmptyObject($('#txtSearchPAN').val())
            && $.isEmptyObject($('#txtSearchDOB').val()))
        {
            BtpMessagePopup('Please enter DOB', 'error');
            return false;
        }

        if ($.isEmptyObject($('#txtSearchPAN').val())
            && !$.isEmptyObject($('#txtSearchDOB').val()))
        {
            BtpMessagePopup('Please enter PAN', 'error');
            return false;
        }

        let requestBO = {
            FDR: $('#txtSearchFDRNo').val(),
            FOLIO: $('#txtSearchFolio').val(),
            PAN: $('#txtSearchPAN').val(),
            DOB: $('#txtSearchDOB').val()
        }

        ExtendedAjaxCall('RenewApplication/GetDashboardAsync', requestBO, 'POST', function (result)
        {
            try
            {

                let htmlstr = "";
                if (!$.isEmptyObject(result) && !$.isEmptyObject(result.dt))
                {
                    $.each(result.dt, function (i, row)
                    {
                        htmlstr += '<tr class="text-center">';
                        if (row.ref_renw_flg)
                        {
                            htmlstr += '<td><button type="button" class="comnBtn2"  onclick="GetData(this)"  value="' + $.trim(row.fdr_no) + '">Renew</button></td>';
                        }
                        else
                        {
                            htmlstr += '<td></td>';
                        }
                        htmlstr += '<td>' + row.fdr_no + '</td>';
                        htmlstr += '<td>' + row.display_fdr_date + '</td>';
                        htmlstr += '<td>' + row.amount + '</td>';
                        htmlstr += '<td>' + row.name + '</td>';
                        htmlstr += '<td>' + row.scheme + '</td>';
                        htmlstr += '<td>' + row.tenure + '</td>';
                        htmlstr += '<td>' + row.int_rate + '</td>';
                        htmlstr += '<td>' + row.maturity_amount + '</td>';
                        htmlstr += '<td>' + row.display_maturity_date + '</td>';
                        htmlstr += '<td>' + row.ref_renw_status + '</td>';
                        htmlstr += '</tr>';
                    });
                }
                else
                {
                    htmlstr = '<tr style="text-align:center"><td colspan="11">The select FDR/Folio is not due for renewal</td></tr>';
                }

                $('#tblRequestData tbody').html(htmlstr);

                $('#preloader').hide();

            } catch (e)
            {
                fnException(e);
            }
        }, null, true, true, false, ErrorFunction);

    } catch (e)
    {
        fnException(e);
    }
});
$('#btnClear').click(function ()
{
    $('#txtSearchFDRNo').val('');
    $('#txtSearchFolio').val('');
    $('#txtSearchPAN').val('');
    $('#txtSearchDOB').datetextentry('set_date', null);
    $('#tblRequestData tbody').html('<tr style="text-align:center"><td colspan="11">No data available in table</td></tr>');

    $('#divSearch').show();
    $('#divGetDetails').hide();
});
//files upload control
$('#flvApplicationFormUpload').on('change', function (e)
{
    try
    {
        $.each(this.files, function (i, file)
        {
            if (file.name.split('.').length == 2)
            {
                let ext = file.name.split('.')[1];
                if ($.inArray(file.type.toLowerCase(), ['image/jpg', 'image/jpeg', 'application/pdf', 'image/tiff', 'image/tif']) == -1
                    || $.inArray(ext.toLowerCase(), ['jpg', 'jpeg', 'pdf', 'tiff', 'tif']) == -1)
                {

                    $('#flvApplicationFormUpload').val('');
                    BtpMessagePopup('<p>File should be jpg, jpeg, pdf, tiff, tif</p>', 'error');

                } else if (!FileSizeValidation(file))
                {
                    $('#flvApplicationFormUpload').val('');
                }
            }
            else
            {
                $('#flvApplicationFormUpload').val('');
                BtpMessagePopup('<p>Incorrect file name, Please upload valid file</p>', 'error');
            }

        });
    } catch (e)
    {
        fnException(e);
    }
});
//files upload button
$('#btnUploadApplicationForm').click(function ()
{
    this.disabled = true;
    $('#msgFormUpload').text('');

    try
    {
        if ($.isEmptyObject($('#txtDepNo').val()))
        {
            BtpMessagePopup('<p>DEP NO can not be empty..!</p>', 'error');
            return false;
        }

        if ($('#flvApplicationFormUpload')[0].files.length == 0)
        {
            BtpMessagePopup('<p>Please select file to upload..!</p>', 'error');
            return false;
        }

        let FDR_NO = $('#txtDepNo').val();

        let seq = 0;
        $.each($('#flvApplicationFormUpload')[0].files, function (i, file)
        {
            seq++;
            let _DocUpload = new FormData();

            _DocUpload.append("FDRNo", FDR_NO);
            _DocUpload.append("Doc_File", file)
            _DocUpload.append("DocSequenceNo", seq);

            $.ajax({
                url: WA_FD_BTP + 'RenewApplication/Save_Docs',
                type: "POST",
                data: _DocUpload,
                async: false,
                contentType: false,
                processData: false,
                beforeSend: function ()
                {
                    $('#msgFormUpload').text('Uploading...').show();
                },
                success: function (result)
                {
                    if (!$.isEmptyObject(result) && result.validResponse)
                    {
                        $('#msgFormUpload').show().text(result.msg).fadeIn('slow').delay(20000).hide(1);
                    }
                    else if (!$.isEmptyObject(result) && !result.validResponse)
                    {
                        BtpMessagePopup(result.msg, 'error');
                        $('#msgFormUpload').show().text(result.msg).fadeIn('slow').delay(20000).hide(1);
                        $('#flvApplicationFormUpload').focus();
                    }
                    else
                    {
                        BtpMessagePopup('<p>Something went wrong, Please try again..!</p>', 'error');
                        $('#flvApplicationFormUpload').focus();
                    }

                    //Hide Preloader
                    if ($('#flvApplicationFormUpload')[0].files.length == (i + 1))
                    {

                        BindUploadedDocs(FDR_NO);
                        $('#btnUploadApplicationForm').prop('disabled', false);
                        $('#flvApplicationFormUpload').val('');
                        $('#preloader').hide();
                    }
                },
                error: ErrorFunction,
                complete: null
            });
        });


        this.disabled = false;

    } catch (e)
    {
        this.disabled = false;
        fnException(e);
    }

});
$('#btnSave').click(function ()
{
    try
    {
        let err_msg = '';
        $('.form-control').removeClass('InputBorderRed');

        if ($('#ddlRenewedAmt').val() == 'select')
        {
            $('#ddlRenewedAmt').addClass('InputBorderRed');
            err_msg += '<p>Please Select Renewal Option</p>';
        }
        else
        {
            if ($('#ddlRenewedAmtRemark').val() == 'select')
            {
                $('#ddlRenewedAmtRemark').addClass('InputBorderRed');
                err_msg += '<p>Please Approve or Reject the Amount to be Renewed</p>';
            }
            else if ($('#ddlRenewedAmtRemark').val() == 'R')
            {
                $('#ddlRenewedAmtRemark').addClass('InputBorderRed');
                err_msg += '<p>Please verify with application form and proceed again</p>';
                BtpMessagePopup(err_msg, 'error');
                Cancel();
                return;
            }
        }
        if ($.isEmptyObject($('#txtNewBrokerCode').val()))
        {
            $('#txtNewBrokerCode').addClass('InputBorderRed');
            err_msg += '<p>Please select Broker Code</p>';
        }
        else if (!Is_Valid_Emp_Or_Broker_Code($('#txtNewBrokerCode').val()))
        {
            err_msg += '<p>Please select valid Broker Code</p>';
        }

        if (!$.isEmptyObject(err_msg))
        {
            BtpMessagePopup(err_msg, 'error');
            return;
        }

        ShowMessage();


    } catch (e)
    {
        fnException(e);
    }
});
$('#btnCancel').click(function ()
{
    Cancel();
});
$('#ddlRenewedAmt').change(function ()
{
    if (this.value == 'P')
    {
        $('#spnRenewedAmount').text($('#txtDepAmount').val());
    }
    else if (this.value == 'F')
    {
        $('#spnRenewedAmount').text($('#txtMatAmount').val());
    }
});
