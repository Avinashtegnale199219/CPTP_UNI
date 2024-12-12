var PANUpload = false;
var SHPANUpload = false;
var THPANUpload = false;
var byteArr = null;
var filename = null;

$('#txtSuffix').on("input", function () {
    var regexp = /[^0-9]/g;
    if ($(this).val().match(regexp)) {
        $(this).val($(this).val().replace(regexp, ''));
    }
});

//view uploaded document
const ViewDocument = function (btn) {
    try {
        byteArry = null;
        filename = null;

        $('#IdViewImageDiv').empty()

        let id = $(btn).prop('id');

        ExtendedAjaxCall('DocumentUpload/Get_ImgFullscreen?_id=' + id, null, 'GET', function (result) {
            if (result != null) {
                if (result.fileExt.toLowerCase() == 'pdf') {
                    if (navigator.appName == 'Microsoft Internet Explorer' || !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
                        //set byteArry and filename
                        byteArry = result.byteArry;
                        filename = result.filename;

                        let _html = "";
                        _html = _html + '<p>You don\'t have Adobe Reader or PDF support in this web browser. </ br> <a id="DocFullscreenOBJ_A" onclick="DownloadFile()">Click here to download the PDF</a>.</p>';

                        $('#IdViewImageDiv').html(_html);

                        let byteCharacters = atob(result.byteArry);
                        let byteNumbers = new Array(byteCharacters.length);
                        for (let i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        let byteArray = new Uint8Array(byteNumbers);
                        let blob = new Blob([byteArray], { type: 'application/pdf' });
                        window.navigator.msSaveOrOpenBlob(blob, result.filename);
                    }
                    else {

                        let _html = '<object id="DocFullscreenOBJ"  type="application/pdf" height="450px" width="100%">';

                        $('#IdViewImageDiv').html(_html);
                        $('#DocFullscreenOBJ').attr('data', '');
                        $('#DocFullscreenOBJ').attr('data', result.doc_base64);
                        $('#Modal_View_Document').modal('show');
                    }
                }
                else {
                    let _html = '<object id="DocFullscreenOBJ"  type="application/pdf" height="auto" width="100%" style="max-width:800px;">';
                    $('#IdViewImageDiv').html(_html);

                    $('#DocFullscreenOBJ').attr('data', result.doc_base64);
                    $('#Modal_View_Document').modal('show');
                }
            }

            $('#preloader').hide();
        }, null, null, true, false, ErrorFunction);

        let DocumentLog = {};
        DocumentLog.Event = $(this).text() + ' Click';
        DocumentLog.Ref_No_1 = $('#lblApplicationNumber').text();
        DocumentLog.Ref_Type_1 = 'Internal View Button Clicked';   // $('#ddlFilterDocType').val()   $('#ddlUploadedImage').val()
        //DocumentLog.Ref_No_1_Desc =;
        //DocumentLog.Ref_No_2 =;
        DocumentLog.Ref_Type_2 = Status == 'APR' ? 'Checker' : 'Maker';
        //DocumentLog.Ref_No_2_Desc =;

        ViewDocumentLog(DocumentLog);

    } catch (e) {
        fnException(e); return false;
    }
}
//download file in IE
const DownloadFile = function () {
    try {
        let byteCharacters = atob(byteArry);
        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        let blob = new Blob([byteArray], { type: 'application/pdf' });
        window.navigator.msSaveOrOpenBlob(blob, filename);

    } catch (e) {
        fnException(e); return false;
    }
}
//delete uploaded file
const DeleteDocument = function (btn) {
    try {
        let App_No = $('#lblApplicationNumber').text().trim();
        let id = $(btn).prop('id');

        if (confirm('Are you sure you want to delete this..?')) {
            ExtendedAjaxCall('DocumentUpload/Delete_Doc?_id=' + id, null, 'GET', function (result) {
                $('#preloader').hide();
                $('#imageFullScreen').attr('src', '');
            }, null, true, false, false, ErrorFunction);
        }

        BindOVD(App_No);

    } catch (e) {
        fnException(e); return false;
    }
}
//bind ovd details
const BindOVD = function (appNo) {
    try {
        if (!$.isEmptyObject(appNo)) {
            ExtendedAjaxCall('DocumentUpload/Get_OVDAsync?_ApplNo=' + appNo, null, 'GET', function (result) {
                if (!$.isEmptyObject(result) && result.length > 0) {
                    let OVDList = [];

                    $('#tblOVDList > tbody tr').each(function () {

                        let $this = $(this);
                        let DOC_ID = Number($($this.find('td')[0]).text());
                        let OVD_Dtls = {
                            DOC_ID: DOC_ID,
                            HolderType_Desc: $($this.find('td')[1]).text(),
                            Document_Type_Desc: $($this.find('td')[2]).text(),
                            Document_Sub_Type_Desc: $($this.find('td')[3]).text(),
                            //Doc_Ref_No: Doc_Ref_No1,
                            Doc_Ref_No: $.isEmptyObject($this.find('#OVDRefNo_' + DOC_ID).val()) ? '' : $this.find('#OVDRefNo_' + DOC_ID).val(),
                            Doc_Exp_Date: $.isEmptyObject($this.find('#OVDExpDate_' + DOC_ID).val()) ? '' : $this.find('#OVDExpDate_' + DOC_ID).val(),
                        }
                        OVDList.push(OVD_Dtls);
                    });

                    $('#tblOVDList > tbody').empty();

                    $.each(result, function (i, data) {
                        let HTML = '';

                        HTML += '<tr>';
                        HTML += '<td id="' + data.Code + '" style="display:none">' + data.Code + '</td>';
                        HTML += '<td >' + data.HolderTypeDesc + '</td>';
                        HTML += '<td>' + data.DocTypeDesc + '</td>';
                        if (!$.isEmptyObject(data.DocSubTypeDesc))
                            HTML += '<td>' + data.DocSubTypeDesc + '</td>';
                        else
                            HTML += '<td></td>';

                        if (data.Is_Doc_Ref_No_Required == 1) {
                            if (data.Doc_Sub_Type == 'AADHARCARD_A') {
                                HTML += '<td><input type="text" id="OVDRefNo_' + data.Code
                                    + '" doc_id="' + data.Code
                                    + '" HolderTypeCode="' + data.HolderTypeCode
                                    + '" sub_doc_type="' + data.DocSubTypeDesc
                                    + '"  class="form-control uppercase txtOVDRef number_only AADHARCARD" onkeyup="refnoToUpper(this)" maxlength="4" />  <span class="errorbox" style="display:none;position:inherit !important"></span></td>';
                            }
                            else if (data.Doc_Sub_Type == 'PAN') {
                                HTML += '<td><input type="text" id="OVDRefNo_' + data.Code
                                    + '" doc_id="' + data.Code
                                    + '" HolderTypeCode="' + data.HolderTypeCode
                                    + '" sub_doc_type="' + data.DocSubTypeDesc
                                    + '"  class="form-control uppercase txtOVDRef OVDPAN number_only " onkeyup="refnoToUpper(this)" maxlength="10" />  <span class="errorbox" style="display:none;position:inherit !important"></span></td>';
                            }
                            else {
                                HTML += '<td><input type="text" id="OVDRefNo_' + data.Code
                                    + '" doc_id="' + data.Code
                                    + '" HolderTypeCode="' + data.HolderTypeCode
                                    + '" sub_doc_type="' + data.DocSubTypeDesc
                                    + '"  class="form-control uppercase txtOVDRef" onkeyup="refnoToUpper(this)" maxlength="20" />  <span class="errorbox" style="display:none;position:inherit !important"></span></td>';
                            }
                        }
                        else {
                            HTML += '<td></td>';
                        }

                        if (data.Is_Doc_Exp_Date_Required == 1) {
                            HTML += '<td class="text-center"><input type="text" id="OVDExpDate_' + data.Code + '" class="form-control OVD_ExpDate txtOVDExp" required regex="dob"  /> <span class="errorbox" style="display:none"></span></td>';
                        }
                        else {
                            HTML += '<td></td>';
                        }

                        //HTML += '<td style="text-align:center;"><button id="' + data.Code + '" type="button" class="comnBtn2 OVD_VIEW" style="margin:0;" onclick="ViewDocument(this)">View</button></td>';

                        if (data.HolderTypeCode == '01' && (BTP_OBJECT.FH_DATA_SOURCE == 'CKYC' || BTP_OBJECT.FH_DATA_SOURCE == 'FRESH')) {
                            HTML += '<td style="text-align:center;"><button id="' + data.Code + '" type="button" class="comnBtn2 OVD_VIEW" style="margin:0;" onclick="ViewDocument(this)">View</button></td>';
                        }
                        else if (data.HolderTypeCode == '02' && (BTP_OBJECT.SH_DATA_SOURCE == 'CKYC' || BTP_OBJECT.SH_DATA_SOURCE == 'FRESH')) {
                            HTML += '<td style="text-align:center;"><button id="' + data.Code + '" type="button" class="comnBtn2 OVD_VIEW" style="margin:0;" onclick="ViewDocument(this)">View</button></td>';
                        }
                        else if (data.HolderTypeCode == '03' && (BTP_OBJECT.TH_DATA_SOURCE == 'CKYC' || BTP_OBJECT.TH_DATA_SOURCE == 'FRESH')) {
                            HTML += '<td style="text-align:center;"><button id="' + data.Code + '" type="button" class="comnBtn2 OVD_VIEW" style="margin:0;" onclick="ViewDocument(this)">View</button></td>';
                        }
                        else {
                            HTML += '<td></td>';
                        }

                        if (data.Document_Source == 'CKYC') {
                            HTML += '<td></td>';
                        }
                        else {
                            HTML += '<td style="text-align:center;"><button id="' + data.Code + '" type="button" class="comnBtn2 OVD_DELETE" style="margin:0;" onclick="DeleteDocument(this)">Delete</button></td>';
                        }
                        HTML += '</tr>';

                        $('#tblOVDList > tbody').append(HTML);

                        BindAddProof_DatePicker($('.OVD_ExpDate'));

                        if (!$.isEmptyObject(data.Doc_Ref_No))
                            $("#OVDRefNo_" + data.Code).val(data.Doc_Ref_No);

                        if (!$.isEmptyObject(data.Doc_Exp_Date))
                            $("#OVDExpDate_" + data.Code).datetextentry('set_date', data.Doc_Exp_Date);


                        $.each(OVDList, function (i, row) {
                            if (row.DOC_ID == data.Code && row.HolderType_Desc == data.HolderTypeDesc && row.Document_Type_Desc == data.DocTypeDesc && row.Document_Sub_Type_Desc == data.DocSubTypeDesc) {
                                if (!$.isEmptyObject(row.Doc_Ref_No))
                                    $("#OVDRefNo_" + data.Code).val(row.Doc_Ref_No);

                                if (!$.isEmptyObject(row.Doc_Exp_Date))
                                    $("#OVDExpDate_" + data.Code).datetextentry('set_date', row.Doc_Exp_Date);
                            }
                        });
                    });

                    $('.AADHARCARD').on("input", function () {
                        var regexp = /[^0-9]/g;
                        if ($(this).val().match(regexp)) {
                            $(this).val($(this).val().replace(regexp, ''));
                        }
                    });
                    $('.OVDPAN').keyup(function () {
                        if (!$.isEmptyObject(this.value) && !IsValidPAN(this.value))
                            $(this).next().text('PAN is not valid').show();
                        else {
                            $(this).next().text('').hide();
                        }
                    });


                    $('#tblOVDList tbody').removeClass('clear_tbody');
                }
                else {

                    $('#tblOVDList>tbody').html('<tr class="empty_table"><td style="text-align:center;" colspan="7">No Record..!</td></tr>');
                }

                $('#preloader').hide();
            }, null, null, false, false, ErrorFunction);

            ////Data extraction----------------------------------------------------------------------------------------
            //$('#tblOVDList tbody tr').each(function (i, row)
            //{
            //    let refNo = $($(this).find('td')[4]).find('input');
            //    if (!$.isEmptyObject(refNo) && refNo.length > 0 && $.isEmptyObject(refNo.val()))
            //        Data_Extraction(refNo);
            //});
            //End Data extraction-----------------------------------------------------------------------------------------
        }
    } catch (e) {
        fnException(e); return false;
    }
}
//ref no to upper
const refnoToUpper = function (ref_no) {
    let refno = $(ref_no).val();
    $(ref_no).val(refno.toUpperCase());
}
//file size valdations
const FileSizeValidation = function (file) {
    try {
        if (!$.isEmptyObject(file) && Math.round((file.size / 1024 / 1024), 2) > 4.00) {
            MessagePopup('<p>Selected document could not be uploaded. Exceeding the maximum file size of 4MB !!</p>', 'error');
            return false;
        }
        return true;

    } catch (e) {
        fnException(); return false;
    }
}
//kyc document upload validations
const isValidateFileUploadData = function () {
    try {
        let isValid = true;
        let ErrorHtml = "";

        let ApplicationNumber = $('#lblApplicationNumber').text();
        let DepositorsStatus = $('#ddlDepositorsStatus').val();
        let HolderType = $('#ddlDocHolderType').val();
        let DocType = $('#ddlDocType').val();

        $('#ddlDepositorsStatus,#ddlDocHolderType,#ddlDocType,#txtSuffix').removeClass('InputBorderRed');

        if ($.isEmptyObject(ApplicationNumber)) {
            ErrorHtml += '<p>Application no. is required..!</p>';
            isValid = false;
        }

        if (DepositorsStatus == 'select') {
            ErrorHtml += '<p>Depositors Status is required..!</p>';
            isValid = false;
        }

        if (HolderType == 'select') {
            ErrorHtml += '<p>Holder Type is required..!</p>';
            $('#ddlHolderType').addClass('InputBorderRed');
            isValid = false;
        }

        if (DocType == 'select') {
            ErrorHtml += '<p>Doc Type is required..!</p>';
            $('#ddlDocType').addClass('InputBorderRed');
            isValid = false;
        }

        if ($('#flvDocUpload')[0].files.length == 0) {
            ErrorHtml += '<p>Please select file to upload..!</p>';;
            isValid = false;
        }

        if (DocType === 'ADDPRF|AADHARCARD_A' || DocType === 'IDENTPRF|AADHARCARD_I') {
            if ($.isEmptyObject($('#txtSuffix').val())) {
                ErrorHtml += '<p>Aadhaar suffix are required..!</p>';
                $('#txtSuffix').addClass('InputBorderRed');
                isValid = false;
            }
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
//ovd ref no and ref date validations
const ValidateOVD = function () {
    try {
        $('.txtOVDRef').removeClass('InputBorderRed');
        $('.txtOVDExp').parent().removeClass('InputBorderRed');
        let isValid = 1;
        let setFocus = 0;
        $('.txtOVDRef').each(function () {
            if (this.value == '') {
                $(this).addClass('InputBorderRed');
                isValid = 0
                if (setFocus == 0) {
                    $(this).focus();
                    setFocus = 1
                }

            }

        });

        $('.txtOVDExp').each(function () {
            if (this.value == '') {
                $(this).parent().addClass('InputBorderRed');
                isValid = 0
                if (setFocus == 0) {
                    $(this).focus();
                    setFocus = 1
                }

            }
        });

        if (isValid == 0)
            return false;

        return true;
    } catch (e) {
        fnException(e); return false;
    }
}
//application form upload validation
const ValidateFileUploadApplicationForm = function () {
    try {
        let isValid = true;
        let ErrorHtml = "";
        let ApplicationNumber = $('#lblApplicationNumber').text();

        if ($.isEmptyObject(ApplicationNumber)) {
            ErrorHtml += '<p>Application number is required..!</p>';;
            isValid = false;
        }

        if ($('#flvApplicationFormUpload').get(0).files.length == 0 || $.isEmptyObject($('#flvApplicationFormUpload').get(0).files)) {
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
//document upload log
const DocumentUploadLog = function (Event, Depositor_Status_Code, App_No, HolderType, DocType, DocSubType, FDRNo, FolioNo) {
    try {
        let DocUploadLog = {
            Depositor_Status_Code: Depositor_Status_Code,
            App_No: App_No,
            HolderType: HolderType,
            DocType: DocType,
            DocSubType: DocSubType,
            FDRNo: FDRNo,
            FolioNo: FolioNo,
            Event: Event
        }

        ExtendedAjaxCall('DocumentUpload/InsertDocumentUploadLogAsync', DocUploadLog, 'POST', null, function (request) {
            //beforeSend function to hide preloader
        }, true, true, false);
    } catch (e) {
        $('#preloader').hide();
        console.error(e);
    }
}
//OVD validations
const IsDocUploaded = function () {
    let err_msg = '';
    try {
        let IsFormUploaded = false;
        let IsFHIPUploaded = false;
        let IsFHAPUploaded = false;
        let IsFHPhotoUploaded = false;
        let IsFHPANUploaded = true;
        let IsFHFORM15GHUploaded = false;
        let IsFHFATCANRI_ADDPRFUploaded = false;
        let IsFHFATCANRI_IDENTPRFUploaded = false;
        let IsFHFATCANRI_PASSPORTUploaded = false;
        let IsFHFATCANRI_VISA_WPUploaded = false;
        let IsFHFATCA_PIO_OCRUploaded = false;

        let IsSHIPUploaded = false;
        let IsSHAPUploaded = false;
        let IsSHPhotoUploaded = false;
        let IsSHFATCANRI_ADDPRFUploaded = false;
        let IsSHFATCANRI_IDENTPRFUploaded = false;
        let IsSHFATCANRI_PASSPORTUploaded = false;
        let IsSHFATCANRI_VISA_WPUploaded = false;
        let IsSHFATCA_PIO_OCRUploaded = false;

        let IsTHIPUploaded = false;
        let IsTHAPUploaded = false;
        let IsTHPhotoUploaded = false;
        let IsTHFATCANRI_ADDPRFUploaded = false;
        let IsTHFATCANRI_IDENTPRFUploaded = false;
        let IsTHFATCANRI_PASSPORTUploaded = false;
        let IsTHFATCANRI_VISA_WPUploaded = false;
        let IsTHFATCA_PIO_OCRUploaded = false;

        let IsHUF_HUF_PAN = false;
        let IsHUF_KARTHA_PAN = false;
        let IsHUF_KARTHA = false;
        let IsHUF = false;
        let IsHUF_CANCEL_CHEQUE = false;

        let appNo = $('#lblApplicationNumber').text().trim();

        if (!$.isEmptyObject(appNo)) {
            ExtendedAjaxCall('DocumentUpload/Get_KYCDocumentAsync?_ApplNo=' + appNo, null, 'GET', function (result) {
                if (!$.isEmptyObject(result)) {
                    $.each(result, function (i, row) {
                        row.Doc_Type = $.isEmptyObject(row.Doc_Type) ? '' : row.Doc_Type;
                        row.Doc_Sub_Type = $.isEmptyObject(row.Doc_Sub_Type) ? '' : row.Doc_Sub_Type;

                        if (row.Doc_Type == 'APPFRM')
                            IsFormUploaded = true;

                        if (BTP_OBJECT.IND_NIND == 'IND') {

                            //FH
                            if (row.Doc_Type == 'IDENTPRF' && row.Holder_Type == '01')
                                IsFHIPUploaded = true;
                            if (row.Doc_Type == 'ADDPRF' && row.Holder_Type == '01')
                                IsFHAPUploaded = true;
                            //if (row.Doc_Type == 'PHOTO' && row.Holder_Type == '01')
                            //    IsFHPhotoUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'PHOTOGRAPH' && row.Holder_Type == '01')
                                IsFHPhotoUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FORM15GH' && row.Holder_Type == '01')
                                IsFHFORM15GHUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'TAX_DOCS' && row.Holder_Type == '01')
                                IsFHFORM15GHUploaded = true;

                            if (row.Doc_Sub_Type.toUpperCase() == 'FATCANRI_ADDPRF' && row.Holder_Type == '01')
                                IsFHFATCANRI_ADDPRFUploaded = true;
                            if (row.Doc_Sub_Type.toUpperCase() == 'FATCANRI_IDENTPRF' && row.Holder_Type == '01')
                                IsFHFATCANRI_IDENTPRFUploaded = true;
                            if (row.Doc_Sub_Type.toUpperCase() == 'FATCANRI_PASSPORT' && row.Holder_Type == '01')
                                IsFHFATCANRI_PASSPORTUploaded = true;
                            if (row.Doc_Sub_Type.toUpperCase() == 'FATCANRI_VISA_WP' && row.Holder_Type == '01')
                                IsFHFATCANRI_VISA_WPUploaded = true;
                            if (row.Doc_Sub_Type.toUpperCase() == 'FATCA_PIO_OCR' && row.Holder_Type == '01')
                                IsFHFATCA_PIO_OCRUploaded = true;

                            //SH
                            if (row.Doc_Type == 'IDENTPRF' && row.Holder_Type == '02')
                                IsSHIPUploaded = true;
                            if (row.Doc_Type == 'ADDPRF' && row.Holder_Type == '02')
                                IsSHAPUploaded = true;
                            //if (row.Doc_Type == 'PHOTO' && row.Holder_Type == '02')
                            //    IsSHPhotoUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'PHOTOGRAPH' && row.Holder_Type == '02')
                                IsSHPhotoUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCANRI_ADDPRF' && row.Holder_Type == '02')
                                IsSHFATCANRI_ADDPRFUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCANRI_IDENTPRF' && row.Holder_Type == '02')
                                IsSHFATCANRI_IDENTPRFUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCANRI_PASSPORT' && row.Holder_Type == '02')
                                IsSHFATCANRI_PASSPORTUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FORMFATCANRI_VISA_WP15GH' && row.Holder_Type == '02')
                                IsSHFATCANRI_VISA_WPUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCA_PIO_OCR' && row.Holder_Type == '02')
                                IsSHFATCA_PIO_OCRUploaded = true;

                            //TH
                            if (row.Doc_Type == 'IDENTPRF' && row.Holder_Type == '03')
                                IsTHIPUploaded = true;
                            if (row.Doc_Type == 'ADDPRF' && row.Holder_Type == '03')
                                IsTHAPUploaded = true;
                            //if (row.Doc_Type == 'PHOTO' && row.Holder_Type == '03')
                            //    IsTHPhotoUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'PHOTOGRAPH' && row.Holder_Type == '03')
                                IsTHPhotoUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCANRI_ADDPRF' && row.Holder_Type == '03')
                                IsTHFATCANRI_ADDPRFUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCANRI_IDENTPRF' && row.Holder_Type == '03')
                                IsTHFATCANRI_IDENTPRFUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCANRI_PASSPORT' && row.Holder_Type == '03')
                                IsTHFATCANRI_PASSPORTUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FORMFATCANRI_VISA_WP15GH' && row.Holder_Type == '03')
                                IsTHFATCANRI_VISA_WPUploaded = true;
                            if (row.Doc_Type.toUpperCase() == 'FATCA_PIO_OCR' && row.Holder_Type == '03')
                                IsTHFATCA_PIO_OCRUploaded = true;

                        }
                        else if (BTP_OBJECT.IND_NIND == 'HUF') {
                            if (row.Doc_Type == 'IDENTPRF' && row.Doc_Sub_Type == 'HUF_PAN')
                                IsHUF_HUF_PAN = true;
                            if (row.Doc_Type == 'IDENTPRF' && row.Doc_Sub_Type == 'KARTHA_PAN')
                                IsHUF_KARTHA_PAN = true;
                            if (row.Doc_Type == 'ADDPRF' && row.Doc_Sub_Type == 'HUF')
                                IsHUF = true;
                            if (row.Doc_Type == 'ADDPRF' && row.Doc_Sub_Type == 'KARTHA')
                                IsHUF_KARTHA = true;
                            if (row.Doc_Type == 'BANK' && row.Doc_Sub_Type == 'CANCEL_CHEQUE')
                                IsHUF_CANCEL_CHEQUE = true;
                        }
                    });
                }

                $('#preloader').hide();
            }, null, true, false, false, ErrorFunction);
        }
        if (!IsFormUploaded && BTP_OBJECT.appl_dec_type == 'PHYSICAL')
            err_msg += "<p>Please Upload Application Form..!</p>";

        //individual validations
        if (BTP_OBJECT.IND_NIND == 'IND') {

            //if (BTP_OBJECT.FH_DATA_SOURCE != 'PRV') {
            if (!IsFHIPUploaded)
                err_msg += "<p>Please Upload Investor's Identity Proof..!</p>";
            if (!IsFHAPUploaded)
                err_msg += "<p>Please Upload Investor's Address Proof..!</p>";
            if (!IsFHPhotoUploaded)
                err_msg += "<p>Please Upload Investor's Photo..!</p>";

            if ($('#btnsldFatca').hasClass('active') || $('#btnsldGreen').hasClass('active')) {
                if (!IsFHFATCANRI_ADDPRFUploaded)
                    err_msg += "<p>Please upload investor's FATCA address proof !</p>";
                if (!IsFHFATCANRI_IDENTPRFUploaded)
                    err_msg += "<p>Please upload investor's FATCA identity proof !</p>";
                if (!IsFHFATCANRI_PASSPORTUploaded)
                    err_msg += "<p>Please upload investor's Passport..!</p>";
                if (!IsFHFATCANRI_VISA_WPUploaded && !IsFHFATCA_PIO_OCRUploaded)
                    err_msg += "<p>Please upload investor's FATCA visa and work permit or FATCA proof of indian origin !</p>";
            }
            //}
            if ($('#chkTDFFlag').prop('checked') && !IsFHFORM15GHUploaded)
                err_msg += "<p>Please Upload Form15G/H..!</p>";

            //second holder
            if ($('#chkSHApplicable').prop('checked')) {
                //if (BTP_OBJECT.SH_DATA_SOURCE != 'PRV') {
                if (!IsSHIPUploaded)
                    err_msg += "<p>Please Upload Second Holder's Identity Proof..!</p>";
                if (!IsSHAPUploaded)
                    err_msg += "<p>Please Upload Second Holder's Address Proof..!</p>";
                if (!IsSHPhotoUploaded)
                    err_msg += "<p>Please upload second holder's photo..!</p>";

                if ($('#btnSHsldFatca').hasClass('active') || $('#btnSHsldGreen').hasClass('active')) {
                    if (!IsSHFATCANRI_ADDPRFUploaded)
                        err_msg += "<p>Please upload second holder's FATCA address proof !</p>";
                    if (!IsSHFATCANRI_IDENTPRFUploaded)
                        err_msg += "<p>Please upload second holder's FATCA identity proof !</p>";
                    if (!IsSHFATCANRI_PASSPORTUploaded)
                        err_msg += "<p>Please upload second holder's Passport..!</p>";
                    if (!IsSHFATCANRI_VISA_WPUploaded && !IsSHFATCA_PIO_OCRUploaded)
                        err_msg += "<p>Please upload second holder's FATCA visa and work permit or FATCA proof of indian origin !</p>";
                }
                //}
            }

            //third holder           
            if ($('#chkTHApplicable').prop('checked'))// && BTP_OBJECT.TH_DATA_SOURCE != 'CKYC')
            {
                //if (BTP_OBJECT.TH_DATA_SOURCE != 'PRV') {
                if (!IsTHIPUploaded)
                    err_msg += "<p>Please Upload Third Holder's Identity Proof..!</p>";
                if (!IsTHAPUploaded)
                    err_msg += "<p>Please Upload Third Holder's Address Proof..!</p>";
                if (!IsTHPhotoUploaded)
                    err_msg += "<p>Please upload third holder's photo..!</p>";

                if ($('#btnTHsldFatca').hasClass('active') || $('#btnTHsldGreen').hasClass('active')) {
                    if (!IsTHFATCANRI_ADDPRFUploaded)
                        err_msg += "<p>Please upload third holder's FATCA address proof !</p>";
                    if (!IsTHFATCANRI_IDENTPRFUploaded)
                        err_msg += "<p>Please upload third holder's FATCA identity proof !</p>";
                    if (!IsTHFATCANRI_PASSPORTUploaded)
                        err_msg += "<p>Please upload third holder's Passport..!</p>";
                    if (!IsTHFATCANRI_VISA_WPUploaded && !IsTHFATCA_PIO_OCRUploaded)
                        err_msg += "<p>Please upload third holder's FATCA visa and work permit or FATCA proof of indian origin !</p>";
                }
                //}
            }
        }
        else if (BTP_OBJECT.IND_NIND == 'HUF') {
            //additional purchase
            if (!$.isEmptyObject($('#lblFolioNumber').text())) {
            }
            //fresh purchase
            else {
                if (!IsHUF_HUF_PAN)
                    err_msg += "<p>Please Upload HUF Identity Proof..!</p>";

                if (!IsHUF_KARTHA_PAN)
                    err_msg += "<p>Please Upload KARTHA Identity Proof..!</p>";

                if (!IsHUF)
                    err_msg += "<p>Please Upload HUF Address Proof..!</p>";

                if (!IsHUF_KARTHA)
                    err_msg += "<p>Please Upload KARTHA Address Proof..!</p>";

                if (!IsHUF_CANCEL_CHEQUE)
                    err_msg += "<p>Please Upload Personalized canceled cheque of HUF..!</p>";
            }


        }

    } catch (e) {
        err_msg = 'Something went wrong..!';
        fnException(e);
    }
    return err_msg;
}

//step7 submit
const SubmitStep7 = function () {
    let err_msg = '';
    let exception = '';
    try {
        //step7 validations
        err_msg = isValidStep7();
        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }

        /////ovd forgery check
        //$('#tblOVDList tbody tr').each(function (i, row)
        //{
        //    let refNo = $($(this).find('td')[4]).find('input');
        //    if (!$.isEmptyObject(refNo) && refNo.length > 0 && !$.isEmptyObject(refNo.val()))
        //        err_msg += OVD_Ref_Verification(refNo);
        //});
        //if (!$.isEmptyObject(err_msg))
        //{
        //    return false;
        //}

        //step save
        let investorDetailSaveStruct = {};
        investorDetailSaveStruct = getStep7Data();
        investorDetailSaveStruct.Investor_Other_Dtl = getStep2Data();


        if (!$('#tblOVDList tbody').hasClass('clear_tbody')) {
            ExtendedAjaxCall('InvestorDetailsSave/SubmitStep7', investorDetailSaveStruct, 'POST', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.Status == 1)
                        BTP_OBJECT.OVDSave = true;
                    else if (!$.isEmptyObject(result) && !$.isEmptyObject(result.Msg && result.Status == 0))
                        err_msg += '<p>' + result[0].Msg + '</p>';
                    else
                        err_msg += '<p>Something went wrong..!</p>';

                    $('#preloader').hide();

                } catch (e) {
                    err_msg = 'Something went wrong..!';
                    fnException(e); return false;
                }
            }, null, true, false, false, ErrorFunction);
        }
        if (!$.isEmptyObject(err_msg)) {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }

    } catch (e) {
        fnException(e); return false;
    }



    return true;

}

//step7 validations
const isValidStep7 = function () {
    let err_msg = '';

    try {
        //Document Uploaded
        let msgDocUpload = IsDocUploaded();
        if (!$.isEmptyObject(msgDocUpload))
            err_msg += msgDocUpload;

        //OVD
        $('#tblOVDList tbody tr').each(function (i, row) {
            let $row = $(this);
            let refNo = $($row.find('td')[4]).find('input');
            let expDate = $($row.find('td')[5]).find('input');
            if (!$.isEmptyObject(refNo) && refNo.length > 0
                && $.isEmptyObject(refNo.val())) {

                err_msg += "<p>" + $row.find('td')[1].innerHTML + "'s " + $row.find('td')[3].innerHTML + " Ref. No. is required..!</p>";
                $($row.find('td')[4]).find('input').addClass('InputBorderRed');
            }
            if (!$.isEmptyObject(refNo) && refNo.length > 0
                && !$.isEmptyObject(refNo.val())
                && refNo.hasClass('AADHARCARD')
                && refNo.val().length != 4) {

                err_msg += "<p>Please enter last 4 digit of aadhaar card number..!</p>";
                $($row.find('td')[4]).find('input').addClass('InputBorderRed');
            }
            else if (!$.isEmptyObject(refNo) && refNo.hasClass('OVDPAN')) {
                if (!IsValidPAN($($row.find('td')[4]).find('input').val())) {
                    err_msg += "<p>Please enter valid PAN number..!</p>";
                    $($row.find('td')[4]).find('input').addClass('InputBorderRed');
                }
            }
            else
                $($row.find('td')[4]).find('input').removeClass('InputBorderRed');

            if (!$.isEmptyObject(expDate) && expDate.length > 0 && $.isEmptyObject(expDate.val())) {
                err_msg += "<p>" + $row.find('td')[1].innerText + "'s " + $row.find('td')[3].innerText + " Expiry Date is required..!</p>";
                $($row.find('td')[5]).find('input').parent().addClass('InputBorderRed');
            }
            else
                $($row.find('td')[5]).find('input').parent().removeClass('InputBorderRed');
        });

        if (BTP_OBJECT.IND_NIND == 'HUF' && $.isEmptyObject($('#lblFolioNumber').text()) && $('#tblCoparceners > tbody > tr').length == 0) {
            err_msg += 'Member details are required..!'
        }

    } catch (e) {
        err_msg = 'Something went wrong..!';
        fnException(e);
    }
    return err_msg;
}

//get step7 data for save 
const getStep7Data = function () {
    let InvestorDetailSaveStruct = {};
    let OVDDtls = [];
    let MemberDtls = [];
    try {

        $('#tblOVDList > tbody tr').each(function (i, tr) {
            let $this = $(this);
            let doc_id = tr.children[0].innerHTML
            let ref_No = "";
            let exp_No = null;
            if (!$.isEmptyObject($($(this).find('td')[4]).find('input').val()))
                ref_No = $($(this).find('td')[4]).find('input').val();
            if (!$.isEmptyObject($($(this).find('td')[5]).find('input').val()))
                exp_No = $($(this).find('td')[5]).find('input').val();

            let OVDBO = {
                Doc_ID: doc_id,
                Doc_RefNO: ref_No,
                Doc_ExpDate: exp_No
            }
            OVDDtls.push(OVDBO);
        });

        InvestorDetailSaveStruct.OVDDtls = OVDDtls;

        if (BTP_OBJECT.IND_NIND == 'HUF' && $('#tblCoparceners > tbody > tr').length > 0) {
            $('#tblCoparceners > tbody tr').each(function (i, tr) {
                let id = tr.children[0].innerHTML
                let full_name = tr.children[1].innerHTML
                let relation = tr.children[2].innerHTML
                let dob = tr.children[3].innerHTML
                let mobile = tr.children[4].innerHTML

                let MemberBO = {
                    ID: id,
                    Full_Name: full_name,
                    Relation: relation,
                    DOB: dob,
                    Mobile: mobile
                }
                MemberDtls.push(MemberBO);
            });

            InvestorDetailSaveStruct.MemberDtls = MemberDtls;

        }


    } catch (e) {
        fnException(e); return null;
    }
    return InvestorDetailSaveStruct;
}

//reset step7
const Reset_step7 = function () {
    $('.errorbox').text('').hide();
    $('#ddlDocHolderType,#ddlDocType').val('select').change();
    $('#flvApplicationFormUpload,#flvDocUpload').val('');
}

const SaveMember = function () {
    try {
        let isError = false;
        let txtMemberName = $('#txtMemberName');
        let txtMemberRelation = $('#txtMemberRelation');
        let txtMemberDOB = $('#txtMemberDOB');
        let txtMemberMobile = $('#txtMemberMobile');

        $('#txtMemberName').next().text('').hide();
        $('#txtMemberRelation').next().text('').hide();
        $('#txtMemberDOB').parent().next().text('').hide();
        $('#txtMemberMobile').next().text('').hide();

        if ($.isEmptyObject(txtMemberName.val())) {
            isError = true;
            $('#txtMemberName').next().text('Name is required').show();
        }

        if ($.isEmptyObject(txtMemberRelation.val())) {
            isError = true;
            $('#txtMemberRelation').next().text('Relation is required').show();
        }

        if ($.isEmptyObject(txtMemberDOB.val())) {
            isError = true;
            $('#txtMemberDOB').parent().next().text('DOB is required').show();
        }

        if ($.isEmptyObject(txtMemberMobile.val())) {
            isError = true;
            $('#txtMemberMobile').next().text('Mobile is required').show();
        }

        if (!isError) {
            let html = '<tr>';
            html += '<td>' + ($('#tblCoparceners > tbody > tr').length + 1) + '</span></td>';
            html += '<td>' + txtMemberName.val() + '</td>';
            html += '<td>' + txtMemberRelation.val() + '</td>';
            html += '<td>' + txtMemberDOB.val() + '</td>';
            html += '<td>' + txtMemberMobile.val() + '</td>';
            html += '<td style="text-align:center;"><button id="btnDeleteMember" type="button" class="comnBtn2" style="margin:0;" onclick="DeleteMember(this)">Delete</button></td>';
            html += '</tr>';

            $('#tblCoparceners').append(html);
            $('#Model_HUF_Add_Member').modal('hide');
            txtMemberName.val('');
            txtMemberRelation.val('');
            txtMemberDOB.val('');
            txtMemberMobile.val('');
        }

    } catch (e) {
        fnException(e);
    }
}

const DeleteMember = function (btn) {
    try {
        $(btn).closest('tr').remove();
    } catch (e) {
        fnException(e);
    }
}

const BindAddProof_DatePicker = function (t) {
    $(t).datetextentry({
        min_date: function () { return this.get_today(); },
        min_date_message: 'Date cannot be past date',
    });

    $('.jq-dte-day, .jq-dte-month, .jq-dte-year').css('width', '30%');
}

$('#txtMemberDOB').datetextentry({
    max_date: function () { return this.get_today(); },
    max_date_message: 'Date cannot be future date',
});

//step7 click
$('#IdBtnTabSwit07').click(function () {
    try {
        $('#lblMemberPAN').text($('#txtInvPan').val());
        let name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
        $('#txtHUFName').text(name);
    } catch (e) {
        fnException(e);
    }
});

//holder type change
$('#ddlDocHolderType').change(function () {
    try {
        let $HolderType = $(this);
        let ddlDepositorsStatus = $('#ddlDepositorsStatus').val();
        $('#flvDocUpload').val('');

        if (!$.isEmptyObject(ddlDepositorsStatus)) {
            let Appl_No = '';
            if ($HolderType.val() == '01' && BTP_OBJECT.FH_DATA_SOURCE == 'CKYC') {
                Appl_No = $('#lblApplicationNumber').text();
            }
            else if ($HolderType.val() == '02' && BTP_OBJECT.SH_DATA_SOURCE == 'CKYC') {
                Appl_No = $('#lblApplicationNumber').text();
            }
            else if ($HolderType.val() == '03' && BTP_OBJECT.TH_DATA_SOURCE == 'CKYC') {
                Appl_No = $('#lblApplicationNumber').text();
            }
            BindDDLExtendedAjaxCall('#ddlDocType', 'DocumentUpload/Get_DocType_MstAsync?_HolderType=' + $HolderType.val() + '&DepositorStatus=' + ddlDepositorsStatus + '&Appl_No=' + Appl_No, null, 'GET', null, null, true, false, false, ErrorFunction);

            $('#ddlDocType option[value="ADDITIONAL|INTRNL_1"]').hide();
            $('#ddlDocType option[value="ADDITIONAL|INTRNL_2"]').hide();

        }
    }
    catch (e) {
        fnException(e); return false;
    }
});

//doc/sub doc type change
$('#ddlDocType').change(function () {
    try {
        $('#flvDocUpload').val('');
        if (this.value == 'select')
            return false;

        ExtendedAjaxCall('DocumentUpload/Get_Ismultiple?_DocSubType=' + $(this).val(), null, 'GET', function (result) {
            try {

                if (result != null && result[0].IsMultiple) {
                    $('#flvDocUpload').prop("multiple", true);
                }
                else {
                    $('#flvDocUpload').prop("multiple", false);
                }


            } catch (e) {
                fnException(e);
            }

            $('#preloader').hide();
        }, null, true, true, false, ErrorFunction);

        $('#txtSuffix').val('');
        if (this.value == 'ADDPRF|AADHARCARD_A' || this.value == 'IDENTPRF|AADHARCARD_I') {

            $('.AADHAAR_SUFFIX').show();
        }
        else {
            $('.AADHAAR_SUFFIX').hide();
        }
    }
    catch (e) {
        fnException(e); return false;
    }
});

//Application form file upload control
$('#flvApplicationFormUpload').on('change', function (e) {
    try {
        let fileNameSplit = $(this)[0].files[0].name.split('.');
        if (!$.isEmptyObject(fileNameSplit)) {
            let isValidFileName = fileNameSplit.length != 2 ? false : true;
            if (isValidFileName) {
                let type = $(this)[0].files[0].type;
                let ext = $(this)[0].files[0].name.split('.')[1];

                if ($.inArray(type, ['image/jpg', 'image/jpeg', 'image/tiff', 'image/tif', 'application/pdf']) == -1
                    || $.inArray(ext.toLowerCase(), ['jpg', 'jpeg', 'pdf', 'tiff', 'tif']) == -1) {

                    $('#flvApplicationFormUpload').val('');
                    BtpMessagePopup('<p>File should be jpg, jpeg, pdf, tiff, tif</p>', 'error');

                }
                else if (FileSizeValidation($(this).get(0).files)) {
                    $('#flvApplicationFormUpload').text('');
                    let filename = '';
                    if (!$.isEmptyObject($(this)[0].files)) {
                        filename = $(this)[0].files['0'].name;
                    }
                }
            }
            else {
                $('#flvApplicationFormUpload').val('');
                BtpMessagePopup('<p>Incorrect file name, Please upload valid file</p>', 'error');
            }
        }
    }
    catch (e) {
        fnException(e); return false;
    }
});

//KYC files upload control
$('#flvDocUpload').on('change', function (e) {
    try {
        $.each(this.files, function (i, file) {
            let err_msg = ''
            let ext = file.name.split('.')[1];

            if (file.name.split('.').length == 2) {

                if ($.inArray(file.type.toLowerCase(), ['image/jpg', 'image/jpeg', 'application/pdf', 'image/tiff', 'image/tif']) == -1
                    || $.inArray(ext.toLowerCase(), ['jpg', 'jpeg', 'pdf', 'tiff', 'tif']) == -1) {

                    $('#flvDocUpload').val('');
                    BtpMessagePopup('<p>File should be jpg, jpeg, pdf, tiff, tif</p>', 'error');
                    return false;
                }
                else if (!FileSizeValidation(file)) {
                    $('#flvDocUpload').val('');
                    return false;
                }
            }
            else {
                $('#flvDocUpload').val('');
                BtpMessagePopup('<p>Incorrect file name, Please upload valid file</p>', 'error');
                return false;
            }

        });
    }
    catch (e) {
        fnException(e); return false;
    }
});

//Application form upload button
$('#btnUploadApplicationForm').click(function () {
    this.disabled = true;

    try {
        $('#msgFormUpload').text('');

        if (ValidateFileUploadApplicationForm()) {
            let App_No = $('#lblApplicationNumber').text();
            let flvUpload = $('#flvApplicationFormUpload').get(0).files;
            let FDRNo = $('#lblExistingFDRNumber').text();
            let FolioNo = $('#lblFolioNumber').text();
            let LastInvDate = $('#lblLastInvestmentDate').text();

            let _DocUpload = new FormData();
            _DocUpload.append("App_No", App_No)
            _DocUpload.append("Doc_File", flvUpload[0])
            _DocUpload.append("DocName", "");
            _DocUpload.append("DocPath", "");
            _DocUpload.append("formCode", "");
            _DocUpload.append("Session_ID", "");
            _DocUpload.append("CreatedBy", "");
            _DocUpload.append("CreatedByUName", "");
            _DocUpload.append("CreatedIP", "");
            _DocUpload.append("State", State);
            _DocUpload.append("Status", Status);
            _DocUpload.append("FolioNo", FolioNo);
            _DocUpload.append("FDRNo", FDRNo);
            _DocUpload.append("LastInvDate", LastInvDate);

            //document upload request log
            DocumentUploadLog('Request', $('#ddlDepositorsStatus').val(), App_No, '01', 'APPFRM', 'APPLICATIONFRM', FDRNo, FolioNo);

            $.ajax({
                url: WA_FD_BTP + 'DocumentUpload/Save_ApplicationForm',
                type: "POST",
                data: _DocUpload,
                async: true,
                contentType: false,
                processData: false,
                beforeSend: OnBeforeSendCall,
                success: function (result) {
                    if (!$.isEmptyObject(result) && result.validResponse)
                        $('#msgFormUpload').hide().text(result.msg).fadeIn('slow').delay(5000).hide(1);
                    else if (!$.isEmptyObject(result) && !result.validResponse) {
                        var htmlMsg = '<p>' + result.msg + '</p>';
                        BtpMessagePopup(htmlMsg, 'error');
                        $('#flvApplicationFormUpload').focus();
                    }
                    else {
                        BtpMessagePopup('<p>Something went wrong, Please upload again..!</p>', 'error');
                        $('#flvApplicationFormUpload').focus();
                    }

                    $('#flvApplicationFormUpload').val('');
                    $('#preloader').hide();
                    //refresh ovd details
                    BindOVD(App_No);
                    //document upload response log
                    DocumentUploadLog('Response', $('#ddlDepositorsStatus').val(), App_No, '01', 'APPFRM', 'APPLICATIONFRM', FDRNo, FolioNo);
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

//KYC files upload button
$('#btnUpload').click(function () {
    this.disabled = true;

    try {
        if (isValidateFileUploadData()) {
            let err_msg = ''

            $('#msgDocUpload').text('');
            let Depositor_Status_Code = $('#ddlDepositorsStatus').val();
            let App_No = $('#lblApplicationNumber').text();
            let HolderType = $('#ddlDocHolderType').val();
            let Doc_Type_SubType = $('#ddlDocType').val();
            let HolderTypeText = $('#ddlDocHolderType option:selected').text().replace(/ /g, '');
            let Doc_Type_SubType_Text = $('#ddlDocType option:selected').text().replace(/ /g, '').replace('-', '_');
            let FDRNo = $('#lblExistingFDRNumber').text();
            let FolioNo = $('#lblFolioNumber').text();
            let LastInvDate = $('#lblLastInvestmentDate').text();
            let AadharSuffix = $('#txtSuffix').val();

            //OVD classification--------------------------------------------------------------------------------------------
            //$.each($('#flvDocUpload')[0].files, function (i, file)
            //{
            //    let ext = file.name.split('.')[1];

            //    //OVD Classification
            //    if ($.inArray(file.type.toLowerCase(), ['image/jpg', 'image/jpeg', 'application/pdf']) != -1
            //        && $.inArray(ext.toLowerCase(), ['jpg', 'jpeg', 'pdf']) != -1)
            //    {

            //        let objOVDBO = new FormData();
            //        if (!$.isEmptyObject(HolderType) && HolderType == '01')
            //        {
            //            objOVDBO.append("OVD_HolderFirstName", $('#txtInvFirstName').val().trim());
            //            objOVDBO.append("OVD_HolderMiddleName", $('#txtInvMiddleName').val().trim());
            //            objOVDBO.append("OVD_HolderLastName", $('#txtInvLastName').val().trim());
            //        }
            //        else if (!$.isEmptyObject(HolderType) && HolderType == '02')
            //        {
            //            objOVDBO.append("OVD_HolderFirstName", $('#DV_SH #txtFName').val().trim());
            //            objOVDBO.append("OVD_HolderMiddleName", $('#DV_SH #txtMName').val().trim());
            //            objOVDBO.append("OVD_HolderLastName", $('#DV_SH #txtLName').val().trim());
            //        }
            //        else if (!$.isEmptyObject(HolderType) && HolderType == '03')
            //        {
            //            objOVDBO.append("OVD_HolderFirstName", $('#DV_TH #txtFName').val().trim());
            //            objOVDBO.append("OVD_HolderMiddleName", $('#DV_TH #txtMName').val().trim());
            //            objOVDBO.append("OVD_HolderLastName", $('#DV_TH #txtLName').val().trim());
            //        }
            //        objOVDBO.append("OVD_FrontImageFileExtension", ext);
            //        objOVDBO.append("Appl_No", App_No);
            //        objOVDBO.append("OVD_Task", 'IC');
            //        objOVDBO.append("Source_Type", 'CPTP_UNI');
            //        objOVDBO.append("Source_Sub_Type", 'CPTP_UNI');
            //        objOVDBO.append("Holder_Type", HolderType);
            //        objOVDBO.append("File", file);

            //        err_msg += OVD_Classification(objOVDBO);
            //    }
            //});

            //if (!$.isEmptyObject(err_msg))
            //{
            //    this.disabled = false;
            //    BtpMessagePopup(err_msg, 'error');
            //    return false;
            //}
            //End OVD Classification-----------------------------------------------------------------------------------

            $.each($('#flvDocUpload')[0].files, function (i, file) {
                let ext = file.name.split('.')[1];

                let _DocUpload = new FormData();
                _DocUpload.append("Depositor_Status_Code", Depositor_Status_Code);
                _DocUpload.append("App_No", App_No);
                _DocUpload.append("KYCDocValue", "");
                _DocUpload.append("formCode", "");
                _DocUpload.append("Session_ID", "");
                _DocUpload.append("CreatedBy", "");
                _DocUpload.append("CreatedByUName", "");
                _DocUpload.append("CreatedIP", "");
                _DocUpload.append("HolderType", HolderType);
                _DocUpload.append("DocType", "");
                _DocUpload.append("DocSubType", "");
                _DocUpload.append("Doc_Type_SubType", Doc_Type_SubType);
                _DocUpload.append("Doc_File", file)
                _DocUpload.append("DocName", "");
                _DocUpload.append("DocPath", "");
                _DocUpload.append("HolderTypeText", HolderTypeText);
                _DocUpload.append("Doc_Type_SubType_Text", Doc_Type_SubType_Text);
                _DocUpload.append("State", State);
                _DocUpload.append("Status", Status);
                _DocUpload.append("FolioNo", FolioNo);
                _DocUpload.append("FDRNo", FDRNo);
                _DocUpload.append("LastInvDate", LastInvDate);
                _DocUpload.append("DocSequenceNo", (i + 1));
                _DocUpload.append("AadharSuffix", AadharSuffix);

                //document upload Request log
                DocumentUploadLog('Request', Depositor_Status_Code, App_No, HolderType, Doc_Type_SubType.split('|')[0], Doc_Type_SubType.split('|')[1], FDRNo, FolioNo);

                $.ajax({
                    url: WA_FD_BTP + 'DocumentUpload/Save_KYCDocs',
                    type: "POST",
                    data: _DocUpload,
                    async: true,
                    contentType: false,
                    processData: false,
                    beforeSend: OnBeforeSendCall,
                    success: function (result) {
                        if (!$.isEmptyObject(result) && result.validResponse)
                            $('#msgDocUpload').show().text(result.msg).fadeIn('slow').delay(20000).hide(1);
                        else if (!$.isEmptyObject(result) && !result.validResponse) {
                            BtpMessagePopup(result.msg, 'error');
                            $('#flvDocUpload').focus();
                        }
                        else {
                            BtpMessagePopup('<p>Something went wrong, Please try again..!</p>', 'error');
                            $('#flvDocUpload').focus();
                        }

                        //Hide Preloader
                        if ($('#flvDocUpload')[0].files.length == (i + 1)) {
                            BindOVD(App_No);

                            $('#btnUpload').prop('disabled', false);
                            $('#preloader').hide();
                        }

                        $('#flvDocUpload').val('');

                        //document upload Request log
                        DocumentUploadLog('Request', Depositor_Status_Code, App_No, HolderType, Doc_Type_SubType.split('|')[0], Doc_Type_SubType.split('|')[1], FDRNo, FolioNo);
                    },
                    error: ErrorFunction,
                    complete: null
                });
            });


        }

        this.disabled = false;

    } catch (e) {
        this.disabled = false;
        fnException(e); return false;
    }

});

$('#btnCancel07').bind('click', Reset_step7);

$('#btnHUFAddMember').on('click', function () {

    $('#txtMemberName').val();
    $('#txtMemberRelation').val();
    $('#txtMemberDOB').val();
    $('#txtMemberMobile').val();

    $('#txtMemberName').next().text('').hide();
    $('#txtMemberRelation').next().text('').hide();
    $('#txtMemberDOB').parent().next().text('').hide();
    $('#txtMemberMobile').next().text('').hide();

    $('#Model_HUF_Add_Member').modal('show');
});

$('#txtMemberName,#txtMemberRelation,#txtMemberMobile')
    .keyup(function () {
        if (!$.isEmptyObject(this.value))
            $(this).next().text('').hide();

    })
    .change(function () {
        if (!$.isEmptyObject(this.value))
            $(this).next().text('').hide();

    });

$('#Model_HUF_Add_Member .jq-dte-day,#Model_HUF_Add_Member .jq-dte-month,#Model_HUF_Add_Member .jq-dte-year')
    .keyup(function () {
        if (!$.isEmptyObject($('#txtMemberDOB').val()))
            $('#txtMemberDOB').parent().next().text('').hide();
    })
    .change(function () {
        if (!$.isEmptyObject($('#txtMemberDOB').val()))
            $('#txtMemberDOB').parent().next().text('').hide();
    });



