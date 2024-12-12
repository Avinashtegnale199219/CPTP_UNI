$('#tblApplData').DataTable({
    destroy: true,
    //"order": [[2, "asc"]],
    initComplete: function ()
    {

    }
});

$(document).ready(function ()
{
    $('#btnBack08').show();
});

$('#btnSearchApplicationToCancel').click(function ()
{
    $(this).next().text('').hide();
    if (!$.isEmptyObject($('#txtSearchApplicationToCancel').val()))
    {
        GET_APPL_DTLS_CANCEL($('#txtSearchApplicationToCancel').val());
    }
   
});

function GET_APPL_DTLS_CANCEL(Appl_No)
{
    try
    {

        ExtendedAjaxCall('DataEntry/GET_APPL_DTLS/' + Appl_No, null, 'GET', function (result)
        {
          
            if (!$.isEmptyObject(result))
            {
                $('#DV_APPL_CANCEL').hide();
                $('#DV_DATAENTRY').show();

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
                            $('#lbl1stAnnualIncome').text(row.Kyc_AnnualIncome_Desc);
                            $('#lbl1stAnnualIncomeCode').text(row.Kyc_AnnualIncome_Code);

                            //PER
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

                        if (row.Holder_Type == '02' && result.Table1[0].IsSecondHolderApplicable)
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
                            $('#lbl2ndAnnualIncome').text(row.Kyc_AnnualIncome_Desc);
                            $('#lbl2ndAnnualIncomeCode').text(row.Kyc_AnnualIncome_Code);

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

                        if (row.Holder_Type == '03' && result.Table1[0].IsThirdHolderApplicable)
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
                            $('#lbl3rdAnnualIncome').text(row.Kyc_AnnualIncome_Desc);
                            $('#lbl3rdAnnualIncomeCode').text(row.Kyc_AnnualIncome_Code);

                            //PER
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

                        if (row.Holder_Type == '04' && result.Table1[0].IsNomineeApplicable)
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

$('#btnCancelApplication').click(function ()
{
    try
    {

        ExtendedAjaxCall('ApplicationCancel/CANCEL_APPLICATION/' + $('#txtSearchApplicationToCancel').val(), null, 'GET', function (result)
        {
            try
            {
                var msg = '';
                if (!$.isEmptyObject(result) && result[0].Status == 1 && !$.isEmptyObject(result[0].Msg))
                {
                    msg = '<p>' + result[0].Msg+'</p>';
                    BtpMessagePopup(msg, "success");

                    //TODO: reset
                    //Reset();
                    $('#DV_APPL_CANCEL').slideDown();
                    $('#DV_DATAENTRY').slideUp();
                }
                else if (!$.isEmptyObject(result) && result[0].Status == 0 && !$.isEmptyObject(result[0].Msg))
                {
                    msg = '<p>' + result[0].Msg + '</p>';
                    BtpMessagePopup(msg, "error");
                }
                else
                {
                    BtpMessagePopup('Something went wrong..!', "error");
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


$('#btnBack08').click(function ()
{
    //TODO: reset
    //Reset();
    $('#DV_APPL_CANCEL').slideDown();
    $('#DV_DATAENTRY').slideUp();

});


$('#btnCancel01').bind('click', Reset_step1);

function Reset_step1()
{
    $('.errorbox').text('').hide();
    $('.form-control').removeClass('InputBorderRed');
    $('.D_T_E').removeClass('InputBorderRed');

    if (!$.isEmptyObject($('#lblApplicationNumber').text())) 
    {
        //if (BTP_OBJECT.ApplicationType == 'F')
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

 
