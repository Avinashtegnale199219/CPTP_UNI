using System;
using System.Collections.Generic;
using System.Text;

namespace FD_CPTP_UNIFIED.BO
{
    public class RiskCategoryRequest_BO
    {
        public string customerId { get; set; }
        public string customerName { get; set; }
        public string identificationType { get; set; }
        public string identificationNumber { get; set; }
        public string highNetWorth { get; set; }
        public string isSTRSent { get; set; }
        public string pepCustomer { get; set; }
        public string nonFaceToFaceCustomers { get; set; }
        public string country { get; set; }
        public string customerType { get; set; }
        public string accountStatus { get; set; }
        public string product { get; set; }
        public string residentialStatus { get; set; }
        public string occupation { get; set; }
        public string natureOfBusiness { get; set; }
        public string modeOfOperation { get; set; }
        public string constitutionType { get; set; }
        public string appl_No { get; set; }
        public string folio_No { get; set; }
        public string sysRefNo { get; set; }
        public string holderType { get; set; }
        public string source { get; set; }
        public string sourceType { get; set; }
        public string sourceSubType { get; set; }
        public string sessionId { get; set; }
        public string createdBy { get; set; }
        public string createdIP { get; set; }
        public string addtional1 { get; set; }
        public string addtional2 { get; set; }
        public string addtional3 { get; set; }
        public string dob { get; set; }
        public string annual_Income { get; set; }
        public string age { get; set; }

    }

    public class RiskCategoryResAPIData
    {
        public string compassRefNo { get; set; }
        public string customerId { get; set; }
        public string kycReviewDate { get; set; }
        public string riskRating { get; set; }
    }

    public class RiskCategoryResAPIDataError
    {
        public object stts_flg { get; set; }
        public object err_cd { get; set; }
        public object message { get; set; }
    }

    public class RiskCategoryResAPI_BO
    {
        public string status { get; set; }
        public string riskCategoryStatus { get; set; }
        public string compassReKycData { get; set; }
        public string fdReKycDate { get; set; }
        public RiskCategoryResAPIData data { get; set; }
        public RiskCategoryResAPIDataError error { get; set; }
    }
}
