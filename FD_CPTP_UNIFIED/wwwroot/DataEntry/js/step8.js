$('#IdBtnTabSwit08').click(function ()
{
    GET_APPL_DTLS($('#lblApplicationNumber').text());
});

function GET_APPL_DTLS(Appl_No)
{
    try
    {

        ExtendedAjaxCall('DataEntry/GET_APPL_DTLS/' + Appl_No, null, 'GET', function (result)
        {
            $('.CustmTblTd2lbl, .CustmTblTd3lbl').text('');
            $('#tblInvestmentDtls tbody').html('');

            if (!$.isEmptyObject(result))
            {
                $('#lblApplicationType').text(result.Table[0].ApplicationDeclarationType);
                $('#lblDepositorCategory').text(result.Table[0].DepositorStatus);
                $('#lblInvestorName').text(result.Table[0].InvestorFullName);
                $('#lblDOB').text(result.Table[0].Display_DOB);
                $('#lblPAN').text(result.Table[0].PAN);
                $('#lblModeOfPayment').text(result.Table[0].ModeOfPayment);
                $('#lblAmount').text(result.Table[0].Amount);
                $('#lblMobileNumber').text(result.Table[0].Mobile);
                $('#lblEmailID').text(result.Table[0].Email);

                $('#lblFolioNumber').text(result.Table[0].Folio_No);
                $('#lblExistingFDRNumber').text(result.Table[0].Existing_FDR_No);

                if (!$.isEmptyObject(result.Table2) && result.Table2.length > 0)
                {
                    var html = '';
                    html += '<tr>';
                    html += '<td>'
                    html += '<label class="lblText" id="lblTranID">' + result.Table2[0].Appl_No + '</label>'
                    html += '</td>'
                    html += '<td>'
                    html += '₹ '
                    html += '<label class="lblText" id="lblAmount">' + result.Table2[0].Amount + '</label>'
                    html += '</td>'
                    html += '<td>'
                    html += '<label class="lblText" id="lblCategory">' + result.Table2[0].Category + '</label>'
                    html += '</td>'
                    html += '<td>'
                    html += '<label class="lblText" id="lblScheme">' + result.Table2[0].Scheme + '</label>'
                    html += '</td>'
                    html += '<td>'
                    html += '<label class="lblText" id="lblInt_Freq">' + result.Table2[0].Int_Freq + '</label>'
                    html += '</td>'
                    html += '<td>'
                    html += '<label class="lblText" id="lblIntRate">' + result.Table2[0].Int_Rate + '</label>'
                    html += '</td>'
                    html += '<td>'
                    html += '<label class="lblText" id="lblTenure">' + result.Table2[0].Tenure + '</label>'
                    html += '</td>'
                    html += '</tr>'

                    $('#tblInvestmentDtls > tbody').html(html)
                }

                if (!$.isEmptyObject(result.Table4) && result.Table4.length > 0)
                {
                    $.each(result.Table4, function (i, row)
                    {
                        if (row.Holder_Type == '01')
                        {
                            $('#lblHdr1stHolderName').text(row.Kyc_FullName);
                            $('#lbl1stHolderName').text(row.Kyc_FullName);
                            $('#lbl1stHolderSalutation').text(row.Kyc_NamePrefix);
                            $('#lbl1stHolderFirstName').text(row.Kyc_FirstName);
                            $('#lbl1stHolderSecoundName').text(row.Kyc_MiddleName);
                            $('#lbl1stHolderThirdName').text(row.Kyc_LastName);

                            $('#lbl1stGender').text(row.Kyc_Gender);
                            $('#lbl1stGenderCode').text(row.Kyc_Gender);
                            $('#lbl1stDOB').text(row.Display_Kyc_DOB);
                            $('#lbl1stMaritalStatus').text(row.Kyc_MaritalStatus_Desc);
                            $('#lbl1stMaritalStatusCode').text(row.Kyc_MaritalStatus);
                            $('#lbl1stPan').text(row.Kyc_PAN);
                            $('#lblPAN').text(row.Kyc_PAN);
                            $('#lbl1stOccupation').text(row.Kyc_Occupation_Desc);
                            $('#lbl1stOccupationCode').text(row.Kyc_Occupation_Code);

                            $('#lbl1stFatherFullName').text(row.Kyc_FatherFullName);
                            $('#lbl1stHolderFatherSalutation').text(row.Kyc_FatherNamePrefix);
                            $('#lbl1stHolderFatherFirstName').text(row.Kyc_FatherFirstName);
                            $('#lbl1stHolderFatherSecoundName').text(row.Kyc_FatherMiddleName);
                            $('#lbl1stHolderFatherThirdName').text(row.Kyc_FatherLastName);

                            $('#lbl1stMotherFullName').text(row.Kyc_MotherFullName);
                            $('#lbl1stHolderMotherSalutation').text(row.Kyc_MotherNamePrefix);
                            $('#lbl1stHolderMotherFirstName').text(row.Kyc_MotherFirstName);
                            $('#lbl1stHolderMotherSecoundName').text(row.Kyc_MotherMiddleName);
                            $('#lbl1stHolderMotherThirdName').text(row.Kyc_MotherLastName);

                            $('#lbl1stSpouseFullName').text(row.Kyc_SpouseFullName);
                            $('#lbl1stHolderSpouseSalutation').text(row.Kyc_SpouseNamePrefix);
                            $('#lbl1stHolderSpouseFirstName').text(row.Kyc_SpouseFirstName);
                            $('#lbl1stHolderSpouseSecoundName').text(row.Kyc_SpouseMiddleName);
                            $('#lbl1stHolderSpouseThirdName').text(row.Kyc_SpouseLastName);

                            $('#lbl1stGuardianFullName').text(row.Kyc_GuardianFullName);
                            $('#lbl1stHolderGuardianSalutation').text(row.Kyc_GuardianNamePrefix);
                            $('#lbl1stHolderGuardianFirstName').text(row.Kyc_GuardianFirstName);
                            $('#lbl1stHolderGuardianSecoundName').text(row.Kyc_GuardianMiddleName);
                            $('#lbl1stHolderGuardianThirdName').text(row.Kyc_GuardianLastName);
                            $('#lbl1stGuardianPAN').text(row.Kyc_Guardian_PAN);

                            $('#lbl1stAddress1').text(row.PER_Address1);
                            $('#lbl1stAddress2').text(row.PER_Address2);
                            $('#lbl1stAddress3').text(row.PER_Address3);
                            $('#lbl1stCountryDec').text(row.PER_AddCountry_Desc);
                            $('#lbl1stCountryCode').text(row.PER_AddCountry_Code);
                            $('#lbl1stState').text(row.PER_AddState_Desc);
                            $('#lbl1stDistrict').text(row.PER_Address_District_Desc);
                            $('#lbl1stCity').text(row.PER_Address_City_Desc);
                            $('#lbl1stPin').text(row.PER_AddPin);

                            $('#lbl1stCKYCNumber').text(row.Kyc_Number);
                            $('#lbl1stTelNo').text(row.PER_ResTelNumber);
                            $('#lbl1stMobieNumber').text(row.PER_MobileNumber);
                            $('#lbl1stEmail').text(row.PER_EmailAdd);

                            //mail
                            $('#lbl1stMAddress1').text(row.MAIL_Address1);
                            $('#lbl1stMAddress2').text(row.MAIL_Address2);
                            $('#lbl1stMAddress3').text(row.MAIL_Address3);
                            $('#lbl1stMCountryDec').text(row.MAIL_AddCountry_Desc);
                            $('#lbl1stMCountryCode').text(row.MAIL_AddCountry_Code);
                            $('#lbl1stMState').text(row.MAIL_AddState_Desc);
                            $('#lbl1stMDistrict').text(row.MAIL_Address_District_Desc);
                            $('#lbl1stMCity').text(row.MAIL_Address_City_Desc);
                            $('#lbl1stMPin').text(row.MAIL_AddPin);

                            $('#dv1stHolder').show();
                        }

                        if (row.Holder_Type == '02' && $('#chkSHApplicable').prop('checked'))
                        {
                            $('#lblHdrHldrName').text(row.Kyc_FullName);
                            $('#lblHdr2ndHolderName').text(row.Kyc_FullName);
                            $('#lbl2ndHolderName').text(row.Kyc_FullName);
                            $('#lbl2ndHolderSalutation').text(row.Kyc_NamePrefix);
                            $('#lbl2ndHolderFirstName').text(row.Kyc_FirstName);
                            $('#lbl2ndHolderSecoundName').text(row.Kyc_MiddleName);
                            $('#lbl2ndHolderThirdName').text(row.Kyc_LastName);

                            $('#lbl2ndGender').text(row.Kyc_Gender);
                            $('#lbl2ndGenderCode').text(row.Kyc_Gender);
                            $('#lbl2ndDOB').text(row.Display_Kyc_DOB);
                            $('#lbl2ndMaritalStatus').text(row.Kyc_MaritalStatus_Desc);
                            $('#lbl2ndMaritalStatusCode').text(row.Kyc_MaritalStatus);
                            $('#lbl2ndPan').text(row.Kyc_PAN);
                            $('#lbl2ndOccupation').text(row.Kyc_Occupation_Desc);
                            $('#lbl2ndOccupationCode').text(row.Kyc_Occupation_Code);

                            $('#lbl2ndFatherFullName').text(row.Kyc_FatherFullName);
                            $('#lbl2ndHolderFatherSalutation').text(row.Kyc_FatherNamePrefix);
                            $('#lbl2ndHolderFatherFirstName').text(row.Kyc_FatherFirstName);
                            $('#lbl2ndHolderFatherSecoundName').text(row.Kyc_FatherMiddleName);
                            $('#lbl2ndHolderFatherThirdName').text(row.Kyc_FatherLastName);

                            $('#lbl2ndMotherFullName').text(row.Kyc_MotherFullName);
                            $('#lbl2ndHolderMotherSalutation').text(row.Kyc_MotherNamePrefix);
                            $('#lbl2ndHolderMotherFirstName').text(row.Kyc_MotherFirstName);
                            $('#lbl2ndHolderMotherSecoundName').text(row.Kyc_MotherMiddleName);
                            $('#lbl2ndHolderMotherThirdName').text(row.Kyc_MotherLastName);

                            $('#lbl2ndSpouseFullName').text(row.Kyc_SpouseFullName);
                            $('#lbl2ndHolderSpouseSalutation').text(row.Kyc_SpouseNamePrefix);
                            $('#lbl2ndHolderSpouseFirstName').text(row.Kyc_SpouseFirstName);
                            $('#lbl2ndHolderSpouseSecoundName').text(row.Kyc_SpouseMiddleName);
                            $('#lbl2ndHolderSpouseThirdName').text(row.Kyc_SpouseLastName);

                            $('#lbl2ndGuardianFullName').text(row.Kyc_GuardianFullName);
                            $('#lbl2ndHolderGuardianSalutation').text(row.Kyc_GuardianNamePrefix);
                            $('#lbl2ndHolderGuardianFirstName').text(row.Kyc_GuardianFirstName);
                            $('#lbl2ndHolderGuardianSecoundName').text(row.Kyc_GuardianMiddleName);
                            $('#lbl2ndHolderGuardianThirdName').text(row.Kyc_GuardianLastName);
                            $('#lbl2ndGuardianPAN').text(row.Kyc_Guardian_PAN);

                            //per
                            $('#lbl2ndAddress1').text(row.PER_Address1);
                            $('#lbl2ndAddress2').text(row.PER_Address2);
                            $('#lbl2ndAddress3').text(row.PER_Address3);
                            $('#lbl2ndCountryDec').text(row.PER_AddCountry_Desc);
                            $('#lbl2ndCountryCode').text(row.PER_AddCountry_Code);
                            $('#lbl2ndState').text(row.PER_AddState_Desc);
                            $('#lbl2ndDistrict').text(row.PER_Address_District_Desc);
                            $('#lbl2ndCity').text(row.PER_Address_City_Desc);
                            $('#lbl2ndPin').text(row.PER_AddPin);

                            $('#lbl2ndCKYCNumber').text(row.Kyc_Number);
                            $('#lbl2ndTelNo').text(row.PER_ResTelNumber);
                            $('#lbl2ndMobieNumber').text(row.PER_MobileNumber);
                            $('#lbl2ndEmail').text(row.PER_EmailAdd);

                            //mail
                            $('#lbl2ndMAddress1').text(row.MAIL_Address1);
                            $('#lbl2ndMAddress2').text(row.MAIL_Address2);
                            $('#lbl2ndMAddress3').text(row.MAIL_Address3);
                            $('#lbl2ndMCountryDec').text(row.MAIL_AddCountry_Desc);
                            $('#lbl2ndMCountryCode').text(row.MAIL_AddCountry_Code);
                            $('#lbl2ndMState').text(row.MAIL_AddState_Desc);
                            $('#lbl2ndMDistrict').text(row.MAIL_Address_District_Desc);
                            $('#lbl2ndMCity').text(row.MAIL_Address_City_Desc);
                            $('#lbl2ndMPin').text(row.MAIL_AddPin);

                            $('.dv2ndHolder').show();
                            $('#dvHolders').show();
                        }

                        if (row.Holder_Type == '03' && $('#chkSHApplicable').prop('checked') && $('#chkTHApplicable').prop('checked'))
                        {
                            $('#lblHdrHldrName').text($('#lblHdrHldrName').text() + ' / ' + row.Kyc_FullName);
                            $('#lblHdr3rdHolderName').text(row.Kyc_FullName);
                            $('#lbl3rdHolderName').text(row.Kyc_FullName);
                            $('#lbl3rdHolderSalutation').text(row.Kyc_NamePrefix);
                            $('#lbl3rdHolderFirstName').text(row.Kyc_FirstName);
                            $('#lbl3rdHolderSecoundName').text(row.Kyc_MiddleName);
                            $('#lbl3rdHolderThirdName').text(row.Kyc_LastName);

                            $('#lbl3rdGender').text(row.Kyc_Gender);
                            $('#lbl3rdGenderCode').text(row.Kyc_Gender);
                            $('#lbl3rdDOB').text(row.Display_Kyc_DOB);
                            $('#lbl3rdMaritalStatus').text(row.Kyc_MaritalStatus_Desc);
                            $('#lbl3rdMaritalStatusCode').text(row.Kyc_MaritalStatus);
                            $('#lbl3rdPan').text(row.Kyc_PAN);
                            $('#lbl3rdOccupation').text(row.Kyc_Occupation_Desc);
                            $('#lbl3rdOccupationCode').text(row.Kyc_Occupation_Code);

                            $('#lbl3rdFatherFullName').text(row.Kyc_FatherFullName);
                            $('#lbl3rdHolderFatherSalutation').text(row.Kyc_FatherNamePrefix);
                            $('#lbl3rdHolderFatherFirstName').text(row.Kyc_FatherFirstName);
                            $('#lbl3rdHolderFatherSecoundName').text(row.Kyc_FatherMiddleName);
                            $('#lbl3rdHolderFatherThirdName').text(row.Kyc_FatherLastName);

                            $('#lbl3rdMotherFullName').text(row.Kyc_MotherFullName);
                            $('#lbl3rdHolderMotherSalutation').text(row.Kyc_MotherNamePrefix);
                            $('#lbl3rdHolderMotherFirstName').text(row.Kyc_MotherFirstName);
                            $('#lbl3rdHolderMotherSecoundName').text(row.Kyc_MotherMiddleName);
                            $('#lbl3rdHolderMotherThirdName').text(row.Kyc_MotherLastName);

                            $('#lbl3rdSpouseFullName').text(row.Kyc_SpouseFullName);
                            $('#lbl3rdHolderSpouseSalutation').text(row.Kyc_SpouseNamePrefix);
                            $('#lbl3rdHolderSpouseFirstName').text(row.Kyc_SpouseFirstName);
                            $('#lbl3rdHolderSpouseSecoundName').text(row.Kyc_SpouseMiddleName);
                            $('#lbl3rdHolderSpouseThirdName').text(row.Kyc_SpouseLastName);

                            $('#lbl3rdGuardianFullName').text(row.Kyc_GuardianFullName);
                            $('#lbl3rdHolderGuardianSalutation').text(row.Kyc_GuardianNamePrefix);
                            $('#lbl3rdHolderGuardianFirstName').text(row.Kyc_GuardianFirstName);
                            $('#lbl3rdHolderGuardianSecoundName').text(row.Kyc_GuardianMiddleName);
                            $('#lbl3rdHolderGuardianThirdName').text(row.Kyc_GuardianLastName);
                            $('#lbl3rdGuardianPAN').text(row.Kyc_Guardian_PAN);

                            $('#lbl3rdAddress1').text(row.PER_Address1);
                            $('#lbl3rdAddress2').text(row.PER_Address2);
                            $('#lbl3rdAddress3').text(row.PER_Address3);
                            $('#lbl3rdCountryDec').text(row.PER_AddCountry_Desc);
                            $('#lbl3rdCountryCode').text(row.PER_AddCountry_Code);
                            $('#lbl3rdState').text(row.PER_AddState_Desc);
                            $('#lbl3rdDistrict').text(row.PER_Address_District_Desc);
                            $('#lbl3rdCity').text(row.PER_Address_City_Desc);
                            $('#lbl3rdPin').text(row.PER_AddPin);

                            $('#lbl3rdCKYCNumber').text(row.Kyc_Number);
                            $('#lbl3rdTelNo').text(row.PER_ResTelNumber);
                            $('#lbl3rdMobieNumber').text(row.PER_MobileNumber);
                            $('#lbl3rdEmail').text(row.PER_EmailAdd);

                            //mail
                            $('#lbl3rdMAddress1').text(row.MAIL_Address1);
                            $('#lbl3rdMAddress2').text(row.MAIL_Address2);
                            $('#lbl3rdMAddress3').text(row.MAIL_Address3);
                            $('#lbl3rdMCountryDec').text(row.MAIL_AddCountry_Desc);
                            $('#lbl3rdMCountryCode').text(row.MAIL_AddCountry_Code);
                            $('#lbl3rdMState').text(row.MAIL_AddState_Desc);
                            $('#lbl3rdMDistrict').text(row.MAIL_Address_District_Desc);
                            $('#lbl3rdMCity').text(row.MAIL_Address_City_Desc);
                            $('#lbl3rdMPin').text(row.MAIL_AddPin);

                            $('.dv3ndHolder').show();
                            $('#dvHolders').show();
                        }

                        if (row.Holder_Type == '04' && $('#chkNomApplicable').prop('checked'))
                        {
                            $('#lblHdrNomineeName').text(row.Kyc_FullName);
                            $('#lblNomineeFullName').text(row.Kyc_FullName);
                            $('#lblNomineeSalutation').text(row.Kyc_NamePrefix);
                            $('#lblNomineeFirstName').text(row.Kyc_FirstName);
                            $('#lblNomineeSecoundName').text(row.Kyc_MiddleName);
                            $('#lblNomineeThirdName').text(row.Kyc_LastName);

                            //$('#lblNomineeGender').text(row.Kyc_Gender);
                            //$('#lblNomineeGenderCode').text(row.Kyc_Gender);
                            $('#lblNominee_DOB').text(row.Display_Kyc_DOB);
                            $('#lblNomineeRelations').text(row.Nominee_Relations);
                            $('#lblNomineeRelationsCode').text(row.Nominee_Relations);
                            //$('#lblNomineeMaritalStatus').text(row.Kyc_LastName);
                            //$('#lblNomineeMaritalStatusCode').text(row.Kyc_LastName);
                            //$('#lblNomineePan').text(row.Kyc_LastName);
                            //$('#lblNomineeOccupation').text(row.Kyc_LastName);
                            //$('#lblNomineeOccupationCode').text(row.Kyc_LastName);                        

                            $('#lblGuardianFullName').text(row.Kyc_GuardianFullName);
                            $('#lblGuardianSalutation').text(row.Kyc_GuardianNamePrefix);
                            $('#lblGuardianFirstName').text(row.Kyc_GuardianFirstName);
                            $('#lblGuardianSecoundName').text(row.Kyc_GuardianMiddleName);
                            $('#lblGuardianThirdName').text(row.Kyc_GuardianLastName);
                            //$('#lblGuardianPAN').text(row.Kyc_Guardian_PAN);

                            $('#lblAddress1').text(row.PER_Address1);
                            $('#lblAddress2').text(row.PER_Address2);
                            $('#lblAddress3').text(row.PER_Address3);
                            $('#lblCountryName').text(row.PER_AddCountry_Desc);
                            $('#lblCountryCode').text(row.PER_AddCountry_Code);
                            $('#lblStateName').text(row.PER_AddState_Desc);
                            $('#lblStateCode').text(row.PER_AddState_Code);
                            $('#lblDistrictName').text(row.PER_Address_District_Desc);
                            $('#lblCity').text(row.PER_Address_City_Desc);
                            $('#lblPinCode').text(row.PER_AddPin);

                            $('#lblCKYCNumber').text(row.Kyc_Number);
                            $('#lblTelephoneNumber').text(row.PER_ResTelNumber);
                            $('#lblMobileNo').text(row.PER_MobileNumber);
                            $('#lblNomineeEmailID').text(row.PER_EmailAdd);


                            $('#dvNominee').show();
                        }
                    });
                }
            }

            $('#preloader').hide();
        }, null, true, false, false, ErrorFunction);

    } catch (e)
    {
        fnException(e);
    }
}

