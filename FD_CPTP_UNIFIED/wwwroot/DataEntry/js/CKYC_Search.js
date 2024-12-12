
const FH_CKYC_Search = function (Appl_No, OVDRefType, OVDRefNo, DOB)
{
    var objBO = {
        Appl_No: null,
        InvestorType: "01",
        OVDRefType: OVDRefType,
        OVDRefNo: OVDRefNo,
        DOB: DOB
    };
    ExtendedAjaxCall('CKYC_Search/CKYC_Search', objBO, 'POST', function (result)
    {
        try
        {
            if (!$.isEmptyObject(result) && result.Status == 1)
            {
                if (!$.isEmptyObject(result.result) && result.result[0].Status == 1)
                {
                    //validations
                    $('#ddlInvtitle,#txtInvFirstName,#txtInvMiddleName,#txtInvLastName,#txtInvPan,#txtMobile,#txtEmail').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                    $('#DV_FH .HOLD_DTL,#DV_FH .MORE_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                    var row = result.result[0];
                    BTP_OBJECT.FH_DATA_SOURCE = 'CKYC';
                    BTP_OBJECT.InvCountFolioYear = 0;

                    //title
                    $('#ddlInvtitle').val(row.NamePrefix).change();

                    //name
                    $('#txtInvFirstName').val(row.Holder_F_Name).change();
                    $('#txtInvMiddleName').val(row.Holder_M_Name).change();
                    $('#txtInvLastName').val(row.Holder_L_Name).change();
                    $('#lblInvestorName').text(row.Holder_Full_Name);

                    //gender
                    $('#DV_FH #ddlGender').val(row.Gender).change();

                    //dob
                    $('#txtInvDOB').datetextentry('set_date', row.DOB).focusout();
                    $('#lblDOB').text(row.Display_DOB);
                    InvDOB_Change();

                    //pan
                    $('#txtInvPan').val(row.PAN).change();
                    $('#lblPAN').text(row.PAN);

                    //mobile
                    $('#txtMobile').val(row.MOBILE_NO).change();
                    $('#lblMobileNumber').text(row.MOBILE_NO);

                    //email
                    $('#txtEmail').val(row.EMAIL_ID).change();
                    $('#lblEmailID').val(row.EMAIL_ID);

                    //tel no
                    $('#DV_FH_P_ADDR #txtTelephone').val(row.TEL_RES);

                    //maritalstatus
                    $('#DV_FH #ddlMaritalStatus').val(row.MARITAL_STATUS).change();

                    //father name
                    $('#DV_FH #ddlFatherTitle').val(row.Holder_Father_Prefix);
                    $('#DV_FH #txtFatherFName').val(row.Holder_Father_F_Name);
                    $('#DV_FH #txtFatherMName').val(row.Holder_Father_M_Name);
                    $('#DV_FH #txtFatherLName').val(row.Holder_Father_L_Name);

                    //mother name
                    $('#DV_FH #ddlMotherTitle').val(row.Holder_Mother_Prefix);
                    $('#DV_FH #txtMotherFName').val(row.Holder_Mother_F_Name);
                    $('#DV_FH #txtMotherMName').val(row.Holder_Mother_M_Name);
                    $('#DV_FH #txtMotherLName').val(row.Holder_Mother_L_Name);

                    //spouse name
                    $('#DV_FH #ddlSpouseTitle').val(row.Holder_Spouse_Prefix);
                    $('#DV_FH #txtSpouseFName').val(row.Holder_Spouse_F_Name);
                    $('#DV_FH #txtSpouseMName').val(row.Holder_Spouse_M_Name);
                    $('#DV_FH #txtSpouseLName').val(row.Holder_Spouse_L_Name);

                    //guardian name
                    $('#DV_FH #ddlGuardianTitle').val(row.Holder_Guardian_Prefix);
                    $('#DV_FH #txtGuardianFName').val(row.Holder_Guardian_F_Name);
                    $('#DV_FH #txtGuardianMName').val(row.Holder_Guardian_M_Name);
                    $('#DV_FH #txtGuardianLName').val(row.Holder_Guardian_L_Name);
                    $('#DV_FH #txtGuardianPAN').val(row.Holder_Guardian_PAN);

                    //occupation
                    $('#DV_FH #ddlOccupation').val(row.OccupationType);

                    //ckyc no
                    $('#txtInvCKYCNumber').val(row.CKYCNumber);

                    //PER 
                    if (!$.isEmptyObject(row.ADD1))
                    {
                        $('#DV_FH_P_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                        $('#DV_FH_P_ADDR #txtAdd1').val(row.ADD1);
                        $('#DV_FH_P_ADDR #txtAdd2').val(row.ADD2);
                        $('#DV_FH_P_ADDR #txtAdd3').val(row.ADD3);
                        $('#DV_FH_P_ADDR #ddlCountry').val(row.CountryCode).change();
                        $('#DV_FH_P_ADDR #txtCity').val(row.CITY);
                        $('#DV_FH_P_ADDR #txtState').val(row.STATE);
                        $('#DV_FH_P_ADDR #txtDistrict').val(row.DISTRICT);
                        $('#DV_FH_P_ADDR #txtPin').val(row.PINCODE).keyup();
                    }

                    //Mailing
                    if (!$.isEmptyObject(row.M_ADD1))
                    {
                        $('#chkIsFHAddrSameAsPermanent').prop('disabled', true);
                        $('#DV_FH_M_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                        $('#DV_FH_M_ADDR #txtAdd1').val(row.M_ADD1);
                        $('#DV_FH_M_ADDR #txtAdd2').val(row.M_ADD2);
                        $('#DV_FH_M_ADDR #txtAdd3').val(row.M_ADD3);
                        $('#DV_FH_M_ADDR #ddlCountry').val(row.M_CountryCode).change();
                        $('#DV_FH_M_ADDR #txtState').val(row.M_STATE);
                        $('#DV_FH_M_ADDR #txtDistrict').val(row.M_DISTRICT);
                        $('#DV_FH_M_ADDR #txtCity').val(row.M_CITY);
                        $('#DV_FH_M_ADDR #txtPin').val(row.M_PINCODE).keyup();
                    }

                    if (!$.isEmptyObject(row.O_ADD1))
                    {
                        $('#chkIdOverSeasAddress').prop('checked', true).change();

                        $('#txtOAdd1').val(row.O_ADD1);
                        $('#txtOAdd2').val(row.O_ADD2);
                        $('#txtOAdd3').val(row.O_ADD3);
                        $('#ddlOCountry').val(row.O_CountryCode).change();
                        $('#txtOState').val(row.O_STATE);
                        $('#txtOCity').val(row.O_CITY);
                        $('#txtOPin').val(row.O_PINCODE).keyup();

                    }

                    //FH ckyc validations
                    FH_CKYC_Validations();

                    //validations
                    $('#ddl_CKYC_SearchBy').val('select');
                    $('#txt_CKYC_SearchByRef').val('');
                    $('#txt_CKYC_SearchDOB').datetextentry('set_date', null);
                    $('#btnFHAddManually').hide();

                    $('#IdInfoDiv').slideDown();
                    $('#DV_FH_CKYC_SEARCH').hide();
                    $('#DV_INV_DETAILS').show();
                }
            }
            else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg))
            {
                $('#btnFHAddManually').show();
                BtpMessagePopup(result.Msg, "error");
            }
            else
            {
                $('#btnFHAddManually').show();
                BtpMessagePopup("<p>No Record Found</p>", "error");
            }

            $('#preloader').hide();

        } catch (e)
        {
            fnException(e);
        }
    }, null, true, true, false, ErrorFunction);

}

//first holder ckyc validations
const FH_CKYC_Validations = function ()
{
    try
    {
        $('#DV_FH .HOLD_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_FH .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_FH .MORE_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //title  
        if ($('#ddlInvtitle').val() == 'select')
            $('#ddlInvtitle').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //name
        $('#txtInvFirstName').prop('required', true);
        $('#txtInvFirstName,#txtInvMiddleName,#txtInvLastName').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //gender
        if ($('#DV_FH #ddlGender').val() == 'select')
            $('#DV_FH #ddlGender').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //dob
        if (BTP_OBJECT.IND_NIND == 'IND')
        {
            if ($.isEmptyObject($('#txtInvDOB').val()))
            {
                $('#txtInvDOB').datetextentry('set_readonly', false);
                $('#txtInvDOB').parent().addClass('InputBordeRed');
            }
            else
            {
                $('#txtInvDOB').datetextentry('set_readonly', true);
                $('#txtInvDOB').parent().removeClass('InputBordeRed');
            }
        }
        else
        {
            if ($.isEmptyObject($('#txtInvDOI').val()))
            {
                $('#txtInvDOI').datetextentry('set_readonly', false);
                $('#txtInvDOI').parent().addClass('InputBordeRed');
            }
            else
            {
                $('#txtInvDOI').datetextentry('set_readonly', true);
                $('#txtInvDOI').parent().removeClass('InputBordeRed');
            }
        }
        //else
        //{
        //    $('#txtInvDOB,#txtInvDOI').datetextentry('set_date', null).datetextentry('set_readonly', false);
        //}

        //pan
        if ($.isEmptyObject($('#txtInvPan').val()) && (!IsMinor($('#txtInvDOB').val()) || BTP_OBJECT.IND_NIND != 'IND'))
            $('#txtInvPan').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            $('#txtInvPan').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //CKYC No
        $('#txtInvCKYCNumber').prop('required', true).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //ckyc no
        $('#DV_FH #txtCKYCNumber').prop('disabled', true).addClass('DisabledControl');


        //Guard pan 
        if ($.isEmptyObject($('#DV_FH #txtGuardianPAN').val()) && (IsMinor($('#DV_FH #txtDOB').val()) && BTP_OBJECT.IND_NIND == 'IND'))
            $('#DV_FH #txtGuardianPAN').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard title 
        if ($.isEmptyObject($('#DV_FH #ddlGuardianTitle').val()) && (IsMinor($('#DV_FH #txtDOB').val()) && BTP_OBJECT.IND_NIND == 'IND'))
            $('#DV_FH #ddlGuardianTitle').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard name 
        if ($.isEmptyObject($('#DV_FH #txtGuardianFName').val()) && (IsMinor($('#DV_FH #txtDOB').val()) && BTP_OBJECT.IND_NIND == 'IND'))
            $('#DV_FH #txtGuardianFName').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mobile
        if ($.isEmptyObject($('#txtMobile').val()))
            $('#txtMobile').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            $('#txtMobile').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //email
        if ($.isEmptyObject($('#txtEmail').val()))
            $('#txtEmail').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            $('#txtEmail').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //either father/mother/spouse name is required
        if ($.isEmptyObject($('#DV_FH #txtFatherFName').val())
            && $.isEmptyObject($('#DV_FH #txtMotherFName').val())
            && $.isEmptyObject($('#DV_FH #txtSpouseFName').val()))
        {
            $('#DV_FH #ddlFatherTitle').val('MR').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_FH #ddlMotherTitle').val('MRS').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_FH #ddlSpouseTitle').val('select').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_FH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');
        }

        //Occupation
        if ($('#DV_FH #ddlOccupation').val() == 'select') {
            $('#DV_FH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_FH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //AnnualIncome
        if ($('#DV_FH #ddlAnnualIncome').val() == 'select') {
            $('#DV_FH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_FH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent address1
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtAdd1').val()))
        {
            $('#DV_FH_P_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_FH_P_ADDR #txtAdd2,#DV_FH_P_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_FH_P_ADDR #ddlCountry').val() == 'select')
            $('#DV_FH_P_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent pincode
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtPin').val()))
            $('#DV_FH_P_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent city
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtCity').val()))
            $('#DV_FH_P_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent state/district
        if ($('#DV_FH_P_ADDR #ddlCountry').val() != 'IN')
        {
            if ($.isEmptyObject($('#DV_FH_P_ADDR #txtState').val()))
                $('#DV_FH_P_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_FH_P_ADDR #txtDistrict').val()))
                $('#DV_FH_P_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtAdd1').val()))
        {
            $('#DV_FH_M_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_FH_M_ADDR #txtAdd2,#DV_FH_M_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_FH_M_ADDR #ddlCountry').val() == 'select')
            $('#DV_FH_M_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing pincode
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtPin').val()))
            $('#DV_FH_M_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing city
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtCity').val()))
            $('#DV_FH_M_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        if ($('#DV_FH_M_ADDR #ddlCountry').val() != 'IN')
        {
            if ($.isEmptyObject($('#DV_FH_M_ADDR #txtState').val()))
                $('#DV_FH_M_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_FH_M_ADDR #txtDistrict').val()))
                $('#DV_FH_M_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //overseas address1
        if ($('#chkIdOverSeasAddress').prop('checked'))
        {
            if ($.isEmptyObject($('#txtOAdd1').val()))
            {
                $('#txtOAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
                $('#txtOAdd2,#txtOAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
            }

            //overseas country
            if ($('#ddlOCountry').val() == 'select')
                $('#ddlOCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            //overseas pincode
            if ($.isEmptyObject($('#txtOPin').val()))
                $('#txtOPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            //overseas city
            if ($.isEmptyObject($('#txtOCity').val()))
                $('#txtOCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#txtOState').val()))
                $('#txtOState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

    } catch (e)
    {
        fnException(e);
    }
}

//second holder ckyc validations
const SH_CKYC_Validations = function ()
{
    try
    {
        $('#DV_SH .HOLD_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_SH .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_SH .MORE_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //title 
        if ($('#DV_SH #ddlTitle').val() == 'select')
            $('#DV_SH #ddlTitle').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //name

        $('#DV_SH #txtFName').prop('required', true).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_SH #txtMName,#DV_SH #txtLName').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');


        //gender
        if ($('#DV_SH #ddlGender').val() == 'select')
            $('#DV_SH #ddlGender').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //dob
        if ($.isEmptyObject($('#DV_SH #txtDOB').val()))
        {
            $('#DV_SH #txtDOB').datetextentry('set_readonly', false);
            $('#DV_SH #txtDOB').parent().addClass('InputBorderRed');
        }
        else
        {
            $('#DV_SH #txtDOB').datetextentry('set_readonly', true);
            $('#DV_SH #txtDOB').parent().removeClass('InputBorderRed');
        }

        //pan
        if ($.isEmptyObject($('#DV_SH #txtPAN').val()) && !IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #txtPAN').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            $('#DV_SH #txtPAN').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //Guard pan 
        if ($.isEmptyObject($('#DV_SH #txtGuardianPAN').val()) && IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #txtGuardianPAN').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard title 
        if ($.isEmptyObject($('#DV_SH #ddlGuardianTitle').val()) && IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #ddlGuardianTitle').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard name 
        if ($.isEmptyObject($('#DV_SH #txtGuardianFName').val()) && IsMinor($('#DV_SH #txtDOB').val()))
            $('#DV_SH #txtGuardianFName').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mobile
        if ($.isEmptyObject($('#DV_SH #txtMobileNo').val()))
            $('#DV_SH #txtMobileNo').prop('disabled', false).removeClass('DisabledControl');

        //email
        if ($.isEmptyObject($('#DV_SH #txtEmailId').val()))
            $('#DV_SH #txtEmailId').prop('disabled', false).removeClass('DisabledControl');

        //either father/mother/spouse name is required
        if ($.isEmptyObject($('#DV_SH #txtFatherFName').val())
            && $.isEmptyObject($('#DV_SH #txtMotherFName').val())
            && $.isEmptyObject($('#DV_SH #txtSpouseFName').val()))
        {
            $('#DV_SH #ddlFatherTitle').val('MR').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_SH #ddlMotherTitle').val('MRS').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_SH #ddlSpouseTitle').val('select').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');
        }

        //ckyc no
        $('#DV_SH #txtCKYCNumber').prop('disabled', true).addClass('DisabledControl');

        //Occupation
        if ($('#DV_SH #ddlOccupation').val() == 'select') {
            $('#DV_SH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
       

        //AnnualIncome
        if ($('#DV_SH #ddlAnnualIncome').val() == 'select') {
            $('#DV_SH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
      

        //permanent address1
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtAdd1').val()))
        {
            $('#DV_SH_P_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_SH_P_ADDR #txtAdd2,#DV_SH_P_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_SH_P_ADDR #ddlCountry').val() == 'select')
            $('#DV_SH_P_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent pincode
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtPin').val()))
            $('#DV_SH_P_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent city
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtCity').val()))
            $('#DV_SH_P_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent state/district
        if ($('#DV_SH_P_ADDR #ddlCountry').val() != 'IN')
        {
            if ($.isEmptyObject($('#DV_SH_P_ADDR #txtState').val()))
                $('#DV_SH_P_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_SH_P_ADDR #txtDistrict').val()))
                $('#DV_SH_P_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtAdd1').val()))
        {
            $('#DV_SH_M_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_SH_M_ADDR #txtAdd2,#DV_SH_M_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_SH_M_ADDR #ddlCountry').val() == 'select')
            $('#DV_SH_M_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing pincode
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtPin').val()))
            $('#DV_SH_M_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing city
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtCity').val()))
            $('#DV_SH_M_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        if ($('#DV_SH_M_ADDR #ddlCountry').val() != 'IN')
        {
            if ($.isEmptyObject($('#DV_SH_M_ADDR #txtState').val()))
                $('#DV_SH_M_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_SH_M_ADDR #txtDistrict').val()))
                $('#DV_SH_M_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }


    } catch (e)
    {
        fnException(e);
    }
}

//third holder ckyc validations
const TH_CKYC_Validations = function ()
{
    try
    {
        $('#DV_TH .HOLD_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_TH .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_TH .MORE_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //title 
        if ($('#DV_TH #ddlTitle').val() == 'select')
            $('#DV_TH #ddlTitle').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //name      
        $('#DV_TH #txtFName').prop('required', true).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
        $('#DV_TH #txtFName,#DV_TH #txtMName,#DV_TH #txtLName').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //gender
        if ($('#DV_TH #ddlGender').val() == 'select')
            $('#DV_TH #ddlGender').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //dob
        if ($.isEmptyObject($('#DV_TH #txtDOB').val()))
        {
            $('#DV_TH #txtDOB').datetextentry('set_readonly', false);
            $('#DV_TH #txtDOB').parent().addClass('InputBorderRed');
        }
        else
        {
            $('#DV_TH #txtDOB').datetextentry('set_readonly', true);
            $('#DV_TH #txtDOB').parent().removeClass('InputBorderRed');
        }

        //pan
        if ($.isEmptyObject($('#DV_TH #txtPAN').val()) && !IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #txtPAN').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        else
            $('#DV_TH #txtPAN').prop('required', true).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

        //Guard pan 
        if ($.isEmptyObject($('#DV_TH #txtGuardianPAN').val()) && IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #txtGuardianPAN').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard title 
        if ($.isEmptyObject($('#DV_TH #ddlGuardianTitle').val()) && IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #ddlGuardianTitle').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //Guard name 
        if ($.isEmptyObject($('#DV_TH #txtGuardianFName').val()) && IsMinor($('#DV_TH #txtDOB').val()))
            $('#DV_TH #txtGuardianFName').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mobile
        if ($.isEmptyObject($('#DV_TH #txtMobileNo').val()))
            $('#DV_TH #txtMobileNo').prop('disabled', false).removeClass('DisabledControl');

        //email
        if ($.isEmptyObject($('#DV_TH #txtEmailId').val()))
            $('#DV_TH #txtEmailId').prop('disabled', false).removeClass('DisabledControl');

        //either father/mother/spouse name is required
        if ($.isEmptyObject($('#DV_TH #txtFatherFName').val())
            && $.isEmptyObject($('#DV_TH #txtMotherFName').val())
            && $.isEmptyObject($('#DV_TH #txtSpouseFName').val()))
        {
            $('#DV_TH #ddlFatherTitle').val('MR').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_TH #ddlMotherTitle').val('MRS').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

            $('#DV_TH #ddlSpouseTitle').val('select').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');
        }

        //ckyc no
        $('#DV_TH #txtCKYCNumber').prop('disabled', true).addClass('DisabledControl');

        //Occupation
        if ($('#DV_TH #ddlOccupation').val() == 'select') {
            $('#DV_TH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_TH #ddlOccupation').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //AnnualIncome
        if ($('#DV_TH #ddlAnnualIncome').val() == 'select') {
            $('#DV_TH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }
        else {
            $('#DV_TH #ddlAnnualIncome').prop('required', true).prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }


        //permanent address1
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtAdd1').val()))
        {
            $('#DV_TH_P_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_TH_P_ADDR #txtAdd2,#DV_TH_P_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_TH_P_ADDR #ddlCountry').val() == 'select')
            $('#DV_TH_P_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent pincode
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtPin').val()))
            $('#DV_TH_P_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent city
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtCity').val()))
            $('#DV_TH_P_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //permanent state/district
        if ($('#DV_TH_P_ADDR #ddlCountry').val() != 'IN')
        {
            if ($.isEmptyObject($('#DV_TH_P_ADDR #txtState').val()))
                $('#DV_TH_P_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_TH_P_ADDR #txtDistrict').val()))
                $('#DV_TH_P_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtAdd1').val()))
        {
            $('#DV_TH_M_ADDR #txtAdd1').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
            $('#DV_TH_M_ADDR #txtAdd2,#DV_TH_M_ADDR #txtAdd3').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_TH_M_ADDR #ddlCountry').val() == 'select')
            $('#DV_TH_M_ADDR #ddlCountry').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing pincode
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtPin').val()))
            $('#DV_TH_M_ADDR #txtPin').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        //mailing city
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtCity').val()))
            $('#DV_TH_M_ADDR #txtCity').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

        if ($('#DV_TH_M_ADDR #ddlCountry').val() != 'IN')
        {
            if ($.isEmptyObject($('#DV_TH_M_ADDR #txtState').val()))
                $('#DV_TH_M_ADDR #txtState').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');

            if ($.isEmptyObject($('#DV_TH_M_ADDR #txtDistrict').val()))
                $('#DV_TH_M_ADDR #txtDistrict').prop('disabled', false).removeClass('DisabledControl').addClass('InputBorderRed');
        }


    } catch (e)
    {
        fnException(e);
    }
}

//FH ckyc search
$('#btn_CKYC_SearchByCersai').click(function ()
{
    $("#FH_PEP").show();
    var OVDRefType = $('#ddl_CKYC_SearchBy').val();
    var PAN = $('#txt_CKYC_SearchByRef').val();
    var DOB = $('#txt_CKYC_SearchDOB').val();

    if ($.isEmptyObject(PAN) && OVDRefType == 'PAN')
    {
        BtpMessagePopup('Please enter PAN number', 'error');
        return;
    }
    else if ($.isEmptyObject(PAN) && OVDRefType == 'CKYC')
    {
        BtpMessagePopup('Please enter CKYC number', 'error');
        return;
    }
    else if (!IsValidPAN(PAN) && OVDRefType == 'PAN')
    {
        BtpMessagePopup('Please enter valid PAN number', 'error');
        return;;
    }
    else if ($.isEmptyObject(DOB))
    {
        BtpMessagePopup('Please enter DOB', 'error');
        return;;
    }

    FH_CKYC_Search(null, OVDRefType, PAN, DOB);

});

$('#btnFHAddManually').click(function ()
{
    $('#ddl_CKYC_SearchBy').val('select');
    $('#txt_CKYC_SearchByRef').val('');
    $('#txt_CKYC_SearchDOB').datetextentry('set_date', null);
    $('#btnFHAddManually').hide();

    $('#DV_FH_CKYC_SEARCH').hide();
    $('#DV_INV_DETAILS').show();
    //avinash added occupation
    BindDDLExtendedAjaxCall('#DV_FH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);

    $("#FH_PEP").show();
});

//SH ckyc search
$('#btn_SH_CKYC_Search').click(function ()
{
    try
    {
        let OVDRefType = $('#ddl_SH_CKYC_SearchBy').val();
        let PAN = $('#txt_SH_CKYC_SearchByRef').val();
        let DOB = $('#txt_SH_CKYC_Search_DOB').val();

        if ($.isEmptyObject(PAN) && OVDRefType == 'PAN')
        {
            BtpMessagePopup('Please enter PAN number', 'error');
            return;
        }
        else if ($.isEmptyObject(PAN) && OVDRefType == 'CKYC')
        {
            BtpMessagePopup('Please enter CKYC number', 'error');
            return;
        }
        else if (!IsValidPAN(PAN) && OVDRefType == 'PAN')
        {
            BtpMessagePopup('Please enter valid PAN number', 'error');
            return;;
        }
        else if ($.isEmptyObject(DOB))
        {
            BtpMessagePopup('Please enter DOB', 'error');
            return;;
        }


        var objBO = {
            Appl_No: $('#lblApplicationNumber').text(),
            InvestorType: "02",
            OVDRefType: OVDRefType,
            OVDRefNo: PAN,
            DOB: DOB
        };
        ExtendedAjaxCall('CKYC_Search/CKYC_Search', objBO, 'POST', function (result)
        {
            try
            {
                if (!$.isEmptyObject(result) && result.Status == 1)
                {
                    if (!$.isEmptyObject(result.result) && result.result[0].Status == 1)
                    {
                        $('#DV_SH .HOLD_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_SH .MORE_DTL').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                        let row = result.result[0];
                        BTP_OBJECT.SH_DATA_SOURCE = 'CKYC';
                        BTP_OBJECT.SHCountFolioYear = 0;

                        //title
                        $('#DV_SH #ddlTitle').val(row.NamePrefix).change();

                        //name
                        $('#DV_SH #txtFName').val(row.Holder_F_Name).change();
                        $('#DV_SH #txtMName').val(row.Holder_M_Name).change();
                        $('#DV_SH #txtLName').val(row.Holder_L_Name).change();

                        //gender
                        $('#DV_SH #ddlGender').val(row.Gender).change();

                        //dob
                        $('#DV_SH #txtDOB').datetextentry('set_date', row.DOB).focusout();
                        SHDOBChange();

                        //pan
                        $('#DV_SH #txtPAN').val(row.PAN).change();

                        //mobile
                        $('#DV_SH #txtMobileNo').val(row.MOBILE_NO).change();

                        //email
                        $('#DV_SH #txtEmailId').val(row.EMAIL_ID).change();

                        //tel no
                        $('#DV_SH_P_ADDR #txtTelephone').val(row.TEL_RES);

                        //maritalstatus
                        $('#DV_SH #ddlMaritalStatus').val(row.MARITAL_STATUS).change();

                        //father name
                        $('#DV_SH #ddlFatherTitle').val(row.Holder_Father_Prefix);
                        $('#DV_SH #txtFatherFName').val(row.Holder_Father_F_Name);
                        $('#DV_SH #txtFatherMName').val(row.Holder_Father_M_Name);
                        $('#DV_SH #txtFatherLName').val(row.Holder_Father_L_Name);

                        //mother name
                        $('#DV_SH #ddlMotherTitle').val(row.Holder_Mother_Prefix);
                        $('#DV_SH #txtMotherFName').val(row.Holder_Mother_F_Name);
                        $('#DV_SH #txtMotherMName').val(row.Holder_Mother_M_Name);
                        $('#DV_SH #txtMotherLName').val(row.Holder_Mother_L_Name);

                        //spouse name
                        $('#DV_SH #ddlSpouseTitle').val(row.Holder_Spouse_Prefix);
                        $('#DV_SH #txtSpouseFName').val(row.Holder_Spouse_F_Name);
                        $('#DV_SH #txtSpouseMName').val(row.Holder_Spouse_M_Name);
                        $('#DV_SH #txtSpouseLName').val(row.Holder_Spouse_L_Name);

                        //guardian name
                        $('#DV_SH #ddlGuardianTitle').val(row.Holder_Guardian_Prefix);
                        $('#DV_SH #txtGuardianFName').val(row.Holder_Guardian_F_Name);
                        $('#DV_SH #txtGuardianMName').val(row.Holder_Guardian_M_Name);
                        $('#DV_SH #txtGuardianLName').val(row.Holder_Guardian_L_Name);
                        $('#DV_SH #txtGuardianPAN').val(row.Holder_Guardian_PAN);

                        //occupation
                        $('#DV_SH #ddlOccupation').val(row.OccupationType);

                        //avinash added
                        BindDDLExtendedAjaxCall('#DV_SH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);
                        $('#DV_SH #ddlCustSegType').val('select');

                        if ($("#DV_SH_MD #ddlCustSegType").val() == "select") {
                            $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").hide();
                        }
                        else {
                            $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").show();
                        }


                        //ckyc no
                        $('#DV_SH #txtCKYCNumber').val(row.CKYCNumber);

                        //PER
                        if (!$.isEmptyObject(row.ADD1))
                        {
                            $('#DV_SH_P_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                            $('#chkIsSHAddrSameAsFH').prop('disabled', true);

                            $('#DV_SH_P_ADDR #txtAdd1').val(row.ADD1);
                            $('#DV_SH_P_ADDR #txtAdd2').val(row.ADD2);
                            $('#DV_SH_P_ADDR #txtAdd3').val(row.ADD3);
                            $('#DV_SH_P_ADDR #ddlCountry').val(row.CountryCode).change();
                            $('#DV_SH_P_ADDR #txtCity').val(row.CITY);
                            $('#DV_SH_P_ADDR #txtState').val(row.STATE);
                            $('#DV_SH_P_ADDR #txtDistrict').val(row.DISTRICT);
                            $('#DV_SH_P_ADDR #txtPin').val(row.PINCODE).keyup();
                        }

                        //Mailing
                        if (!$.isEmptyObject(row.M_ADD1))
                        {
                            $('#chkIsSHAddrSameAsPermanent').prop('disabled', true);
                            $('#DV_SH_M_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                            $('#DV_SH_M_ADDR #txtAdd1').val(row.M_ADD1);
                            $('#DV_SH_M_ADDR #txtAdd2').val(row.M_ADD2);
                            $('#DV_SH_M_ADDR #txtAdd3').val(row.M_ADD3);
                            $('#DV_SH_M_ADDR #ddlCountry').val(row.M_CountryCode).change();
                            $('#DV_SH_M_ADDR #txtState').val(row.M_STATE);
                            $('#DV_SH_M_ADDR #txtDistrict').val(row.M_DISTRICT);
                            $('#DV_SH_M_ADDR #txtCity').val(row.M_CITY);
                            $('#DV_SH_M_ADDR #txtPin').val(row.M_PINCODE).keyup();
                        }

                        //SH ckyc validations
                        SH_CKYC_Validations();

                        //validations
                        $('#ddl_SH_CKYC_SearchBy').val('select');
                        $('#txt_SH_CKYC_SearchByRef').val('');
                        $('#txt_SH_CKYC_Search_DOB').datetextentry('set_date', null);
                        $('#btnSHAddManually').hide();
                        $('#DV_PROV_SH').hide();
                        $('#DV_SH_SEARCH').hide();
                        $('#DV_SH_CKYC_SEARCH').hide();
                        $('#DV_SH_DTLS').show();
                    }
                }
                else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg))
                {
                    $('#btnSHAddManually').show();
                    BtpMessagePopup(result.Msg, "error");
                }
                else
                {
                    $('#btnSHAddManually').show();
                    BtpMessagePopup("<p>No Record Found</p>", "error");
                }

                $('#preloader').hide();

            } catch (e)
            {
                fnException(e);
            }
        }, null, true, true, false, ErrorFunction);

        $("#SH_PEP").show();

    } catch (e)
    {
        fnException(e);
    }
});

$('#btnSHAddManually').click(function ()
{
    $('#DV_SH .HOLD_DTL').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_SH .MORE_DTL').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_SH_P_ADDR .ADDR').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_SH_M_ADDR .ADDR').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_SH #txtDOB').prop('disabled', false);
    $('#DV_SH #txtDOB').parent().removeClass('DisabledControl').removeClass('InputBorderRed');

    $('#ddl_SH_CKYC_SearchBy').val('select');
    $('#txt_SH_CKYC_SearchByRef').val('');
    $('#txt_SH_CKYC_Search_DOB').datetextentry('set_date', null);
    $('#btnSHAddManually').hide();

    $('#DV_PROV_SH').hide();
    $('#DV_SH_SEARCH').hide();
    $('#DV_SH_CKYC_SEARCH').hide();
    $('#DV_SH_DTLS').show();
    $('#DV_SH #txtDOB').datetextentry('set_readonly', false);
    //avinash added occupation
    BindDDLExtendedAjaxCall('#DV_SH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);

    if ($("#DV_SH_MD #ddlCustSegType").val() == "select") {
        $("#DV_SH #Occ_Cus_SegSubtype_Div").hide();
    }
    else {
        $("#DV_SH #Occ_Cus_SegSubtype_Div").show();
    }

    $("#SH_PEP").show();
});

//TH ckyc search
$('#btn_TH_CKYC_Search').click(function ()
{
    try
    {
        let OVDRefType = $('#ddl_TH_CKYC_SearchBy').val();
        let PAN = $('#txt_TH_CKYC_SearchByRef').val();
        let DOB = $('#txt_TH_CKYC_Search_DOB').val();

        if ($.isEmptyObject(PAN) && OVDRefType == 'PAN')
        {
            BtpMessagePopup('Please enter PAN number', 'error');
            return;
        }
        else if ($.isEmptyObject(PAN) && OVDRefType == 'CKYC')
        {
            BtpMessagePopup('Please enter CKYC number', 'error');
            return;
        }
        else if (!IsValidPAN(PAN) && OVDRefType == 'PAN')
        {
            BtpMessagePopup('Please enter valid PAN number', 'error');
            return;;
        }
        else if ($.isEmptyObject(DOB))
        {
            BtpMessagePopup('Please enter DOB', 'error');
            return;;
        }


        var objBO = {
            Appl_No: $('#lblApplicationNumber').text(),
            InvestorType: "03",
            OVDRefType: OVDRefType,
            OVDRefNo: PAN,
            DOB: DOB
        };
        ExtendedAjaxCall('CKYC_Search/CKYC_Search', objBO, 'POST', function (result)
        {
            try
            {
                if (!$.isEmptyObject(result) && result.Status == 1)
                {
                    if (!$.isEmptyObject(result.result) && result.result[0].Status == 1)
                    {
                        let row = result.result[0];
                        BTP_OBJECT.TH_DATA_SOURCE = 'CKYC';
                        BTP_OBJECT.THCountFolioYear = 0;

                        //title
                        $('#DV_TH #ddlTitle').val(row.NamePrefix).change();

                        //name
                        $('#DV_TH #txtFName').val(row.Holder_F_Name).change();
                        $('#DV_TH #txtMName').val(row.Holder_M_Name).change();
                        $('#DV_TH #txtLName').val(row.Holder_L_Name).change();

                        //gender
                        $('#DV_TH #ddlGender').val(row.Gender).change();

                        //dob
                        $('#DV_TH #txtDOB').datetextentry('set_date', row.DOB).focusout();
                        THDOBChange();

                        //pan
                        $('#DV_TH #txtPAN').val(row.PAN).change();

                        //mobile
                        $('#DV_TH #txtMobileNo').val(row.MOBILE_NO).change();

                        //email
                        $('#DV_TH #txtEmailId').val(row.EMAIL_ID).change();

                        //tel no
                        $('#DV_TH_P_ADDR #txtTelephone').val(row.TEL_RES);

                        //maritalstatus
                        $('#DV_TH #ddlMaritalStatus').val(row.MARITAL_STATUS).change();

                        //father name
                        $('#DV_TH #ddlFatherTitle').val(row.Holder_Father_Prefix);
                        $('#DV_TH #txtFatherFName').val(row.Holder_Father_F_Name);
                        $('#DV_TH #txtFatherMName').val(row.Holder_Father_M_Name);
                        $('#DV_TH #txtFatherLName').val(row.Holder_Father_L_Name);

                        //mother name
                        $('#DV_TH #ddlMotherTitle').val(row.Holder_Mother_Prefix);
                        $('#DV_TH #txtMotherFName').val(row.Holder_Mother_F_Name);
                        $('#DV_TH #txtMotherMName').val(row.Holder_Mother_M_Name);
                        $('#DV_TH #txtMotherLName').val(row.Holder_Mother_L_Name);

                        //spouse name
                        $('#DV_TH #ddlSpouseTitle').val(row.Holder_Spouse_Prefix);
                        $('#DV_TH #txtSpouseFName').val(row.Holder_Spouse_F_Name);
                        $('#DV_TH #txtSpouseMName').val(row.Holder_Spouse_M_Name);
                        $('#DV_TH #txtSpouseLName').val(row.Holder_Spouse_L_Name);

                        //guardian name
                        $('#DV_TH #ddlGuardianTitle').val(row.Holder_Guardian_Prefix);
                        $('#DV_TH #txtGuardianFName').val(row.Holder_Guardian_F_Name);
                        $('#DV_TH #txtGuardianMName').val(row.Holder_Guardian_M_Name);
                        $('#DV_TH #txtGuardianLName').val(row.Holder_Guardian_L_Name);
                        $('#DV_TH #txtGuardianPAN').val(row.Holder_Guardian_PAN);

                        //occupation
                        $('#DV_TH #ddlOccupation').val(row.OccupationType);

                        //avinash added
                        BindDDLExtendedAjaxCall('#DV_TH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);
                        $('#DV_TH #ddlCustSegType').val('select');


                        if ($("#DV_TH_MD #ddlCustSegType").val() == "select") {
                            $("#DV_TH_MD #Occ_Cus_SegSubtype_Div").hide();
                        }
                        else {
                            $("#DV_TH_MD #Occ_Cus_SegSubtype_Div").show();
                        }

                        //ckyc no
                        $('#DV_TH #txtCKYCNumber').val(row.CKYCNumber);

                        //PER
                        if (!$.isEmptyObject(row.ADD1))
                        {
                            $('#DV_TH_P_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                            $('#chkIsTHAddrSameAsFH').prop('disabled', true);

                            $('#DV_TH_P_ADDR #txtAdd1').val(row.ADD1);
                            $('#DV_TH_P_ADDR #txtAdd2').val(row.ADD2);
                            $('#DV_TH_P_ADDR #txtAdd3').val(row.ADD3);
                            $('#DV_TH_P_ADDR #ddlCountry').val(row.CountryCode).change();
                            $('#DV_TH_P_ADDR #txtCity').val(row.CITY);
                            $('#DV_TH_P_ADDR #txtState').val(row.STATE);
                            $('#DV_TH_P_ADDR #txtDistrict').val(row.DISTRICT);
                            $('#DV_TH_P_ADDR #txtPin').val(row.PINCODE).keyup();
                        }

                        //Mailing
                        if (!$.isEmptyObject(row.M_ADD1))
                        {
                            $('#chkIsTHAddrSameAsPermanent').prop('disabled', true);
                            $('#DV_TH_M_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                            $('#DV_TH_M_ADDR #txtAdd1').val(row.M_ADD1);
                            $('#DV_TH_M_ADDR #txtAdd2').val(row.M_ADD2);
                            $('#DV_TH_M_ADDR #txtAdd3').val(row.M_ADD3);
                            $('#DV_TH_M_ADDR #ddlCountry').val(row.M_CountryCode).change();
                            $('#DV_TH_M_ADDR #txtState').val(row.M_STATE);
                            $('#DV_TH_M_ADDR #txtDistrict').val(row.M_DISTRICT);
                            $('#DV_TH_M_ADDR #txtCity').val(row.M_CITY);
                            $('#DV_TH_M_ADDR #txtPin').val(row.M_PINCODE).keyup();
                        }

                        //TH ckyc validations
                        TH_CKYC_Validations();

                        //validations
                        $('#ddl_TH_CKYC_SearchBy').val('select');
                        $('#txt_TH_CKYC_SearchByRef').val('');
                        $('#txt_TH_CKYC_Search_DOB').datetextentry('set_date', null);
                        $('#btnTHAddManually').hide();
                        $('#DV_PROV_TH').hide();
                        $('#DV_TH_SEARCH').hide();
                        $('#DV_TH_CKYC_SEARCH').hide();
                        $('#DV_TH_DTLS').show();
                    }
                }
                else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg))
                {
                    $('#btnTHAddManually').show();
                    BtpMessagePopup(result.Msg, "error");
                }
                else
                {
                    $('#btnTHAddManually').show();
                    BtpMessagePopup("<p>No Record Found</p>", "error");
                }

                $('#preloader').hide();

            } catch (e)
            {
                fnException(e);
            }
        }, null, true, true, false, ErrorFunction);

        $("#TH_PEP").show();
    } catch (e)
    {
        fnException(e);
    }
});

$('#btnTHAddManually').click(function ()
{
    $('#DV_TH .HOLD_DTL').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_TH .MORE_DTL').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_TH_P_ADDR .ADDR').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_TH_M_ADDR .ADDR').prop('disabled', false).removeClass('DisabledControl').removeClass('InputBorderRed');
    $('#DV_TH #txtDOB').prop('disabled', false);
    $('#DV_TH #txtDOB').parent().removeClass('DisabledControl').removeClass('InputBorderRed');

    $('#ddl_TH_CKYC_SearchBy').val('select');
    $('#txt_TH_CKYC_SearchByRef').val('');
    $('#txt_TH_CKYC_Search_DOB').datetextentry('set_date', null);
    $('#btnTHAddManually').hide();

    $('#DV_PROV_TH').hide();
    $('#DV_TH_SEARCH').hide();
    $('#DV_TH_CKYC_SEARCH').hide();
    $('#DV_TH_DTLS').show();

    $('#DV_TH #txtDOB').datetextentry('set_readonly', false);
    //avinash added occupation
    BindDDLExtendedAjaxCall('#DV_TH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);

    if ($("#DV_TH_MD #ddlCustSegType").val() == "select") {
        $("#DV_TH #Occ_Cus_SegSubtype_Div").hide();
    }
    else {
        $("#DV_TH #Occ_Cus_SegSubtype_Div").show();
    }
    $("#TH_PEP").show();
});
