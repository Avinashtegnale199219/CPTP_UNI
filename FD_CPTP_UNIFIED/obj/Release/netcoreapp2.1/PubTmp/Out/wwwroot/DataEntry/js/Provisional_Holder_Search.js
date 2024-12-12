//provisional second holder dropdown
function BindProvSH()
{
    try
    {
        if (!$.isEmptyObject($('#lblFolioNumber').text()))
        {
            var objBO = {
                Folio: $('#lblFolioNumber').text(),
                Name: $('#ddlInvtitle').val() + ' ' + $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim()
            };

            BindDDLExtendedAjaxCall('#ddlProvSH', 'HolderDetails/GetProvHolderNamesAsync', objBO, 'POST', null, null, true, false, false, ErrorFunction);

            if ($.isEmptyObject($('#DV_SH #txtFName').val()))
            {
                $('#DV_PROV_SH').show();
                $('#DV_SH_SEARCH').hide();
                $('#DV_SH_CKYC_SEARCH').hide();
                $('#DV_SH_DTLS').hide();
            }
            else
            {
                $('#DV_PROV_SH').hide();
                $('#DV_SH_SEARCH').hide();
                $('#DV_SH_CKYC_SEARCH').hide();
                $('#DV_SH_DTLS').show();
            }
        }
        else
        {
            $('#DV_PROV_SH').hide();
            if ($.isEmptyObject($('#DV_SH #txtFName').val()))
            {
                $('#DV_SH_SEARCH').show();
                $('#DV_SH_CKYC_SEARCH').hide();
                $('#DV_SH_DTLS').hide();
            }
            else
            {
                $('#DV_SH_SEARCH').hide();
                $('#DV_SH_CKYC_SEARCH').hide();
                $('#DV_SH_DTLS').show();
            }
        }
    } catch (e)
    {
        fnException(e);
    }
};

//provisional third holder dropdown
function BindProvTH()
{
    try
    {
        if (!$.isEmptyObject($('#lblFolioNumber').text()))
        {
            var objBO = {
                Folio: $('#lblFolioNumber').text(),
                Name: $('#DV_SH #ddlTitle').val() + ' ' + $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim()
            };

            BindDDLExtendedAjaxCall('#ddlProvTH', 'HolderDetails/GetProvHolderNamesAsync', objBO, 'POST', null, null, true, false, false, ErrorFunction);
            if ($.isEmptyObject($('#DV_TH #txtFName').val()))
            {
                $('#DV_PROV_TH').show();
                $('#DV_TH_SEARCH').hide();
                $('#DV_TH_CKYC_SEARCH').hide();
                $('#DV_TH_DTLS').hide();
            }
            else
            {
                $('#DV_PROV_TH').hide();
                $('#DV_TH_SEARCH').hide();
                $('#DV_TH_CKYC_SEARCH').hide();
                $('#DV_TH_DTLS').show();
            }
        }
        else
        {
            $('#DV_PROV_TH').hide();
            if ($.isEmptyObject($('#DV_TH #txtFName').val()))
            {
                $('#DV_TH_SEARCH').show();
                $('#DV_TH_CKYC_SEARCH').hide();
                $('#DV_TH_DTLS').hide();
            }
            else
            {
                $('#DV_TH_SEARCH').hide();
                $('#DV_TH_CKYC_SEARCH').hide();
                $('#DV_TH_DTLS').show();
            }
        }
    } catch (e)
    {
        fnException(e);
    }
};

$('#btnAddNewExistingSH').click(function ()
{
    $('#DV_PROV_SH').hide();
    $('#DV_SH_SEARCH').show();
    $('#DV_SH_CKYC_SEARCH').hide();
    $('#DV_SH_DTLS').hide();
});

$('#btnAddNewExistingTH').click(function ()
{
    $('#DV_PROV_TH').hide();
    $('#DV_TH_SEARCH').show();
    $('#DV_TH_CKYC_SEARCH').hide();
    $('#DV_TH_DTLS').hide();
});

//bind prov second holder
$('#ddlProvSH').change(function ()
{
    try
    {
        if (!$.isEmptyObject(this.value) && this.value != 'select')
        {
            GetProvSH(this.value);
            $("#SH_PEP").hide();
        }
    } catch (e)
    {
        fnException(e);
    }
});

