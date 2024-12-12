using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Configuration;
using System.Drawing;
using FD_CPTP_UNIFIED;
using FD_CPTP_UNIFIED.BO;
using System.Globalization;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;

namespace FD_UNIFIED_CPTP.Services
{
    public class NAS_RiskCategory
    {
        private readonly IConfiguration configuration;
        public NAS_RiskCategory(IConfiguration _configuration)
        {
            configuration = _configuration;
        }

        public async Task<string> Get_NSA(SessionBO sessionBO, List<KYCDataDetailBO> kycDetails, Investment_DtlBO Investment_Dtl, string ApplNo)
        {
            StringBuilder result = new StringBuilder();
            try
            {
                HolderDetailsDAL objDAL = new HolderDetailsDAL(Startup.Configuration);
                NSA_REQUEST_BO nameScreen = new NSA_REQUEST_BO();
                NSA_RESPONSE_BO objNSAResBo = new NSA_RESPONSE_BO();

                string risk_category = string.Empty;
                string strRes = string.Empty;
                string NSA_API_URL = configuration["AppSettings:NSA_API_URL"].ToString();



                DataSet ds = objDAL.Get_NameScreenApi_Dtls("FD_NAME_SCREEN", "NAME_SCREEN_API", ApplNo);
                if (ds != null && ds.Tables.Count > 0)
                {
                    DataTable dt = ds.Tables[0];

                    if (dt != null && dt.Rows.Count > 0)
                    {

                        foreach (DataRow dr in dt.Rows)
                        {
                            if (Convert.ToString(dr["Key"]) == "API_CALL")
                                nameScreen.Api_call = dr["Value"].ToString();
                            else if (Convert.ToString(dr["Key"]) == "blackListCheck")
                                nameScreen.blackListCheck = dr["Value"].ToString();
                            else if (Convert.ToString(dr["Key"]) == "customerDataBaseCheck")
                                nameScreen.customerDataBaseCheck = dr["Value"].ToString();
                            else if (Convert.ToString(dr["Key"]) == "rejectedListCheck")
                                nameScreen.rejectedListCheck = dr["Value"].ToString();
                            else if (Convert.ToString(dr["Key"]) == "employeeDataBaseCheck")
                                nameScreen.employeeDataBaseCheck = dr["Value"].ToString();

                        }

                        if (nameScreen.Api_call == "1")
                        {
                            //string Deposit_Date = DateTime.Now.ToString("yyyy-MM-dd");
                            nameScreen.name1 = Convert.ToString(kycDetails[0].Kyc_FullName);
                            nameScreen.name2 = "";
                            nameScreen.name3 = "";
                            nameScreen.name4 = "";
                            nameScreen.name5 = "";
                            nameScreen.dob = DateTime.ParseExact(kycDetails[0].Kyc_DOB, "yyyy-MM-dd", CultureInfo.InvariantCulture).ToString("dd-MM-yyyy"); //Convert.ToString(kycDetails[0].Kyc_DOB);
                            nameScreen.doi = "";
                            nameScreen.address = "";
                            nameScreen.passportNo = "";
                            nameScreen.pancardNo = "";
                            nameScreen.idNumber1 = "";
                            nameScreen.idNumber2 = "";
                            nameScreen.idNumber3 = "";
                            nameScreen.idNumber4 = "";
                            nameScreen.idNumber5 = "";
                            nameScreen.country1 = "IN";
                            nameScreen.country2 = "";
                            nameScreen.country3 = "";
                            nameScreen.country4 = "";
                            nameScreen.country5 = "";
                            nameScreen.remarks = "";
                            nameScreen.appl_No = ApplNo;
                            nameScreen.folio_No = "";
                            nameScreen.sysRefNo = "";
                            nameScreen.holderType = Convert.ToString(kycDetails[0].Holder_Type);
                            nameScreen.source = "CPTP_UNI";
                            nameScreen.sourceType = "FD";
                            nameScreen.sourceSubType = "CPTP_UNI";
                            nameScreen.sessionId = sessionBO.Session_ID.ToString();
                            nameScreen.createdBy = sessionBO.CreatedBy;
                            nameScreen.createdIP = sessionBO.CreatedIP;
                            nameScreen.addtional1 = "";
                            nameScreen.addtional2 = "";

                            #region NAS_RC
                            string reqNSAJson = JsonConvert.SerializeObject(nameScreen);

                            var keyHeader = new KeyValuePair<string, string>("apikey", configuration["AppSettings:NSA_API_APG_KEY"].ToString());
                            IDictionary<string, string> _hdrDict = new Dictionary<string, string>();
                            _hdrDict.Add(keyHeader);

                            string response = string.Empty;
                            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(NSA_API_URL);
                            request.Method = "POST";
                            request.ContentType = "application/json";
                            foreach (KeyValuePair<string, string> ele in _hdrDict)
                            {
                                request.Headers[ele.Key] = ele.Value;
                            }

                            using (Stream webStream = request.GetRequestStream())
                            using (StreamWriter requestWriter = new StreamWriter(webStream, System.Text.Encoding.ASCII))
                            {
                                string json = reqNSAJson;
                                requestWriter.Write(json);
                                requestWriter.Flush();
                            }

                            //string response = string.Empty;
                            WebResponse webResponse = request.GetResponse();
                            using (Stream webStream = webResponse.GetResponseStream())
                            {
                                if (webStream != null)
                                {
                                    using (StreamReader Mobile_responseReader = new StreamReader(webStream))
                                    {
                                        strRes = Mobile_responseReader.ReadToEnd();
                                    }
                                }
                            }

                            if (!string.IsNullOrEmpty(strRes))
                            {
                                objNSAResBo = JsonConvert.DeserializeObject<NSA_RESPONSE_BO>(strRes);
                                if (objNSAResBo != null)
                                {
                                    if (objNSAResBo.status.ToUpper() == "SUCCESS" && objNSAResBo.nameScreeingStatus.ToUpper() == "ALLOWED")
                                    {

                                        DataSet dsRC = objDAL.Get_NameScreenApi_Dtls("FD_RISK_CATEGORY", "RISK_CATEOGORY_API", ApplNo);
                                        //risk_category = Convert.ToString(dr["IsRiskCat_Call"]) == "1" ? await Get_RiskCategory(holdersDetail, sessionBO, kycDetails, ApplNo) : "SUCCESS";
                                        risk_category = await Get_RiskCategory(sessionBO, kycDetails, ApplNo, dsRC);

                                        kycDetails[0].InvNSA_Status = "Y";
                                        _ = result.Append(objNSAResBo.status + ";");
                                        _ = result.Append(risk_category + ";");
                                    }
                                    else
                                    {
                                        

                                        kycDetails[0].InvNSA_Status = "N";

                                        _ = result.Append("FAILED;");
                                        _ = result.Append(objNSAResBo.status + ";");
                                    }
                                }
                            }
                            else
                            {
                                _ = result.Append("FAIL;");
                            }
                            #endregion
                        }
                        else
                        {
                            DataSet dsRC = objDAL.Get_NameScreenApi_Dtls("FD_RISK_CATEGORY", "RISK_CATEOGORY_API", ApplNo);
                            string _RCApiCall = string.Empty;

                            if (dsRC != null && dsRC.Tables.Count > 0)
                            {
                                foreach (DataRow row in dt.Rows)
                                {
                                    if (Convert.ToString(row["Key"]) == "API_CALL")
                                        _RCApiCall = row["Value"].ToString();
                                }
                            }
                            if (_RCApiCall == "1")
                            {
                                risk_category = await Get_RiskCategory(sessionBO, kycDetails, ApplNo, dsRC);
                            }
                            else
                            {
                                _ = result.Append("SUCCESS;");
                            }
                        }
                    }
                    else
                    {
                        _ = result.Append("FAIL;");
                    }
                }
                else
                {
                    _ = result.Append("FAIL;");
                }
                if (!string.IsNullOrEmpty(Convert.ToString(result)))
                {
                    if (Convert.ToString(result).Contains("FAIL"))
                        _ = result.Append("FAIL;");
                    else
                        return "SUCCESS";
                }
                else
                    _ = result.Append("FAIL;");

            }
            catch (Exception)
            {
                _ = result.Append("FAIL;");
                throw;
            }
            return result.ToString();
        }

