$('#tblApplData').DataTable({
    destroy: true,
    //"order": [[2, "asc"]],
    initComplete: function ()
    {

    }
});

$(document).ready(function ()
{
    $('#btnBack01').show();
});

$('#btnCopyApplication').click(function ()
{
    try
    {
        ExtendedAjaxCall('ApplicationCopy/GET_APPL_DTLS_FOR_COPYAsync/' + $('#txtCopyApplicationNumber').val(), null, 'GET', function (result)
        {
            try
            {
                if (!$.isEmptyObject(result) && result.Table.length > 0 && result.Table[0].Status == 1)
                {
                    var Appl_No = result.Table[0].Appl_No;

                    //COPY
                    $('#hdnApplicationNumber').val(Appl_No);
                    stepper.maxTabIndex = 1;
                    BTP_OBJECT.FH_DATA_SOURCE = result.Table[0].Data_Source;
                   
                    if (!$.isEmptyObject(result.Table[0].Folio_No))
                        InvSearch(result.Table[0].DepositorStatusCode, 'Folio', result.Table[0].Folio_No, null, Appl_No);

                    BTP_OBJECT.ApplicationType = $.isEmptyObject(result.Table[0].Folio_No) ? 'F' : 'A';
                    BTP_OBJECT.IND_NIND = result.Table[0].Ind_Nind;
                    $('#lblDepositorCategory').text(result.Table[0].DepositorStatusDesc);
                    $('#lblApplicationType').text(result.Table[0].ApplicationDeclarationType);
                    $('#lblInvestorName').text(result.Table[0].InvestorFullName);
                    $('#lblDOB').text(result.Table[0].Display_DOB);
                    $('#lblPAN').text(result.Table[0].PAN);
                    $('#txtInvPan').val(result.Table[0].PAN).change();
                    $('#txtInvCKYCNumber').val(result.Table[0].CKYCNumber);
                    $('#lblModeOfPayment').text(result.Table[0].ModeOfPayment);
                    $('#lblAmount').text(result.Table[0].Amount);
                    $('#lblMobileNumber').text(result.Table[0].Mobile);
                    $('#lblEmailID').text(result.Table[0].Email);
                    if (result.Table[0].ApplicationDeclarationType == 'PHYSICAL')
                        $('#rdoPhysical').prop('checked', true).change();
                    else if (result.Table[0].ApplicationDeclarationType == 'DIGITAL')
                        $('#rdoDigital').prop('checked', true).change();
                    $('#ddlDepositorsStatus').val(result.Table[0].DepositorStatusCode).change();
                    $('#txtPhysicalApplNo').val(result.Table[0].Physical_App_No);
                    $('#ddlInvtitle').val(result.Table[0].Salutation).change();
                    $('#txtInvFirstName').val(result.Table[0].FirstName).change();
                    $('#txtInvMiddleName').val(result.Table[0].MiddleName).change();
                    $('#txtInvLastName').val(result.Table[0].LastName).change();
                    if (BTP_OBJECT.IND_NIND == 'IND')
                    {
                        $('#txtInvDOB').datetextentry('set_date', result.Table[0].DOB)
                        InvDOB_Change(result.Table[0].DOB);
                    }
                    else
                        $('#txtInvDOI').datetextentry('set_date', result.Table[0].DOB)

                    $('#txtAmount').val(result.Table[0].Amount).focusout()
                    $('#ddlBranch').val(result.Table[0].Agency_Usr_Branch_Cd).change()
                    $('#ddlInvPayment_Mode').val(result.Table[0].ModeOfPayment).change()
                    $('#txtInvDrawn_Bank_Search').val(result.Table[0].MICR_Code)
                    $('#hdnDrawn_Bank_Name').val(result.Table[0].BankName)
                    $('#hdnBank_Branch_Name').val(result.Table[0].BranchName)
                    $('#hdnBank_MICR').val(result.Table[0].MICR_Code)
                    $('#hdnBank_NEFT').val(result.Table[0].IFSC_Code)
                    $('#txtInvCheque_DD_No').val(result.Table[0].Instrument_No)
                    $('#txtChequeDate').datetextentry('set_date', result.Table[0].Cheque_Date)
                    if ($("#ddlCMSBranch option[value='" + result.Table[0].Cms_Location_Code + "']").length != 0)
                        $('#ddlCMSBranch').val(result.Table[0].Cms_Location_Code).change();
                    else
                    {
                        var html = '<option value="' + result.Table[0].Cms_Location_Code + '">' + result.Table[0].Cms_Location_Desc + '</option>';
                        $('#ddlCMSBranch').append(html).val(result.Table[0].Cms_Location_Code).change();
                    }
                    $('#txtMobile').val(result.Table[0].Mobile)
                    $('#txtEmail').val(result.Table[0].Email)
                    $('#txtSubBrokerCode').val('')
                    $('#txtRemark').val(result.Table[0].Remarks)

                    //other details
                    if (!$.isEmptyObject(result.Table1) && result.Table1.length > 0)
                    {
                        $('#txtSubBrokerCode').val(result.Table1[0].Sub_Broker_Code)
                        if (result.Table1[0].IsSecondHolderApplicable == 1)
                            $('#chkSHApplicable').prop('checked', true).change();
                        else
                            $('#chkSHApplicable').prop('checked', false).change();
                        if (result.Table1[0].IsThirdHolderApplicable == 1)
                            $('#chkTHApplicable').prop('checked', true).change();
                        else
                            $('#chkTHApplicable').prop('checked', false).change();
                        if (result.Table1[0].IsNomineeApplicable == 1)
                            $('#chkNomApplicable').prop('checked', true).change();
                        else
                            $('#chkNomApplicable').prop('checked', false).change();
                        if (result.Table1[0].Is_FH_Tax_Resident)
                            $('#btnsldFatca').addClass('active').change();
                        if (result.Table1[0].Is_FH_Green_Card_Holder)
                            $('#btnsldGreen').addClass('active').change();
                        if (result.Table1[0].Is_SH_Tax_Resident)
                            $('#btnSHsldFatca').addClass('active').change();
                        if (result.Table1[0].Is_SH_Green_Card_Holder)
                            $('#btnSHsldGreen').addClass('active').change();
                        if (result.Table1[0].Is_TH_Tax_Resident)
                            $('#btnTHsldFatca').addClass('active').change();
                        if (result.Table1[0].Is_TH_Green_Card_Holder)
                            $('#btnTHsldGreen').addClass('active').change();
                    }

                    //investment
                    if (!$.isEmptyObject(result.Table2) && result.Table2.length > 0)
                    {
                        $('#ddlCategory').val(result.Table2[0].Category).change()
                        $('#txtEmpCode').val(result.Table2[0].Employee_Code).change()
                        $('#ddlSchemes').val(result.Table2[0].Scheme).change()
                        $('#ddlInterestFrequency').val(result.Table2[0].Int_Freq).change()
                        $('#ddlTenure').val(result.Table2[0].Tenure).change()
                        $('#ddlDepositPayable').val(result.Table2[0].Payment_Instruction).change()
                        $('#ddlFdrDispatchMode').val(result.Table2[0].FDR_Dispatch_Mode).change()
                        if (result.Table2[0].Is_Auto_Renewal == 1)
                            $('#ddlAutoRenewal').val('YES').change()
                        else
                            $('#ddlAutoRenewal').val('NO').change()
                        $('#ddlRenewalFor').val(result.Table2[0].Renewal_For).change()
                        if (result.Table2[0].TDS_Flag)
                            $('#chkTDFFlag').prop('checked', true).change()
                        else
                            $('#chkTDFFlag').prop('checked', false).change()
                        $('#ddlHNG').val(result.Table2[0].HNG).change()
                    }

                    //bank
                    if (!$.isEmptyObject(result.Table3) && result.Table3.length > 0)
                    {
                        BTP_OBJECT.IsProvBank = result.Table3[0].IsProvBank;
                        $('#txtBankName').val(result.Table3[0].BankName);
                        $('#txtBranchName').val(result.Table3[0].BranchName);
                        $('#txtMICRCode').val(result.Table3[0].MICRCode);
                        $('#txtNEFTCode').val(result.Table3[0].NEFTCode);
                        $('#txtBankAccountNo').val(result.Table3[0].BankAccountNo);
                        $('#txtConfirmBankAccountNo').val(result.Table3[0].BankAccountNo);
                        $('#DV_PROV_BANK').hide();
                        $('#DV_BANK_DTLS').show();
                        $('#DV_OR_ADD_NEW').show();
                    }

                    //KYC Dtl
                    if (!$.isEmptyObject(result.Table4) && result.Table4 != undefined && result.Table4.length > 0)
                    {
                        $.each(result.Table4, function (i, row)
                        {
                            if (row.Holder_Type == '01')
                            {
                                if ($.isEmptyObject(IsDocUploaded()) && BTP_OBJECT.OVDSave == false)
                                    $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');

                                $('#DV_FH #ddlMaritalStatus').val(row.Kyc_MaritalStatus).change();
                                $('#txtInvCKYC').val(row.Kyc_Number);
                                $('#DV_FH #txtCKYCNumber').val(row.Kyc_Number);
                                if (!$.isEmptyObject(row.Kyc_FatherFirstName))
                                {
                                    $('#DV_FH #ddlFatherTitle').val(row.Kyc_FatherNamePrefix);
                                    $('#DV_FH #txtFatherFName').val(row.Kyc_FatherFirstName);
                                    $('#DV_FH #txtFatherMName').val(row.Kyc_FatherMiddleName);
                                    $('#DV_FH #txtFatherLName').val(row.Kyc_FatherLastName);
                                }
                                if (!$.isEmptyObject(row.Kyc_MotherFirstName))
                                {
                                    $('#DV_FH #ddlMotherTitle').val(row.Kyc_MotherNamePrefix);
                                    $('#DV_FH #txtMotherFName').val(row.Kyc_MotherFirstName);
                                    $('#DV_FH #txtMotherMName').val(row.Kyc_MotherMiddletName);
                                    $('#DV_FH #txtMotherLName').val(row.Kyc_MotherLastName);
                                }
                                if (!row.IsMinor && row.Kyc_MaritalStatus == '01' && !$.isEmptyObject(row.Kyc_SpouseFirstName))
                                {
                                    $('#DV_FH #ddlSpouseTitle').val(row.Kyc_SpouseNamePrefix);
                                    $('#DV_FH #txtSpouseFName').val(row.Kyc_SpouseFirstName);
                                    $('#DV_FH #txtSpouseMName').val(row.Kyc_SpouseMiddleName);
                                    $('#DV_FH #txtSpouseLName').val(row.Kyc_SpouseLastName);
                                }
                                if (row.IsMinor && row.Kyc_MaritalStatus != '01' && !$.isEmptyObject(row.Kyc_GuardianFirstName))
                                {
                                    $('#DV_FH #ddlGuardianTitle').val(row.Kyc_GuardianNamePrefix);
                                    $('#DV_FH #txtGuardianFName').val(row.Kyc_GuardianFirstName);
                                    $('#DV_FH #txtGuardianMName').val(row.Kyc_GuardianMiddleName);
                                    $('#DV_FH #txtGuardianLName').val(row.Kyc_GuardianLastName);
                                    $('#DV_FH #txtGuardianPAN').val(row.Kyc_Guardian_PAN);
                                }
                                $('#DV_FH #ddlGender').val(row.Kyc_Gender).change()
                                $('#DV_FH #ddlOccupation').val(row.Kyc_Occupation_Code);
                                $('#DV_FH #hdnMobilisationMode').val(row.MobilisationMode);
                                $('#DV_FH_P_ADDR #txtAdd1').val(row.PER_Address1);
                                $('#DV_FH_P_ADDR #txtAdd2').val(row.PER_Address2);
                                $('#DV_FH_P_ADDR #txtAdd3').val(row.PER_Address3);
                                $('#DV_FH_P_ADDR #ddlCountry').val(row.PER_AddCountry_Code).change();
                                $('#DV_FH_P_ADDR #txtCity').val(row.PER_Address_City_Desc);
                                $('#DV_FH_P_ADDR #txtPin').val(row.PER_AddPin).keyup();
                                $('#DV_FH_P_ADDR #txtState').val(row.PER_AddState_Desc);
                                $('#DV_FH_P_ADDR #txtDistrict').val(row.PER_Address_District_Desc);
                                $('#DV_FH_P_ADDR #txtTelephone').val(row.PER_ResTelNumber);
                                $('#DV_FH #ddlAnnualIncome').val(row.Kyc_AnnualIncome_Code);

                                if (!$.isEmptyObject(row.MAIL_Address1))
                                {
                                    $('#DV_FH_M_ADDR #txtAdd1').val(row.MAIL_Address1);
                                    $('#DV_FH_M_ADDR #txtAdd2').val(row.MAIL_Address2);
                                    $('#DV_FH_M_ADDR #txtAdd3').val(row.MAIL_Address3);
                                    $('#DV_FH_M_ADDR #ddlCountry').val(row.MAIL_AddCountry_Code).change();
                                    $('#DV_FH_M_ADDR #txtCity').val(row.MAIL_Address_City_Desc);
                                    $('#DV_FH_M_ADDR #txtPin').val(row.MAIL_AddPin).keyup();
                                    $('#DV_FH_M_ADDR #txtState').val(row.MAIL_AddState_Desc);
                                    $('#DV_FH_M_ADDR #txtDistrict').val(row.MAIL_Address_District_Desc);
                                }

                                if (!$.isEmptyObject(row.OVR_Address1))
                                {
                                    $('#chkIdOverSeasAddress').prop('checked', true).change();
                                    $('#txtOAdd1').val(row.OVR_Address1);
                                    $('#txtOAdd2').val(row.OVR_Address2);
                                    $('#txtOAdd3').val(row.OVR_Address3);
                                    $('#ddlOCountry').val(row.OVR_AddCountry_Code).change();
                                    $('#txtOState').val(row.OVR_AddState_Code);
                                    $('#txtOCity').val(row.OVR_Address_City_Desc);
                                    $('#txtOPin').val(row.OVR_AddPin);

                                }
                            }

                            //Second holder
                            if (row.Holder_Type == '02' && $('#chkSHApplicable').prop('checked'))
                            {
                                BTP_OBJECT.SH_DATA_SOURCE = result.Table[0].Data_Source;
                               
                                if (!$.isEmptyObject(row.SourceTableId))
                                    GetProvSH(row.SourceTableId)
                                else if (!$.isEmptyObject(row.FolioNo))
                                    SHSearch('Folio', row.FolioNo, null, Appl_No);
                                $('#DV_SH #ddlMaritalStatus').val(row.Kyc_MaritalStatus).change();
                                $('#txtSHDOB').datetextentry('set_date', row.Kyc_DOB);
                                SHDOBChange();
                                $('#DV_SH #txtCKYCNumber').val(row.Kyc_Number);
                                $('#DV_SH #ddlTitle').val(row.Kyc_NamePrefix);
                                $('#DV_SH #txtFName').val(row.Kyc_FirstName).change();
                                $('#DV_SH #txtMName').val(row.Kyc_MiddleName);
                                $('#DV_SH #txtLName').val(row.Kyc_LastName);
                                if (!$.isEmptyObject(row.Kyc_FatherFirstName))
                                {
                                    $('#DV_SH #ddlFatherTitle').val(row.Kyc_FatherNamePrefix);
                                    $('#DV_SH #txtFatherFName').val(row.Kyc_FatherFirstName);
                                    $('#DV_SH #txtFatherMName').val(row.Kyc_FatherMiddleName);
                                    $('#DV_SH #txtFatherLName').val(row.Kyc_FatherLastName);
                                }
                                if (!$.isEmptyObject(row.Kyc_MotherFirstName))
                                {
                                    $('#DV_SH #ddlMotherTitle').val(row.Kyc_MotherNamePrefix);
                                    $('#DV_SH #txtMotherFName').val(row.Kyc_MotherFirstName).change();
                                    $('#DV_SH #txtMotherMName').val(row.Kyc_MotherMiddletName);
                                    $('#DV_SH #txtMotherLName').val(row.Kyc_MotherLastName);
                                }
                                if (!row.IsMinor && row.Kyc_MaritalStatus == '01' && !$.isEmptyObject(row.Kyc_SpouseFirstName))
                                {
                                    $('#DV_SH #ddlSpouseTitle').val(row.Kyc_SpouseNamePrefix);
                                    $('#DV_SH #txtSpouseFName').val(row.Kyc_SpouseFirstName);
                                    $('#DV_SH #txtSpouseMName').val(row.Kyc_SpouseMiddleName);
                                    $('#DV_SH #txtSpouseLName').val(row.Kyc_SpouseLastName);
                                }
                                if (row.IsMinor && row.Kyc_MaritalStatus != '01' && !$.isEmptyObject(row.Kyc_GuardianFirstName))
                                {
                                    $('#DV_SH #ddlGuardianTitle').val(row.Kyc_GuardianNamePrefix);
                                    $('#DV_SH #txtGuardianFName').val(row.Kyc_GuardianFirstName);
                                    $('#DV_SH #txtGuardianMName').val(row.Kyc_GuardianMiddleName);
                                    $('#DV_SH #txtGuardianLName').val(row.Kyc_GuardianLastName);
                                    $('#DV_SH #txtGuardianPAN').val(row.Kyc_Guardian_PAN);
                                }
                                $('#DV_SH #ddlGender').val(row.Kyc_Gender);
                                $('#DV_SH #ddlOccupation').val(row.Kyc_Occupation_Code);
                                $('#DV_SH #txtPAN').val(row.Kyc_PAN);
                                $('#DV_SH #hdnMobilisationMode').val(row.MobilisationMode);
                                $('#DV_SH_P_ADDR #txtAdd1').val(row.PER_Address1);
                                $('#DV_SH_P_ADDR #txtAdd2').val(row.PER_Address2);
                                $('#DV_SH_P_ADDR #txtAdd3').val(row.PER_Address3);
                                $('#DV_SH_P_ADDR #ddlCountry').val(row.PER_AddCountry_Code).change();
                                $('#DV_SH_P_ADDR #txtCity').val(row.PER_Address_City_Desc);
                                $('#DV_SH_P_ADDR #txtPin').val(row.PER_AddPin).keyup();
                                $('#DV_SH_P_ADDR #txtState').val(row.PER_AddState_Desc);
                                $('#DV_SH_P_ADDR #txtDistrict').val(row.PER_Address_District_Desc);
                                $('#DV_SH_P_ADDR #txtTelephone').val(row.PER_ResTelNumber);
                                $('#DV_SH_P_ADDR #txtMobileNo').val(row.PER_MobileNumber);
                                $('#DV_SH_P_ADDR #txtEmailId').val(row.PER_EmailAdd);
                                $('#DV_SH #ddlAnnualIncome').val(row.Kyc_AnnualIncome_Code);

                                if (!$.isEmptyObject(row.MAIL_Address1))
                                {
                                    $('#DV_SH_M_ADDR #txtAdd1').val(row.MAIL_Address1);
                                    $('#DV_SH_M_ADDR #txtAdd2').val(row.MAIL_Address2);
                                    $('#DV_SH_M_ADDR #txtAdd3').val(row.MAIL_Address3);
                                    $('#DV_SH_M_ADDR #ddlCountry').val(row.MAIL_AddCountry_Code).change();
                                    $('#DV_SH_M_ADDR #txtCity').val(row.MAIL_Address_City_Desc);
                                    $('#DV_SH_M_ADDR #txtPin').val(row.MAIL_AddPin).keyup();
                                    $('#DV_SH_M_ADDR #txtState').val(row.MAIL_AddState_Desc);
                                    $('#DV_SH_M_ADDR #txtDistrict').val(row.MAIL_Address_District_Desc);
                                }

                                if (BTP_OBJECT.SH_DATA_SOURCE == 'CKYC')
                                    SH_CKYC_Validations();
                                $('#DV_PROV_SH').hide();
                                $('#DV_SH_SEARCH').hide();
                                $('#DV_SH_DTLS').show();
                            }

                            //Third holder
                            if ($('#chkSHApplicable').prop('checked') && row.Holder_Type == '03' && $('#chkTHApplicable').prop('checked'))
                            {
                                BTP_OBJECT.TH_DATA_SOURCE = result.Table[0].Data_Source;
                              
                                if (!$.isEmptyObject(row.SourceTableId))
                                    GetProvTH(row.SourceTableId)
                                else if (!$.isEmptyObject(row.FolioNo))
                                    THSearch('Folio', row.FolioNo, null, Appl_No);
                                $('#DV_TH #ddlMaritalStatus').val(row.Kyc_MaritalStatus).change();
                                $('#DV_TH #txtDOB').datetextentry('set_date', row.Kyc_DOB);
                                THDOBChange();
                                $('#DV_TH #txtCKYCNumber').val(row.Kyc_Number);
                                $('#DV_TH #ddlTitle').val(row.Kyc_NamePrefix);
                                $('#DV_TH #txtFName').val(row.Kyc_FirstName);
                                $('#DV_TH #txtMName').val(row.Kyc_MiddleName);
                                $('#DV_TH #txtLName').val(row.Kyc_LastName);
                                if (!$.isEmptyObject(row.Kyc_FatherFirstName))
                                {
                                    $('#DV_TH #ddlFatherTitle').val(row.Kyc_FatherNamePrefix);
                                    $('#DV_TH #txtFatherFName').val(row.Kyc_FatherFirstName);
                                    $('#DV_TH #txtFatherMName').val(row.Kyc_FatherMiddleName);
                                    $('#DV_TH #txtFatherLName').val(row.Kyc_FatherLastName);
                                }
                                if (!$.isEmptyObject(row.Kyc_MotherFirstName))
                                {
                                    $('#DV_TH #ddlMotherTitle').val(row.Kyc_MotherNamePrefix);
                                    $('#DV_TH #txtMotherFName').val(row.Kyc_MotherFirstName);
                                    $('#DV_TH #txtMotherMName').val(row.Kyc_MotherMiddletName);
                                    $('#DV_TH #txtMotherLName').val(row.Kyc_MotherLastName);
                                }
                                if (!row.IsMinor && row.Kyc_MaritalStatus == '01' && !$.isEmptyObject(row.Kyc_SpouseFirstName))
                                {
                                    $('#DV_TH #ddlSpouseTitle').val(row.Kyc_SpouseNamePrefix);
                                    $('#DV_TH #txtSpouseFName').val(row.Kyc_SpouseFirstName);
                                    $('#DV_TH #txtSpouseMName').val(row.Kyc_SpouseMiddleName);
                                    $('#DV_TH #txtSpouseLName').val(row.Kyc_SpouseLastName);
                                }
                                if (row.IsMinor && row.Kyc_MaritalStatus != '01' && !$.isEmptyObject(row.Kyc_GuardianFirstName))
                                {
                                    $('#DV_TH #ddlGuardianTitle').val(row.Kyc_GuardianNamePrefix);
                                    $('#DV_TH #txtGuardianFName').val(row.Kyc_GuardianFirstName);
                                    $('#DV_TH #txtGuardianMName').val(row.Kyc_GuardianMiddleName);
                                    $('#DV_TH #txtGuardianLName').val(row.Kyc_GuardianLastName);
                                    $('#DV_TH #txtGuardianPAN').val(row.Kyc_Guardian_PAN);
                                }
                                $('#DV_TH #ddlGender').val(row.Kyc_Gender);
                                $('#DV_TH #ddlOccupation').val(row.Kyc_Occupation_Code);
                                $('#DV_TH #txtPAN').val(row.Kyc_PAN);
                                $('#DV_TH #hdnMobilisationMode').val(row.MobilisationMode);
                                $('#DV_TH_P_ADDR #txtAdd1').val(row.PER_Address1);
                                $('#DV_TH_P_ADDR #txtAdd2').val(row.PER_Address2);
                                $('#DV_TH_P_ADDR #txtAdd3').val(row.PER_Address3);
                                $('#DV_TH_P_ADDR #ddlCountry').val(row.PER_AddCountry_Code).change();
                                $('#DV_TH_P_ADDR #txtCity').val(row.PER_Address_City_Desc);
                                $('#DV_TH_P_ADDR #txtPin').val(row.PER_AddPin).keyup();
                                $('#DV_TH_P_ADDR #txtState').val(row.PER_AddState_Desc);
                                $('#DV_TH_P_ADDR #txtDistrict').val(row.PER_Address_District_Desc);
                                $('#DV_TH_P_ADDR #txtTelephone').val(row.PER_ResTelNumber);
                                $('#DV_TH_P_ADDR #txtMobileNo').val(row.PER_MobileNumber);
                                $('#DV_TH_P_ADDR #txtEmailId').val(row.PER_EmailAdd);
                                $('#DV_TH #ddlAnnualIncome').val(row.Kyc_AnnualIncome_Code);

                                if (!$.isEmptyObject(row.MAIL_Address1))
                                {
                                    $('#DV_TH_M_ADDR #txtAdd1').val(row.MAIL_Address1);
                                    $('#DV_TH_M_ADDR #txtAdd2').val(row.MAIL_Address2);
                                    $('#DV_TH_M_ADDR #txtAdd3').val(row.MAIL_Address3);
                                    $('#DV_TH_M_ADDR #ddlCountry').val(row.MAIL_AddCountry_Code).change();
                                    $('#DV_TH_M_ADDR #txtCity').val(row.MAIL_Address_City_Desc);
                                    $('#DV_TH_M_ADDR #txtPin').val(row.MAIL_AddPin).keyup();
                                    $('#DV_TH_M_ADDR #txtState').val(row.MAIL_AddState_Desc);
                                    $('#DV_TH_M_ADDR #txtDistrict').val(row.MAIL_Address_District_Desc);
                                }

                                if (BTP_OBJECT.TH_DATA_SOURCE == 'CKYC')
                                    TH_CKYC_Validations();
                                $('#DV_PROV_TH').hide();
                                $('#DV_TH_SEARCH').hide();
                                $('#DV_TH_DTLS').show();
                            }

                            //Nominee
                            if (row.Holder_Type == '04' && $('#chkNomApplicable').prop('checked'))
                            {
                                if ($.isEmptyObject(IsDocUploaded()) && BTP_OBJECT.OVDSave == false)
                                    $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');

                                $("#ddlNomTitle").val(row.Kyc_NamePrefix);
                                $("#txtNomFName").val(row.Kyc_FirstName);
                                $("#txtNomMName").val(row.Kyc_MiddleName);
                                $("#txtNomLName").val(row.Kyc_LastName);
                                $("#ddlNomRelation").val(row.Nominee_Relations);
                                if (row.Kyc_DOB != null)
                                    $("#txtNomDOB").datetextentry('set_date', row.Kyc_DOB);
                                $('#DV_NOM #txtAdd1').val(row.PER_Address1);
                                $('#DV_NOM #txtAdd2').val(row.PER_Address2);
                                $('#DV_NOM #txtAdd3').val(row.PER_Address3);
                                $('#DV_NOM #ddlCountry').val(row.PER_AddCountry_Code).change();
                                $('#DV_NOM #txtCity').val(row.PER_Address_City_Desc);
                                $('#DV_NOM #txtPin').val(row.PER_AddPin).change();
                                $('#DV_NOM #txtState').val(row.PER_AddState_Desc).change();
                                $('#DV_NOM #txtDistrict').val(row.PER_Address_District_Desc).change();
                                $('#DV_NOM #txtTelephone').val(row.PER_ResTelNumber);
                                $('#DV_NOM #txtMobileNo').val(row.PER_MobileNumber);
                                $('#DV_NOM #txtEmailId').val(row.PER_EmailAdd);
                                if (row.IsMinor && !$.isEmptyObject(row.Kyc_GuardianFirstName))
                                {
                                    $('#chkIsNomMinor').prop('checked', true)
                                        .change();
                                    $("#ddlNomGuardianTitle").val(row.Kyc_GuardianNamePrefix);
                                    $("#txtNomGuardianFName").val(row.Kyc_GuardianFirstName);
                                    $("#txtNomGuardianMName").val(row.Kyc_GuardianMiddleName);
                                    $("#txtNomGuardianLName").val(row.Kyc_GuardianLastName);
                                }

                                $('#DV_PROV_NOM').hide();
                                $('#DV_NOM_DTLS').show();
                            }
                        });
                    }

                    //Fatca Citizenship
                    if (!$.isEmptyObject(result.Table5) && result.Table5.length > 0)
                    {
                        $.each(result.Table5, function (i, row)
                        {
                            if (row.HolderType == '01')
                                $('#DV_FH_FATCA #ddlCitizenShip_CitizenShip')[0].sumo.selectItem(row.Citizen_Country_Code);
                            if (row.HolderType == '02')
                                $('#DV_SH_FATCA #ddlCitizenShip_CitizenShip')[0].sumo.selectItem(row.Citizen_Country_Code);
                            if (row.HolderType == '03')
                                $('#DV_TH_FATCA #ddlCitizenShip_CitizenShip')[0].sumo.selectItem(row.Citizen_Country_Code);
                        });
                    }

                    //Fatca Hdr
                    if (!$.isEmptyObject(result.Table6) && result.Table6.length > 0)
                    {
                        $.each(result.Table6, function (i, FatcaHeader)
                        {
                            var FatcaHeader = result.Table6[0];

                            if (FatcaHeader.HolderType == '01')
                            {
                                $('#DV_FH_FATCA #ddlNationalityH').val(FatcaHeader.Nationality_Code);
                                $('#DV_FH_FATCA #ddlcountryBirthHead').val(FatcaHeader.CountryOfBirth_Code);
                                $('#DV_FH_FATCA #txtcityBirthHead').val(FatcaHeader.CityOfBirth_Name);
                                $('#DV_FH_FATCA #txtFathernameHead').val(FatcaHeader.Father_Name);
                                $('#DV_FH_FATCA #txtSpousenameHead').val(FatcaHeader.Spouse_Name);
                                $('#DV_FH_FATCA #ddloccupationHead').val(FatcaHeader.Occupation_code);
                            }

                            if (FatcaHeader.HolderType == '02')
                            {
                                $('#DV_SH_FATCA #ddlNationalityH').val(FatcaHeader.Nationality_Code);
                                $('#DV_SH_FATCA #ddlcountryBirthHead').val(FatcaHeader.CountryOfBirth_Code);
                                $('#DV_SH_FATCA #txtcityBirthHead').val(FatcaHeader.CityOfBirth_Name);
                                $('#DV_SH_FATCA #txtFathernameHead').val(FatcaHeader.Father_Name);
                                $('#DV_SH_FATCA #txtSpousenameHead').val(FatcaHeader.Spouse_Name);
                                $('#DV_SH_FATCA #ddloccupationHead').val(FatcaHeader.Occupation_code);
                            }

                            if (FatcaHeader.HolderType == '03')
                            {
                                $('#DV_TH_FATCA #ddlNationalityH').val(FatcaHeader.Nationality_Code);
                                $('#DV_TH_FATCA #ddlcountryBirthHead').val(FatcaHeader.CountryOfBirth_Code);
                                $('#DV_TH_FATCA #txtcityBirthHead').val(FatcaHeader.CityOfBirth_Name);
                                $('#DV_TH_FATCA #txtFathernameHead').val(FatcaHeader.Father_Name);
                                $('#DV_TH_FATCA #txtSpousenameHead').val(FatcaHeader.Spouse_Name);
                                $('#DV_TH_FATCA #ddloccupationHead').val(FatcaHeader.Occupation_code);
                            }
                        });
                    }

                    //Fatca Dtl
                    if (!$.isEmptyObject(result.Table7) && result.Table7.length > 0)
                    {

                        var FH_counter = 1;
                        var SH_counter = 1;
                        var TH_counter = 1;
                        $('#DV_FH_FATCA #tblDetailList > tbody').empty();
                        $('#DV_SH_FATCA #tblDetailList > tbody').empty();
                        $('#DV_TH_FATCA #tblDetailList > tbody').empty();

                        $.each(result.Table7, function (i, row)
                        {
                            var FH_htmlstr = ''
                            var SH_htmlstr = ''
                            var TH_htmlstr = ''

                            if (row.HolderType == '01')
                            {
                                FH_htmlstr += '<tr class="Key" id="' + FH_counter + '">';

                                FH_htmlstr += '<td class="text-center"><button type="button" id="btnedit' + FH_counter + '" class="btn btn-orange btn-small btnTblEdit" onclick="FH_tbledit(this,' + FH_counter + ')">Edit</button></td>';
                                FH_htmlstr += "<td class='text-center'><button type='button'  class='btn btn-orange btn-small' onclick='Delete(this)'>Delete</button></td>";
                                FH_htmlstr += '<td id="country' + FH_counter + '" code="' + row.TaxResident_CountryCode + '">' + row.TaxResident_CountryName + '</td>';
                                FH_htmlstr += '<td id="taxIdentity' + FH_counter + '"  code="' + row.TaxIdentificationTypeCode + '">' + row.TaxIdentificationTypeDec + '</td>';
                                FH_htmlstr += '<td id="tax' + FH_counter + '">' + row.TaxIdentificationNumber + '</td>';
                                FH_htmlstr += '<td id="trcDate' + FH_counter + '">' + row.TRCExpiryDate + '</td>';
                                FH_htmlstr += '<td id="addressType' + FH_counter + '" code="' + row.Address_TypeCode + '" >' + row.Address_TypeDesc + '</td>';
                                FH_htmlstr += '<td id="address1' + FH_counter + '">' + row.Address1 + '</td>';
                                FH_htmlstr += '<td id="address2' + FH_counter + '">' + row.Address2 + '</td>';
                                FH_htmlstr += '<td id="Landmark' + FH_counter + '">' + row.Landmark + '</td>';
                                FH_htmlstr += '<td id="state' + FH_counter + '" code="' + row.State_Code + '">' + row.State_Name + '</td>';
                                FH_htmlstr += '<td id="city' + FH_counter + '">' + row.City + '</td>';
                                FH_htmlstr += '<td id="postalcode' + FH_counter + '">' + row.Postalcode + '</td>';
                                FH_htmlstr += '<td id="stdCodePrimary' + FH_counter + '">' + row.STD_Code_Primary + '</td>';
                                FH_htmlstr += '<td id="telNumberpriamry' + FH_counter + '">' + row.Telephone_Number_Primary + '</td>';
                                FH_htmlstr += '<td id="MobNumberprimary' + FH_counter + '">' + row.Mobile_Number_Primary + '</td>';
                                FH_htmlstr += '<td id="stdCodeother' + FH_counter + '">' + row.STD_Code_Other + '</td>';
                                FH_htmlstr += '<td id="telNumberother' + FH_counter + '">' + row.Telephone_Number_Other + '</td>';
                                FH_htmlstr += '<td id="mobNumberother' + FH_counter + '">' + row.Mobile_Number_Other + '</td>';
                                FH_htmlstr += '</tr>';
                                $('#DV_FH_FATCA #tblDetailList > tbody').append(FH_htmlstr);

                                FH_counter += 1;
                            }

                            if (row.HolderType == '02')
                            {
                                SH_htmlstr += '<tr class="Key" id="' + SH_counter + '">';

                                SH_htmlstr += '<td class="text-center"><button type="button" id="btnedit' + SH_counter + '" class="btn btn-orange btn-small btnTblEdit" onclick="FH_tbledit(this,' + SH_counter + ')">Edit</button></td>';
                                SH_htmlstr += "<td class='text-center'><button type='button'  class='btn btn-orange btn-small' onclick='Delete(this)'>Delete</button></td>";
                                SH_htmlstr += '<td id="country' + SH_counter + '" code="' + row.TaxResident_CountryCode + '">' + row.TaxResident_CountryName + '</td>';
                                SH_htmlstr += '<td id="taxIdentity' + SH_counter + '"  code="' + row.TaxIdentificationTypeCode + '">' + row.TaxIdentificationTypeDec + '</td>';
                                SH_htmlstr += '<td id="tax' + SH_counter + '">' + row.TaxIdentificationNumber + '</td>';
                                SH_htmlstr += '<td id="trcDate' + SH_counter + '">' + row.TRCExpiryDate + '</td>';
                                SH_htmlstr += '<td id="addressType' + SH_counter + '" code="' + row.Address_TypeCode + '" >' + row.Address_TypeDesc + '</td>';
                                SH_htmlstr += '<td id="address1' + SH_counter + '">' + row.Address1 + '</td>';
                                SH_htmlstr += '<td id="address2' + SH_counter + '">' + row.Address2 + '</td>';
                                SH_htmlstr += '<td id="Landmark' + SH_counter + '">' + row.Landmark + '</td>';
                                SH_htmlstr += '<td id="state' + SH_counter + '" code="' + row.State_Code + '">' + row.State_Name + '</td>';
                                SH_htmlstr += '<td id="city' + SH_counter + '">' + row.City + '</td>';
                                SH_htmlstr += '<td id="postalcode' + SH_counter + '">' + row.Postalcode + '</td>';
                                SH_htmlstr += '<td id="stdCodePrimary' + SH_counter + '">' + row.STD_Code_Primary + '</td>';
                                SH_htmlstr += '<td id="telNumberpriamry' + SH_counter + '">' + row.Telephone_Number_Primary + '</td>';
                                SH_htmlstr += '<td id="MobNumberprimary' + SH_counter + '">' + row.Mobile_Number_Primary + '</td>';
                                SH_htmlstr += '<td id="stdCodeother' + SH_counter + '">' + row.STD_Code_Other + '</td>';
                                SH_htmlstr += '<td id="telNumberother' + SH_counter + '">' + row.Telephone_Number_Other + '</td>';
                                SH_htmlstr += '<td id="mobNumberother' + SH_counter + '">' + row.Mobile_Number_Other + '</td>';
                                SH_htmlstr += '</tr>';
                                $('#DV_SH_FATCA #tblDetailList > tbody').append(SH_htmlstr);

                                SH_counter += 1;
                            }

                            if (row.HolderType == '03')
                            {
                                TH_htmlstr += '<tr class="Key" id="' + TH_counter + '">';

                                TH_htmlstr += '<td class="text-center"><button type="button" id="btnedit' + TH_counter + '" class="btn btn-orange btn-small btnTblEdit" onclick="FH_tbledit(this,' + TH_counter + ')">Edit</button></td>';
                                TH_htmlstr += "<td class='text-center'><button type='button'  class='btn btn-orange btn-small' onclick='Delete(this)'>Delete</button></td>";
                                TH_htmlstr += '<td id="country' + TH_counter + '" code="' + row.TaxResident_CountryCode + '">' + row.TaxResident_CountryName + '</td>';
                                TH_htmlstr += '<td id="taxIdentity' + TH_counter + '"  code="' + row.TaxIdentificationTypeCode + '">' + row.TaxIdentificationTypeDec + '</td>';
                                TH_htmlstr += '<td id="tax' + TH_counter + '">' + row.TaxIdentificationNumber + '</td>';
                                TH_htmlstr += '<td id="trcDate' + TH_counter + '">' + row.TRCExpiryDate + '</td>';
                                TH_htmlstr += '<td id="addressType' + TH_counter + '" code="' + row.Address_TypeCode + '" >' + row.Address_TypeDesc + '</td>';
                                TH_htmlstr += '<td id="address1' + TH_counter + '">' + row.Address1 + '</td>';
                                TH_htmlstr += '<td id="address2' + TH_counter + '">' + row.Address2 + '</td>';
                                TH_htmlstr += '<td id="Landmark' + TH_counter + '">' + row.Landmark + '</td>';
                                TH_htmlstr += '<td id="state' + TH_counter + '" code="' + row.State_Code + '">' + row.State_Name + '</td>';
                                TH_htmlstr += '<td id="city' + TH_counter + '">' + row.City + '</td>';
                                TH_htmlstr += '<td id="postalcode' + TH_counter + '">' + row.Postalcode + '</td>';
                                TH_htmlstr += '<td id="stdCodePrimary' + TH_counter + '">' + row.STD_Code_Primary + '</td>';
                                TH_htmlstr += '<td id="telNumberpriamry' + TH_counter + '">' + row.Telephone_Number_Primary + '</td>';
                                TH_htmlstr += '<td id="MobNumberprimary' + TH_counter + '">' + row.Mobile_Number_Primary + '</td>';
                                TH_htmlstr += '<td id="stdCodeother' + TH_counter + '">' + row.STD_Code_Other + '</td>';
                                TH_htmlstr += '<td id="telNumberother' + TH_counter + '">' + row.Telephone_Number_Other + '</td>';
                                TH_htmlstr += '<td id="mobNumberother' + TH_counter + '">' + row.Mobile_Number_Other + '</td>';
                                TH_htmlstr += '</tr>';
                                $('#DV_TH_FATCA #tblDetailList > tbody').append(TH_htmlstr);

                                TH_counter += 1;
                            }

                        });
                    }
                    else
                    {
                        $('#DV_FH_FATCA #tblDetailList tbody').html("");
                        $('#DV_SH_FATCA #tblDetailList tbody').html("");
                        $('#DV_TH_FATCA #tblDetailList tbody').html("");
                    }

                    if (!$.isEmptyObject(result.Table8) && result.Table8.length > 0)
                        BindOVD(Appl_No);

                    if (BTP_OBJECT.FH_DATA_SOURCE == 'CKYC')
                        FH_CKYC_Validations();
                    $('#DV_APPL_LIST').slideUp();
                    $('#btnfreshcutomer').hide();
                    $('#addfreshInv').hide();
                    $('#IdInfoDiv').slideDown();
                    $('#IdInvestorSearch').hide();
                    $('#DV_FH_CKYC_SEARCH').hide();
                    $('#DV_INV_DETAILS').show();
                    $('#IdInvestorInfo').slideDown();
                    $('#DV_DATAENTRY').slideDown();

                }
                else if (!$.isEmptyObject(result) && result.Table.length > 0 && result.Table[0].Status == 0)
                {
                    if (!$.isEmptyObject(result.Table[0].Msg))
                    {
                        BtpMessagePopup(result.Table[0].Msg, 'error');
                    }
                    else
                    {
                        BtpMessagePopup('', 'error');
                    }
                }
                else
                {
                    BtpMessagePopup('', 'error');
                }


                $('#preloader').hide();


            } catch (e)
            {
                fnException(e)
            }
        }, null, true, false, false, ErrorFunction);

    } catch (e)
    {
        fnException(e);
    }
});


