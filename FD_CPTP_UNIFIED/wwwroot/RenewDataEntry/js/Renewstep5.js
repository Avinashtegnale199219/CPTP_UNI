//hide not applicable controls
$('#DV_FH .NAME,#DV_FH #DV_PAN,#DV_FH #DV_DOB,#DV_FH #DV_CKYCNumber').hide();
$('#DV_FH_P_ADDR #DV_MOBILE,#DV_FH_P_ADDR #DV_EMAIL,#DV_FH_M_ADDR #DV_MOBILE,#DV_FH_M_ADDR #DV_EMAIL,#DV_FH_M_ADDR #DV_TELEPHONE').hide();
$('#DV_SH_M_ADDR #DV_MOBILE,#DV_SH_M_ADDR #DV_EMAIL,#DV_SH_M_ADDR #DV_TELEPHONE').hide();
$('#DV_TH_M_ADDR #DV_MOBILE,#DV_TH_M_ADDR #DV_EMAIL,#DV_TH_M_ADDR #DV_TELEPHONE').hide();
//step5 all validations
const SubmitStep5 = function () {
    try {
        $('#preloader').show();

        let errMessage = "";
        let isError = false;

        //FH save validations
        if ($('#ddlHolderType').val() == '01')
            errMessage = FH_Save_Validations();

        //SH save validations
        else if ($('#chkSHApplicable').prop('checked') && $('#ddlHolderType').val() == '02')
            errMessage = SH_Save_Validations();

        //TH save validations
        else if ($('#chkTHApplicable').prop('checked') && $('#ddlHolderType').val() == '03')
            errMessage = TH_Save_Validations();


        //all holder pan validation - 1:2
        if ($('#txtInvPan').val() == $('#DV_SH #txtPAN').val() && $('#txtInvDOB').val() == $('#DV_SH #txtDOB').val() && $('#txtInvPan').val() != '' && $('#txtInvDOB').val() != '')
            errMessage += "<p>Second Holder's PAN number can not be same as Investor's PAN..!</p>";

        //all holder pan validation - 1:3
        if ($('#txtInvPan').val() == $('#DV_TH #txtPAN').val() && $('#txtInvDOB').val() == $('#DV_TH #txtDOB').val() && $('#txtInvPan').val() != '' && $('#DV_TH #txtDOB').val() != '')
            errMessage += "<p>Third Holder's PAN number can not be same as Investor's PAN..!</p>";

        //all holder pan validation - 2:3
        if ($('#DV_SH #txtPAN').val() == $('#DV_TH #txtPAN').val() && $('#DV_SH #txtDOB').val() == $('#DV_TH #txtDOB').val() && $('#DV_SH #txtPAN').val() != '' && $('#DV_SH #txtDOB').val() != '')
            errMessage += "<p>Third Holder's PAN number can not be same Second Holder's PAN..!</p>";

        if (!$.isEmptyObject(errMessage)) {
            BtpMessagePopup(errMessage, 'error');
            return false;
        }

        //communication details validations
        var FH_age = GetAge($('#txtInvDOB').val());
        if (FH_age >= 18) {
            //all holder mobile validation - 1:2
            if ($('#txtMobile').val() == $('#DV_SH_P_ADDR #txtMobileNo').val() && $('#txtMobile').val() != '')
                isError = true;

            //all holder mobile validation - 1:3
            if ($('#txtMobile').val() == $('#DV_TH_P_ADDR #txtMobileNo').val() && $('#txtMobile').val() != '')
                isError = true;

            //all holder email validation - 1:2
            if ($('#txtEmail').val() == $('#DV_SH_P_ADDR #txtEmailId').val() && $('#txtEmail').val() != '')
                isError = true;

            //all holder email validation - 1:3
            if ($('#txtEmail').val() == $('#DV_TH_P_ADDR #txtEmailId').val() && $('#txtEmail').val() != '')
                isError = true;
        }


        if (isError) {
            $('#preloader').hide();
            $('#Model_COMM_VERIFICATION_Msg').modal('show');
            return false;
        }

        //save details----------------------------------------------------------------------------------
        return SaveStep5Details();

    } catch (e) {
        fnException(e); return false;
    }
}
//step5 save
const SaveStep5Details = function () {
    try {
        let InvestorDetailSaveStruct = {};
        let KYCList = [];
        let All_Kyc_Address = [];
        let FATCA_DTLS = [];
        InvestorDetailSaveStruct.IsFATCAApplicable = "N";

        //get first holder details
        if ($('#ddlHolderType').val() == '01') {
            //details
            let FH_GET_DATA = FH_GET_DATA_FOR_SAVE();
            KYCList.push(FH_GET_DATA);

            //permanent address
            let FH_GET_PER_ADDR = FH_GET_PER_ADDR_FOR_SAVE();
            All_Kyc_Address.push(FH_GET_PER_ADDR);

            //mailing address
            let FH_GET_MAIL_ADDR = FH_GET_MAIL_ADDR_FOR_SAVE();
            All_Kyc_Address.push(FH_GET_MAIL_ADDR);

            //overseas address
            if ($('#chkIdOverSeasAddress').prop('checked') && $('#txtOAdd1').val() != '') {
                let FH_GET_OVR_ADDR = FH_GET_OVR_ADDR_FOR_SAVE();
                All_Kyc_Address.push(FH_GET_OVR_ADDR);
            }

            //FATCA Details
            if ($('#btnsldFatca').hasClass('active') || $('#btnsldGreen').hasClass('active')) {
                InvestorDetailSaveStruct.IsFATCAApplicable = "Y";
                let FH_GET_FATCA_DTLS = FH_GET_FATCA_DTLS_FOR_SAVE();
                FATCA_DTLS.push(FH_GET_FATCA_DTLS);
            }
        }
        else if ($('#ddlHolderType').val() == '02') {
            //details
            let SH_GET_DATA = SH_GET_DATA_FOR_SAVE();
            KYCList.push(SH_GET_DATA);

            //permanent address
            let SH_GET_PER_ADDR = SH_GET_PER_ADDR_FOR_SAVE();
            All_Kyc_Address.push(SH_GET_PER_ADDR);

            //mailing address
            let SH_GET_MAIL_ADDR = SH_GET_MAIL_ADDR_FOR_SAVE();
            All_Kyc_Address.push(SH_GET_MAIL_ADDR);

            //FATCA Details
            if ($('#btnSHsldFatca').hasClass('active') || $('#btnSHsldGreen').hasClass('active')) {
                InvestorDetailSaveStruct.IsFATCAApplicable = "Y";
                let SH_GET_FATCA_DTLS = SH_GET_FATCA_DTLS_FOR_SAVE();
                FATCA_DTLS.push(SH_GET_FATCA_DTLS);
            }
        }
        else if ($('#ddlHolderType').val() == '03') {
            //details
            let TH_GET_DATA = TH_GET_DATA_FOR_SAVE();
            KYCList.push(TH_GET_DATA);

            //permanent address
            let TH_GET_PER_ADDR = TH_GET_PER_ADDR_FOR_SAVE();
            All_Kyc_Address.push(TH_GET_PER_ADDR);

            //mailing address
            let TH_GET_MAIL_ADDR = TH_GET_MAIL_ADDR_FOR_SAVE();
            All_Kyc_Address.push(TH_GET_MAIL_ADDR);

            //FATCA Details
            if ($('#btnTHsldFatca').hasClass('active') || $('#btnTHsldGreen').hasClass('active')) {
                InvestorDetailSaveStruct.IsFATCAApplicable = "Y";
                let TH_GET_FATCA_DTLS = TH_GET_FATCA_DTLS_FOR_SAVE();
                FATCA_DTLS.push(TH_GET_FATCA_DTLS);
            }
        }

        InvestorDetailSaveStruct.KYCDataDetails = KYCList;
        InvestorDetailSaveStruct.InvestorAddresses = All_Kyc_Address;
        InvestorDetailSaveStruct.FATCA_DTLS = FATCA_DTLS;

        let isError = true;
        ExtendedAjaxCall('RenewInvestorDetailsSave/SubmitStep5', InvestorDetailSaveStruct, 'POST', function (result) {
            try {
                if (!$.isEmptyObject(result) && result.Status == 1) {
                    if ($('#ddlHolderType').val() == '01')
                        BTP_OBJECT.FHDetailsSave = true;
                    else if ($('#ddlHolderType').val() == '02')
                        BTP_OBJECT.SHDetailsSave = true;
                    else if ($('#ddlHolderType').val() == '03')
                        BTP_OBJECT.THDetailsSave = true;

                    if ($('#ddlSchemes').val() == 'select')
                        $('#ddlCategory').change();

                    isError = false;
                }
                else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg)) {
                    isError = true;
                    BtpMessagePopup(result[0].Msg, "error");
                }
                else {
                    isError = true;
                    BtpMessagePopup('Something went wrong..!', "error");
                }

                $('#preloader').hide();

            } catch (e) {
                fnException(e);
            }
        }, null, true, false, false, ErrorFunction);

        if (isError)
            return false;
        else if ($('#chkSHApplicable').prop('checked') && $.isEmptyObject($('#DV_SH #txtFName').val())) {
            $('#ddlHolderType').val('02').change();
            return false;
        }
        else if ($('#chkTHApplicable').prop('checked') && $.isEmptyObject($('#DV_TH #txtFName').val())) {
            $('#ddlHolderType').val('03').change();
            return false;
        }


        return true;

    } catch (e) {
        fnException(e); return false;
    }
}
//get first holder data
const FH_GET_DATA_FOR_SAVE = function () {
    let FH_DTLS = {};
    try {
        FH_DTLS.Data_Source = BTP_OBJECT.FH_DATA_SOURCE;
        FH_DTLS.IsEditForCKYC = true;
        FH_DTLS.Appl_No = $('#lblApplicationNumber').text().trim();
        FH_DTLS.Holder_Type = '01';
        FH_DTLS.FolioNo = $('#lblFolioNumber').text().trim();
        FH_DTLS.FDRNo = $('#lblExistingFDRNumber').text().trim();
        FH_DTLS.LastInvDate = $('#lblLastInvestmentDate').text().trim();
        FH_DTLS.Kyc_Number = $('#txtInvCKYCNumber').val().trim();
        FH_DTLS.Kyc_NamePrefix = $('#ddlInvtitle').val() == 'select' ? null : $('#ddlInvtitle').val();
        FH_DTLS.Kyc_FirstName = $('#txtInvFirstName').val().trim();
        FH_DTLS.Kyc_MiddleName = $('#txtInvMiddleName').val().trim();
        FH_DTLS.Kyc_LastName = $('#txtInvLastName').val().trim();
        FH_DTLS.Kyc_FullName = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
        FH_DTLS.Kyc_DOB = BTP_OBJECT.IND_NIND == 'IND' ? $('#txtInvDOB').val() : $('#txtInvDOI').val();
        FH_DTLS.IsMinor = CheckIsMinor($('#txtInvDOB').val());
        FH_DTLS.Kyc_PAN = $('#txtInvPan').val().trim();
        FH_DTLS.Kyc_Gender = $('#DV_FH #ddlGender').val() == 'select' ? null : $('#DV_FH #ddlGender').val();

        //marital status
        FH_DTLS.Kyc_MaritalStatus = $('#DV_FH #ddlMaritalStatus').val() == 'select' ? null : $('#DV_FH #ddlMaritalStatus').val();

        //father name
        if ($('#DV_FH #txtFatherFName').val().trim() != '') {
            FH_DTLS.Kyc_FatherNamePrefix = $('#DV_FH #ddlFatherTitle').val() == 'select' ? null : $('#DV_FH #ddlFatherTitle').val();
            FH_DTLS.Kyc_FatherFirstName = $('#DV_FH #txtFatherFName').val().trim();
            FH_DTLS.Kyc_FatherMiddleName = $('#DV_FH #txtFatherMName').val().trim();
            FH_DTLS.Kyc_FatherLastName = $('#DV_FH #txtFatherLName').val().trim();
            FH_DTLS.Kyc_FatherFullName = $('#DV_FH #txtFatherFName').val().trim() + ' ' + $('#DV_FH #txtFatherMName').val().trim() + ' ' + $('#DV_FH #txtFatherLName').val().trim();
        }

        //mother name
        if ($('#DV_FH #txtMotherFName').val().trim() != '') {
            FH_DTLS.Kyc_MotherNamePrefix = $('#DV_FH #ddlMotherTitle').val() == 'select' ? null : $('#DV_FH #ddlMotherTitle').val();
            FH_DTLS.Kyc_MotherFirstName = $('#DV_FH #txtMotherFName').val().trim();
            FH_DTLS.Kyc_MotherMiddletName = $('#DV_FH #txtMotherMName').val().trim();
            FH_DTLS.Kyc_MotherLastName = $('#DV_FH #txtMotherLName').val().trim();
            FH_DTLS.Kyc_MotherFullName = $('#DV_FH #txtMotherFName').val().trim() + ' ' + $('#DV_FH #txtMotherMName').val().trim() + ' ' + $('#DV_FH #txtMotherLName').val().trim();
        }

        //spouse name
        if (!FH_DTLS.IsMinor && CheckIsMarried($('#DV_FH #ddlMaritalStatus').val()) && $('#DV_FH #txtSpouseFName').val().trim() != '') {
            FH_DTLS.Kyc_SpouseNamePrefix = $('#DV_FH #ddlSpouseTtitle').val() == 'select' ? null : $('#DV_FH #ddlSpouseTitle').val();
            FH_DTLS.Kyc_SpouseFirstName = $('#DV_FH #txtSpouseFName').val().trim();
            FH_DTLS.Kyc_SpouseMiddleName = $('#DV_FH #txtSpouseMName').val().trim();
            FH_DTLS.Kyc_SpouseLastName = $('#DV_FH #txtSpouseLName').val().trim();
            FH_DTLS.Kyc_SpouseFullName = $('#DV_FH #txtSpouseFName').val().trim() + ' ' + $('#DV_FH #txtSpouseMName').val().trim() + ' ' + $('#DV_FH #txtSpouseLName').val().trim();
        }

        //guardian name
        if (FH_DTLS.IsMinor && !CheckIsMarried($('#DV_FH #ddlMaritalStatus').val()) && $('#DV_FH #txtGuardianFName').val().trim() != '') {
            FH_DTLS.Kyc_GuardianNamePrefix = $('#DV_FH #ddlGuardianTitle').val() == 'select' ? null : $('#DV_FH #ddlGuardianTitle').val();
            FH_DTLS.Kyc_GuardianFirstName = $('#DV_FH #txtGuardianFName').val().trim();
            FH_DTLS.Kyc_GuardianMiddleName = $('#DV_FH #txtGuardianMName').val().trim();
            FH_DTLS.Kyc_GuardianLastName = $('#DV_FH #txtGuardianLName').val().trim();
            FH_DTLS.Kyc_GuardianFullName = $('#DV_FH #txtGuardianFName').val().trim() + ' ' + $('#DV_FH #txtGuardianMName').val().trim() + ' ' + $('#DV_FH #txtGuardianLName').val().trim();
            FH_DTLS.Kyc_Guardian_PAN = $('#DV_FH #txtGuardianPAN').val().trim();
        }

        FH_DTLS.Kyc_Occupation_Code = $('#DV_FH #ddlOccupation').val() == 'select' ? null : $('#DV_FH #ddlOccupation').val();
        FH_DTLS.Kyc_Occupation_Desc = $('#DV_FH #ddlOccupation').val() == 'select' ? null : $('#DV_FH #ddlOccupation :Selected').text().trim();
        FH_DTLS.Is_Tax_Resident = $('#btnsldFatca').hasClass('active');
        FH_DTLS.Is_Green_Card_Holder = $('#btnsldGreen').hasClass('active');
        FH_DTLS.MobilisationMode = $('#DV_FH #hdnMobilisationMode').val();
        FH_DTLS.IND_NIND = $('#ddlDepositorsStatus').val();
        FH_DTLS.Kyc_Annual_Income_Code = $('#DV_FH #ddlAnnualIncome').val() == 'select' ? null : $('#DV_FH #ddlAnnualIncome').val();
        FH_DTLS.Kyc_Annual_Income_Desc = $('#DV_FH #ddlAnnualIncome').val() == 'select' ? null : $('#DV_FH #ddlAnnualIncome :Selected').text().trim();

        //avinash added Occupation / sub - occupation changes
        FH_DTLS.Kyc_Occ_CustSegType = $('#DV_FH #ddlCustSegType').val() == 'select' ? null : $('#DV_FH #ddlCustSegType').val();
        FH_DTLS.Kyc_Occ_CustSegType_Desc = $('#DV_FH #ddlCustSegType').val() == 'select' ? null : $('#DV_FH #ddlCustSegType :Selected').text().trim();

        FH_DTLS.Kyc_Occ_CustSegSubType = $('#DV_FH #ddlCustSegSubType').val() == 'select' ? null : $('#DV_FH #ddlCustSegSubType').val();
        FH_DTLS.Kyc_Occ_CustSegSubType_Desc = $('#DV_FH #ddlCustSegSubType').val() == 'select' ? null : $('#DV_FH #ddlCustSegSubType :Selected').text().trim();

    } catch (e) {
        fnException(e);
    }
    return FH_DTLS;
}
//get first holder permanent address
const FH_GET_PER_ADDR_FOR_SAVE = function () {
    let FH_P_ADDR = {};
    try {
        FH_P_ADDR.Holder_Type = "01";//pass this value accordingly as passing for holder type in investor kyc detail
        FH_P_ADDR.Appl_No = $('#lblApplicationNumber').text().trim();
        FH_P_ADDR.AddType_Code = "PER"; //this will be hard coded value and will not change for any holder
        FH_P_ADDR.AddType_Desc = "Permanent Address";
        FH_P_ADDR.Address1 = $('#DV_FH_P_ADDR #txtAdd1').val().trim();
        FH_P_ADDR.Address2 = $('#DV_FH_P_ADDR #txtAdd2').val().trim();
        FH_P_ADDR.Address3 = $('#DV_FH_P_ADDR #txtAdd3').val().trim();
        FH_P_ADDR.Address_City_Desc = $('#DV_FH_P_ADDR #txtCity').val().trim();
        FH_P_ADDR.AddCountry_Code = $('#DV_FH_P_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_FH_P_ADDR #ddlCountry').val();
        FH_P_ADDR.AddCountry_Desc = $('#DV_FH_P_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_FH_P_ADDR #ddlCountry :Selected').text().trim();
        FH_P_ADDR.MobileNumber = $('#txtMobile').val().trim();
        FH_P_ADDR.ResTelNumber = $('#DV_FH_P_ADDR #txtTelephone').val().trim();
        FH_P_ADDR.EmailAdd = $('#txtEmail').val().trim();
        FH_P_ADDR.AddState_Desc = $('#DV_FH_P_ADDR #txtState').val().trim();
        FH_P_ADDR.Address_District_Desc = $('#DV_FH_P_ADDR #txtDistrict').val().trim();
        FH_P_ADDR.AddPin = $('#DV_FH_P_ADDR #txtPin').val();
        FH_P_ADDR.FolioNo = $('#lblFolioNumber').text().trim();
        FH_P_ADDR.FDRNo = $('#lblExistingFDRNumber').text().trim();
        FH_P_ADDR.LastInvDate = $('#lblLastInvestmentDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return FH_P_ADDR;
}
//get first holder mailing address
const FH_GET_MAIL_ADDR_FOR_SAVE = function () {
    let FH_M_ADDR = {};
    try {
        FH_M_ADDR.Holder_Type = "01";//pass this value accordingly as passing for holder type in investor kyc detail
        FH_M_ADDR.Appl_No = $('#lblApplicationNumber').text().trim();
        FH_M_ADDR.AddType_Code = "MAIL";//this will be hard coded value and will not change for any holder
        FH_M_ADDR.AddType_Desc = "Mailing Address";
        FH_M_ADDR.Address1 = $('#DV_FH_M_ADDR #txtAdd1').val().trim();
        FH_M_ADDR.Address2 = $('#DV_FH_M_ADDR #txtAdd2').val().trim();
        FH_M_ADDR.Address3 = $('#DV_FH_M_ADDR #txtAdd3').val().trim();
        FH_M_ADDR.Address_City_Desc = $('#DV_FH_M_ADDR #txtCity').val().trim();
        FH_M_ADDR.AddCountry_Code = $('#DV_FH_M_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_FH_M_ADDR #ddlCountry').val();
        FH_M_ADDR.AddCountry_Desc = $('#DV_FH_M_ADDR #ddlCountry :Selected').text().trim();
        FH_M_ADDR.AddState_Desc = $('#DV_FH_M_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_FH_M_ADDR #txtState').val().trim();
        FH_M_ADDR.Address_District_Desc = $('#DV_FH_M_ADDR #txtDistrict').val().trim();
        FH_M_ADDR.AddPin = $('#DV_FH_M_ADDR #txtPin').val();
        FH_M_ADDR.FolioNo = $('#lblFolioNumber').text().trim();
        FH_M_ADDR.FDRNo = $('#lblExistingFDRNumber').text().trim();
        FH_M_ADDR.LastInvDate = $('#lblLastInvestmentDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return FH_M_ADDR;
}
//get first holder overseas address
const FH_GET_OVR_ADDR_FOR_SAVE = function () {
    let FH_O_ADDR = {};
    try {
        FH_O_ADDR.Holder_Type = "01";//pass this value accordingly as passing for holder type in investor kyc detail
        FH_O_ADDR.Appl_No = $('#lblApplicationNumber').text().trim();
        FH_O_ADDR.AddType_Code = "OVR"; //this will be hard coded value and will not change for any holder
        FH_O_ADDR.AddType_Desc = "Overseas Address";
        FH_O_ADDR.Address1 = $('#txtOAdd1').val().trim();
        FH_O_ADDR.Address2 = $('#txtOAdd2').val().trim();
        FH_O_ADDR.Address3 = $('#txtOAdd3').val().trim();
        FH_O_ADDR.Address_City_Desc = $('#txtOCity').val().trim();
        FH_O_ADDR.AddCountry_Code = $('#ddlOCountry').val() == 'select' ? null : $('#ddlOCountry').val();
        FH_O_ADDR.AddCountry_Desc = $('#ddlOCountry').val() == 'select' ? null : $('#ddlOCountry :Selected').text().trim();
        FH_O_ADDR.AddState_Desc = $('#txtOState').val().trim();
        FH_O_ADDR.AddPin = $('#txtOPin').val().trim();
        FH_O_ADDR.FolioNo = $('#lblFolioNumber').text().trim();
        FH_O_ADDR.FDRNo = $('#lblExistingFDRNumber').text().trim();
        FH_O_ADDR.LastInvDate = $('#lblLastInvestmentDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return FH_O_ADDR;
}
//get first holder FATCA details
const FH_GET_FATCA_DTLS_FOR_SAVE = function () {
    let dataEntryBO = {};
    try {
        let ListTableBO = [];
        let FATCA_DATA_CITI = [];

        //FATCA details
        if ($('#DV_FH_FATCA #tblDetailList tbody tr').length > 0) {
            $('#DV_FH_FATCA #tblDetailList>tbody tr').each(function (i, tr) {
                var tableBO = {
                    TaxResident_CountryCode: tr.children[2].attributes['code'].nodeValue,//tr.children[2].attr('code'),
                    TaxResident_CountryName: tr.children[2].innerHTML,
                    TaxIdentificationTypeCode: tr.children[3].attributes['code'].nodeValue,// tr.children[3].attr('code'),
                    TaxIdentificationTypeDec: tr.children[3].innerHTML,
                    TaxIdentificationNumber: tr.children[4].innerHTML,
                    TRCExpiryDate: tr.children[5].innerHTML,
                    Address_TypeCode: tr.children[6].attributes['code'].nodeValue,// tr.children[6].attr('code'),
                    Address_TypeDesc: tr.children[6].innerHTML,
                    Address1: tr.children[7].innerHTML,
                    Address2: tr.children[8].innerHTML,
                    Landmark: tr.children[9].innerHTML,
                    State_Code: tr.children[10].attributes['code'].nodeValue,// tr.children[10].attr('code'),
                    State_Name: tr.children[10].innerHTML,
                    City: tr.children[11].innerHTML,
                    Postalcode: tr.children[12].innerHTML,
                    STD_Code_Primary: tr.children[13].innerHTML,
                    Telephone_Number_Primary: tr.children[14].innerHTML,
                    Mobile_Number_Primary: tr.children[15].innerHTML,
                    STD_Code_Other: tr.children[16].innerHTML,
                    Telephone_Number_Other: tr.children[17].innerHTML,
                    Mobile_Number_Other: tr.children[18].innerHTML,
                }

                ListTableBO.push(tableBO);

            });
        }

        //FATCA citizenship
        $('#DV_FH_FATCA #ddlCitizenShip_CitizenShip option:selected').each(function (i) {
            let FATCA_CITI_BO = {
                Citizen_Country_Code: $(this).val(),
                Citizen_Country_Name: $('#DV_FH_FATCA #ddlCitizenShip_CitizenShip option[value="' + $(this).val() + '"]').text()
            }
            FATCA_DATA_CITI.push(FATCA_CITI_BO);

        });

        dataEntryBO.HolderType = '01';
        dataEntryBO.Appl_No = $('#lblApplicationNumber').text().trim();
        dataEntryBO.Nationality_Code = $('#DV_FH_FATCA #ddlNationalityH').val();
        dataEntryBO.Nationality_Dec = $('#DV_FH_FATCA #ddlNationalityH :Selected').text();
        dataEntryBO.CountryOfBirth_Code = $('#DV_FH_FATCA #ddlcountryBirthHead').val();
        dataEntryBO.CountryOfBirth_Name = $('#DV_FH_FATCA #ddlcountryBirthHead :Selected').text();
        dataEntryBO.CityOfBirth_Name = $('#DV_FH_FATCA #txtcityBirthHead').val().trim();
        dataEntryBO.Father_Name = $('#DV_FH_FATCA #txtFathernameHead').val().trim();
        dataEntryBO.Spouse_Name = $('#DV_FH_FATCA #txtSpousenameHead').val().trim();
        dataEntryBO.Occupation_code = $('#DV_FH_FATCA #ddloccupationHead').val();
        dataEntryBO.Occupation_Name = $('#DV_FH_FATCA #ddloccupationHead :Selected').text();
        dataEntryBO.FATCA_Citizen = FATCA_DATA_CITI;
        dataEntryBO.FATCA_Detail = ListTableBO;
        dataEntryBO.FolioNo = $('#lblFolioNumber').text().trim();
        dataEntryBO.FDRNo = $('#lblExistingFDRNumber').text().trim();
        dataEntryBO.LastInvDate = $('#lblLastInvestmentDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return dataEntryBO;
}
const SH_GET_DATA_FOR_SAVE = function () {
    let SH_DTLS = {};
    try {
        SH_DTLS.Data_Source = BTP_OBJECT.SH_DATA_SOURCE;
        SH_DTLS.IsEditForCKYC = true;
        SH_DTLS.FolioNo = $('#hdrSHFolioNo').text().trim();
        SH_DTLS.FDRNo = $('#hdrSHExistingFDRNo').text().trim();
        SH_DTLS.LastInvDate = $('#hdrSHLastInvDate').text().trim();
        SH_DTLS.Kyc_DOB = $('#DV_SH #txtDOB').val();
        SH_DTLS.Kyc_MaritalStatus = $('#DV_SH #ddlMaritalStatus').val() == 'select' ? null : $('#DV_SH #ddlMaritalStatus').val();
        SH_DTLS.IsMinor = CheckIsMinor($('#DV_SH #txtDOB').val());
        SH_DTLS.Holder_Type = '02';
        SH_DTLS.Appl_No = $('#lblApplicationNumber').text().trim();
        SH_DTLS.Kyc_Number = $('#DV_SH #txtCKYCNumber').val().trim();
        SH_DTLS.Kyc_NamePrefix = $('#DV_SH #ddlTitle').val() == 'select' ? null : $('#DV_SH #ddlTitle').val();
        SH_DTLS.Kyc_FirstName = $('#DV_SH #txtFName').val().trim();
        SH_DTLS.Kyc_MiddleName = $('#DV_SH #txtMName').val().trim();
        SH_DTLS.Kyc_LastName = $('#DV_SH #txtLName').val().trim();
        SH_DTLS.Kyc_FullName = $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim();

        if ($('#DV_SH #txtFatherFName').val().trim() != '') {
            SH_DTLS.Kyc_FatherNamePrefix = $('#DV_SH #ddlFatherTitle').val() == 'select' ? null : $('#DV_SH #ddlFatherTitle').val();
            SH_DTLS.Kyc_FatherFirstName = $('#DV_SH #txtFatherFName').val().trim();
            SH_DTLS.Kyc_FatherMiddleName = $('#DV_SH #txtFatherMName').val().trim();
            SH_DTLS.Kyc_FatherLastName = $('#DV_SH #txtFatherLName').val().trim();
            SH_DTLS.Kyc_FatherFullName = $('#DV_SH #txtFatherFName').val().trim() + ' ' + $('#DV_SH #txtFatherMName').val().trim() + ' ' + $('#DV_SH #txtFatherLName').val().trim();
        }

        if ($('#DV_SH #txtMotherFName').val().trim() != '') {
            SH_DTLS.Kyc_MotherNamePrefix = $('#DV_SH #ddlMotherTitle').val() == 'select' ? null : $('#DV_SH #ddlMotherTitle').val();
            SH_DTLS.Kyc_MotherFirstName = $('#DV_SH #txtMotherFName').val().trim();
            SH_DTLS.Kyc_MotherMiddletName = $('#DV_SH #txtMotherMName').val().trim();
            SH_DTLS.Kyc_MotherLastName = $('#DV_SH #txtMotherLName').val().trim();
            SH_DTLS.Kyc_MotherFullName = $('#DV_SH #txtMotherFName').val().trim() + ' ' + $('#DV_SH #txtMotherMName').val().trim() + ' ' + $('#DV_SH #txtMotherLName').val().trim();
        }

        if (!SH_DTLS.IsMinor && CheckIsMarried($('#DV_SH #ddlMaritalStatus').val()) && $('#DV_SH #txtSpouseFName').val().trim() != '') {
            SH_DTLS.Kyc_SpouseNamePrefix = $('#DV_SH #ddlSpouseTtitle').val() == 'select' ? null : $('#DV_SH #ddlSpouseTitle').val();
            SH_DTLS.Kyc_SpouseFirstName = $('#DV_SH #txtSpouseFName').val().trim();
            SH_DTLS.Kyc_SpouseMiddleName = $('#DV_SH #txtSpouseMName').val().trim();
            SH_DTLS.Kyc_SpouseLastName = $('#DV_SH #txtSpouseLName').val().trim();
            SH_DTLS.Kyc_SpouseFullName = $('#DV_SH #txtSpouseFName').val().trim() + ' ' + $('#DV_SH #txtSpouseMName').val().trim() + ' ' + $('#DV_SH #txtSpouseLName').val().trim();
        }

        if (SH_DTLS.IsMinor && !CheckIsMarried($('#DV_SH #ddlMaritalStatus').val()) && $('#DV_SH #txtGuardianFName').val().trim() != '') {
            SH_DTLS.Kyc_GuardianNamePrefix = $('#DV_SH #ddlGuardianTitle').val() == 'select' ? null : $('#DV_SH #ddlGuardianTitle').val();
            SH_DTLS.Kyc_GuardianFirstName = $('#DV_SH #txtGuardianFName').val().trim();
            SH_DTLS.Kyc_GuardianMiddleName = $('#DV_SH #txtGuardianMName').val().trim();
            SH_DTLS.Kyc_GuardianLastName = $('#DV_SH #txtGuardianLName').val().trim();
            SH_DTLS.Kyc_GuardianFullName = $('#DV_SH #txtGuardianFName').val().trim() + ' ' + $('#DV_SH #txtGuardianMName').val().trim() + ' ' + $('#DV_SH #txtGuardianLName').val().trim();
            SH_DTLS.Kyc_Guardian_PAN = $('#DV_SH #txtGuardianPAN').val().trim();
        }
        SH_DTLS.Kyc_Gender = $('#DV_SH #ddlGender').val() == 'select' ? null : $('#DV_SH #ddlGender').val();
        SH_DTLS.Kyc_Occupation_Code = $('#DV_SH #ddlOccupation').val() == 'select' ? null : $('#DV_SH #ddlOccupation').val();
        SH_DTLS.Kyc_Occupation_Desc = $('#DV_SH #ddlOccupation').val() == 'select' ? null : $('#DV_SH #ddlOccupation :Selected').text().trim();
        SH_DTLS.Kyc_PAN = $('#DV_SH #txtPAN').val().trim();
        SH_DTLS.Is_Tax_Resident = $('#btnSHsldFatca').hasClass('active');
        SH_DTLS.Is_Green_Card_Holder = $('#btnSHsldGreen').hasClass('active');
        SH_DTLS.MobilisationMode = $('#DV_SH #hdnMobilisationMode').val();
        SH_DTLS.SourceTableId = $('#hdnSHSourceTableId').val();
        SH_DTLS.IND_NIND = $('#ddlDepositorsStatus').val();
        SH_DTLS.Kyc_Annual_Income_Code = $('#DV_SH #ddlAnnualIncome').val() == 'select' ? null : $('#DV_SH #ddlAnnualIncome').val();
        SH_DTLS.Kyc_Annual_Income_Desc = $('#DV_SH #ddlAnnualIncome').val() == 'select' ? null : $('#DV_SH #ddlAnnualIncome :Selected').text().trim();

        //avinash added Occupation / sub - occupation changes
        SH_DTLS.Kyc_Occ_CustSegType = $('#DV_SH #ddlCustSegType').val() == 'select' ? null : $('#DV_SH #ddlCustSegType').val();
        SH_DTLS.Kyc_Occ_CustSegType_Desc = $('#DV_SH #ddlCustSegType').val() == 'select' ? null : $('#DV_SH #ddlCustSegType :Selected').text().trim();

        SH_DTLS.Kyc_Occ_CustSegSubType = $('#DV_SH #ddlCustSegSubType').val() == 'select' ? null : $('#DV_SH #ddlCustSegSubType').val();
        SH_DTLS.Kyc_Occ_CustSegSubType_Desc = $('#DV_SH #ddlCustSegSubType').val() == 'select' ? null : $('#DV_SH #ddlCustSegSubType :Selected').text().trim();

        $('#HdnCustSeg_typeCode_SH').val($('#DV_SH #ddlCustSegType').val());


    } catch (e) {
        fnException(e);
    }
    return SH_DTLS;
}
const SH_GET_PER_ADDR_FOR_SAVE = function () {
    let SH_P_ADDR = {};
    try {
        SH_P_ADDR.Holder_Type = '02';//pass this value accordingly as passing for holder type in investor kyc detail
        SH_P_ADDR.Appl_No = $('#lblApplicationNumber').text().trim();
        SH_P_ADDR.AddType_Code = "PER"; //this will be hard coded value and will not change for any holder
        SH_P_ADDR.AddType_Desc = "Permanent Address";
        SH_P_ADDR.Address1 = $('#DV_SH_P_ADDR #txtAdd1').val().trim();
        SH_P_ADDR.Address2 = $('#DV_SH_P_ADDR #txtAdd2').val().trim();
        SH_P_ADDR.Address3 = $('#DV_SH_P_ADDR #txtAdd3').val().trim();
        SH_P_ADDR.Address_City_Desc = $('#DV_SH_P_ADDR #txtCity').val().trim();
        SH_P_ADDR.AddCountry_Code = $('#DV_SH_P_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_SH_P_ADDR #ddlCountry').val();
        SH_P_ADDR.AddCountry_Desc = $('#DV_SH_P_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_SH_P_ADDR #ddlCountry :Selected').text().trim();
        SH_P_ADDR.MobileNumber = $('#txtMobileNo').val().trim();
        SH_P_ADDR.ResTelNumber = $('#DV_SH_P_ADDR #txtTelephone').val().trim();
        SH_P_ADDR.EmailAdd = $('#txtEmailId').val().trim();
        SH_P_ADDR.AddState_Desc = $('#DV_SH_P_ADDR #txtState').val().trim();
        SH_P_ADDR.Address_District_Desc = $('#DV_SH_P_ADDR #txtDistrict').val().trim();
        SH_P_ADDR.AddPin = $('#DV_SH_P_ADDR #txtPin').val();
        SH_P_ADDR.FolioNo = $('#hdrSHFolioNo').text().trim();
        SH_P_ADDR.FDRNo = $('#hdrSHExistingFDRNo').text().trim();
        SH_P_ADDR.LastInvDate = $('#hdrSHLastInvDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return SH_P_ADDR;
}
const SH_GET_MAIL_ADDR_FOR_SAVE = function () {
    let SH_M_ADDR = {};
    try {
        SH_M_ADDR.Holder_Type = '02';//pass this value accordingly as passing for holder type in investor kyc detail
        SH_M_ADDR.Appl_No = $('#lblApplicationNumber').text().trim();
        SH_M_ADDR.AddType_Code = "MAIL";//this will be hard coded value and will not change for any holder
        SH_M_ADDR.AddType_Desc = "Mailing Address";
        SH_M_ADDR.Address1 = $('#DV_SH_M_ADDR #txtAdd1').val().trim();
        SH_M_ADDR.Address2 = $('#DV_SH_M_ADDR #txtAdd2').val().trim();
        SH_M_ADDR.Address3 = $('#DV_SH_M_ADDR #txtAdd3').val().trim();
        SH_M_ADDR.Address_City_Desc = $('#DV_SH_M_ADDR #txtCity').val().trim();
        SH_M_ADDR.AddCountry_Code = $('#DV_SH_M_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_SH_M_ADDR #ddlCountry').val();
        SH_M_ADDR.AddCountry_Desc = $('#DV_SH_M_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_SH_M_ADDR #ddlCountry :Selected').text().trim();
        SH_M_ADDR.AddState_Desc = $('#DV_SH_M_ADDR #txtState').val().trim();
        SH_M_ADDR.Address_District_Desc = $('#DV_SH_M_ADDR #txtDistrict').val().trim();
        SH_M_ADDR.AddPin = $('#DV_SH_M_ADDR #txtPin').val();
        SH_M_ADDR.FolioNo = $('#hdrSHFolioNo').text().trim();
        SH_M_ADDR.FDRNo = $('#hdrSHExistingFDRNo').text().trim();
        SH_M_ADDR.LastInvDate = $('#hdrSHLastInvDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return SH_M_ADDR;
}
const SH_GET_FATCA_DTLS_FOR_SAVE = function () {
    let dataEntryBO = {};
    try {
        let ListTableBO = [];
        let FATCA_DATA_CITI = [];

        if ($('#DV_SH_FATCA #tblDetailList tbody tr').length > 0) {
            $('#DV_SH_FATCA #tblDetailList>tbody tr').each(function (i, tr) {
                let tableBO = {
                    TaxResident_CountryCode: tr.children[2].attributes['code'].nodeValue,//tr.children[2].attr('code'),
                    TaxResident_CountryName: tr.children[2].innerHTML,
                    TaxIdentificationTypeCode: tr.children[3].attributes['code'].nodeValue,// tr.children[3].attr('code'),
                    TaxIdentificationTypeDec: tr.children[3].innerHTML,
                    TaxIdentificationNumber: tr.children[4].innerHTML,
                    TRCExpiryDate: tr.children[5].innerHTML,
                    Address_TypeCode: tr.children[6].attributes['code'].nodeValue,// tr.children[6].attr('code'),
                    Address_TypeDesc: tr.children[6].innerHTML,
                    Address1: tr.children[7].innerHTML,
                    Address2: tr.children[8].innerHTML,
                    Landmark: tr.children[9].innerHTML,
                    State_Code: tr.children[10].attributes['code'].nodeValue,// tr.children[10].attr('code'),
                    State_Name: tr.children[10].innerHTML,
                    City: tr.children[11].innerHTML,
                    Postalcode: tr.children[12].innerHTML,
                    STD_Code_Primary: tr.children[13].innerHTML,
                    Telephone_Number_Primary: tr.children[14].innerHTML,
                    Mobile_Number_Primary: tr.children[15].innerHTML,
                    STD_Code_Other: tr.children[16].innerHTML,
                    Telephone_Number_Other: tr.children[17].innerHTML,
                    Mobile_Number_Other: tr.children[18].innerHTML,
                }

                ListTableBO.push(tableBO);
            });
        }

        $('#DV_SH_FATCA #ddlCitizenShip_CitizenShip option:selected').each(function (i) {
            let FATCA_CITI_BO = {
                Citizen_Country_Code: $(this).val(),
                Citizen_Country_Name: $('#DV_SH_FATCA #ddlCitizenShip_CitizenShip option[value="' + $(this).val() + '"]').text()
            }
            FATCA_DATA_CITI.push(FATCA_CITI_BO);
        });

        dataEntryBO.HolderType = '02';
        dataEntryBO.Appl_No = $('#lblApplicationNumber').val().trim();
        dataEntryBO.Nationality_Code = $('#DV_SH_FATCA #ddlNationalityH').val();
        dataEntryBO.Nationality_Dec = $('#DV_SH_FATCA #ddlNationalityH Selected').text();
        dataEntryBO.CountryOfBirth_Code = $('#DV_SH_FATCA #ddlcountryBirthHead').val();
        dataEntryBO.CountryOfBirth_Name = $('#DV_SH_FATCA #ddlcountryBirthHead Selected').text();
        dataEntryBO.CityOfBirth_Name = $('#DV_SH_FATCA #txtcityBirthHead').val().trim();
        dataEntryBO.Father_Name = $('#DV_SH_FATCA #txtFathernameHead').val().trim();
        dataEntryBO.Spouse_Name = $('#DV_SH_FATCA #txtSpousenameHead').val().trim();
        dataEntryBO.Occupation_code = $('#DV_SH_FATCA #ddloccupationHead').val();
        dataEntryBO.Occupation_Name = $('#DV_SH_FATCA #ddloccupationHead Selected').text();
        dataEntryBO.FATCA_Citizen = FATCA_DATA_CITI;
        dataEntryBO.FATCA_Detail = ListTableBO;
        dataEntryBO.FolioNo = $('#lblFolioNumber').text().trim();
        dataEntryBO.FDRNo = $('#lblExistingFDRNumber').text().trim();
        dataEntryBO.LastInvDate = $('#lblLastInvestmentDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return dataEntryBO;
}
const TH_GET_DATA_FOR_SAVE = function () {
    let TH_DTLS = {};
    try {
        TH_DTLS.Data_Source = BTP_OBJECT.TH_DATA_SOURCE;
        TH_DTLS.IsEditForCKYC = true;
        TH_DTLS.FolioNo = $('#hdrTHFolioNo').text().trim();
        TH_DTLS.FDRNo = $('#hdrTHExistingFDRNo').text().trim();
        TH_DTLS.LastInvDate = $('#hdrTHLastInvDate').text().trim();
        TH_DTLS.Kyc_DOB = $('#DV_TH #txtDOB').val();
        TH_DTLS.Kyc_MaritalStatus = $('#DV_TH #ddlMaritalStatus').val() == 'select' ? null : $('#DV_TH #ddlMaritalStatus').val();
        TH_DTLS.IsMinor = CheckIsMinor($('#DV_TH #txtDOB').val());
        TH_DTLS.Holder_Type = '03';
        TH_DTLS.Appl_No = $('#lblApplicationNumber').text().trim();
        TH_DTLS.Kyc_Number = $('#DV_TH #txtCKYCNumber').val().trim();
        TH_DTLS.Kyc_NamePrefix = $('#DV_TH #ddlTitle').val() == 'select' ? null : $('#DV_TH #ddlTitle').val();
        TH_DTLS.Kyc_FirstName = $('#DV_TH #txtFName').val().trim();
        TH_DTLS.Kyc_MiddleName = $('#DV_TH #txtMName').val().trim();
        TH_DTLS.Kyc_LastName = $('#DV_TH #txtLName').val().trim();
        TH_DTLS.Kyc_FullName = $('#DV_TH #txtFName').val().trim() + ' ' + $('#DV_TH #txtMName').val().trim() + ' ' + $('#DV_TH #txtLName').val().trim();

        if ($('#DV_TH #txtFatherFName').val().trim() != '') {
            TH_DTLS.Kyc_FatherNamePrefix = $('#DV_TH #ddlFatherTitle').val() == 'select' ? null : $('#DV_TH #ddlFatherTitle').val();
            TH_DTLS.Kyc_FatherFirstName = $('#DV_TH #txtFatherFName').val().trim();
            TH_DTLS.Kyc_FatherMiddleName = $('#DV_TH #txtFatherMName').val().trim();
            TH_DTLS.Kyc_FatherLastName = $('#DV_TH #txtFatherLName').val().trim();
            TH_DTLS.Kyc_FatherFullName = $('#DV_TH #txtFatherFName').val().trim() + ' ' + $('#DV_TH #txtFatherMName').val().trim() + ' ' + $('#DV_TH #txtFatherLName').val().trim();
        }

        if ($('#DV_TH #txtMotherFName').val().trim() != '') {
            TH_DTLS.Kyc_MotherNamePrefix = $('#DV_TH #ddlMotherTitle').val() == 'select' ? null : $('#DV_TH #ddlMotherTitle').val();
            TH_DTLS.Kyc_MotherFirstName = $('#DV_TH #txtMotherFName').val().trim();
            TH_DTLS.Kyc_MotherMiddletName = $('#DV_TH #txtMotherMName').val().trim();
            TH_DTLS.Kyc_MotherLastName = $('#DV_TH #txtMotherLName').val().trim();
            TH_DTLS.Kyc_MotherFullName = $('#DV_TH #txtMotherFName').val().trim() + ' ' + $('#DV_TH #txtMotherMName').val().trim() + ' ' + $('#DV_TH #txtMotherLName').val().trim();
        }

        if (!TH_DTLS.IsMinor && CheckIsMarried($('#DV_TH #ddlMaritalStatus').val()) && $('#DV_TH #txtSpouseFName').val().trim() != '') {
            TH_DTLS.Kyc_SpouseNamePrefix = $('#DV_TH #ddlSpouseTtitle').val() == 'select' ? null : $('#DV_TH #ddlSpouseTitle').val();
            TH_DTLS.Kyc_SpouseFirstName = $('#DV_TH #txtSpouseFName').val().trim();
            TH_DTLS.Kyc_SpouseMiddleName = $('#DV_TH #txtSpouseMName').val().trim();
            TH_DTLS.Kyc_SpouseLastName = $('#DV_TH #txtSpouseLName').val().trim();
            TH_DTLS.Kyc_SpouseFullName = $('#DV_TH #txtSpouseFName').val().trim() + ' ' + $('#DV_TH #txtSpouseMName').val().trim() + ' ' + $('#DV_TH #txtSpouseLName').val().trim();
        }

        if (TH_DTLS.IsMinor && !CheckIsMarried($('#DV_TH #ddlMaritalStatus').val()) && $('#DV_TH #txtGuardianFName').val().trim() != '') {
            TH_DTLS.Kyc_GuardianNamePrefix = $('#DV_TH #ddlGuardianTitle').val() == 'select' ? null : $('#DV_TH #ddlGuardianTitle').val();
            TH_DTLS.Kyc_GuardianFirstName = $('#DV_TH #txtGuardianFName').val().trim();
            TH_DTLS.Kyc_GuardianMiddleName = $('#DV_TH #txtGuardianMName').val().trim();
            TH_DTLS.Kyc_GuardianLastName = $('#DV_TH #txtGuardianLName').val().trim();
            TH_DTLS.Kyc_GuardianFullName = $('#DV_TH #txtGuardianFName').val().trim() + ' ' + $('#DV_TH #txtGuardianMName').val().trim() + ' ' + $('#DV_TH #txtGuardianLName').val().trim();
            TH_DTLS.Kyc_Guardian_PAN = $('#DV_TH #txtGuardianPAN').val().trim();
        }

        TH_DTLS.Kyc_Gender = $('#DV_TH #ddlGender').val() == 'select' ? null : $('#DV_TH #ddlGender').val();
        TH_DTLS.Kyc_Occupation_Code = $('#DV_TH #ddlOccupation').val() == 'select' ? null : $('#DV_TH #ddlOccupation').val();
        TH_DTLS.Kyc_Occupation_Desc = $('#DV_TH #ddlOccupation').val() == 'select' ? null : $('#DV_TH #ddlOccupation :Selected').text().trim();
        TH_DTLS.Kyc_PAN = $('#DV_TH #txtPAN').val().trim();
        TH_DTLS.Is_Tax_Resident = $('#btnTHsldFatca').hasClass('active');
        TH_DTLS.Is_Green_Card_Holder = $('#btnTHsldGreen').hasClass('active');
        TH_DTLS.MobilisationMode = $('#DV_TH #hdnMobilisationMode').val();
        TH_DTLS.SourceTableId = $('#hdnTHSourceTableId').val();
        TH_DTLS.IND_NIND = $('#ddlDepositorsStatus').val();
        TH_DTLS.Kyc_Annual_Income_Code = $('#DV_TH #ddlAnnualIncome').val() == 'select' ? null : $('#DV_TH #ddlAnnualIncome').val();
        TH_DTLS.Kyc_Annual_Income_Desc = $('#DV_TH #ddlAnnualIncome').val() == 'select' ? null : $('#DV_TH #ddlAnnualIncome :Selected').text().trim();

        //avinash added Occupation / sub - occupation changes
        TH_DTLS.Kyc_Occ_CustSegType = $('#DV_TH #ddlCustSegType').val() == 'select' ? null : $('#DV_TH #ddlCustSegType').val();
        TH_DTLS.Kyc_Occ_CustSegType_Desc = $('#DV_TH #ddlCustSegType').val() == 'select' ? null : $('#DV_TH #ddlCustSegType :Selected').text().trim();

        TH_DTLS.Kyc_Occ_CustSegSubType = $('#DV_TH #ddlCustSegSubType').val() == 'select' ? null : $('#DV_TH #ddlCustSegSubType').val();
        TH_DTLS.Kyc_Occ_CustSegSubType_Desc = $('#DV_TH #ddlCustSegSubType').val() == 'select' ? null : $('#DV_TH #ddlCustSegSubType :Selected').text().trim();

        $('#HdnCustSeg_typeCode_TH').val($('#DV_TH #ddlCustSegType').val());

    } catch (e) {
        fnException(e);
    }
    return TH_DTLS;
}
const TH_GET_PER_ADDR_FOR_SAVE = function () {
    let TH_P_ADDR = {};
    try {
        TH_P_ADDR.Holder_Type = '03';//pass this value accordingly as passing for holder type in investor kyc detail
        TH_P_ADDR.Appl_No = $('#lblApplicationNumber').text().trim();
        TH_P_ADDR.AddType_Code = "PER"; //this will be hard coded value and will not change for any holder
        TH_P_ADDR.AddType_Desc = "Permanent Address";
        TH_P_ADDR.Address1 = $('#DV_TH_P_ADDR #txtAdd1').val().trim();
        TH_P_ADDR.Address2 = $('#DV_TH_P_ADDR #txtAdd2').val().trim();
        TH_P_ADDR.Address3 = $('#DV_TH_P_ADDR #txtAdd3').val().trim();
        TH_P_ADDR.Address_City_Desc = $('#DV_TH_P_ADDR #txtCity').val().trim();
        TH_P_ADDR.AddCountry_Code = $('#DV_TH_P_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_TH_P_ADDR #ddlCountry').val();
        TH_P_ADDR.AddCountry_Desc = $('#DV_TH_P_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_TH_P_ADDR #ddlCountry :Selected').text().trim();
        TH_P_ADDR.MobileNumber = $('#txtMobileNo').val().trim();
        TH_P_ADDR.ResTelNumber = $('#DV_TH_P_ADDR #txtTelephone').val().trim();
        TH_P_ADDR.EmailAdd = $('#txtEmailId').val().trim();
        TH_P_ADDR.AddState_Desc = $('#DV_TH_P_ADDR #txtState').val().trim();
        TH_P_ADDR.Address_District_Desc = $('#DV_TH_P_ADDR #txtDistrict').val().trim();
        TH_P_ADDR.AddPin = $('#DV_TH_P_ADDR #txtPin').val();
        TH_P_ADDR.FolioNo = $('#hdrTHFolioNo').text().trim();
        TH_P_ADDR.FDRNo = $('#hdrTHExistingFDRNo').text().trim();
        TH_P_ADDR.LastInvDate = $('#hdrTHLastInvDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return TH_P_ADDR;
}
const TH_GET_MAIL_ADDR_FOR_SAVE = function () {
    let TH_M_ADDR = {};
    try {
        TH_M_ADDR.Holder_Type = '03';//pass this value accordingly as passing for holder type in investor kyc detail
        TH_M_ADDR.Appl_No = $('#lblApplicationNumber').text().trim();
        TH_M_ADDR.AddType_Code = "MAIL";//this will be hard coded value and will not change for any holder
        TH_M_ADDR.AddType_Desc = "Mailing Address";
        TH_M_ADDR.Address1 = $('#DV_TH_M_ADDR #txtAdd1').val().trim();
        TH_M_ADDR.Address2 = $('#DV_TH_M_ADDR #txtAdd2').val().trim();
        TH_M_ADDR.Address3 = $('#DV_TH_M_ADDR #txtAdd3').val().trim();
        TH_M_ADDR.Address_City_Desc = $('#DV_TH_M_ADDR #txtCity').val().trim();
        TH_M_ADDR.AddCountry_Code = $('#DV_TH_M_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_TH_M_ADDR #ddlCountry').val();
        TH_M_ADDR.AddCountry_Desc = $('#DV_TH_M_ADDR #ddlCountry').val() == 'select' ? null : $('#DV_TH_M_ADDR #ddlCountry :Selected').text().trim();
        TH_M_ADDR.AddState_Desc = $('#DV_TH_M_ADDR #txtState').val().trim();
        TH_M_ADDR.Address_District_Desc = $('#DV_TH_M_ADDR #txtDistrict').val().trim();
        TH_M_ADDR.AddPin = $('#DV_TH_M_ADDR #txtPin').val();
        TH_M_ADDR.FolioNo = $('#hdrTHFolioNo').text().trim();
        TH_M_ADDR.FDRNo = $('#hdrTHExistingFDRNo').text().trim();
        TH_M_ADDR.LastInvDate = $('#hdrTHLastInvDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return TH_M_ADDR;
}
const TH_GET_FATCA_DTLS_FOR_SAVE = function () {
    let dataEntryBO = {};
    try {
        let ListTableBO = [];
        let FATCA_DATA_CITI = [];

        if ($('#DV_TH_FATCA #tblDetailList tbody tr').length > 0) {
            $('#DV_TH_FATCA #tblDetailList>tbody tr').each(function (i, tr) {
                let tableBO = {
                    TaxResident_CountryCode: tr.children[2].attributes['code'].nodeValue,//tr.children[2].attr('code'),
                    TaxResident_CountryName: tr.children[2].innerHTML,
                    TaxIdentificationTypeCode: tr.children[3].attributes['code'].nodeValue,// tr.children[3].attr('code'),
                    TaxIdentificationTypeDec: tr.children[3].innerHTML,
                    TaxIdentificationNumber: tr.children[4].innerHTML,
                    TRCExpiryDate: tr.children[5].innerHTML,
                    Address_TypeCode: tr.children[6].attributes['code'].nodeValue,// tr.children[6].attr('code'),
                    Address_TypeDesc: tr.children[6].innerHTML,
                    Address1: tr.children[7].innerHTML,
                    Address2: tr.children[8].innerHTML,
                    Landmark: tr.children[9].innerHTML,
                    State_Code: tr.children[10].attributes['code'].nodeValue,// tr.children[10].attr('code'),
                    State_Name: tr.children[10].innerHTML,
                    City: tr.children[11].innerHTML,
                    Postalcode: tr.children[12].innerHTML,
                    STD_Code_Primary: tr.children[13].innerHTML,
                    Telephone_Number_Primary: tr.children[14].innerHTML,
                    Mobile_Number_Primary: tr.children[15].innerHTML,
                    STD_Code_Other: tr.children[16].innerHTML,
                    Telephone_Number_Other: tr.children[17].innerHTML,
                    Mobile_Number_Other: tr.children[18].innerHTML,
                }

                ListTableBO.push(tableBO);
            });
        }

        $('#DV_TH_FATCA #ddlCitizenShip_CitizenShip option:selected').each(function (i) {
            let FATCA_CITI_BO = {
                Citizen_Country_Code: $(this).val(),
                Citizen_Country_Name: $('#DV_TH_FATCA #ddlCitizenShip_CitizenShip option[value="' + $(this).val() + '"]').text()
            }
            FATCA_DATA_CITI.push(FATCA_CITI_BO);
        });

        dataEntryBO.HolderType = '03';
        dataEntryBO.Appl_No = $('#lblApplicationNumber').val().trim();
        dataEntryBO.Nationality_Code = $('#DV_TH_FATCA #ddlNationalityH').val();
        dataEntryBO.Nationality_Dec = $('#DV_TH_FATCA #ddlNationalityH Selected').text();
        dataEntryBO.CountryOfBirth_Code = $('#DV_TH_FATCA #ddlcountryBirthHead').val();
        dataEntryBO.CountryOfBirth_Name = $('#DV_TH_FATCA #ddlcountryBirthHead Selected').text();
        dataEntryBO.CityOfBirth_Name = $('#DV_TH_FATCA #txtcityBirthHead').val().trim();
        dataEntryBO.Father_Name = $('#DV_TH_FATCA #txtFathernameHead').val().trim();
        dataEntryBO.Spouse_Name = $('#DV_TH_FATCA #txtSpousenameHead').val().trim();
        dataEntryBO.Occupation_code = $('#DV_TH_FATCA #ddloccupationHead').val();
        dataEntryBO.Occupation_Name = $('#DV_TH_FATCA #ddloccupationHead Selected').text();
        dataEntryBO.FATCA_Citizen = FATCA_DATA_CITI;
        dataEntryBO.FATCA_Detail = ListTableBO;
        dataEntryBO.FolioNo = $('#lblFolioNumber').text().trim();
        dataEntryBO.FDRNo = $('#lblExistingFDRNumber').text().trim();
        dataEntryBO.LastInvDate = $('#lblLastInvestmentDate').text().trim();


    } catch (e) {
        fnException(e);
    }
    return dataEntryBO;
}
//first holder save validations
const FH_Save_Validations = function () {
    let err_msg = '';
    try {
        $('.HOLD_DTL').removeClass('InputBorderRed');
        $('.MORE_DTL').removeClass('InputBorderRed');
        $('.D_T_E').parent().removeClass('InputBorderRed');

        let txtDOB = $('#txtInvDOB').val();
        let IsInvMinor = CheckIsMinor(txtDOB);
        let IsInvMarried = CheckIsMarried($('#DV_FH #ddlMaritalStatus').val());


        //name
        if ($.isEmptyObject($('#txtInvFirstName').val())) {
            err_msg += "<p>Investor's name is required..!</p>";
            $('#ddlInvtitle').addClass('InputBorderRed');
        }

        //pan
        if ($.isEmptyObject($('#txtInvPan').val()) && (!IsMinor(txtDOB) && BTP_OBJECT.IND_NIND != 'IND')) {
            err_msg += "<p>Investor's PAN is required..!</p>";
            $('#txtInvPan').addClass('InputBorderRed');
        }

        if (BTP_OBJECT.IND_NIND == 'IND') {
            //title  
            if ($('#ddlInvtitle').val() == 'select') {
                err_msg += "<p>Investor's name prefix is required..!</p>";
                $('#ddlInvtitle').addClass('InputBorderRed');
            }

            //dob
            if ($.isEmptyObject(txtDOB)) {
                err_msg += "<p>Investor's date of birth is required..!</p>";
                $('#txtInvDOB').addClass('InputBorderRed');
            }

            //gender
            if ($('#DV_FH #ddlGender').val() == 'select') {
                err_msg += "<p>Investor's gender is required..!</p>";
                $('#DV_FH #ddlGender').addClass('InputBorderRed');
            }

            let $InvFatherName = $('#DV_FH #txtFatherFName');
            let $InvMotherName = $('#DV_FH #txtMotherFName');
            let $InvSpouseName = $('#DV_FH #txtSpouseFName');
            //if ($InvFatherName.val() == '' && $InvMotherName.val() == '' && ($InvSpouseName.val() == '' && IsInvMarried && !IsInvMinor)) {
            if ($InvFatherName.val() == '' && $InvMotherName.val() == '' && $InvSpouseName.val() == '') {
                err_msg += "<p>Investor's father/mother/spouse name is required..!</p>";
            }
            //else if ($InvFatherName.val() == '' && $InvMotherName.val() == '') {
            //    err_msg += "<p>Investor's father/mother Name is required..!</p>";
            //}
            else {
                if ($InvFatherName.val() != '' && $('#DV_FH #ddlFatherTitle').val() == 'select') {
                    err_msg += "<p>Investor's father name prefix is required..!</p>";
                }

                if ($InvMotherName.val() != '' && $('#DV_FH #ddlMotherTitle').val() == 'select') {
                    err_msg += "<p>Investor's mother name prefix is required..!</p>";
                }

                if ($InvSpouseName.val() != '' && $('#DV_FH #ddlSpouseTitle').val() == 'select') {
                    err_msg += "<p>Investor's spouse name prefix is required..!</p>";
                }
            }

            //marital status
            if ($('#DV_FH #ddlMaritalStatus').val() == 'select') {
                err_msg += "<p>Investor's marital status is required..!</p>";
                $('#DV_FH #ddlMaritalStatus').addClass('InputBorderRed');
            }

            ////Annual Income
            //if ($('#DV_FH #ddlAnnualIncome').val() == 'select') {
            //    err_msg += "<p>Investor's annual income is required..!</p>";
            //    $('#DV_FH #ddlAnnualIncome').addClass('InputBorderRed');
            //}

            ////occupation
            //if ($('#DV_FH #ddlOccupation').val() == 'select') {
            //    err_msg += "<p>Investor's occupation is required..!</p>";
            //    $('#DV_FH #ddlOccupation').addClass('InputBorderRed');
            //}

        }
        else {
            //title
            $('#ddlInvtitle').val("M/S").prop('disabled', true).addClass('DisabledControl');

            //doi
            if ($.isEmptyObject($('#txtInvDOI').val())) {
                err_msg += "<p>Investor's date on incorporation is required..!</p>";
                $('#txtInvDOI').addClass('InputBorderRed');
            }
        }

        //Guard pan 
        if ($.isEmptyObject($('#DV_FH #txtGuardianPAN').val()) && (IsMinor(txtDOB) && BTP_OBJECT.IND_NIND == 'IND')) {
            err_msg += "<p>Investor's guardian PAN is required..!</p>";
            $('#DV_FH #txtGuardianPAN').addClass('InputBorderRed');
        }

        //Guard title 
        if ($.isEmptyObject($('#DV_FH #ddlGuardianTitle').val()) && (IsMinor(txtDOB) && BTP_OBJECT.IND_NIND == 'IND')) {
            err_msg += "<p>Investor's guardian name prefix is required..!</p>";
            $('#DV_FH #ddlGuardianTitle').addClass('InputBorderRed');
        }

        //Guard name 
        if ($.isEmptyObject($('#DV_FH #txtGuardianFName').val()) && (IsMinor(txtDOB) && BTP_OBJECT.IND_NIND == 'IND')) {
            err_msg += "<p>Investor's guardian name is required..!</p>";
            $('#DV_FH #txtGuardianFName').addClass('InputBorderRed');
        }

        //Annual Income
        if ($('#DV_FH #ddlAnnualIncome').val() == 'select') {
            err_msg += "<p>Investor's annual income is required..!</p>";
            $('#DV_FH #ddlAnnualIncome').addClass('InputBorderRed');
        }

        //occupation
        if ($('#DV_FH #ddlOccupation').val() == 'select') {
            err_msg += "<p>Investor's occupation is required..!</p>";
            $('#DV_FH #ddlOccupation').addClass('InputBorderRed');
        }


        //Sub-Occupation avinash added Occupation/sub-occupation changes
        if ($('#DV_FH #ddlCustSegType').val() == "select") {
            err_msg += "<p>Customer Segment Type is required..!</p>";
            $('#DV_FH #ddlCustSegType').addClass('InputBorderRed');
        }
        if ($('#DV_FH #ddlCustSegType').val() != 'select' && ($('#DV_FH #ddlCustSegSubType').val() == "select")) {
            err_msg += "<p>Customer Segment SubType is required..!</p>";
            $('#DV_FH #ddlCustSegSubType').addClass('InputBorderRed');
        }

        //mobile
        if ($.isEmptyObject($('#txtMobile').val())) {
            err_msg += "<p>Investor's mobile number is required..!</p>";
            $('#txtMobile').addClass('InputBorderRed');
        }

        //email
        if ($.isEmptyObject($('#txtEmail').val())) {
            err_msg += "<p>Investor's email address is required..!</p>";
            $('#txtEmail').addClass('InputBorderRed');
        }

        //permanent address1
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtAdd1').val())) {
            err_msg += "<p>Investor's permanent address is required..!</p>";
            $('#DV_FH_P_ADDR #txtAdd1').addClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_FH_P_ADDR #ddlCountry').val() == 'select') {
            err_msg += "<p>Investor's permanent country is required..!</p>";
            $('#DV_FH_P_ADDR #ddlCountry').addClass('InputBorderRed');
        }

        //permanent pincode
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtPin').val())) {
            err_msg += "<p>Investor's permanent pincode is required..!</p>";
            $('#DV_FH_P_ADDR #txtPin').addClass('InputBorderRed');
        }

        //permanent state
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtState').val())) {
            err_msg += "<p>Investor's permanent state is required..!</p>";
            $('#DV_FH_P_ADDR #txtState').addClass('InputBorderRed');
        }

        //permanent district
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtDistrict').val())) {
            err_msg += "<p>Investor's permanent district is required..!</p>";
            $('#DV_FH_P_ADDR #txtDistrict').addClass('InputBorderRed');
        }

        //permanent city
        if ($.isEmptyObject($('#DV_FH_P_ADDR #txtCity').val())) {
            err_msg += "<p>Investor's permanent city is required..!</p>";
            $('#DV_FH_P_ADDR #txtCity').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtAdd1').val())) {
            err_msg += "<p>Investor's mailing address is required..!</p>";
            $('#DV_FH_M_ADDR #txtAdd1').addClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_FH_M_ADDR #ddlCountry').val() == 'select') {
            err_msg += "<p>Investor's mailing country is required..!</p>";
            $('#DV_FH_M_ADDR #ddlCountry').addClass('InputBorderRed');
        }

        //mailing pincode
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtPin').val())) {
            err_msg += "<p>Investor's mailing pincode is required..!</p>";
            $('#DV_FH_M_ADDR #txtPin').addClass('InputBorderRed');
        }

        //mailing state
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtState').val())) {
            err_msg += "<p>Investor's mailing state is required..!</p>";
            $('#DV_FH_M_ADDR #txtState').addClass('InputBorderRed');
        }

        //mailing district
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtDistrict').val())) {
            err_msg += "<p>Investor's mailing district is required..!</p>";
            $('#DV_FH_M_ADDR #txtDistrict').addClass('InputBorderRed');
        }

        //mailing city
        if ($.isEmptyObject($('#DV_FH_M_ADDR #txtCity').val())) {
            err_msg += "<p>Investor's mailing city is required..!</p>";
            $('#DV_FH_M_ADDR #txtCity').addClass('InputBorderRed');
        }

        //overseas address1
        if ($('#chkIdOverSeasAddress').prop('checked')) {
            if ($.isEmptyObject($('#txtOAdd1').val())) {
                err_msg += "<p>Investor's overseas address is required..!</p>";
                $('#txtOAdd1').addClass('InputBorderRed');
            }

            //overseas country
            if ($('#ddlOCountry').val() == 'select') {
                err_msg += "<p>Investor's overseas country is required..!</p>";
                $('#ddlOCountry').addClass('InputBorderRed');
            }

            //overseas state
            if ($.isEmptyObject($('#txtOState').val())) {
                err_msg += "<p>Investor's overseas state is required..!</p>";
                $('#txtOState').addClass('InputBorderRed');
            }

            //overseas city
            if ($.isEmptyObject($('#txtOCity').val())) {
                err_msg += "<p>Investor's overseas city is required..!</p>";
                $('#txtOCity').addClass('InputBorderRed');
            }

            //overseas pincode
            if ($.isEmptyObject($('#txtOPin').val())) {
                err_msg += "<p>Investor's overseas pincode is required..!</p>";
                $('#txtOPin').addClass('InputBorderRed');
            }


        }

        //FH FATCA Details
        if ($('#btnsldFatca').hasClass('active') || $('#btnsldGreen').hasClass('active')) {
            $('#DV_FH_FATCA .requiredFatcaDtl').each(function () {
                if ($.isEmptyObject($(this).val()) || $(this).val() == "-1" || $(this).val().toString().toLowerCase() == "select") {
                    if ($(this).attr('errmsg') != "" && $(this).attr('errmsg') != undefined) {
                        err_msg += "<p>" + $(this).attr('errmsg') + "</p>";
                    }
                    $(this).addClass('InputBorderRed');
                }
            });

            if ($('#DV_FH_FATCA #tblDetailList tbody tr').hasClass('empty_table') || $('#DV_FH_FATCA #tblDetailList tbody tr').length == 0) {
                err_msg += "<p>Investor's FATCA details are required..!</p>";
            }
        }
       

    } catch (e) {
        fnException(e);
    }
    return err_msg;
}
//second holder save validations
const SH_Save_Validations = function () {
    let err_msg = '';
    try {
        $('.HOLD_DTL').removeClass('InputBorderRed');
        $('.MORE_DTL').removeClass('InputBorderRed');
        $('.D_T_E').parent().removeClass('InputBorderRed');

        let txtDOB = $('#DV_SH #txtDOB').val();
        let IsSHMinor = CheckIsMinor(txtDOB);
        let IsSHMarried = CheckIsMarried($('#DV_SH #ddlMaritalStatus').val());

        //title  
        if ($('#DV_SH #ddlTitle').val() == 'select' || $('#DV_SH #ddlTitle').val() == '' || $('#DV_SH #ddlTitle').val() == null) {
            err_msg += "<p>Second holder's name prefix is required..!</p>";
            $('#DV_SH #ddlTitle').addClass('InputBorderRed');
        }

        //name
        if ($.isEmptyObject($('#DV_SH #txtFName').val())) {
            err_msg += "<p>Second holder's name is required..!</p>";
            $('#DV_SH #txtFName').addClass('InputBorderRed');
        }

        //dob
        if ($.isEmptyObject(txtDOB)) {
            err_msg += "<p>Second holder's date of birth is required..!</p>";
            $('#txtInvDOB').addClass('InputBorderRed');
        }

        //pan
        if ($('#DV_SH #txtPAN').val() == '' && !IsSHMinor) {
            err_msg += "<p>Second holder's PAN is required..!</p>";
            $('#DV_SH #txtPAN').addClass('InputBorderRed');
        }

        //gender
        if ($('#DV_SH #ddlGender').val() == 'select') {
            err_msg += "<p>Second holder's gender is required..!</p>";
            $('#DV_SH #ddlGender').addClass('InputBorderRed');
        }

        //Guard pan 
        if ($.isEmptyObject($('#DV_SH #txtGuardianPAN').val()) && IsSHMinor) {
            err_msg += "<p>Second holder's guardian PAN is required..!</p>";
            $('#DV_SH #txtGuardianPAN').addClass('InputBorderRed');
        }

        //Guard title 
        if ($.isEmptyObject($('#DV_SH #ddlGuardianTitle').val()) && IsSHMinor) {
            err_msg += "<p>Second holder's guardian name prefix is required..!</p>";
            $('#DV_SH #ddlGuardianTitle').addClass('InputBorderRed');
        }

        //Guard name 
        if ($.isEmptyObject($('#DV_SH #txtGuardianFName').val()) && IsSHMinor) {
            err_msg += "<p>Second holder's guardian name is required..!</p>";
            $('#DV_SH #txtGuardianFName').addClass('InputBorderRed');
        }

        let $SHFatherName = $('#DV_SH #txtFatherFName');
        let $SHMotherName = $('#DV_SH #txtMotherFName');
        let $SHSpouseName = $('#DV_SH #txtSpouseFName');
        //if ($SHFatherName.val() == '' && $SHMotherName.val() == '' && ($SHSpouseName.val() == '' && IsSHMarried && !IsSHMinor)) {
        if ($SHFatherName.val() == '' && $SHMotherName.val() == '' && $SHSpouseName.val() == '') {
            err_msg += "<p>Second holder's father/mother/spouse Name is required..!</p>";
        }
        //else if ($SHFatherName.val() == '' && $SHMotherName.val() == '') {
        //    err_msg += "<p>Second holder's father/mother name is required..!</p>";
        //}
        else {
            if ($SHFatherName.val() != '' && $('#DV_SH #ddlFatherTitle').val() == 'select') {
                err_msg += "<p>Second holder's father name prefix is required..!</p>";
            }

            if ($SHMotherName.val() != '' && $('#DV_SH #ddlMotherTitle').val() == 'select') {
                err_msg += "<p>Second holder's mother name prefix is required..!</p>";
            }

            if ($SHSpouseName.val() != '' && $('#DV_SH #ddlSpouseTitle').val() == 'select') {
                err_msg += "<p>Second holder's spouse name prefix is required..!</p>";
            }
        }

        //marital status
        if ($('#DV_SH #ddlMaritalStatus').val() == 'select') {
            err_msg += "<p>Second holder's marital status is required..!</p>";
            $('#DV_SH #ddlMaritalStatus').addClass('InputBorderRed');
        }

        //Annual Income
        if ($('#DV_SH #ddlAnnualIncome').val() == 'select') {
            err_msg += "<p>Second holder's annual income is required..!</p>";
            $('#DV_SH #ddlAnnualIncome').addClass('InputBorderRed');
        }

        //occupation
        if ($('#DV_SH #ddlOccupation').val() == 'select') {
            err_msg += "<p>Second holder's occupation is required..!</p>";
            $('#DV_SH #ddlOccupation').addClass('InputBorderRed');
        }

        //Sub-Occupation avinash added Occupation/sub-occupation changes

        if ($('#DV_SH #ddlCustSegType').val() == "select" || $('#DV_SH #ddlCustSegType').val() == "" || $('#DV_SH #ddlCustSegType').val() == null) {
            err_msg += "<p>Second holder's Customer Segment Type is required..!</p>";
            $('#DV_SH #ddlCustSegType').addClass('InputBorderRed');
        }
        if ($('#DV_SH #ddlCustSegType').val() != 'select' && ($('#DV_SH #ddlCustSegSubType').val() == "select")) {
            err_msg += "<p>Second holder's Customer Segment SubType is required..!</p>";
            $('#DV_SH #ddlCustSegSubType').addClass('InputBorderRed');
        }

        //permanent address1
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtAdd1').val())) {
            err_msg += "<p>Second holder's permanent address is required..!</p>";
            $('#DV_SH_P_ADDR #txtAdd1').addClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_SH_P_ADDR #ddlCountry').val() == 'select') {
            err_msg += "<p>Second holder's permanent country is required..!</p>";
            $('#DV_SH_P_ADDR #ddlCountry').addClass('InputBorderRed');
        }

        //permanent pincode
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtPin').val())) {
            err_msg += "<p>Second holder's permanent pincode is required..!</p>";
            $('#DV_SH_P_ADDR #txtPin').addClass('InputBorderRed');
        }

        //permanent state
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtState').val())) {
            err_msg += "<p>Second holder's permanent state is required..!</p>";
            $('#DV_SH_P_ADDR #txtState').addClass('InputBorderRed');
        }

        //permanent district
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtDistrict').val())) {
            err_msg += "<p>Second holder's permanent district is required..!</p>";
            $('#DV_SH_P_ADDR #txtDistrict').addClass('InputBorderRed');
        }

        //permanent city
        if ($.isEmptyObject($('#DV_SH_P_ADDR #txtCity').val())) {
            err_msg += "<p>Second holder's permanent city is required..!</p>";
            $('#DV_SH_P_ADDR #txtCity').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtAdd1').val())) {
            err_msg += "<p>Second holder's mailing address is required..!</p>";
            $('#DV_SH_M_ADDR #txtAdd1').addClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_SH_M_ADDR #ddlCountry').val() == 'select') {
            err_msg += "<p>Second holder's mailing country is required..!</p>";
            $('#DV_SH_M_ADDR #ddlCountry').addClass('InputBorderRed');
        }

        //mailing pincode
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtPin').val())) {
            err_msg += "<p>Second holder's mailing pincode is required..!</p>";
            $('#DV_SH_M_ADDR #txtPin').addClass('InputBorderRed');
        }

        //mailing state
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtState').val())) {
            err_msg += "<p>Second holder's mailing state is required..!</p>";
            $('#DV_SH_M_ADDR #txtState').addClass('InputBorderRed');
        }

        //mailing district
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtDistrict').val())) {
            err_msg += "<p>Second holder's mailing district is required..!</p>";
            $('#DV_SH_M_ADDR #txtDistrict').addClass('InputBorderRed');
        }

        //mailing city
        if ($.isEmptyObject($('#DV_SH_M_ADDR #txtCity').val())) {
            err_msg += "<p>Second holder's mailing city is required..!</p>";
            $('#DV_SH_M_ADDR #txtCity').addClass('InputBorderRed');
        }

        //FATCA Details
        if ($('#btnSHsldFatca').hasClass('active') || $('#btnSHsldGreen').hasClass('active')) {
            $('#DV_SH_FATCA .requiredFatcaDtl').each(function () {
                if ($.isEmptyObject($(this).val()) || $(this).val() == "-1" || $(this).val().toString().toLowerCase() == "select") {
                    if ($(this).attr('errmsg') != "" && $(this).attr('errmsg') != undefined) {
                        err_msg += "<p>" + $(this).attr('errmsg') + "</p>";
                    }
                    $(this).addClass('InputBorderRed');
                }


            });

            if ($('#DV_SH_FATCA #tblDetailList tbody tr').hasClass('empty_table') || $('#DV_SH_FATCA #tblDetailList tbody tr').length == 0) {
                err_msg += "<p>Second holder's FATCA details are required..!</p>";
                isError = true;
            }
        }


    } catch (e) {
        fnException(e);
    }
    return err_msg;
}
//third holder save validations
const TH_Save_Validations = function () {
    let err_msg = '';
    try {
        $('.HOLD_DTL').removeClass('InputBorderRed');
        $('.MORE_DTL').removeClass('InputBorderRed');
        $('.D_T_E').parent().removeClass('InputBorderRed');

        let txtDOB = $('#DV_TH #txtDOB').val();
        let IsTHMinor = CheckIsMinor(txtDOB);
        let IsTHMarried = CheckIsMarried($('#DV_TH #ddlMaritalStatus').val());

        //title  
        if ($('#DV_TH #ddlTitle').val() == 'select' || $('#DV_TH #ddlTitle').val() == '' || $('#DV_TH #ddlTitle').val() == null) {
            err_msg += "<p>Third holder's name prefix is required..!</p>";
            $('#DV_TH #ddlTitle').addClass('InputBorderRed');
        }

        //name
        if ($.isEmptyObject($('#DV_TH #txtFName').val())) {
            err_msg += "<p>Third holder's name is required..!</p>";
            $('#DV_TH #txtFName').addClass('InputBorderRed');
        }

        //dob
        if ($.isEmptyObject(txtDOB)) {
            err_msg += "<p>Third holder's date of birth is required..!</p>";
            $('#txtInvDOB').addClass('InputBorderRed');
        }

        //pan
        if ($('#DV_TH #txtPAN').val() == '' && !IsTHMinor) {
            err_msg += "<p>Third holder's PAN is required..!</p>";
            $('#DV_TH #txtPAN').addClass('InputBorderRed');
        }

        //gender
        if ($('#DV_TH #ddlGender').val() == 'select') {
            err_msg += "<p>Third holder's gender is required..!</p>";
            $('#DV_TH #ddlGender').addClass('InputBorderRed');
        }

        //Guard pan 
        if ($.isEmptyObject($('#DV_TH #txtGuardianPAN').val()) && IsTHMinor) {
            err_msg += "<p>Third holder's guardian PAN is required..!</p>";
            $('#DV_TH #txtGuardianPAN').addClass('InputBorderRed');
        }

        //Guard title 
        if ($.isEmptyObject($('#DV_TH #ddlGuardianTitle').val()) && IsTHMinor) {
            err_msg += "<p>Third holder's guardian name prefix is required..!</p>";
            $('#DV_TH #ddlGuardianTitle').addClass('InputBorderRed');
        }

        //Guard name 
        if ($.isEmptyObject($('#DV_TH #txtGuardianFName').val()) && IsTHMinor) {
            err_msg += "<p>Third holder's guardian name is required..!</p>";
            $('#DV_TH #txtGuardianFName').addClass('InputBorderRed');
        }

        let $THFatherName = $('#DV_TH #txtFatherFName');
        let $THMotherName = $('#DV_TH #txtMotherFName');
        let $THSpouseName = $('#DV_TH #txtSpouseFName');
        //if ($THFatherName.val() == '' && $THMotherName.val() == '' && ($THSpouseName.val() == '' && IsTHMarried && !IsTHMinor)) {
        if ($THFatherName.val() == '' && $THMotherName.val() == '' && $THSpouseName.val() == '') {
            err_msg += "<p>Third holder's father/mother/spouse Name is required..!</p>";
        }
        //else if ($THFatherName.val() == '' && $THMotherName.val() == '') {
        //    err_msg += "<p>Third holder's father/mother name is required..!</p>";
        //}
        else {
            if ($THFatherName.val() != '' && $('#DV_TH #ddlFatherTitle').val() == 'select') {
                err_msg += "<p>Third holder's father name prefix is required..!</p>";
            }

            if ($THMotherName.val() != '' && $('#DV_TH #ddlMotherTitle').val() == 'select') {
                err_msg += "<p>Third holder's mother name prefix is required..!</p>";
            }

            if ($THSpouseName.val() != '' && $('#DV_TH #ddlSpouseTitle').val() == 'select') {
                err_msg += "<p>Third holder's spouse name prefix is required..!</p>";
            }
        }

        //marital status
        if ($('#DV_TH #ddlMaritalStatus').val() == 'select') {
            err_msg += "<p>Third holder's marital status is required..!</p>";
            $('#DV_TH #ddlMaritalStatus').addClass('InputBorderRed');
        }

        //Annual Income
        if ($('#DV_TH #ddlAnnualIncome').val() == 'select') {
            err_msg += "<p>Third holder's annual income is required..!</p>";
            $('#DV_TH #ddlAnnualIncome').addClass('InputBorderRed');
        }

        //occupation
        if ($('#DV_TH #ddlOccupation').val() == 'select') {
            err_msg += "<p>Third holder's occupation is required..!</p>";
            $('#DV_TH #ddlOccupation').addClass('InputBorderRed');
        }

        //Sub-Occupation avinash added Occupation/sub-occupation changes

        if ($('#DV_TH #ddlCustSegType').val() == "select" || $('#DV_TH #ddlCustSegType').val() == "" || $('#DV_TH #ddlCustSegType').val() == null) {
            err_msg += "<p>Third holder's Customer Segment Type is required..!</p>";
            $('#DV_TH #ddlCustSegType').addClass('InputBorderRed');
        }
        if ($('#DV_TH #ddlCustSegType').val() != 'select' && ($('#DV_TH #ddlCustSegSubType').val() == "select")) {
            err_msg += "<p>Third holder's Customer Segment SubType is required..!</p>";
            $('#DV_TH #ddlCustSegSubType').addClass('InputBorderRed');
        }

        //permanent address1
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtAdd1').val())) {
            err_msg += "<p>Third holder's permanent address is required..!</p>";
            $('#DV_TH_P_ADDR #txtAdd1').addClass('InputBorderRed');
        }

        //permanent country
        if ($('#DV_TH_P_ADDR #ddlCountry').val() == 'select') {
            err_msg += "<p>Third holder's permanent country is required..!</p>";
            $('#DV_TH_P_ADDR #ddlCountry').addClass('InputBorderRed');
        }

        //permanent pincode
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtPin').val())) {
            err_msg += "<p>Third holder's permanent pincode is required..!</p>";
            $('#DV_TH_P_ADDR #txtPin').addClass('InputBorderRed');
        }

        //permanent state
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtState').val())) {
            err_msg += "<p>Third holder's permanent state is required..!</p>";
            $('#DV_TH_P_ADDR #txtState').addClass('InputBorderRed');
        }

        //permanent district
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtDistrict').val())) {
            err_msg += "<p>Third holder's permanent district is required..!</p>";
            $('#DV_TH_P_ADDR #txtDistrict').addClass('InputBorderRed');
        }

        //permanent city
        if ($.isEmptyObject($('#DV_TH_P_ADDR #txtCity').val())) {
            err_msg += "<p>Third holder's permanent city is required..!</p>";
            $('#DV_TH_P_ADDR #txtCity').addClass('InputBorderRed');
        }

        //mailing address1
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtAdd1').val())) {
            err_msg += "<p>Third holder's mailing address is required..!</p>";
            $('#DV_TH_M_ADDR #txtAdd1').addClass('InputBorderRed');
        }

        //mailing country
        if ($('#DV_TH_M_ADDR #ddlCountry').val() == 'select') {
            err_msg += "<p>Third holder's mailing country is required..!</p>";
            $('#DV_TH_M_ADDR #ddlCountry').addClass('InputBorderRed');
        }

        //mailing pincode
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtPin').val())) {
            err_msg += "<p>Third holder's mailing pincode is required..!</p>";
            $('#DV_TH_M_ADDR #txtPin').addClass('InputBorderRed');
        }

        //mailing state
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtState').val())) {
            err_msg += "<p>Third holder's mailing state is required..!</p>";
            $('#DV_TH_M_ADDR #txtState').addClass('InputBorderRed');
        }

        //mailing district
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtDistrict').val())) {
            err_msg += "<p>Third holder's mailing district is required..!</p>";
            $('#DV_TH_M_ADDR #txtDistrict').addClass('InputBorderRed');
        }

        //mailing city
        if ($.isEmptyObject($('#DV_TH_M_ADDR #txtCity').val())) {
            err_msg += "<p>Third holder's mailing city is required..!</p>";
            $('#DV_TH_M_ADDR #txtCity').addClass('InputBorderRed');
        }

        //FATCA Details
        if ($('#btnTHsldFatca').hasClass('active') || $('#btnTHsldGreen').hasClass('active')) {
            $('#DV_TH_FATCA .requiredFatcaDtl').each(function () {
                if ($.isEmptyObject($(this).val()) || $(this).val() == "-1" || $(this).val().toString().toLowerCase() == "select") {
                    if ($(this).attr('errmsg') != "" && $(this).attr('errmsg') != undefined) {
                        err_msg += "<p>" + $(this).attr('errmsg') + "</p>";
                    }
                    $(this).addClass('InputBorderRed');
                }


            });

            if ($('#DV_TH_FATCA #tblDetailList tbody tr').hasClass('empty_table') || $('#DV_TH_FATCA #tblDetailList tbody tr').length == 0) {
                err_msg += "<p>Third holder's FATCA details are required..!</p>";
                isError = true;
            }
        }

    } catch (e) {
        fnException(e);
    }
    return err_msg;
}
const SHDOBChange = function () {
    try {
        let $SHDOB = $('#DV_SH #txtDOB');
        let SH_Age = GetAge($SHDOB.val());

        $('#DV_SH #txtPAN').prop('required', true);
        $('#DV_SH #ddlMaritalStatus option[value="01"]').prop('disabled', false);

        if (SH_Age < 18) {

            $('#DV_SH #ddlGuardianTitle').prop('required', true).prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtGuardianFName').prop('required', true).prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtGuardianMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtGuardianLName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #txtGuardianPAN').prop('required', true).prop('disabled', false).removeClass('DisabledControl');
            $('#DV_SH #ddlMaritalStatus option[value="01"]').prop('disabled', true);
            $('#DV_SH #txtPAN').prop('required', false);
            $('#DV_SH .GUARDIAN').show();
            $('#DV_SH #DV_PAN').hide();
            //$('#DV_SH .SPOUSE').hide();
        }
        else if ($('#DV_SH #ddlMaritalStatus').val() == '01') {
            $('#DV_SH #ddlGuardianTitle').prop('required', false);
            $('#DV_SH #txtGuardianFName').prop('required', false);
            $('#DV_SH #txtGuardianPAN').prop('required', false);

            $('#DV_SH #DV_PAN').show();
            $('#DV_SH .GUARDIAN').hide();
            $('#DV_SH .SPOUSE').show();
        }
        else {
            $('#DV_SH #ddlGuardianTitle').prop('required', false);
            $('#DV_SH #txtGuardianFName').prop('required', false);
            $('#DV_SH #txtGuardianPAN').prop('required', false);

            $('#DV_SH #DV_PAN').show();
            $('#DV_SH .GUARDIAN').hide();
            //$('#DV_SH .SPOUSE').hide();
        }

        if ($SHDOB.val() != "" && $SHDOB.val() != null)
            $SHDOB.parent().removeClass('InputBorderRed');
        else
            $SHDOB.parent().addClass('InputBorderRed');

    } catch (e) {
        fnException(e); return false;
    }
}
const THDOBChange = function () {
    try {

        let $THDOB = $('#DV_TH #txtDOB');
        let TH_Age = GetAge($THDOB.val());

        $('#DV_TH #txtPAN').prop('required', true);
        $('#DV_TH #ddlMaritalStatus option[value="01"]').prop('disabled', false);

        if (TH_Age < 18) {
            $('#DV_TH #ddlGuardianTitle').prop('required', true).prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtGuardianFName').prop('required', true).prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtGuardianMName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #txtGuardianLName').prop('disabled', false).removeClass('DisabledControl');
            $('#DV_TH #ddlMaritalStatus option[value="01"]').prop('disabled', true);
            $('#DV_TH #txtPAN').prop('required', false);
            $('#DV_TH .GUARDIAN').show();
            $('#DV_TH #DV_PAN').hide();
            //$('#DV_TH .SPOUSE').hide();
        }
        else if ($('#DV_TH #ddlMaritalStatus').val() == '01') {
            $('#DV_TH #ddlGuardianTitle').prop('required', false);
            $('#DV_TH #txtGuardianFName').prop('required', false);
            $('#DV_TH #txtGuardianPAN').prop('required', false);

            $('#DV_TH #DV_PAN').show();
            $('#DV_TH .GUARDIAN').hide();
            $('#DV_TH .SPOUSE').show();
        }
        else {
            $('#DV_TH #ddlGuardianTitle').prop('required', false);
            $('#DV_TH #txtGuardianFName').prop('required', false);
            $('#DV_TH #txtGuardianPAN').prop('required', false);

            $('#DV_TH #DV_PAN').show();
            $('#DV_TH .GUARDIAN').hide();
            //$('#DV_TH .SPOUSE').hide();
        }

        if ($THDOB.val() != "" && $THDOB.val() != null)
            $THDOB.parent().removeClass('InputBorderRed');
        else
            $THDOB.parent().addClass('InputBorderRed');
    } catch (e) {
        fnException(e); return false;
    }
}
const Reset_step5 = function () {
    if ($('#ddlHolderType').val() == '01') {

    }
    else if ($('#ddlHolderType').val() == '02') {
        BTP_OBJECT.mode = 'R';
        SHReset();
        BTP_OBJECT.mode = 'A';
    }
    else if ($('#ddlHolderType').val() == '03') {
        BTP_OBJECT.mode = 'R';
        THReset();
        BTP_OBJECT.mode = 'A';
    }
}
//second holder dob
$('#DV_SH #txtDOB').datetextentry({
    min_year: '1915',
    max_date: function () { return this.get_today(); },
    max_date_message: 'Date cannot be future date',
    on_blur: SHDOBChange
});
//third holder dob
$('#DV_TH #txtDOB').datetextentry({
    min_year: '1915',
    max_date: function () { return this.get_today(); },
    max_date_message: 'Date cannot be future date',
    on_blur: THDOBChange
});
//holder type dropdown
$('#ddlHolderType').change(function () {
    try {
        $('#btnCancel05').show();
        if (this.value == '01') {
            $('#btnCancel05').hide();
            $('#DV_SH').slideUp();
            $('#DV_SH_HEAD').slideUp();
            $('#DV_TH').slideUp();
            $('#DV_TH_HEAD').slideUp();
            $('#DV_FH').slideDown();
        }
        else if (this.value == '02') {
            if (BTP_OBJECT.FHDetailsSave) {
                BindProvSH();
                $('#DV_FH').slideUp();
                $('#DV_TH').slideUp();
                $('#DV_TH_HEAD').slideUp();
                $('#DV_SH').slideDown();
                if (!$.isEmptyObject($('#hdrSHFolioNo').text()))
                    $('#DV_SH_HEAD').slideDown();
            }
            else {
                $('#ddlHolderType').val('01').change();
                BtpMessagePopup('Please save first holder details', 'error');
            }
        }
        else if (this.value == '03') {
            if (BTP_OBJECT.SHDetailsSave) {
                BindProvTH();
                $('#DV_FH').slideUp();
                $('#DV_SH').slideUp();
                $('#DV_SH_HEAD').slideUp();
                $('#DV_TH').slideDown();
                if (!$.isEmptyObject($('#hdrTHFolioNo').text()))
                    $('#DV_TH_HEAD').slideDown();
            }
            else {
                $('#ddlHolderType').val('02').change();
                BtpMessagePopup('Please save second holder details', 'error');
            }
        }

    } catch (e) {
        fnException(e);
    }
});
//add new second holder 
$('#btnAddNewSH').click(function () {
    $('#DV_PROV_SH').hide();
    $('#DV_SH_SEARCH').hide();
    $('#DV_SH_CKYC_SEARCH').show();
    $('#DV_SH_DTLS').hide();
});
//add new third holder 
$('#btnAddNewTH').click(function () {
    $('#DV_PROV_TH').hide();
    $('#DV_TH_SEARCH').hide();
    $('#DV_TH_CKYC_SEARCH').show();
    $('#DV_TH_DTLS').hide();
});
//$('#DV_FH #ddlMaritalStatus').change(function ()
//{
//    if (this.value == '01')
//        $('#DV_FH .SPOUSE').slideDown();
//    else
//        $('#DV_FH .SPOUSE').slideUp();
//});

