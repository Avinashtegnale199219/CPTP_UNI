using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    public class SaveRenewalRequestEntryBO
    {
       
        public string Appl_No { get; set; }
        [Required]
        public string FDR_NO { get; set; }
        [Required]
        public string RenewalFor { get; set; }
        [Required]
        public string BatchNo { get; set; }

        [Required]
        public string NewBrokerCode { get; set; }
    }
}
