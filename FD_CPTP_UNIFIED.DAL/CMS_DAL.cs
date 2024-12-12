using System;
using System.Data;
using System.Data.SqlClient;
using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class CMS_DAL
    {
        private readonly string conn = string.Empty;
        private readonly string conn_user_mgmt = string.Empty;
        public CMS_DAL(IConfiguration configuration)
        {
            conn = configuration["ConnectionString:CONN_FDBT"];
            conn_user_mgmt = configuration["ConnectionString:CONN_USER_MGMT"];
        }

        public DataTable GET_EXC_CMS_MAPPING_FLAG(SessionBO session)
        {

            
            try
            {
                SqlConnection con = new SqlConnection(conn);
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@UserCd", session.Agency_Usr_Clustered_ID);
                sqlparam[1] = new SqlParameter("@AgencyCd", session.Agency_Cd);
                return SqlHelper.ExecuteDataTable(con, CommandType.StoredProcedure, "USP_FD_BTP_GET_EXC_CMS_MAPPING_FLAG", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public DataTable Agency_CMS_Exc_Get_State(SessionBO session)
        {
            DataSet ds = new DataSet();
            try
            {
                //SqlConnection con = new SqlConnection(strConne);
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@UserCd", session.Agency_Usr_Clustered_ID);
                sqlparam[1] = new SqlParameter("@AgencyCd", session.Agency_Cd);
                return SqlHelper.ExecuteDataTable(conn_user_mgmt, CommandType.StoredProcedure, "USP_Agency_CMS_Exc_Get_State", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public DataTable Agency_Get_Exc_mapped_CMSBank_Lnk(string Agency_State_Cd)
        {
            DataSet ds = new DataSet();
            try
            {
                //SqlConnection con = new SqlConnection(strConne);
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Agency_State_Cd", Agency_State_Cd);
                return SqlHelper.ExecuteDataTable(conn_user_mgmt, CommandType.StoredProcedure, "Usp_Agency_Get_Exc_mapped_CMSBank_Lnk", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public DataTable GetCMSBankDetail(string AgencyUserloccode)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];

                sqlparam[0] = new SqlParameter("@Agency_Loc_Code", AgencyUserloccode);

                return SqlHelper.ExecuteDataTable(conn_user_mgmt, CommandType.StoredProcedure, "usp_FD_BT_Get_User_CMSBranch_V2", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
