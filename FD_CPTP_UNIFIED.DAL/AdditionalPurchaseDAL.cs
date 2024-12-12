using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Threading.Tasks;
using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class AdditionalPurchaseDAL
    {

        private readonly string _conn = string.Empty;
        public AdditionalPurchaseDAL(IConfiguration configuration)
        {
            _conn = configuration["ConnectionString:CONN_FDBT"];
        }

        public async Task<DataTable> Get_Folio_Search_Type_MstAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Folio_Search_Type_Mst_V2",
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

        public async Task<DataTable> SearchExistingCustomerAsync(SearchApplicationBO obj, SessionBO session)
        {
            string Err = string.Empty;
            DataTable res = new DataTable();
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[13];
                sqlparam[0] = new SqlParameter("@f_SearchBy", obj.searchby);
                sqlparam[1] = new SqlParameter("@f_SearchBy_Ref_No", obj.Searchbyref);
                sqlparam[2] = new SqlParameter("@f_SearchBy_DOB", string.IsNullOrEmpty(obj.SearchByDOB) ? (object)DBNull.Value : DateTime.ParseExact(obj.SearchByDOB, "yyyy-MM-dd", CultureInfo.InvariantCulture));
                sqlparam[3] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[4] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[5] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[6] = new SqlParameter("@SessionID", session.Session_ID);
                sqlparam[7] = new SqlParameter("@FormCode", session.FormCode);
                sqlparam[8] = new SqlParameter("@Holder_Type", obj.HolderType);
                sqlparam[9] = new SqlParameter("@Source", session.Source);
                sqlparam[10] = new SqlParameter("@RefType", "BackOffice");
                sqlparam[11] = new SqlParameter("@Ref_No", obj.Appl_No);
                sqlparam[12] = new SqlParameter("@Dep_Category", obj.Dep_Category);

                //res =await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_GET_EXISTING_HOLDER_DTL", sqlparam);
                //res =await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_GET_EXISTING_HOLDER_DTL_V1", sqlparam);
                res =await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_GET_EXISTING_HOLDER_DTL_V2", sqlparam);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
                //return res;
            }
        }
    }
}
