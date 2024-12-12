using System.ComponentModel.DataAnnotations;

namespace FD_CPTP_UNIFIED.BO
{
    //t_FD_BTP_Nominee_Dtl
    /// <summary>
    /// Created By 23222334 on 07March2019 -- Updated
    /// </summary>
    public class Nominee_Dtl
    {
        [Required(ErrorMessage = "Appl_No")]
        public string Appl_No { get; set; }
        [Required(ErrorMessage = "Nominee_Salutation")]
        public string Nominee_Salutation { get; set; }        
        public string Nominee_Name { get; set; }
        [Required(ErrorMessage = "Nominee_First_Name")]
        public string Nominee_First_Name { get; set; }
        public string Nominee_Middle_Name { get; set; }
        public string Nominee_Last_Name { get; set; }
        [Required(ErrorMessage = "Nominee_Relations")]
        public string Nominee_Relations { get; set; }
        public string Nominee_DOB { get; set; }
        public bool Is_Nominee_Minor { get; set; }
        public string EmailID { get; set; }
        public string MobileNo { get; set; }
        public string Nominee_Status { get; set; }
        public string GuardianName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
        public string StateCode { get; set; }
        public string DistrictCode { get; set; }
        public string StateName { get; set; }
        public string DistrictName { get; set; }
        public string PIN { get; set; }
        public string Guardian_Salutation { get; set; }
        public string Guardian_First_Name { get; set; }
        public string Guardian_Middle_Name { get; set; }
        public string Guardian_Last_Name { get; set; }
        public string Guardian_Full_Name { get; set; }
        public string TelephoneNo { get; set; }
        public string FolioNo { get; set; }
        public string FDRNo { get; set; }
        public string LastInvDate { get; set; }
    }
}