//$('#DV_SH #ddlMaritalStatus').change(function ()
//{
//    if (this.value == '01')
//        $('#DV_SH .SPOUSE').show();
//    else
//        $('#DV_SH .SPOUSE').hide();
//});

//$('#DV_TH #ddlMaritalStatus').change(function ()
//{
//    if (this.value == '01')
//        $('#DV_TH .SPOUSE').show();
//    else
//        $('#DV_TH .SPOUSE').hide();
//});
$('#DV_SH #txtPAN')
    .keyup(function () {
        $(this).next().text('').removeClass('successBox').hide();

        if (!$.isEmptyObject(this.value) && !IsValidPAN(this.value))
            $(this).next().text('PAN is not valid').show();
    })
    .change(function () {
        if (!$.isEmptyObject(this.value) && IsValidPAN(this.value) && BTP_OBJECT.SH_DATA_SOURCE == 'CKYC') {
            let objReqBO = {};
            objReqBO.Source_Type = "CPTP_UNI";
            objReqBO.Holder_Type = '02';
            objReqBO.User_Name = $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim();
            objReqBO.Remarks = "CPTP_UNI";
            objReqBO.PAN_Holder_Name = $('#DV_SH #txtFName').val().trim() + ' ' + $('#DV_SH #txtMName').val().trim() + ' ' + $('#DV_SH #txtLName').val().trim();
            objReqBO.PAN_Holder_DOB = $('#DV_SH #txtDOB').val().trim();
            objReqBO.PAN_No = $(this).val();


            ExtendedAjaxCall('PAN_Verification', objReqBO, 'POST', function (result) {
                if (!$.isEmptyObject(result) && result.PAN_DOB_Match_Status == '1') {
                    //$('#DV_SH #txtPAN').next().addClass('successBox').text('PAN verified successfully.').fadeIn('slow').delay(5000).hide(1);
                }
                else {
                    $('#Model_SH_PAN_VERIFICATION_Msg').modal('show');
                }

                $('#preloader').hide();

            }, null, true, true, false);
        }
    });
