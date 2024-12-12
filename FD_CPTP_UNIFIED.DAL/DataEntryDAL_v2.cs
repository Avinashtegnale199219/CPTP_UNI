using System;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class DataEntryDAL_v2
    {
        readonly string Conn = string.Empty;
        public DataEntryDAL_v2(IConfiguration configuration)
        {
            Conn = configuration["ConnectionString:CONN_FDBT"];
        }

        public async Task<bool> ViewDocumentLogAsync(DocumentLog documentLog, SessionBO session)
        {
            SqlConnection sqlConn = new SqlConnection(Conn);

            int cnt = 0;
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[20];
                sqlparam[0] = new SqlParameter("@Ref_No_1", documentLog.Ref_No_1);
                sqlparam[1] = new SqlParameter("@Ref_Type_1", documentLog.Ref_Type_1);
                sqlparam[2] = new SqlParameter("@Ref_No_1_Desc", string.IsNullOrEmpty(documentLog.Ref_No_1_Desc) ? (object)DBNull.Value : documentLog.Ref_No_1_Desc);
                sqlparam[3] = new SqlParameter("@Ref_No_2", string.IsNullOrEmpty(documentLog.Ref_No_2) ? (object)DBNull.Value : documentLog.Ref_No_2);
                sqlparam[4] = new SqlParameter("@Ref_Type_2", string.IsNullOrEmpty(documentLog.Ref_Type_2) ? (object)DBNull.Value : documentLog.Ref_Type_2);
                sqlparam[5] = new SqlParameter("@Ref_No_2_Desc", string.IsNullOrEmpty(documentLog.Ref_No_2_Desc) ? (object)DBNull.Value : documentLog.Ref_No_2_Desc);
                sqlparam[6] = new SqlParameter("@Ref_No_3", string.IsNullOrEmpty(documentLog.Ref_No_3) ? (object)DBNull.Value : documentLog.Ref_No_3);
                sqlparam[7] = new SqlParameter("@Ref_Type_3", string.IsNullOrEmpty(documentLog.Ref_Type_3) ? (object)DBNull.Value : documentLog.Ref_Type_3);
                sqlparam[8] = new SqlParameter("@Ref_No_3_Desc", string.IsNullOrEmpty(documentLog.Ref_No_3_Desc) ? (object)DBNull.Value : documentLog.Ref_No_3_Desc);
                sqlparam[9] = new SqlParameter("@IsMobile", string.IsNullOrEmpty(documentLog.IsMobile) ? (object)DBNull.Value : documentLog.IsMobile);
                sqlparam[10] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[11] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[12] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[13] = new SqlParameter("@CreatedType", session.CreatedType);
                sqlparam[14] = new SqlParameter("@Session", session.Session_ID);
                sqlparam[15] = new SqlParameter("@FormCode", session.FormCode);
                sqlparam[16] = new SqlParameter("@Event", documentLog.Event);
                sqlparam[17] = new SqlParameter("@Ref_No_4", string.IsNullOrEmpty(documentLog.Ref_No_4) ? (object)DBNull.Value : documentLog.Ref_No_4);
                sqlparam[18] = new SqlParameter("@Ref_No_4_Desc", string.IsNullOrEmpty(documentLog.Ref_No_4_Desc) ? (object)DBNull.Value : documentLog.Ref_No_4_Desc);
                sqlparam[19] = new SqlParameter("@Ref_Type_4", string.IsNullOrEmpty(documentLog.Ref_Type_4) ? (object)DBNull.Value : documentLog.Ref_Type_4);


                //return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "usp_FD_BT_User_Activity_Log", sqlparam);
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_User_Activity_Log",
                    CommandType = CommandType.StoredProcedure,
                };
                sqlConn.Open();
                cmd.Parameters.AddRange(sqlparam);
                cnt = await cmd.ExecuteNonQueryAsync();
                sqlConn.Close();
                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
                sqlConn.Close();
            }
        }

        //public async Task<DataSet> GetDepositDtlsAsync(string SCHEME, string PERIOD, string INTEREST_FREQ, string CATEGORY, string mType, string sTYPE)
        //{
        //    DataSet ds = new DataSet();
        //    SqlConnection sqlConn = new SqlConnection(Conn);

        //    try
        //    {
        //        SqlParameter[] sqlparam = new SqlParameter[6];
        //        sqlparam[0] = new SqlParameter("@SCHEME", SCHEME);
        //        sqlparam[1] = new SqlParameter("@PERIOD", PERIOD);
        //        sqlparam[2] = new SqlParameter("@INTEREST_FREQ", INTEREST_FREQ);
        //        sqlparam[3] = new SqlParameter("@CATEGORY", CATEGORY);
        //        sqlparam[4] = new SqlParameter("@mType", mType);
        //        sqlparam[5] = new SqlParameter("@sTYPE", sTYPE);

        //        SqlCommand cmd = new SqlCommand
        //        {
        //            Connection = sqlConn,
        //            CommandText = "usp_FD_BT_Get_DepositDtls_V2",
        //            CommandType = CommandType.StoredProcedure,
        //        };

        //        cmd.Parameters.AddRange(sqlparam);
        //        if (sqlConn.State != ConnectionState.Open)
        //        {
        //            sqlConn.Open();
        //        }
        //        using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
        //        {
        //            await Task.Run(() => sda.Fill(ds));
        //            sqlConn.Close();
        //            return ds;
        //        }
        //        //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_GetDepositDtls", sqlparam);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        public async Task<DataTable> GetPaymentOptionAsync(SessionBO session)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);

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
            SqlConnection sqlConn = new SqlConnection(Conn);
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

        public async Task<DataTable> Get_Depositor_StatusAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
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

        public async Task<DataTable> Get_HNGAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_HNG_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_HNG_Mst", sqlparam);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<DataTable> Get_Annual_IncomeAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Annual_Income_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Annual_Income_Mst", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_Investor_Nominee_RelationAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Nominee_Relations_V2",
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
                //return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "usp_FD_GetNomineeRelations", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }

        }

        public async Task<DataTable> Get_StateAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "Usp_FD_BT_Get_CKYC_State_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "Usp_FD_BT_Get_CKYC_State_Mst", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_Salutation_MstAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Salutation_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Salutation_Mst", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_Marital_StatusAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Marital_Status_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Marital_Status_Mst", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_Gender_StatusAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Gender_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_Get_Gender_Mst", sqlparam);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_DepositPayableAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[0];

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_Repayment_Instruction_Mst_V2",
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
                //return SqlHelper.ExecuteDataSet(Conn, CommandType.StoredProcedure, "usp_FD_BT_BindRepayment");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<DataTable> Get_Folio_Search_Type_MstAsync()
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
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
            catch (Exception)
            {
                //return false;
                throw;
            }
        }

        public async Task<DataTable> GetDistrictAsync(string StateCode)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@StateCode", StateCode);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "Usp_FD_BT_Get_CKYC_District_Mst_V2",
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
            catch (Exception)
            {
                //return false;
                throw;
            }
        }

        public async Task<DataTable> GetPinCodeAsync(string DistrictDesc)
        {
            DataTable dt = new DataTable();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@DistrictDesc", DistrictDesc);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "usp_FD_BT_Get_PinCode_V2",
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
            catch (Exception)
            {
                //return false;
                throw;
            }
        }

        //public DataTable Insert_WorkOrder(HeaderDetails headerDetails, SessionBO session)
        //{
        //    try
        //    {
        //        SqlParameter[] sqlparam = new SqlParameter[15];
        //        sqlparam[0] = new SqlParameter("@Appl_No", headerDetails.APPLNO);
        //        sqlparam[1] = new SqlParameter("@Appl_Dtl", headerDetails.Appl_Dtl);
        //        sqlparam[2] = new SqlParameter("@BT_Ref_No", headerDetails.BT_Ref_NO);
        //        sqlparam[3] = new SqlParameter("@Appl_Phy_Form_Ref_No", headerDetails.Appl_Form_Ref_No);
        //        sqlparam[4] = new SqlParameter("@CreatedBy", session.CreatedBy);
        //        sqlparam[5] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
        //        sqlparam[6] = new SqlParameter("@CreatedIP", session.CreatedIP);
        //        sqlparam[7] = new SqlParameter("@SessionId", session.Session_ID);
        //        sqlparam[8] = new SqlParameter("@Form_Code", session.FormCode);
        //        sqlparam[9] = new SqlParameter("@Source", session.Source);
        //        sqlparam[10] = new SqlParameter("@Agency_Code", session.Agency_Cd);
        //        sqlparam[11] = new SqlParameter("@Agency_Name", session.Agency_Name);
        //        sqlparam[12] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
        //        sqlparam[13] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
        //        sqlparam[14] = new SqlParameter("@Agency_Type", session.Agency_Type);

        //        return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "usp_FD_BT_Insert_WorkOrder_V2", sqlparam);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}

        public async Task<DataSet> GET_APPL_DTLS(string Appl_No, SessionBO session)
        {
            DataSet ds = new DataSet();
            SqlConnection sqlConn = new SqlConnection(Conn);
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[5];
                sqlparam[0] = new SqlParameter("@Appl_No", Appl_No);
                sqlparam[1] = new SqlParameter("@UserId",session.Agency_Usr_Clustered_ID );
                sqlparam[2] = new SqlParameter("@Agency_Code",session.Agency_Cd );
                sqlparam[3] = new SqlParameter("@Agency_Usr_Loc_Cd",session.Agency_Usr_Base_Loc_cd );
                sqlparam[4] = new SqlParameter("@Source", session.Source);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlConn,
                    CommandText = "USP_FD_BT_UNI_GET_APPL_DTLS",
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
            catch (Exception)
            {
                //return false;
                throw;
            }
        }


    }
}
