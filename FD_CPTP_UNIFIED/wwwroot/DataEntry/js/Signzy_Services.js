///basic forgery check
const Basic_Forgery_Check = function (objBO)
{
    let err_msg = '';
    try
    {
        ExtendedAjaxCall('Signzy_Services/Check_Basic_Forgery', objBO, 'POST', function (result) 
        {
            try
            {
                if (!$.isEmptyObject(result.ErrorCode) && !$.isEmptyObject(result.ErrorMessage))
                    err_msg += '';
                //err_msg += 'An error occurred while processing your request. Please try again..';
                else if (!$.isEmptyObject(result.result) && !$.isEmptyObject(result.result.result.forgery))
                {
                    if (result.result.result.forgery == 'FORGED')
                        err_msg += result.result.result.message;
                }

                $('#preloader').hide();

            } catch (e)
            {
                err_msg = 'Something went wrong..!';
                fnException(e);
            }
        }, null, true, false, false, ErrorFunction);

    } catch (e)
    {
        err_msg = 'Something went wrong..!';
        fnException(e);
    }
    return err_msg;
}

//ovd classification 
const OVD_Classification = function (objBO) 
{
    let err_msg = '';
    try
    {

        $.ajax({
            url: WA_FD_BTP + 'Signzy_Services/Check_OVD_Classification',
            type: "POST",
            data: objBO,
            async: false,
            contentType: false,
            processData: false,
            beforeSend: OnBeforeSendCall,
            success: function (result)
            {
                try
                {
                    let jsonResult = JSON.parse(result);

                    if (!$.isEmptyObject(jsonResult.ErrorCode) && !$.isEmptyObject(jsonResult.ErrorMessage))
                        err_msg += 'An error occurred while processing your request. Please try again..';
                    else if (!$.isEmptyObject(jsonResult.result))
                    {
                        //individual pan validations
                        if ($('#ddlDocType :selected').text().toUpperCase().match('PAN') == 'PAN'
                            && !$.isEmptyObject(jsonResult.result.result[0].classification.idType)
                            && jsonResult.result.result[0].classification.idType != 'individualPan'
                            && BTP_OBJECT.IND_NIND == 'IND')
                        {
                            err_msg += '<p>Document is invalid, Please upload valid individual PAN document</p>';
                        }
                        //Non-individual PAN
                        else if ($('#ddlDocType :selected').text().toUpperCase().match('PAN') == 'PAN'
                            && !$.isEmptyObject(jsonResult.result.result[0].classification.idType)
                            && (jsonResult.result.result[0].classification.idType != 'businessPan'
                                || jsonResult.result.result[0].classification.idType != 'unknownPan')
                            && BTP_OBJECT.IND_NIND != 'IND')
                        {
                            err_msg += '<p>Document is invalid, Please upload valid PAN </p>';
                        }
                        //AADHAR validations
                        else if ($('#ddlDocType :selected').text().toUpperCase().match('AADHAR') == 'AADHAR'
                            && !$.isEmptyObject(jsonResult.result.result[0].classification.idType)
                            && jsonResult.result.result[0].classification.idType != 'aadhaar')
                        {
                            err_msg += '<p>Document is invalid, Please upload valid Aadhar Card</p>';
                        }
                        //PASSPORT validations
                        else if ($('#ddlDocType :selected').text().toUpperCase().match('PASSPORT') == 'PASSPORT'
                            && !$.isEmptyObject(jsonResult.result.result[0].classification.idType)
                            && jsonResult.result.result[0].classification.idType != 'passport')
                        {
                            err_msg += '<p>Document is invalid, Please upload valid Passort</p>';
                        }
                        //PASSPORT validations
                        else if ($('#ddlDocType :selected').text().toUpperCase().match('DRIVING') == 'DRIVING'
                            && !$.isEmptyObject(jsonResult.result.result[0].classification.idType)
                            && jsonResult.result.result[0].classification.idType != 'dl')
                        {
                            err_msg += '<p>Document is invalid, Please upload valid Driving Licence</p>';
                        }
                    }

                } catch (e)
                {
                    err_msg = 'Something went wrong..!';
                    fnException(e);
                }
                $('#preloader').hide();
            },
            error: ErrorFunction,
            complete: null
        });

    } catch (e)
    {
        err_msg = 'Something went wrong..!';
        fnException(e);
    }

    return err_msg;
}

