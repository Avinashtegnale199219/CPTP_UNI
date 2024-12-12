using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    public class UpdateApplicationBO
    {
        [Required(ErrorMessage = "Appl_No")]
        public string Appl_No { get; set; }
        [Required(ErrorMessage = "ApplicationType")]
        public string ApplicationType { get; set; }
        [Required]
        public string PaymentMode { get; set; }
        public string GeneratePIS { get; set; }
    }
}