$('#DV_TH #txtPAN')
    .keyup(function () {
        $(this).next().text('').removeClass('successBox').hide();
        if (!$.isEmptyObject(this.value) && !IsValidPAN(this.value))
            $(this).next().text('PAN is not valid').show();
    })
    .change(function () {
        if (!$.isEmptyObject(this.value) && IsValidPAN(this.value) && BTP_OBJECT.SH_DATA_SOURCE == 'CKYC') {
            let objReqBO = {};
            objReqBO.Source_Type = "CPTP_UNI";
            objReqBO.Holder_Type = '03';
            objReqBO.User_Name = $('#DV_TH #txtFName').val().trim() + ' ' + $('#DV_TH #txtMName').val().trim() + ' ' + $('#DV_TH #txtLName').val().trim();
            objReqBO.Remarks = "CPTP_UNI";
            objReqBO.PAN_Holder_Name = $('#DV_TH #txtFName').val().trim() + ' ' + $('#DV_TH #txtMName').val().trim() + ' ' + $('#DV_TH #txtLName').val().trim();
            objReqBO.PAN_Holder_DOB = $('#DV_TH #txtDOB').val().trim();
            objReqBO.PAN_No = $(this).val();


            ExtendedAjaxCall('PAN_Verification', objReqBO, 'POST', function (result) {
                if (!$.isEmptyObject(result) && result.PAN_DOB_Match_Status == '1') {
                    //$('#DV_SH #txtPAN').next().addClass('successBox').text('PAN verified successfully.').fadeIn('slow').delay(5000).hide(1);
                }
                else {
                    $('#Model_TH_PAN_VERIFICATION_Msg').modal('show');
                }

                $('#preloader').hide();

            }, null, true, true, false);
        }
    });
