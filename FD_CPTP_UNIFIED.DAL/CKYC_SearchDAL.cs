using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using System.Security.Principal;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using DBHelper;
using FD_CPTP_UNIFIED.BO;
using Impersonate;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class CKYC_SearchDAL
    {
        readonly string Conn = string.Empty;
        private readonly IConfiguration _configuration;

        public CKYC_SearchDAL(IConfiguration configuration)
        {
            _configuration = configuration;
            Conn = configuration["ConnectionString:CONN_FDBT"];
        }

        public string IsCKYCVerifiedAlready(string pan, string _CkycNo, SessionBO session)
        {
            SqlParameter[] sqlparam = new SqlParameter[9];
            string status = string.Empty;
            try
            {
                sqlparam[0] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[1] = new SqlParameter("@Sys_Ref_No", "");
                sqlparam[2] = new SqlParameter("@Pan", pan);
                sqlparam[3] = new SqlParameter("@Ckyc_Var_Number", _CkycNo);
                sqlparam[4] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[5] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[6] = new SqlParameter("@CreatedType", session.CreatedType);
                sqlparam[7] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[8] = new SqlParameter("@Status", "");
                sqlparam[8].Direction = ParameterDirection.Output;
                sqlparam[8].Size = 100;
                int res = SqlHelper.ExecuteNonQuery(Conn, CommandType.StoredProcedure, "Usp_FD_BT_Check_Ckyc_Data_Dtl", sqlparam);
                status = Convert.ToString(sqlparam[3].Value);
                if (!string.IsNullOrEmpty(status))
                {
                    return status;
                }
                else
                    return "fail";

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                sqlparam = null;
            }
        }

        public string Save_CKYC_Search_Dtls(PersonalDetails_BO objBo, DownloadCKYC_ESB_RespBO downloadCKYC_ESB_RespBO
            , DownloadCkycRequestDetailsBO objCKCBO, XNode node, XmlDocument doc1, XmlDocument doc2, SessionBO session, string TransactionStatus)
        {
            int i = 0;
            System.Xml.XmlDocument xdoc = new System.Xml.XmlDocument();
            xdoc.LoadXml(node.ToString());

            List<SqlParameter> Params2 = new List<SqlParameter>();
            SqlParameter[] Params1 =
            {
                 new SqlParameter("@Appl_No",objBo.Appl_No),
                 new SqlParameter("@Source_Type",objCKCBO.Source_Type),
                 new SqlParameter("@Source_Sub_Type",objCKCBO.Source_Sub_Type),
                 new SqlParameter("@Holder_Type",objBo.Holder_Type),
                 new SqlParameter("@Ckyc_Var_Number",string.IsNullOrEmpty(objCKCBO.OVDRefNo)? objCKCBO.CKYC_Number:objCKCBO.OVDRefNo),
                 new SqlParameter("@RequestID",CheckForNullValues(downloadCKYC_ESB_RespBO.result.DownloadCkycResponse.RequestId)),//objBo.f_RequestID),           
                 new SqlParameter("@CreatedIP", session.CreatedIP),
                 new SqlParameter("@CreatedBy", session.CreatedBy),
                 new SqlParameter("@CreatedByUName", session.CreatedByUName),
                 new SqlParameter("@CreatedType", session.CreatedType),
                 new SqlParameter("@SessionID", session.Session_ID),
                 new SqlParameter("@Form_Code", session.FormCode),
                 new SqlParameter("@PAN",objBo.PAN)
                };
            Params2.AddRange(Params1);
            SqlParameter param = new SqlParameter("@ResponseText", SqlDbType.Xml)
            {
                Value = xdoc.InnerXml
            };
            Params2.Add(param);
            SqlParameter param1 = new SqlParameter("@ResponseImgDtls", SqlDbType.Xml)
            {
                Value = doc1.InnerXml
            };
            Params2.Add(param1);

            i = SqlHelper.ExecuteNonQuery(Conn, CommandType.StoredProcedure, "USP_FD_BT_SAVE_CKYC_SEARCH_DTLS_V1", Params2.ToArray());
            if (i > 0)
            {
                return "success";
            }
            else
                return "fail";
        }

        public DataTable GET_CKYC_DATA_DTLS(PersonalDetails_BO personalDetails)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[5];
                sqlparam[0] = new SqlParameter("@Appl_No", personalDetails.Appl_No);
                sqlparam[1] = new SqlParameter("@Holder_Type", personalDetails.Holder_Type);
                sqlparam[2] = new SqlParameter("@PAN", personalDetails.PAN);
                sqlparam[3] = new SqlParameter("@DOB", string.IsNullOrEmpty(personalDetails.DOB) ? (object)DBNull.Value : DateTime.ParseExact(personalDetails.DOB, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture));
                sqlparam[4] = new SqlParameter("@Ckyc_Var_No", personalDetails.Ckyc_Var_No);
                return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "Usp_FD_BT_Get_Ckyc_Data_Dtl", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        private object CheckForNullValues(string valuetoCheck)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(valuetoCheck))
                    return DBNull.Value;
                else
                    return valuetoCheck;
            }
            catch (Exception)
            {

                throw;
            }

        }


        public DataTable GET_CKYC_OVD_DTLS(string CKYC_Number, string Appl_No, string HolderType)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@CKYC_Number", CKYC_Number);
                sqlparam[1] = new SqlParameter("@Appl_No", Appl_No);
                sqlparam[2] = new SqlParameter("@Holder_Type", HolderType);
                return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "USP_FD_BT_GET_CKYC_OVD_IMAGE_DTL_V1", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public XmlDocument SAVE_CKYC_OVD_DTLS(string CKYC_Number, string Appl_No, string Holder_Type)
        {
            XmlDocument imgDtlsXml = null;
            XmlDocument doc1 = new XmlDocument();
            //XmlDocument doc2 = new XmlDocument();
            var objKYC_BO = new List<KYCDocumentBO>();

            DataTable dt = GET_CKYC_OVD_DTLS(CKYC_Number, Appl_No, Holder_Type);

            if (dt != null && dt.Rows.Count > 0)
            {
                var ImageDetailsList = new List<CKYCImageDetail>();

                var _imp = new ImpersonateUser();
                string nasUserId = _configuration["FS_key:DocUserID"];
                string nasPassword = _configuration["FS_key:DocPWD"];
                string RootPath = _configuration["FS_key:DocPath"];

               // WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
               //{

                   for (int i = 0; i < dt.Rows.Count; i++)
                   {
                       WebClient webClient = new WebClient();
                       Int64 PKID = Convert.ToInt64(dt.Rows[i]["ID"]);
                       string ImageData = Convert.ToString(dt.Rows[i]["ImageData"]);
                       string ImageType = Convert.ToString(dt.Rows[i]["ImageType"]);
                       string ImageExt = Convert.ToString(dt.Rows[i]["ImageExt"]);
                       string CKyc_ID_Number = Convert.ToString(dt.Rows[i]["CKyc_ID_Number"]);
                       string CKyc_ID_Expiry_Date = Convert.ToString(dt.Rows[i]["CKyc_ID_Expiry_Date"]);
                       string ImageName = Convert.ToString(dt.Rows[i]["ImageName"]);
                       string ImagePath = Convert.ToString(dt.Rows[i]["ImagePath"]);
                       bool IsDocumentMasked = Convert.ToBoolean(dt.Rows[i]["IsDocumentMasked"]);

                       string Filename = string.Empty;
                       var FullPath = string.Empty;

                       //var CKYCImageData = ImageData.Replace('-', '+').Replace('_', '/').PadRight(4 * ((ImageData.Length + 3) / 4), '=');
                       byte[] bytes = webClient.DownloadData(Path.Combine(ImagePath, ImageName));

                       Filename = Appl_No + "_CKYC_" + Holder_Type + "_" + ImageType + "_" + DateTime.Now.Ticks + "." + ImageExt;
                       FullPath = Path.Combine(RootPath, Filename);

                       //byte[] bytes = Convert.FromBase64String(CKYCImageData);
                       File.WriteAllBytes(FullPath, bytes);

                       if (System.IO.File.Exists(FullPath))
                       {
                           KYCDocumentBO OBJbO = new KYCDocumentBO();
                           OBJbO.PKID = PKID;
                           OBJbO.Kyc_ImageType = ImageType;
                           OBJbO.FileName = Filename;
                           OBJbO.ImageSequence = "";
                           OBJbO.Filepath = RootPath;
                           OBJbO.KYCDocValue = CKyc_ID_Number;
                           OBJbO.KYCDocExpDate = string.IsNullOrEmpty(CKyc_ID_Expiry_Date) ? null : CKyc_ID_Expiry_Date;
                           OBJbO.CKYCImageData = "";
                           OBJbO.CKYCImageExtension = ImageExt;
                           OBJbO.CKYCImageGlobalorLocal = "";
                           OBJbO.CKYCImageSequence = "";
                           OBJbO.CKYCImageType = ImageType;
                           OBJbO.IsDocumentMasked = IsDocumentMasked;
                           objKYC_BO.Add(OBJbO);
                       }

                   }

               //});

                if (objKYC_BO != null)
                {
                    StringBuilder sb = new StringBuilder();
                    XmlWriterSettings xws = new XmlWriterSettings
                    {
                        OmitXmlDeclaration = true,
                        Indent = true
                    };

                    using (XmlWriter xw = XmlWriter.Create(sb, xws))
                    {
                        XElement child2 = new XElement("ArrayOfCKYCImageDetail",
                        from kycdoc in objKYC_BO
                        select new XElement("CKYCImageDetail",
                               new XElement("PKID", kycdoc.PKID),
                               new XElement("CKYCNumber", CKYC_Number),
                                new XElement("CKYCImageBranch", kycdoc.CKYCImageBranch),
                                 new XElement("CKYCImageData", kycdoc.CKYCImageData),
                                 new XElement("CKYCImageExtension", kycdoc.CKYCImageExtension),
                                 new XElement("CKYCImageGlobalorLocal", kycdoc.CKYCImageGlobalorLocal),
                                 new XElement("CKYCImageSequence", kycdoc.CKYCImageSequence),
                                 new XElement("CKYCImageType", kycdoc.CKYCImageType),
                                  new XElement("CKYCFileName", kycdoc.FileName),
                                 new XElement("CKYCFilePath", kycdoc.Filepath),
                                 new XElement("CKYCDocValue", kycdoc.KYCDocValue),
                                 new XElement("CKYCDocExpDate", kycdoc.KYCDocExpDate),
                                 new XElement("IsDocumentMasked", kycdoc.IsDocumentMasked)
                             ));
                        child2.WriteTo(xw);
                    }

                    doc1.LoadXml(sb.ToString());
                }
                imgDtlsXml = XmGenrate.SerializeToXmlDoc(ImageDetailsList);
            }

            return doc1;
        }
    }

    public static class XmGenrate
    {
        public static XmlDocument SerializeToXmlDoc<T>(this List<T> list)
        {
            DataContractSerializer dcs = new DataContractSerializer(typeof(List<T>));
            MemoryStream ms = new MemoryStream();
            dcs.WriteObject(ms, list);
            ms.Position = 0;
            XmlDocument doc = new XmlDocument();
            doc.Load(ms);
            return doc;
        }

    }

}
