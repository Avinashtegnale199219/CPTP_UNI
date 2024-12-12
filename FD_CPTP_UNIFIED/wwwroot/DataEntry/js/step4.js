//step4 submit  avinash added
const SubmitStep4 = function () {
    $('#Model_TPV_Msg').modal('show');
}

//step4 submit
const SaveStep4Details = function () {
    try {
        let err_msg = isValidStep4();

        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }

        //Investor Bank Details
        let Bank_Dtl = getStep4Data();

        ExtendedAjaxCall('InvestorDetailsSave/SubmitStep4', Bank_Dtl, 'POST', function (result) {
            try {
                if (!$.isEmptyObject(result) && result.Status == 1)
                    BTP_OBJECT.BankDetailsSave = true;
                else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg))
                    err_msg += '<p>' + result[0].Msg + '</p>';
                else
                    err_msg += '<p>Something went wrong..!</p>';

                $('#preloader').hide();

            } catch (e) {
                fnException(e);
            }
        }, null, true, false, false, ErrorFunction);

        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }

        return true;
    } catch (e) {
        fnException(e); return false;
    }
}

//step4 save validations
const isValidStep4 = function () {
    let err_msg = "";
    try {
        $('.BANK_DTLS').removeClass('InputBorderRed');
        let BANK_DTLS = $('.BANK_DTLS');
        for (let i = 0; i < BANK_DTLS.length; i++) {
            let BANK_DTL = $(BANK_DTLS[i]);
            if (BANK_DTL.prop('required') && ($.isEmptyObject(BANK_DTL.val()) || BANK_DTL.val() == 'select')) {
                err_msg += "<p>" + BANK_DTL.attr('errmsg') + "</p>";
                BANK_DTL.addClass('InputBorderRed');
            }
        }

        let IsCancelChequeUploadedMsg = IsCancelChequeUploaded();
        if (!$.isEmptyObject(IsCancelChequeUploadedMsg) && !BTP_OBJECT.IsProvBank) {
            err_msg += IsCancelChequeUploadedMsg;
        }

    } catch (e) {
        fnException(e);
    }
    return err_msg;
}

//get step4 data for save
const getStep4Data = function () {
    let Bank_Dtl = {};
    try {

        Bank_Dtl.Appl_No = $('#lblApplicationNumber').text().trim();
        Bank_Dtl.MICRCode = $('#txtMICRCode').val().trim();
        Bank_Dtl.NEFTCode = $('#txtNEFTCode').val().trim();
        Bank_Dtl.BankName = $('#txtBankName').val().trim();
        Bank_Dtl.BranchName = $('#txtBranchName').val().trim();
        Bank_Dtl.BankAccountNo = $('#txtBankAccountNo').val().trim();
        Bank_Dtl.FolioNo = $('#hdrFolioNo').text().trim();
        Bank_Dtl.FDRNo = $('#hdrExistingFDRNo').text().trim();
        Bank_Dtl.LastInvDate = $('#hdrLastInvDate').text().trim();
        Bank_Dtl.FolioNo = $('#lblFolioNumber').text().trim();
        Bank_Dtl.FDRNo = $('#lblExistingFDRNumber').text().trim();
        Bank_Dtl.LastInvDate = $('#lblLastInvestmentDate').text().trim();
        Bank_Dtl.IsProvBank = BTP_OBJECT.IsProvBank;

    } catch (e) {
        fnException(e);
    }
    return Bank_Dtl;
}

//reset step4
const Reset_step4 = function () {
    BTP_OBJECT.IsProvBank = false;
    $('.errorbox').text('').hide();
    $('#ddlProvBank').val('select');
    $('#txtSearchBank,#txtBankName,#txtBranchName,#txtMICRCode,#txtNEFTCode,#txtBankAccountNo,#txtConfirmBankAccountNo').val('');

    $('#txtBankAccountNo').prop('disabled', false).removeClass('DisabledControl');
    $('#txtConfirmBankAccountNo').prop('disabled', false).removeClass('DisabledControl');

    if (!$.isEmptyObject($('#lblFolioNumber').text())) {
        $('#DV_PROV_BANK').show();
        $('#DV_Srch_Bank,.ClsUploadChqCopy').show();
        $('#DV_BANK_DTLS').hide();
    }
    else {
        $('#DV_PROV_BANK').hide();
        $('#DV_Srch_Bank,.ClsUploadChqCopy').show();
        $('#DV_BANK_DTLS').show();
    }
    $('#DV_OR_ADD_NEW').hide();
}

//application form upload validation
const ValidateFileUploadCancelledChequeCopy = function () {
    try {
        let isValid = true;
        let ErrorHtml = "";
        let ApplicationNumber = $('#lblApplicationNumber').text();

        if ($.isEmptyObject(ApplicationNumber)) {
            ErrorHtml += '<p>Application number is required..!</p>';;
            isValid = false;
        }

        if ($('#flvCancelledChequeCopy').get(0).files.length == 0 || $.isEmptyObject($('#flvCancelledChequeCopy').get(0).files)) {
            ErrorHtml += '<p>Please select file to upload..!</p>';;
            isValid = false;
        }

        if (!isValid) {
            BtpMessagePopup(ErrorHtml, 'error');
            return false;
        }
        return true;

    } catch (e) {
        fnException(e); return false;
    }
}