function GetProvSH(id)
{
    try
    {
        var objBO = {
            Id: id
        };

        ExtendedAjaxCall('HolderDetails/GetProvHolderDtlsAsync', objBO, 'POST', function (result)
        {
            if (!$.isEmptyObject(result))
            {
                let row = result[0];

                //header values
                $('#hdrSHFolioNo').text(row.Folio);
                $('#hdrSHExistingFDRNo').text(row.Dep_no);
                $('#hdrSHLastInvDate').text(row.Last_Inv_Date);
                BTP_OBJECT.SHCountFolioYear = row.CountFolioYear;
                BTP_OBJECT.SH_DATA_SOURCE = row.Source;
                $('#hdnSHSourceTableId').val(row.SourceTableId);

                //title  
                $('#DV_SH #ddlTitle').val(row.NamePrefix).change();;

                //name
                $('#DV_SH #txtFName').val(row.Holder_F_Name).change();
                $('#DV_SH #txtMName').val(row.Holder_M_Name).change();
                $('#DV_SH #txtLName').val(row.Holder_L_Name).change();

                //gender
                $('#DV_SH #ddlGender').val(row.Gender).change();

                //dob
                $('#DV_SH #txtDOB').datetextentry('set_date', row.DOB).datetextentry('set_readonly', true).focusout();
                SHDOBChange();

                //pan
                $('#DV_SH #txtPAN').val(row.PAN).change();

                //mobile
                $('#DV_SH #txtMobileNo').val(row.MOBILE_NO).change();

                //email
                $('#DV_SH #txtEmailId').val(row.EMAIL_ID).change();

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

                //avinash added Occupation / sub - occupation changes
                BindDDLExtendedAjaxCall('#DV_SH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);
                if (!$.isEmptyObject(row.CustSeg_Type_Code)) {
                    $('#DV_SH_MD #ddlCustSegType').val('select');
                    $('#DV_SH_MD #ddlCustSegType').val(row.CustSeg_Type_Code);
                }

                BindDDLExtendedAjaxCall('#DV_SH_MD #ddlCustSegSubType', 'DataEntry/Get_ddl_Occ_CustSegSubTypeList', null, 'POST', null, null, true, false, false, ErrorFunction);
                if (!$.isEmptyObject(row.CustSeg_Subtype_Code)) {
                    $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").show();
                    $('#DV_SH_MD #ddlCustSegSubType').val(row.CustSeg_Subtype_Code);
                }
                else {
                    $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").hide();
                }

                if ($("#DV_SH_MD #ddlCustSegType").val() == "select") {
                    $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").hide();
                }
                else {
                    $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").show();
                }

                //annualincome
                $('#DV_SH #ddlAnnualIncome').val(row.Kyc_AnnualIncome_Code);

                //ckyc no
                $('#DV_SH #txtCKYCNumber').val(row.CKYCNumber);

                $('#DV_SH #hdnMobilisationMode').val(row.MobilisationMode);

                $('#DV_SH_P_ADDR #txtTelephone').val(row.TEL_RES);

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
                    $('#DV_SH_M_ADDR #txtPin').val(row.M_PINCODE).keyup();
                    $('#DV_SH_M_ADDR #txtCity').val(row.M_CITY);
                }

                //CKYC validations
                SH_KYC_Validations();

                //validations
                $('#btnSHAddFresh').hide();
                $('#DV_PROV_SH').hide();
                $('#DV_SH_SEARCH').hide();
                $('#DV_SH_CKYC_SEARCH').hide();
                if ($('#ddlHolderType').val() == '02')
                {
                    $('#DV_SH_HEAD').show();
                }
                $('#DV_SH_DTLS').slideDown();
            }

            $('#preloader').hide();
        }, null, true, false, false, ErrorFunction);
    } catch (e)
    {
        fnException(e)
    }
}

$('#ddlProvTH').change(function ()
{
    try
    {
        if (!$.isEmptyObject(this.value) && this.value != 'select')
        {
            GetProvTH(this.value);
            $("#TH_PEP").hide();
        }
    } catch (e)
    {
        fnException(e);
    }
});

