using System;
using System.Data;
using System.Data.SqlClient;
using DBHelper;
using Microsoft.Extensions.Configuration;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;

namespace FD_CPTP_UNIFIED.DAL
{
    public class RTGS_UTR_UPLOAD_DAL
    {
        string _strCPTP = string.Empty;
        string _strConnRECO = string.Empty;        
        public RTGS_UTR_UPLOAD_DAL(IConfiguration configuration)
        {
            _strCPTP = configuration["ConnectionString:CONN_FDBT"];
            _strConnRECO = configuration["ConnectionString:CONN_FD_RECO"].ToString();
        }
        public DataSet GetRtgsUtrDetails(SessionBO session)
        {
            DataSet result;
            try
            {
                using (SqlConnection conn = new SqlConnection(_strCPTP))
                {
                    SqlParameter[] sqlparam = new SqlParameter[1];
                    sqlparam[0] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                    result = SqlHelper.ExecuteDataSet(conn, CommandType.StoredProcedure, "Usp_FD_BT_UNI_Get_RTGS_Payment_Dtls", sqlparam);
                    return result;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int Save_UTR_RTGS_Document_Details(RTGS_UTR_UPLOAD_BO _DocUpload, SessionBO _SessionBO)
        {
            SqlParameter[] sqlparam = new SqlParameter[12];
            try
            {
                sqlparam[0] = new SqlParameter("@Session_ID", _SessionBO.Session_ID);
                sqlparam[1] = new SqlParameter("@Doc_Type", _DocUpload.Doc_Type);
                sqlparam[2] = new SqlParameter("@Doc_Value", string.IsNullOrEmpty(_DocUpload.UTR_No) ? (object)DBNull.Value : _DocUpload.UTR_No);
                sqlparam[3] = new SqlParameter("@FileName", _DocUpload.File_Name);
                sqlparam[4] = new SqlParameter("@Filepath", _DocUpload.File_Path);
                sqlparam[5] = new SqlParameter("@KYC_DMS_DOCID", _DocUpload.UTR_No);
                sqlparam[6] = new SqlParameter("@KYC_DMS_URL", _DocUpload.File_Path);
                sqlparam[7] = new SqlParameter("@CreatedBy", _SessionBO.CreatedBy);
                sqlparam[8] = new SqlParameter("@CreatedByUName", _SessionBO.Agency_Usr_Name);
                sqlparam[9] = new SqlParameter("@CreatedIP", _SessionBO.ClientIP_Address);
                sqlparam[10] = new SqlParameter("@Appl_No", _DocUpload.Appl_No);
                sqlparam[11] = new SqlParameter("@FormCode", "RTGS_UTR_UPLOAD");
                return SqlHelper.ExecuteNonQuery(_strConnRECO, CommandType.StoredProcedure, "Usp_FD_BT_UNI_UTR_RTGS_Save_DocUpload_Dtls", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;                
            }
            finally
            {
                sqlparam = null;
            }
        }
    }
}
