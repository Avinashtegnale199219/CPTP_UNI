using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace FD_CPTP_UNIFIED.DAL
{
    public class ApplicationCancelDAL
    {

        readonly string Conn = string.Empty;
        public ApplicationCancelDAL(IConfiguration configuration)
        {
            Conn = configuration["ConnectionString:CONN_FDBT"];

        }



        public  DataTable CANCEL_APPLICATION(string Appl_No, SessionBO session)
        {
            DataTable ds = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[13];
                sqlparam[0] = new SqlParameter("@Appl_No", Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[2] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[3] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[4] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[5] = new SqlParameter("@Source", session.Source);
                sqlparam[6] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[7] = new SqlParameter("@State", "VER");
                sqlparam[8] = new SqlParameter("@Status", "CAN");
                sqlparam[9] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[10] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[11] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[12] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
              
                return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_CANCEL_APPLICATION", sqlparam);
            }
            catch (Exception ex)
            {
                //return false;
                throw ex;
            }
        }

    }
}
