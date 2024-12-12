using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class HolderDetailsDAL
    {        
        private readonly string _conn = string.Empty;
        public HolderDetailsDAL(IConfiguration configuration)
        {
            _conn = configuration["ConnectionString:CONN_FDBT"];
        }

        public async Task<DataTable> GetBranch(SessionBO session)
        {

            try
            {
                DataTable dt = new DataTable();
                SqlConnection sqlConn = new SqlConnection(_conn);
                try
                {
                    SqlParameter[] sqlparam = new SqlParameter[1];
                    sqlparam[0] = new SqlParameter("@agency_user_cluster_id", session.Agency_Usr_Clustered_ID);


                    SqlCommand cmd = new SqlCommand
                    {
                        Connection = sqlConn,
                        CommandText = "USP_FD_BT_UNI_GET_USER_LOCATION",
                        CommandType = CommandType.StoredProcedure,
                    };

                    cmd.Parameters.AddRange(sqlparam);
                    if (sqlConn.State != ConnectionState.Open)
                    {
                        sqlConn.Open();
                    }
                    using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                    {
                        await Task.Run(() => sda.Fill(dt));
                        sqlConn.Close();
                        return dt;
                    }

                    //return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Folio_Search_Type_Mst", sqlparam);
                }
                catch (Exception ex)
                {
                    //return false;
                    throw ex;
                }

            }
            catch (Exception ex)
            {
                throw ex;
                //return null;
            }
        }

        public async Task<DataTable> GetCMSBankDetail(SessionBO session)
        {
            try
            {
                DataTable dt = new DataTable();
                SqlConnection sqlConn = new SqlConnection(_conn);

                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Agency_Loc_Code", session.Agency_Usr_Clustered_ID);


                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_Get_CMSBranch",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(dt));
                    sqlConn.Close();
                    return dt;
                }

            }
            catch (Exception ex)
            {
                //ExceptionUtility.LogExceptionAsync(ex);
                throw ex;
                //return null;
            }
        }

        public async Task<DataTable> Get_Salutation_MstAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Salutation_Mst_V2",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(dt));
                    sqlConn.Close();
                    return dt;
                }
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Salutation_Mst", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> GetProvBankDtlsAsync(SearchApplicationBO searchApplicationBO)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@Folio", string.IsNullOrEmpty(searchApplicationBO.Folio)? (object)DBNull.Value: searchApplicationBO.Folio);
                sqlparam[1] = new SqlParameter("@Id", string.IsNullOrEmpty(searchApplicationBO.Id) ? (object)DBNull.Value : searchApplicationBO.Id);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GetProvBankDtls",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(dt));
                    sqlConn.Close();
                    return dt;
                }
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Salutation_Mst", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DataTable> GetProvNomineeDtlsAsync(SearchApplicationBO searchApplicationBO)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@Folio", string.IsNullOrEmpty(searchApplicationBO.Folio) ? (object)DBNull.Value : searchApplicationBO.Folio);
                sqlparam[1] = new SqlParameter("@Id", string.IsNullOrEmpty(searchApplicationBO.Id) ? (object)DBNull.Value : searchApplicationBO.Id);


                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GetProvNomineeDtls",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(dt));
                    sqlConn.Close();
                    return dt;
                }
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Salutation_Mst", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DataTable> GetProvHolderNamesAsync(SearchApplicationBO searchApplicationBO)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@Folio", string.IsNullOrEmpty(searchApplicationBO.Folio) ? (object)DBNull.Value : searchApplicationBO.Folio);
                sqlparam[1] = new SqlParameter("@Name", string.IsNullOrEmpty(searchApplicationBO.Name) ? (object)DBNull.Value : searchApplicationBO.Name);


                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GET_PROV_HOLDER_NAME",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(dt));
                    sqlConn.Close();
                    return dt;
                }
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Salutation_Mst", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DataTable> GetProvHolderDtlsAsync(SearchApplicationBO searchApplicationBO)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@Id", searchApplicationBO.Id);
                sqlparam[1] = new SqlParameter("@DataSource", searchApplicationBO.DataSource);


                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GET_PROV_HOLDER_DTLS",
                    CommandType = CommandType.StoredProcedure,
                };

                cmd.Parameters.AddRange(sqlparam);
                if (sqlConn.State != ConnectionState.Open)
                {
                    sqlConn.Open();
                }
                using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                {
                    await Task.Run(() => sda.Fill(dt));
                    sqlConn.Close();
                    return dt;
                }
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Salutation_Mst", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataSet Get_NameScreenApi_Dtls(string Source, string Config_Type, string Applno)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@Source", Source);
                sqlparam[1] = new SqlParameter("@Config_Type", Config_Type);
                sqlparam[2] = new SqlParameter("@Applno", Applno);
                    
                return SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "USP_FD_CPTP_UNI_GET_NAME_SCRN_API_DTLS", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public decimal isMinor(string dDate)
        {
            //var isMinor = false;
            decimal age = 0;
            DataSet ds = new DataSet();
            try
            {
                DateTime toDt = DateTime.Parse(dDate);

                SqlConnection con = new SqlConnection(_conn);
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@DOB", toDt.ToShortDateString());
                sqlparam[1] = new SqlParameter("@AsOnDate", DateTime.Now.ToShortDateString());
                ds = SqlHelper.ExecuteDataSet(con, CommandType.StoredProcedure, "Usp_FD_CPTP_Get_InvestorAge", sqlparam);
                age = Convert.ToDecimal(ds.Tables[0].Rows[0][0].ToString());
            }
            catch (Exception ex)
            {
                String str = ex.Message;
            }
            return age;
        }
    }
}
