using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    //t_FD_BTP_Investment_Dtl
    /// <summary>
    /// Created By 23222334 on 07March2019 -- Updated
    /// </summary>
    public class RenewalInvestment_DtlBO
    {
      
        public string Investor_Category { get; set; }
        public string Broker_Code { get; set; }
        [Required(ErrorMessage ="Application no is required")]
        public string Appl_No { get; set; }
        [Required(ErrorMessage = "Deposito Status Code is required")]
        public string Depositor_Status_Code { get; set; }
        [Required(ErrorMessage = "Category is required")]
        public string Category { get; set; }
        [Required(ErrorMessage = "Scheme is required")]
        public string Scheme { get; set; }
        [Required(ErrorMessage = "Scheme Code is required")]
        public string SchemeCode { get; set; }
        [Required(ErrorMessage = "Int Rate is required")]
        public float IntRate { get; set; }
        [Required(ErrorMessage = "Int Freq is required")]
        public string IntFreq { get; set; }
        [Required(ErrorMessage = "Tenure is required")]
        public string Tenure { get; set; }
        [Required(ErrorMessage = "FDR Dispatch Mode is required")]
        public string FDR_Dispatch_Mode { get; set; }      
        public string Renewal_For { get; set; }
        public string HNG { get; set; }
        public string TDS_Flag { get; set; }
        [Required(ErrorMessage = "Auto Renewal flag is required")]
        public bool Is_Auto_Renewal { get; set; }
        [Required(ErrorMessage = "Amount is required")]
        public int Amount { get; set; }
        //[Required(ErrorMessage = "Payment Mode is required")]
        public string Payment_Mode { get; set; }
        [Required(ErrorMessage = "Payment Instruction is required")]
        public string Payment_Instruction { get; set; }

        public string Bank_Name { get; set; }

        public string Bank_Branch { get; set; }

        public string Bank_Micr_Code { get; set; }

        public string Bank_Ifsc_Code { get; set; }

        public string Payment_Ref_No { get; set; }

        public string Payment_Ref_Date { get; set; }
        public string EmployeeCode { get; set; }
        public string FolioNo { get; set; }
        public string FDRNo { get; set; }
        public string LastInvDate { get; set; }
        [Required(ErrorMessage = "IND-NIND flag is required")]
        public string Ind_Nind { get; set; }
        [Required(ErrorMessage = "Application declaration type is required")]
        public string ApplicationDeclarationType { get; set; }
        public string FutureRenewalFor { get; set; }
    }
}
