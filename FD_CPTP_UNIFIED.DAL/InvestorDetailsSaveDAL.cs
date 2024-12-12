using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Xml;
using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class InvestorDetailsSaveDAL
    {
        private readonly string conn;
        private readonly IConfiguration configuration;
        public InvestorDetailsSaveDAL(IConfiguration configuration)
        {
            try
            {
                this.configuration = configuration;
                conn = configuration["ConnectionString:CONN_FDBT"];
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //step1 save for ADD/EDIT
        public DataTable Insert_Front_Office_Dtls(FrontOfficeSaveBO saveBO, SessionBO session)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[54];
                sqlparam[0] = new SqlParameter("@Physic", saveBO.Physical);
                sqlparam[1] = new SqlParameter("@Salutation", saveBO.Salutation);
                sqlparam[2] = new SqlParameter("@FirstName", saveBO.FirstName);
                sqlparam[3] = new SqlParameter("@MiddleName", saveBO.MiddleName);
                sqlparam[4] = new SqlParameter("@LastName", saveBO.LastName);
                sqlparam[5] = new SqlParameter("@DOB", DateTime.ParseExact(saveBO.DOB, "yyyy-MM-dd", CultureInfo.InvariantCulture));
                sqlparam[6] = new SqlParameter("@Amount", saveBO.Amount);
                sqlparam[7] = new SqlParameter("@ModeOfPayment", saveBO.ModeOfPayment);
                sqlparam[8] = new SqlParameter("@Cheque_Date", string.IsNullOrEmpty(saveBO.Cheque_Date) ? (object)DBNull.Value : DateTime.ParseExact(saveBO.Cheque_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture));
                sqlparam[9] = new SqlParameter("@Instrument_No", saveBO.Instrument_No);
                sqlparam[10] = new SqlParameter("@BankName", saveBO.BankName);
                sqlparam[11] = new SqlParameter("@BranchName", saveBO.BranchName);
                sqlparam[12] = new SqlParameter("@IFSC_Code", saveBO.IFSC_Code);
                sqlparam[13] = new SqlParameter("@MICR_Code", saveBO.MICR_Code);
                sqlparam[14] = new SqlParameter("@DeliveredByName", DBNull.Value);
                sqlparam[15] = new SqlParameter("@Discrepency_Flg", "ACCEPT");
                sqlparam[16] = new SqlParameter("@mobile", saveBO.Mobile);
                sqlparam[17] = new SqlParameter("@email", saveBO.Email);
                sqlparam[18] = new SqlParameter("@Cms_Location_Code", saveBO.Cms_Location_Code);
                sqlparam[19] = new SqlParameter("@Cms_Location_Name", saveBO.Cms_Location_Name);
                sqlparam[20] = new SqlParameter("@App_Type", DBNull.Value);
                sqlparam[21] = new SqlParameter("@No_Of_Application", "1");
                sqlparam[22] = new SqlParameter("@Remarks", saveBO.Remarks);
                sqlparam[23] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[24] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[25] = new SqlParameter("@CreatedType", session.CreatedType);
                sqlparam[26] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[27] = new SqlParameter("@SessionID", session.Session_ID);
                sqlparam[28] = new SqlParameter("@FromCode", session.FormCode);
                sqlparam[29] = new SqlParameter("@Source", session.Source);
                sqlparam[30] = new SqlParameter("@AgencyType", session.Agency_Type);
                sqlparam[31] = new SqlParameter("@AgencySubType", session.Agency_Sub_Type);
                sqlparam[32] = new SqlParameter("@AgencyCode", session.Agency_Cd);
                sqlparam[33] = new SqlParameter("@AgencyName", session.Agency_Name);
                sqlparam[34] = new SqlParameter("@Agency_Usr_Base_Branch_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[35] = new SqlParameter("@Agency_Usr_Cd", session.Agency_Usr_Clustered_ID);
                sqlparam[36] = new SqlParameter("@Agency_Usr_Name", session.Agency_Usr_Name);
                sqlparam[37] = new SqlParameter("@Agency_Usr_Branch_Cd", saveBO.Agency_Usr_Branch_Cd);
                sqlparam[38] = new SqlParameter("@Agency_Usr_Branch_Name", saveBO.Agency_Usr_Branch_Name);
                sqlparam[39] = new SqlParameter("@Application_No", saveBO.Appl_No);
                sqlparam[40] = new SqlParameter("@Pickup_Date", DBNull.Value);
                sqlparam[41] = new SqlParameter("@Existing_FDR_No", saveBO.Existing_FDR_No);
                sqlparam[42] = new SqlParameter("@Folio_No", saveBO.Folio_No);
                sqlparam[43] = new SqlParameter("@ApplicationType", saveBO.ApplicationType);
                sqlparam[44] = new SqlParameter("@MobilizationCode", DBNull.Value);
                sqlparam[45] = new SqlParameter("@BrokerCode", session.Busi_Broker_Cd);
                sqlparam[46] = new SqlParameter("@Ind_Nind", saveBO.DepositorCategory);
                sqlparam[47] = new SqlParameter("@IsCmsNoncms", saveBO.IsCmsNoncms);
                sqlparam[48] = new SqlParameter("@ChequeDepositedBy", saveBO.ChequeDepositedBy);
                sqlparam[49] = new SqlParameter("@NONCMSCheque_Deposit_Date", saveBO.NONCMSCheque_Deposit_Date);
                sqlparam[50] = new SqlParameter("@ApplicationDeclarationType", saveBO.ApplicationDeclarationType);
                sqlparam[51] = new SqlParameter("@PAN", saveBO.PAN);
                sqlparam[52] = new SqlParameter("@CKYC_No", saveBO.CKYCNumber);
                sqlparam[53] = new SqlParameter("@Data_Source", saveBO.Data_Source);

                return SqlHelper.ExecuteDataTable(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_FRONT_OFFICE_DTL", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        //step1 save for copy
        public DataTable COPY_Front_Office_Dtls(FrontOfficeSaveBO saveBO, SessionBO session)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[55];
                sqlparam[0] = new SqlParameter("@Physic", saveBO.Physical);
                sqlparam[1] = new SqlParameter("@Salutation", saveBO.Salutation);
                sqlparam[2] = new SqlParameter("@FirstName", saveBO.FirstName);
                sqlparam[3] = new SqlParameter("@MiddleName", saveBO.MiddleName);
                sqlparam[4] = new SqlParameter("@LastName", saveBO.LastName);
                sqlparam[5] = new SqlParameter("@DOB", DateTime.ParseExact(saveBO.DOB, "yyyy-MM-dd", CultureInfo.InvariantCulture));
                sqlparam[6] = new SqlParameter("@Amount", saveBO.Amount);
                sqlparam[7] = new SqlParameter("@ModeOfPayment", saveBO.ModeOfPayment);
                sqlparam[8] = new SqlParameter("@Cheque_Date", string.IsNullOrEmpty(saveBO.Cheque_Date) ? (object)DBNull.Value : DateTime.ParseExact(saveBO.Cheque_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture));
                sqlparam[9] = new SqlParameter("@Instrument_No", saveBO.Instrument_No);
                sqlparam[10] = new SqlParameter("@BankName", saveBO.BankName);
                sqlparam[11] = new SqlParameter("@BranchName", saveBO.BranchName);
                sqlparam[12] = new SqlParameter("@IFSC_Code", saveBO.IFSC_Code);
                sqlparam[13] = new SqlParameter("@MICR_Code", saveBO.MICR_Code);
                sqlparam[14] = new SqlParameter("@DeliveredByName", DBNull.Value);
                sqlparam[15] = new SqlParameter("@Discrepency_Flg", "ACCEPT");
                sqlparam[16] = new SqlParameter("@mobile", saveBO.Mobile);
                sqlparam[17] = new SqlParameter("@email", saveBO.Email);
                sqlparam[18] = new SqlParameter("@Cms_Location_Code", saveBO.Cms_Location_Code);
                sqlparam[19] = new SqlParameter("@Cms_Location_Name", saveBO.Cms_Location_Name);
                sqlparam[20] = new SqlParameter("@App_Type", DBNull.Value);
                sqlparam[21] = new SqlParameter("@No_Of_Application", "1");
                sqlparam[22] = new SqlParameter("@Remarks", saveBO.Remarks);
                sqlparam[23] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[24] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[25] = new SqlParameter("@CreatedType", session.CreatedType);
                sqlparam[26] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[27] = new SqlParameter("@SessionID", session.Session_ID);
                sqlparam[28] = new SqlParameter("@FromCode", session.FormCode);
                sqlparam[29] = new SqlParameter("@Source", session.Source);
                sqlparam[30] = new SqlParameter("@AgencyType", session.Agency_Type);
                sqlparam[31] = new SqlParameter("@AgencySubType", session.Agency_Sub_Type);
                sqlparam[32] = new SqlParameter("@AgencyCode", session.Agency_Cd);
                sqlparam[33] = new SqlParameter("@AgencyName", session.Agency_Name);
                sqlparam[34] = new SqlParameter("@Agency_Usr_Base_Branch_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[35] = new SqlParameter("@Agency_Usr_Cd", session.Agency_Usr_Clustered_ID);
                sqlparam[36] = new SqlParameter("@Agency_Usr_Name", session.Agency_Usr_Name);
                sqlparam[37] = new SqlParameter("@Agency_Usr_Branch_Cd", saveBO.Agency_Usr_Branch_Cd);
                sqlparam[38] = new SqlParameter("@Agency_Usr_Branch_Name", saveBO.Agency_Usr_Branch_Name);
                sqlparam[39] = new SqlParameter("@Application_No", saveBO.Copy_Appl_No);
                sqlparam[40] = new SqlParameter("@Pickup_Date", DBNull.Value);
                sqlparam[41] = new SqlParameter("@Existing_FDR_No", saveBO.Existing_FDR_No);
                sqlparam[42] = new SqlParameter("@Folio_No", saveBO.Folio_No);
                sqlparam[43] = new SqlParameter("@ApplicationType", saveBO.ApplicationType);
                sqlparam[44] = new SqlParameter("@MobilizationCode", DBNull.Value);
                sqlparam[45] = new SqlParameter("@BrokerCode", session.Busi_Broker_Cd);
                sqlparam[46] = new SqlParameter("@Ind_Nind", saveBO.DepositorCategory);
                sqlparam[47] = new SqlParameter("@IsCmsNoncms", saveBO.IsCmsNoncms);
                sqlparam[48] = new SqlParameter("@ChequeDepositedBy", saveBO.ChequeDepositedBy);
                sqlparam[49] = new SqlParameter("@NONCMSCheque_Deposit_Date", saveBO.NONCMSCheque_Deposit_Date);
                sqlparam[50] = new SqlParameter("@ApplicationDeclarationType", saveBO.ApplicationDeclarationType);
                sqlparam[51] = new SqlParameter("@New_Application_No", saveBO.Appl_No);
                sqlparam[52] = new SqlParameter("@PAN", saveBO.PAN);
                sqlparam[53] = new SqlParameter("@CKYC_No", saveBO.CKYCNumber);
                sqlparam[54] = new SqlParameter("@Data_Source", saveBO.Data_Source);


                return SqlHelper.ExecuteDataTable(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_COPY_FRONT_OFFICE_DTL", sqlparam);

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        //step2 save
        public bool Insert_Other_Dtls(Investor_Other_DtlBO investor_Other_Dtl, SessionBO session)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[34];
                sqlparam[0] = new SqlParameter("@Appl_No", investor_Other_Dtl.Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@Broker_Code", session.Busi_Broker_Cd);
                sqlparam[2] = new SqlParameter("@Sub_Broker_Code", string.IsNullOrEmpty(investor_Other_Dtl.Sub_Broker_Code) ? (Object)DBNull.Value : investor_Other_Dtl.Sub_Broker_Code.Trim());
                sqlparam[3] = new SqlParameter("@Depositor_Status", investor_Other_Dtl.Depositor_Status);
                sqlparam[4] = new SqlParameter("@Investor_Type", DBNull.Value);
                sqlparam[5] = new SqlParameter("@Existing_FD_Ref_No", DBNull.Value);
                sqlparam[6] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[7] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[8] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[9] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[10] = new SqlParameter("@Physical_App_Number", investor_Other_Dtl.Physical_App_Number);
                sqlparam[11] = new SqlParameter("@Standing_Instructions", string.IsNullOrEmpty(investor_Other_Dtl.Standing_Instructions) ? (object)DBNull.Value : investor_Other_Dtl.Standing_Instructions);
                sqlparam[12] = new SqlParameter("@Annual_Income", investor_Other_Dtl.Annual_Income);
                sqlparam[13] = new SqlParameter("@IsSecondHolderApplicable", investor_Other_Dtl.IsSecondHolderApplicable);
                sqlparam[14] = new SqlParameter("@IsThirdHolderApplicable", investor_Other_Dtl.IsThirdHolderApplicable);
                sqlparam[15] = new SqlParameter("@IsNomineeApplicable", investor_Other_Dtl.IsNomineeApplicable);
                sqlparam[16] = new SqlParameter("@Source", session.Source);
                sqlparam[17] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[18] = new SqlParameter("@State", "VER");
                sqlparam[19] = new SqlParameter("@Status", "PEN");
                sqlparam[20] = new SqlParameter("@Mobilization_Code", string.IsNullOrEmpty(investor_Other_Dtl.Mobilization_Code) ? (object)DBNull.Value : investor_Other_Dtl.Mobilization_Code);
                sqlparam[21] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[22] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[23] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[24] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[25] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(investor_Other_Dtl.FolioNo) ? (object)DBNull.Value : investor_Other_Dtl.FolioNo);
                sqlparam[26] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(investor_Other_Dtl.FDRNo) ? (object)DBNull.Value : investor_Other_Dtl.FDRNo);
                sqlparam[27] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(investor_Other_Dtl.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(investor_Other_Dtl.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));

                sqlparam[28] = new SqlParameter("@Is_FH_Tax_Resident", investor_Other_Dtl.Is_FH_Tax_Resident);
                sqlparam[29] = new SqlParameter("@Is_FH_Green_Card_Holder", investor_Other_Dtl.Is_FH_Green_Card_Holder);
                sqlparam[30] = new SqlParameter("@Is_SH_Tax_Resident", investor_Other_Dtl.Is_SH_Tax_Resident);
                sqlparam[31] = new SqlParameter("@Is_SH_Green_Card_Holder", investor_Other_Dtl.Is_SH_Green_Card_Holder);
                sqlparam[32] = new SqlParameter("@Is_TH_Tax_Resident", investor_Other_Dtl.Is_TH_Tax_Resident);
                sqlparam[33] = new SqlParameter("@Is_TH_Green_Card_Holder", investor_Other_Dtl.Is_TH_Green_Card_Holder);


                cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_OTHER_DTL", sqlparam);
                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlCon,
                //    CommandText = "usp_FD_BT_Insert_Other_Dtl",
                //    CommandType = CommandType.StoredProcedure
                //};
                //if (sqlTrans != null)
                //    cmd.Transaction = sqlTrans;

                //cmd.Parameters.AddRange(sqlparam);
                //cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //step3 save
        public bool Insert_Investment_Dtls(Investment_DtlBO objBO, SessionBO session)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[42];
                sqlparam[0] = new SqlParameter("@Investor_Category", string.IsNullOrEmpty(objBO.Investor_Category) ? (object)DBNull.Value : objBO.Investor_Category.Trim());
                sqlparam[1] = new SqlParameter("@Broker_Code", session.Busi_Broker_Cd);
                sqlparam[2] = new SqlParameter("@Appl_No", objBO.Appl_No.Trim());
                sqlparam[3] = new SqlParameter("@Depositor_Status_Code", objBO.Depositor_Status_Code);
                sqlparam[4] = new SqlParameter("@Category", objBO.Category);
                sqlparam[5] = new SqlParameter("@Scheme", objBO.Scheme);
                sqlparam[6] = new SqlParameter("@Scheme_Code", objBO.SchemeCode);
                sqlparam[7] = new SqlParameter("@Int_Rate", objBO.IntRate);
                sqlparam[8] = new SqlParameter("@Int_Freq", objBO.IntFreq);
                sqlparam[9] = new SqlParameter("@Tenure", objBO.Tenure);
                sqlparam[10] = new SqlParameter("@FDR_Dispatch_Mode", objBO.FDR_Dispatch_Mode);
                sqlparam[11] = new SqlParameter("@Renewal_For", string.IsNullOrEmpty(objBO.Renewal_For) ? (object)DBNull.Value : objBO.Renewal_For.Trim());
                sqlparam[12] = new SqlParameter("@HNG", string.IsNullOrEmpty(objBO.HNG) ? (object)DBNull.Value : objBO.HNG);
                sqlparam[13] = new SqlParameter("@TDS_Flag", objBO.TDS_Flag);
                sqlparam[14] = new SqlParameter("@Is_Auto_Renewal", objBO.Is_Auto_Renewal);
                sqlparam[15] = new SqlParameter("@Amount", objBO.Amount);
                sqlparam[16] = new SqlParameter("@Payment_Mode", string.IsNullOrEmpty(objBO.Payment_Mode) ? (object)DBNull.Value : objBO.Payment_Mode.Trim());
                sqlparam[17] = new SqlParameter("@Payment_Instruction", string.IsNullOrEmpty(objBO.Payment_Instruction) ? (object)DBNull.Value : objBO.Payment_Instruction.Trim());
                sqlparam[18] = new SqlParameter("@Bank_Name", string.IsNullOrEmpty(objBO.Bank_Name) ? (object)DBNull.Value : objBO.Bank_Name);
                sqlparam[19] = new SqlParameter("@Bank_Branch", string.IsNullOrEmpty(objBO.Bank_Branch) ? (object)DBNull.Value : objBO.Bank_Branch);
                sqlparam[20] = new SqlParameter("@Bank_Micr_Code", string.IsNullOrEmpty(objBO.Bank_Micr_Code) ? (object)DBNull.Value : objBO.Bank_Micr_Code);
                sqlparam[21] = new SqlParameter("@Bank_Ifc_Code", string.IsNullOrEmpty(objBO.Bank_Ifsc_Code) ? (object)DBNull.Value : objBO.Bank_Ifsc_Code);
                sqlparam[22] = new SqlParameter("@Payment_Ref_No", string.IsNullOrEmpty(objBO.Payment_Ref_No) ? (object)DBNull.Value : objBO.Payment_Ref_No.Trim());
                sqlparam[23] = new SqlParameter("@Payment_Ref_Date", string.IsNullOrEmpty(objBO.Payment_Ref_Date) ? (object)DBNull.Value : DateTime.ParseExact(objBO.Payment_Ref_Date, "yyyy-mm-dd", System.Globalization.CultureInfo.InvariantCulture));
                sqlparam[24] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[25] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[26] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[27] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[28] = new SqlParameter("@EmployeeCode", string.IsNullOrEmpty(objBO.EmployeeCode) ? (object)DBNull.Value : objBO.EmployeeCode.Trim());
                sqlparam[29] = new SqlParameter("@Source", session.Source);
                sqlparam[30] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[31] = new SqlParameter("@State", "VER");
                sqlparam[32] = new SqlParameter("@Status", "PEN");
                sqlparam[33] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[34] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[35] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[36] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[37] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(objBO.FolioNo) ? (object)DBNull.Value : objBO.FolioNo);
                sqlparam[38] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(objBO.FDRNo) ? (object)DBNull.Value : objBO.FDRNo);
                sqlparam[39] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(objBO.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(objBO.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                sqlparam[40] = new SqlParameter("@Ind_Nind", string.IsNullOrEmpty(objBO.Ind_Nind) ? (object)DBNull.Value : objBO.Ind_Nind);
                sqlparam[41] = new SqlParameter("@ApplicationDeclarationType", string.IsNullOrEmpty(objBO.ApplicationDeclarationType) ? (object)DBNull.Value : objBO.ApplicationDeclarationType);
                cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_INVESTMENT_DTLS", sqlparam);
                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlCon,
                //    CommandText = "usp_FD_BT_Insert_Other_Dtl",
                //    CommandType = CommandType.StoredProcedure
                //};
                //if (sqlTrans != null)
                //    cmd.Transaction = sqlTrans;

                //cmd.Parameters.AddRange(sqlparam);
                //cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //step4 save
        public bool Insert_Repayment_Bank_Dtls(Investor_Bank_DtlBO objBO, SessionBO session)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[22];
                sqlparam[0] = new SqlParameter("@Appl_No", objBO.Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@MICRCode", objBO.MICRCode);
                sqlparam[2] = new SqlParameter("@NEFTCode", objBO.NEFTCode);
                sqlparam[3] = new SqlParameter("@BankName", objBO.BankName.Trim());
                sqlparam[4] = new SqlParameter("@BranchName", objBO.BranchName);
                sqlparam[5] = new SqlParameter("@BankAccountNo", objBO.BankAccountNo.Trim());
                sqlparam[6] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[7] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[8] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[9] = new SqlParameter("@SessionId", session.Session_ID.ToString());
                sqlparam[10] = new SqlParameter("@Source", session.Source);
                sqlparam[11] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[12] = new SqlParameter("@State", "VER");
                sqlparam[13] = new SqlParameter("@Status", "PEN");
                sqlparam[14] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[15] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[16] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[17] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[18] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(objBO.FolioNo) ? (object)DBNull.Value : objBO.FolioNo);
                sqlparam[19] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(objBO.FDRNo) ? (object)DBNull.Value : objBO.FDRNo);
                sqlparam[20] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(objBO.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(objBO.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                sqlparam[21] = new SqlParameter("@IsProvBank", objBO.IsProvBank);

                cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_REPAYMENT_BANK_DTLS", sqlparam);
                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlCon,
                //    CommandText = "usp_FD_BT_Insert_Other_Dtl",
                //    CommandType = CommandType.StoredProcedure
                //};
                //if (sqlTrans != null)
                //    cmd.Transaction = sqlTrans;

                //cmd.Parameters.AddRange(sqlparam);
                //cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //step6 save
        public bool Insert_Nominee_Details(Nominee_Dtl nominee_Dtl, SessionBO session)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[44];
                sqlparam[0] = new SqlParameter("@Appl_No", nominee_Dtl.Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@Nominee_Salutation", nominee_Dtl.Nominee_Salutation);
                sqlparam[2] = new SqlParameter("@Nominee_Name", nominee_Dtl.Nominee_Name.Trim());
                sqlparam[3] = new SqlParameter("@Nominee_First_Name", nominee_Dtl.Nominee_First_Name.Trim());
                sqlparam[4] = new SqlParameter("@Nominee_Middle_Name", string.IsNullOrEmpty(nominee_Dtl.Nominee_Middle_Name) ? (object)DBNull.Value : nominee_Dtl.Nominee_Middle_Name.Trim());
                sqlparam[5] = new SqlParameter("@Nominee_Last_Name", string.IsNullOrEmpty(nominee_Dtl.Nominee_Last_Name) ? (object)DBNull.Value : nominee_Dtl.Nominee_Last_Name.Trim());
                sqlparam[6] = new SqlParameter("@Nominee_Relations", nominee_Dtl.Nominee_Relations);
                sqlparam[7] = new SqlParameter("@Nominee_DOB", string.IsNullOrEmpty(nominee_Dtl.Nominee_DOB) ? (object)DBNull.Value : DateTime.ParseExact(nominee_Dtl.Nominee_DOB, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture)); //this to be passed as Date instead of datetime
                sqlparam[8] = new SqlParameter("@Is_Nominee_Minor", nominee_Dtl.Is_Nominee_Minor);
                sqlparam[9] = new SqlParameter("@EmailID", string.IsNullOrEmpty(nominee_Dtl.EmailID) ? (object)DBNull.Value : nominee_Dtl.EmailID.Trim());
                sqlparam[10] = new SqlParameter("@MobileNo", string.IsNullOrEmpty(nominee_Dtl.MobileNo) ? (object)DBNull.Value : nominee_Dtl.MobileNo.Trim());
                sqlparam[11] = new SqlParameter("@Nominee_Status", string.IsNullOrEmpty(nominee_Dtl.Nominee_Status) ? (object)DBNull.Value : nominee_Dtl.Nominee_Status.Trim());
                sqlparam[12] = new SqlParameter("@GuardianName", string.IsNullOrEmpty(nominee_Dtl.GuardianName) ? (object)DBNull.Value : nominee_Dtl.GuardianName.Trim());
                sqlparam[13] = new SqlParameter("@Address1", string.IsNullOrEmpty(nominee_Dtl.Address1) ? (object)DBNull.Value : nominee_Dtl.Address1);
                sqlparam[14] = new SqlParameter("@Address2", string.IsNullOrEmpty(nominee_Dtl.Address2) ? (object)DBNull.Value : nominee_Dtl.Address2.Trim());
                sqlparam[15] = new SqlParameter("@Address3", string.IsNullOrEmpty(nominee_Dtl.Address3) ? (object)DBNull.Value : nominee_Dtl.Address3.Trim());
                sqlparam[16] = new SqlParameter("@City", nominee_Dtl.City);
                sqlparam[17] = new SqlParameter("@StateCode", nominee_Dtl.StateCode);
                sqlparam[18] = new SqlParameter("@DistrictCode", nominee_Dtl.DistrictCode);
                sqlparam[19] = new SqlParameter("@StateName", nominee_Dtl.StateName);
                sqlparam[20] = new SqlParameter("@DistrictName", nominee_Dtl.DistrictName);
                sqlparam[21] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[22] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[23] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[24] = new SqlParameter("@SessionId", session.Session_ID.ToString());
                sqlparam[25] = new SqlParameter("@Guardian_Salution", string.IsNullOrEmpty(nominee_Dtl.Guardian_Salutation) ? (object)DBNull.Value : nominee_Dtl.Guardian_Salutation);
                sqlparam[26] = new SqlParameter("@Guardian_First_Name", string.IsNullOrEmpty(nominee_Dtl.Guardian_First_Name) ? (object)DBNull.Value : nominee_Dtl.Guardian_First_Name);
                sqlparam[27] = new SqlParameter("@Guardian_Middle_Name", string.IsNullOrEmpty(nominee_Dtl.Guardian_Middle_Name) ? (object)DBNull.Value : nominee_Dtl.Guardian_Middle_Name);
                sqlparam[28] = new SqlParameter("@Guardian_Last_Name", string.IsNullOrEmpty(nominee_Dtl.Guardian_Last_Name) ? (object)DBNull.Value : nominee_Dtl.Guardian_Last_Name);
                sqlparam[29] = new SqlParameter("@PIN", nominee_Dtl.PIN);
                sqlparam[30] = new SqlParameter("@Country_Code", nominee_Dtl.CountryCode);
                sqlparam[31] = new SqlParameter("@Country_Desc", nominee_Dtl.CountryName);
                sqlparam[32] = new SqlParameter("@Source", session.Source);
                sqlparam[33] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[34] = new SqlParameter("@State", "VER");
                sqlparam[35] = new SqlParameter("@Status", "PEN");
                sqlparam[36] = new SqlParameter("@TelephoneNo", nominee_Dtl.TelephoneNo);
                sqlparam[37] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[38] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[39] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[40] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[41] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(nominee_Dtl.FolioNo) ? (object)DBNull.Value : nominee_Dtl.FolioNo);
                sqlparam[42] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(nominee_Dtl.FDRNo) ? (object)DBNull.Value : nominee_Dtl.FDRNo);
                sqlparam[43] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(nominee_Dtl.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(nominee_Dtl.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));

                cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_NOMINEE_DTLS", sqlparam);

                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlCon,
                //    CommandText = "usp_FD_BT_Insert_Nominee_Dtl",
                //    CommandType = CommandType.StoredProcedure
                //};
                //if (sqlTrans != null)
                //    cmd.Transaction = sqlTrans;

                //cmd.Parameters.AddRange(sqlparam);
                //cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }
        }

        //step7 save
        public bool Insert_OVD(List<OVDBO> _OVD, SessionBO session)
        {
            int cnt = 0;

            try
            {
                DataTable dt = _OVD.ToDataTable();
                SqlParameter[] sqlparam = new SqlParameter[6];
                sqlparam[0] = new SqlParameter("@DocList", dt);
                sqlparam[1] = new SqlParameter("@formCode", session.FormCode);
                sqlparam[2] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
                sqlparam[3] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[4] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[5] = new SqlParameter("@CreatedIP", session.CreatedIP);

                cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_OVD_REF", sqlparam);

                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlCon,
                //    CommandText = "usp_FD_BT_Insert_OVD_Ref",
                //    CommandType = CommandType.StoredProcedure
                //};
                //if (sqlTrans != null)
                //    cmd.Transaction = sqlTrans;

                //cmd.Parameters.AddRange(sqlparam);
                //cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }
        }


        public bool UpdateApplicationDetails(UpdateApplicationBO updateApplication, SessionBO session)
        {

            try
            {
                int cnt = 0;
                //int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[9];

                sqlparam[0] = new SqlParameter("@Appl_No", updateApplication.Appl_No);
                sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[2] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[3] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[4] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[5] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[6] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[7] = new SqlParameter("@GeneratePIS", updateApplication.GeneratePIS);
                sqlparam[8] = new SqlParameter("@Source", session.Source);

                cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_UPDATE_APPL_STATUS", sqlparam);

                //SqlCommand cmd = new SqlCommand
                //{
                //    Connection = sqlCon,
                //    CommandText = "USP_FD_BT_UNI_UPDATE_APPL_STATUS",
                //    CommandType = CommandType.StoredProcedure,
                //};
                //if (sqlTrans != null)
                //    cmd.Transaction = sqlTrans;

                //cmd.Parameters.AddRange(sqlparam);
                //cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }

        }

        //step8 save
        public bool Insert_Front_Office_Dtls_TRAN(FrontOfficeSaveBO saveBO, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[54];
                sqlparam[0] = new SqlParameter("@Physic", saveBO.Physical);
                sqlparam[1] = new SqlParameter("@Salutation", saveBO.Salutation);
                sqlparam[2] = new SqlParameter("@FirstName", saveBO.FirstName);
                sqlparam[3] = new SqlParameter("@MiddleName", saveBO.MiddleName);
                sqlparam[4] = new SqlParameter("@LastName", saveBO.LastName);
                sqlparam[5] = new SqlParameter("@DOB", DateTime.ParseExact(saveBO.DOB, "yyyy-MM-dd", CultureInfo.InvariantCulture));
                sqlparam[6] = new SqlParameter("@Amount", saveBO.Amount);
                sqlparam[7] = new SqlParameter("@ModeOfPayment", saveBO.ModeOfPayment);
                sqlparam[8] = new SqlParameter("@Cheque_Date", string.IsNullOrEmpty(saveBO.Cheque_Date) ? (object)DBNull.Value : DateTime.ParseExact(saveBO.Cheque_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture));
                sqlparam[9] = new SqlParameter("@Instrument_No", saveBO.Instrument_No);
                sqlparam[10] = new SqlParameter("@BankName", saveBO.BankName);
                sqlparam[11] = new SqlParameter("@BranchName", saveBO.BranchName);
                sqlparam[12] = new SqlParameter("@IFSC_Code", saveBO.IFSC_Code);
                sqlparam[13] = new SqlParameter("@MICR_Code", saveBO.MICR_Code);
                sqlparam[14] = new SqlParameter("@DeliveredByName", DBNull.Value);
                sqlparam[15] = new SqlParameter("@Discrepency_Flg", "ACCEPT");
                sqlparam[16] = new SqlParameter("@mobile", saveBO.Mobile);
                sqlparam[17] = new SqlParameter("@email", saveBO.Email);
                sqlparam[18] = new SqlParameter("@Cms_Location_Code", saveBO.Cms_Location_Code);
                sqlparam[19] = new SqlParameter("@Cms_Location_Name", saveBO.Cms_Location_Name);
                sqlparam[20] = new SqlParameter("@App_Type", DBNull.Value);
                sqlparam[21] = new SqlParameter("@No_Of_Application", "1");
                sqlparam[22] = new SqlParameter("@Remarks", saveBO.Remarks);
                sqlparam[23] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[24] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[25] = new SqlParameter("@CreatedType", session.CreatedType);
                sqlparam[26] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[27] = new SqlParameter("@SessionID", session.Session_ID);
                sqlparam[28] = new SqlParameter("@FromCode", session.FormCode);
                sqlparam[29] = new SqlParameter("@Source", session.Source);
                sqlparam[30] = new SqlParameter("@AgencyType", session.Agency_Type);
                sqlparam[31] = new SqlParameter("@AgencySubType", session.Agency_Sub_Type);
                sqlparam[32] = new SqlParameter("@AgencyCode", session.Agency_Cd);
                sqlparam[33] = new SqlParameter("@AgencyName", session.Agency_Name);
                sqlparam[34] = new SqlParameter("@Agency_Usr_Base_Branch_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[35] = new SqlParameter("@Agency_Usr_Cd", session.Agency_Usr_Clustered_ID);
                sqlparam[36] = new SqlParameter("@Agency_Usr_Name", session.Agency_Usr_Name);
                sqlparam[37] = new SqlParameter("@Agency_Usr_Branch_Cd", saveBO.Agency_Usr_Branch_Cd);
                sqlparam[38] = new SqlParameter("@Agency_Usr_Branch_Name", saveBO.Agency_Usr_Branch_Name);
                sqlparam[39] = new SqlParameter("@Application_No", saveBO.Appl_No);
                sqlparam[40] = new SqlParameter("@Pickup_Date", DBNull.Value);
                sqlparam[41] = new SqlParameter("@Existing_FDR_No", saveBO.Existing_FDR_No);
                sqlparam[42] = new SqlParameter("@Folio_No", saveBO.Folio_No);
                sqlparam[43] = new SqlParameter("@ApplicationType", DBNull.Value);
                sqlparam[44] = new SqlParameter("@MobilizationCode", DBNull.Value);
                sqlparam[45] = new SqlParameter("@BrokerCode", session.Busi_Broker_Cd);
                sqlparam[46] = new SqlParameter("@Ind_Nind", saveBO.DepositorCategory);
                sqlparam[47] = new SqlParameter("@IsCmsNoncms", saveBO.IsCmsNoncms);
                sqlparam[48] = new SqlParameter("@ChequeDepositedBy", saveBO.ChequeDepositedBy);
                sqlparam[49] = new SqlParameter("@NONCMSCheque_Deposit_Date", saveBO.NONCMSCheque_Deposit_Date);
                sqlparam[50] = new SqlParameter("@ApplicationDeclarationType", saveBO.ApplicationDeclarationType);
                sqlparam[51] = new SqlParameter("@PAN", saveBO.PAN);
                sqlparam[52] = new SqlParameter("@CKYC_No", saveBO.CKYCNumber);
                sqlparam[53] = new SqlParameter("@Data_Source", saveBO.Data_Source);

                //return SqlHelper.ExecuteDataTable(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_FRONT_OFFICE_DTL", sqlparam);
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_INSERT_FRONT_OFFICE_DTL",
                    CommandType = CommandType.StoredProcedure
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                int cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        //step8 save
        public bool Insert_Other_Dtls_TRAN(Investor_Other_DtlBO investor_Other_Dtl, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[34];
                sqlparam[0] = new SqlParameter("@Appl_No", investor_Other_Dtl.Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@Broker_Code", session.Busi_Broker_Cd);
                sqlparam[2] = new SqlParameter("@Sub_Broker_Code", string.IsNullOrEmpty(investor_Other_Dtl.Sub_Broker_Code) ? (Object)DBNull.Value : investor_Other_Dtl.Sub_Broker_Code.Trim());
                sqlparam[3] = new SqlParameter("@Depositor_Status", investor_Other_Dtl.Depositor_Status);
                sqlparam[4] = new SqlParameter("@Investor_Type", DBNull.Value);
                sqlparam[5] = new SqlParameter("@Existing_FD_Ref_No", DBNull.Value);
                sqlparam[6] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[7] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[8] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[9] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[10] = new SqlParameter("@Physical_App_Number", investor_Other_Dtl.Physical_App_Number);
                sqlparam[11] = new SqlParameter("@Standing_Instructions", string.IsNullOrEmpty(investor_Other_Dtl.Standing_Instructions) ? (object)DBNull.Value : investor_Other_Dtl.Standing_Instructions);
                sqlparam[12] = new SqlParameter("@Annual_Income", investor_Other_Dtl.Annual_Income);
                sqlparam[13] = new SqlParameter("@IsSecondHolderApplicable", investor_Other_Dtl.IsSecondHolderApplicable);
                sqlparam[14] = new SqlParameter("@IsThirdHolderApplicable", investor_Other_Dtl.IsThirdHolderApplicable);
                sqlparam[15] = new SqlParameter("@IsNomineeApplicable", investor_Other_Dtl.IsNomineeApplicable);
                sqlparam[16] = new SqlParameter("@Source", session.Source);
                sqlparam[17] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[18] = new SqlParameter("@State", State);
                sqlparam[19] = new SqlParameter("@Status", Status);
                sqlparam[20] = new SqlParameter("@Mobilization_Code", string.IsNullOrEmpty(investor_Other_Dtl.Mobilization_Code) ? (object)DBNull.Value : investor_Other_Dtl.Mobilization_Code);
                sqlparam[21] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[22] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[23] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[24] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[25] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(investor_Other_Dtl.FolioNo) ? (object)DBNull.Value : investor_Other_Dtl.FolioNo);
                sqlparam[26] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(investor_Other_Dtl.FDRNo) ? (object)DBNull.Value : investor_Other_Dtl.FDRNo);
                sqlparam[27] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(investor_Other_Dtl.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(investor_Other_Dtl.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));

                sqlparam[28] = new SqlParameter("@Is_FH_Tax_Resident", investor_Other_Dtl.Is_FH_Tax_Resident);
                sqlparam[29] = new SqlParameter("@Is_FH_Green_Card_Holder", investor_Other_Dtl.Is_FH_Green_Card_Holder);
                sqlparam[30] = new SqlParameter("@Is_SH_Tax_Resident", investor_Other_Dtl.Is_SH_Tax_Resident);
                sqlparam[31] = new SqlParameter("@Is_SH_Green_Card_Holder", investor_Other_Dtl.Is_SH_Green_Card_Holder);
                sqlparam[32] = new SqlParameter("@Is_TH_Tax_Resident", investor_Other_Dtl.Is_TH_Tax_Resident);
                sqlparam[33] = new SqlParameter("@Is_TH_Green_Card_Holder", investor_Other_Dtl.Is_TH_Green_Card_Holder);
                //cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_OTHER_DTL", sqlparam);
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_INSERT_OTHER_DTL",
                    CommandType = CommandType.StoredProcedure
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //step8 save
        public bool Insert_Investment_Dtls_TRAN(Investment_DtlBO objBO, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[42];
                sqlparam[0] = new SqlParameter("@Investor_Category", string.IsNullOrEmpty(objBO.Investor_Category) ? (object)DBNull.Value : objBO.Investor_Category.Trim());
                sqlparam[1] = new SqlParameter("@Broker_Code", session.Busi_Broker_Cd);
                sqlparam[2] = new SqlParameter("@Appl_No", objBO.Appl_No.Trim());
                sqlparam[3] = new SqlParameter("@Depositor_Status_Code", objBO.Depositor_Status_Code);
                sqlparam[4] = new SqlParameter("@Category", objBO.Category);
                sqlparam[5] = new SqlParameter("@Scheme", objBO.Scheme);
                sqlparam[6] = new SqlParameter("@Scheme_Code", objBO.SchemeCode);
                sqlparam[7] = new SqlParameter("@Int_Rate", objBO.IntRate);
                sqlparam[8] = new SqlParameter("@Int_Freq", objBO.IntFreq);
                sqlparam[9] = new SqlParameter("@Tenure", objBO.Tenure);
                sqlparam[10] = new SqlParameter("@FDR_Dispatch_Mode", objBO.FDR_Dispatch_Mode);
                sqlparam[11] = new SqlParameter("@Renewal_For", string.IsNullOrEmpty(objBO.Renewal_For) ? (object)DBNull.Value : objBO.Renewal_For.Trim());
                sqlparam[12] = new SqlParameter("@HNG", string.IsNullOrEmpty(objBO.HNG) ? (object)DBNull.Value : objBO.HNG);
                sqlparam[13] = new SqlParameter("@TDS_Flag", objBO.TDS_Flag);
                sqlparam[14] = new SqlParameter("@Is_Auto_Renewal", objBO.Is_Auto_Renewal);
                sqlparam[15] = new SqlParameter("@Amount", objBO.Amount);
                sqlparam[16] = new SqlParameter("@Payment_Mode", string.IsNullOrEmpty(objBO.Payment_Mode) ? (object)DBNull.Value : objBO.Payment_Mode.Trim());
                sqlparam[17] = new SqlParameter("@Payment_Instruction", string.IsNullOrEmpty(objBO.Payment_Instruction) ? (object)DBNull.Value : objBO.Payment_Instruction.Trim());
                sqlparam[18] = new SqlParameter("@Bank_Name", string.IsNullOrEmpty(objBO.Bank_Name) ? (object)DBNull.Value : objBO.Bank_Name);
                sqlparam[19] = new SqlParameter("@Bank_Branch", string.IsNullOrEmpty(objBO.Bank_Branch) ? (object)DBNull.Value : objBO.Bank_Branch);
                sqlparam[20] = new SqlParameter("@Bank_Micr_Code", string.IsNullOrEmpty(objBO.Bank_Micr_Code) ? (object)DBNull.Value : objBO.Bank_Micr_Code);
                sqlparam[21] = new SqlParameter("@Bank_Ifc_Code", string.IsNullOrEmpty(objBO.Bank_Ifsc_Code) ? (object)DBNull.Value : objBO.Bank_Ifsc_Code);
                sqlparam[22] = new SqlParameter("@Payment_Ref_No", string.IsNullOrEmpty(objBO.Payment_Ref_No) ? (object)DBNull.Value : objBO.Payment_Ref_No.Trim());
                sqlparam[23] = new SqlParameter("@Payment_Ref_Date", string.IsNullOrEmpty(objBO.Payment_Ref_Date) ? (object)DBNull.Value : DateTime.ParseExact(objBO.Payment_Ref_Date, "yyyy-mm-dd", System.Globalization.CultureInfo.InvariantCulture));
                sqlparam[24] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[25] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[26] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[27] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[28] = new SqlParameter("@EmployeeCode", string.IsNullOrEmpty(objBO.EmployeeCode) ? (object)DBNull.Value : objBO.EmployeeCode.Trim());
                sqlparam[29] = new SqlParameter("@Source", session.Source);
                sqlparam[30] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[31] = new SqlParameter("@State", State);
                sqlparam[32] = new SqlParameter("@Status", Status);
                sqlparam[33] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[34] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[35] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[36] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[37] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(objBO.FolioNo) ? (object)DBNull.Value : objBO.FolioNo);
                sqlparam[38] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(objBO.FDRNo) ? (object)DBNull.Value : objBO.FDRNo);
                sqlparam[39] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(objBO.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(objBO.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                sqlparam[40] = new SqlParameter("@Ind_Nind", string.IsNullOrEmpty(objBO.Ind_Nind) ? (object)DBNull.Value : objBO.Ind_Nind);
                sqlparam[41] = new SqlParameter("@ApplicationDeclarationType", string.IsNullOrEmpty(objBO.ApplicationDeclarationType) ? (object)DBNull.Value : objBO.ApplicationDeclarationType);
                //cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_INVESTMENT_DTLS", sqlparam);
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_INSERT_INVESTMENT_DTLS",
                    CommandType = CommandType.StoredProcedure
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //step8 save
        public bool Insert_Repayment_Bank_Dtls_TRAN(Investor_Bank_DtlBO objBO, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[21];
                sqlparam[0] = new SqlParameter("@Appl_No", objBO.Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@MICRCode", objBO.MICRCode);
                sqlparam[2] = new SqlParameter("@NEFTCode", objBO.NEFTCode);
                sqlparam[3] = new SqlParameter("@BankName", objBO.BankName.Trim());
                sqlparam[4] = new SqlParameter("@BranchName", objBO.BranchName);
                sqlparam[5] = new SqlParameter("@BankAccountNo", objBO.BankAccountNo.Trim());
                sqlparam[6] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[7] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[8] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[9] = new SqlParameter("@SessionId", session.Session_ID.ToString());
                sqlparam[10] = new SqlParameter("@Source", session.Source);
                sqlparam[11] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[12] = new SqlParameter("@State", State);
                sqlparam[13] = new SqlParameter("@Status", Status);
                sqlparam[14] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[15] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[16] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[17] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[18] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(objBO.FolioNo) ? (object)DBNull.Value : objBO.FolioNo);
                sqlparam[19] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(objBO.FDRNo) ? (object)DBNull.Value : objBO.FDRNo);
                sqlparam[20] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(objBO.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(objBO.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));

                //cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_REPAYMENT_BANK_DTLS", sqlparam);
                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_INSERT_REPAYMENT_BANK_DTLS",
                    CommandType = CommandType.StoredProcedure
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //step8 save
        public bool Insert_KYC_Data_Dtls_TRAN(List<KYCDataDetailBO> ObjKYCDataDetail, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            try
            {
                //based on the holder type it will save second and third holder details respectively
                int cnt = 0;
                foreach (var i in ObjKYCDataDetail)
                {
                    XmlDocument ResponseImgDtls = null;
                    if (i.Data_Source == "CKYC" )
                    {
                        CKYC_SearchDAL searchDAL = new CKYC_SearchDAL(configuration);
                        ResponseImgDtls = searchDAL.SAVE_CKYC_OVD_DTLS(i.Kyc_Number, i.Appl_No, i.Holder_Type);
                    }

                    //
                    List<SqlParameter> Params2 = new List<SqlParameter>();
                    SqlParameter[] Params1 ={
                     new SqlParameter("@Holder_Type", i.Holder_Type),
                     new SqlParameter("@Appl_No", i.Appl_No.Trim()),
                     new SqlParameter("@Kyc_Number", string.IsNullOrEmpty(i.Kyc_Number) ? (object)DBNull.Value : i.Kyc_Number),
                     new SqlParameter("@Kyc_NamePrefix", i.Kyc_NamePrefix),
                     new SqlParameter("@Kyc_FirstName", i.Kyc_FirstName),
                     new SqlParameter("@Kyc_MiddleName", string.IsNullOrEmpty(i.Kyc_MiddleName) ? (object)DBNull.Value : i.Kyc_MiddleName),
                     new SqlParameter("@Kyc_LastName", string.IsNullOrEmpty(i.Kyc_LastName) ? (object)DBNull.Value : i.Kyc_LastName),
                     new SqlParameter("@Kyc_FullName", i.Kyc_FullName),
                     new SqlParameter("@Kyc_FatherNamePrefix", string.IsNullOrEmpty(i.Kyc_FatherNamePrefix) ? (object)DBNull.Value : i.Kyc_FatherNamePrefix),
                     new SqlParameter("@Kyc_FatherFirstName", string.IsNullOrEmpty(i.Kyc_FatherFirstName) ? (object)DBNull.Value : i.Kyc_FatherFirstName),
                     new SqlParameter("@Kyc_FatherMiddleName", string.IsNullOrEmpty(i.Kyc_FatherMiddleName) ? (object)DBNull.Value : i.Kyc_FatherMiddleName),
                     new SqlParameter("@Kyc_FatherLastName", string.IsNullOrEmpty(i.Kyc_FatherLastName) ? (object)DBNull.Value : i.Kyc_FatherLastName),
                     new SqlParameter("@Kyc_FatherFullName", string.IsNullOrEmpty(i.Kyc_FatherFullName) ? (object)DBNull.Value : i.Kyc_FatherFullName),
                     new SqlParameter("@Kyc_SpouseNamePrefix", string.IsNullOrEmpty(i.Kyc_SpouseNamePrefix) ? (object)DBNull.Value : i.Kyc_SpouseNamePrefix),
                     new SqlParameter("@Kyc_SpouseFirstName", string.IsNullOrEmpty(i.Kyc_SpouseFirstName) ? (object)DBNull.Value : i.Kyc_SpouseFirstName),
                     new SqlParameter("@Kyc_SpouseMiddleName", string.IsNullOrEmpty(i.Kyc_SpouseMiddleName) ? (object)DBNull.Value : i.Kyc_SpouseMiddleName),
                     new SqlParameter("@Kyc_SpouseLastName", string.IsNullOrEmpty(i.Kyc_SpouseLastName) ? (object)DBNull.Value : i.Kyc_SpouseLastName),
                     new SqlParameter("@Kyc_SpouseFullName", string.IsNullOrEmpty(i.Kyc_SpouseFullName) ? (object)DBNull.Value : i.Kyc_SpouseFullName),
                     new SqlParameter("@Kyc_MotherNamePrefix", string.IsNullOrEmpty(i.Kyc_MotherNamePrefix) ? (object)DBNull.Value : i.Kyc_MotherNamePrefix),
                     new SqlParameter("@Kyc_MotherFirstName", string.IsNullOrEmpty(i.Kyc_MotherFirstName) ? (object)DBNull.Value : i.Kyc_MotherFirstName),
                     new SqlParameter("@Kyc_MotherMiddletName", string.IsNullOrEmpty(i.Kyc_MotherMiddletName) ? (object)DBNull.Value : i.Kyc_MotherMiddletName),
                     new SqlParameter("@Kyc_MotherLastName", string.IsNullOrEmpty(i.Kyc_MotherLastName) ? (object)DBNull.Value : i.Kyc_MotherLastName),
                     new SqlParameter("@Kyc_MotherFullName", string.IsNullOrEmpty(i.Kyc_MotherFullName) ? (object)DBNull.Value : i.Kyc_MotherFullName),
                     new SqlParameter("@Kyc_GuardianFirstName", string.IsNullOrEmpty(i.Kyc_GuardianFirstName) ? (object)DBNull.Value : i.Kyc_GuardianFirstName),
                     new SqlParameter("@Kyc_GuardianMiddleName", string.IsNullOrEmpty(i.Kyc_GuardianMiddleName) ? (object)DBNull.Value : i.Kyc_GuardianMiddleName),
                     new SqlParameter("@Kyc_GuardianLastName", string.IsNullOrEmpty(i.Kyc_GuardianLastName) ? (object)DBNull.Value : i.Kyc_GuardianLastName),
                     new SqlParameter("@Kyc_GuardianFullName", string.IsNullOrEmpty(i.Kyc_GuardianFullName) ? (object)DBNull.Value : i.Kyc_GuardianFullName),
                     new SqlParameter("@Kyc_Gender", i.Kyc_Gender),
                     new SqlParameter("@Kyc_MaritalStatus", i.Kyc_MaritalStatus),
                     new SqlParameter("@Kyc_Nationality_Code", i.Kyc_Nationality_Code),
                     new SqlParameter("@Kyc_Nationality_Desc", i.Kyc_Nationality_Desc),
                     new SqlParameter("@Kyc_Occupation_Code", i.Kyc_Occupation_Code),
                     new SqlParameter("@Kyc_Occupation_Desc", i.Kyc_Occupation_Desc),
                     new SqlParameter("@Kyc_DOB", i.Kyc_DOB),
                     new SqlParameter("@CreatedIP", session.CreatedIP),
                     new SqlParameter("@CreatedBy", session.CreatedBy),
                     new SqlParameter("@CreatedType", session.CreatedType),
                     new SqlParameter("@CreatedByUName", session.CreatedByUName),
                     new SqlParameter("@SessionID", session.Session_ID.ToString()),
                     new SqlParameter("@Form_Code", session.FormCode),
                     new SqlParameter("@Kyc_PAN", string.IsNullOrEmpty(i.Kyc_PAN) ? (object)DBNull.Value : i.Kyc_PAN.Trim()),
                     new SqlParameter("@IsMinor", i.IsMinor),
                     new SqlParameter("@Kyc_Guardian_PAN", string.IsNullOrEmpty(i.Kyc_Guardian_PAN) ? (object)DBNull.Value : i.Kyc_Guardian_PAN.Trim()),
                     new SqlParameter("@Is_Tax_Resident", i.Is_Tax_Resident),
                     new SqlParameter("@Is_Green_Card_Holder", i.Is_Green_Card_Holder),
                     new SqlParameter("@Kyc_GuardianNamePrefix", string.IsNullOrEmpty(i.Kyc_GuardianNamePrefix) ? (object)DBNull.Value : i.Kyc_GuardianNamePrefix),
                     new SqlParameter("@Source", session.Source),
                     new SqlParameter("@State", State),
                     new SqlParameter("@Status", Status),
                     new SqlParameter("@Agency_Code", session.Agency_Cd),
                     new SqlParameter("@Agency_Name", session.Agency_Name),
                     new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd),
                     new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc),
                     new SqlParameter("@FolioNo", string.IsNullOrEmpty(i.FolioNo) ? (object)DBNull.Value : i.FolioNo),
                     new SqlParameter("@FDRNo", string.IsNullOrEmpty(i.FDRNo) ? (object)DBNull.Value : i.FDRNo),
                     new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(i.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(i.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture)),
                     new SqlParameter("@IsEditForCKYC", i.IsEditForCKYC),
                     new SqlParameter("@MobillisationMode", string.IsNullOrEmpty(i.MobilisationMode) ? (object)DBNull.Value : i.MobilisationMode),
                     new SqlParameter("@Data_Source", i.Data_Source),
                     new SqlParameter("@SourceTableId", i.SourceTableId),
                     new SqlParameter("@IND_NIND", i.IND_NIND),
                     new SqlParameter("@Kyc_AnnualIncome_Code", i.Kyc_Annual_Income_Code),
                     new SqlParameter("@Kyc_AnnualIncome_Desc", i.Kyc_Annual_Income_Desc),

                     //avinash added Occupation/sub-occupation changes
                     new SqlParameter("@Kyc_Occ_CustSegType", i.Kyc_Occ_CustSegType),
                     new SqlParameter("@Kyc_Occ_CustSegType_Desc", i.Kyc_Occ_CustSegType_Desc),
                     new SqlParameter("@Kyc_Occ_CustSegSubType", i.Kyc_Occ_CustSegSubType),
                     new SqlParameter("@Kyc_Occ_CustSegSubType_Desc", i.Kyc_Occ_CustSegSubType_Desc),

                     new SqlParameter("@IsPEP", i.IsInvPEP == "Y"? 1:0),
                     new SqlParameter("@IsPEP_Relative", i.IsInvPEPRelative == "Y"? 1:0),
                     new SqlParameter("@NSA_Response", i.InvNSA_Status),
                     new SqlParameter("@Risk_Category", i.InvRiskCategory),
                     new SqlParameter("@Compass_Ref_No", i.InvCompass_Ref_No),
                     new SqlParameter("@IsOSV", i.IsInvOSV == "Y"? 1:0)


                     };
                    Params2.AddRange(Params1);
                    if (ResponseImgDtls != null && !string.IsNullOrEmpty(ResponseImgDtls.InnerXml))
                    {
                        SqlParameter param = new SqlParameter("@ResponseImgDtls", SqlDbType.Xml)
                        {
                            Value = ResponseImgDtls.InnerXml
                        };
                        Params2.Add(param);
                    }
                    else
                    {
                        SqlParameter param = new SqlParameter("@ResponseImgDtls", (object)DBNull.Value);

                        Params2.Add(param);
                    }


                    //




                    SqlCommand cmd = new SqlCommand
                    {
                        Connection = sqlCon,
                        //CommandText = "USP_FD_BT_UNI_INSERT_KYC_DATA_DTLS_V1",
                        //CommandText = "USP_FD_BT_UNI_INSERT_KYC_DATA_DTLS_V2",
                        CommandText = "USP_FD_BT_UNI_INSERT_KYC_DATA_DTLS_V3",
                        CommandType = CommandType.StoredProcedure
                    };
                    if (sqlTrans != null)
                        cmd.Transaction = sqlTrans;

                    cmd.Parameters.AddRange(Params2.ToArray());
                    cnt = cmd.ExecuteNonQuery();
                }
                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }
        }

        //step8 save
        public bool Insert_Address_Details_TRAN(List<InvestorAddressBO> investorAddressBO, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            try
            {
                //based on the holder type it will save all the addresses entered for investor, second and third holder respectively
                int cnt = 0;
                foreach (var i in investorAddressBO)
                {
                    SqlParameter[] sqlparam = new SqlParameter[45];
                    sqlparam[0] = new SqlParameter("@Holder_Type", i.Holder_Type);
                    sqlparam[1] = new SqlParameter("@Appl_No", i.Appl_No.Trim());
                    sqlparam[2] = new SqlParameter("@AddType_Code", i.AddType_Code);
                    sqlparam[3] = new SqlParameter("@AddType_Desc", i.AddType_Desc);
                    sqlparam[4] = new SqlParameter("@Add1", string.IsNullOrEmpty(i.Address1) ? (object)DBNull.Value : i.Address1);
                    sqlparam[5] = new SqlParameter("@Add2", string.IsNullOrEmpty(i.Address2) ? (object)DBNull.Value : i.Address2.Trim());
                    sqlparam[6] = new SqlParameter("@Add3", string.IsNullOrEmpty(i.Address3) ? (object)DBNull.Value : i.Address3.Trim());
                    sqlparam[7] = new SqlParameter("@AddCity_Code", string.IsNullOrEmpty(i.Address_City_Code) ? (object)DBNull.Value : i.Address_City_Code.Trim());
                    sqlparam[8] = new SqlParameter("@AddCity_Desc", string.IsNullOrEmpty(i.Address_City_Desc) ? (object)DBNull.Value : i.Address_City_Desc);
                    sqlparam[9] = new SqlParameter("@Mf_AddCity_Desc", string.IsNullOrEmpty(i.Mf_AddCity_Desc) ? (object)DBNull.Value : i.Mf_AddCity_Desc.Trim());
                    sqlparam[10] = new SqlParameter("@AddDistrict_Code", string.IsNullOrEmpty(i.Address_District_Code) ? (object)DBNull.Value : i.Address_District_Code.Trim());
                    sqlparam[11] = new SqlParameter("@AddDistrict_Desc", string.IsNullOrEmpty(i.Address_District_Desc) ? (object)DBNull.Value : i.Address_District_Desc);
                    sqlparam[12] = new SqlParameter("@Mf_AddDistrict_Desc", string.IsNullOrEmpty(i.Mf_AddDistrict_Desc) ? (object)DBNull.Value : i.Mf_AddDistrict_Desc.Trim());
                    sqlparam[13] = new SqlParameter("@AddState_Code", string.IsNullOrEmpty(i.AddState_Code) ? (object)DBNull.Value : i.AddState_Code.Trim());
                    sqlparam[14] = new SqlParameter("@Mf_AddState_Code", string.IsNullOrEmpty(i.Mf_AddState_Code) ? (object)DBNull.Value : i.Mf_AddState_Code.Trim());
                    sqlparam[15] = new SqlParameter("@AddState_Desc", string.IsNullOrEmpty(i.AddState_Desc) ? (object)DBNull.Value : i.AddState_Desc);
                    sqlparam[16] = new SqlParameter("@Mf_AddState_Desc", string.IsNullOrEmpty(i.Mf_AddState_Desc) ? (object)DBNull.Value : i.Mf_AddState_Desc.Trim());
                    sqlparam[17] = new SqlParameter("@AddCountry_Code", string.IsNullOrEmpty(i.AddCountry_Code) ? (object)DBNull.Value : i.AddCountry_Code);
                    sqlparam[18] = new SqlParameter("@AddCountry_Desc", string.IsNullOrEmpty(i.AddCountry_Desc) ? (object)DBNull.Value : i.AddCountry_Desc);
                    sqlparam[19] = new SqlParameter("@AddPin", string.IsNullOrEmpty(i.AddPin) ? (object)DBNull.Value : i.AddPin);
                    sqlparam[20] = new SqlParameter("@ResTelSTD", string.IsNullOrEmpty(i.ResTelSTD) ? (object)DBNull.Value : i.ResTelSTD.Trim());
                    sqlparam[21] = new SqlParameter("@ResTelNumber", string.IsNullOrEmpty(i.ResTelNumber) ? (object)DBNull.Value : i.ResTelNumber.Trim());
                    sqlparam[22] = new SqlParameter("@OffTelSTD", string.IsNullOrEmpty(i.OffTelSTD) ? (object)DBNull.Value : i.OffTelSTD.Trim());
                    sqlparam[23] = new SqlParameter("@OffTelNumber", string.IsNullOrEmpty(i.OffTelNumber) ? (object)DBNull.Value : i.OffTelNumber.Trim());
                    sqlparam[24] = new SqlParameter("@MobileISD", string.IsNullOrEmpty(i.MobileISD) ? (object)DBNull.Value : i.MobileISD.Trim());
                    sqlparam[25] = new SqlParameter("@MobileNumber", string.IsNullOrEmpty(i.MobileNumber) ? (object)DBNull.Value : i.MobileNumber.Trim());
                    sqlparam[26] = new SqlParameter("@FAXSTD", string.IsNullOrEmpty(i.FAXSTD) ? (object)DBNull.Value : i.FAXSTD.Trim());
                    sqlparam[27] = new SqlParameter("@FaxNumber", string.IsNullOrEmpty(i.FaxNumber) ? (object)DBNull.Value : i.FaxNumber.Trim());
                    sqlparam[28] = new SqlParameter("@EmailAdd", string.IsNullOrEmpty(i.EmailAdd) ? (object)DBNull.Value : i.EmailAdd.Trim());
                    sqlparam[29] = new SqlParameter("@CreatedIP", session.CreatedIP);
                    sqlparam[30] = new SqlParameter("@CreatedBy", session.CreatedBy);
                    sqlparam[31] = new SqlParameter("@CreatedType", session.CreatedType);
                    sqlparam[32] = new SqlParameter("@SessionID", session.Session_ID.ToString());
                    sqlparam[33] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                    sqlparam[34] = new SqlParameter("@Form_Code", session.FormCode);
                    sqlparam[35] = new SqlParameter("@Source", session.Source);
                    sqlparam[36] = new SqlParameter("@State", State);
                    sqlparam[37] = new SqlParameter("@Status", Status);
                    sqlparam[38] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                    sqlparam[39] = new SqlParameter("@Agency_Name", session.Agency_Name);
                    sqlparam[40] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                    sqlparam[41] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                    sqlparam[42] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(i.FolioNo) ? (object)DBNull.Value : i.FolioNo);
                    sqlparam[43] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(i.FDRNo) ? (object)DBNull.Value : i.FDRNo);
                    sqlparam[44] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(i.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(i.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));


                    SqlCommand cmd = new SqlCommand
                    {
                        Connection = sqlCon,
                        CommandText = "USP_FD_BT_UNI_INSERT_ADDRESS_DTLS",
                        CommandType = CommandType.StoredProcedure
                    };
                    if (sqlTrans != null)
                        cmd.Transaction = sqlTrans;

                    cmd.Parameters.AddRange(sqlparam);
                    cnt = cmd.ExecuteNonQuery();
                }
                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }
        }

        //step8 save
        public bool Insert_FATCA_DETAILS_TRAN(List<DataEntryBO> dataEntryBOs, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {

            try
            {
                int cnt = 0;
                foreach (var dataEntryBO in dataEntryBOs)
                {
                    DataTable CitizenshipList = new DataTable();
                    DataTable FATCA_Detail = new DataTable();
                    CitizenshipList = dataEntryBO.FATCA_Citizen.ToDataTable();
                    FATCA_Detail = dataEntryBO.FATCA_Detail.ToDataTable();


                    SqlParameter[] sqlparam = new SqlParameter[32];
                    sqlparam[0] = new SqlParameter("@SessionId", session.Session_ID.ToString());
                    sqlparam[1] = new SqlParameter("@f_Mobilization_Type", string.IsNullOrEmpty(dataEntryBO.Mobilization_Type) ? (object)DBNull.Value : dataEntryBO.Mobilization_Type.Trim());
                    sqlparam[2] = new SqlParameter("@f_Mobilization_Code", string.IsNullOrEmpty(dataEntryBO.Mobilization_Code) ? (object)DBNull.Value : dataEntryBO.Mobilization_Code.Trim());
                    sqlparam[3] = new SqlParameter("@f_Appl_No", dataEntryBO.Appl_No.Trim());
                    sqlparam[4] = new SqlParameter("@Nationality_Code", dataEntryBO.Nationality_Code);
                    sqlparam[5] = new SqlParameter("@Nationality_Dec", dataEntryBO.Nationality_Dec);
                    sqlparam[6] = new SqlParameter("@CountryOfBirth_Code", dataEntryBO.CountryOfBirth_Code);
                    sqlparam[7] = new SqlParameter("@CountryOfBirth_Name", dataEntryBO.CountryOfBirth_Name);
                    sqlparam[8] = new SqlParameter("@CityOfBirth_Name", dataEntryBO.CityOfBirth_Name);
                    sqlparam[9] = new SqlParameter("@Father_Name", string.IsNullOrEmpty(dataEntryBO.Father_Name) ? (object)DBNull.Value : dataEntryBO.Father_Name.Trim());
                    sqlparam[10] = new SqlParameter("@Spouse_Name", string.IsNullOrEmpty(dataEntryBO.Spouse_Name) ? (object)DBNull.Value : dataEntryBO.Spouse_Name.Trim());
                    sqlparam[11] = new SqlParameter("@Occupation_code", dataEntryBO.Occupation_code);
                    sqlparam[12] = new SqlParameter("@Occupation_Name", dataEntryBO.Occupation_Name);
                    sqlparam[13] = new SqlParameter("@CreatedBy", session.CreatedBy);
                    sqlparam[14] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                    sqlparam[15] = new SqlParameter("@CreatedIP", session.CreatedIP);
                    sqlparam[16] = new SqlParameter("@FatcaCrs_Citizenship", CitizenshipList);
                    sqlparam[17] = new SqlParameter("@FatcaCrs_Dtl", FATCA_Detail);
                    sqlparam[18] = new SqlParameter("@PAN", dataEntryBO.PAN);
                    sqlparam[19] = new SqlParameter("@GName", string.IsNullOrEmpty(dataEntryBO.GName) ? (object)DBNull.Value : dataEntryBO.GName.Trim());
                    sqlparam[20] = new SqlParameter("@Source", session.Source);
                    sqlparam[21] = new SqlParameter("@Form_Code", session.FormCode);
                    sqlparam[22] = new SqlParameter("@State", State);
                    sqlparam[23] = new SqlParameter("@Status", Status);
                    sqlparam[24] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                    sqlparam[25] = new SqlParameter("@Agency_Name", session.Agency_Name);
                    sqlparam[26] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                    sqlparam[27] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                    sqlparam[28] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(dataEntryBO.FolioNo) ? (object)DBNull.Value : dataEntryBO.FolioNo);
                    sqlparam[29] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(dataEntryBO.FDRNo) ? (object)DBNull.Value : dataEntryBO.FDRNo);
                    sqlparam[30] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(dataEntryBO.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(dataEntryBO.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                    sqlparam[31] = new SqlParameter("@Holder_Type", string.IsNullOrEmpty(dataEntryBO.HolderType) ? (object)DBNull.Value : dataEntryBO.HolderType);

                    SqlCommand cmd = new SqlCommand
                    {
                        Connection = sqlCon,
                        CommandText = "USP_FD_BT_UNI_INSERT_FATCA_DETAILS",
                        CommandType = CommandType.StoredProcedure
                    };
                    if (sqlTrans != null)
                        cmd.Transaction = sqlTrans;

                    cmd.Parameters.AddRange(sqlparam);
                    cnt = cmd.ExecuteNonQuery();


                }
                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {

                //return false;
                throw ex;
            }

        }

        //step8 save
        public bool Insert_Nominee_Details_TRAN(Nominee_Dtl nominee_Dtl, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            try
            {
                int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[44];
                sqlparam[0] = new SqlParameter("@Appl_No", nominee_Dtl.Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@Nominee_Salutation", nominee_Dtl.Nominee_Salutation);
                sqlparam[2] = new SqlParameter("@Nominee_Name", nominee_Dtl.Nominee_Name.Trim());
                sqlparam[3] = new SqlParameter("@Nominee_First_Name", nominee_Dtl.Nominee_First_Name.Trim());
                sqlparam[4] = new SqlParameter("@Nominee_Middle_Name", string.IsNullOrEmpty(nominee_Dtl.Nominee_Middle_Name) ? (object)DBNull.Value : nominee_Dtl.Nominee_Middle_Name.Trim());
                sqlparam[5] = new SqlParameter("@Nominee_Last_Name", string.IsNullOrEmpty(nominee_Dtl.Nominee_Last_Name) ? (object)DBNull.Value : nominee_Dtl.Nominee_Last_Name.Trim());
                sqlparam[6] = new SqlParameter("@Nominee_Relations", nominee_Dtl.Nominee_Relations);
                sqlparam[7] = new SqlParameter("@Nominee_DOB", string.IsNullOrEmpty(nominee_Dtl.Nominee_DOB) ? (object)DBNull.Value : DateTime.ParseExact(nominee_Dtl.Nominee_DOB, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture)); //this to be passed as Date instead of datetime
                sqlparam[8] = new SqlParameter("@Is_Nominee_Minor", nominee_Dtl.Is_Nominee_Minor);
                sqlparam[9] = new SqlParameter("@EmailID", string.IsNullOrEmpty(nominee_Dtl.EmailID) ? (object)DBNull.Value : nominee_Dtl.EmailID.Trim());
                sqlparam[10] = new SqlParameter("@MobileNo", string.IsNullOrEmpty(nominee_Dtl.MobileNo) ? (object)DBNull.Value : nominee_Dtl.MobileNo.Trim());
                sqlparam[11] = new SqlParameter("@Nominee_Status", string.IsNullOrEmpty(nominee_Dtl.Nominee_Status) ? (object)DBNull.Value : nominee_Dtl.Nominee_Status.Trim());
                sqlparam[12] = new SqlParameter("@GuardianName", string.IsNullOrEmpty(nominee_Dtl.GuardianName) ? (object)DBNull.Value : nominee_Dtl.GuardianName.Trim());
                sqlparam[13] = new SqlParameter("@Address1", string.IsNullOrEmpty(nominee_Dtl.Address1) ? (object)DBNull.Value : nominee_Dtl.Address1);
                sqlparam[14] = new SqlParameter("@Address2", string.IsNullOrEmpty(nominee_Dtl.Address2) ? (object)DBNull.Value : nominee_Dtl.Address2.Trim());
                sqlparam[15] = new SqlParameter("@Address3", string.IsNullOrEmpty(nominee_Dtl.Address3) ? (object)DBNull.Value : nominee_Dtl.Address3.Trim());
                sqlparam[16] = new SqlParameter("@City", nominee_Dtl.City);
                sqlparam[17] = new SqlParameter("@StateCode", nominee_Dtl.StateCode);
                sqlparam[18] = new SqlParameter("@DistrictCode", nominee_Dtl.DistrictCode);
                sqlparam[19] = new SqlParameter("@StateName", nominee_Dtl.StateName);
                sqlparam[20] = new SqlParameter("@DistrictName", nominee_Dtl.DistrictName);
                sqlparam[21] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[22] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[23] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[24] = new SqlParameter("@SessionId", session.Session_ID.ToString());
                sqlparam[25] = new SqlParameter("@Guardian_Salution", string.IsNullOrEmpty(nominee_Dtl.Guardian_Salutation) ? (object)DBNull.Value : nominee_Dtl.Guardian_Salutation);
                sqlparam[26] = new SqlParameter("@Guardian_First_Name", string.IsNullOrEmpty(nominee_Dtl.Guardian_First_Name) ? (object)DBNull.Value : nominee_Dtl.Guardian_First_Name);
                sqlparam[27] = new SqlParameter("@Guardian_Middle_Name", string.IsNullOrEmpty(nominee_Dtl.Guardian_Middle_Name) ? (object)DBNull.Value : nominee_Dtl.Guardian_Middle_Name);
                sqlparam[28] = new SqlParameter("@Guardian_Last_Name", string.IsNullOrEmpty(nominee_Dtl.Guardian_Last_Name) ? (object)DBNull.Value : nominee_Dtl.Guardian_Last_Name);
                sqlparam[29] = new SqlParameter("@PIN", nominee_Dtl.PIN);
                sqlparam[30] = new SqlParameter("@Country_Code", nominee_Dtl.CountryCode);
                sqlparam[31] = new SqlParameter("@Country_Desc", nominee_Dtl.CountryName);
                sqlparam[32] = new SqlParameter("@Source", session.Source);
                sqlparam[33] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[34] = new SqlParameter("@State", State);
                sqlparam[35] = new SqlParameter("@Status", Status);
                sqlparam[36] = new SqlParameter("@TelephoneNo", nominee_Dtl.TelephoneNo);
                sqlparam[37] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[38] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[39] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[40] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[41] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(nominee_Dtl.FolioNo) ? (object)DBNull.Value : nominee_Dtl.FolioNo);
                sqlparam[42] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(nominee_Dtl.FDRNo) ? (object)DBNull.Value : nominee_Dtl.FDRNo);
                sqlparam[43] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(nominee_Dtl.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(nominee_Dtl.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));

                //cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_INSERT_NOMINEE_DTLS", sqlparam);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_INSERT_NOMINEE_DTLS",
                    CommandType = CommandType.StoredProcedure
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }
        }

        //step8 save
        public bool Insert_OVD_TRAN(List<OVDBO> _OVD, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            int cnt = 0;

            try
            {
                DataTable dt = _OVD.ToDataTable();
                SqlParameter[] sqlparam = new SqlParameter[6];
                sqlparam[0] = new SqlParameter("@DocList", dt);
                sqlparam[1] = new SqlParameter("@formCode", session.FormCode);
                sqlparam[2] = new SqlParameter("@Session_ID", session.Session_ID.ToString());
                sqlparam[3] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[4] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[5] = new SqlParameter("@CreatedIP", session.CreatedIP);

                //cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_OVD_REF", sqlparam);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_INSERT_OVD_REF",
                    CommandType = CommandType.StoredProcedure
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }
        }

        //step8 save
        public bool Insert_Coparceners_Dtl_TRAN(List<Coparceners_DtlBO> MemberDtls, Investor_Other_DtlBO investor_Other_Dtl, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {
            int cnt = 0;

            try
            {
                DataTable dt = MemberDtls.ToDataTable();
                SqlParameter[] sqlparam = new SqlParameter[18];
                sqlparam[0] = new SqlParameter("@Appl_No", investor_Other_Dtl.Appl_No.Trim());
                sqlparam[1] = new SqlParameter("@Depositor_Status", investor_Other_Dtl.Depositor_Status);
                sqlparam[2] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[3] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[4] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[5] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[6] = new SqlParameter("@Source", session.Source);
                sqlparam[7] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[8] = new SqlParameter("@State", State);
                sqlparam[9] = new SqlParameter("@Status", Status);
                sqlparam[10] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[11] = new SqlParameter("@Agency_Name", session.Agency_Name);
                sqlparam[12] = new SqlParameter("@Agency_Usr_Loc_Cd", session.Agency_Usr_Base_Loc_cd);
                sqlparam[13] = new SqlParameter("@Agency_Usr_Loc_Name", session.Agency_Usr_Base_Loc_Desc);
                sqlparam[14] = new SqlParameter("@FolioNo", string.IsNullOrEmpty(investor_Other_Dtl.FolioNo) ? (object)DBNull.Value : investor_Other_Dtl.FolioNo);
                sqlparam[15] = new SqlParameter("@FDRNo", string.IsNullOrEmpty(investor_Other_Dtl.FDRNo) ? (object)DBNull.Value : investor_Other_Dtl.FDRNo);
                sqlparam[16] = new SqlParameter("@Last_Inv_date", string.IsNullOrEmpty(investor_Other_Dtl.LastInvDate) ? (object)DBNull.Value : DateTime.ParseExact(investor_Other_Dtl.LastInvDate, "dd-MMM-yyyy", CultureInfo.InvariantCulture));
                sqlparam[17] = new SqlParameter("@Coparceners_Dtl", dt);


                //cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_INSERT_OVD_REF", sqlparam);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_INSERT_COPARCENERS_Dtl",
                    CommandType = CommandType.StoredProcedure
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception ex)
            {

                //return false;
                throw ex;
            }
        }


        //step8 save
        public bool UpdateApplicationDetails_TRAN(FrontOfficeSaveBO frontOfficeSaveBO, string State, string Status, SessionBO session, SqlConnection sqlCon, SqlTransaction sqlTrans = null)
        {

            try
            {
                int cnt = 0;
                //int cnt = 0;
                SqlParameter[] sqlparam = new SqlParameter[10];

                sqlparam[0] = new SqlParameter("@Appl_No", frontOfficeSaveBO.Appl_No);
                sqlparam[1] = new SqlParameter("@Agency_Code", session.Agency_Cd);
                sqlparam[2] = new SqlParameter("@CreatedBy", session.CreatedBy);
                sqlparam[3] = new SqlParameter("@CreatedByUName", session.CreatedByUName);
                sqlparam[4] = new SqlParameter("@CreatedIP", session.CreatedIP);
                sqlparam[5] = new SqlParameter("@SessionId", session.Session_ID);
                sqlparam[6] = new SqlParameter("@Form_Code", session.FormCode);
                sqlparam[7] = new SqlParameter("@GeneratePIS", frontOfficeSaveBO.GeneratePIS);
                sqlparam[8] = new SqlParameter("@Source", session.Source);
                sqlparam[9] = new SqlParameter("@f_status", Status);

                //cnt = SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_UPDATE_APPL_STATUS", sqlparam);

                SqlCommand cmd = new SqlCommand
                {
                    Connection = sqlCon,
                    CommandText = "USP_FD_BT_UNI_UPDATE_APPL_STATUS_V1",
                    CommandType = CommandType.StoredProcedure,
                };
                if (sqlTrans != null)
                    cmd.Transaction = sqlTrans;

                cmd.Parameters.AddRange(sqlparam);
                cnt = cmd.ExecuteNonQuery();

                return cnt > 0 ? true : false;
            }
            catch (Exception)
            {

                //return false;
                throw;
            }
        }
    }
}