////PAN data extraction
//function PAN_DATA_EXTRACTION(objBO) 
//{
//    let err_msg = '';
//    try
//    {
//        //$.ajax({
//        //    url: WA_FD_BTP + 'Signzy_Services/Check_PAN_Data',
//        //    type: "POST",
//        //    data: objBO,
//        //    async: false,
//        //    contentType: false,
//        //    processData: false,
//        //    beforeSend: OnBeforeSendCall,
//        //    success: function (result)
//        //    {
//        //        try
//        //        {
//        //            let jsonResult = JSON.parse(result);
//        //            if (!$.isEmptyObject(jsonResult.ErrorCode) && !$.isEmptyObject(jsonResult.ErrorMessage))
//        //                err_msg += 'An error occurred while processing your request. Please try again..';
//        //            else if (!$.isEmptyObject(jsonResult.result) && !$.isEmptyObject(jsonResult.result.response.result))
//        //            {

//        //            }

//        //        } catch (e)
//        //        {
//        //            fnException(e);
//        //        }
//        //        $('#preloader').hide();
//        //    },
//        //    error: ErrorFunction,
//        //    complete: null
//        //});

//        ExtendedAjaxCall('Signzy_Services/Extract_PAN_Data', objBO, 'POST', function(result) 
//        {
//            try
//            {
//                if (!$.isEmptyObject(result.ErrorCode) && !$.isEmptyObject(result.ErrorMessage))
//                    err_msg += '';
//                //err_msg += 'An error occurred while processing your request. Please try again..';
//                else if (!$.isEmptyObject(jsonResult.result) && !$.isEmptyObject(jsonResult.result.response.result))
//                {

//                }

//                $('#preloader').hide();

//            } catch (e)
//            {
//                err_msg = 'Something went wrong..!';
//                fnException(e);
//            }
//        }, null, true, false, false, ErrorFunction);


//    } catch (e)
//    {
//        err_msg = 'Something went wrong..!';
//        fnException(e);
//    }

//    return err_msg;
//}

////DL data extraction
//function DL_DATA_EXTRACTION(objBO) 
//{
//    let err_msg = '';
//    try
//    {
//        //$.ajax({
//        //    url: WA_FD_BTP + 'Signzy_Services/Check_Driving_License',
//        //    type: "POST",
//        //    data: objBO,
//        //    async: false,
//        //    contentType: false,
//        //    processData: false,
//        //    beforeSend: OnBeforeSendCall,
//        //    success: function (result)
//        //    {
//        //        try
//        //        {
//        //            let jsonResult = JSON.parse(result);
//        //            if (!$.isEmptyObject(jsonResult.ErrorCode) && !$.isEmptyObject(jsonResult.ErrorMessage))
//        //                err_msg += 'An error occurred while processing your request. Please try again..';
//        //            else
//        //            { }


//        //        } catch (e)
//        //        {
//        //            err_msg = 'Something went wrong..!';
//        //            fnException(e);
//        //        }
//        //        $('#preloader').hide();
//        //    },
//        //    error: ErrorFunction,
//        //    complete: null
//        //});

//        ExtendedAjaxCall('Signzy_Services/Extract_PAN_Data', objBO, 'POST', function(result) 
//        {
//            try
//            {
//                if (!$.isEmptyObject(result.ErrorCode) && !$.isEmptyObject(result.ErrorMessage))
//                    err_msg += '';
//                //err_msg += 'An error occurred while processing your request. Please try again..';
//                else if (!$.isEmptyObject(result) && !$.isEmptyObject(result.response.result))
//                {

//                }

//                $('#preloader').hide();

//            } catch (e)
//            {
//                err_msg = 'Something went wrong..!';
//                fnException(e);
//            }
//        }, null, true, false, false, ErrorFunction);

//    } catch (e)
//    {
//        err_msg = 'Something went wrong..!';
//        fnException(e);
//    }

//    return err_msg;
//}

//ovd ref no verification

