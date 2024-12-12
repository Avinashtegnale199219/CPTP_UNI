const FHReset = function ()
{
    $('.D_T_E').parent().removeClass('InputBorderRed');
    $('.errorbox').text('').hide();
    $('#DV_FH input[type="text"]').val('').removeClass('InputBorderRed');
    $('#DV_FH input[type="checkbox"]').prop('checked', false).removeClass('InputBorderRed');
    $('#DV_FH select').val('select').removeClass('InputBorderRed');

    $('#DV_FH #btnfreshcutomer').hide();
    $('#DV_FH_SEARCH').slideDown();
    $('#DV_FH_HEAD').hide();
    $('#DV_FH_DTLS').slideUp();
    $('#chkIsFHAddrSameAsPermanent').prop('checked', false);
}
const SHReset = function ()
{
    $('.D_T_E').parent().removeClass('InputBorderRed');
    $('.errorbox').text('').hide();
    $('#DV_SH input[type="text"]').val('').removeClass('InputBorderRed');
    $('#DV_SH input[type="checkbox"]').prop('checked', false).removeClass('InputBorderRed');
    $('#DV_SH select').val('select').removeClass('InputBorderRed');

    $('#DV_SH #btnfreshcutomer').hide();
    if (!$.isEmptyObject($('#lblFolioNumber').text()))
    {
        $('#DV_PROV_SH').show();
        $('#DV_SH_SEARCH').hide();
    }
    else
    {
        $('#DV_PROV_SH').hide();
        $('#DV_SH_SEARCH').show();
    }
    $('#DV_SH_CKYC_SEARCH').hide();
    $('#DV_SH_HEAD').hide();
    $('#DV_SH_DTLS').hide();
    $('.SHHeader').text('');
    $('#chkIsSHAddrSameAsPermanent').prop('checked', false);
    $('#DV_SH #ddlFatherTitle').val('MR');
    $('#DV_SH #ddlMotherTitle').val('MRS');
}
const THReset = function ()
{
    $('.D_T_E').parent().removeClass('InputBorderRed');
    $('.errorbox').text('').hide();
    $('#DV_TH input[type="text"]').val('').removeClass('InputBorderRed');
    $('#DV_TH input[type="checkbox"]').prop('checked', false).removeClass('InputBorderRed');
    $('#DV_TH select').val('select').removeClass('InputBorderRed');

    $('#DV_TH #btnfreshcutomer').hide();
    if (!$.isEmptyObject($('#lblFolioNumber').text()))
    {
        $('#DV_PROV_TH').show();
        $('#DV_TH_SEARCH').hide();
    }
    else
    {
        $('#DV_PROV_TH').hide();
        $('#DV_TH_SEARCH').show();
    }
    $('#DV_TH_CKYC_SEARCH').hide();
    $('#DV_TH_HEAD').hide();
    $('#DV_TH_DTLS').hide();
    $('.THHeader').text('');
    $('#chkIsTHAddrSameAsPermanent').prop('checked', false);
    $('#DV_TH #ddlFatherTitle').val('MR');
    $('#DV_TH #ddlMotherTitle').val('MRS');
}
//get Investor details for additional purchase
const InvSearch = function (Dep_Category, searchby, Searchbyref, SearchByDOB, Appl_No)
{
    BTP_OBJECT.mode = 'R';

    if (!$.isEmptyObject(Searchbyref))
    {
        let SearchBo = {
            HolderType: '01',
            searchby: searchby,
            Searchbyref: Searchbyref,
            SearchByDOB: SearchByDOB,
            Appl_No: Appl_No,
            Dep_Category: Dep_Category
        }

        ExtendedAjaxCall('AdditionalPurchase/SearchExistingCustomer', SearchBo, 'POST', function (result)
        {
            //default validations
            BTP_OBJECT.InvCountFolioYear = 4;
            BTP_OBJECT.ApplicationType = 'F';
            BTP_OBJECT.FH_CKYC_COMPLIANT = result[0].CKYC_Compliant;

            $('#chkIsFHAddrSameAsPermanent').prop('checked', false).prop('disabled', false);
            $('#chkIdOverSeasAddress').prop('checked', false).change();
            $('#DV_FH #ddlFatherTitle').val('MR');
            $('#DV_FH #ddlMotherTitle').val('MRS');

            if (!$.isEmptyObject(result) && result.length > 0 && result[0].Msg.toUpperCase() == 'SUCCESS')
            {
                //Application details
                BTP_OBJECT.FH_DATA_SOURCE = result[0].Source;
                BTP_OBJECT.ApplicationType = 'A';
                BTP_OBJECT.InvCountFolioYear = result[0].CountFolioYear;

                //header details
                $('#lblFolioNumber').text(result[0].Folio);
                $('#lblExistingFDRNumber').text(result[0].Dep_no);
                $('#lblLastInvestmentDate').text(result[0].Last_Inv_Date);

                //title
                $('#ddlInvtitle').val(result[0]["NamePrefix"]).change();

                //FH name
                $('#txtInvFirstName').val(result[0].Holder_F_Name).change();
                $('#txtInvMiddleName').val(result[0].Holder_M_Name).change();
                $('#txtInvLastName').val(result[0].Holder_L_Name).change();
                $('#lblInvestorName').text(result[0].Holder_Full_Name);

                //gender
                $('#DV_FH #ddlGender').val(result[0].Gender).change();

                //dob
                if (BTP_OBJECT.IND_NIND == 'IND')
                {
                    $('#txtInvDOB').datetextentry('set_date', result[0].DOB).datetextentry('set_readonly', true).focusout();
                    $('#lblDOB').text(result[0].Display_DOB);
                    //$('#txtInvDOB').blur();
                    InvDOB_Change();
                }
                else 
                {
                    $('#txtInvDOI').datetextentry('set_date', result[0].DOB).datetextentry('set_readonly', true);
                    $('#lblDOB').text(result[0].Display_DOB);
                }

                //pan
                $('#txtInvPan').val(result[0].PAN).change();
                $('#lblPAN').text(result[0].PAN);

                //mobile
                $('#txtMobile').val(result[0]["MOBILE_NO"]).change();
                $('#lblMobileNumber').text(result[0]["MOBILE_NO"]);

                //email
                $('#txtEmail').val(result[0]["EMAIL_ID"]).change();
                $('#lblEmailID').text(result[0]["EMAIL_ID"]);

                //tel no
                $('#DV_FH_P_ADDR #txtTelephone').val(result[0].TEL_RES);

                //maritalstatus
                $('#DV_FH #ddlMaritalStatus').val(result[0].MARITAL_STATUS);

                //father  name
                if (!$.isEmptyObject(result[0].Holder_Father_F_Name))
                {
                    $('#DV_FH #ddlFatherTitle').val(result[0].Holder_Father_Prefix);
                    $('#DV_FH #txtFatherFName').val(result[0].Holder_Father_F_Name);
                    $('#DV_FH #txtFatherMName').val(result[0].Holder_Father_M_Name);
                    $('#DV_FH #txtFatherLName').val(result[0].Holder_Father_L_Name);
                }

                //mother
                if (!$.isEmptyObject(result[0].Holder_Mother_F_Name))
                {
                    $('#DV_FH #ddlMotherTitle').val(result[0].Holder_Mother_Prefix);
                    $('#DV_FH #txtMotherFName').val(result[0].Holder_Mother_F_Name);
                    $('#DV_FH #txtMotherMName').val(result[0].Holder_Mother_M_Name);
                    $('#DV_FH #txtMotherLName').val(result[0].Holder_Mother_L_Name);
                }

                //spouse
                if (!$.isEmptyObject(result[0].Holder_Spouse_F_Name))
                {
                    $('#DV_FH #ddlSpouseTitle').val(result[0].Holder_Spouse_Prefix);
                    $('#DV_FH #txtSpouseFName').val(result[0].Holder_Spouse_F_Name);
                    $('#DV_FH #txtSpouseMName').val(result[0].Holder_Spouse_M_Name);
                    $('#DV_FH #txtSpouseLName').val(result[0].Holder_Spouse_L_Name);
                }

                //guardian
                if (!$.isEmptyObject(result[0].Holder_Guardian_F_Name))
                {
                    $('#DV_FH #ddlGuardianTitle').val(result[0].Holder_Guardian_Prefix);
                    $('#DV_FH #txtGuardianFName').val(result[0].Holder_Guardian_F_Name);
                    $('#DV_FH #txtGuardianMName').val(result[0].Holder_Guardian_M_Name);
                    $('#DV_FH #txtGuardianLName').val(result[0].Holder_Guardian_L_Name);
                    $('#DV_FH #txtGuardianPAN').val(result[0].Holder_Guardian_PAN);
                }

                //annual income
                $('#DV_FH #ddlAnnualIncome').val(result[0].ANNUAL_INC);

                //occupation type
                $('#DV_FH #ddlCustSegType').val(result[0].CustSeg_Type_Code);

                //avinash added Occupation / sub - occupation changes
                BindDDLExtendedAjaxCall('#ddlCustSegSubType', 'DataEntry/Get_ddl_Occ_CustSegSubTypeList', null, 'POST', null, null, true, false, false, ErrorFunction);
                if (!$.isEmptyObject(result[0].CustSeg_Subtype_Code)) {
                    $("#Occ_Cus_SegSubtype_Div").show();
                    $('#DV_FH #ddlCustSegSubType').val(result[0].CustSeg_Subtype_Code);
                }
                else {
                    $('#DV_FH #ddlCustSegType').val('select');
                    $("#Occ_Cus_SegSubtype_Div").hide();
                }

                //ckyc no
                $('#txtInvCKYCNumber').val(result[0].CKYCNumber);

                $('#DV_FH #hdnMobilisationMode').val(result[0].MobilisationMode);

                //PER
                if (!$.isEmptyObject(result[0].ADD1))
                {
                    $('#DV_FH_P_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                    $('#DV_FH_P_ADDR #txtAdd1').val(result[0].ADD1);
                    $('#DV_FH_P_ADDR #txtAdd2').val(result[0].ADD2);
                    $('#DV_FH_P_ADDR #txtAdd3').val(result[0].ADD3);
                    $('#DV_FH_P_ADDR #ddlCountry').val(result[0].CountryCode).change();
                    $('#DV_FH_P_ADDR #txtCity').val(result[0].CITY);
                    if (result[0].CountryCode == 'IN')
                    {
                        $('#DV_FH_P_ADDR #txtPin').val(result[0].PINCODE).keyup();
                    }
                    else
                    {
                        $('#DV_FH_P_ADDR #txtState').val(result[0].STATE);
                        $('#DV_FH_P_ADDR #txtDistrict').val(result[0].DISTRICT);
                        $('#DV_FH_P_ADDR #txtPin').val(result[0].PINCODE);
                    }
                }

                //Mailing
                if (!$.isEmptyObject(result[0].M_ADD1))
                {
                    $('#chkIsFHAddrSameAsPermanent').prop('disabled', true);
                    $('#DV_FH_M_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                    $('#DV_FH_M_ADDR #txtAdd1').val(result[0].M_ADD1);
                    $('#DV_FH_M_ADDR #txtAdd2').val(result[0].M_ADD2);
                    $('#DV_FH_M_ADDR #txtAdd3').val(result[0].M_ADD3);
                    $('#DV_FH_M_ADDR #ddlCountry').val(result[0].M_CountryCode).change();
                    $('#DV_FH_M_ADDR #txtCity').val(result[0].M_CITY);

                    if (result[0].M_CountryCode == 'IN')
                    {
                        $('#DV_FH_M_ADDR #txtPin').val(result[0].M_PINCODE).keyup();
                    }
                    else
                    {
                        $('#DV_FH_M_ADDR #txtState').val(result[0].M_STATE);
                        $('#DV_FH_M_ADDR #txtDistrict').val(result[0].M_DISTRICT);
                        $('#DV_FH_M_ADDR #txtPin').val(result[0].M_PINCODE);
                    }
                }

                //overseas address
                if (!$.isEmptyObject(result[0].O_ADD1))
                {
                    $('#chkIdOverSeasAddress').prop('checked', true).change();
                    $('.O_ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                    $('#txtOAdd1').val(result[0].O_ADD1);
                    $('#txtOAdd2').val(result[0].O_ADD2);
                    $('#txtOAdd3').val(result[0].O_ADD3);
                    $('#ddlOCountry').val(result[0].O_CountryCode).change();
                    $('#txtOState').val(result[0].O_STATE)
                    $('#txtOPin').val(result[0].O_PINCODE);
                    $('#txtOCity').val(result[0].O_CITY);
                }

                //ckyc validations
                FH_KYC_Validations();

                ////ovd validations
                //if (BTP_OBJECT.InvCountFolioYear > 3)
                //{
                //    alert("Entered FDR is 3 Years old so OVDs are mandatory else reject the application.")
                //}

                //validations
                $('#btnfreshcutomer').hide();
                $('#addfreshInv').hide();
                $('#IdInfoDiv').slideDown();
                $('#IdInvestorSearch').slideUp();
                $('#DV_FH_CKYC_SEARCH').hide();
                $('#DV_INV_DETAILS').show();
                $('#IdInvestorInfo').slideDown();
            }
            else if (!$.isEmptyObject(result) && result.length > 0 && !$.isEmptyObject(result[0].Msg))
            {

                let msg = '<p>' + result[0].Msg + '</p>';
                BtpMessagePopup(msg, "error");
                $('#btnfreshcutomer').show();
                $('#addfreshInv').show();
                $('#divGetDetails').hide();
            }
            else
            {
                BtpMessagePopup("<p>No Record Found</p>", "error");
                $('#btnfreshcutomer').show();
                $('#addfreshInv').show();
                $('#divGetDetails').hide();
            }

            $('#preloader').hide();
        }, null, true, false, false, ErrorFunction);
    }

    BTP_OBJECT.mode = 'R';
}
//get second holder details
const SHSearch = function (searchby, Searchbyref, SearchByDOB, Appl_No)
{
    BTP_OBJECT.mode = 'R';

    if (!$.isEmptyObject(Searchbyref))
    {

        var SearchBo = {
            HolderType: '02',
            searchby: searchby,
            Searchbyref: Searchbyref,
            SearchByDOB: SearchByDOB,
            Appl_No: Appl_No

        }

        ExtendedAjaxCall('AdditionalPurchase/SearchExistingCustomer', SearchBo, 'POST', function (result)
        {
            BTP_OBJECT.SHCountFolioYear = 4;

            $('#DV_SH_HEAD').hide();
            $('#DV_SH_DTLS').hide();
            $('.SHHeader').text('');
            $('#chkIsSHAddrSameAsPermanent').prop('checked', false).prop('disabled', false);
            $('#chkIsSHAddrSameAsFH').prop('checked', false).prop('disabled', false);
            $('#DV_SH #ddlFatherTitle').val('MR');
            $('#DV_SH #ddlMotherTitle').val('MRS');

            if (!$.isEmptyObject(result) && result.length > 0 && result[0].Msg.toUpperCase() == 'SUCCESS')
            {
                var row = result[0];
                $('#hdrSHFolioNo').text(row.Folio);
                $('#hdrSHExistingFDRNo').text(row.Dep_no);
                $('#hdrSHLastInvDate').text(row.Last_Inv_Date);
                BTP_OBJECT.SHCountFolioYear = row.CountFolioYear;
                BTP_OBJECT.SH_DATA_SOURCE = result[0].Source;
                BTP_OBJECT.SH_CKYC_COMPLIANT = result[0].CKYC_Compliant;

                //title
                $('#DV_SH #ddlTitle').val(result[0]["NamePrefix"]).change();

                //name
                $('#DV_SH #txtFName').val(result[0].Holder_F_Name).change();
                $('#DV_SH #txtMName').val(result[0].Holder_M_Name).change();
                $('#DV_SH #txtLName').val(result[0].Holder_L_Name).change();

                //gender
                $('#DV_SH #ddlGender').val(result[0].Gender).change();

                //dob
                $('#DV_SH #txtDOB').datetextentry('set_date', result[0].DOB).datetextentry('set_readonly', true).focusout();
                //$('#DV_SH #txtDOB').blur();
                SHDOBChange();

                //pan
                $('#DV_SH #txtPAN').val(result[0].PAN).change();

                //mobile
                $('#DV_SH_P_ADDR #txtMobileNo').val(result[0]["MOBILE_NO"]).change();

                //email
                $('#DV_SH_P_ADDR #txtEmailId').val(result[0]["EMAIL_ID"]).change();

                //tel no
                $('#DV_SH_P_ADDR #txtTelephone').val(result[0].TEL_RES);

                //maritalstatus
                $('#DV_SH_MD #ddlMaritalStatus').val(result[0].MARITAL_STATUS);

                //father name
                if (!$.isEmptyObject(result[0].Holder_Father_F_Name))
                {
                    $('#DV_SH #ddlFatherTitle').val(result[0].Holder_Father_Prefix);
                    $('#DV_SH #txtFatherFName').val(result[0].Holder_Father_F_Name);
                    $('#DV_SH #txtFatherMName').val(result[0].Holder_Father_M_Name);
                    $('#DV_SH #txtFatherLName').val(result[0].Holder_Father_L_Name);
                }

                //mother name
                if (!$.isEmptyObject(result[0].Holder_Mother_F_Name))
                {
                    $('#DV_SH #ddlMotherTitle').val(result[0].Holder_Mother_Prefix);
                    $('#DV_SH #txtMotherFName').val(result[0].Holder_Mother_F_Name);
                    $('#DV_SH #txtMotherMName').val(result[0].Holder_Mother_M_Name);
                    $('#DV_SH #txtMotherLName').val(result[0].Holder_Mother_L_Name);
                }

                //spouse name
                if (!$.isEmptyObject(result[0].Holder_Spouse_F_Name))
                {
                    $('#DV_SH #ddlSpouseTitle').val(result[0].Holder_Spouse_Prefix);
                    $('#DV_SH #txtSpouseFName').val(result[0].Holder_Spouse_F_Name);
                    $('#DV_SH #txtSpouseMName').val(result[0].Holder_Spouse_M_Name);
                    $('#DV_SH #txtSpouseLName').val(result[0].Holder_Spouse_L_Name);
                }

                //guardian name
                if (!$.isEmptyObject(result[0].Holder_Guardian_F_Name))
                {
                    $('#DV_SH #ddlGuardianTitle').val(result[0].Holder_Guardian_Prefix);
                    $('#DV_SH #txtGuardianFName').val(result[0].Holder_Guardian_F_Name);
                    $('#DV_SH #txtGuardianMName').val(result[0].Holder_Guardian_M_Name);
                    $('#DV_SH #txtGuardianLName').val(result[0].Holder_Guardian_L_Name);
                    $('#DV_SH #txtGuardianPAN').val(result[0].Holder_Guardian_PAN);
                }

                //annual income
                $('#DV_SH #ddlAnnualIncome').val(result[0].ANNUAL_INC);

                //occupation
                $('#DV_SH #ddlCustSegType').val(result[0].CustSeg_Type_Code);


                //avinash added Occupation / sub - occupation changes
                BindDDLExtendedAjaxCall('#DV_SH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);

                if ($('#HdnCustSeg_typeCode_SH').val() != "" && $('#HdnCustSeg_typeCode_SH').val() != undefined) {
                    $('#DV_SH #ddlCustSegType').val($('#HdnCustSeg_typeCode_SH').val());
                }
                else {
                    $('#DV_SH #ddlCustSegType').val('select');
                }

                $('#DV_SH #ddlCustSegType').val(result[0].CustSeg_Type_Code);

                if (!$.isEmptyObject(result[0].CustSeg_Subtype_Code)) {
                    $("#Occ_Cus_SegSubtype_Div").show();
                    $('#DV_SH #ddlCustSegSubType').val(result[0].CustSeg_Subtype_Code);
                }
                else {
                    $("#Occ_Cus_SegSubtype_Div").hide();
                }

                //ckyc no
                $('#DV_SH #txtCKYCNumber').val(result[0].CKYCNumber);

                $('#DV_SH #hdnMobilisationMode').val(result[0].MobilisationMode);

                //PER
                if (!$.isEmptyObject(result[0].ADD1))
                {
                    $('#DV_SH_P_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                    $('#chkIsSHAddrSameAsFH').prop('disabled', true);

                    $('#DV_SH_P_ADDR #txtAdd1').val(result[0].ADD1);
                    $('#DV_SH_P_ADDR #txtAdd2').val(result[0].ADD2);
                    $('#DV_SH_P_ADDR #txtAdd3').val(result[0].ADD3);
                    $('#DV_SH_P_ADDR #ddlCountry').val(result[0].CountryCode).change();
                    $('#DV_SH_P_ADDR #txtCity').val(result[0].CITY);
                    if (result[0].CountryCode == 'IN')
                    {
                        $('#DV_SH_P_ADDR #txtPin').val(result[0].PINCODE).keyup();
                    }
                    else
                    {
                        $('#DV_SH_P_ADDR #txtState').val(result[0].STATE);
                        $('#DV_SH_P_ADDR #txtDistrict').val(result[0].DISTRICT);
                        $('#DV_SH_P_ADDR #txtPin').val(result[0].PINCODE);
                    }
                }

                //Mailing
                if (!$.isEmptyObject(result[0].M_ADD1))
                {
                    $('#chkIsSHAddrSameAsPermanent').prop('disabled', true);
                    $('#DV_SH_M_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                    $('#DV_SH_M_ADDR #txtAdd1').val(result[0].M_ADD1);
                    $('#DV_SH_M_ADDR #txtAdd2').val(result[0].M_ADD2);
                    $('#DV_SH_M_ADDR #txtAdd3').val(result[0].M_ADD3);
                    $('#DV_SH_M_ADDR #ddlCountry').val(result[0].M_CountryCode).change();
                    $('#DV_SH_M_ADDR #txtCity').val(result[0].M_CITY);
                    if (result[0].M_CountryCode == 'IN')
                    {
                        $('#DV_SH_M_ADDR #txtPin').val(result[0].M_PINCODE).keyup();
                    }
                    else
                    {
                        $('#DV_SH_M_ADDR #txtState').val(result[0].M_STATE);
                        $('#DV_SH_M_ADDR #txtDistrict').val(result[0].M_DISTRICT);
                        $('#DV_SH_M_ADDR #txtPin').val(result[0].M_PINCODE);
                    }
                }

                //CKYC validations
                SH_KYC_Validations();

                //validations                
                $('#btnSHAddFresh').hide();
                $('#DV_SH_SEARCH').hide();
                $('#DV_SH_CKYC_SEARCH').hide();
                if ($('#ddlHolderType').val() == '02')
                {
                    $('#DV_SH_HEAD').show();
                }
                $('#DV_SH_DTLS').slideDown();
            }
            else
            {
                $('#DV_SH_HEAD').hide();
                $('#DV_SH #btnfreshcutomer').show();

                BtpMessagePopup('No Record Found. Please Continue as Fresh Holder.', 'error');
            }
        }, null, null, false, false, ErrorFunction);

    }
    else
    {
        $('#DV_SH_SEARCH').hide();
        $('#DV_SH_DTLS').show();
    }
    BTP_OBJECT.mode = 'A';
}
//get third holder details
const THSearch = function (searchby, Searchbyref, SearchByDOB, Appl_No)
{
    BTP_OBJECT.mode = 'R';

    if (!$.isEmptyObject(Searchbyref))
    {

        var SearchBo = {
            HolderType: '03',
            searchby: searchby,
            Searchbyref: Searchbyref,
            SearchByDOB: SearchByDOB,
            Appl_No: Appl_No

        }

        ExtendedAjaxCall('AdditionalPurchase/SearchExistingCustomer', SearchBo, 'POST', function (result)
        {
            BTP_OBJECT.THCountFolioYear = 4;
            $('#DV_TH_HEAD').hide();
            $('#DV_TH_DTLS').hide();
            $('.THHeader').text('');
            $('#chkIsTHAddrSameAsPermanent').prop('checked', false).prop('disabled', false);
            $('#chkIsTHAddrSameAsFH').prop('checked', false).prop('disabled', false);
            $('#DV_TH #ddlFatherTitle').val('MR');
            $('#DV_TH #ddlMotherTitle').val('MRS');

            if (!$.isEmptyObject(result) && result.length > 0 && result[0].Msg.toUpperCase() == 'SUCCESS')
            {
                var row = result[0];
                $('#hdrTHFolioNo').text(row.Folio);
                $('#hdrTHExistingFDRNo').text(row.Dep_no);
                $('#hdrTHLastInvDate').text(row.Last_Inv_Date);
                BTP_OBJECT.THCountFolioYear = row.CountFolioYear;
                BTP_OBJECT.TH_DATA_SOURCE = result[0].Source;
                BTP_OBJECT.TH_CKYC_COMPLIANT = result[0].CKYC_Compliant;

                //title
                $('#DV_TH #ddlTitle').val(result[0]["NamePrefix"]).change();

                //name
                $('#DV_TH #txtFName').val(result[0].Holder_F_Name).change();
                $('#DV_TH #txtMName').val(result[0].Holder_M_Name).change();
                $('#DV_TH #txtLName').val(result[0].Holder_L_Name).change();

                //gender
                $('#DV_TH #ddlGender').val(result[0].Gender).change();

                //dob
                $('#DV_TH #txtDOB').datetextentry('set_date', result[0].DOB).datetextentry('set_readonly', true).focusout();
                //$('#DV_TH #txtDOB').blur();
                THDOBChange();

                //pan
                $('#DV_TH #txtPAN').val(result[0].PAN).change();

                //mobile
                $('#DV_TH_P_ADDR #txtMobileNo').val(result[0]["MOBILE_NO"]).change();

                //email
                $('#DV_TH_P_ADDR #txtEmailId').val(result[0]["EMAIL_ID"]).change();

                //tel no 
                $('#DV_TH_P_ADDR #txtTelephone').val(result[0].TEL_RES);

                //maritalstatus
                $('#DV_TH_MD #ddlMaritalStatus').val(result[0].MARITAL_STATUS).change();

                //father name
                if (!$.isEmptyObject(result[0].Holder_Father_F_Name))
                {
                    $('#DV_TH #ddlFatherTitle').val(result[0].Holder_Father_Prefix);
                    $('#DV_TH #txtFatherFName').val(result[0].Holder_Father_F_Name);
                    $('#DV_TH #txtFatherMName').val(result[0].Holder_Father_M_Name);
                    $('#DV_TH #txtFatherLName').val(result[0].Holder_Father_L_Name);
                }

                //mother name
                if (!$.isEmptyObject(result[0].Holder_Mother_F_Name))
                {
                    $('#DV_TH #ddlMotherTitle').val(result[0].Holder_Mother_Prefix);
                    $('#DV_TH #txtMotherFName').val(result[0].Holder_Mother_F_Name);
                    $('#DV_TH #txtMotherMName').val(result[0].Holder_Mother_M_Name);
                    $('#DV_TH #txtMotherLName').val(result[0].Holder_Mother_L_Name);
                }

                //spouse name
                if (!$.isEmptyObject(result[0].Holder_Spouse_F_Name))
                {
                    $('#DV_TH #ddlSpouseTitle').val(result[0].Holder_Spouse_Prefix);
                    $('#DV_TH #txtSpouseFName').val(result[0].Holder_Spouse_F_Name);
                    $('#DV_TH #txtSpouseMName').val(result[0].Holder_Spouse_M_Name);
                    $('#DV_TH #txtSpouseLName').val(result[0].Holder_Spouse_L_Name);
                }

                //guardian name
                if (!$.isEmptyObject(result[0].Holder_Guardian_F_Name))
                {
                    $('#DV_TH #ddlGuardianTitle').val(result[0].Holder_Guardian_Prefix);
                    $('#DV_TH #txtGuardianFName').val(result[0].Holder_Guardian_F_Name);
                    $('#DV_TH #txtGuardianMName').val(result[0].Holder_Guardian_M_Name);
                    $('#DV_TH #txtGuardianLName').val(result[0].Holder_Guardian_L_Name);
                    $('#DV_TH #txtGuardianPAN').val(result[0].Holder_Guardian_PAN);
                }

                //annual income
                $('#DV_TH #ddlAnnualIncome').val(result[0].ANNUAL_INC);

                //occupation
                $('#DV_TH #ddlOccupation').val(result[0].CustSeg_Type_Code);

                //avinash added Occupation / sub - occupation changes
                BindDDLExtendedAjaxCall('#DV_TH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);
                if ($('#HdnCustSeg_typeCode_TH').val() != '' && $('#HdnCustSeg_typeCode_TH').val() != undefined) {
                    $('#DV_TH #ddlCustSegType').val('select');
                }
                else {
                    $('#DV_TH #ddlCustSegType').val($('#HdnCustSeg_typeCode_TH').val());
                }

                //ckyc no
                $('#DV_TH #txtCKYCNumber').val(result[0].CKYCNumber);

                $('#DV_TH #hdnMobilisationMode').val(result[0].MobilisationMode);

                //PER
                if (!$.isEmptyObject(result[0].ADD1))
                {
                    $('#DV_TH_P_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                    $('#chkIsTHAddrSameAsFH').prop('disabled', true);

                    $('#DV_TH_P_ADDR #txtAdd1').val(result[0].ADD1);
                    $('#DV_TH_P_ADDR #txtAdd2').val(result[0].ADD2);
                    $('#DV_TH_P_ADDR #txtAdd3').val(result[0].ADD3);
                    $('#DV_TH_P_ADDR #ddlCountry').val(result[0].CountryCode).change();
                    $('#DV_TH_P_ADDR #txtCity').val(result[0].CITY);
                    if (result[0].CountryCode == 'IN')
                    {
                        $('#DV_TH_P_ADDR #txtPin').val(result[0].PINCODE).keyup();
                    }
                    else
                    {
                        $('#DV_TH_P_ADDR #txtState').val(result[0].STATE);
                        $('#DV_TH_P_ADDR #txtDistrict').val(result[0].DISTRICT);
                        $('#DV_TH_P_ADDR #txtPin').val(result[0].PINCODE);
                    }
                }

                //Mailing
                if (!$.isEmptyObject(result[0].M_ADD1))
                {
                    $('#chkIsTHAddrSameAsPermanent').prop('disabled', true);
                    $('#DV_TH_M_ADDR .ADDR').prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');

                    $('#DV_TH_M_ADDR #txtAdd1').val(result[0].M_ADD1);
                    $('#DV_TH_M_ADDR #txtAdd2').val(result[0].M_ADD2);
                    $('#DV_TH_M_ADDR #txtAdd3').val(result[0].M_ADD3);
                    $('#DV_TH_M_ADDR #ddlCountry').val(result[0].M_CountryCode).change();
                    $('#DV_TH_M_ADDR #txtCity').val(result[0].M_CITY);
                    if (result[0].M_CountryCode == 'IN')
                    {
                        $('#DV_TH_M_ADDR #txtPin').val(result[0].M_PINCODE).keyup();
                    }
                    else
                    {
                        $('#DV_TH_M_ADDR #txtState').val(result[0].M_STATE);
                        $('#DV_TH_M_ADDR #txtDistrict').val(result[0].M_DISTRICT);
                        $('#DV_TH_M_ADDR #txtPin').val(result[0].M_PINCODE);
                    }
                }

                //CKYC validations
                TH_KYC_Validations();

                //validations                              
                $('#btnTHAddFresh').hide();
                $('#DV_TH_SEARCH').hide();
                $('#DV_TH_CKYC_SEARCH').hide();
                if ($('#ddlHolderType').val() == '03')
                {
                    $('#DV_TH_HEAD').show();
                }
                $('#DV_TH_DTLS').slideDown();
            }
            else
            {
                $('#DV_TH_HEAD').hide();
                $('#DV_TH #btnfreshcutomer').show();

                BtpMessagePopup('No Record Found. Please Continue as Fresh Holder.', 'error');
            }
        }, null, true, false, false, ErrorFunction);

    }
    else
    {
        $('#DV_TH_SEARCH').hide();
        $('#DV_TH_DTLS').show();
    }
    BTP_OBJECT.mode = 'A';
}
const IsSHValidSearch = function (searchby, Searchbyref, SearchByDOB, Appl_No)
{

    if (searchby == "select" || searchby == "")
    {
        BtpMessagePopup('Please Select Search By', 'error');
        return false;
    }

    if (Searchbyref == "")
    {
        BtpMessagePopup('Please Enter Search Text', 'error');
        return false;
    }

    if (SearchByDOB == "" && searchby != 'FDR' && searchby != 'Folio')
    {
        BtpMessagePopup('Please Enter Search DOB', 'error');
        return false;
    }

    return true;
}
const IsTHValidSearch = function (searchby, Searchbyref, SearchByDOB, Appl_No)
{

    if (searchby == "select" || searchby == "")
    {
        //$('#lblTHErrorMsg').text('Please Select Search By');
        //$('.trTHErrorMsg').show();
        BtpMessagePopup('Please Select Search By', 'error');
        return false;
    }

    if (Searchbyref == "")
    {
        //$('#lblTHErrorMsg').text('Please Enter Search Text');
        //$('.trTHErrorMsg').show();
        BtpMessagePopup('Please Enter Search Text', 'error');

        return false;
    }

    if (SearchByDOB == "" && searchby != 'FDR' && searchby != 'Folio')
    {
        //$('#lblTHErrorMsg').text('Please Enter Search  DOB');
        //$('.trTHErrorMsg').show();
        BtpMessagePopup('Please Enter Search DOB', 'error');

        return false;

    }

    return true;
}
//pan validations 
const CheckExisitingPAN = function (Appl_No, DOB, Folio, PAN)
{
    let err_msg = '';
    try
    {
        let investorDtl = {
            Appl_No: Appl_No,
            DOB: DOB,
            Folio: Folio,
            PAN: PAN
        }

        ExtendedAjaxCall('DataEntry/CheckExistingPan', investorDtl, 'POST', function (result)
        {
            if (!$.isEmptyObject(result) && result == 'Success')
                err_msg = '';
            else if (!$.isEmptyObject(result))
                err_msg = '<p>' + result + '</p>';
            else
                err_msg = '<p>Something went wrong checking PAN..!</p>';

            $('#preloader').hide();
        }, null, true, false, false, ErrorFunction);


    } catch (e)
    {
        fnException(e); return '<p>Something went wrong checking PAN..!</p>';
    }
    return err_msg;
}
$('#DV_SH #btnSearchHolder').click(function ()
{
    var dataFound = false;
    var searchby = $('#DV_SH #ddlSearchBy').val();
    var Searchbyref = $('#DV_SH #txtSearchText').val();
    var SearchByDOB = $('#DV_SH #txtSearchDOB').val();
    var Appl_No = $('#lblApplicationNumber').text();

    if (IsSHValidSearch(searchby, Searchbyref, SearchByDOB, Appl_No))
    {
        dataFound = SHSearch(searchby, Searchbyref, SearchByDOB, Appl_No);
    }
    $("#SH_PEP").hide();
});
$('#DV_TH #btnSearchHolder').click(function ()
{
    var dataFound = false;

    var searchby = $('#DV_TH #ddlSearchBy').val();
    var Searchbyref = $('#DV_TH #txtSearchText').val();
    var SearchByDOB = $('#DV_TH #txtSearchDOB').val();
    var Appl_No = $('#lblApplicationNumber').text();

    if (IsTHValidSearch(searchby, Searchbyref, SearchByDOB, Appl_No))
    {

        dataFound = THSearch(searchby, Searchbyref, SearchByDOB, Appl_No);
    }
    $("#TH_PEP").hide();
});
$('#chkFHEdit').change(function ()
{
    if ($(this).prop('checked'))
    {
        $('#DV_FH #ddlTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #ddlGender').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #ddlMaritalStatus').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #ddlOccupation,#DV_FH #ddlAnnualIncome').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_FH #ddlFatherTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_FH #ddlMotherTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_FH #ddlSpouseTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_FH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_FH #txtTelephone').prop('disabled', false).removeClass('DisabledControl');

    }
    else
    {
        var FDR = $('#hdrExistingFDRNo').text();
        var Folio = $('#hdrFolioNo').text();
        var Appl_No = $('#lblApplicationNumber').text();

        if (BTP_OBJECT.mode == 'A')
        {
            if (confirm('We are reverting earlier changes'))
            {
                if (!$.isEmptyObject(Folio))
                {
                    InvSearch('Folio', Folio, null, Appl_No);
                }

            }
            else
            {
                $('#chkInvEdit').prop('checked', true);
            }
        }
        else
        {

            if (!$.isEmptyObject(Folio))
            {
                InvSearch('Folio', Folio, null, Appl_No);
            }

        }
    }
});
$('#chkSHEdit').change(function ()
{
    if ($(this).prop('checked'))
    {

        $('#DV_SH #ddlTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #ddlGender').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #ddlMaritalStatus').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #ddlOccupation,#DV_SH #ddlAnnualIncome').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_SH #ddlFatherTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_SH #ddlMotherTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_SH #ddlSpouseTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_SH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_SH #txtTelephone').prop('disabled', false).removeClass('DisabledControl');
    }
    else
    {
        var dataFound = false;
        var FDR = $('#hdrSHExistingFDRNo').text();
        var Folio = $('#hdrSHFolioNo').text();
        var SearchByDOB = $('#txtSHDOB').val();
        var Appl_No = $('#lblApplicationNumber').text();

        if (BTP_OBJECT.mode == 'A')
        {
            if (confirm('We are reverting earlier changes'))
            {
                if (Folio != '')
                {
                    SHSearch('Folio', Folio, null, Appl_No);
                }

            }
            else
            {
                $('#chkSHEdit').prop('checked', true);
            }
        }
        else
        {
            var dataFound = false;

            if (Folio != '')
            {
                SHSearch('Folio', Folio, null, Appl_No);
            }

        }
    }
});
$('#chkTHEdit').change(function ()
{
    if ($(this).prop('checked'))
    {

        $('#DV_TH #ddlTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #ddlGender').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #ddlMaritalStatus').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #ddlOccupation,#DV_TH #ddlAnnualIncome').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_TH #ddlFatherTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtFatherFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtFatherMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtFatherLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_TH #ddlMotherTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtMotherFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtMotherMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtMotherLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_TH #ddlSpouseTitle').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtSpouseFName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtSpouseMName').prop('disabled', false).removeClass('DisabledControl');
        $('#DV_TH #txtSpouseLName').prop('disabled', false).removeClass('DisabledControl');

        $('#DV_TH #txtTelephone').prop('disabled', false).removeClass('DisabledControl');
    }
    else
    {
        var dataFound = false;
        var FDR = $('#hdrTHExistingFDRNo').text();
        var Folio = $('#hdrTHFolioNo').text();
        var SearchByDOB = $('#txtTHDOB').val();
        var Appl_No = $('#lblApplicationNumber').text();
        if (BTP_OBJECT.mode == 'A')
        {
            if (confirm('We are reverting earlier changes'))
            {

                if (Folio != '')
                {
                    THSearch('Folio', Folio, null, Appl_No);
                }
            }
            else
            {
                $('#chkTHEdit').prop('checked', true);
            }
        }
        else
        {

            if (Folio != '')
            {
                THSearch('Folio', Folio, null, Appl_No);
            }

        }
    }
});
//investor search
$('#btnInvSearch').on('click', function ()
{
    try
    {
        $("#FH_PEP").hide();
        //Reset_step1();
        $('#ddlInvtitle').val('select').change();
        $('#txtInvFirstName').val('').change();
        $('#txtInvMiddleName').val('').change();
        $('#txtInvLastName').val('').change();
        $('#txtInvPan').val('').change();
        $('#txtMobile').val('').change();
        $('#txtEmail').val('').change();
        $('#txtInvDOB').datetextentry('set_date', null);
        $('#txtInvDrawn_Bank_Search,#hdnDrawn_Bank_Name,#hdnBank_Branch_Name,#hdnBank_MICR,#hdnBank_NEFT,#txtInvCheque_DD_No,#txtPhysicalApplNo,#txtAmount,#txtSubBrokerCode,#txtRemark').val('');
        $('#ddlBranch,#ddlInvPayment_Mode,#ddlCMSBranch').val('select').change();
        $('#txtChequeDate').datetextentry('set_date', null);
        $('#txtamountinwords').text('');
        $('#txtPhysicalApplNo').val('0000');
        $('#txtInvCKYCNumber').val('').change();
        $('#rdoDigital').prop('checked', true).change();

        $('.form-control').removeClass('InputBorderRed');

        var ddlDepositorCategory = $('#ddlDepositorsStatus');
        var ddlInvSearchBy = $('#ddlInvSearchBy');
        var txtSearchRefNo = $('#txtSearchRefNo');
        var txtSearchDOB = $('#txtSearchDOB');

        var isError = false;
        var errMessage = "";
        $('#dvErrorMsg').html('');


        if (ddlDepositorCategory.val() == 'select')
        {
            errMessage += '<p>Deposite Category is required..!</p>';
            ddlDepositorCategory.addClass('InputBorderRed');
            isError = true;
        }

        if (ddlInvSearchBy.val() == 'select')
        {
            errMessage += '<p>Search By is required..!</p>';
            ddlInvSearchBy.addClass('InputBorderRed');

            isError = true;
        }

        if ($.isEmptyObject(txtSearchRefNo.val()))
        {
            errMessage += '<p>Search By Reference No is required..!</p>';
            txtSearchRefNo.addClass('InputBorderRed');

            isError = true;
        }

        if (!$.isEmptyObject(txtSearchRefNo.val()))
        {
            if (ddlInvSearchBy.val() == 'PAN' && !IsValidPAN(txtSearchRefNo.val()))
            {
                errMessage += "<p>Please Enter valid PAN Number..!</p>";
                isError = true;
            }
            else if (ddlInvSearchBy.val() == 'Mobile' && !IsValidMobile(txtSearchRefNo.val()))
            {
                errMessage += "<p>Please Enter valid Mobile Number..!</p>";
                isError = true;
            }
            else if (ddlInvSearchBy.val() == 'Email' && !IsValidEmail(txtSearchRefNo.val()))
            {
                errMessage += "<p>Please Enter valid Email Id..!</p>";
                isError = true;
            }
        }

        if ($.isEmptyObject(txtSearchDOB.val()) && ddlInvSearchBy.val() != 'Folio' && ddlInvSearchBy.val() != 'FDR' && ddlDepositorCategory.val() == 'IND')
        {
            errMessage += "<p>Please Enter Date Of Birth..!</p>";
            isError = true;
        }

        if (isError)
        {
            $('#dvErrorMsg').html(errMessage);
            $('#ModelError').modal('show');
            return false;
        }

        InvSearch(ddlDepositorCategory.val(), ddlInvSearchBy.val(), txtSearchRefNo.val().trim(), txtSearchDOB.val(), null);

    } catch (e)
    {
        fnException(e);
    }
});
//add as fresh inveestor
$('#IdInvestorSearch #btnfreshcutomer').click(function ()
{
    Reset_step1();
    $('#IdInfoDiv').slideDown();
    if ($('#ddlDepositorsStatus').val() == 'HUF')
    {
        $('#DV_FH_CKYC_SEARCH').hide();
        $('#ddlInvtitle').val('M/S').prop('disabled', true).addClass('DisabledContol')
        $('#DV_INV_DETAILS').show();
    }
    else
    {
        $('#DV_FH_CKYC_SEARCH').show();
        $('#ddlInvtitle').val('select').prop('disabled', false).removeClass('DisabledContol')
        $('#DV_INV_DETAILS').hide();
    }
    $('#IdInvestorSearch').hide();
    $('#IdInvestorInfo').show();
});
$('#DV_SH #btnfreshcutomer').click(function ()
{
    BTP_OBJECT.mode = 'R';
    SHReset();
    BTP_OBJECT.mode = 'A';
    $('#DV_SH_HEAD').hide();
    $('#DV_PROV_SH').hide();
    $('#DV_SH_EDIT_AS_CKYC').hide();
    $('#DV_SH_SEARCH').slideUp();
    $('#DV_SH_CKYC_SEARCH').slideDown();
    $('#DV_SH_DTLS').hide();
});
$('#DV_TH #btnfreshcutomer').click(function ()
{
    $('#DV_TH_HEAD').hide();
    BTP_OBJECT.mode = 'R';
    THReset();
    BTP_OBJECT.mode = 'A';
    $('#DV_PROV_TH').hide();
    $('#DV_TH_EDIT_AS_CKYC').hide();
    $('#DV_TH_SEARCH').slideUp();
    $('#DV_TH_CKYC_SEARCH').slideDown();
    $('#DV_TH_DTLS').hide();
});
$('#DV_SH #txtPAN').focusout(function ()
{
    if ($('#hdrSHFolioNo').text() != '' && $('#DV_SH #txtPAN').val() != '' && !CheckIsMinor($('#DV_SH #txtPAN').val()))
    {
        var Appl_No = $('#lblApplicationNumber').text();
        var DOB = $('#DV_SH #txtDOB').val();
        var Folio = $('#hdrSHFolioNo').text();
        CheckExisitingPAN(Appl_No, DOB, Folio, $(this).val());
    }
});
$('#DV_TH #txtPAN').focusout(function ()
{
    if ($('#hdrTHFolioNo').text() != '' && $('#DV_TH #txtPAN').val() != '' && !CheckIsMinor($('#DV_TH #txtPAN').val()))
    {
        var Appl_No = $('#lblApplicationNumber').text();
        var DOB = $('#DV_TH #txtDOB').val();
        var Folio = $('#hdrTHFolioNo').text();
        CheckExisitingPAN(Appl_No, DOB, Folio, $(this).val());
    }
});
