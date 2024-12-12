using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class FATCA_DAL
    {
        private readonly string Conn = string.Empty;
        public FATCA_DAL(IConfiguration configuration)
        {
            Conn = configuration["ConnectionString:CONN_FDBT"];
        }

        public async Task<DataTable> Get_NationalityAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_FATCA_Get_Country_V2",
                    CommandType = CommandType.StoredProcedure,
                };

                //cmd.Parameters.AddRange(sqlparam);
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

                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_FATCA_GetCountry");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_CountryAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_FATCA_Get_Country_V2",
                    CommandType = CommandType.StoredProcedure,
                };

                //cmd.Parameters.AddRange(sqlparam);
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_FATCA_GetCountry");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_FATCA_StateAsync(string countrycode)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@countrycode", countrycode);
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_FATCA_GetState_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_FATCA_GetCountry");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_OccupationAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_FATCA_Get_Occupation_V2",
                    CommandType = CommandType.StoredProcedure,
                };

                //cmd.Parameters.AddRange(sqlparam);
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_FATCA_GetOccupation");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_CountryOfTaxAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_FATCA_GetCountryOfTax_V2",
                    CommandType = CommandType.StoredProcedure,
                };

                //cmd.Parameters.AddRange(sqlparam);
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_FATCA_GetCountryOfTax");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_TaxIdentificationTypeAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_FATCA_GeTaxIdentificationType_V2",
                    CommandType = CommandType.StoredProcedure,
                };

                //cmd.Parameters.AddRange(sqlparam);
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_FATCA_GetaxIdentification_Type");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_AddressTypeAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_FATCA_GetAddressType_V2",
                    CommandType = CommandType.StoredProcedure,
                };

                //cmd.Parameters.AddRange(sqlparam);
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_FATCA_GetAddress_Type");
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