$('#btnBack01').click(function ()
{
    Reset();
    $('#DV_APPL_LIST').slideDown();
    $('#DV_DATAENTRY').slideUp();

});

//step1 submit
function SubmitStep1()
{
    try
    {
        let err_msg = isValidStep1();
        if (!$.isEmptyObject(err_msg))
        {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }

        let objFrontOffice = getStep1Data();

        if (FH_PAN_VERIFICATION_COPY()) {
            ExtendedAjaxCall('InvestorDetailsSave/SubmitStep1Copy', objFrontOffice, 'POST', function (result) {
                try {
                    if (!$.isEmptyObject(result) && result[0].Status == 1 && !$.isEmptyObject(result[0].Msg)) {
                        BTP_OBJECT.FrontOfficeSave = true;
                        if ($.isEmptyObject($('#lblApplicationNumber').text().trim()))
                            BtpMessagePopup(result[0].Msg, "success");
                        $('#hdnApplicationNumber').val(result[0].Appl_No);
                        $('#lblApplicationNumber').text(result[0].Appl_No);
                    }
                    else if (!$.isEmptyObject(result) && result[0].Status == 0 && !$.isEmptyObject(result[0].Msg))
                        err_msg += '<p>' + result[0].Msg + '</p>';
                    else
                        err_msg += '<p>Something went wrong..!</p>';

                    $('#preloader').hide();

                } catch (e) {
                    fnException(e);
                }
            }, null, true, false, false, ErrorFunction);
        }
        else {
            return false;
        }

        if (!$.isEmptyObject(err_msg))
        {
            BtpMessagePopup(err_msg, 'error');
            return false;
        }
        return true;


    } catch (e)
    {
        fnException(e); return false;
    }
};

