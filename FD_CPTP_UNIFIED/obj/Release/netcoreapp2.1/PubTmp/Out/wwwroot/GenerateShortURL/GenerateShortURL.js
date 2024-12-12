$('#tblApplData').DataTable({
    destroy: true,
    //"order": [[2, "asc"]],
    initComplete: function () {

    }
});

$(document).ready(function () {

    BindGrid();
});

function BindGrid() {
    try {

        ExtendedAjaxCall('GenerateShortURL/GetApplicationForShortURL/', null, 'GET', function (result) {
            var htmlstr = "";
            if (result != null && typeof (result) != 'undefined') {
                $.each(result, function (i, row) {
                    htmlstr += '<tr class="text-center">';
                    //htmlstr += '<td><button type="button" class="comnBtn2" style="margin:0"  onclick="GetData(this)"  value="' + $.trim(row.ApplNo) + '">Generate</button></td>';
                    htmlstr += '<td><button type="button" class="comnBtn2" style="margin:0"  onclick="GetData(this)"  value="' + $.trim(row.ApplNo) + '/' + row.action + '">' + row.action + '</button></td>';
                    htmlstr += '<td>' + row.paymentmode + '</td>';
                    htmlstr += '<td>' + row.ApplNo + '</td>';
                    htmlstr += '<td>' + row.ApplDate + '</td>';
                    htmlstr += '<td>' + row.Amount + '</td>';
                    htmlstr += '<td>' + row.fullname + '</td>';
                    htmlstr += '<td>' + row.pan + '</td>';
                    htmlstr += '<td>' + row.mobile + '</td>';
                    htmlstr += '<td>' + row.email + '</td>';
                    htmlstr += '<td>' + row.Scheme + '</td>';
                    htmlstr += '<td>' + row.Category + '</td>';
                    htmlstr += '<td>' + row.Tenure + '</td>';
                    htmlstr += '<td>' + row.Int_Rate + '</td>';
                    htmlstr += '<td>' + row.Created_By + '</td>';
                    htmlstr += '<td>' + row.Created_Date + '</td>';
                    htmlstr += '</tr>';
                });

            }
            $('#tblApplData').DataTable().destroy();
            $('#tblApplData tbody').html(htmlstr);
            $('#tblApplData').DataTable({
                destroy: true,
                //"order": [[2, "asc"]],
                initComplete: function () {

                }
            });

            $('#preloader').hide();
        }, null, true, true, false, ErrorFunction);

    } catch (e) {
        fnException(e);
    }
}

function GetData(e) {
    try {

        var arr = e.value.split('/');
        //var ApplNo = e.value;
        var ApplNo = arr[0];
        var Action = arr[1];

        var payment_mode = $($(e).closest('tr').find('td')[1]).text();
        $("#hdnApplNo").val(ApplNo);
        $("#hdnPayment_mode").val(payment_mode);

        if (Action == "REGENERATE") {
            $('#ModelPopup_Regenerate').modal('show');
            return false;
        }
        SendData(ApplNo, payment_mode);

    } catch (e) {
        fnException(e);
    }
}

//avinash added
$("#Regenerate_YES").click(function (e) {
    var ApplNo = $("#hdnApplNo").val();
    var payment_mode = $("#hdnPayment_mode").val();
    SendData(ApplNo, payment_mode);
});
$("#Regenerate_NO").click(function (e) {
    $('#ModelPopup_Regenerate').modal('hide');
    return false;
});

function SendData(ApplNo, payment_mode) {
    if (payment_mode.toUpperCase() == 'ONLINE' || payment_mode.toUpperCase() == '1' || payment_mode.toUpperCase() == 'ONLINE PAYMENT') {
        ExtendedAjaxCall('GenerateShortURL/GenerateShortURL/ShortURL/' + ApplNo, null, 'GET', function (result) {
            $('#preloader').hide();

            if (result != null) {
                if (result.URL_Status == "1") {
                    MessageCenter(result.Msg, 'success');
                    $('#lblErrorMsg').css('color', 'green');

                }
                else {
                    MessageCenter(result.Msg, 'error');
                }
            }
            else {
                MessageCenter("Something went wrong", 'error');
            }

            BindGrid();

        }, null, true, true, false, ErrorFunction);
    }
    else
    //else if (payment_mode.toUpperCase() == 'RTGS/NEFT') {        
    {
        ExtendedAjaxCall('GenerateShortURL/GenerateShortURL/InvestmentDeclaration/' + ApplNo, null, 'GET', function (result) {
            $('#preloader').hide();

            if (result != null) {
                if (result.URL_Status == "1") {
                    MessageCenter(result.Msg, 'success');
                    $('#lblErrorMsg').css('color', 'green');

                }
                else {
                    MessageCenter(result.Msg, 'error');
                }
            }
            else {
                MessageCenter("Something went wrong", 'error');
            }

            BindGrid();

        }, null, true, true, false, ErrorFunction);

    }
}