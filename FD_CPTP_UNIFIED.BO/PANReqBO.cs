using System;

namespace FD_OFFLINE_CKYC_UPDATE.BussinessObject
{
    public class PANReqBO
    {
        public string App_Code { get; set; }
        public string Appl_No { get; set; }
        public string MCP_Code { get; set; }
        public string SCP_Code { get; set; }
        public string MF_Sys_Ref_No { get; set; }
        public string CP_Trans_Ref_No { get; set; }
        public string Source_Type { get; set; }
        public string Source_Sub_Type { get; set; }
        public string Holder_Type { get; set; }
        public string User_Name { get; set; }
        public string Remarks { get; set; }
        public string PAN_Holder_Name { get; set; }
        public string PAN_Holder_DOB { get; set; }
        public string PAN_No { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByUName { get; set; }
        public string CreatedIP { get; set; }
        public Int64 SessionId { get; set; }
        public string CreatedType { get; set; }
        public string Ref_Type { get; set; }

    }

}
