

function Kyc_Details()
{
    this.Holder_Type;
    this.Appl_No;
    this.Kyc_Number;

    this.Kyc_NamePrefix;
    this.Kyc_FirstName;
    this.Kyc_MiddleName;
    this.Kyc_LastName;
    this.Kyc_FullName = () =>
    {
        return this.Kyc_FirstName + ' ' + this.Kyc_MiddleName + ' ' + this.Kyc_LastName;
    };

    this.Kyc_FatherNamePrefix;
    this.Kyc_FatherFirstName;
    this.Kyc_FatherMiddleName;
    this.Kyc_FatherLastName;
    this.Kyc_FatherFullName = () =>
    {
        return this.Kyc_FatherFirstName + ' ' + this.Kyc_FatherMiddleName + ' ' + this.Kyc_FatherLastName;
    };

    this.Kyc_SpouseNamePrefix;
    this.Kyc_SpouseFirstName;
    this.Kyc_SpouseMiddleName;
    this.Kyc_SpouseLastName;
    this.Kyc_SpouseFullName = () =>
    {
        return this.Kyc_SpouseFirstName + ' ' + this.Kyc_SpouseMiddleName + ' ' + this.Kyc_SpouseLastName;
    };

    this.Kyc_MotherNamePrefix;
    this.Kyc_MotherFirstName;
    this.Kyc_MotherMiddletName;
    this.Kyc_MotherLastName;
    this.Kyc_MotherFullName = () =>
    {
        return this.Kyc_MotherFirstName + ' ' + this.Kyc_MotherMiddletName + ' ' + this.Kyc_MotherLastName;
    };

    this.Kyc_Gender;
    this.Kyc_MaritalStatus;
    this.Kyc_Nationality_Code;
    this.Kyc_Nationality_Desc;
    this.Kyc_Occupation_Code;
    this.Kyc_Occupation_Desc;
    this.Kyc_DOB;

    this.Kyc_GuardianNamePrefix;
    this.Kyc_GuardianFirstName;
    this.Kyc_GuardianMiddleName;
    this.Kyc_GuardianLastName;

    this.Kyc_PAN;
    this.IsMinor = () =>
    {
        if (this.Kyc_DOB != '')
        {
            var age = GetAge(this.Kyc_DOB);
            return age < 18 ? true : false;
        }
        return false;
    };
    this.IsMarried = () =>
    {
        return this.Kyc_MaritalStatus == '01' ? true : false;
    };
    this.Kyc_Guardian_PAN;
    this.Is_Tax_Resident;
    this.Is_Green_Card_Holder;
    this.FolioNo;
    this.FDRNo;
    this.LastInvDate;
    this.IsEditForCKYC;
}
function Other_Details()
{
    this.Appl_No;
    this.Broker_Code;
    this.Sub_Broker_Code;
    this.Depositor_Status;
    this.Investor_Type;
    this.Existing_FD_Ref_No;
    this.Physical_App_Number;
    this.Standing_Instructions;
    this.Annual_Income;
    this.IsSecondHolderApplicable;
    this.IsThirdHolderApplicable;
    this.IsNomineeApplicable;
    this.Mobilization_Code;
    this.FolioNo;
    this.FDRNo;
    this.LastInvDate;
}
function Bank_Details()
{
    this.Appl_No;
    this.MICRCode;
    this.NEFTCode;
    this.BankName;
    this.BranchName;
    this.BankAccountNo;
    this.FolioNo;
    this.FDRNo;
    this.LastInvDate;
}
function Payment_Details()
{
    this.Appl_No;
    this.Payment_Mode;
    this.Cheque_DD_No;
    this.Cheque_DD_Date;
    this.Drawn_Bank_Name;
    this.Bank_Branch_Name;
    this.Bank_MICR;
    this.Bank_NEFT;
}
function Investment_Details()
{
    this.Investor_Category;
    this.Broker_Code;
    this.Appl_No;
    this.Depositor_Status_Code;
    this.Category;
    this.Scheme;
    this.SchemeCode;
    this.IntRate;
    this.IntFreq;
    this.Tenure;
    this.FDR_Dispatch_Mode;
    this.Renewal_For;
    this.HNG;
    this.TDS_Flag;
    this.Is_Auto_Renewal;
    this.Amount;
    this.Payment_Mode;
    this.Payment_Instruction;
    this.Bank_Name;
    this.Bank_Branch;
    this.Bank_Micr_Code;
    this.Bank_Ifsc_Code;
    this.Payment_Ref_No;
    this.Payment_Ref_Date;
    this.FolioNo;
    this.FDRNo;
    this.LastInvDate;
}
function Nominee_Details()
{
    this.Appl_No;
    this.Nominee_Salutation;
    this.Nominee_First_Name;
    this.Nominee_Middle_Name;
    this.Nominee_Last_Name;
    this.Nominee_Full_Name = () =>
    {
        return this.Nominee_First_Name + ' ' + this.Nominee_Middle_Name + ' ' + this.Nominee_Last_Name;
    };

    this.Nominee_Relations;
    this.Nominee_DOB;
    this.Is_Nominee_Minor = () =>
    {
        if (this.Nominee_DOB != '')
        {
            var age = GetAge(this.Nominee_DOB);
            return age < 18 ? true : false;
        }
        return false;
    };
    this.Nominee_Status;
    this.Address1;
    this.Address2;
    this.Address3;
    this.City;
    this.StateCode;
    this.DistrictCode;
    this.StateName;
    this.DistrictName;
    this.EmailID;
    this.MobileNo;
    this.Guardian_Salutation;
    this.Guardian_First_Name;
    this.Guardian_Middle_Name;
    this.Guardian_Last_Name;
    this.GuardianName = () =>
    {
        return this.Guardian_First_Name + ' ' + this.Guardian_Middle_Name + ' ' + this.Guardian_Last_Name;
    };
    
    this.PIN;
    this.CountryCode;
    this.CountryName;
    this.FolioNo;
    this.FDRNo;
    this.LastInvDate;
}
function Save_All_Details()
{
    this.IsSecondHolderApplicable;
    this.IsThirdHolderApplicable;
    this.IsOtherDetailApplicable;
    this.IsPaymentDetailAApplicable;
    this.IsNomineeApplicable;
    this.IsOVDDetailAApplicable;
    this.Investor_Bank_Dtl;
    this.InvestorDtl;
    this.Investor_Other_Dtl;
    this.Investor_Payment_Dtl;
    this.Nominee_Dtl;
    this.KYCDataDetails;
    this.InvestorAddresses;
    this.OVDDtls;
    this.dataEntryBO;
    //this.PaymentRequestDtl;
}

//Kyc_Details.prototype = {
//    IsMinor: function ()
//    {
//        if (this.Kyc_DOB != '')
//        {
//            var age = GetAge(this.Kyc_DOB);
//            return age < 18 ? true : false;
//        }
//        return false;
//    },
//    IsMarried: function ()
//    {
//        return this.Kyc_MaritalStatus == '01' ? true : false;
//    }
//}
//Nominee_Details.prototype = {
//    IsMinor: function ()
//    {
//        if (this.Nominee_DOB != '')
//        {
//            var age = GetAge(this.Nominee_DOB);
//            return age < 18 ? true : false;
//        }
//        return false;
//    },
//}