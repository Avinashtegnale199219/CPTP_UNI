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
    public class DocumentUploadDAL
    {
        private readonly string _conn = string.Empty;
        private readonly string CONN_FD_COMMON = string.Empty;
        public DocumentUploadDAL(IConfiguration configuration)
        {
            _conn = configuration["ConnectionString:CONN_FDBT"];
            CONN_FD_COMMON = configuration["ConnectionString:CONN_FD_COMMON"];
        }


        public async Task<DataTable> Get_IsmultipleAsync(string DocSubType)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@DocSubType", DocSubType);
                return await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "usp_Get_FD_BT_Get_Ismultiple", sqlparam);
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<DataTable> Get_KYCDocument_with_FilterAsync(string applNO, string filter, SessionBO session)
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
                return await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "usp_FD_BT_Get_KYC_Document_with_Filter_V2", sqlparam);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<DataTable> Get_ImgFullscreenAsync(string id)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@Id", id);
                return await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "usp_FD_BT_Get_ImgFullscreen", sqlparam);
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

                SqlParameter[] sqlparam = new SqlParameter[26];

                sqlparam[0] = new SqlParameter("@Depositor_Status_Code", DocUpload.Depositor_Status_Code);
                sqlparam[1] = new SqlParameter("@App_No", DocUpload.App_No);
                sqlparam[2] = new SqlParameter("@Holder_Type_Desc", DocUpload.HolderType);
                sqlparam[3] = new SqlParameter("@Doc_Type_Desc", DocUpload.DocType);
                sqlparam[4] = new SqlParameter("@Doc_Sub_Type_Desc", DocUpload.DocSubType);
                sqlparam[5] = new SqlParameter("@Doc_Type_SubType", DocUpload.Doc_Type_SubType);
                sqlparam[6] = new SqlParameter("@KYCDocValue", DocUpload.KYCDocValue);
                sqlparam[7] = new SqlParameter("@FileName", DocUpload.DocName);
                sqlparam[8] = new SqlParameter("@Filepath", DocUpload.DocPath);
                sqlparam[9] = new SqlParameter("@formCode", session.FormCode);
                sqlparam[10] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
                sqlparam[11] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[12] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[13] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[14] = new SqlParameter("@State", "VER");
                sqlparam[15] = new SqlParameter("@Status", "PEN");
                sqlparam[16] = new SqlParameter("@Source", string.IsNullOrEmpty(DocUpload.Source) ? session.Source : DocUpload.Source);
                sqlparam[17] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[18] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[19] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[20] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[21] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(DocUpload.FolioNo) ? (object)DBNull.Value : DocUpload.FolioNo);
                sqlparam[22] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(DocUpload.FDRNo) ? (object)DBNull.Value : DocUpload.FDRNo);
                sqlparam[23] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(DocUpload.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(DocUpload.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                sqlparam[24] = new SqlParameter("@DocSequence", string.IsNullOrEmpty(DocUpload.DocSequenceNo) ? (object)DBNull.Value : DocUpload.DocSequenceNo);
                sqlparam[25] = new SqlParameter("@IsDocumentMasked", DocUpload.IsDocumentMasked);
                return SqlHelper.ExecuteDataTable(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_KYC_DOCUMENT_V1", sqlparam);

            }
            catch (Exception)
            {


                throw;
            }

        }


        public async Task InsertDocumentUploadLogAsync(DocUploadBO DocUpload, SessionBO session)
        {
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

                int result = await SqlHelper.ExecuteNonQueryAsync(sqlConn, CommandType.StoredProcedure, "usp_Insert_FD_BT_KYC_Document_Log", sqlparam);
                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlConn,
                //    CommandText = "usp_Insert_FD_BT_KYC_Document_Log",
                //    CommandType = CommandType.StoredProcedure,
                //};
                //sqlConn.Open();
                //cmd.Parameters.AddRange(sqlparam);
                //cnt = await cmd.ExecuteNonQueryAsync();
                //sqlConn.Close();
                //return cnt > 0 ? true : false;
            }
            catch (Exception)
            {
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

                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlConn,
                //    CommandText = "usp_FD_BT_Get_HolderType_V2",
                //    CommandType = CommandType.StoredProcedure,
                //};

                //cmd.Parameters.AddRange(sqlparam);
                //if (sqlConn.State != ConnectionState.Open)
                //{
                //    sqlConn.Open();
                //}
                //using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                //{
                //    await Task.Run(() => sda.Fill(dt));
                //    sqlConn.Close();
                //    return dt;
                //}

                return await SqlHelper.ExecuteDataTableAsync(sqlConn, CommandType.StoredProcedure, "usp_FD_BT_Get_HolderType_V2");
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

        public async Task<DataTable> Get_DocType_MstAsync(string HoderType, string DepositorStatus, string Appl_No)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {

                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@HolderType", HoderType);
                sqlparam[1] = new SqlParameter("@Dep_Status", DepositorStatus);
                sqlparam[2] = new SqlParameter("@Appl_No", Appl_No);

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

                return await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_GET_KYC_DOCUMENTS", sqlparam);
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
                    CommandText = "USP_FD_BT_GET_KYC_DOCUMENT",
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


        //public async Task<DataTable> Get_HolderType()
        //{
        //    try
        //    {
        //        return await SqlHelper.ExecuteDataTableAsync(_conn, CommandType.StoredProcedure, "usp_GetFD_BT_HolderType");
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}


        public DataTable Save_ApplicationForm(DocUploadApplicationFormBO DocUpload, SessionBO session)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[18];
                sqlparam[0] = new SqlParameter("@App_No", DocUpload.App_No);
                sqlparam[1] = new SqlParameter("@FileName", DocUpload.DocName);
                sqlparam[2] = new SqlParameter("@Filepath", DocUpload.DocPath);
                sqlparam[3] = new SqlParameter("@formCode", session.FormCode);
                sqlparam[4] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
                sqlparam[5] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[6] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[7] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[8] = new SqlParameter("@State", "VER");
                sqlparam[9] = new SqlParameter("@Status", "PEN");
                sqlparam[10] = new SqlParameter("@Source", string.IsNullOrEmpty(DocUpload.Source) ? session.Source : DocUpload.Source);
                sqlparam[11] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[12] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[13] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[14] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[15] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(DocUpload.FolioNo) ? (object)DBNull.Value : DocUpload.FolioNo);
                sqlparam[16] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(DocUpload.FDRNo) ? (object)DBNull.Value : DocUpload.FDRNo);
                sqlparam[17] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(DocUpload.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(DocUpload.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));

                using (DataSet ds = SqlHelper.ExecuteDataSet(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_APPL_FORM", sqlparam))
                {
                    return ds.Tables[0];
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public DataTable SaveCancelledChequeCopy(UploadCancelledChequeCopyBO DocUpload, SessionBO session)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[19];
                sqlparam[0] = new SqlParameter("@App_No", DocUpload.App_No);
                sqlparam[1] = new SqlParameter("@FileName", DocUpload.DocName);
                sqlparam[2] = new SqlParameter("@Filepath", DocUpload.DocPath);
                sqlparam[3] = new SqlParameter("@formCode", session.FormCode);
                sqlparam[4] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
                sqlparam[5] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[6] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[7] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[8] = new SqlParameter("@State", "VER");
                sqlparam[9] = new SqlParameter("@Status", "PEN");
                sqlparam[10] = new SqlParameter("@Source", session.Source);
                sqlparam[11] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[12] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[13] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[14] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[15] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(DocUpload.FolioNo) ? (object)DBNull.Value : DocUpload.FolioNo);
                sqlparam[16] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(DocUpload.FDRNo) ? (object)DBNull.Value : DocUpload.FDRNo);
                sqlparam[17] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(DocUpload.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(DocUpload.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                sqlparam[18] = new SqlParameter("@Depositor_Status_Code", DocUpload.Depositor_Status_Code);

                return SqlHelper.ExecuteDataTable(_conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_CancelledChequeCopy", sqlparam);

            }
            catch (Exception)
            {
                throw;
            }
        }


        public async Task<DataTable> Get_KYCDocumentAsync(DocBO docBO, SessionBO session)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(_conn);
            try
            {

                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@ApplNo", docBO.ApplNo);
                sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[2] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[3] = new SqlParameter("@FHFolioNo", docBO.FHFolioNo);
                sqlparam[4] = new SqlParameter("@SHFolioNo", docBO.SHFolioNo);
                sqlparam[5] = new SqlParameter("@THFolioNo", docBO.THFolioNo);

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


        public async Task<DataTable> GET_CMN_WEB_CONFIG_MST(string Source, string Config_Type, string WC_Type)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@Source", Source);
                sqlparam[1] = new SqlParameter("@Config_Type", Config_Type);
                sqlparam[2] = new SqlParameter("@WC_Key", WC_Type);
                return await SqlHelper.ExecuteDataTableAsync(CONN_FD_COMMON, CommandType.StoredProcedure, "USP_FD_CMN_GET_WEB_CONFIG_MST", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