        public async Task<string> Get_RiskCategory(SessionBO sessionBO, List<KYCDataDetailBO> kycDetails, string ApplNo, DataSet ds)
        {
            StringBuilder result = new StringBuilder();
            HolderDetailsDAL objDAL = new HolderDetailsDAL(Startup.Configuration);
            RiskCategoryRequest_BO objRCReqBo = new RiskCategoryRequest_BO();
            string IsPEP = string.Empty;
            string IsMWE = string.Empty;
            string RC_API_URL = configuration["AppSettings:RISK_CATEGORY_API_URL"].ToString();
            string _Apicall = string.Empty;

            try
            {

                if (ds != null && ds.Tables.Count > 0)
                {
                    DataTable dtr = ds.Tables[0];

                    if (ds.Tables[1] != null && ds.Tables[1].Rows.Count > 0)
                    {
                        kycDetails[0].SchemeCode = Convert.ToString(ds.Tables[1].Rows[0]["f_Scheme_Code"]);
                    }


                    if (dtr != null && dtr.Rows.Count > 0)
                    {
                        foreach (DataRow dr in dtr.Rows)
                        {
                            if (Convert.ToString(dr["Key"]) == "API_CALL")
                                _Apicall = Convert.ToString(dr["Value"]);


                            else if (Convert.ToString(dr["Key"]) == "customerType")
                                objRCReqBo.customerType = Convert.ToString(dr["Value"]);
                            else if (Convert.ToString(dr["Key"]) == "constitutionType")
                                objRCReqBo.constitutionType = Convert.ToString(dr["Value"]);
                            else if (Convert.ToString(dr["Key"]) == "highNetWorth")
                                objRCReqBo.highNetWorth = Convert.ToString(dr["Value"]);
                            else if (Convert.ToString(dr["Key"]) == "isSTRSent")
                                objRCReqBo.isSTRSent = Convert.ToString(dr["Value"]);
                            else if (Convert.ToString(dr["Key"]) == "nonFaceToFaceCustomers")
                                objRCReqBo.nonFaceToFaceCustomers = Convert.ToString(dr["Value"]);
                        }

                        IsPEP = kycDetails[0].IsInvPEP;
                        IsMWE = kycDetails[0].IsInvOSV;

                        if (_Apicall == "1")
                        {


                            objRCReqBo.customerId = "";
                            objRCReqBo.customerName = Convert.ToString(kycDetails[0].Kyc_FullName);
                            objRCReqBo.identificationType = "PAN";
                            objRCReqBo.identificationNumber = Convert.ToString(kycDetails[0].Kyc_PAN);
                            //objRCReqBo.highNetWorth = "N";
                            //objRCReqBo.isSTRSent =  "N";
                            objRCReqBo.pepCustomer = IsPEP;
                            objRCReqBo.nonFaceToFaceCustomers = IsMWE == "N" ? "Y" : "N"; //"Y";
                            objRCReqBo.country = "IN";
                            objRCReqBo.customerType = "32";
                            objRCReqBo.accountStatus = "L";
                            objRCReqBo.product = kycDetails[0].SchemeCode;// "FD-Q-PERIOD-CUM";
                            objRCReqBo.residentialStatus = "RESIDENT";
                            objRCReqBo.occupation = kycDetails[0].Kyc_Occ_CustSegType;
                            objRCReqBo.natureOfBusiness = kycDetails[0].Kyc_Occ_CustSegSubType;
                            objRCReqBo.modeOfOperation = "";
                            objRCReqBo.constitutionType = "INDIVIDUAL";//webconfig
                            objRCReqBo.appl_No = ApplNo;
                            objRCReqBo.folio_No = "";
                            objRCReqBo.sysRefNo = "";
                            objRCReqBo.holderType = Convert.ToString(kycDetails[0].Holder_Type);
                            objRCReqBo.source = "FD_CPTP_UNI";
                            objRCReqBo.sourceType = "FD";
                            objRCReqBo.sourceSubType = "FD_CPTP_UNI";
                            objRCReqBo.sessionId = sessionBO.Session_ID.ToString();
                            objRCReqBo.createdBy = sessionBO.CreatedBy;
                            objRCReqBo.createdIP = sessionBO.CreatedIP;
                            objRCReqBo.addtional1 = "";
                            objRCReqBo.addtional2 = "";
                            objRCReqBo.addtional3 = "";
                            objRCReqBo.dob = Convert.ToString(kycDetails[0].Kyc_DOB);
                            objRCReqBo.annual_Income = Convert.ToString(kycDetails[0].Kyc_Annual_Income_Code);// objBo.AnnualIncomeCode;
                            objRCReqBo.age = Convert.ToString(Convert.ToInt32(objDAL.isMinor(kycDetails[0].Kyc_DOB)));
                        }
                        else
                        {
                            _ = result.Append("FAIL;");
                        }
                    }
                    else
                    {
                        _ = result.Append("FAIL;");
                    }


                    string reqRCJson = JsonConvert.SerializeObject(objRCReqBo);
                    var keyHeader = new KeyValuePair<string, string>("apikey", configuration["AppSettings:RISK_CATEGORY_API_APG_KEY"].ToString());
                    IDictionary<string, string> _hdrDict = new Dictionary<string, string>();
                    _hdrDict.Add(keyHeader);

                    //_hdrDict.Add(new KeyValuePair<string, string>("Authorization", authkey));
                    //string strRes = await APICall.Get_APIResponse(NSA_API_URL, _hdrDict, reqNSAJson);
                    string strRes = string.Empty;

                    string response = string.Empty;
                    HttpWebRequest request = (HttpWebRequest)WebRequest.Create(RC_API_URL);
                    request.Method = "POST";
                    request.ContentType = "application/json";
                    foreach (KeyValuePair<string, string> ele in _hdrDict)
                    {
                        request.Headers[ele.Key] = ele.Value;
                    }

                    using (Stream webStream = request.GetRequestStream())
                    using (StreamWriter requestWriter = new StreamWriter(webStream, System.Text.Encoding.ASCII))
                    {
                        string json = reqRCJson;
                        requestWriter.Write(json);
                        requestWriter.Flush();
                    }

                    //string response = string.Empty;
                    WebResponse webResponse = request.GetResponse();
                    using (Stream webStream = webResponse.GetResponseStream())
                    {
                        if (webStream != null)
                        {
                            using (StreamReader Mobile_responseReader = new StreamReader(webStream))
                            {
                                strRes = Mobile_responseReader.ReadToEnd();
                            }
                        }
                    }

                    if (!string.IsNullOrEmpty(strRes))
                    {
                        RiskCategoryResAPI_BO objRCResBo = JsonConvert.DeserializeObject<RiskCategoryResAPI_BO>(strRes);
                        if (objRCResBo != null)
                        {
                            if (objRCResBo.status == "SUCCESS" && !string.IsNullOrEmpty(objRCResBo.riskCategoryStatus))
                            {
                                

                                kycDetails[0].InvRiskCategory = objRCResBo.riskCategoryStatus;
                                kycDetails[0].InvCompass_Ref_No = objRCResBo.data.compassRefNo;
                                _ = result.Append(objRCResBo.status + ";");
                            }
                            else
                            {

                                kycDetails[0].InvRiskCategory = "";

                                _ = result.Append("FAILED;");
                                _ = result.Append(objRCResBo.status + ";");
                            }
                        }
                    }
                    else
                    {
                        _ = result.Append("FAIL;");
                    }
                }
                else
                {
                    _ = result.Append("FAIL;");
                }
            }
            catch (Exception)
            {
                _ = result.Append("FAIL;");
            }
            return result.ToString();
        }


    }
}
