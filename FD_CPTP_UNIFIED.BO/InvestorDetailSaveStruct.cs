using System.Collections.Generic;

namespace FD_CPTP_UNIFIED.BO
{
    /// <summary>
    /// Created By 23222334 on 07March2019 -- New
    /// </summary>
    public class InvestorDetailSaveStruct
    {

        public FrontOfficeSaveBO FrontOfficeSave { get; set; }

        public Investor_Other_DtlBO Investor_Other_Dtl { get; set; }

        public Investment_DtlBO Investment_Dtl { get; set; }

        public Investor_Bank_DtlBO Investor_Bank_Dtl { get; set; }

        public List<KYCDataDetailBO> KYCDataDetails { get; set; }

        public List<InvestorAddressBO> InvestorAddresses { get; set; }
        public List<DataEntryBO> FATCA_DTLS { get; set; } //Optional 

        public string IsFATCAApplicable { get; set; } //to be passed only "Y" and "N"
        public Nominee_Dtl Nominee_Dtl { get; set; } //Optional
        public List<OVDBO> OVDDtls { get; set; }
        public List<Coparceners_DtlBO> MemberDtls { get; set; }
        public UpdateApplicationBO UpdateApplication { get; set; }

        //public Investor_Payment_DtlBO Investor_Payment_Dtl { get; set; } //Optional?

    }
}