//step1 save validations
function isValidStep1()
{
    let err_msg = "";
    try
    {
        $('.FO_DTLS').removeClass('InputBorderRed');
        $('.D_T_E').removeClass('InputBorderRed');

        let regexNoSpecialChar = /^[a-zA-Z ]+$/;
        let regexNumberOnly = /[0-9]+/;
        let regexMob = /^[6789]\d{9}$/;

        let ddlDepositorsStatus = $('#lblDepositorCategory').text();
        let ApplicationType = $('[name="ApplicationType"]:Checked').val();
        let txtPhysicalApplNo = $('#txtPhysicalApplNo');
        let ddlInvtitle = $('#ddlInvtitle');
        let txtInvFirstName = $('#txtInvFirstName');
        let txtInvMiddleName = $('#txtInvMiddleName');
        let txtInvLastName = $('#txtInvLastName');
        let txtInvDOB = $('#txtInvDOB');
        let txtInvDOI = $('#txtInvDOI');
        let txtInvPan = $('#txtInvPan');
        let txtInvCKYCNumber = $('#txtInvCKYCNumber');
        let txtAmount = $('#txtAmount');
        let ddlBranch = $('#ddlBranch');
        let ddlInvPayment_Mode = $('#ddlInvPayment_Mode');
        let txtInvDrawn_Bank_Search = $('#txtInvDrawn_Bank_Search');
        let hdnDrawn_Bank_Name = $('#hdnDrawn_Bank_Name').val();
        let hdnBank_Branch_Name = $('#hdnBank_Branch_Name').val();
        let hdnBank_MICR = $('#hdnBank_MICR').val();
        let hdnBank_NEFT = $('#hdnBank_NEFT').val();
        let txtInvCheque_DD_No = $('#txtInvCheque_DD_No');
        let txtChequeDate = $('#txtChequeDate');
        let ddlCMSBranch = $('#ddlCMSBranch');
        let txtMobile = $('#txtMobile');
        let txtEmail = $('#txtEmail');
        let txtSubBrokerCode = $('#txtSubBrokerCode');
        let txtRemark = $('#txtRemark');

        if (ddlDepositorsStatus == '')
            err_msg += "<p>Depositor Status is required..!</p>";

        if ($.isEmptyObject(ApplicationType))
            err_msg += "<p>Application Type is required..!</p>";

        if ($.isEmptyObject(txtPhysicalApplNo.val()))
        {
            err_msg += "<p>Physical App No is required...!</p>";
            txtPhysicalApplNo.addClass('InputBorderRed');
        }

        if (ddlInvtitle.val() == 'select' || ddlInvtitle.val() == '' || ddlInvtitle.val() == null)
        {
            err_msg += "<p>Name Prefix is required...!</p>";
            ddlInvtitle.addClass('InputBorderRed');
        }

        if ($.isEmptyObject(txtInvFirstName.val()))
        {
            err_msg += "<p>First Name is required..!</p>";
            txtInvFirstName.addClass('InputBorderRed');
        }
        else if (!regexNoSpecialChar.test(txtInvFirstName.val()))
        {
            err_msg += "<p>First Name is not valid..!</p>";
            txtInvFirstName.addClass('InputBorderRed');
        }

        if (!$.isEmptyObject(txtInvMiddleName.val()) && !regexNoSpecialChar.test(txtInvMiddleName.val()))
        {
            err_msg += "<p>Middle Name is not valid..!</p>";
            txtInvMiddleName.addClass('InputBorderRed');
        }

        if (!$.isEmptyObject(txtInvLastName.val()) && !regexNoSpecialChar.test(txtInvLastName.val()))
        {
            err_msg += "<p>Last Name is not valid..!</p>";
            txtInvLastName.addClass('InputBorderRed');
        }

        //individual DOB
        if ($.isEmptyObject(txtInvDOB.val()) && ddlDepositorsStatus == 'INDIVIDUAL')
        {
            err_msg += "<p>DOB is required..!</p>";
            txtInvDOB.parent().addClass('InputBorderRed');
        }
        //non-individual DOI
        else if ($.isEmptyObject(txtInvDOI.val()) && ddlDepositorsStatus != 'INDIVIDUAL' && ddlDepositorsStatus != 'select')
        {
            err_msg += "<p>Date of Incorporation is required..!</p>";
            txtInvDOI.parent().addClass('InputBorderRed');
        }

        //PAN
        if (ddlDepositorsStatus == 'INDIVIDUAL' && $.isEmptyObject(txtInvPan.val()) && !IsMinor(txtInvDOB.val()))
        {
            err_msg += "<p>PAN is required..!</p>";
            txtInvPan.addClass('InputBorderRed');
        }
        else if (ddlDepositorsStatus != 'INDIVIDUAL' && $.isEmptyObject(txtInvPan.val()))
        {
            err_msg += "<p>PAN is required..!</p>";
            txtInvPan.addClass('InputBorderRed');
        }
        else if (!$.isEmptyObject(txtInvPan.val()) && !IsValidPAN(txtInvPan.val()))
        {
            err_msg += "<p>PAN is not valid..!</p>";
            txtInvPan.addClass('InputBorderRed');
        }
        else if (ddlDepositorsStatus == 'INDIVIDUAL' && IsValidPAN(txtInvPan.val()) && !IsMinor(txtInvDOB.val()))
        {
            err_msg += Check_PAN(txtInvPan.val(), txtInvDOB.val(), $('#lblApplicationNumber').text(), $('#lblFolioNumber').text().trim())
            txtInvPan.addClass('InputBorderRed');
        }
        else
        {
            txtInvPan.removeClass('InputBorderRed');
        }

        if (txtAmount.val().trim() == '')
        {
            err_msg += "<p>Amount is required..!</p>";
            txtAmount.addClass('InputBorderRed');
        }
        else if (!regexNumberOnly.test(txtAmount.val()))
        {
            err_msg += "<p>Amount is not valid..!</p>";
            txtAmount.addClass('InputBorderRed');
        }

        ExtendedAjaxCall('FDConfiguration/ValidateAmount?amount=' + txtAmount.val(), null, 'GET', function (result)
        {

            if (!$.isEmptyObject(result) && result.toUpperCase() != 'SUCCESS')
            {
                err_msg += "<p>" + result + "</p>";
                txtAmount.addClass('InputBorderRed');
            }
        }, null, null, false, false, ErrorFunction);

        if (!$.isEmptyObject(txtAmount.val()) && parseInt(txtAmount.val()) < parseInt(Min_Amount))
        {
            err_msg += "<p>Amount cannot be less than " + Min_Amount + "..!</p>";
            txtAmount.addClass('InputBorderRed');
        }

        if (ddlBranch.val() == 'select')
        {
            err_msg += "<p>Branch is required..!</p>";
            ddlBranch.addClass('InputBorderRed');
        }

        if (ddlInvPayment_Mode.val() == 'select')
        {
            err_msg += "<p>Mode Of Payment is required..!</p>";
            ddlInvPayment_Mode.addClass('InputBorderRed');
        }

        if (ddlInvPayment_Mode.val() == "3" || ddlInvPayment_Mode.val() == "4" ||ddlInvPayment_Mode.val() == "Cheque/DD" || ddlInvPayment_Mode.val() == "Cheque" || ddlInvPayment_Mode.val() == "Demand Draft")
        {
            if ($.isEmptyObject(hdnDrawn_Bank_Name))
            {
                err_msg += "<p>Please Enter Valid Bank name..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }
            if (hdnBank_Branch_Name.trim() == '')
            {
                err_msg += "<p>Please Enter Valid Bank Branch name..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }
            if (hdnBank_NEFT.trim() == '')
            {
                err_msg += "<p>Please Enter Valid Bank IFSC CODE ..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }
            if (hdnBank_MICR.trim() == '')
            {
                err_msg += "<p>Please Enter Valid MICR CODE..!</p>";
                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
            }

            if (txtInvCheque_DD_No.val().trim() == '')
            {
                err_msg += "<p>Please Enter Instrument Number..!</p>";
                txtInvCheque_DD_No.addClass('InputBorderRed');
            }
            else if (txtInvCheque_DD_No.val().length < 6)
            {
                err_msg += "<p>Please Enter Valid Instrument Number..!</p>";
                txtInvCheque_DD_No.addClass('InputBorderRed');
            }

            if (txtChequeDate.val().trim() == '')
            {
                err_msg += "<p>Please Enter cheque Date..!</p>";
                txtChequeDate.parent().addClass('InputBorderRed');
            }

            let chequeMsg = ValidateChequeDate(txtChequeDate.val().trim());
            if (chequeMsg != null)
            {
                err_msg += "<p>" + chequeMsg + "</p>";
                txtChequeDate.parent().addClass('InputBorderRed');
            }

            //if (EXC_CMS_MAPPING_FLAG == 1 && $('#hdnEXCCMSbankCode').val() == '')
            //{
            //    $("#txtEXCCMSbankName").css("border", "solid 1px red");
            //    errMessage += "<p>Please Select CMS Location ..!</p>";
            //    isError = true;
            //}
            //else if (EXC_CMS_MAPPING_FLAG == 0 && $('#ddlCMSbank').val().trim() == '0')
            //{
            //    $("#ddlCMSbank").css("border", "solid 1px red");
            //    errMessage += "<p>Please Select CMS Location ..!</p>";
            //    isError = true;

            //}

            if (ddlCMSBranch.val().trim() == 'select')
            {
                err_msg += "<p>Please Select CMS Location ..!</p>";
                ddlCMSBranch.addClass('InputBorderRed');
            }
        }

        if (txtMobile.val() == "")
        {
            err_msg += "<p>Please Enter Mobile Number..!</p>";
            txtMobile.addClass('InputBorderRed');
        }
        else if (!IsValidMobile(txtMobile.val()))
        {
            err_msg += "<p>Please Enter Valid Mobile Number..!</p>";
            txtMobile.addClass('InputBorderRed');
        }

        if (txtEmail.val() == "")
        {
            err_msg += "<p>Please Enter Email ID..!</p>";
            txtEmail.addClass('InputBorderRed');
        }
        else if (!IsValidEmail(txtEmail.val()))
        {
            err_msg += "<p>Please Enter Valid Email ID..!</p>";
            txtEmail.addClass('InputBorderRed');
        }


    } catch (e)
    {
        fnException(e);
    }
    return err_msg;
}

//get step1 data for save
function getStep1Data()
{
    let objFrontOffice = {}
    try
    {
        let ddlDepositorsStatus = $('#ddlDepositorsStatus').val();
        let ApplicationType = $('[name="ApplicationType"]:Checked').val();
        let txtPhysicalApplNo = $('#txtPhysicalApplNo').val();
        let ddlInvtitle = $('#ddlInvtitle').val();
        let txtInvFirstName = $('#txtInvFirstName').val();
        let txtInvMiddleName = $('#txtInvMiddleName').val();
        let txtInvLastName = $('#txtInvLastName').val();
        let txtInvDOB = $('#txtInvDOB').val();
        let txtInvDOI = $('#txtInvDOI').val();
        let txtInvPan = $('#txtInvPan').val();
        let txtInvCKYCNumber = $('#txtInvCKYCNumber').val();
        let txtAmount = $('#txtAmount').val();
        let ddlBranch = $('#ddlBranch').val();
        let ddlInvPayment_Mode = $('#ddlInvPayment_Mode').val();
        let txtInvDrawn_Bank_Search = $('#txtInvDrawn_Bank_Search').val();
        let hdnDrawn_Bank_Name = $('#hdnDrawn_Bank_Name').val();
        let hdnBank_Branch_Name = $('#hdnBank_Branch_Name').val();
        let hdnBank_MICR = $('#hdnBank_MICR').val();
        let hdnBank_NEFT = $('#hdnBank_NEFT').val();
        let txtInvCheque_DD_No = $('#txtInvCheque_DD_No').val();
        let txtChequeDate = $('#txtChequeDate').val();
        let ddlCMSBranch = $('#ddlCMSBranch').val();
        let txtMobile = $('#txtMobile').val();
        let txtEmail = $('#txtEmail').val();
        let txtSubBrokerCode = $('#txtSubBrokerCode').val();
        let txtRemark = $('#txtRemark').val();

        if (!$.isEmptyObject($('#lblApplicationNumber').text().trim()))
            objFrontOffice.Appl_No = $('#lblApplicationNumber').text().trim();
        else
            objFrontOffice.Copy_Appl_No = $('#hdnApplicationNumber').val();
        objFrontOffice.DepositorCategory = ddlDepositorsStatus == 'select' ? null : ddlDepositorsStatus.trim();
        objFrontOffice.ApplicationDeclarationType = ApplicationType;
        objFrontOffice.Physical = txtPhysicalApplNo.trim();
        objFrontOffice.Salutation = ddlInvtitle == 'select' ? null : ddlInvtitle.trim();
        objFrontOffice.FirstName = txtInvFirstName.trim();
        objFrontOffice.MiddleName = txtInvMiddleName.trim();
        objFrontOffice.LastName = txtInvLastName.trim();
        if (ddlDepositorsStatus == 'IND')
            objFrontOffice.DOB = txtInvDOB.trim();
        else
            objFrontOffice.DOB = txtInvDOI.trim();
        objFrontOffice.PAN = txtInvPan.trim();
        objFrontOffice.CKYCNumber = txtInvCKYCNumber.trim();
        objFrontOffice.Amount = txtAmount.trim();
        objFrontOffice.Agency_Usr_Branch_Name = ddlBranch == 'select' ? null : $('#ddlBranch option:selected').text().trim();
        objFrontOffice.Agency_Usr_Branch_Cd = ddlBranch == 'select' ? null : ddlBranch.trim();
        objFrontOffice.ModeOfPayment = ddlInvPayment_Mode == 'select' ? null : ddlInvPayment_Mode.trim();
        objFrontOffice.BankName = hdnDrawn_Bank_Name.trim();
        objFrontOffice.BranchName = hdnBank_Branch_Name.trim();
        objFrontOffice.IFSC_Code = hdnBank_NEFT.trim();
        objFrontOffice.MICR_Code = hdnBank_MICR.trim();
        objFrontOffice.Instrument_No = txtInvCheque_DD_No.trim();
        objFrontOffice.Cheque_Date = txtChequeDate.trim();
        if (!$.isEmptyObject(ddlCMSBranch))
        {
            objFrontOffice.Cms_Location_Code = ddlCMSBranch == 'select' ? null : ddlCMSBranch.trim();
            objFrontOffice.Cms_Location_Name = ddlCMSBranch == 'select' ? null : $('#ddlCMSBranch :Selected').text().trim();
        }
        objFrontOffice.Mobile = txtMobile.trim();
        objFrontOffice.Email = txtEmail.trim();
        objFrontOffice.SubBrokerCode = txtSubBrokerCode.trim();
        objFrontOffice.Remarks = txtRemark.trim();
        objFrontOffice.Existing_FDR_No = $('#lblExistingFDRNumber').text().trim();
        objFrontOffice.Folio_No = $('#lblFolioNumber').text().trim();
        objFrontOffice.Data_Source = BTP_OBJECT.FH_DATA_SOURCE;
        objFrontOffice.ApplicationType = BTP_OBJECT.ApplicationType == 'A' ? 'Existing' : 'Fresh';

        //if (EXC_CMS_MAPPING_FLAG == 1)
        //{
        //    objFrontOffice.CMSBankLocationcode = $('#hdnEXCCMSbankCode').val().trim();
        //    objFrontOffice.CMSBankLocationname = $('#txtEXCCMSbankName').val().trim();
        //}
        //else if (EXC_CMS_MAPPING_FLAG == 0)
        //{
        //    objFrontOffice.CMSBankLocationcode = $('#ddlCMSbank').val().trim();
        //    objFrontOffice.CMSBankLocationname = $('#ddlCMSbank option:selected').text().trim();
        //}
    } catch (e)
    {
        fnException(e);
    }
    return objFrontOffice;
}

//function IsValidSubmitStep1()
//{
//    try
//    {

//        $('.FO_DTLS').removeClass('InputBorderRed');
//        $('.D_T_E').removeClass('InputBorderRed');

//        let isError = false;
//        let errMessage = "";
//        let regexNoSpecialChar = /^[a-zA-Z ]+$/;
//        let regexNumberOnly = /[0-9]+/;
//        var regexMob = /^[6789]\d{9}$/;

//        let ddlDepositorsStatus = $('#lblDepositorCategory').text();
//        let ApplicationType = $('[name="ApplicationType"]:Checked').val();
//        let txtPhysicalApplNo = $('#txtPhysicalApplNo');
//        let ddlInvtitle = $('#ddlInvtitle');
//        let txtInvFirstName = $('#txtInvFirstName');
//        let txtInvMiddleName = $('#txtInvMiddleName');
//        let txtInvLastName = $('#txtInvLastName');
//        let txtInvDOB = $('#txtInvDOB');
//        let txtInvDOI = $('#txtInvDOI');
//        let txtInvPan = $('#txtInvPan');
//        let txtInvCKYCNumber = $('#txtInvCKYCNumber');
//        let txtAmount = $('#txtAmount');
//        let ddlBranch = $('#ddlBranch');
//        let ddlInvPayment_Mode = $('#ddlInvPayment_Mode');
//        let txtInvDrawn_Bank_Search = $('#txtInvDrawn_Bank_Search');
//        let hdnDrawn_Bank_Name = $('#hdnDrawn_Bank_Name').val();
//        let hdnBank_Branch_Name = $('#hdnBank_Branch_Name').val();
//        let hdnBank_MICR = $('#hdnBank_MICR').val();
//        let hdnBank_NEFT = $('#hdnBank_NEFT').val();
//        let txtInvCheque_DD_No = $('#txtInvCheque_DD_No');
//        let txtChequeDate = $('#txtChequeDate');
//        let ddlCMSBranch = $('#ddlCMSBranch');
//        let txtMobile = $('#txtMobile');
//        let txtEmail = $('#txtEmail');
//        let txtSubBrokerCode = $('#txtSubBrokerCode');
//        let txtRemark = $('#txtRemark');





//        if (ddlDepositorsStatus == '')
//        {
//            errMessage += "<p>Depositor Status is required..!</p>";
//            isError = true;
//        }

//        if ($.isEmptyObject(ApplicationType))
//        {
//            errMessage += "<p>Application Type is required..!</p>";
//            isError = true;
//        }

//        if ($.isEmptyObject(txtPhysicalApplNo.val()))
//        {
//            errMessage += "<p>Physical App No is required...!</p>";
//            txtPhysicalApplNo.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (ddlInvtitle.val() == 'select')
//        {
//            errMessage += "<p>Name Prefix is required...!</p>";
//            ddlInvtitle.addClass('InputBorderRed');
//            isError = true;
//        }

//        if ($.isEmptyObject(txtInvFirstName.val()))
//        {
//            errMessage += "<p>First Name is required..!</p>";
//            txtInvFirstName.addClass('InputBorderRed');
//            isError = true;
//        }
//        else if (!regexNoSpecialChar.test(txtInvFirstName.val()))
//        {
//            errMessage += "<p>First Name is not valid..!</p>";
//            txtInvFirstName.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (!$.isEmptyObject(txtInvMiddleName.val()) && !regexNoSpecialChar.test(txtInvMiddleName.val()))
//        {
//            errMessage += "<p>Middle Name is not valid..!</p>";
//            txtInvMiddleName.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (!$.isEmptyObject(txtInvLastName.val()) && !regexNoSpecialChar.test(txtInvLastName.val()))
//        {
//            errMessage += "<p>Last Name is not valid..!</p>";
//            txtInvLastName.addClass('InputBorderRed');
//            isError = true;
//        }

//        //TODO: DOB, PAN

//        if ($.isEmptyObject(txtInvDOB.val()) && ddlDepositorsStatus == 'INDIVIDUAL')
//        {
//            errMessage += "<p>DOB is required..!</p>";
//            txtInvDOB.parent().addClass('InputBorderRed');
//            isError = true;
//        }
//        else if ($.isEmptyObject(txtInvDOI.val()) && ddlDepositorsStatus != 'INDIVIDUAL' && ddlDepositorsStatus != 'select')
//        {
//            errMessage += "<p>Date of Incorporation is required..!</p>";
//            txtInvDOI.parent().addClass('InputBorderRed');
//            isError = true;
//        }

//        if ($.isEmptyObject(txtInvPan.val()))
//        {
//            errMessage += "<p>PAN is required..!</p>";
//            txtInvPan.addClass('InputBorderRed');
//            isError = true;
//        }
//        else if (!IsValidPAN(txtInvPan.val()))
//        {
//            errMessage += "<p>PAN is not valid..!</p>";
//            txtInvPan.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (txtAmount.val().trim() == '')
//        {
//            errMessage += "<p>Amount is required..!</p>";
//            txtAmount.addClass('InputBorderRed');
//            isError = true;
//        }
//        else if (!regexNumberOnly.test(txtAmount.val()))
//        {
//            errMessage += "<p>Amount is not valid..!</p>";
//            txtAmount.addClass('InputBorderRed');
//            isError = true;
//        }

//        ExtendedAjaxCall('FDConfiguration/ValidateAmount?amount=' + txtAmount.val(), null, 'GET', function (result)
//        {

//            if (!$.isEmptyObject(result) && result.toUpperCase() != 'SUCCESS')
//            {
//                errMessage += "<p>" + result + "</p>";
//                txtAmount.addClass('InputBorderRed');
//                isError = true;
//            }
//        }, null, null, false, false, ErrorFunction);

//        if (!$.isEmptyObject(txtAmount.val()) && parseInt(txtAmount.val()) < parseInt(Min_Amount))
//        {
//            errMessage += "<p>Amount cannot be less than " + Min_Amount + "..!</p>";
//            txtAmount.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (ddlBranch.val() == 'select')
//        {
//            errMessage += "<p>Branch is required..!</p>";
//            ddlBranch.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (ddlInvPayment_Mode.val() == 'select')
//        {
//            errMessage += "<p>Mode Of Payment is required..!</p>";
//            ddlInvPayment_Mode.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (ddlInvPayment_Mode.val() == "Cheque/DD")
//        {
//            if ($.isEmptyObject(hdnDrawn_Bank_Name))
//            {
//                errMessage += "<p>Please Enter Valid Bank name..!</p>";
//                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
//                isError = true;
//            }
//            if (hdnBank_Branch_Name.trim() == '')
//            {
//                errMessage += "<p>Please Enter Valid Bank Branch name..!</p>";
//                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
//                isError = true;
//            }
//            if (hdnBank_NEFT.trim() == '')
//            {
//                errMessage += "<p>Please Enter Valid Bank IFSC CODE ..!</p>";
//                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
//                isError = true;
//            }
//            if (hdnBank_MICR.trim() == '')
//            {
//                errMessage += "<p>Please Enter Valid MICR CODE..!</p>";
//                txtInvDrawn_Bank_Search.addClass('InputBorderRed');
//                isError = true;
//            }

//            if (txtInvCheque_DD_No.val().trim() == '')
//            {
//                errMessage += "<p>Please Enter Instrument Number..!</p>";
//                txtInvCheque_DD_No.addClass('InputBorderRed');
//                isError = true;
//            }
//            else if (txtInvCheque_DD_No.val().length < 6)
//            {
//                errMessage += "<p>Please Enter Valid Instrument Number..!</p>";
//                txtInvCheque_DD_No.addClass('InputBorderRed');
//                isError = true;
//            }

//            if (txtChequeDate.val().trim() == '')
//            {
//                errMessage += "<p>Please Enter cheque Date..!</p>";
//                txtChequeDate.parent().addClass('InputBorderRed');
//                isError = true;
//            }

//            let chequeMsg = ValidateChequeDate(txtChequeDate.val().trim());
//            if (chequeMsg != null)
//            {
//                errMessage += "<p>" + chequeMsg + "</p>";
//                txtChequeDate.parent().addClass('InputBorderRed');
//                isError = true;
//            }

//            //if (EXC_CMS_MAPPING_FLAG == 1 && $('#hdnEXCCMSbankCode').val() == '')
//            //{
//            //    $("#txtEXCCMSbankName").css("border", "solid 1px red");
//            //    errMessage += "<p>Please Select CMS Location ..!</p>";
//            //    isError = true;
//            //}
//            //else if (EXC_CMS_MAPPING_FLAG == 0 && $('#ddlCMSbank').val().trim() == '0')
//            //{
//            //    $("#ddlCMSbank").css("border", "solid 1px red");
//            //    errMessage += "<p>Please Select CMS Location ..!</p>";
//            //    isError = true;

//            //}

//            if (ddlCMSBranch.val().trim() == 'select')
//            {
//                errMessage += "<p>Please Select CMS Location ..!</p>";
//                ddlCMSBranch.addClass('InputBorderRed');
//                isError = true;

//            }


//        }

//        if (txtMobile.val() == "")
//        {
//            errMessage += "<p>Please Enter Mobile Number..!</p>";
//            txtMobile.addClass('InputBorderRed');
//            isError = true;
//        }
//        else if (!IsValidMobile(txtMobile.val()))
//        {
//            errMessage += "<p>Please Enter Valid Mobile Number..!</p>";
//            txtMobile.addClass('InputBorderRed');
//            isError = true;
//        }

//        if (txtEmail.val() == "")
//        {
//            errMessage += "<p>Please Enter Email ID..!</p>";
//            txtEmail.addClass('InputBorderRed');
//            isError = true;
//        }
//        else if (!IsValidEmail(txtEmail.val()))
//        {
//            errMessage += "<p>Please Enter Valid Email ID..!</p>";
//            txtEmail.addClass('InputBorderRed');
//            isError = true;
//        }


//        //error message
//        if (isError)
//        {
//            BtpMessagePopup(errMessage, 'error');
//            return false;
//        }


//        return true;
//    } catch (e)
//    {
//        fnException(e);
//    }
//}

$('#btnCancel01').bind('click', Reset_step1);

function Reset_step1()
{
    $('.errorbox').text('').hide();
    $('.form-control').removeClass('InputBorderRed');
    $('.D_T_E').removeClass('InputBorderRed');

    if (!$.isEmptyObject($('#lblApplicationNumber').text())) 
    {
        if (BTP_OBJECT.ApplicationType == 'F')
        {
            $('#rdoPhysical,#rdoDigital').prop('checked', false);

            if (!$('#ddlInvtitle').prop('disabled'))
            {
                $('#ddlInvtitle').val('select').change();
            }

            if (!$('#txtInvFirstName').prop('disabled'))
            {
                $('#txtInvFirstName').val('').change();
            }

            if (!$('#txtInvMiddleName').prop('disabled'))
            {
                $('#txtInvMiddleName').val('').change();
            }

            if (!$('#txtInvLastName').prop('disabled'))
            {
                $('#txtInvLastName').val('').change();
            }

            if (!$('#txtInvPan').prop('disabled'))
            {
                $('#txtInvPan').val('').change();
            }

            if (!$('#txtMobile').prop('disabled'))
            {
                $('#txtMobile').val('').change();
            }

            if (!$('#txtEmail').prop('disabled'))
            {
                $('#txtEmail').val('').change();
            }
        }
        else
        {
            $('#txtInvDOB').datetextentry('set_date', null);
        }
    }
    else
    {

    }
    $('#txtInvDrawn_Bank_Search,#hdnDrawn_Bank_Name,#hdnBank_Branch_Name,#hdnBank_MICR,#hdnBank_NEFT,#txtInvCheque_DD_No,#txtPhysicalApplNo,#txtAmount,#txtSubBrokerCode,#txtRemark').val('');
    $('#ddlBranch,#ddlInvPayment_Mode,#ddlCMSBranch').val('select').change();
    $('#txtChequeDate').datetextentry('set_date', null);
    $('#txtamountinwords').text('');
    $('#txtPhysicalApplNo').val('0000');
}


const FH_PAN_VERIFICATION_COPY = function () {
    let isVerified = false;
    if (BTP_OBJECT.FH_DATA_SOURCE == 'FRESH') {
        $("#DV_FH_P_ADDR").hide();
        $("#Address_hdr_FH").hide();
        $("#DV_FH_M_ADDR").hide();
        $("#Other_address_FH").hide();
    }
    else {
        $("#DV_FH_P_ADDR").show();
        $("#Address_hdr_FH").show();
        $("#DV_FH_M_ADDR").show();
        $("#Other_address_FH").show();
    }
    try {
        if (!$.isEmptyObject($('#txtInvPan').val()) && IsValidPAN($('#txtInvPan').val()) && (BTP_OBJECT.FH_DATA_SOURCE == 'CKYC' || BTP_OBJECT.FH_DATA_SOURCE == 'FRESH')) {
            let objReqBO = {};
            objReqBO.Source_Type = "CPTP_UNI_DIGI";
            objReqBO.Holder_Type = '01';
            objReqBO.User_Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
            objReqBO.Remarks = "BOTC_UNI";
            objReqBO.PAN_Holder_Name = $('#txtInvFirstName').val().trim() + ' ' + $('#txtInvMiddleName').val().trim() + ' ' + $('#txtInvLastName').val().trim();
            objReqBO.PAN_Holder_DOB = $('#txtInvDOB').val().trim();
            objReqBO.PAN_No = $('#txtInvPan').val();
            objReqBO.FH_DATA_SOURCE = BTP_OBJECT.FH_DATA_SOURCE;

            ExtendedAjaxCall('PAN_Verification', objReqBO, 'POST', function (result) {
                if (!$.isEmptyObject(result) && result.PAN_DOB_Match_Status == '1' && result.Status == 'Success') {
                    //$('#txtInvPan').next().addClass('successBox').text('PAN verified successfully from NSDL.').fadeIn('slow').delay(5000).hide(1);
                    isVerified = true;
                }
                else if (!$.isEmptyObject(result) && result.PAN_DOB_Match_Status == '0') {
                    $('#Model_FH_PAN_VERIFICATION_Msg_1').modal('show');
                }
                else if (result.Status == 'Fail') {
                    $('#Model_FH_NM_SCR_Msg').modal('show');
                }
                else {
                    $('#Model_FH_PAN_VERIFICATION_Msg').modal('show');
                }

                $('#preloader').hide();

            }, null, true, false, false);
        }
        else {
            isVerified = true;
        }
    } catch (e) {
        fnException(e);
    }
    return isVerified;
}