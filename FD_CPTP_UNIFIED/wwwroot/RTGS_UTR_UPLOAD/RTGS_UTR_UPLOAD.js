$('#tableRtgsUtrUpload').DataTable({
    destroy: true,
    initComplete: function () {
        $("#preloader").hide();
    }
});

$(document).ready(function () {
    GetRtgsUtrDetails();
});

function GetRtgsUtrDetails() {
    $('#divErrorMsg').css('display', 'none');
    //$('#tbodyRtgsUtrUploadList').html('');
    var html = '';
    ExtendedAjaxCall('RTGS_UTR_Upload/GetRtgsUtrDetails', null, 'GET', function (result) {
        if (result.success) {
            if (result.rtgsUtrDetailsList != null && result.rtgsUtrDetailsList.length > 0) {
                $.each(result.rtgsUtrDetailsList, function (i, row) {
                    html += "<tr>"
                    html += "<td>" + row.Appl_No + "</td>";
                    html += "<td>" + row.Name + "</td>";
                    html += "<td>" + row.Amount + "</td>";
                    html += "<td>" + row.Txn_Date + "</td>";
                    html += "<td class='text-center'><button type='button' class='comnBtn2' style='margin:0' onclick='btnOpenUploadFilePopup(`" + row.Appl_No + "`)'>Upload</button></td>";
                    html += "</tr>";
                });
            }
            else {
                $('#divErrorMsg').css('display', 'block');
                $("#lblRtgsError").text("No Records Found.");
            }

            $('#tableRtgsUtrUpload').DataTable().destroy();
            $('#tableRtgsUtrUpload > tbody').html(html);
            $('#tableRtgsUtrUpload').DataTable({
                destroy: true,
                initComplete: function () {
                    $("#preloader").hide();
                }
            });

        }
        else {
            $('#divErrorMsg').css('display', 'block');
            $("#lblRtgsError").text("Something went wrong.");
        }
    }, null, null, function () {
        OnComplete();
    });
}

function btnOpenUploadFilePopup(ApplNo) {
    $('#txtUtrNo').val('');
    $("#hdnApplNo").val(ApplNo);
    $("#ErrUtrNo").text('');
    $("#ErrFileUpload").text('');
    $('#fileUpload').replaceWith($('#fileUpload').val('').clone(true));
    $("#MdlUploadRtgsUtr").modal('show');
}

$('#btnSaveFile').click(function () {
    $(this).prop('disabled', true);

    try {
        var flvUpload = $('#fileUpload').get(0).files;
        if (Validate(flvUpload[0])) {

            var Appl_No = $('#hdnApplNo').val().trim();
            var UTR_No = $('#txtUtrNo').val().trim();
            var _DocUpload = new FormData();
            _DocUpload.append("Appl_No", Appl_No)
            _DocUpload.append("UTR_No", UTR_No)
            _DocUpload.append("Doc_File", flvUpload[0])
            $.ajax({
                url: 'RTGS_UTR_Upload/UploadImage',
                type: "POST",
                data: _DocUpload,
                async: true,
                contentType: false,
                processData: false,
                success: function (result) {
                    $('#preloader').hide();
                    if (result.success) {
                        GetRtgsUtrDetails();
                        $("#MdlUploadRtgsUtr").modal('hide');
                        $("#MdlSuccess").modal('show');
                        $("#lblMdlSuccessText").text('File uploaded Successfully.');
                    }
                    else {
                        $("#ErrBtnSave").text(result.msg);
                    }
                }
            });
        }

    }
    catch (e) {
        $('#preloader').hide();
        console.error(e);
    }
    $(this).prop('disabled', false);
});

function Validate(file) {
    $("#ErrUtrNo").text('');
    $("#ErrFileUpload").text('');
    if ($('#txtUtrNo').val() == "" || $('#txtUtrNo').val() == "undefined") {
        $("#ErrUtrNo").text("Please enter Utr Number.");
        return false;
    }
    else if (!FileSizeValidation2(file)) {
        $("#ErrFileUpload").text("Please upload file.");
        return false;
    }
    else {
        return true;
    }

}

function FileSizeValidation2(file) {
    debugger;
    if (typeof (file) != 'undefined' && file.name.length > 0) {
        var filesize = Math.round((file.size / 1024 / 1024), 2);
        if (filesize > 5.00) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

