using System.Collections.Generic;

namespace FD_CPTP_UNIFIED.BO
{


    public class NSA_REQUEST_BO
    {
        public string blackListCheck { get; set; }
        public string customerDataBaseCheck { get; set; }
        public string rejectedListCheck { get; set; }
        public string employeeDataBaseCheck { get; set; }
        public string name1 { get; set; }
        public string name2 { get; set; }
        public string name3 { get; set; }
        public string name4 { get; set; }
        public string name5 { get; set; }
        public string dob { get; set; }
        public string doi { get; set; }
        public string address { get; set; }
        public string passportNo { get; set; }
        public string pancardNo { get; set; }
        public string idNumber1 { get; set; }
        public string idNumber2 { get; set; }
        public string idNumber3 { get; set; }
        public string idNumber4 { get; set; }
        public string idNumber5 { get; set; }
        public string country1 { get; set; }
        public string country2 { get; set; }
        public string country3 { get; set; }
        public string country4 { get; set; }
        public string country5 { get; set; }
        public string remarks { get; set; }
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
        public string Api_call { get; set; }
    }

    public class NSData
    {
        public string uniqueRequestId { get; set; }
        public string response { get; set; }
        public ResponseData responseData { get; set; }
        public List<object> resultedRecords { get; set; }
        public string message { get; set; }
    }

    public class Error
    {
    }

    public class ResponseData
    {
        public object fileImport { get; set; }
        public object fileName { get; set; }
        public object totalRecords { get; set; }
    }

    public class NSA_RESPONSE_BO
    {
        public string status { get; set; }
        public string nameScreeingStatus { get; set; }
        public string nameScreeningCode { get; set; }
        public NSData data { get; set; }
        public Error error { get; set; }
    }

}