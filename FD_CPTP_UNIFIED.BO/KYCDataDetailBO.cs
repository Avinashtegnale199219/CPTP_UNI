using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    public class KYCDataDetailBO
    {
        [Required(ErrorMessage = "Holder_Type")]
        public string Holder_Type { get; set; }
        [Required(ErrorMessage = "Appl_No")]
        public string Appl_No { get; set; }
        public string Kyc_Number { get; set; }
        [Required(ErrorMessage = "Kyc_NamePrefix")]
        public string Kyc_NamePrefix { get; set; }
        [Required(ErrorMessage = "Kyc_FirstName")]
        public string Kyc_FirstName { get; set; }
        public string Kyc_MiddleName { get; set; }
        public string Kyc_LastName { get; set; }
        public string Kyc_FullName { get; set; }
        public string Kyc_FatherNamePrefix { get; set; }
        public string Kyc_FatherFirstName { get; set; }
        public string Kyc_FatherMiddleName { get; set; }
        public string Kyc_FatherLastName { get; set; }
        public string Kyc_FatherFullName { get; set; }
        public string Kyc_SpouseNamePrefix { get; set; }
        public string Kyc_SpouseFirstName { get; set; }
        public string Kyc_SpouseMiddleName { get; set; }
        public string Kyc_SpouseLastName { get; set; }
        public string Kyc_SpouseFullName { get; set; }
        public string Kyc_MotherNamePrefix { get; set; }
        public string Kyc_MotherFirstName { get; set; }
        public string Kyc_MotherMiddletName { get; set; }
        public string Kyc_MotherLastName { get; set; }
        public string Kyc_MotherFullName { get; set; }
        public string Kyc_GuardianNamePrefix { get; set; }
        public string Kyc_GuardianFirstName { get; set; }
        public string Kyc_GuardianMiddleName { get; set; }
        public string Kyc_GuardianLastName { get; set; }
        public string Kyc_GuardianFullName { get; set; }
        public string Kyc_Gender { get; set; }
        public string Kyc_MaritalStatus { get; set; }
        public string Kyc_Nationality_Code { get; set; }
        public string Kyc_Nationality_Desc { get; set; }
        public string Kyc_Occupation_Code { get; set; }
        public string Kyc_Occupation_Desc { get; set; }
        [Required(ErrorMessage = "Kyc_DOB")]
        public string Kyc_DOB { get; set; }       
        public string Kyc_PAN { get; set; }
        public bool IsMinor { get; set; }
        public string Kyc_Guardian_PAN { get; set; }
        public bool Is_Tax_Resident { get; set; }
        public bool Is_Green_Card_Holder { get; set; }
        public string FolioNo { get; set; }
        public string FDRNo { get; set; }
        public string LastInvDate { get; set; }
        public bool IsEditForCKYC { get; set; }
        public string MobilisationMode { get; set; }
        public string Data_Source { get; set; }
        public string SourceTableId { get; set; }
        public string IND_NIND { get; set; }
        public string Kyc_Annual_Income_Code { get; set; }
        public string Kyc_Annual_Income_Desc { get; set; }

        //avinash added Occupation/sub-occupation changes
        public string Kyc_Occ_CustSegType { get; set; }
        public string Kyc_Occ_CustSegType_Desc { get; set; }
        public string Kyc_Occ_CustSegSubType { get; set; }
        public string Kyc_Occ_CustSegSubType_Desc { get; set; }

        public string SchemeCode { get; set; }
        public string IsInvPEP { get; set; }
        public string IsInvPEPRelative { get; set; }
        public string IsSHPEP { get; set; }
        public string IsSHPEPRelative { get; set; }
        public string IsTHPEP { get; set; }
        public string IsTHPEPRelative { get; set; }
        public string InvRiskCategory { get; set; }
        public string InvCompass_Ref_No { get; set; }

        public string SHRiskCategory { get; set; }
        public string SHCompass_Ref_No { get; set; }

        public string THRiskCategory { get; set; }
        public string THCompass_Ref_No { get; set; }

        public string InvNSA_Status { get; set; }
        public string SHNSA_Status { get; set; }
        public string THNSA_Status { get; set; }

        public string IsInvOSV { get; set; }
        public string IsSHOSV { get; set; }
        public string IsTHOSV { get; set; }
    }
}
