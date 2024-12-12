namespace BusinessObject
{
    public class PayinslipStagingBo
    {

       
        public string AgencyCode { get; set; }
        public string Agencyname { get; set; }

        public string CMS_LOC_CODE { get; set; }
        public string BTP_LOC_CODE { get; set; }
        public string BTP_LOC_DESC { get; set; }
        public string count { get; set; }
        public string CMS_LOC_NAME { get; set; }
        public string Drawn_Bank_MICR { get; set; }
        public string Drawn_Bank_IFSC { get; set; }
        public string Payinslip_Source_Name { get; set; }
        public string Req_State { get; set; }
        public string Req_Status { get; set; }
        public string process_flag { get; set; }
        public string Active_Flg { get; set; }
        public string Process_Remarks { get; set; }
        public string Payinslip_Stg_HdrSequence { get; set; }
        public string PortalSourceCode { get; set; }
        public string MCP_Code { get; set; }
        public string Payinslip_No { get; set; }
        public string Req_Remarks { get; set; }
        public string SCP_Code { get; set; }
        public string MCP_Broker_Code { get; set; }
        public string SCP_Broker_Code { get; set; }
        public string CP_Trans_Ref_No { get; set; }
        public string Employee_Code { get; set; }
        public string ADO_Indicator { get; set; }
        public string MF_Sys_Ref_No { get; set; }
        public string Ref_Cust_Code { get; set; }
        public string Ref_RM_Code { get; set; }
        public string Ref_Other_Code { get; set; }
        public string Ref_Type { get; set; }
        public string CMS_Type { get; set; }
        public string CMS_Bank_Name { get; set; }
        public string CMS_Branch_Name { get; set; }
        public string CMS_IFSC_Code { get; set; }
        public string CMS_MICR_Code { get; set; }
        public string MF_Branch_Code { get; set; }
        public string MF_Branch_Name { get; set; }
        public string Cheque_Number { get; set; }
        public string Cheque_Date { get; set; }
        public string Cheque_Amount { get; set; }
        public string Drawn_Bank_Name { get; set; }
        public string Drawn_Branch_name { get; set; }
        public string Applicant_Name { get; set; }
        public string Application_No { get; set; }
        public string SCP_Location_Code { get; set; }
        public string SCP_Location_Name { get; set; }
        public string Entry_Date { get; set; }
        public string Pickup_Date { get; set; }
        public string Remarks { get; set; }
        //public string Queue_State { get; set; }
        //public string Queue_Status { get; set; }
        //public string Queue_Process_Date { get; set; }

        public string CreatedType { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedIP { get; set; }
        public string SessionID { get; set; }
        public string FormCode { get; set; }
        public bool Dummy { get; set; }


    }

    public class GeneratePDFBO
    {
        public string HTMLString { get; set; }
    }

    public class GeneratePDFRespBO
    {
        public string PDFBytes { get; set; }
    }
}
