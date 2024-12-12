using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace FD_CPTP_UNIFIED.DAL
{
    public class ApplicationRenewalDAL
    {
        readonly string Conn = string.Empty;
        public ApplicationRenewalDAL(IConfiguration configuration)
        {
            Conn = configuration["ConnectionString:CONN_FDBT"];
        }

        public async Task<DataTable> GET_APPLS_FOR_SearchRenewalAsync(SearchRenewalRequestBO requestBO, SessionBO session)
        {
            var dt = new DataTable();

            try
            {
                SqlParameter[] sqlParam = {
                      new SqlParameter("@FDR", string.IsNullOrEmpty(requestBO.FDR) ? (object)DBNull.Value : requestBO.FDR),
                      new SqlParameter("@FOLIO", string.IsNullOrEmpty(requestBO.FOLIO) ? (object)DBNull.Value : requestBO.FOLIO),
                      new SqlParameter("@PAN", string.IsNullOrEmpty(requestBO.PAN) ? (object)DBNull.Value : requestBO.PAN),
                      new SqlParameter("@DOB", string.IsNullOrEmpty(requestBO.DOB) ? (object)DBNull.Value : DateTime.ParseExact(requestBO.DOB, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture)),
                      new SqlParameter("@Agency_Code", session.Agency_Cd),
                      new SqlParameter("@BROK_CODE", session.Busi_Broker_Cd)
                };
                return await SqlHelper.ExecuteDataTableAsync(Conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_RW_GET_APPL_LIST_FOR_RENEW", sqlParam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
        }

        //public async Task<DataTable> GET_APPL_DTLS_FOR_RenewalAsync(SearchApplicationBO obj, SessionBO session)
        //{
        //    DataTable res = new DataTable();
        //    try
        //    {
        //        SqlParameter[] sqlparam = new SqlParameter[5];
        //        sqlparam[0] = new SqlParameter("@RefType", "BackOffice");
        //        sqlparam[1] = new SqlParameter("@Ref_No", obj.Appl_No);
        //        sqlparam[2] = new SqlParameter("@f_SearchBy", obj.searchby);
        //        sqlparam[3] = new SqlParameter("@f_SearchBy_Ref_No", obj.Searchbyref);
        //        sqlparam[4] = new SqlParameter("@Dep_Category", obj.Dep_Category);

        //        //sqlparam[2] = new SqlParameter("@f_SearchBy_DOB", string.IsNullOrEmpty(obj.SearchByDOB) ? (object)DBNull.Value : DateTime.ParseExact(obj.SearchByDOB, "yyyy-MM-dd", CultureInfo.InvariantCulture));
        //        //sqlparam[3] = new SqlParameter("@CreatedBy", session.CreatedBy);
        //        //sqlparam[4] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
        //        //sqlparam[5] = new SqlParameter("@CreatedIP", session.CreatedIP);
        //        //sqlparam[6] = new SqlParameter("@SessionID", session.Session_ID);
        //        //sqlparam[7] = new SqlParameter("@FormCode", session.FormCode);
        //        //sqlparam[8] = new SqlParameter("@Holder_Type", obj.HolderType);
        //        //sqlparam[9] = new SqlParameter("@Source", session.Source);
                
        //        res = await SqlHelper.ExecuteDataTableAsync(Conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_RW_RENEW_Copy", sqlparam);
        //        return res;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public async Task<DataSet> GET_APPL_DTLS_FOR_RENEWAsync(string fdr_no, SessionBO session)
        {
            DataSet ds = new DataSet();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[5];
                sqlparam[0] = new SqlParameter("@FDR_NO", fdr_no);
                sqlparam[1] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[2] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[3] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[4] = new SqlParameter("@Source", "CPTP_UNI_RW");

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_RW_GET_APPL_DTLS_FOR_RENEW_V1",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(ds));
                    sqlConn.Close();
                    return ds;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DataSet> GET_APPL_DTLS(string Appl_No, SessionBO session)
        {
            DataSet ds = new DataSet();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[5];
                sqlparam[0] = new SqlParameter("@Appl_No", Appl_No);
                sqlparam[1] = new SqlParameter("@UserId", session.Agency_Usr_Clustered_ID);
                sqlparam[2] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[3] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[4] = new SqlParameter("@Source", "CPTP_UNI_RW");

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GET_APPL_DTLS",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(ds));
                    sqlConn.Close();
                    return ds;
                }

            }
            catch (Exception)
            {
                //return false;
                throw;
            }
        }
    }
}
