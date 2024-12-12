using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    /// <summary>
    /// Created By 23222334 on 07March2019 -- New
    /// </summary>
    public class Investor_Other_DtlBO
    {        
        public string Broker_Code { get; set; }
        [Required(ErrorMessage = "Appl_No")]
        public string Appl_No { get; set; }
        public string Sub_Broker_Code { get; set; }
        [Required(ErrorMessage = "Depositor_Status")]
        public string Depositor_Status { get; set; }
        [Required(ErrorMessage = "Physical_App_Number")]
        public string Physical_App_Number { get; set; }
        public string Standing_Instructions { get; set; }
        public string Annual_Income { get; set; }
        public bool IsSecondHolderApplicable { get; set; }
        public bool IsThirdHolderApplicable { get; set; }
        public bool IsNomineeApplicable { get; set; }
        public string Mobilization_Code { get; set; }
        public string FolioNo { get; set; }
        public string FDRNo { get; set; }
        public string LastInvDate { get; set; }

        public bool Is_FH_Tax_Resident { get; set; }
        public bool Is_FH_Green_Card_Holder { get; set; }
        public bool Is_SH_Tax_Resident { get; set; }
        public bool Is_SH_Green_Card_Holder { get; set; }
        public bool Is_TH_Tax_Resident { get; set; }
        public bool Is_TH_Green_Card_Holder { get; set; }
    }
}