//OVD validations
const IsCancelChequeUploaded = function () {
    let err_msg = '';
    try {
        let IsCancelChequeUploaded = false;

        let appNo = $('#lblApplicationNumber').text().trim();
        if (!$.isEmptyObject(appNo)) {
            ExtendedAjaxCall('DocumentUpload/Get_KYCDocumentAsync?_ApplNo=' + appNo, null, 'GET', function (result) {
                if (!$.isEmptyObject(result)) {

                    $.each(result, function (i, row) {
                        if (row.Doc_Type == 'BANK')
                            IsCancelChequeUploaded = true;
                    });
                }

                $('#preloader').hide();
            }, null, true, false, false, ErrorFunction);
        }

        if (!IsCancelChequeUploaded && $('.ClsUploadChqCopy').css('display') == 'block')
            err_msg += "<p>Please Upload Cancelled Cheque Copy..!</p>";

    } catch (e) {
        fnException(e);
    }
    return err_msg;
}

//step4 click
$('#IdBtnTabSwit04').click(function () {
    try {
        if (!$.isEmptyObject($('#lblFolioNumber').text())) {
            $('#DV_Srch_Bank,.ClsUploadChqCopy').hide();
            let objBO = {
                Folio: $('#lblFolioNumber').text()
            };

            BindDDLExtendedAjaxCall('#ddlProvBank', 'HolderDetails/GetProvBankDtlsAsync', objBO, 'POST', null, null, true, false, false, ErrorFunction);

            if ($.isEmptyObject($('#txtBankName').val())) {
                $('#DV_PROV_BANK').show();
                $('#DV_Srch_Bank,.ClsUploadChqCopy').show();
                $('#DV_BANK_DTLS').hide();
            }
            else {
                $('#DV_PROV_BANK').hide();
                $('#DV_Srch_Bank,.ClsUploadChqCopy').hide();
                $('#DV_BANK_DTLS').show();
            }
        }
        else {
            $('#DV_Srch_Bank,.ClsUploadChqCopy').show();
            $('#DV_PROV_BANK').hide();
            $('#DV_BANK_DTLS').show();
        }

    } catch (e) {
        fnException(e); return false;
    }
});

//provisional bank change
$('#ddlProvBank').change(function () {
    try {
        if (!$.isEmptyObject(this.value) && this.value != 'select') {
            let objBO = {
                Id: this.value
            };

            ExtendedAjaxCall('HolderDetails/GetProvBankDtlsAsync', objBO, 'POST', function (result) {
                if (!$.isEmptyObject(result)) {
                    BTP_OBJECT.IsProvBank = true;
                    $('#txtMICRCode').val(result[0].MICR);
                    $('#txtNEFTCode').val(result[0].NEFT);
                    $('#txtBankName').val(result[0].BankName);
                    $('#txtBranchName').val(result[0].BranchName);
                    $('#txtBankAccountNo').val(result[0].AccNo).prop('disabled', true).addClass('DisabledControl');
                    $('#txtConfirmBankAccountNo').val(result[0].AccNo).prop('disabled', true).addClass('DisabledControl');

                    $('#DV_Srch_Bank,.ClsUploadChqCopy').hide();
                    $('#DV_PROV_BANK').hide();
                    $('#DV_BANK_DTLS').show();
                    $('#DV_OR_ADD_NEW').show();
                }

                $('#preloader').hide();
            }, null, true, false, false, ErrorFunction);
        }

    } catch (e) {
        fnException(e); return false;
    }
});

//add new bank
$('#btnAddNewBank').click(function () {
    $('#DV_Srch_Bank,.ClsUploadChqCopy').show();
    BTP_OBJECT.IsProvBank = false;
    $('#DV_PROV_BANK').hide();
    $('#DV_BANK_DTLS').show();
});

$('#txtBankAccountNo').keyup(function () {
    try {
        $(this).next().text('').hide();
        if (this.value.length < 8 && !$.isEmptyObject(this.value))
            $(this).next().text('Account Number cannot be less than 8 digit').show();

        let txtConfirmBankAccountNo = $('#txtConfirmBankAccountNo').val();
        if (!$.isEmptyObject(this.value) && !$.isEmptyObject(txtConfirmBankAccountNo) && this.value != txtConfirmBankAccountNo)
            $(this).next().text('Bank Account Number does not match').show();

    } catch (e) {
        fnException(e); return false;
    }
});

$('#txtConfirmBankAccountNo').keyup(function () {
    try {
        $(this).next().text('').hide();
        let txtBankAccountNo = $('#txtBankAccountNo').val();
        if (!$.isEmptyObject(this.value) && !$.isEmptyObject(txtBankAccountNo) && this.value != txtBankAccountNo)
            $(this).next().text('Bank Account Number does not match').show();

    } catch (e) {
        fnException(e); return false;
    }
});