function GetProvTH(id)
{
    try
    {
        var objBO = {
            Id: id
        };

        ExtendedAjaxCall('HolderDetails/GetProvHolderDtlsAsync', objBO, 'POST', function (result)
        {

            if (!$.isEmptyObject(result))
            {
                let row = result[0];
                $('#hdrTHFolioNo').text(row.Folio);
                $('#hdrTHExistingFDRNo').text(row.Dep_no);
                $('#hdrTHLastInvDate').text(row.Last_Inv_Date);
                BTP_OBJECT.THCountFolioYear = row.CountFolioYear;
                BTP_OBJECT.TH_DATA_SOURCE = row.Source;

                $('#hdnTHSourceTableId').val(row.SourceTableId);

                //title
                $('#DV_TH #ddlTitle').val(row.NamePrefix).change();

                //name
                $('#DV_TH #txtFName').val(row.Holder_F_Name).change();
                $('#DV_TH #txtMName').val(row.Holder_M_Name).change();
                $('#DV_TH #txtLName').val(row.Holder_L_Name).change();

                //gender
                $('#DV_TH #ddlGender').val(row.Gender).change();

                //dob
                $('#DV_TH #txtDOB').datetextentry('set_date', row.DOB).datetextentry('set_readonly', true).focusout();
                THDOBChange();

                //pan
                $('#DV_TH #txtPAN').val(row.PAN).change();;

                //mobile
                $('#DV_TH #txtMobileNo').val(row.MOBILE_NO).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed').change();

                //email
                $('#DV_TH #txtEmailId').val(row.EMAIL_ID).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed').change();

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

                //avinash added Occupation / sub - occupation changes
                BindDDLExtendedAjaxCall('#DV_TH #ddlCustSegType', 'DataEntry/Get_ddl_Occ_CustomerSegType', null, 'GET', null, null, true, false, false, ErrorFunction);
                if (!$.isEmptyObject(row.CustSeg_Type_Code)) {
                    $('#DV_TH_MD #ddlCustSegType').val(row.CustSeg_Type_Code);
                }

                BindDDLExtendedAjaxCall('#DV_TH_MD #ddlCustSegSubType', 'DataEntry/Get_ddl_Occ_CustSegSubTypeList', null, 'POST', null, null, true, false, false, ErrorFunction);
                if (!$.isEmptyObject(row.CustSeg_Subtype_Code)) {
                    $("#DV_TH_MD #Occ_Cus_SegSubtype_Div").show();
                    $('#DV_TH_MD #ddlCustSegSubType').val(row.CustSeg_Type_Code);
                }
                else {
                    $("#DV_TH_MD #Occ_Cus_SegSubtype_Div").hide();
                }

                if ($("#DV_SH_MD #ddlCustSegType").val() == "select") {
                    $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").hide();
                }
                else {
                    $("#DV_SH_MD #Occ_Cus_SegSubtype_Div").show();
                }

                //annualincome
                $('#DV_TH #ddlAnnualIncome').val(row.Kyc_AnnualIncome_Code);

                //ckyc no
                $('#DV_TH #txtCKYCNumber').val(row.CKYCNumber);

                $('#DV_TH #hdnMobilisationMode').val(row.MobilisationMode);

                $('#DV_TH_P_ADDR #txtTelephone').val(row.TEL_RES);

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
                    $('#DV_TH_M_ADDR #txtPin').val(row.M_PINCODE).keyup();
                    $('#DV_TH_M_ADDR #txtCity').val(row.M_CITY);
                }

                TH_KYC_Validations();

                //validations
                $('#btnTHAddFresh').hide();
                $('#DV_PROV_TH').hide();
                $('#DV_TH_SEARCH').hide();
                $('#DV_TH_CKYC_SEARCH').hide();
                if ($('#ddlHolderType').val() == '02')
                {
                    $('#DV_TH_HEAD').show();
                }
                $('#DV_TH_DTLS').slideDown();
            }

            $('#preloader').hide();
        }, null, true, false, false, ErrorFunction);
    } catch (e)
    {
        fnException(e)
    }
}

