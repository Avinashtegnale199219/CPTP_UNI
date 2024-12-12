using System.Collections.Generic;

namespace FD_CPTP_UNIFIED.BO
{
    public class DataEntryBO
    {
        public string SessionId { get; set; }
        public string Mobilization_Type { get; set; }
        public string Mobilization_Code { get; set; }
        public string Appl_No { get; set; }
        public string Nationality_Code { get; set; }
        public string Nationality_Dec { get; set; }
        public string CountryOfBirth_Code { get; set; }
        public string CountryOfBirth_Name { get; set; }
        public string CityOfBirth_Name { get; set; }
        public string Father_Name { get; set; }
        public string Spouse_Name { get; set; }
        public string Occupation_code { get; set; }
        public string Occupation_Name { get; set; }
        public string PAN { get; set; }
        public string GName { get; set; }
        public string FolioNo { get; set; }
        public string FDRNo { get; set; }
        public string LastInvDate { get; set; }
        public string HolderType { get; set; }
        public List<FATCACitizenBO> FATCA_Citizen { get; set; }
        public List<FATCADetailBO> FATCA_Detail { get; set; }

    }
}
