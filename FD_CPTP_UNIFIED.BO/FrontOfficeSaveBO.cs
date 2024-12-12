using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    public class FrontOfficeSaveBO
    {
        public string Appl_No { get; set; }
        public string Copy_Appl_No { get; set; }
        [Required]
        public string DepositorCategory { get; set; }
        [Required]
        public string ApplicationDeclarationType { get; set; }
        [Required]
        public string Physical { get; set; }
        [Required]
        public string Salutation { get; set; }
        [Required]
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
       
        public string DOB { get; set; }
    
        public string PAN { get; set; }
        [Required]
        public string Amount { get; set; }
        public string Agency_Usr_Branch_Cd { get; set; }
        public string Agency_Usr_Branch_Name { get; set; }
        [Required]
        public string ModeOfPayment { get; set; }
        public string Cheque_Date { get; set; }
        public string Instrument_No { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string IFSC_Code { get; set; }
        public string MICR_Code { get; set; }
        public string Cms_Location_Code { get; set; }
        public string Cms_Location_Name { get; set; }
        [Required]
        public string Mobile { get; set; }
        public string Email { get; set; }       
        public string Remarks { get; set; }             
        public string Existing_FDR_No { get; set; }
        public string Folio_No { get; set; }       
        public string BrokerCode { get; set; }
        public string SubBrokerCode { get; set; }
        public string IsCmsNoncms { get; set; }
        public string ChequeDepositedBy { get; set; }
        public string NONCMSCheque_Deposit_Date { get; set; }
        public string GeneratePIS { get; set; }
        public string CKYCNumber { get; set; }
        public string Data_Source { get; set; }
        public string ApplicationType { get; set; }

    }
}
