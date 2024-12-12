using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace FD_CPTP_UNIFIED.DAL
{
    public class ApplicationViewDAL
    {

        readonly string Conn = string.Empty;
        public ApplicationViewDAL(IConfiguration configuration)
        {
            Conn = configuration["ConnectionString:CONN_FDBT"];
        }



        public async Task<DataTable> GET_APPLS_FOR_VIEWAsync(SessionBO session)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[1] = new SqlParameter("@Source", session.Source);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GET_APPL_LIST_FOR_VIEW",
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

        public async Task<DataSet> GET_APPL_DTLS_FOR_VIEWAsync(string Appl_No, SessionBO session)
        {
            DataSet ds = new DataSet();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[4];
                sqlparam[0] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[1] = new SqlParameter("@Source", session.Source);
                sqlparam[2] = new SqlParameter("@Appl_No", Appl_No);
                sqlparam[3] = new SqlParameter("@UserId", session.Agency_Usr_Clustered_ID);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GET_APPL_DTLS_FOR_VIEW",
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

                //return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Folio_Search_Type_Mst", sqlparam);
            }
            catch (Exception ex)
            {
                //return false;
                throw ex;
            }
        }
    }
}
