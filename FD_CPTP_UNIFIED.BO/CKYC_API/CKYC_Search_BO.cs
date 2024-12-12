using System;
using System.Collections.Generic;

namespace FD_CPTP_UNIFIED.BO
{
    public class CKYC_Search_BO
    {
    }

    public class DownloadCkycRequestDetailsBO
    {
        public string Appl_No { get; set; }
        public string MF_Sys_Ref_No { get; set; }
        public string CP_Trans_Ref_No { get; set; }
        public string MCP_Code { get; set; }
        public string SCP_Code { get; set; }
        public string UserName { get; set; }
        public string InvestorType { get; set; }
        public string CKYC_Number { get; set; }
        public string DOB { get; set; } // DOB format must be "dd-MM-yyyy";
        public string IncludeImages { get; set; } //Y or N
        public string IncludeRelatedPersonDetails { get; set; } // Y or N
        public string CreatedBy { get; set; }
        public string CreatedByUName { get; set; }
        public string CreatedIP { get; set; }
        public Int64 SessionId { get; set; }
        public string OVDRefNo { get; set; }
        public string OVDRefType { get; set; } //Pass  OVD_Desc from below
        public string Source_Type { get; set; }
        public string Source_Sub_Type { get; set; }
        public string Branch_Code { get; set; }

    }

    public class PersonalDetails_BO
    {
        public string Appl_No { get; set; }
        public string Holder_Type { get; set; }
        public string Sys_Ref_No { get; set; }
        public string Title { get; set; }
        public string First_Name { get; set; }
        public string Middle_Name { get; set; }
        public string Last_Name { get; set; }
        public string Full_Name { get; set; }
        public string DOB { get; set; }
        public string Active { get; set; }
        public string CreatedIP { get; set; }
        public string CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByUName { get; set; }
        public string CreatedType { get; set; }
        public string SessionID { get; set; }
        public string Form_Code { get; set; }
        public string PAN { get; set; }

        public string Ckyc_Var_No { get; set; }

        //public PersonalDetails_BO SetValues(PersonalDetails_BO _step1, HttpRequest _req)
        //{
        //    if (!string.IsNullOrEmpty(_step1.Full_Name))
        //    {
        //        _step1.Full_Name = _step1.Full_Name.ToUpper();
        //    }



        //    _step1.Form_Code = "FD_RAPID";

        //    //_step1.CreatedIP = _req.ServerVariables["HTTP_X_FORWARDED_FOR"] ?? _req.ServerVariables["REMOTE_ADDR"];//_req.UserHostName;

        //    //DomainClass cls = new DomainClass();
        //    //_step1.DomainName = cls.GetDom(_req); cls = null;

        //    //string connstr = ConfigurationManager.ConnectionStrings["ConnectionString_onl"].ToString();
        //    //SqlConnection connection = new SqlConnection(connstr);
        //    //_step1. = connection.Database.ToString();



        //    //try
        //    //{
        //    //    System.Net.NetworkInformation.NetworkInterface[] nics = System.Net.NetworkInformation.NetworkInterface.GetAllNetworkInterfaces();

        //    //    foreach (System.Net.NetworkInformation.NetworkInterface nic in nics)
        //    //    {
        //    //        _step1.MacAddress = nic.GetPhysicalAddress().ToString();
        //    //    }
        //    //}
        //    //catch { }

        //    //if (string.IsNullOrEmpty(_step1.MacAddress))
        //    //    _step1.MacAddress = "";

        //    //IPHostEntry host = Dns.GetHostEntry(Dns.GetHostName());
        //    //IPAddress ipAddress = host.AddressList[0];
        //    //foreach (IPAddress ip in host.AddressList)
        //    //{
        //    //    if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
        //    //    {
        //    //        _step1.ServerIP = ip.ToString();
        //    //        break;
        //    //    }
        //    //}

        //    //try
        //    //{
        //    //    RegistryKey rk = Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Microsoft SQL Server");
        //    //    String[] instances = (String[])rk.GetValue("InstalledInstances");
        //    //    if (instances != null)
        //    //    {
        //    //        if (instances.Length > 0)
        //    //        {
        //    //            foreach (String element in instances)
        //    //            {
        //    //                if (element == "MSSQLSERVER")
        //    //                    _step1.InstanceName = System.Environment.MachineName;
        //    //                else
        //    //                    _step1.InstanceName = System.Environment.MachineName + @"\" + element;
        //    //            }
        //    //        }
        //    //    }
        //    //    else
        //    //    {
        //    //        _step1.InstanceName = _req.ServerVariables["INSTANCE_ID"];
        //    //    }
        //    //}
        //    //catch { }