$('#btnCancel04,#btnOrAddNewBank').bind('click', Reset_step4);

//Application form upload button
$('#btnUploadCancelledChequeCopy').click(function () {
    this.disabled = true;

    try {
        //$('#msgFormUpload').text('');

        if (ValidateFileUploadCancelledChequeCopy()) {
            let App_No = $('#lblApplicationNumber').text();
            let flvUpload = $('#flvCancelledChequeCopy').get(0).files;
            let FDRNo = $('#lblExistingFDRNumber').text();
            let FolioNo = $('#lblFolioNumber').text();
            let LastInvDate = $('#lblLastInvestmentDate').text();
            let Depositor_Status_Code = $('#ddlDepositorsStatus').val();

            let _DocUpload = new FormData();
            _DocUpload.append("App_No", App_No)
            _DocUpload.append("Doc_File", flvUpload[0])
            _DocUpload.append("State", State);
            _DocUpload.append("Status", Status);
            _DocUpload.append("FolioNo", FolioNo);
            _DocUpload.append("FDRNo", FDRNo);
            _DocUpload.append("LastInvDate", LastInvDate);
            _DocUpload.append("Depositor_Status_Code", Depositor_Status_Code);

            //avinash added
            _DocUpload.append("DocType", "BANK");
            _DocUpload.append("DocSubType", "CANCEL_CHEQUE");
            _DocUpload.append("HolderType", "01");
            _DocUpload.append("DocSequenceNo", "1");

            //document upload request log
            DocumentUploadLog('Request', $('#ddlDepositorsStatus').val(), App_No, '01', 'BANK', 'CANCEL_CHEQUE', FDRNo, FolioNo);

            $.ajax({
                url: WA_FD_BTP + 'DocumentUpload/SaveCancelledChequeCopy',
                type: "POST",
                data: _DocUpload,
                async: true,
                contentType: false,
                processData: false,
                beforeSend: OnBeforeSendCall,
                success: function (result) {
                    if (!$.isEmptyObject(result) && result.validResponse) {
                        //$('#msgFormUpload').hide().text(result.msg).fadeIn('slow').delay(5000).hide(1);
                        BtpMessagePopup(result.msg, 'success');
                    }
                    else if (!$.isEmptyObject(result) && !result.validResponse) {
                        let htmlMsg = '<p>' + result.msg + '</p>';
                        BtpMessagePopup(htmlMsg, 'error');
                        $('#flvCancelledChequeCopy').focus();
                    }
                    else {
                        BtpMessagePopup('<p>Something went wrong, Please upload again..!</p>', 'error');
                        $('#flvCancelledChequeCopy').focus();
                    }

                    $('#flvCancelledChequeCopy').val('');
                    $('#preloader').hide();
                    //refresh ovd details
                    BindOVD(App_No);
                    //document upload response log
                    DocumentUploadLog('Response', $('#ddlDepositorsStatus').val(), App_No, '01', 'BANK', 'CANCEL_CHEQUE', FDRNo, FolioNo);
                },
                error: ErrorFunction,
                complete: null
            });

        }

    } catch (e) {
        this.disabled = false;
        fnException(e); return false;
    }
    this.disabled = false;
});

//Application form file upload control
$('#flvCancelledChequeCopy').on('change', function (e) {
    try {
        let fileNameSplit = $(this)[0].files[0].name.split('.');
        if (!$.isEmptyObject(fileNameSplit)) {
            let isValidFileName = fileNameSplit.length != 2 ? false : true;
            if (isValidFileName) {
                let type = $(this)[0].files[0].type;
                let ext = $(this)[0].files[0].name.split('.')[1];

                if ($.inArray(type, ['image/jpg', 'image/jpeg', 'image/tiff', 'image/tif', 'application/pdf']) == -1
                    || $.inArray(ext.toLowerCase(), ['jpg', 'jpeg', 'pdf', 'tiff', 'tif']) == -1) {

                    $(this).val('');
                    BtpMessagePopup('<p>File should be jpg, jpeg, pdf, tiff, tif</p>', 'error');

                }
                else if (FileSizeValidation($(this).get(0).files)) {
                    $(this).text('');
                    let filename = '';
                    if (!$.isEmptyObject($(this)[0].files)) {
                        filename = $(this)[0].files['0'].name;
                    }
                }
            }
            else {
                $(this).val('');
                BtpMessagePopup('<p>Incorrect file name, Please upload valid file</p>', 'error');
            }
        }
    }
    catch (e) {
        fnException(e); return false;
    }
});

//avinash added
$('#btn_TPV_OK').click(function () {
    if (SaveStep4Details()) {
        if (stepper.maxTabIndex == stepper.activeTabIndex)
            stepper.maxTabIndex += 1

        $('#IdBtnTabSwit05').click();
        //$('#IdBtnTabSwit04').css('border-color', '#047904');
        $('#IdBtnTabSwit04').parent().addClass('Active');
    }
});