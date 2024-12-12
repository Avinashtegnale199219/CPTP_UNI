using ApiRequestor;
using FD_CPTP_UNIFIED;
using FD_CPTP_UNIFIED.BO;
using FD_OFFLINE_CKYC_UPDATE.BussinessObject;
using MF_FD_ESARATHI_APP.Models;
using System;
using System.Net.Http;

namespace FD_OFFLINE_CKYC_UPDATE.App_Code.Services
{
    public class PAN_Verification
    {
        public PANResBO Verify_PAN(PANReqBO objReqBO, SessionBO session)
        {
            try
            {
                string requestUri = Convert.ToString(Startup.Configuration["APIServices:PanVerification"]);

                PANResBO objPanResponseBO = new PANResBO();
                //objReqBO.App_Code = "";
                objReqBO.Appl_No = string.IsNullOrEmpty(objReqBO.Appl_No) ? session.Session_ID.ToString(): objReqBO.Appl_No.Trim();
                //objReqBO.MCP_Code = "";
                //objReqBO.SCP_Code = "";
                //objPanBO.MF_Sys_Ref_No = AppSessionDetails.SysRefNo;
                //objPanBO.CP_Trans_Ref_No = AppSessionDetails.SysRefNo;
                //objReqBO.Source_Type = "FD_CKYC_UPDATE_PORTAL";
                //objReqBO.Source_Sub_Type = "";
                //objReqBO.Holder_Type = "01";
                //objReqBO.User_Name = AppSessionDetails.NewUserName;
                //objReqBO.Remarks = "FD_CKYC_UPDATE_PORTAL";
                //objReqBO.PAN_Holder_Name = AppSessionDetails.NewUserName;
                //objReqBO.PAN_Holder_DOB = GetSqlDateFormatString(AppSessionDetails.DOB);
                //objReqBO.PAN_No = _Pan.ToUpper();
                objReqBO.CreatedBy = session.CreatedBy;
                objReqBO.CreatedByUName = session.CreatedByUName;
                objReqBO.CreatedIP = session.CreatedIP;
                objReqBO.SessionId = Convert.ToInt64(session.Session_ID);
                objReqBO.CreatedType = session.CreatedType;
                //objPanBO.Ref_Type = AppSessionDetails.SysRefNo;

                //var jsonobj = Newtonsoft.Json.JsonConvert.SerializeObject(objReqBO);
                using (HttpResponseMessage response = HttpRequestFactory.Post(requestUri, objReqBO).Result)
                {
                    if (response.IsSuccessStatusCode)
                    {
                        objPanResponseBO = response.ContentAsType<PANResBO>();
                        return objPanResponseBO;
                    }
                    else
                    {
                        //if (response.StatusCode == System.Net.HttpStatusCode.BadRequest)
                        //{
                        //    Message = response.ContentAsType<string>();
                        //}
                        //if (response.StatusCode == System.Net.HttpStatusCode.NoContent)
                        //{
                        //    Message = response.ContentAsType<string>();
                        //}
                        //else
                        //{
                        //    Message = "Something went wrong while processing your request !!";
                        //}
                    }

                    return objPanResponseBO;
                }

              

            }
            catch (Exception ex)
            {
                throw ex;
              
            }
        }
    }
}
