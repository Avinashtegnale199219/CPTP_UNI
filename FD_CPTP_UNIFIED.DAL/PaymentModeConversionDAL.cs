//using DBHelper;
//using FD_CPTP_UNIFIED.BO;
//using System;
//using System.Data;
//using System.Data.SqlClient;

//namespace FD_CPTP_UNIFIED.DAL
//{
//    public class PaymentModeConversionDAL
//    {

//        readonly string ConnBTP = string.Empty;
//        readonly string ConnPGW = string.Empty;
        
//        public PaymentModeConversionDAL()
//        {
//            ConnBTP = Startup.Configuration["ConnectionString:CONN_FDBT"];
//            ConnPGW = Startup.Configuration["ConnectionString:CONN_FDPGW"];
           
//        }

//        public DataTable GetApplicationDetailsForConversion(string ApplNo ,SessionBO session)
//        {
//            DataSet res = new DataSet();
//            try
//            {
//                SqlParameter[] sqlparam = new SqlParameter[3];
//                sqlparam[0] = new SqlParameter("@ApplNo", ApplNo);
//                sqlparam[1] = new SqlParameter("@Source", session.Source);
//                sqlparam[2] = new SqlParameter("@AgencyCode", session.Agency_Cd);
//                res = SqlHelper.ExecuteDataSet(ConnBTP, CommandType.StoredProcedure, "usp_FD_BT_Get_Appl_ForPaymentModeConversion", sqlparam);
//                return res.Tables[0];
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {

//            }
//        }

//        public int InsertPaymentModeConvLog( SessionBO session, PaymentModeConversionBO obj)
//        {
//            int res =0;
//            try
//            {
//                SqlParameter[] sqlparam = new SqlParameter[18];

//                sqlparam[0] = new SqlParameter("@Appl_No", obj.Appl_No);
//                sqlparam[1] = new SqlParameter("@Amount", obj.Amount);                
//                sqlparam[2] = new SqlParameter("@New_Payment_Mode", obj.New_PaymentMode);
//                sqlparam[3] = new SqlParameter("@Old_Payment_Mode", obj.Old_PaymentMode);
//                sqlparam[4] = new SqlParameter("@Broker_Code", session.Busi_Broker_Cd);
//                sqlparam[5] = new SqlParameter("@CP_Code", session.Agency_Cd);
//                sqlparam[6] = new SqlParameter("@CP_Name", session.Agency_Name);
//                sqlparam[7] = new SqlParameter("@User_Name", session.CreatedByUName);
//                sqlparam[8] = new SqlParameter("@CreatedBy", session.CreatedBy);
//                sqlparam[9] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
//                sqlparam[10] = new SqlParameter("@CreatedIP", session.CreatedIP);
//                sqlparam[11] = new SqlParameter("@CreatedType", session.CreatedType);
//                sqlparam[12] = new SqlParameter("@Source", session.Source);
//                sqlparam[13] = new SqlParameter("@SessionId", session.Session_ID);
//                sqlparam[14] = new SqlParameter("@Agency_Code", session.Agency_Cd);
//                sqlparam[15] = new SqlParameter("@Agency_Name", session.Agency_Name);
//                sqlparam[16] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
//                sqlparam[17] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
//                res = SqlHelper.ExecuteNonQuery(ConnBTP, CommandType.StoredProcedure, "usp_FD_BT_Insert_PaymentMode_Conv_Log", sqlparam);
//                return res;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {

//            }
//        }


//        public int ConvertPaymentMode(SessionBO session, PaymentModeConversionBO obj)
//        {
//            int res = 0;
//            try
//            {
//                SqlParameter[] sqlparam = new SqlParameter[18];

//                sqlparam[0] = new SqlParameter("@Appl_No", obj.Appl_No);
//                sqlparam[1] = new SqlParameter("@Amount", obj.Amount);
//                sqlparam[2] = new SqlParameter("@New_Payment_Mode", obj.New_PaymentMode);
//                sqlparam[3] = new SqlParameter("@Old_Payment_Mode", obj.Old_PaymentMode);
//                sqlparam[4] = new SqlParameter("@Broker_Code", session.Busi_Broker_Cd);
//                sqlparam[5] = new SqlParameter("@CP_Code", session.Agency_Cd);
//                sqlparam[6] = new SqlParameter("@CP_Name", session.Agency_Name);
//                sqlparam[7] = new SqlParameter("@User_Name", session.CreatedByUName);
//                sqlparam[8] = new SqlParameter("@CreatedBy", session.CreatedBy);
//                sqlparam[9] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
//                sqlparam[10] = new SqlParameter("@CreatedIP", session.CreatedIP);
//                sqlparam[11] = new SqlParameter("@CreatedType", session.CreatedType);
//                sqlparam[12] = new SqlParameter("@Source", session.Source);
//                sqlparam[13] = new SqlParameter("@SessionId", session.Session_ID);
//                sqlparam[14] = new SqlParameter("@Agency_Code", session.Agency_Cd);
//                sqlparam[15] = new SqlParameter("@Agency_Name", session.Agency_Name);
//                sqlparam[16] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
//                sqlparam[17] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
//                res = SqlHelper.ExecuteNonQuery(ConnBTP, CommandType.StoredProcedure, "usp_FD_BT_Convert_PaymentMode", sqlparam);
//                return res;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//            finally
//            {

//            }
//        }
//    }
//}