        //    //_step1.BrowserMajorVersion = _req.Browser.MajorVersion.ToString();
        //    //_step1.BrowserMinorVersion = _req.Browser.MinorVersion.ToString();
        //    //_step1.BrowserType = _req.Browser.Type.ToString();
        //    //_step1.BrowserVersion = _req.Browser.Version.ToString();
        //    //_step1.UserAgent = _req.UserAgent.ToString();
        //    //_step1.IsMobile = DetectMobileDevice.DetectMobileDevice.IsMobile;
        //    //_step1.RequestUrl = _req.Url.ToString();


        //    return _step1;
        //}
    }


    public class DownloadCKYC_ESB_RespBO
    {
        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string Status { get; set; }
        public Result result { get; set; }
    }
    public class Result
    {
        public DownloadCkycResponse DownloadCkycResponse { get; set; }
    }
    public class DownloadCkycResponse
    {
        public string RequestStatus { get; set; }
        public string RequestId { get; set; }
        public string RequestRejectionCode { get; set; }
        public string RequestRejectionDescription { get; set; }
        public List<DownloadCkycResponseDetail> DownloadCkycResponseDetails { get; set; }

        //new parameter as per v1.8
        public string ParentCompany { get; set; } //new parameter as per v1.8
        public string Request_token { get; set; } //new parameter as per v1.8
    }
    public class DownloadCkycResponseDetail
    {
        public string TransactionId { get; set; }
        public string TransactionStatus { get; set; }
        public string TransactionRejectionDescription { get; set; }
        public List<CKYCPersonalDetail> CKYCPersonalDetail { get; set; } //CKYC_Dwnld_Personal_Details
        public List<Dwnld_CKYCIDDetail> CKYCIDDetails { get; set; } //CKYC_Dwnld_CKYCIDDetail
        public List<CKYCImageDetail> CKYCImageDetails { get; set; } //CKYC_Dwnld_CKYCImageDetail
        public List<CKYCRelatedPersonDetail> CKYCRelatedPersonDetails { get; set; }

        //new parameter as per v1.8
        public string TransactionRejectionCode { get; set; } //new parameter as per v1.8
    }
    public class CKYCImageDetail
    {
        public string CKYCImageSequence { get; set; }
        public string CKYCImageExtension { get; set; }
        public string CKYCImageType { get; set; }
        public string CKYCImageGlobalorLocal { get; set; }
        public string CKYCImageBranch { get; set; }
        public string CKYCImageData { get; set; }

    }
    public class CKYCPersonalDetail
    {
        public string RecordIdentifier { get; set; }
        public string ApplicationFormNo { get; set; }
        public string BranchCode { get; set; }
        public string CKYCConstiType { get; set; }
        public string CKYCAccType { get; set; }
        public string CKYCNumber { get; set; }
        public string CKYCNamePrefix { get; set; }
        public string CKYCFirstName { get; set; }
        public string CKYCMiddleName { get; set; }
        public string CKYCLastName { get; set; }
        public string CKYCFullName { get; set; }
        public string CKYCMaidenNamePrefix { get; set; }
        public string CKYCMaidenFirstName { get; set; }
        public string CKYCMaidenMiddleName { get; set; }
        public string CKYCMaidenLastName { get; set; }
        public string CKYCMaidenFullName { get; set; }
        public string CKYCFatherNamePrefix { get; set; }
        public string CKYCFatherFirstName { get; set; }
        public string CKYCFatherMiddleName { get; set; }
        public string CKYCFatherLastName { get; set; }
        public string CKYCFatherFullName { get; set; }
        public string CKYCMotherNamePrefix { get; set; }
        public string CKYCMotherFirstName { get; set; }
        public string CKYCMotherMiddletName { get; set; }
        public string CKYCMotherLastName { get; set; }
        public string CKYCMotherFullName { get; set; }
        public string CKYCSpouseNamePrefix { get; set; }
        public string CKYCSpouseFirstName { get; set; }
        public string CKYCSpouseMiddleName { get; set; }
        public string CKYCSpouseLastName { get; set; }
        public string CKYCSpouseFullName { get; set; }
        public string CKYCGender { get; set; }

        public string CKYCDOB { get; set; }

        public string CKYCPerAdd1 { get; set; }
        public string CKYCPerAdd2 { get; set; }
        public string CKYCPerAdd3 { get; set; }
        public string CKYCPerAddCity { get; set; }
        public string CKYCPerAddDistrict { get; set; }
        public string CKYCPerAddState { get; set; }
        public string CKYCPerAddCountry { get; set; }
        public string CKYCPerAddPin { get; set; }
        public string CKYCPerAddPOA { get; set; }
        public string CKYCPerAddPOAOthers { get; set; }
        public string CKYCPerAddSameasCorAdd { get; set; }
        public string CKYCCorAdd1 { get; set; }
        public string CKYCCorAdd2 { get; set; }
        public string CKYCCorAdd3 { get; set; }
        public string CKYCCorAddCity { get; set; }
        public string CKYCCorAddDistrict { get; set; }
        public string CKYCCorAddState { get; set; }
        public string CKYCCorAddCountry { get; set; }
        public string CKYCCorAddPin { get; set; }