//FH MAIL addr same as FH PER
$('#chkIsFHAddrSameAsPermanent').change(function () {
    if ($(this).prop('checked')) {
        $('#DV_FH_M_ADDR #txtAdd1').val($('#DV_FH_P_ADDR #txtAdd1').val());
        $('#DV_FH_M_ADDR #txtAdd2').val($('#DV_FH_P_ADDR #txtAdd2').val());
        $('#DV_FH_M_ADDR #txtAdd3').val($('#DV_FH_P_ADDR #txtAdd3').val());
        $('#DV_FH_M_ADDR #txtCity').val($('#DV_FH_P_ADDR #txtCity').val());
        $('#DV_FH_M_ADDR #ddlCountry').val($('#DV_FH_P_ADDR #ddlCountry').val()).change();

        if ($('#DV_FH_M_ADDR #ddlCountry').val() == 'IN') {
            $('#DV_FH_M_ADDR #txtPin').val($('#DV_FH_P_ADDR #txtPin').val()).keyup();
        }
        else {
            $('#DV_FH_M_ADDR #txtState').val($('#DV_FH_P_ADDR #txtState').val());
            $('#DV_FH_M_ADDR #txtDistrict').val($('#DV_FH_P_ADDR #txtDistrict').val());
            $('#DV_FH_M_ADDR #txtPin').val($('#DV_FH_P_ADDR #txtPin').val());
        }
    }
    else {
        if (BTP_OBJECT.mode == 'A') {
            if (confirm('Are you sure you want to clear Mailing Address..?')) {
                $('#DV_FH_M_ADDR #txtAdd1').val('');
                $('#DV_FH_M_ADDR #txtAdd2').val('');
                $('#DV_FH_M_ADDR #txtAdd3').val('');
                $('#DV_FH_M_ADDR #txtCity').val('');
                $('#DV_FH_M_ADDR #txtState').val('');
                $('#DV_FH_M_ADDR #txtDistrict').val('');
                $('#DV_FH_M_ADDR #txtPin').val('');

                $('#DV_FH_M_ADDR #ddlCountry').val('IN').change();
            }
            else
                $(this).prop('checked', true);
        }
        else {
            $('#DV_FH_M_ADDR #txtAdd1').val('');
            $('#DV_FH_M_ADDR #txtAdd2').val('');
            $('#DV_FH_M_ADDR #txtAdd3').val('');
            $('#DV_FH_M_ADDR #txtCity').val('');
            $('#DV_FH_M_ADDR #txtState').val('');
            $('#DV_FH_M_ADDR #txtDistrict').val('');
            $('#DV_FH_M_ADDR #txtPin').val('');

            $('#DV_FH_M_ADDR #ddlCountry').val('IN').change();
        }
    }
});
//SH MAIL addr same as SH PER
$('#chkIsSHAddrSameAsPermanent').change(function () {
    if ($(this).prop('checked')) {
        $('#DV_SH_M_ADDR #txtAdd1').val($('#DV_SH_P_ADDR #txtAdd1').val());
        $('#DV_SH_M_ADDR #txtAdd2').val($('#DV_SH_P_ADDR #txtAdd2').val());
        $('#DV_SH_M_ADDR #txtAdd3').val($('#DV_SH_P_ADDR #txtAdd3').val());
        $('#DV_SH_M_ADDR #txtCity').val($('#DV_SH_P_ADDR #txtCity').val());
        $('#DV_SH_M_ADDR #ddlCountry').val($('#DV_SH_P_ADDR #ddlCountry').val()).change();

        if ($('#DV_SH_M_ADDR #ddlCountry').val() == 'IN')
            $('#DV_SH_M_ADDR #txtPin').val($('#DV_SH_P_ADDR #txtPin').val()).keyup();
        else {
            $('#DV_SH_M_ADDR #txtState').val($('#DV_SH_P_ADDR #txtState').val());
            $('#DV_SH_M_ADDR #txtDistrict').val($('#DV_SH_P_ADDR #txtDistrict').val());
            $('#DV_SH_M_ADDR #txtPin').val($('#DV_SH_P_ADDR #txtPin').val());
        }
    }
    else {
        if (BTP_OBJECT.mode == 'A') {
            if (confirm('Are you sure you want to clear Mailing Address..?')) {
                $('#DV_SH_M_ADDR #txtAdd1').val('');
                $('#DV_SH_M_ADDR #txtAdd2').val('');
                $('#DV_SH_M_ADDR #txtAdd3').val('');
                $('#DV_SH_M_ADDR #txtCity').val('');
                $('#DV_SH_M_ADDR #txtState').val('');
                $('#DV_SH_M_ADDR #txtDistrict').val('');
                $('#DV_SH_M_ADDR #txtPin').val('');

                $('#DV_SH_M_ADDR #ddlCountry').val('IN').change();
            }
            else
                $(this).prop('checked', true);
        }
        else {
            $('#DV_SH_M_ADDR #txtAdd1').val('');
            $('#DV_SH_M_ADDR #txtAdd2').val('');
            $('#DV_SH_M_ADDR #txtAdd3').val('');
            $('#DV_SH_M_ADDR #txtCity').val('');
            $('#DV_SH_M_ADDR #txtState').val('');
            $('#DV_SH_M_ADDR #txtDistrict').val('');
            $('#DV_SH_M_ADDR #txtPin').val('');

            $('#DV_SH_M_ADDR #ddlCountry').val('IN').change();
        }
    }
});
//TH MAIL addr same as TH PER
$('#chkIsTHAddrSameAsPermanent').change(function () {
    if ($(this).prop('checked')) {
        $('#DV_TH_M_ADDR #txtAdd1').val($('#DV_TH_P_ADDR #txtAdd1').val());
        $('#DV_TH_M_ADDR #txtAdd2').val($('#DV_TH_P_ADDR #txtAdd2').val());
        $('#DV_TH_M_ADDR #txtAdd3').val($('#DV_TH_P_ADDR #txtAdd3').val());
        $('#DV_TH_M_ADDR #txtCity').val($('#DV_TH_P_ADDR #txtCity').val());
        $('#DV_TH_M_ADDR #ddlCountry').val($('#DV_TH_P_ADDR #ddlCountry').val()).change();

        if ($('#DV_TH_M_ADDR #ddlCountry').val() == 'IN')
            $('#DV_TH_M_ADDR #txtPin').val($('#DV_TH_P_ADDR #txtPin').val()).keyup();
        else {
            $('#DV_TH_M_ADDR #txtState').val($('#DV_TH_P_ADDR #txtState').val());
            $('#DV_TH_M_ADDR #txtDistrict').val($('#DV_TH_P_ADDR #txtDistrict').val());
            $('#DV_TH_M_ADDR #txtPin').val($('#DV_TH_P_ADDR #txtPin').val());
        }
    }
    else {
        if (BTP_OBJECT.mode == 'A') {
            if (confirm('Are you sure you want to clear Mailing Address..?')) {
                $('#DV_TH_M_ADDR #txtAdd1').val('');
                $('#DV_TH_M_ADDR #txtAdd2').val('');
                $('#DV_TH_M_ADDR #txtAdd3').val('');
                $('#DV_TH_M_ADDR #txtCity').val('');
                $('#DV_TH_M_ADDR #txtState').val('');
                $('#DV_TH_M_ADDR #txtDistrict').val('');
                $('#DV_TH_M_ADDR #txtPin').val('');

                $('#DV_TH_M_ADDR #ddlCountry').val('IN').change();
            }
            else
                $(this).prop('checked', true);
        }
        else {
            $('#DV_TH_M_ADDR #txtAdd1').val('');
            $('#DV_TH_M_ADDR #txtAdd2').val('');
            $('#DV_TH_M_ADDR #txtAdd3').val('');
            $('#DV_TH_M_ADDR #txtCity').val('');
            $('#DV_TH_M_ADDR #txtState').val('');
            $('#DV_TH_M_ADDR #txtDistrict').val('');
            $('#DV_TH_M_ADDR #txtPin').val('');

            $('#DV_TH_M_ADDR #ddlCountry').val('IN').change();
        }
    }
});
//SH PER/MAIL addr same as FH PER/MAIL addr
$('#chkIsSHAddrSameAsFH').change(function () {
    if ($(this).prop('checked')) {
        $('#DV_SH_P_ADDR #txtAdd1').val($('#DV_FH_P_ADDR #txtAdd1').val());
        $('#DV_SH_P_ADDR #txtAdd2').val($('#DV_FH_P_ADDR #txtAdd2').val());
        $('#DV_SH_P_ADDR #txtAdd3').val($('#DV_FH_P_ADDR #txtAdd3').val());
        $('#DV_SH_P_ADDR #txtCity').val($('#DV_FH_P_ADDR #txtCity').val());
        $('#DV_SH_P_ADDR #ddlCountry').val($('#DV_FH_P_ADDR #ddlCountry').val()).change();
        if ($('#DV_SH_P_ADDR #ddlCountry').val() == 'IN')
            $('#DV_SH_P_ADDR #txtPin').val($('#DV_FH_P_ADDR #txtPin').val()).keyup();
        else {
            $('#DV_SH_P_ADDR #txtState').val($('#DV_FH_P_ADDR #txtState').val());
            $('#DV_SH_P_ADDR #txtDistrict').val($('#DV_FH_P_ADDR #txtDistrict').val());
            $('#DV_SH_P_ADDR #txtPin').val($('#DV_FH_P_ADDR #txtPin').val());
        }


        $('#DV_SH_M_ADDR #txtAdd1').val($('#DV_FH_M_ADDR #txtAdd1').val());
        $('#DV_SH_M_ADDR #txtAdd2').val($('#DV_FH_M_ADDR #txtAdd2').val());
        $('#DV_SH_M_ADDR #txtAdd3').val($('#DV_FH_M_ADDR #txtAdd3').val());
        $('#DV_SH_M_ADDR #txtCity').val($('#DV_FH_M_ADDR #txtCity').val());
        $('#DV_SH_M_ADDR #ddlCountry').val($('#DV_FH_M_ADDR #ddlCountry').val()).change();
        if ($('#DV_SH_M_ADDR #ddlCountry').val() == 'IN') {
            $('#DV_SH_M_ADDR #txtPin').val($('#DV_FH_M_ADDR #txtPin').val()).keyup();
        }
        else {
            $('#DV_SH_M_ADDR #txtState').val($('#DV_FH_M_ADDR #txtState').val());
            $('#DV_SH_M_ADDR #txtDistrict').val($('#DV_FH_M_ADDR #txtDistrict').val());
            $('#DV_SH_M_ADDR #txtPin').val($('#DV_FH_M_ADDR #txtPin').val());
        }

    }
    else {
        if (BTP_OBJECT.mode == 'A') {
            if (confirm('Are you sure you want to clear address..?')) {
                $('#DV_SH_P_ADDR #txtAdd1').val('');
                $('#DV_SH_P_ADDR #txtAdd2').val('');
                $('#DV_SH_P_ADDR #txtAdd3').val('');
                $('#DV_SH_P_ADDR #txtCity').val('');
                $('#DV_SH_P_ADDR #txtState').val('');
                $('#DV_SH_P_ADDR #txtDistrict').val('');
                $('#DV_SH_P_ADDR #txtPin').val('');
                $('#DV_SH_P_ADDR #ddlCountry').val('IN').change();

                $('#DV_SH_M_ADDR #txtAdd1').val('');
                $('#DV_SH_M_ADDR #txtAdd2').val('');
                $('#DV_SH_M_ADDR #txtAdd3').val('');
                $('#DV_SH_M_ADDR #txtCity').val('');
                $('#DV_SH_M_ADDR #txtState').val('');
                $('#DV_SH_M_ADDR #txtDistrict').val('');
                $('#DV_SH_M_ADDR #txtPin').val('');
                $('#DV_SH_M_ADDR #ddlCountry').val('IN').change();
            }
            else
                $(this).prop('checked', true);
        }
        else {
            $('#DV_SH_P_ADDR #txtAdd1').val('');
            $('#DV_SH_P_ADDR #txtAdd2').val('');
            $('#DV_SH_P_ADDR #txtAdd3').val('');
            $('#DV_SH_P_ADDR #txtCity').val('');
            $('#DV_SH_P_ADDR #txtState').val('');
            $('#DV_SH_P_ADDR #txtDistrict').val('');
            $('#DV_SH_P_ADDR #txtPin').val('');
            $('#DV_SH_P_ADDR #ddlCountry').val('IN').change();

            $('#DV_SH_M_ADDR #txtAdd1').val('');
            $('#DV_SH_M_ADDR #txtAdd2').val('');
            $('#DV_SH_M_ADDR #txtAdd3').val('');
            $('#DV_SH_M_ADDR #txtCity').val('');
            $('#DV_SH_M_ADDR #txtState').val('');
            $('#DV_SH_M_ADDR #txtDistrict').val('');
            $('#DV_SH_M_ADDR #txtPin').val('');
            $('#DV_SH_M_ADDR #ddlCountry').val('IN').change();
        }
    }
});
//TH PER/MAIL addr same as FH PER/MAIL addr
$('#chkIsTHAddrSameAsFH').change(function () {
    if ($(this).prop('checked')) {
        $('#DV_TH_P_ADDR #txtAdd1').val($('#DV_FH_P_ADDR #txtAdd1').val());
        $('#DV_TH_P_ADDR #txtAdd2').val($('#DV_FH_P_ADDR #txtAdd2').val());
        $('#DV_TH_P_ADDR #txtAdd3').val($('#DV_FH_P_ADDR #txtAdd3').val());
        $('#DV_TH_P_ADDR #txtCity').val($('#DV_FH_P_ADDR #txtCity').val());
        $('#DV_TH_P_ADDR #ddlCountry').val($('#DV_FH_P_ADDR #ddlCountry').val()).change();
        if ($('#DV_TH_P_ADDR #ddlCountry').val() == 'IN')
            $('#DV_TH_P_ADDR #txtPin').val($('#DV_FH_P_ADDR #txtPin').val()).keyup();
        else {
            $('#DV_TH_P_ADDR #txtState').val($('#DV_FH_P_ADDR #txtState').val());
            $('#DV_TH_P_ADDR #txtDistrict').val($('#DV_FH_P_ADDR #txtDistrict').val());
            $('#DV_TH_P_ADDR #txtPin').val($('#DV_FH_P_ADDR #txtPin').val());
        }


        $('#DV_TH_M_ADDR #txtAdd1').val($('#DV_FH_M_ADDR #txtAdd1').val());
        $('#DV_TH_M_ADDR #txtAdd2').val($('#DV_FH_M_ADDR #txtAdd2').val());
        $('#DV_TH_M_ADDR #txtAdd3').val($('#DV_FH_M_ADDR #txtAdd3').val());
        $('#DV_TH_M_ADDR #txtCity').val($('#DV_FH_M_ADDR #txtCity').val());
        $('#DV_TH_M_ADDR #ddlCountry').val($('#DV_FH_M_ADDR #ddlCountry').val()).change();
        if ($('#DV_TH_M_ADDR #ddlCountry').val() == 'IN')
            $('#DV_TH_M_ADDR #txtPin').val($('#DV_FH_M_ADDR #txtPin').val()).keyup();
        else {
            $('#DV_TH_M_ADDR #txtState').val($('#DV_FH_M_ADDR #txtState').val());
            $('#DV_TH_M_ADDR #txtDistrict').val($('#DV_FH_M_ADDR #txtDistrict').val());
            $('#DV_TH_M_ADDR #txtPin').val($('#DV_FH_M_ADDR #txtPin').val());
        }

    }
    else {
        if (BTP_OBJECT.mode == 'A') {
            if (confirm('Are you sure you want to clear address..?')) {
                $('#DV_TH_P_ADDR #txtAdd1').val('');
                $('#DV_TH_P_ADDR #txtAdd2').val('');
                $('#DV_TH_P_ADDR #txtAdd3').val('');
                $('#DV_TH_P_ADDR #txtCity').val('');
                $('#DV_TH_P_ADDR #txtState').val('');
                $('#DV_TH_P_ADDR #txtDistrict').val('');
                $('#DV_TH_P_ADDR #txtPin').val('');
                $('#DV_TH_P_ADDR #ddlCountry').val('IN').change();
                $('#DV_TH_M_ADDR #txtAdd1').val('');
                $('#DV_TH_M_ADDR #txtAdd2').val('');
                $('#DV_TH_M_ADDR #txtAdd3').val('');
                $('#DV_TH_M_ADDR #txtCity').val('');
                $('#DV_TH_M_ADDR #txtState').val('');
                $('#DV_TH_M_ADDR #txtDistrict').val('');
                $('#DV_TH_M_ADDR #txtPin').val('');
                $('#DV_TH_M_ADDR #ddlCountry').val('IN').change();
            }
            else
                $(this).prop('checked', true);
        }
        else {
            $('#DV_TH_P_ADDR #txtAdd1').val('');
            $('#DV_TH_P_ADDR #txtAdd2').val('');
            $('#DV_TH_P_ADDR #txtAdd3').val('');
            $('#DV_TH_P_ADDR #txtCity').val('');
            $('#DV_TH_P_ADDR #txtState').val('');
            $('#DV_TH_P_ADDR #txtDistrict').val('');
            $('#DV_TH_P_ADDR #txtPin').val('');
            $('#DV_TH_P_ADDR #ddlCountry').val('IN').change();
            $('#DV_TH_M_ADDR #txtAdd1').val('');
            $('#DV_TH_M_ADDR #txtAdd2').val('');
            $('#DV_TH_M_ADDR #txtAdd3').val('');
            $('#DV_TH_M_ADDR #txtCity').val('');
            $('#DV_TH_M_ADDR #txtState').val('');
            $('#DV_TH_M_ADDR #txtDistrict').val('');
            $('#DV_TH_M_ADDR #txtPin').val('');
            $('#DV_TH_M_ADDR #ddlCountry').val('IN').change();
        }
    }
});
$('#chkIdOverSeasAddress').change(function () {
    if ($(this).prop('checked'))
        $('#DV_FH_O_ADDR').slideDown();
    else
        $('#DV_FH_O_ADDR').slideUp();
});
//Investor other than india selection
$('#DV_FH_P_ADDR #ddlCountry').change(function () {
    if ($(this).val() == 'IN') {
        $('#DV_FH_P_ADDR #txtState').prop('disabled', true);
        $('#DV_FH_P_ADDR #txtDistrict').prop('disabled', true);
    }
    else {
        $('#DV_FH_P_ADDR #txtState').prop('disabled', false);
        $('#DV_FH_P_ADDR #txtDistrict').prop('disabled', false);
    }
});
//Investor same as above other than india selection
$('#DV_FH_M_ADDR #ddlCountry').change(function () {
    if ($(this).val() == 'IN') {
        $('#DV_FH_P_ADDR #txtState').prop('disabled', true);
        $('#DV_FH_P_ADDR #txtDistrict').prop('disabled', true);
    }
    else {
        $('#DV_FH_P_ADDR #txtState').prop('disabled', false);
        $('#DV_FH_P_ADDR #txtDistrict').prop('disabled', false);
    }
});
//Nominee other than india selection
$('#DV_NOM #ddlNomPermanent_Country').change(function () {
    if (ApplicationType == 'F') {
        if ($('#ddlNomPermanent_Country').val() == 'IN') {
            $('#ddlNomPermanent_State,#ddlNomPermanent_District,#ddlNomPermanent_Pin').prop('required', true).show();
            $('#State,#District,#txtNomPin').prop('required', false).hide();
        }
        else {
            $('#ddlNomPermanent_State,#ddlNomPermanent_District,#ddlNomPermanent_Pin').prop('required', false).hide();
            $('#State,#District,#txtNomPin').prop('required', true).show();
        }
    }
    else if ($('#chkSHEdit').prop('checked')) {
        if ($('#ddlNomPermanent_Country').val() == 'IN') {
            $('#ddlNomPermanent_State,#ddlNomPermanent_District,#ddlNomPermanent_Pin').prop('required', true).show();
            $('#State,#District,#txtNomPin').prop('required', false).hide();
        }
        else {
            $('#ddlNomPermanent_State,#ddlNomPermanent_District,#ddlNomPermanent_Pin').prop('required', false).hide();
            $('#State,#District,#txtNomPin').prop('required', true).show();
        }
    }
    else if (ApplicationType == 'A') {
        if ($('#ddlNomPermanent_Country').val() == 'IN') {
            $('#ddlNomPermanent_State,#ddlNomPermanent_District,#ddlNomPermanent_Pin').show();
            $('#State,#District,#txtNomPin').hide();
        }
        else {
            $('#ddlNomPermanent_State,#ddlNomPermanent_District,#ddlNomPermanent_Pin').hide();
            $('#State,#District,#txtNomPin').show();
        }
    }
});
//Second Holder Details other than india selection
$('#DV_SH_P_ADDR #ddlCountry').change(function () {
    if ($(this).val() == 'IN') {
        $('#DV_SH_P_ADDR #txtState').prop('disabled', true);
        $('#DV_SH_P_ADDR #txtDistrict').prop('disabled', true);
    }
    else {
        $('#DV_SH_P_ADDR #txtState').prop('disabled', false);
        $('#DV_SH_P_ADDR #txtDistrict').prop('disabled', false);
    }
});
//Second Holder same as Details other than india selection
$('#DV_SH_M_ADDR #ddlCountry').change(function () {
    if ($(this).val() == 'IN') {
        $('#DV_SH_M_ADDR #txtState').prop('disabled', true);
        $('#DV_SH_M_ADDR #txtDistrict').prop('disabled', true);
    }
    else {
        $('#DV_SH_M_ADDR #txtState').prop('disabled', false);
        $('#DV_SH_M_ADDR #txtDistrict').prop('disabled', false);
    }
});
//Third Holder Details other than india selection
$('#DV_TH_P_ADDR #ddlCountry').change(function () {
    if ($(this).val() == 'IN') {
        $('#DV_TH_P_ADDR #txtState').prop('disabled', true);
        $('#DV_TH_P_ADDR #txtDistrict').prop('disabled', true);
    }
    else {
        $('#DV_TH_P_ADDR #txtState').prop('disabled', false);
        $('#DV_TH_P_ADDR #txtDistrict').prop('disabled', false);
    }
});
//Third Holder same  as Details other than india selection
$('#DV_TH_M_ADDR #ddlCountry').change(function () {
    if ($(this).val() == 'IN') {
        $('#DV_TH_M_ADDR #txtState').prop('disabled', true);
        $('#DV_TH_M_ADDR #txtDistrict').prop('disabled', true);
    }
    else {
        $('#DV_TH_M_ADDR #txtState').prop('disabled', false);
        $('#DV_TH_M_ADDR #txtDistrict').prop('disabled', false);
    }
});
$('#DV_FH_P_ADDR #txtPin').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value)) {
        if (this.value.length >= 6 && $('#DV_FH_P_ADDR #ddlCountry').val() == 'IN') {
            ExtendedAjaxCall('DataEntry/SearchPincode/' + this.value, null, 'GET', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.length > 0) {
                        $('#DV_FH_P_ADDR #txtState').val(result[0].State).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_FH_P_ADDR #txtDistrict').val(result[0].District).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_FH_P_ADDR #txtCity').val(result[0].District);
                    }
                    else
                        $('#DV_FH_P_ADDR #txtPin').next().text('Please enter valid Pincode').show();
                } catch (e) {
                    fnException(e);
                }
                $('#preloader').hide();

            }, null, true, false, false, ErrorFunction);
        }
        else
            $(this).next().text('Please enter valid Pincode').show();
    }
    else if ($('#DV_FH_P_ADDR #ddlCountry').val() == 'IN') {
        $('#DV_FH_P_ADDR #txtState').val('');
        $('#DV_FH_P_ADDR #txtDistrict').val('');
    }
});
$('#DV_FH_M_ADDR #txtPin').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value)) {
        if (this.value.length >= 6 && $('#DV_FH_M_ADDR #ddlCountry').val() == 'IN') {
            ExtendedAjaxCall('DataEntry/SearchPincode/' + this.value, null, 'GET', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.length > 0) {
                        $('#DV_FH_M_ADDR #txtState').val(result[0].State).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_FH_M_ADDR #txtDistrict').val(result[0].District).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_FH_M_ADDR #txtCity').val(result[0].District);
                    }
                    else {
                        $('#DV_FH_M_ADDR #txtPin').next().text('Please enter valid Pincode').show();
                    }
                } catch (e) {
                    fnException(e);
                }
                $('#preloader').hide();

            }, null, true, false, false, ErrorFunction);
        }
        else {
            $(this).next().text('Please enter valid Pincode').show();
        }
    }
    else if ($('#DV_FH_M_ADDR #ddlCountry').val() == 'IN') {
        $('#DV_FH_M_ADDR #txtState').val('');
        $('#DV_FH_M_ADDR #txtDistrict').val('');
    }
});
$('#DV_SH_P_ADDR #txtPin').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value)) {
        if (this.value.length >= 6 && $('#DV_SH_P_ADDR #ddlCountry').val() == 'IN') {
            ExtendedAjaxCall('DataEntry/SearchPincode/' + this.value, null, 'GET', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.length > 0) {
                        $('#DV_SH_P_ADDR #txtState').val(result[0].State).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_SH_P_ADDR #txtDistrict').val(result[0].District).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_SH_P_ADDR #txtCity').val(result[0].District).removeClass('InputBorderRed');
                    }
                    else {
                        $('#DV_SH_P_ADDR #txtPin').next().text('Please enter valid Pincode').show();
                    }
                } catch (e) {
                    fnException(e);
                }
                $('#preloader').hide();

            }, null, true, false, false, ErrorFunction);
        }
        else {
            $(this).next().text('Please enter valid Pincode').show();
        }
    }
    else if ($('#DV_SH_P_ADDR #ddlCountry').val() == 'IN') {
        $('#DV_SH_P_ADDR #txtState').val('');
        $('#DV_SH_P_ADDR #txtDistrict').val('');
    }
});
$('#DV_SH_M_ADDR #txtPin').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value)) {
        if (this.value.length >= 6 && $('#DV_SH_M_ADDR #ddlCountry').val() == 'IN') {
            ExtendedAjaxCall('DataEntry/SearchPincode/' + this.value, null, 'GET', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.length > 0) {
                        $('#DV_SH_M_ADDR #txtState').val(result[0].State).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_SH_M_ADDR #txtDistrict').val(result[0].District).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_SH_M_ADDR #txtCity').val(result[0].District).removeClass('InputBorderRed');
                    }
                    else {
                        $('#DV_SH_M_ADDR #txtPin').next().text('Please enter valid Pincode').show();
                    }
                } catch (e) {
                    fnException(e);
                }
                $('#preloader').hide();

            }, null, true, false, false, ErrorFunction);
        }
        else {
            $(this).next().text('Please enter valid Pincode').show();
        }
    }
    else if ($('#DV_SH_M_ADDR #ddlCountry').val() == 'IN') {
        $('#DV_SH_M_ADDR #txtState').val('');
        $('#DV_SH_M_ADDR #txtDistrict').val('');
    }
});
$('#DV_TH_P_ADDR #txtPin').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value)) {
        if (this.value.length >= 6 && $('#DV_TH_P_ADDR #ddlCountry').val() == 'IN') {
            ExtendedAjaxCall('DataEntry/SearchPincode/' + this.value, null, 'GET', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.length > 0) {
                        $('#DV_TH_P_ADDR #txtState').val(result[0].State).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_TH_P_ADDR #txtDistrict').val(result[0].District).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_TH_P_ADDR #txtCity').val(result[0].District).removeClass('InputBorderRed');
                    }
                    else {
                        $('#DV_TH_P_ADDR #txtPin').next().text('Please enter valid Pincode').show();
                    }
                } catch (e) {
                    fnException(e);
                }
                $('#preloader').hide();

            }, null, true, false, false, ErrorFunction);
        }
        else {
            $(this).next().text('Please enter valid Pincode').show();
        }
    }
    else if ($('#DV_TH_P_ADDR #ddlCountry').val() == 'IN') {
        $('#DV_TH_P_ADDR #txtState').val('');
        $('#DV_TH_P_ADDR #txtDistrict').val('');
    }
});
$('#DV_TH_M_ADDR #txtPin').keyup(function () {
    $(this).next().text('').hide();

    if (!$.isEmptyObject(this.value)) {
        if (!$.isEmptyObject(this.value) && this.value.length >= 6 && $('#DV_TH_M_ADDR #ddlCountry').val() == 'IN') {
            ExtendedAjaxCall('DataEntry/SearchPincode/' + this.value, null, 'GET', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result.length > 0) {
                        $('#DV_TH_M_ADDR #txtState').val(result[0].State).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_TH_M_ADDR #txtDistrict').val(result[0].District).prop('disabled', true).addClass('DisabledControl').removeClass('InputBorderRed');
                        $('#DV_TH_M_ADDR #txtCity').val(result[0].District).removeClass('InputBorderRed');
                    }
                    else {
                        $('#DV_TH_M_ADDR #txtPin').next().text('Please enter valid Pincode').show();
                    }
                } catch (e) {
                    fnException(e);
                }
                $('#preloader').hide();

            }, null, true, false, false, ErrorFunction);
        }
        else {
            $(this).next().text('Please enter valid Pincode').show();
        }
    }
    else if ($('#DV_TH_M_ADDR #ddlCountry').val() == 'IN') {
        $('#DV_TH_M_ADDR #txtState').val('');
        $('#DV_TH_M_ADDR #txtDistrict').val('');
    }
});
$('#btn_COMM_YES').click(function () {
    if (SaveStep5Details()) {
        if ($('#chkNomApplicable').prop('checked')) {
            if (stepper.maxTabIndex == stepper.activeTabIndex)
                stepper.maxTabIndex += 1

            $('#IdBtnTabSwit06').click();
            $('#IdBtnTabSwit05').css('border-color', '#047904');
        }
        else {
            if (stepper.maxTabIndex == stepper.activeTabIndex)
                stepper.maxTabIndex += 2

            $('#IdBtnTabSwit07').click();
            $('#IdBtnTabSwit05').css('border-color', '#047904');
        }
    }
});
//step5 clear
$('#btnCancel05').bind('click', Reset_step5);
$('#btn_SH_PAN_Match_No').click(function () {
    Reset_step5();
});
$('#btn_TH_PAN_Match_No').click(function () {
    Reset_step5();
});

