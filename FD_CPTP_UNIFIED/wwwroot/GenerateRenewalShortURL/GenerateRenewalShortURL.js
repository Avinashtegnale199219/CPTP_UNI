$('#tblApplData').DataTable({
    destroy: true,
    //"order": [[2, "asc"]],
    initComplete: function () {

    }
});

$(document).ready(function () {
    BindGrid();
});

const BindGrid = function () {
    try {

        ExtendedAjaxCall('GenerateRenewalShortURL/GetApplicationForShortURL/', null, 'GET', function (result) {
            var htmlstr = "";
            if (result != null && typeof (result) != 'undefined') {
                $.each(result, function (i, row) {
                    htmlstr += '<tr class="text-center">';
                  //  htmlstr += '<td><button type="button" class="comnBtn2" style="margin:0"  onclick="GetData(this)"  value="' + $.trim(row.ApplNo) + '">Generate</button></td>';
                    htmlstr += '<td><button type="button" class="comnBtn2" style="margin:0"  onclick="GetData(this)"  value="' + $.trim(row.ApplNo) + '/' + row.action + '">' + row.action + '</button></td>';
                    htmlstr += '<td>' + row.old_fdr_no + '</td>';
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

const GetData = function (e) {
    try {

        //var ApplNo = e.value;
        var arr = e.value.split('/');
        var ApplNo = arr[0];
        var Action = arr[1];

        $("#hdnApplNo_Rene").val(ApplNo);
        if (Action == "REGENERATE") {
            $('#ModelPopup_Regenerate_Renewal').modal('show');
            return false;
        }
        SendData_Renewal(ApplNo);

    } catch (e) {
        fnException(e);
    }
}

//avinash added
function SendData_Renewal(ApplNo) {
    ExtendedAjaxCall('GenerateRenewalShortURL/InvestmentDeclaration/' + ApplNo, null, 'GET', function (result) {
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

//avinash added
$("#Regenerate_YES_REN").click(function (e) {
    var ApplNo = $("#hdnApplNo_Rene").val();
    SendData_Renewal(ApplNo);
});
$("#Regenerate_NO_REN").click(function (e) {
    $('#ModelPopup_Regenerate_Renewal').modal('hide');
    return false;
});