const OVD_Ref_Verification = function (ref_no)
{
    let err_msg = '';
    try
    {
        $(ref_no).val($(ref_no).val().toUpperCase());
        $(ref_no).next().text('').hide();
        let objBO = {};
        objBO.DocId = $(ref_no).attr('doc_id');
        objBO.Holder_Type = $(ref_no).attr('HolderTypeCode');
        let sub_doc_type = $(ref_no).attr('sub_doc_type');
        let doc_no = $(ref_no).val();
        objBO.OVD_Type = '';
        objBO.OVD_Task = 'BF';
        objBO.App_Code = 'CPTP_UNI';
        objBO.Appl_No = $('#lblApplicationNumber').text();
        objBO.Source_Type = 'CPTP_UNI';
        objBO.Source_Sub_Type = 'CPTP_UNI';
        objBO.Parameters = [];

        if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '01')
        {
            objBO.OVD_HolderFirstName = $('#txtInvFirstName').val().trim();
            objBO.OVD_HolderMiddleName = $('#txtInvMiddleName').val().trim();
            objBO.OVD_HolderLastName = $('#txtInvLastName').val().trim();
        }
        else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '01')
        {
            objBO.OVD_HolderFirstName = $('#DV_SH #txtFName').val().trim();
            objBO.OVD_HolderMiddleName = $('#DV_SH #txtMName').val().trim();
            objBO.OVD_HolderLastName = $('#DV_SH #txtLName').val().trim();
        }
        else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '01')
        {
            objBO.OVD_HolderFirstName = $('#DV_TH #txtFName').val().trim();
            objBO.OVD_HolderMiddleName = $('#DV_TH #txtMName').val().trim();
            objBO.OVD_HolderLastName = $('#DV_TH #txtLName').val().trim();
        }


        if ($.isEmptyObject(doc_no))
            return false;
        if ($.isEmptyObject(objBO.DocId))
            return false;

        ///pan validations-------------------------------------------------------
        //individual pan
        if (sub_doc_type.toUpperCase().match('PAN') == 'PAN'
            && BTP_OBJECT.IND_NIND == 'IND'
            && !IsValidPAN(doc_no))
        {
            err_msg = 'PAN ref no is not valid..!';
        }
        //individual pan
        else if (sub_doc_type.toUpperCase().match('PAN') == 'PAN'
            && BTP_OBJECT.IND_NIND == 'IND')
        {
            let Name = '';
            let FatherName = '';
            if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '01')
            {
                Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
                FatherName = $('#DV_FH #txtFatherFName').val().trim() + ' ' + $('#DV_FH #txtFatherMName').val().trim() + ' ' + $('#DV_FH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '02')
            {
                Name = $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim();
                FatherName = $('#DV_SH #txtFatherFName').val().trim() + ' ' + $('#DV_SH #txtFatherMName').val().trim() + ' ' + $('#DV_SH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '03')
            {
                Name = $('#DV_TH #txtFName').val().trim() + ' ' + $('#DV_TH #txtMName').val().trim() + ' ' + $('#DV_TH #txtLName').val().trim();
                FatherName = $('#DV_TH #txtFatherFName').val().trim() + ' ' + $('#DV_TH #txtFatherMName').val().trim() + ' ' + $('#DV_TH #txtFatherLName').val().trim();
            }

            objBO.OVD_Type = 'CI';
            if (!$.isEmptyObject($.trim(Name)))
                objBO.Parameters.push({ key: "Name", value: Name });
            if (!$.isEmptyObject($.trim(FatherName)))
                objBO.Parameters.push({ key: "Father Name", value: FatherName });
            objBO.Parameters.push({ key: "Pan Number", value: doc_no });
        }
        else if (sub_doc_type.toUpperCase().match('PAN') == 'PAN'
            && BTP_OBJECT.IND_NIND != 'IND'
            && IsValidPAN(doc_no))
        {
            objBO.OVD_Type = 'CB';
            //objBO.Parameters.push({ key: "Name", value: "Shivaprasad Terse" });
            //objBO.Parameters.push({ key: "Father Name", value: "Subhash Terse" });
            //objBO.Parameters.push({ key: "Pan Number", value: doc_no });
        }

        ///Driving Licence-----------------------------------------------------------
        if (sub_doc_type.toUpperCase().match('DRIVING') == 'DRIVING'
            && BTP_OBJECT.IND_NIND == 'IND')
        {
            let Name = '';
            let FatherName = '';
            if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '01')
            {
                Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
                FatherName = $('#DV_FH #txtFatherFName').val().trim() + ' ' + $('#DV_FH #txtFatherMName').val().trim() + ' ' + $('#DV_FH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '02')
            {
                Name = $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim();
                FatherName = $('#DV_SH #txtFatherFName').val().trim() + ' ' + $('#DV_SH #txtFatherMName').val().trim() + ' ' + $('#DV_SH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '03')
            {
                Name = $('#DV_TH #txtFName').val().trim() + ' ' + $('#DV_TH #txtMName').val().trim() + ' ' + $('#DV_TH #txtLName').val().trim();
                FatherName = $('#DV_TH #txtFatherFName').val().trim() + ' ' + $('#DV_TH #txtFatherMName').val().trim() + ' ' + $('#DV_TH #txtFatherLName').val().trim();
            }

            objBO.OVD_Type = 'D';
            if (!$.isEmptyObject($.trim(Name)))
                objBO.Parameters.push({ key: "Name", value: Name });
            if (!$.isEmptyObject($.trim(FatherName)))
                objBO.Parameters.push({ key: "Father Name", value: FatherName });
            objBO.Parameters.push({ key: "DL NO", value: doc_no });
        }

        ///Passport------------------------------------------------------------------------
        if (sub_doc_type.toUpperCase().match('PASSPORT') == 'PASSPORT'
            && BTP_OBJECT.IND_NIND == 'IND')
        {
            let Name = '';
            let FatherName = '';
            if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '01')
            {
                Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
                FatherName = $('#DV_FH #txtFatherFName').val().trim() + ' ' + $('#DV_FH #txtFatherMName').val().trim() + ' ' + $('#DV_FH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '02')
            {
                Name = $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim();
                FatherName = $('#DV_SH #txtFatherFName').val().trim() + ' ' + $('#DV_SH #txtFatherMName').val().trim() + ' ' + $('#DV_SH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '03')
            {
                Name = $('#DV_TH #txtFName').val().trim() + ' ' + $('#DV_TH #txtMName').val().trim() + ' ' + $('#DV_TH #txtLName').val().trim();
                FatherName = $('#DV_TH #txtFatherFName').val().trim() + ' ' + $('#DV_TH #txtFatherMName').val().trim() + ' ' + $('#DV_TH #txtFatherLName').val().trim();
            }

            objBO.OVD_Type = 'A';
            if (!$.isEmptyObject($.trim(Name)))
                objBO.Parameters.push({ key: "Name", value: Name });
            if (!$.isEmptyObject($.trim(FatherName)))
                objBO.Parameters.push({ key: "Father Name", value: FatherName });
            objBO.Parameters.push({ key: "Passport No", value: doc_no });
        }

        ///Voter ID------------------------------------------------------------------------
        if (sub_doc_type.toUpperCase().match('VOTER') == 'VOTER'
            && BTP_OBJECT.IND_NIND == 'IND')
        {
            let Name = '';
            let FatherName = '';
            if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '01')
            {
                Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
                FatherName = $('#DV_FH #txtFatherFName').val().trim() + ' ' + $('#DV_FH #txtFatherMName').val().trim() + ' ' + $('#DV_FH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '02')
            {
                Name = $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim();
                FatherName = $('#DV_SH #txtFatherFName').val().trim() + ' ' + $('#DV_SH #txtFatherMName').val().trim() + ' ' + $('#DV_SH #txtFatherLName').val().trim();
            }
            else if (!$.isEmptyObject(objBO.Holder_Type) && objBO.Holder_Type == '03')
            {
                Name = $('#DV_TH #txtFName').val().trim() + ' ' + $('#DV_TH #txtMName').val().trim() + ' ' + $('#DV_TH #txtLName').val().trim();
                FatherName = $('#DV_TH #txtFatherFName').val().trim() + ' ' + $('#DV_TH #txtFatherMName').val().trim() + ' ' + $('#DV_TH #txtFatherLName').val().trim();
            }

            objBO.OVD_Type = 'B';
            if (!$.isEmptyObject($.trim(Name)))
                objBO.Parameters.push({ key: "Name", value: Name });
            if (!$.isEmptyObject($.trim(FatherName)))
                objBO.Parameters.push({ key: "Father Name", value: FatherName });
            objBO.Parameters.push({ key: "Number", value: doc_no });
        }

        //Basic forgery check
        if ($.isEmptyObject(err_msg))
            err_msg = Basic_Forgery_Check(objBO);

        if (!$.isEmptyObject(err_msg))
            $(ref_no).next().text(err_msg).show();

    } catch (e)
    {
        err_msg = 'Something went wrong..!';
        fnException(e);
    }

    return err_msg;
};

//PAN/DL data extraction
const Data_Extraction = function (refNo)
{
    try
    {
        let HolderType = $(refNo).attr('HolderTypeCode');
        let sub_doc_type = $(refNo).attr('sub_doc_type');
        let Doc_Ref_No = $(refNo).val();
        let objBO = {};
        objBO.DocId = $(refNo).attr('doc_id');
        objBO.HolderType = $(refNo).attr('HolderTypeCode');


        if (!$.isEmptyObject(HolderType) && HolderType == '01')
        {
            objBO.OVD_HolderFirstName = $('#txtInvFirstName').val().trim();
            objBO.OVD_HolderMiddleName = $('#txtInvMiddleName').val().trim();
            objBO.OVD_HolderLastName = $('#txtInvLastName').val().trim();
            objBO.OVD_HolderDOB = $('#txtInvDOB').val();
        }
        else if (!$.isEmptyObject(HolderType) && HolderType == '02')
        {
            objBO.OVD_HolderFirstName = $('#DV_SH #txtFName').val().trim();
            objBO.OVD_HolderMiddleName = $('#DV_SH #txtMName').val().trim();
            objBO.OVD_HolderLastName = $('#DV_SH #txtLName').val().trim();
            objBO.OVD_HolderDOB = $('#DV_SH #txtDOB').val();
        }
        else if (!$.isEmptyObject(HolderType) && HolderType == '03')
        {
            objBO.OVD_HolderFirstName = $('#DV_TH #txtFName').val().trim();
            objBO.OVD_HolderMiddleName = $('#DV_TH #txtMName').val().trim();
            objBO.OVD_HolderLastName = $('#DV_TH #txtLName').val().trim();
            objBO.OVD_HolderDOB = $('#DV_TH #txtDOB').val();
        }
        objBO.Appl_No = $('#lblApplicationNumber').text();
        objBO.OVD_Task = 'DX';
        objBO.Source_Type = 'CPTP_UNI';
        objBO.Source_Sub_Type = 'CPTP_UNI';
        objBO.Holder_Type = HolderType;

        //individual pan
        if ($.isEmptyObject(Doc_Ref_No) && sub_doc_type.toUpperCase().match('PAN') == 'PAN'
            && BTP_OBJECT.IND_NIND == 'IND')
        {
            objBO.OVD_Type = 'CI';
            objBO.OVD_Number = '';

            ExtendedAjaxCall('Signzy_Services/Extract_PAN_Data', objBO, 'POST', function (result) 
            {
                try
                {
                    var panResult = result;
                    if (!$.isEmptyObject(result.result) && !$.isEmptyObject(result.result.response.result)
                        && !$.isEmptyObject(result.result.response.result.number))
                    {
                        $(refNo).val(result.result.response.result.number);
                    }

                    $('#preloader').hide();

                } catch (e)
                {

                }
            }, null, true, true, false, ErrorFunction);
        }
        //non-individual pan
        else if ($.isEmptyObject(Doc_Ref_No) && sub_doc_type.toUpperCase().match('PAN') == 'PAN'
            && BTP_OBJECT.IND_NIND != 'IND')
        {
            objBO.OVD_Type = 'CB';
            objBO.OVD_Number = '';

            ExtendedAjaxCall('Signzy_Services/Extract_PAN_Data', objBO, 'POST', function (result) 
            {
                try
                {
                    if (!$.isEmptyObject(result.result) && !$.isEmptyObject(result.result.response.result)
                        && !$.isEmptyObject(result.result.response.result.number))
                    {
                        $(refNo).val(result.result.response.result.number);
                    }

                    $('#preloader').hide();

                } catch (e)
                {

                }
            }, null, true, true, false, ErrorFunction);
        }
        //driving licence
        else if ($.isEmptyObject(Doc_Ref_No) && sub_doc_type.toUpperCase().match('DRIVING') == 'DRIVING')
        {
            objBO.OVD_Type = 'D';
            objBO.OVD_Number = '';

            ExtendedAjaxCall('Signzy_Services/Extract_PAN_Data', objBO, 'POST', function (result) 
            {
                try
                {
                    if (!$.isEmptyObject(result.result) && !$.isEmptyObject(result.result.response.result)
                        && !$.isEmptyObject(result.result.response.result.number))
                    {
                        $(refNo).val(result.result.response.result.number);
                    }

                    $('#preloader').hide();

                } catch (e)
                {
                    console.error(e);
                }
            }, null, true, true, false, ErrorFunction);
        }

    } catch (e)
    {
        console.error(e);
    }
}

const SignzyFileSizeValidation = function (file)
{
    try
    {
        if (!$.isEmptyObject(file) && Math.round((file.size / 1024 / 1024), 2) > 2.00)
        {
            MessagePopup('<p>Selected document could not be uploaded. Exceeding the maximum file size of 2MB !!</p>', 'error');
            return false;
        }
        return true;

    } catch (e)
    {
        fnException();
    }
}