//avinash added Occupation/sub-occupation changes
$('#ddlCustSegType').change(function () {
    var CustSegType_Code = $("#ddlCustSegType").val();
    if (CustSegType_Code > 0) {
        $("#Occ_Cus_SegSubtype_Div").show();
    }
    else {
        $("#Occ_Cus_SegSubtype_Div").hide();
    }
    //BindDDLExtendedAjaxCall('#ddlCustSegSubType', 'DataEntry/Get_ddl_Occ_CustSegSubTypeList?CustSegType_Code=' + CustSegType_Code, null, 'POST', null, null, true, false, false, ErrorFunction);

    ExtendedAjaxCall('DataEntry/Get_ddl_Occ_CustSegSubTypeList', CustSegType_Code, 'POST', function (result) {
        try {
            if (!$.isEmptyObject(result) && result.length > 0) {
                $("#Occ_Cus_SegSubtype_Div").show();
                $('#ddlCustSegSubType').empty();
                $('#ddlCustSegSubType').append("<option value='select' data-row='0'>Select</option>");
                $.each(result, function (i, row) {
                    $('#ddlCustSegSubType').append("<option value='" + row['Code'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Desc'] + "</option>");
                });
            }
            else {
                $("#Occ_Cus_SegSubtype_Div").hide();
            }
        } catch (e) {
            fnException(e);
        }
    }, null, true, false, false, ErrorFunction);
});

$('#DV_SH #ddlCustSegType').change(function () {
    var CustSegType_Code = $("#DV_SH #ddlCustSegType").val();
    if (CustSegType_Code > 0) {
        $("#DV_SH #Occ_Cus_SegSubtype_Div").show();
    }
    else {
        $("#DV_SH #Occ_Cus_SegSubtype_Div").hide();
    }
    ExtendedAjaxCall('DataEntry/Get_ddl_Occ_CustSegSubTypeList', CustSegType_Code, 'POST', function (result) {
        try {
            if (!$.isEmptyObject(result) && result.length > 0) {
                $("#DV_SH #Occ_Cus_SegSubtype_Div").show();
                $('#DV_SH #ddlCustSegSubType').empty();
                $('#DV_SH #ddlCustSegSubType').append("<option value='select' data-row='0'>Select</option>");
                $.each(result, function (i, row) {
                    $('#DV_SH #ddlCustSegSubType').append("<option value='" + row['Code'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Desc'] + "</option>");
                });
            }
            else {
                $("#DV_SH #Occ_Cus_SegSubtype_Div").hide();
            }
        } catch (e) {
            fnException(e);
        }
    }, null, true, false, false, ErrorFunction);
});

$('#DV_TH #ddlCustSegType').change(function () {
    var CustSegType_Code = $("#DV_TH #ddlCustSegType").val();
    if (CustSegType_Code > 0) {
        $("#DV_TH #Occ_Cus_SegSubtype_Div").show();
    }
    else {
        $("#DV_TH #Occ_Cus_SegSubtype_Div").hide();
    }
    ExtendedAjaxCall('DataEntry/Get_ddl_Occ_CustSegSubTypeList', CustSegType_Code, 'POST', function (result) {
        try {
            if (!$.isEmptyObject(result) && result.length > 0) {
                $("#DV_TH #Occ_Cus_SegSubtype_Div").show();
                $('#DV_TH #ddlCustSegSubType').empty();
                $('#DV_TH #ddlCustSegSubType').append("<option value='select' data-row='0'>Select</option>");
                $.each(result, function (i, row) {
                    $('#DV_TH #ddlCustSegSubType').append("<option value='" + row['Code'] + "' data-row='" + JSON.stringify(row) + "'>" + row['Desc'] + "</option>");
                });
            }
            else {
                $("#DV_TH #Occ_Cus_SegSubtype_Div").hide();
            }
        } catch (e) {
            fnException(e);
        }
    }, null, true, false, false, ErrorFunction);
});