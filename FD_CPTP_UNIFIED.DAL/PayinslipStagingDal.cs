using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using BusinessObject;
using DBHelper;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class PayinslipStagingDal
    {
        private readonly string Connectusermgmt = string.Empty;
        private readonly string ConnBTP = string.Empty;
        public PayinslipStagingDal(IConfiguration configuration)
        {
          
            try
            {
                Connectusermgmt = configuration["ConnectionString:CONN_USER_MGMT"];
                ConnBTP = configuration["ConnectionString:CONN_FDBT"];
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataTable SaveMainPayinslip_Hdr(PayinslipStagingBo objPayinslipstagBo, List<PayinslipStagingBo> stagingBo1)
        {
            SqlTransaction sqlTran = null;
            SqlConnection sqlConn = new SqlConnection(ConnBTP);
            sqlConn.Open();
            sqlTran = sqlConn.BeginTransaction();

            long iResult = 0;
            DataTable Dt = null;
            try
            {
                SqlParameter[] param = new SqlParameter[39];
                param[0] = new SqlParameter("@strPayinslip_SourceName", objPayinslipstagBo.Payinslip_Source_Name);
                param[1] = new SqlParameter("@strPortalSourceCode", objPayinslipstagBo.PortalSourceCode);
                param[2] = new SqlParameter("@strMCP_Code", objPayinslipstagBo.MCP_Code);
                param[3] = new SqlParameter("@strSCP_Code", objPayinslipstagBo.SCP_Code);
                param[4] = new SqlParameter("@strMCP_Broker_Code", objPayinslipstagBo.MCP_Broker_Code);
                param[5] = new SqlParameter("@strSCP_Broker_Code", objPayinslipstagBo.SCP_Broker_Code);
                param[6] = new SqlParameter("@strEmployee_Code", objPayinslipstagBo.Employee_Code);
                param[7] = new SqlParameter("@strADO_Indicator", objPayinslipstagBo.ADO_Indicator);
                param[8] = new SqlParameter("@strCMS_Type", objPayinslipstagBo.CMS_Type);
                param[9] = new SqlParameter("@strCMS_Bank_Name", objPayinslipstagBo.CMS_Bank_Name);
                param[10] = new SqlParameter("@strCMS_Branch_Name", objPayinslipstagBo.CMS_Branch_Name);
                param[11] = new SqlParameter("@strCMS_Bank_IFSC_Code", objPayinslipstagBo.CMS_IFSC_Code);
                param[12] = new SqlParameter("@strCMS_Bank_MICR_Code", objPayinslipstagBo.CMS_MICR_Code);
                param[13] = new SqlParameter("@strMFBranch_Code", objPayinslipstagBo.MF_Branch_Code);
                param[14] = new SqlParameter("@strCMFBranch_Name", objPayinslipstagBo.MF_Branch_Name);
                param[15] = new SqlParameter("@strSCP_Location_Code", objPayinslipstagBo.SCP_Location_Code);
                param[16] = new SqlParameter("@strSCP_Location_Name", objPayinslipstagBo.SCP_Location_Name);
                param[17] = new SqlParameter("@strEntry_Date", objPayinslipstagBo.Entry_Date);
                param[18] = new SqlParameter("@strPickup_Date", objPayinslipstagBo.Pickup_Date);
                param[19] = new SqlParameter("@strPayinslip_No", objPayinslipstagBo.Payinslip_No);
                param[20] = new SqlParameter("@strReq_State", "");
                param[21] = new SqlParameter("@strReq_Status", "");
                param[22] = new SqlParameter("@strReq_Remarks", objPayinslipstagBo.Req_Remarks);
                param[23] = new SqlParameter("@strRemarks", objPayinslipstagBo.Remarks);
                param[24] = new SqlParameter("@strCreatedType", objPayinslipstagBo.CreatedType);
                param[25] = new SqlParameter("@strCreatedByName", objPayinslipstagBo.CreatedByName);
                param[26] = new SqlParameter("@strCreatedIP", objPayinslipstagBo.CreatedIP);
                param[27] = new SqlParameter("@strSessionID", objPayinslipstagBo.SessionID);
                param[28] = new SqlParameter("@strFormCode", objPayinslipstagBo.FormCode);
                param[29] = new SqlParameter("@strDummy", "");
                param[30] = new SqlParameter("@strPayinslip_Stg_HdrSequence", objPayinslipstagBo.Payinslip_Stg_HdrSequence);
                param[31] = new SqlParameter("@CMS_LOCATION_CODE", objPayinslipstagBo.CMS_LOC_CODE);
                param[32] = new SqlParameter("@SelectedCount", objPayinslipstagBo.count);
                param[33] = new SqlParameter("@strCMS_LOC_Code", objPayinslipstagBo.CMS_LOC_CODE);
                param[34] = new SqlParameter("@strCMS_LOC_Name", objPayinslipstagBo.CMS_LOC_NAME);
                param[35] = new SqlParameter("@BTP_LocationCode", objPayinslipstagBo.BTP_LOC_CODE);
                param[36] = new SqlParameter("@BTP_LocationDesc", objPayinslipstagBo.BTP_LOC_DESC);
                param[37] = new SqlParameter("@AgencyCode", objPayinslipstagBo.AgencyCode);
                param[38] = new SqlParameter("@AgencyName", objPayinslipstagBo.Agencyname);


                SqlCommand cmd = new SqlCommand("Usp_BT_Save_Payinslip_hdr", sqlConn, sqlTran);
                cmd.Parameters.AddRange(param);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                Dt = new DataTable();
                da.Fill(Dt);

                //int Dt1 = SqlHelper.ExecuteNonQuery(sqlTran, CommandType.StoredProcedure, "Usp_BT_Save_Payinslip_hdr", param);
                iResult = Convert.ToInt64(Dt.Rows[0]["HDR_Id"].ToString());
                int res = 0;
                if (iResult > 0)
                {
                    foreach (var i in stagingBo1)
                    {
                        SqlParameter[] param1 = new SqlParameter[50];
                        param1[0] = new SqlParameter("@strPayinslip_SourceName", i.Payinslip_Source_Name);
                        param1[1] = new SqlParameter("@strPortalSourceCode", i.PortalSourceCode);
                        param1[2] = new SqlParameter("@strMCP_Code", i.MCP_Code);
                        param1[3] = new SqlParameter("@strSCP_Code", i.SCP_Code);
                        param1[4] = new SqlParameter("@strMCP_Broker_Code", i.MCP_Broker_Code);
                        param1[5] = new SqlParameter("@strSCP_Broker_Code", i.SCP_Broker_Code);
                        param1[6] = new SqlParameter("@strEmployee_Code", i.Employee_Code);
                        param1[7] = new SqlParameter("@strADO_Indicator", i.ADO_Indicator);
                        param1[8] = new SqlParameter("@strCMS_Type", i.CMS_Type);
                        param1[9] = new SqlParameter("@strCP_Trans_Ref_No", i.CP_Trans_Ref_No);
                        param1[10] = new SqlParameter("@strCP_MF_Sys_Ref_no", i.MF_Sys_Ref_No);
                        param1[11] = new SqlParameter("@strRef_Type", i.Ref_Type);
                        param1[12] = new SqlParameter("@strRef_Cust_Code", i.Ref_Cust_Code);
                        param1[13] = new SqlParameter("@strRef_Rm_Code", i.Ref_RM_Code);
                        param1[14] = new SqlParameter("@strRef_Othr_Code", i.Ref_Other_Code);
                        param1[15] = new SqlParameter("@strCheque_Number", i.Cheque_Number);
                        param1[16] = new SqlParameter("@strProcess_Flg", "");
                        param1[17] = new SqlParameter("@strActive_Flg", i.Active_Flg);
                        param1[18] = new SqlParameter("@strProcess_Remarks", i.Process_Remarks);
                        param1[19] = new SqlParameter("@strCMS_Bank_Name", i.CMS_Bank_Name);
                        param1[20] = new SqlParameter("@strCMS_Branch_Name", i.CMS_Branch_Name);
                        param1[21] = new SqlParameter("@strCMS_Bank_IFSC_Code", i.CMS_IFSC_Code);
                        param1[22] = new SqlParameter("@strCMS_Bank_MICR_Code", i.CMS_MICR_Code);
                        param1[23] = new SqlParameter("@strCheque_Amt", i.Cheque_Amount);
                        param1[24] = new SqlParameter("@strDrawn_Bank_Name", i.Drawn_Bank_Name);
                        param1[25] = new SqlParameter("@strDrawn_Branch_Name", i.Drawn_Branch_name);
                        param1[26] = new SqlParameter("@strApplicant_Name", i.Applicant_Name);
                        param1[27] = new SqlParameter("@strApplication_Number", i.Application_No);
                        param1[28] = new SqlParameter("@strCMFBranch_Name", i.MF_Branch_Name);
                        param1[29] = new SqlParameter("@strSCP_Location_Code", i.SCP_Location_Code);
                        param1[30] = new SqlParameter("@strSCP_Location_Name", i.SCP_Location_Name);
                        param1[31] = new SqlParameter("@strEntry_Date", i.Entry_Date);
                        param1[32] = new SqlParameter("@strCheque_Date", i.Cheque_Date);
                        param1[33] = new SqlParameter("@strPickup_Date", i.Pickup_Date);
                        param1[34] = new SqlParameter("@strPayinslip_No", i.Payinslip_No);
                        param1[35] = new SqlParameter("@strRemarks", i.Remarks);
                        param1[36] = new SqlParameter("@strCreatedType", i.CreatedType);
                        param1[37] = new SqlParameter("@strCreatedByName", i.CreatedByName);
                        param1[38] = new SqlParameter("@strCreatedIP", i.CreatedIP);
                        param1[39] = new SqlParameter("@strSessionID", i.SessionID);
                        param1[40] = new SqlParameter("@strDummy", "");
                        param1[41] = new SqlParameter("@strPayinslip_HdrSequencee", iResult);
                        param1[42] = new SqlParameter("@strMFBranch_Code", i.MF_Branch_Code);
                        param1[43] = new SqlParameter("@strFormCode", i.FormCode);
                        param1[44] = new SqlParameter("@strCMS_LOC_Code", i.CMS_LOC_CODE);
                        param1[45] = new SqlParameter("@strCMS_LOC_Name", i.CMS_LOC_NAME);
                        param1[46] = new SqlParameter("@DrawnBankIFSCCode", i.Drawn_Bank_IFSC);
                        param1[47] = new SqlParameter("@DrawnBankMICRCode", i.Drawn_Bank_MICR);
                        param1[48] = new SqlParameter("@BTP_LocationCode", i.BTP_LOC_CODE);
                        param1[49] = new SqlParameter("@BTP_LocationDesc", i.BTP_LOC_DESC);

                        SqlCommand cmd1 = new SqlCommand("Usp_bt_Save_Payinslip_Dtl", sqlConn, sqlTran);
                        cmd1.Parameters.AddRange(param1);
                        cmd1.CommandType = CommandType.StoredProcedure;
                        res = cmd1.ExecuteNonQuery();

                        //int res = SqlHelper.ExecuteNonQuery(sqlTran, CommandType.StoredProcedure, "Usp_bt_Save_Payinslip_Dtl", param1);

                        if (res <= 0)
                        {
                            sqlTran.Rollback();
                            return null;
                        }


                    }

                    if (iResult > 0 && res > 0)
                    {
                        sqlTran.Commit();
                    }


                }
                else
                {
                    sqlTran.Rollback();
                }
            }
            catch (Exception ex)
            {
                sqlTran.Rollback();
                //ExceptionUtility.LogExceptionAsync(ex);
                throw ex;
            }
            finally
            {
                sqlConn.Close();
                sqlTran = null;
            }
            return Dt;
        }

        public DataTable GetMmfslBranch(string statecode)
        {
            DataSet ds = new DataSet();
            try
            {
                //SqlConnection con = new SqlConnection(strConn);
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@StateCode", statecode);
                ds = SqlHelper.ExecuteDataSet(Connectusermgmt, CommandType.StoredProcedure, "usp_FD_CP_Get_Mmfsl_Branch", sqlparam);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return ds.Tables[0];
                else
                    return null;
            }
            catch (Exception ex)
            {
                //String str = ex.Message;
                //return null;
                throw ex;
            }
        }

        public DataTable GetStagingData(string CMSBankName, string MFBranchCode, string BTP_Agency_Branch_Code, string BTP_Agency_BranchName, string AgencyName, string  AgencyCode,string Source, string EntityType,string usercode)
        {
            
            try
            {
                // SqlConnection con = new SqlConnection(Conn);
                SqlParameter[] sqlparam = new SqlParameter[9];
                sqlparam[0] = new SqlParameter("@CMS_Bank_Name", CMSBankName);
                sqlparam[1] = new SqlParameter("@CMS_Location_Code", MFBranchCode);
                sqlparam[2] = new SqlParameter("@Btp_Agency_Usr_Branch_Cd", BTP_Agency_Branch_Code);
                sqlparam[3] = new SqlParameter("@Btp_Agency_Usr_Branch_Name", BTP_Agency_BranchName);
                sqlparam[4] = new SqlParameter("@AgencyCode", AgencyCode);
                sqlparam[5] = new SqlParameter("@AgencyName", AgencyName);
                sqlparam[6] = new SqlParameter("@Source", Source);
                sqlparam[7] = new SqlParameter("@entitytype", EntityType);
                sqlparam[8] = new SqlParameter("@Agencyusercode", usercode);
                
               
               return SqlHelper.ExecuteDataTable(ConnBTP, CommandType.StoredProcedure, "Usp_BT_Get_Payinslip_Staging_Hdr", sqlparam);
              
            }
            catch (Exception ex)
            {
                //String str = ex.Message;
                //return null;
                throw ex;
            }
        }

        public DataTable GetBank()
        {
            DataSet ds = new DataSet();
            try
            {
                SqlConnection con = new SqlConnection(ConnBTP);
                ds = SqlHelper.ExecuteDataSet(con, CommandType.StoredProcedure, "usp_FD_BT_Get_CMS_Bank");
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return ds.Tables[0];
                else
                    return null;
            }
            catch (Exception ex)
            {
                //String str = ex.Message;
                //return null;
                throw ex;
            }
        }

        public DataTable GetCMSBranch(string Statecode)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlConnection con = new SqlConnection(Connectusermgmt);
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Agency_Loc_Code", Statecode);
                ds = SqlHelper.ExecuteDataSet(con, CommandType.StoredProcedure, "usp_FD_BT_Get_User_CMSBranch", sqlparam);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return ds.Tables[0];
                else
                    return null;
            }
            catch (Exception ex)
            {
                //String str = ex.Message;
                //return null;
                throw ex;
            }
        }

        public DataTable GetBranch(string Userclusterid)
        {

            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Agency_Usr_Clust_ID", Userclusterid);
                DataSet ds = SqlHelper.ExecuteDataSet(Connectusermgmt, CommandType.StoredProcedure, "usp_Get_User_Location", sqlparam);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return ds.Tables[0];
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw ex;
                //return null;
            }
        }

        public DataSet GetPayiniSlipHdrData(string CMSBankName, string MFBranchCode, string CMSLOCCODE, string CMSLOCNAME, string fromdate, string todate,
            string BTP_LocationCode, string BTP_LocationDesc, string AgencyName, string AgencyCode)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlConnection con = new SqlConnection(ConnBTP);
                SqlParameter[] sqlparam = new SqlParameter[10];
                sqlparam[0] = new SqlParameter("@CMS_Bank_Name", CMSBankName);
                sqlparam[1] = new SqlParameter("@CMS_Location_Cd", CMSLOCCODE);
                sqlparam[2] = new SqlParameter("@CMS_Location", CMSLOCNAME);
                sqlparam[3] = new SqlParameter("@MF_Branch_Code", MFBranchCode);
                sqlparam[4] = new SqlParameter("@FromDate", DateTime.ParseExact(fromdate, "dd/MM/yyyy", new CultureInfo("en-CA")));
                sqlparam[5] = new SqlParameter("@ToDate", DateTime.ParseExact(todate, "dd/MM/yyyy", new CultureInfo("en-CA")));
                sqlparam[6] = new SqlParameter("@BTP_Location_Cd", BTP_LocationCode);
                sqlparam[7] = new SqlParameter("@BTP_Location_Desc", BTP_LocationDesc);
                sqlparam[8] = new SqlParameter("@AgencyCode ", AgencyCode);
                sqlparam[9] = new SqlParameter("@AgencyName ", AgencyName);

                ds = SqlHelper.ExecuteDataSet(con, CommandType.StoredProcedure, "Usp_BT_Get_Payinslip_Hdr", sqlparam);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return ds;

                else
                    return ds;
            }
            catch (Exception ex)
            {
                //String str = ex.Message;
                //return null;
                throw ex;
            }
        }

        public DataSet GetPayiniSlipDtlData(string HdrSeq)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlConnection con = new SqlConnection(ConnBTP);
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@hdrSeq", HdrSeq);
                ds = SqlHelper.ExecuteDataSet(con, CommandType.StoredProcedure, "Usp_BT_Get_Payinslip_dtl", sqlparam);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return ds;
                else
                    return null;
            }
            catch (Exception ex)
            {
                //String str = ex.Message;
                //return null;
                throw ex;
            }
        }

        public DataTable GetPayinslipDtlDataEx(string HdrSeq)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlConnection con = new SqlConnection(ConnBTP);
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@HdrSeq", HdrSeq);
                ds = SqlHelper.ExecuteDataSet(con, CommandType.StoredProcedure, "USP_BTP_GeneratePayinSlip_BankFile", sqlparam);
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                    return ds.Tables[0];
                else
                    return null;
            }
            catch (Exception ex)
            {
                //String str = ex.Message;
                //return null;
                throw ex;
            }
        }


    }
}