        public string CKYCResTelSTD { get; set; }
        public string CKYCResTelNumber { get; set; }
        public string CKYCOffTelSTD { get; set; }
        public string CKYCOffTelNumber { get; set; }
        public string CKYCMobileISD { get; set; }
        public string CKYCMobileNumber { get; set; }

        public string CKYCEmailAdd { get; set; }
        public string CKYCRemarks { get; set; }

        public string CKYCDateofDeclaration { get; set; }
        public string CKYCPlaceofDeclaration { get; set; }
        public string CKYCKYCVerificationDate { get; set; }
        public string CKYCTypeofDocSubmitted { get; set; }
        public string CKYCKYCVerificationName { get; set; }
        public string CKYCKYCVerificationDesg { get; set; }
        public string CKYCKYCVerificationBranch { get; set; }
        public string CKYCKYCVerificationEmpcode { get; set; }
        public string CKYCNumberofIds { get; set; }
        public string CKYCNumberofRelatedPersons { get; set; }

        public string CKYCNumberofImages { get; set; }


        //new added v1.8
        public string SourceSystem { get; set; }
        public string SourceSystemSegment { get; set; }
        public string Remarks { get; set; }
        public string CKYCPAN { get; set; }
        public string CKYCFormSixty { get; set; }
        public string CKYCCorAddPOA { get; set; }
        public string APITags { get; set; }

        //Removed v1.8        
        public string CKYCMaritalStatus { get; set; }
        public string CKYCNationality { get; set; }
        public string CKYCOccupation { get; set; }
        public string CKYCResidentialStatus { get; set; }
        public string CKYCTaxResidencyOutsideIndia { get; set; }
        public string CKYCJurisdictionofRes { get; set; }
        public string CKYCTIN { get; set; }
        public string CKYCCountryOfBirth { get; set; }
        public string CKYCPlaceOfBirth { get; set; }
        public string CKYCPerAddType { get; set; }      
        public string CKYCPerAddSameAsJurAdd { get; set; }
        public string CKYCJurAdd1 { get; set; }
        public string CKYCJurAdd2 { get; set; }
        public string CKYCJurAdd3 { get; set; }
        public string CKYCJurAddCity { get; set; }
        public string CKYCJurAddState { get; set; }
        public string CKYCJurAddCountry { get; set; }
        public string CKYCJurAddPin { get; set; }       
        public string CKYCFAXSTD { get; set; }
        public string CKYCFaxNumber { get; set; }      
        public string CKYCNumberofLocalAdds { get; set; }
        public string CKYCNameUpdated { get; set; }
        public string CKYCPersonalorEntityDetailsUpdated { get; set; }
        public string CKYCAddressDetailsUpdated { get; set; }
        public string CKYCContactDetailsUpdated { get; set; }
        public string CKYCRemarksUpdated { get; set; }
        public string CKYCKYCVerificationUpdated { get; set; }
        public string CKYCIDDetailsUpdated { get; set; }
        public string CKYCRelatedPersonsUpdated { get; set; }
        public string CKYCImageDetailsUpdated { get; set; }


    }
    public class Dwnld_CKYCIDDetail //CKYC_Dwnld_CKYCIDDetail
    {
        public string CKYCIDSequence { get; set; }
        public string CKYCIDType { get; set; }
        public string CKYCIDNumber { get; set; }
        public string CKYCIDVerificationStatus { get; set; }

        //Removed parameters v1.8  
        public string CKYCIDExpiryDate { get; set; }
        public string CKYCIDProofSubmitted { get; set; }
    }
    public class CKYCRelatedPersonDetail
    {
        public string CKYCRPSequence { get; set; }
        public string CKYCRPRelation { get; set; }
        public string CKYCRPCKYCNumber { get; set; }
        public string CKYCRPNamePrefix { get; set; }
        public string CKYCRPFirstName { get; set; }
        public string CKYCRPMiddleName { get; set; }
        public string CKYCRPLastName { get; set; }
        public string CKYCRPPAN { get; set; }
        public string CKYCRPAadhar { get; set; }
        public string CKYCRPVoterId { get; set; }
        public string CKYCRPNREGA { get; set; }
        public string CKYCRPPassportNumber { get; set; }

        public string CKYCRPDrivingLicenceNumber { get; set; }

        public string CKYCRPProofOfIdName { get; set; }
        public string CKYCRPProofOfIdNumber { get; set; }
        public string CKYCRPSimplifiedIDType { get; set; }
        public string CKYCRPSimplifiedIDNumber { get; set; }

