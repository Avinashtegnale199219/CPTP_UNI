using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_CP_QUERY_WINDOW_APP.App_Code.BusinessObject;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Threading.Tasks;

namespace FD_CPTP_UNIFIED.DAL
{
    public class DocumentUploadDAL_v2
    {
        private readonly string _conn = string.Empty;
        public DocumentUploadDAL_v2(IConfiguration configuration)
        {
            _conn = configuration["ConnectionString:CONN_FDBT"];
        }

        //public DataSet Get_FilterDocType()
        //{
        //    try
        //    {
        //        return SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "usp_Get_FD_BT_FilterDocType");
        //    }
        //    catch (Exception ex)
        //    {

        //        throw;
        //    }
        //}


        public DataTable Get_Ismultiple(string DocSubType)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@DocSubType", DocSubType);
                return SqlHelper.ExecuteDataTable(_conn, CommandType.StoredProcedure, "usp_Get_FD_BT_Get_Ismultiple", sqlparam);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        //public DataSet Get_KYCDocument(string applNO, SessionBO session)
        //{
        //    try
        //    {
        //        SqlParameter[] sqlparam = new SqlParameter[3];
        //        sqlparam[0] = new SqlParameter("@ApplNo", applNO);
        //        sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
        //        sqlparam[2] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
        //        return SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "usp_FD_BT_Get_KYC_Document", sqlparam);
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        public DataTable Get_KYCDocument_with_Filter(string applNO, string filter, SessionBO session)
        {
            try
            {
                string[] arrayFilter = filter.Split('|');
                SqlParameter[] sqlparam = new SqlParameter[6];
                sqlparam[0] = new SqlParameter("@ApplNo", applNO);
                sqlparam[1] = new SqlParameter("@HolderType", arrayFilter[0]);
                sqlparam[2] = new SqlParameter("@DocType", arrayFilter[1]);
                sqlparam[3] = new SqlParameter("@SubDocType", arrayFilter[2]);
                sqlparam[4] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[5] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                return SqlHelper.ExecuteDataTable(_conn, CommandType.StoredProcedure, "usp_FD_BT_Get_KYC_Document_with_Filter_V2", sqlparam);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        public DataSet Get_ImgFullscreen(string id)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Id", id);
                return SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "usp_FD_BT_Get_ImgFullscreen", sqlparam);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DataSet Delete_Doc(string id)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Id", id);
                return SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "usp_FD_BT_Delete_Doc", sqlparam);
            }
            catch (Exception)
            {


                throw;
            }
        }
        public DataTable Save_KYCDocs(DocUploadBO DocUpload, SessionBO session)
        {
            try
            {

                SqlParameter[] sqlparam = new SqlParameter[25];

                sqlparam[0] = new SqlParameter("@Depositor_Status_Code", DocUpload.Depositor_Status_Code);
                sqlparam[1] = new SqlParameter("@App_No", DocUpload.App_No);
                sqlparam[2] = new SqlParameter("@Holder_Type_Desc", DocUpload.HolderType);
                sqlparam[3] = new SqlParameter("@Doc_Type_Desc", DocUpload.DocType);
                sqlparam[4] = new SqlParameter("@Doc_Sub_Type_Desc", DocUpload.DocSubType);
                sqlparam[5] = new SqlParameter("@Doc_Type_SubType", DocUpload.Doc_Type_SubType);
                sqlparam[6] = new SqlParameter("@KYCDocValue", null);
                sqlparam[7] = new SqlParameter("@FileName", DocUpload.DocName);
                sqlparam[8] = new SqlParameter("@Filepath", DocUpload.DocPath);
                sqlparam[9] = new SqlParameter("@formCode", session.FormCode);
                sqlparam[10] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
                sqlparam[11] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[12] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[13] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[14] = new SqlParameter("@State", "VER");
                sqlparam[15] = new SqlParameter("@Status", "PEN");
                sqlparam[16] = new SqlParameter("@Source", session.Source);
                sqlparam[17] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[18] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[19] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[20] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[21] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(DocUpload.FolioNo) ? (object)DBNull.Value : DocUpload.FolioNo);
                sqlparam[22] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(DocUpload.FDRNo) ? (object)DBNull.Value : DocUpload.FDRNo);
                sqlparam[23] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(DocUpload.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(DocUpload.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                sqlparam[24] = new SqlParameter("@DocSequence", string.IsNullOrEmpty(DocUpload.DocSequenceNo) ? (object)DBNull.Value : DocUpload.DocSequenceNo);

                return SqlHelper.ExecuteDataTable(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_KYC_DOCUMENT", sqlparam);
              
            }
            catch (Exception)
            {


                throw;
            }

        }
        //internal DataSet Get_OVD(string _ApplNo, SessionBO session)
        //{
        //    try
        //    {
        //        SqlParameter[] sqlparam = new SqlParameter[3];
        //        sqlparam[0] = new SqlParameter("@applNo", _ApplNo);
        //        sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
        //        sqlparam[2] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
        //        return SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "usp_FD_BT_Get_OVD", sqlparam);
        //    }
        //    catch (Exception)
        //    {


        //        throw;
        //    }
        //}


        //internal DataSet Save_OVD(DataTable _OVD, SessionBO session)
        //{
        //    try
        //    {
        //        SqlParameter[] sqlparam = new SqlParameter[6];
        //        sqlparam[0] = new SqlParameter("@DocList", _OVD);
        //        sqlparam[1] = new SqlParameter("@formCode", session.FormCode);
        //        sqlparam[2] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
        //        sqlparam[3] = new SqlParameter("@CreatedBy", session.CreatedBy);
        //        sqlparam[4] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
        //        sqlparam[5] = new SqlParameter("@CreatedIP", session.CreatedIP);
        //        return SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "usp_FD_BT_Insert_OVD_Ref", sqlparam);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        public async Task<bool> InsertDocumentUploadLogAsync(DocUploadBO DocUpload, SessionBO session)
        {
            int cnt = 0;
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[18];
                sqlparam[0] = new SqlParameter("@Depositor_Status_Code", DocUpload.Depositor_Status_Code);
                sqlparam[1] = new SqlParameter("@App_No", DocUpload.App_No);
                sqlparam[2] = new SqlParameter("@Holder_Type_Desc", DocUpload.HolderType);
                sqlparam[3] = new SqlParameter("@Doc_Type_Desc", DocUpload.DocType);
                sqlparam[4] = new SqlParameter("@Doc_Sub_Type_Desc", DocUpload.DocSubType);
                sqlparam[5] = new SqlParameter("@formCode", session.FormCode);
                sqlparam[6] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
                sqlparam[7] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[8] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[9] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[10] = new SqlParameter("@Source", session.Source);
                sqlparam[11] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[12] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[13] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[14] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[15] = new SqlParameter("@FDRNo", DocUpload.FDRNo);
                sqlparam[16] = new SqlParameter("@FolioNo", DocUpload.FolioNo);
                sqlparam[17] = new SqlParameter("@Event", DocUpload.Event);

                //int result = SqlHelper.ExecuteNonQuery(Conn, CommandType.StoredProcedure, "usp_Insert_FD_BT_KYC_Document_Log", sqlparam);
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_Insert_FD_BT_KYC_Document_Log",
                    CommandType = CommandType.StoredProcedure,
                };
                sqlConn.Open();
                cmd.Parameters.AddRange(sqlparam);
                cnt = await cmd.ExecuteNonQueryAsync();
                sqlConn.Close();
                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                sqlConn.Close();
            }
        }

        public async Task<DataTable> Get_HolderTypeAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_HolderType_V2",
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

                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_GetFD_BT_HolderType");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_FilterDocTypeAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {

                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_FilterDocType_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_Get_FD_BT_FilterDocType");
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<DataTable> Get_DocType_MstAsync(string HoderType, string DepositorStatus)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {

                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@HolderType", HoderType);
                sqlparam[1] = new SqlParameter("@Dep_Status", DepositorStatus);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_DocumentType_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_Get_FD_BT_FilterDocType");
            }
            catch (Exception)
            {

                throw;
            }

        }

        public async Task<DataTable> Get_OVDAsync(string _ApplNo, SessionBO session)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {

                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@Appl_No", _ApplNo);
                sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[2] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GET_KYC_DOCUMENTS",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_Get_FD_BT_FilterDocType");
            }
            catch (Exception)
            {

                throw;
            }



        }

        public async Task<DataTable> Get_KYCDocumentAsync(string applNO, SessionBO session)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {

                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@ApplNo", applNO);
                sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[2] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_KYC_Document",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_Get_FD_BT_FilterDocType");
            }
            catch (Exception)
            {

                throw;
            }


        }

    }
}
