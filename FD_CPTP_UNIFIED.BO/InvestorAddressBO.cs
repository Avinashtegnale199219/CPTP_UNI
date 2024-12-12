using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    public class InvestorAddressBO
    {
        [Required(ErrorMessage = "Holder_Type")]
        public string Holder_Type { get; set; }
        [Required(ErrorMessage = "Appl_No")]
        public string Appl_No { get; set; }
        [Required(ErrorMessage = "AddType_Code")]
        public string AddType_Code { get; set; }
        [Required(ErrorMessage = "AddType_Desc")]
        public string AddType_Desc { get; set; }
        [Required(ErrorMessage = "Address1")]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address_City_Code { get; set; }
        public string Address_City_Desc { get; set; }
        public string Mf_AddCity_Desc { get; set; }
        public string Address_District_Code { get; set; }
        public string Address_District_Desc { get; set; }
        public string Mf_AddDistrict_Desc { get; set; }
        public string AddState_Code { get; set; }
        public string Mf_AddState_Code { get; set; }
        public string AddState_Desc { get; set; }
        public string Mf_AddState_Desc { get; set; }
        [Required(ErrorMessage = "AddCountry_Code")]
        public string AddCountry_Code { get; set; }
        public string AddCountry_Desc { get; set; }
        public string AddPin { get; set; }
        public string ResTelSTD { get; set; }
        public string ResTelNumber { get; set; }
        public string OffTelSTD { get; set; }
        public string OffTelNumber { get; set; }
        public string MobileISD { get; set; }
        public string MobileNumber { get; set; }
        public string FAXSTD { get; set; }
        public string FaxNumber { get; set; }
        public string EmailAdd { get; set; }
        public string FolioNo { get; set; }
        public string FDRNo { get; set; }
        public string LastInvDate { get; set; }
    }
}