        public string CKYCRPPlaceofDeclaration { get; set; }

        public string CKYCRPTypeofDocSubmitted { get; set; }
        public string CKYCRPKYCVerificationName { get; set; }
        public string CKYCRPKYCVerificationDesg { get; set; }
        public string CKYCRPKYCVerificationBranch { get; set; }
        public string CKYCRPKYCVerificationEmpcode { get; set; }

        //new parameters addded v1.8
        public string CKYCRPMaidenPrefix { get; set; }
        public string CKYCRPMaidenFirstName { get; set; }
        public string CKYCRPMaidenMiddleName { get; set; }
        public string CKYCRPMaidenLastName { get; set; }
        public string CKYCRPFatherOrSpouseFlag { get; set; }
        public string CKYCRPFatherPrefix { get; set; }
        public string CKYCRPFatherFirstName { get; set; }
        public string CKYCRPFatherMiddleName { get; set; }
        public string CKYCRPFatherLastName { get; set; }
        public string CKYCRPSpousePrefix { get; set; }
        public string CKYCRPSpouseFirstName { get; set; }
        public string CKYCRPSpouseMiddleName { get; set; }
        public string CKYCRPSpouseLastName { get; set; }
        public string CKYCRPMotherNamePrefix { get; set; }
        public string CKYCRPMotherFirstName { get; set; }
        public string CKYCRPMotherMiddleName { get; set; }
        public string CKYCRPMotherLastName { get; set; }
        public string CKYCRPDateOfBirth { get; set; }
        public string CKYCRPGender { get; set; }
        public string CKYCRPPerAdd1 { get; set; }
        public string CKYCRPPerAdd2 { get; set; }
        public string CKYCRPPerAdd3 { get; set; }
        public string CKYCRPPerAddCity { get; set; }
        public string CKYCRPPerAddDistrict { get; set; }
        public string CKYCRPPerAddState { get; set; }
        public string CKYCRPPerAddCountry { get; set; }
        public string CKYCRPPerAddPIN { get; set; }
        public string CKYCRPPerAddPOA { get; set; }
        public string CKYCRPPerAddSameasCorAdd { get; set; }
        public string CKYCRPCorAdd1 { get; set; }
        public string CKYCRPCorAdd2 { get; set; }
        public string CKYCRPCorAdd3 { get; set; }
        public string CKYCRPCorAddCity { get; set; }
        public string CKYCRPCorAddDistrict { get; set; }
        public string CKYCRPCorAddState { get; set; }
        public string CKYCRPCorAddCountry { get; set; }
        public string CKYCRPCorAddPIN { get; set; }
        public string CKYCRPCorAddPOA { get; set; }
        public string CKYCRPResSTDCode { get; set; }
        public string CKYCRPResTelNum { get; set; }
        public string CKYCRPOffSTDCode { get; set; }
        public string CKYCRPOffTelNum { get; set; }
        public string CKYCRPMobCode { get; set; }
        public string CKYCRPMobNum { get; set; }
        public string CKYCRPEmail { get; set; }
        public string CKYCRPRemarks { get; set; }
        public string CKYCRPPhotoType { get; set; }
        public string CKYCRPPhotoData { get; set; }
        public string CKYCRPPerPOAType { get; set; }
        public string CKYCRPPerPOAData { get; set; }
        public string CKYCRPCorPOAType { get; set; }
        public string CKYCRPCorPOAData { get; set; }
        public string CKYCRPFormSixty { get; set; }
        public string CKYCRPUID { get; set; }
        public string CKYCRPNPRLetter { get; set; }
        public string CKYCRPOfflineVerficationAadhaar { get; set; }
        public string CKYCRPeKYCAuthentication { get; set; }

        //Removed parameters v1.8      
        public string CKYCRPPassportExpiryDate { get; set; }
        public string CKYCRPDrivingLicenceExpiryDate { get; set; }
        public string CKYCRPDateofDeclaration { get; set; }
        public string CKYCRPKYCVerificationDate { get; set; }

    }

    public class KYCDocumentBO
    {
        public KYCDocumentBO()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        public Int64 PKID { get; set; }
        public string Kyc_ImageType { get; set; }
        public string FileName { get; set; }
        public string ImageSequence { get; set; }
        public string Filepath { get; set; }
        public string KYCDocValue { get; set; }
        public string KYCDocExpDate { get; set; }

        //new added
        public string CKYCImageBranch { get; set; }
        public string CKYCImageData { get; set; }
        public string CKYCImageExtension { get; set; }
        public string CKYCImageGlobalorLocal { get; set; }
        public string CKYCImageSequence { get; set; }
        public string CKYCImageType { get; set; }
        public string CKyc_ID_Number { get; set; }
        public string CKyc_ID_Expiry_Date { get; set; }
        public bool IsDocumentMasked { get; set; }

    }
}
