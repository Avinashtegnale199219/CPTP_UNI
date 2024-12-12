using System;
using System.Data;
using System.Data.SqlClient;
using DBHelper;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class BankDetailsDAL
    {

        readonly string Conn = string.Empty;
        public BankDetailsDAL(IConfiguration configuration)
        {
            Conn = configuration["ConnectionString:CONN_FDBT"];
        }

        public DataTable Get_BankDtls(string SearchTxt)
        {

            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];

                sqlparam[0] = new SqlParameter("@SearchText", SearchTxt);

                return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "usp_FD_Bank_Dtl", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
