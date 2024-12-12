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
    public class FDConfigurationDAL
    {
        private readonly string _conn = string.Empty;
        public FDConfigurationDAL(IConfiguration configuration)
        {
            _conn = configuration["ConnectionString:CONN_FDBT"];
        }


        public async Task<DataTable> Get_Depositor_StatusAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Depositor_Status_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Depositor_Status_Mst", sqlparam);
            }
            catch (Exception)
            {


                throw;
            }
        }

        public async Task<DataTable> GetPaymentOptionAsync(SessionBO session)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);

            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Source", session.Source);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_GetPaymentOption_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_QB_GetPaymentOption", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_FDR_Dispatch_ModeAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_FDR_Dispatch_Mode_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_FDR_Dispatch_Mode_Mst", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataSet> GetDepositDtlsAsync(string SCHEME, string PERIOD, string INTEREST_FREQ, string CATEGORY, string mType, string sTYPE, decimal Amount, string Source)
        {
            DataSet ds = new DataSet();
            SqlConnection sqlConn = new SqlConnection(_conn);

            try
            {
                SqlParameter[] sqlparam = new SqlParameter[8];
                sqlparam[0] = new SqlParameter("@SCHEME", SCHEME);
                sqlparam[1] = new SqlParameter("@PERIOD", PERIOD);
                sqlparam[2] = new SqlParameter("@INTEREST_FREQ", INTEREST_FREQ);
                sqlparam[3] = new SqlParameter("@CATEGORY", CATEGORY);
                sqlparam[4] = new SqlParameter("@mType", mType);
                sqlparam[5] = new SqlParameter("@sTYPE", sTYPE);
                sqlparam[6] = new SqlParameter("@Amount", Amount);
                sqlparam[7] = new SqlParameter("@Source", Source);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_GET_DEPOSITDTLS_V3",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_GetDepositDtls", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string ValidateAmount(int amount)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@FD_Amount", Convert.ToDecimal(amount));
                sqlparam[1] = new SqlParameter("@ErrMsg", SqlDbType.VarChar)
                {
                    Size = 500,
                    Direction = ParameterDirection.Output
                };
                DataTable dt = SqlHelper.ExecuteDataTable(_conn, CommandType.StoredProcedure, "USP_FD_ValidateFDAmountt", sqlparam);
                return sqlparam[1].Value.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string ValidateFDAmount(DepositDtlBO depositDtlBO)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[7];
                sqlparam[0] = new SqlParameter("@Category", depositDtlBO.CATEGORY);
                sqlparam[1] = new SqlParameter("@Scheme", depositDtlBO.SCHEME);
                sqlparam[2] = new SqlParameter("@Mode_Status", depositDtlBO.Mode_Status);
                sqlparam[3] = new SqlParameter("@Period", depositDtlBO.PERIOD);
                sqlparam[4] = new SqlParameter("@Interest_Freq", depositDtlBO.INTEREST_FREQ);
                sqlparam[5] = new SqlParameter("@FD_Amount", depositDtlBO.FD_Amount);
                sqlparam[6] = new SqlParameter("@ErrMsg", SqlDbType.VarChar)
                {
                    Size = 500,
                    Direction = ParameterDirection.Output
                };

                DataSet ds = SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "USP_FD_ValidateFDAmount", sqlparam);
                return sqlparam[6].Value.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
