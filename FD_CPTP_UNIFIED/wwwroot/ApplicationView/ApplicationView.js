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
    BindApplicationEditGrid();
});

function BindApplicationEditGrid()
{
    try
    {

        ExtendedAjaxCall('ApplicationView/GET_APPLS_FOR_VIEWAsync', null, 'GET', function (result)
        {
            var htmlstr = "";
            if (!$.isEmptyObject(result))
            {
                $.each(result, function (i, row)
                {
                    htmlstr += '<tr class="text-center">';
                    htmlstr += '<td><button type="button" class="comnBtn2" style="margin:0" onclick="VIEW(this)"  value="' + $.trim(row.Appl_No) + '">VIEW</button></td>';
                    htmlstr += '<td>' + row.Appl_No + '</td>';
                    htmlstr += '<td>' + row.Appl_Date + '</td>';
                    htmlstr += '<td>' + row.ApplicationDeclarationType + '</td>';
                    htmlstr += '<td>' + row.InvestorFullName + '</td>';
                    htmlstr += '<td>' + row.DOB + '</td>';
                    htmlstr += '<td>' + row.Amount + '</td>';
                    htmlstr += '<td>' + row.ModeOfPayment + '</td>';
                    htmlstr += '<td>' + row.Mobile + '</td>';
                    htmlstr += '<td>' + row.Email + '</td>';
                    htmlstr += '<td>' + row.CreatedBy + '</td>';
                    //htmlstr += '<td>' + row.CreatedDate + '</td>';


                    htmlstr += '</tr>';
                });

            }

            $('#tblApplData').DataTable().destroy();
            $('#tblApplData tbody').html(htmlstr);
            $('#tblApplData').DataTable({
                destroy: true,
                //"order": [[2, "asc"]],
                initComplete: function ()
                {

                }
            });

            $('#preloader').hide();
        }, null, true, true, false, ErrorFunction);

    } catch (e)
    {
        fnException(e)
    }
}

