using System;
using System.Data;
using System.Data.SqlClient;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;

namespace FD_CPTP_UNIFIED.DAL
{
    public class RenewInvestorDetailsSaveBAL
    {
        private readonly RenewInvestorDetailsSaveDAL renewInvestorDetailsSaveDAL;
        private readonly string strConn;

        public RenewInvestorDetailsSaveBAL(IConfiguration configuration)
        {
            strConn = configuration["ConnectionString:CONN_FDBT"];
            renewInvestorDetailsSaveDAL = new RenewInvestorDetailsSaveDAL(configuration);
        }

        public bool InvestorKYCSave(InvestorDetailSaveStruct investorDetailSaveStruct, SessionBO session)
        {
            SqlTransaction sqlTrans;
            bool bInvestKYCDtlSave, bInvestAddressSave, bFactcaSave;
            bFactcaSave = bInvestKYCDtlSave = bInvestAddressSave = false;
            string strResult = string.Empty;
            try
            {
                using (SqlConnection sqlCon = new SqlConnection(strConn))
                {
                    sqlCon.Open();
                    sqlTrans = sqlCon.BeginTransaction(IsolationLevel.Serializable);

                    try
                    {
                        bInvestKYCDtlSave = renewInvestorDetailsSaveDAL.Insert_KYC_Data_Dtls_TRAN(investorDetailSaveStruct.KYCDataDetails, "VER", "PEN", session, sqlCon, sqlTrans);
                        bInvestAddressSave = renewInvestorDetailsSaveDAL.Insert_Address_Details_TRAN(investorDetailSaveStruct.InvestorAddresses, "VER", "PEN", session, sqlCon, sqlTrans);

                        // to save FATCA details
                        if (!string.IsNullOrEmpty(investorDetailSaveStruct.IsFATCAApplicable) && investorDetailSaveStruct.IsFATCAApplicable.Equals("Y"))
                        {
                            bFactcaSave = renewInvestorDetailsSaveDAL.Insert_FATCA_DETAILS_TRAN(investorDetailSaveStruct.FATCA_DTLS, "VER", "PEN", session, sqlCon, sqlTrans);
                        }
                        else
                        { 
                            bFactcaSave = true;
                        }
                        if (bInvestKYCDtlSave && bInvestAddressSave && bFactcaSave)
                        {
                            sqlTrans.Commit();
                            strResult = "SUCCESS";
                            return true;
                        }
                        else if (!bInvestKYCDtlSave || !bInvestAddressSave || !bFactcaSave)
                        {
                            sqlTrans.Rollback();
                            strResult = "FAILED";
                            return false;
                        }
                    }
                    catch (Exception ex)
                    {
                        strResult = "FAILED";
                        sqlTrans.Rollback();
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                strResult = "FAILED";
                throw ex;
            }
            return false;
        }

        public bool InvestorOVDSave(InvestorDetailSaveStruct investorDetailSaveStruct, SessionBO session)
        {
            SqlTransaction sqlTrans;
            bool bOVDSave, bMemberDtlSave;
            bOVDSave = bMemberDtlSave = false;
            string strResult = string.Empty;
            try
            {
                using (SqlConnection sqlCon = new SqlConnection(strConn))
                {
                    sqlCon.Open();
                    sqlTrans = sqlCon.BeginTransaction(IsolationLevel.Serializable);
                    try
                    {

                        bOVDSave = renewInvestorDetailsSaveDAL.Insert_OVD_TRAN(investorDetailSaveStruct.OVDDtls, "VER", "PEN", session, sqlCon, sqlTrans);
                        if (investorDetailSaveStruct.MemberDtls != null)
                        {
                            bMemberDtlSave = renewInvestorDetailsSaveDAL.Insert_Coparceners_Dtl_TRAN(investorDetailSaveStruct.MemberDtls, investorDetailSaveStruct.Investor_Other_Dtl, "VER", "PEN", session, sqlCon, sqlTrans);
                        } 
                        else
                        {
                            bMemberDtlSave = true;
                        }
                        if (bOVDSave && bMemberDtlSave)
                        {
                            sqlTrans.Commit();
                            strResult = "SUCCESS";
                            return true;
                        }
                        else if (!bOVDSave || !bMemberDtlSave)
                        {
                            sqlTrans.Rollback();
                            strResult = "FAILED";
                            return false;
                        }
                    }
                    catch (Exception ex)
                    {
                        strResult = "FAILED";
                        sqlTrans.Rollback();
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                strResult = "FAILED";
                throw ex;
            }
            return false;
        }

        public bool InvestorSingleSave(RenewalDetailSaveStruct investorDetailSaveStruct, SessionBO session)
        {
            SqlTransaction sqlTrans;
            bool bFrontOfficeSave, bBankDtlSave, bInvestDtlSave, bOtherDtlSave, bPaymentDtlSave, bNomineeDtlSave, bFactcaSave, bInvestKYCDtlSave, bInvestAddressSave, bOVDSave, bUpdateApplStatus, bMemberDtlSave;
            bFrontOfficeSave = bBankDtlSave = bInvestDtlSave = bOtherDtlSave = bPaymentDtlSave = bNomineeDtlSave = bFactcaSave = bInvestKYCDtlSave = bInvestAddressSave = bOVDSave = bUpdateApplStatus = bMemberDtlSave = false;
            string strResult = string.Empty;

            try
            {
                using (SqlConnection sqlCon = new SqlConnection(strConn))
                {
                    sqlCon.Open();
                    sqlTrans = sqlCon.BeginTransaction(IsolationLevel.Serializable);

                    try
                    {
                        //to save Front Office details
                        bFrontOfficeSave = renewInvestorDetailsSaveDAL.Insert_Front_Office_Dtls_TRAN(investorDetailSaveStruct.FrontOfficeSave, "VER", "APR", session, sqlCon, sqlTrans);

                        //to save Investor Investment details
                        bInvestDtlSave = renewInvestorDetailsSaveDAL.Insert_Investment_Dtls_TRAN(investorDetailSaveStruct.Investment_Dtl, "VER", "APR", session, sqlCon, sqlTrans);

                        //to save Investor Bank details
                        bBankDtlSave = renewInvestorDetailsSaveDAL.Insert_Repayment_Bank_Dtls_TRAN(investorDetailSaveStruct.Investor_Bank_Dtl, "VER", "APR", session, sqlCon, sqlTrans);

                        // to save Investor Other details
                        bOtherDtlSave = renewInvestorDetailsSaveDAL.Insert_Other_Dtls_TRAN(investorDetailSaveStruct.Investor_Other_Dtl, "VER", "APR", session, sqlCon, sqlTrans);

                        // to save Nominee details
                        if (investorDetailSaveStruct.Investor_Other_Dtl.IsNomineeApplicable)
                        {
                            bNomineeDtlSave = renewInvestorDetailsSaveDAL.Insert_Nominee_Details_TRAN(investorDetailSaveStruct.Nominee_Dtl, "VER", "APR", session, sqlCon, sqlTrans);
                        }   
                        else
                        {
                            bNomineeDtlSave = true;
                        }
                         
                        bInvestKYCDtlSave = renewInvestorDetailsSaveDAL.Insert_KYC_Data_Dtls_TRAN(investorDetailSaveStruct.KYCDataDetails, "VER", "APR", session, sqlCon, sqlTrans);
                        bInvestAddressSave = renewInvestorDetailsSaveDAL.Insert_Address_Details_TRAN(investorDetailSaveStruct.InvestorAddresses, "VER", "APR", session, sqlCon, sqlTrans);

                        // to save FATCA details
                        if (investorDetailSaveStruct.FATCA_DTLS != null && investorDetailSaveStruct.IsFATCAApplicable.Equals("Y"))
                        {
                            bFactcaSave = renewInvestorDetailsSaveDAL.Insert_FATCA_DETAILS_TRAN(investorDetailSaveStruct.FATCA_DTLS, "VER", "APR", session, sqlCon, sqlTrans);
                        }   
                        else
                        {
                            bFactcaSave = true;
                        }
                          
                        if (investorDetailSaveStruct.OVDDtls != null)
                        { 
                            bOVDSave = renewInvestorDetailsSaveDAL.Insert_OVD_TRAN(investorDetailSaveStruct.OVDDtls, "VER", "APR", session, sqlCon, sqlTrans);
                        }
                        else
                        { 
                            bOVDSave = true;
                        }

                        if (investorDetailSaveStruct.MemberDtls != null)
                        { 
                            bMemberDtlSave = renewInvestorDetailsSaveDAL.Insert_Coparceners_Dtl_TRAN(investorDetailSaveStruct.MemberDtls, investorDetailSaveStruct.Investor_Other_Dtl, "VER", "PEN", session, sqlCon, sqlTrans);
                        }
                        else
                        { 
                            bMemberDtlSave = true;
                        }

                        // Update the Application to Closed
                        bUpdateApplStatus = renewInvestorDetailsSaveDAL.UpdateApplicationDetails_TRAN(investorDetailSaveStruct.FrontOfficeSave, "VER", "APR", session, sqlCon, sqlTrans);
                        if (bFrontOfficeSave && bBankDtlSave && bInvestDtlSave && bOtherDtlSave && bNomineeDtlSave && bInvestKYCDtlSave && bInvestAddressSave && bFactcaSave && bUpdateApplStatus && bMemberDtlSave)
                        {
                            sqlTrans.Commit();
                            strResult = "SUCCESS";
                            return true;
                        }
                        else if (!bFrontOfficeSave || !bBankDtlSave || !bInvestDtlSave || !bOtherDtlSave || !bNomineeDtlSave || !bInvestKYCDtlSave || !bInvestAddressSave || !bFactcaSave || !bUpdateApplStatus || bMemberDtlSave)
                        {
                            sqlTrans.Rollback();
                            strResult = "FAILED";
                            return false;
                        }
                    }
                    catch (Exception ex)
                    {
                        strResult = "FAILED";
                        sqlTrans.Rollback();
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                strResult = "FAILED";
                throw ex;
            }
            return false;
        }

    }
}
