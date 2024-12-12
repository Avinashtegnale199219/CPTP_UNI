using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    //t_FD_BTP_Investor_Bank_Dtl
    /// <summary>
    /// Created By 23222334 on 07March2019 -- Updated
    /// </summary>
    public class Investor_Bank_DtlBO
    {
        [Required(ErrorMessage = "Appl_No")]
        public string Appl_No { get; set; }
        [Required(ErrorMessage = "MICRCode")]
        public string MICRCode { get; set; }
        [Required(ErrorMessage = "NEFTCode")]
        public string NEFTCode { get; set; }
        [Required(ErrorMessage = "BankName")]
        public string BankName { get; set; }
        [Required(ErrorMessage = "BranchName")]
        public string BranchName { get; set; }
        [Required(ErrorMessage = "BankAccountNo")]
        public string BankAccountNo { get; set; }
        public string FolioNo { get; set; }
        public string FDRNo { get; set; }
        public string LastInvDate { get; set; }
        public bool IsProvBank { get; set; }
    }
}