function VIEW(btn)
{
    try
    {
        var Appl_No = $(btn).val();
           
        ExtendedAjaxCall('ApplicationView/GET_APPL_DTLS_FOR_VIEWAsync/' + Appl_No, null, 'GET', function (result)
        {
            try
            {

                if (!$.isEmptyObject(result) && result.Table.length > 0 && result.Table[0].Status == 1)
                {
                    stepper.maxTabIndex = 1;
                    BTP_OBJECT.FrontOfficeSave = true;
                    $('#IdBtnTabSwit01').parent().addClass('Active');                   

                    BTP_OBJECT.FH_DATA_SOURCE = result.Table[0].Data_Source;
                    if (!$.isEmptyObject(result.Table[0].Folio_No))
                        InvSearch(result.Table[0].DepositorStatusCode, 'Folio', result.Table[0].Folio_No, null, result.Table[0].Appl_No);

                    BTP_OBJECT.ApplicationType = $.isEmptyObject(result.Table[0].Folio_No) ? 'F' : 'A';
                    BTP_OBJECT.IND_NIND = result.Table[0].Ind_Nind;
                    //front office
                    $('#lblApplicationNumber').text(result.Table[0].Appl_No);
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
                    $('#lblFolioNumber').text(result.Table[0].Folio_No);
                    $('#lblExistingFDRNumber').text(result.Table[0].Existing_FDR_No);

                    if (result.Table[0].ApplicationDeclarationType == 'PHYSICAL')
                        $('#rdoPhysical').prop('checked', true).change();
                    else if (result.Table[0].ApplicationDeclarationType == 'DIGITAL')
                        $('#rdoDigital').prop('checked', true).change();

                    $('#ddlDepositorsStatus').val(result.Table[0].DepositorStatusCode).change();
                    $('#txtPhysicalApplNo').val(result.Table[0].Physical_App_No)
                    $('#ddlInvtitle').val(result.Table[0].Salutation).change()
                    $('#txtInvFirstName').val(result.Table[0].FirstName).change()
                    $('#txtInvMiddleName').val(result.Table[0].MiddleName).change()
                    $('#txtInvLastName').val(result.Table[0].LastName).change()
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
                        stepper.maxTabIndex = 2;
                        BTP_OBJECT.OtherDetailsSave = true;
                        $('#IdBtnTabSwit02').parent().removeClass('NoActive');

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
                            $('#btnsldFatca').addClass('active');
                        if (result.Table1[0].Is_FH_Green_Card_Holder)
                            $('#btnsldGreen').addClass('active');
                        if (result.Table1[0].Is_SH_Tax_Resident)
                            $('#btnSHsldFatca').addClass('active');
                        if (result.Table1[0].Is_SH_Green_Card_Holder)
                            $('#btnSHsldGreen').addClass('active');
                        if (result.Table1[0].Is_TH_Tax_Resident)
                            $('#btnTHsldFatca').addClass('active');
                        if (result.Table1[0].Is_TH_Green_Card_Holder)
                            $('#btnTHsldGreen').addClass('active');
                    }

                    //investment
                    if (!$.isEmptyObject(result.Table2) && result.Table2.length > 0)
                    {
                        stepper.maxTabIndex = 3;
                        BTP_OBJECT.InvestmentDetailsSave = true;
                        $('#IdBtnTabSwit03').parent().removeClass('NoActive');

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
                        stepper.maxTabIndex = 4;
                        BTP_OBJECT.BankDetailsSave = true;
                        $('#IdBtnTabSwit04').parent().removeClass('NoActive');
                        $('#txtBankName').val(result.Table3[0].BankName)
                        $('#txtBranchName').val(result.Table3[0].BranchName)
                        $('#txtMICRCode').val(result.Table3[0].MICRCode)
                        $('#txtNEFTCode').val(result.Table3[0].NEFTCode)
                        $('#txtBankAccountNo').val(result.Table3[0].BankAccountNo);
                        $('#txtConfirmBankAccountNo').hide();
                        $('#DV_PROV_BANK,#DV_OR_ADD_NEW, .clsConfirmBankAccountNo, .ClsUploadChqCopy').hide();
                        $('#DV_BANK_DTLS').show();
                    }

                    //KYC Dtl
                    if (!$.isEmptyObject(result.Table4) && result.Table4 != undefined && result.Table4.length > 0)
                    {
                        $.each(result.Table4, function (i, row)
                        {
                            if (row.Holder_Type == '01')
                            {
                                if ($('#chkNomApplicable').prop('checked'))
                                    stepper.maxTabIndex = 5;
                                else if ($.isEmptyObject(IsDocUploaded()) && BTP_OBJECT.OVDSave == false)
                                {
                                    stepper.maxTabIndex = 8;
                                    $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');
                                }
                                else
                                {
                                    stepper.maxTabIndex = 7;
                                    $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');
                                }

                                BTP_OBJECT.FHDetailsSave = true
                                $('#IdBtnTabSwit05').parent().removeClass('NoActive');

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
                                $('#lblPAN').text(row.Kyc_PAN);
                                $('#DV_FH #hdnMobilisationMode').val(row.MobilisationMode);
                                if (row.Is_Tax_Resident == true)
                                    $('#btnsldFatca').addClass('active').change();
                                else
                                    $('#btnsldFatca').removeClass('active').change();
                                if (row.Is_Green_Card_Holder == true)
                                    $('#btnsldGreen').addClass('active').change();
                                else
                                    $('#btnsldGreen').removeClass('active').change();
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
                                    $('#txtODistrict').val(row.OVR_Address_District_Code);
                                    $('#txtOCity').val(row.OVR_Address_City_Desc);
                                    $('#txtOPin').val(row.OVR_AddPin).keyup();
                                }

                                $('#DV_FH_DTLS').show();
                            }

                            //Second holder
                            if (row.Holder_Type == '02' && $('#chkSHApplicable').prop('checked'))
                            {
                                BTP_OBJECT.SHDetailsSave = true
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
                                $('#DV_PROV_SH,#DV_SH_SEARCH').hide();
                                $('#DV_SH_DTLS').show();
                            }

                            //Third holder
                            if ($('#chkSHApplicable').prop('checked') && row.Holder_Type == '03' && $('#chkTHApplicable').prop('checked'))
                            {
                                BTP_OBJECT.THDetailsSave = true
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
                                $('#DV_PROV_TH,#DV_TH_SEARCH').hide();
                                $('#DV_TH_DTLS').show();
                            }

                            //Nominee
                            if (row.Holder_Type == '04' && $('#chkNomApplicable').prop('checked'))
                            {
                                if ($.isEmptyObject(IsDocUploaded()) && BTP_OBJECT.OVDSave == false)
                                {
                                    stepper.maxTabIndex = 8;
                                    $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');
                                }
                                else
                                {
                                    stepper.maxTabIndex = 7;
                                    $('#IdBtnTabSwit07').prop('disabled', false).removeClass('DisabledControl');
                                }

                                BTP_OBJECT.NomDetailsSave = true;
                                $('#IdBtnTabSwit06').parent().removeClass('NoActive');

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
                                $('#DV_NOM #txtPin').val(row.PER_AddPin).keyup();
                                $('#DV_NOM #txtState').val(row.PER_AddState_Desc);
                                $('#DV_NOM #txtDistrict').val(row.PER_Address_District_Desc);
                                $('#DV_NOM #txtTelephone').val(row.PER_ResTelNumber);
                                $('#DV_NOM #txtMobileNo').val(row.PER_MobileNumber);
                                $('#DV_NOM #txtEmailId').val(row.PER_EmailAdd);
                                if (row.IsMinor && !$.isEmptyObject(row.Kyc_GuardianFirstName))
                                {
                                    $('#chkIsNomMinor').prop('checked', true).change();
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
                    {
                        stepper.maxTabIndex = 8;
                        BTP_OBJECT.OVDSave = true
                        $('#IdBtnTabSwit07').parent().removeClass('NoActive');
                        BindOVD(result.Table[0].Appl_No);
                    }

                    //validations
                    $('#DV_FH_CKYC_SEARCH').hide();
                    $('#IdInvestorSearch').hide();
                    $('#btnfreshcutomer').hide();
                    $('#addfreshInv').hide();
                    $('#DV_APPL_LIST').slideUp();
                    $('#IdInfoDiv').slideDown();
                    $('#DV_INV_DETAILS').show();
                    $('#IdInvestorInfo').slideDown();
                    $('#DV_DATAENTRY').slideDown();
                }
                else if (!$.isEmptyObject(result) && result.Table.length > 0 && result.Table[0].Status == 0)
                {
                    if (!$.isEmptyObject(result.Table[0].Msg))
                        BtpMessagePopup(result.Table[0].Msg, 'error');
                    else
                        BtpMessagePopup('', 'error');
                }
                else
                    BtpMessagePopup('', 'error');

                //disable all control
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
                $('.OVD_VIEW').prop('disabled', false);
                $('#btnBack01,#btnBack02,#btnBack03,#btnBack04,#btnBack05,#btnBack06,#btnBack07,#btnBack08').prop('disabled', false);
                $('#chkIdOverSeasAddress').prop('disabled', false);

                $('#preloader').hide();


            } catch (e)
            {
                fnException(e)
            }
        }, null, true, true, false, ErrorFunction);

    } catch (e)
    {
        fnException(e);
    }
}

$('#btnBack01').click(function ()
{
    Reset();
    $('#DV_APPL_LIST').show();
    $('#DV_DATAENTRY').hide();

    BindApplicationEditGrid();
});

function Reset_step1()
{
    $('.errorbox').text('').hide();
    $('.form-control').removeClass('InputBorderRed');
    $('.D_T_E').removeClass('InputBorderRed');

    if (!$.isEmptyObject($('#lblApplicationNumber').text())) 
    {
        if ($.isEmptyObject($('#lblFolioNumber').text()))
        {
            $('#rdoDigital').prop('checked', true).change();
            $('#ddlInvtitle').val('select').change();
            $('#txtInvFirstName').val('').change();
            $('#txtInvMiddleName').val('').change();
            $('#txtInvLastName').val('').change();
            $('#txtInvPan').val('').change();
            $('#txtMobile').val('').change();
            $('#txtEmail').val('').change();
            $('#txtInvDOB').datetextentry('set_date', null);
        }
        else
        {
            // $('#txtInvDOB').datetextentry('set_date', null);
        }
    }
    else
    {
        $('#ddlInvSearchBy').val('select').change();
        $('#txtSearchRefNo').val('').change();
        $('#txtSearchDOB').datetextentry('set_date', null);
        $('#ddlInvtitle').val('select').change();
        $('#txtInvFirstName').val('').change();
        $('#txtInvMiddleName').val('').change();
        $('#txtInvLastName').val('').change();
        $('#txtInvDOB').datetextentry('set_date', null);
        $('#txtInvPan').val('').change();
        $('#txtMobile').val('').change();
        $('#txtEmail').val('').change();
        $('#txtInvDOB').datetextentry('set_date', null);
        $('#rdoDigital').prop('checked', true).change();
        $('#btnfreshcutomer').hide();
        $('#IdInvestorSearch').show();
        $('#IdInvestorInfo').hide();
        $('#DV_INV_DETAILS').hide();
        $('#DV_FH_CKYC_SEARCH').show();

    }
    $('#txtInvDrawn_Bank_Search,#hdnDrawn_Bank_Name,#hdnBank_Branch_Name,#hdnBank_MICR,#hdnBank_NEFT,#txtInvCheque_DD_No,#txtPhysicalApplNo,#txtAmount,#txtSubBrokerCode,#txtRemark').val('');
    $('#ddlBranch,#ddlInvPayment_Mode,#ddlCMSBranch').val('select').change();
    $('#txtChequeDate').datetextentry('set_date', null);
    $('#txtamountinwords').text('');
    $('#txtPhysicalApplNo').val('0000');
    $('#txtInvCKYCNumber').val('').change();


}