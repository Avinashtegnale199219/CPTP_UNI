using System;
using System.Data;
using System.Data.OracleClient;
using System.Data.SqlClient;
using System.Globalization;
using System.Threading.Tasks;
using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class RenewalRequestEntryDAL
    {
        private readonly string ConnBTP = string.Empty;
        private readonly string ConnFD = string.Empty;
        private readonly string ConnORA = string.Empty;

        public RenewalRequestEntryDAL(IConfiguration configuration)
        {
            try
            {
                ConnBTP = configuration["ConnectionString:CONN_FDBT"];
                ConnFD = configuration["ConnectionString:CONN_FD"];
                ConnORA = configuration["ConnectionString:CONN_ORA"];
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DataTable> GetDashboardAsync(SearchRenewalRequestBO requestBO, SessionBO session)
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
              
                return await SqlHelper.ExecuteDataTableAsync(ConnBTP, CommandType.StoredProcedure, "USP_FD_BT_Renewal_GetDashboard", sqlParam);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
               
            }
        }

        public DataTable Save_Renewal_Request_Entry_BT_TRAN(SaveRenewalRequestEntryBO requestBO, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            DataTable ds = new DataTable();
            try
            {
                SqlParameter[] sqlParam = {
                    new SqlParameter("@FDR", requestBO.FDR_NO),
                    new SqlParameter("@BatchNo", requestBO.BatchNo),
                    new SqlParameter("@RenewalFor", requestBO.RenewalFor),
                    new SqlParameter("@CreatedBy", session.CreatedBy),
                    new SqlParameter("@CreatedByUName", session.CreatedByUName),
                    new SqlParameter("@CreatedIP", session.CreatedIP),
                    new SqlParameter("@SessionId", session.Session_ID.ToString()),
                    new SqlParameter("@Source", session.Source),
                    new SqlParameter("@Form_Code", session.FormCode),
                    new SqlParameter("@Agency_Code", session.Agency_Cd),
                    new SqlParameter("@Agency_Name", session.Agency_Name),
                    new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd),
                    new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc),
                    new SqlParameter("@BROK_CODE", requestBO.NewBrokerCode)
                };

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_SAVE_RENEWAL_REQUEST_ENTRY",
                    CommandType = CommandType.StoredProcedure,
                };

                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlParam);

                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    sda.Fill(ds);
                    return ds;
                }
                //return SqlHelper.ExecuteDataTable(sqlTrans, CommandType.StoredProcedure, "USP_FD_BT_SAVE_RENEWAL_REQUEST_ENTRY", sqlParam);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public string Save_Renewal_Request_Entry_ORA(SaveRenewalRequestEntryBO entryBO, SessionBO session)
        {
            try
            {
                OracleParameter[] parameterArray = new OracleParameter[5];
                OracleParameter p1 = new OracleParameter("PDEP_NO", OracleType.VarChar, 50);
                p1.Direction = ParameterDirection.Input;
                p1.Value = entryBO.Appl_No;
                parameterArray[0] = p1;

                OracleParameter p2 = new OracleParameter("PREQ_USER", OracleType.VarChar, 50);
                p2.Direction = ParameterDirection.Input;
                p2.Value = entryBO.NewBrokerCode;
                parameterArray[1] = p2;

                OracleParameter p3 = new OracleParameter("PREN_TYPE", OracleType.VarChar, 50);
                p3.Direction = ParameterDirection.Input;
                p3.Value = entryBO.RenewalFor;
                parameterArray[2] = p3;

                OracleParameter p4 = new OracleParameter("PREQ_BATCH", OracleType.VarChar, 50);
                p4.Direction = ParameterDirection.Input;
                p4.Value = session.Source;
                parameterArray[3] = p4;

                OracleParameter p5 = new OracleParameter("PERRMSG", OracleType.VarChar, 50);
                p5.Direction = ParameterDirection.Output;
                parameterArray[4] = p5;


                DataTable dt = OracleHelper.ExecuteDataTable(ConnORA, CommandType.StoredProcedure, "USP_FD_RENEWAL_REQ_INS_ONLINE", parameterArray);

                return Convert.ToString(parameterArray[4].Value);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable Save_Docs(DocUploadApplicationFormBO DocUpload, SessionBO session)
        {
            try
            {
                SqlParameter[] sqlparam = {
                    new SqlParameter("@App_No", DocUpload.App_No),
                    new SqlParameter("@FileName", DocUpload.DocName),
                    new SqlParameter("@Filepath", DocUpload.DocPath),
                    new SqlParameter("@formCode", session.FormCode),
                    new SqlParameter("@Session_ID", session.Session_ID.ToString()),
                    new SqlParameter("@CreatedBy", session.CreatedBy),
                    new SqlParameter("@CreatedByUName", session.CreatedByUName),
                    new SqlParameter("@CreatedIP", session.CreatedIP),
                    new SqlParameter("@State", DocUpload.State),
                    new SqlParameter("@Status", DocUpload.Status),
                    new SqlParameter("@Source", session.Source),
                    new SqlParameter("@Agency_Code", session.Agency_Cd),
                    new SqlParameter("@Agency_Name", session.Agency_Name),
                    new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd),
                    new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc),
                    new SqlParameter("@FolioNo", string.IsNullOrEmpty(DocUpload.FolioNo) ? (object)DBNull.Value : DocUpload.FolioNo),
                    new SqlParameter("@FDRNo", DocUpload.FDRNo),
                    new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(DocUpload.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(DocUpload.LastInvDate, "dd/MM/yyyy", CultureInfo.InvariantCulture)),
                    new SqlParameter("@DocSequence", DocUpload.DocSequenceNo)
                };

                return SqlHelper.ExecuteDataTable(ConnBTP, CommandType.StoredProcedure, "usp_FD_BT_Insert_Renewal_Document", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DataTable> Get_DocsAsync(string FDR_NO, SessionBO session)
        {
            try
            {
                var dt = new DataTable();
                var sqlConn = new SqlConnection(ConnBTP);

                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@FDR_NO", FDR_NO);
                sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                var cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Renewal_Documents",
                    CommandType = CommandType.StoredProcedure,
                };
                cmd.Parameters.AddRange(sqlparam);
                var sda = new SqlDataAdapter(cmd);
                await Task.Run(() => sda.Fill(dt));

                return dt;
                //return SqlHelper.ExecuteDataTable(ConnBTP, CommandType.StoredProcedure, "usp_FD_BT_Get_Renewal_Documents", sqlparam);
            }
            catch (Exception)
            {


                throw;
            }
        }

        public async Task<DataTable> Get_ImgFullscreenAsync(string id)
        {
            try
            {
                var dt = new DataTable();
                var sqlConn = new SqlConnection(ConnBTP);
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Id", id);
                var cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Renewal_ImgFullscreen",
                    CommandType = CommandType.StoredProcedure,
                };
                cmd.Parameters.AddRange(sqlparam);
                var sda = new SqlDataAdapter(cmd);
                await Task.Run(() => sda.Fill(dt));

                return dt;
                //return SqlHelper.ExecuteDataSet(ConnBTP, CommandType.StoredProcedure, "usp_FD_BT_Get_Renewal_ImgFullscreen", sqlparam);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataTable Delete_Doc(string id)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Id", id);
                return SqlHelper.ExecuteDataTable(ConnBTP, CommandType.StoredProcedure, "usp_FD_BT_Delete_Renewal_Doc", sqlparam);
            }
            catch (Exception)
            {


                throw;
            }
        }
    }
}