$('#btnsubmit08').click(function ()
{
    try
    {
        let InvestorDetailSaveStruct = {};
        if (IsValidSubmitStep8())
        {
            //step1-----------------------------------------------------------------------------------
            InvestorDetailSaveStruct.FrontOfficeSave = getStep1Data();

            //step2------------------------------------------------------------------------------           
            InvestorDetailSaveStruct.Investor_Other_Dtl = getStep2Data();

            //step3--------------------------------------------------------------------------------------         
            InvestorDetailSaveStruct.Investment_Dtl = getStep3Data();

            //step4-------------------------------------------------------------------------------------------------------
            InvestorDetailSaveStruct.Investor_Bank_Dtl = getStep4Data();

            //step5-----------------------------------------------------------------------------------------------------------
            let KYCList = [];
            let All_Kyc_Address = [];
            let FATCA_DTLS = [];
            InvestorDetailSaveStruct.IsFATCAApplicable = "N";

            //FH details
            let FH_GET_DATA = FH_GET_DATA_FOR_SAVE();
            KYCList.push(FH_GET_DATA);

            //FH permanent address
            let FH_GET_PER_ADDR = FH_GET_PER_ADDR_FOR_SAVE();
            All_Kyc_Address.push(FH_GET_PER_ADDR);

            //FH mailing address
            let FH_GET_MAIL_ADDR = FH_GET_MAIL_ADDR_FOR_SAVE();
            All_Kyc_Address.push(FH_GET_MAIL_ADDR);

            //FH overseas address
            if ($('#chkIdOverSeasAddress').prop('checked') && $('#txtOAdd1').val() != '')
            {
                let FH_GET_OVR_ADDR = FH_GET_OVR_ADDR_FOR_SAVE();
                All_Kyc_Address.push(FH_GET_OVR_ADDR);
            }

            //FH FATCA Details
            if ($('#btnsldFatca').hasClass('active') || $('#btnsldGreen').hasClass('active'))
            {
                InvestorDetailSaveStruct.IsFATCAApplicable = "Y";
                let FH_GET_FATCA_DTLS = FH_GET_FATCA_DTLS_FOR_SAVE();
                FATCA_DTLS.push(FH_GET_FATCA_DTLS);
            }

            //second holder
            if ($('#chkSHApplicable').prop('checked'))
            {
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
                if ($('#btnSHsldFatca').hasClass('active') || $('#btnSHsldGreen').hasClass('active'))
                {
                    InvestorDetailSaveStruct.IsFATCAApplicable = "Y";
                    let SH_GET_FATCA_DTLS = SH_GET_FATCA_DTLS_FOR_SAVE();
                    FATCA_DTLS.push(SH_GET_FATCA_DTLS);
                }
            }

            //third holder
            if ($('#chkTHApplicable').prop('checked'))
            {
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
                if ($('#btnTHsldFatca').hasClass('active') || $('#btnTHsldGreen').hasClass('active'))
                {
                    InvestorDetailSaveStruct.IsFATCAApplicable = "Y";
                    let TH_GET_FATCA_DTLS = TH_GET_FATCA_DTLS_FOR_SAVE();
                    FATCA_DTLS.push(TH_GET_FATCA_DTLS);
                }
            }

            InvestorDetailSaveStruct.KYCDataDetails = KYCList;
            InvestorDetailSaveStruct.InvestorAddresses = All_Kyc_Address;
            InvestorDetailSaveStruct.FATCA_DTLS = FATCA_DTLS;

            //step6---------------------------------------------------------------------------------------------------------------
            if ($('#chkNomApplicable').prop('checked'))
                InvestorDetailSaveStruct.Nominee_Dtl = getStep6Data();

            //step7-----------------------------------------------------------------------------------------------------------------------------
            if (!$('#tblOVDList > tbody').hasClass('clear_tbody'))
            {
                let OVDDtls = [];
                let MemberDtls = [];

                $('#tblOVDList > tbody tr').each(function (i, tr)
                {
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

                if (BTP_OBJECT.IND_NIND == 'HUF' && $('#tblCoparceners > tbody > tr').length > 0)
                {
                    $('#tblCoparceners > tbody tr').each(function (i, tr)
                    {
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
            }

            var isError = true;
            ExtendedAjaxCall('InvestorDetailsSave/SubmitStep8', InvestorDetailSaveStruct, 'POST', function (result)
            {
                try
                {
                    if (!$.isEmptyObject(result) && result.Status == 1)
                    {

                        $('#DV_STEP1 select, #DV_STEP1 input').prop('disabled', true);
                        $('#DV_STEP2 button, #DV_STEP2 input').prop('disabled', true);
                        $('#DV_STEP3 button, #DV_STEP3 select, #DV_STEP3 input').prop('disabled', true);
                        $('#DV_STEP4 button, #DV_STEP4 select, #DV_STEP4 input').prop('disabled', true);
                        $('#DV_STEP5 button, #DV_STEP5 select, #DV_STEP5 input').prop('disabled', true);
                        $('#DV_NOM button, #DV_NOM select, #DV_NOM input').prop('disabled', true);
                        $('#DV_STEP7 button, #DV_STEP7 select, #DV_STEP7 input').prop('disabled', true);
                        $('#btnCancel01,#btnCancel02,#btnCancel03,#btnCancel04,#btnCancel05,#btnCancel06,#btnCancel07,#btnCancel08').hide();
                        $('#btnsubmit01,#btnsubmit02,#btnsubmit03,#btnsubmit04,#btnsubmit05,#btnsubmit06,#btnsubmit07,#btnsubmit08').hide();
                        $('#lnkCMSBranchSearch, #DV_FATCA_DETAILS').hide();
                        $('#DV_APPL_UPLOAD, #DV_HOLDER_DOC_UPLOAD, .OVD_DELETE').hide();
                        $('.BIND_DETAIL, .CLEAR_DETAIL, .btnTblEdit, .btnTblDelete').hide();
                        $('#ddlHolderType').prop('disabled', false);
                        $('#IdBtnTabSwit08').css('border-color', '#047904');


                        let msg = '<p>Application ' + $('#lblApplicationNumber').text() + ' saved successfully..!</p>';

                        if ($('#rdoPhysical').prop('checked') && ($('#ddlInvPayment_Mode').val() == '3' || $('#ddlInvPayment_Mode').val() == '4' || $('#ddlInvPayment_Mode').val() == 'Cheque/DD' || $('#ddlInvPayment_Mode').val() == "Cheque" || $('#ddlInvPayment_Mode').val() == "Demand Draft"))
                        {
                            msg = '<p style="font-size: 16px;margin: 10px 0 10px;font-weight: 600;">Entry for application number ' + $('#lblApplicationNumber').text() + ' completed successfully.</p>'
                            msg += '<p style="color: #000;"> Proceed for payinslip generation, submit the investment cheque along with payinslip to the  nearest HDFC Bank CMS center.</p>';
                            msg += '<p style="color: #000;"> Please qoute above application number on physical FD application and dispatch the same to the adress mentioned below.</p>';
                            msg += '<p style="color: #000;font-size: 12px;"><b>Address:</b> Mahindra & Mahindra Financial Services Limited,';
                            msg += ' 2nd Floor, sadhana House,';
                            msg += ' Behind Mahindra Towers,';
                            msg += ' 570, P.B Marg, worli Mumbai 400018.</p>';
                        }
                        else 
                        {
                            if (result.URL_Status == 1)
                            {

                                msg = '<p> The investment acceptance/payment link for application number ' + $('#lblApplicationNumber').text() + ' has been successfully sent to registered email ID & mobile number of the Depositor. You may proceed to enter new application, if available.Thank you. </p>';

                            }
                            else if (result.URL_Status == 0)
                            {
                                msg += '<p>' + result.Msg + '</p>'
                            }
                        }

                        BtpMessagePopup(msg, 'success');
                    }
                    else if (!$.isEmptyObject(result) && result.Status == 0 && !$.isEmptyObject(result.Msg))
                    {
                        isError = true;
                        BtpMessagePopup(result[0].Msg, "error");
                    }
                    else
                    {
                        isError = true;
                        BtpMessagePopup('Something went wrong..!', "error");
                    }

                    $('#preloader').hide();

                } catch (e)
                {
                    fnException(e);
                }
            }, null, true, false, false, ErrorFunction);

            if (isError)
            {
                return false;
            }

            return true;
        }
        else
        {
            return false;
        }
    } catch (e)
    {
        fnException(e); return false;
    }
});

function IsValidSubmitStep8()
{
    try
    {
        let errMessage = "";

        //step1-----------------------------------------------------------
        errMessage += isValidStep1();

        //step3--------------------------------------------------
        errMessage += isValidStep3();

        //step4---------------------------------------------------
        errMessage += isValidStep4();

        //step5----------------------------------------------------------

        //first holder
        errMessage += FH_Save_Validations();

        //second holder
        if ($('#chkSHApplicable').prop('checked'))
            errMessage += SH_Save_Validations();

        //third holder
        if ($('#chkTHApplicable').prop('checked'))
            errMessage += TH_Save_Validations();

        //all holder pan validation - 1:2
        if ($('#txtInvPan').val() == $('#DV_SH #txtPAN').val() && $('#txtInvDOB').val() == $('#DV_SH #txtDOB').val() && $('#txtInvPan').val() != '' && $('#txtInvDOB').val() != '')
        {
            errMessage += "<p>Second Holder's PAN number can not be same as Investor's PAN..!</p>";
        }

        //all holder pan validation - 1:3
        if ($('#txtInvPan').val() == $('#DV_TH #txtPAN').val() && $('#txtInvDOB').val() == $('#DV_TH #txtDOB').val() && $('#txtInvPan').val() != '' && $('#DV_TH #txtDOB').val() != '')
        {
            errMessage += "<p>Third Holder's PAN number can not be same as Investor's PAN..!</p>";
        }

        //all holder pan validation - 2:3
        if ($('#DV_SH #txtPAN').val() == $('#DV_TH #txtPAN').val() && $('#DV_SH #txtDOB').val() == $('#DV_TH #txtDOB').val() && $('#DV_SH #txtPAN').val() != '' && $('#DV_SH #txtDOB').val() != '')
        {
            errMessage += "<p>Third Holder's PAN number can not be same Second Holder's PAN..!</p>";
        }


        //step6------------------------------------------------
        if ($('#chkNomApplicable').prop('checked'))
            errMessage += isValidStep6();

        //step7-------------------------------------------------
        errMessage += isValidStep7();

        if (!$.isEmptyObject(errMessage))
        {
            BtpMessagePopup(errMessage, 'error');
            return false;
        }

        return true;

    } catch (e)
    {
        fnException(e); return false;
    }

}