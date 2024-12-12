﻿using DBHelper;
using FD_CPTP_UNIFIED.BO;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Data.SqlClient;

namespace FD_CPTP_UNIFIED.DAL
{
    public class GenerateShortURLDAL
    {

        readonly string Conn = string.Empty;
        readonly string ConnPGW = string.Empty;
        public GenerateShortURLDAL(IConfiguration configuration)
        {
            Conn = configuration["ConnectionString:CONN_FDBT"];
            ConnPGW = configuration["ConnectionString:CONN_FDPGW"];
        }
        public DataTable GetApplicationForShortURL(SessionBO session)
        {
            DataSet res = new DataSet();
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[2];
                sqlparam[0] = new SqlParameter("@Source", session.Source);
                sqlparam[1] = new SqlParameter("@AgencyCode", session.Agency_Cd);
                return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_GET_APPL_LIST_FOR_SHORTURL_V2", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
        }

        public DataTable GetInvestmentDeclarationStatus(SessionBO session)
        {
            DataSet res = new DataSet();
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[3];
                sqlparam[0] = new SqlParameter("@Source", session.Source);
                sqlparam[1] = new SqlParameter("@AgencyCode", session.Agency_Cd);
                sqlparam[2] = new SqlParameter("@CreatedBy", session.CreatedBy);
                return SqlHelper.ExecuteDataTable(Conn, CommandType.StoredProcedure, "USP_FD_BT_UNI_GET_APPL_LIST_INV_DEC_STATUS", sqlparam);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
        }

        public DataTable Get_CP_ShortURL_Login_Dtl(string CP_Code)
        {
            DataTable res = new DataTable();
            try
            {
                SqlParameter[] sqlparam = new SqlParameter[1];
                sqlparam[0] = new SqlParameter("@CP_Code", CP_Code);
               
                res = SqlHelper.ExecuteDataTable(ConnPGW, CommandType.StoredProcedure, "usp_FD_PGW_Get_CP_ShortURL_Login_Dtl", sqlparam);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
        }

        //public bool InsertShortURL_Log(string Appl_No,SessionBO session)
        //{
        //    int res = 0;
        //    try
        //    {
        //        SqlParameter[] sqlparam = new SqlParameter[1];
        //        sqlparam[0] = new SqlParameter("@AgencyCode", Appl_No);

        //        res = SqlHelper.ExecuteNonQuery(Conn, CommandType.StoredProcedure, "", sqlparam);
        //        if (res != 0)
        //        {
        //            return true;
        //        }
        //        return false;
        //    }
        //    catch (Exception ex)
        //    {
        //        ExceptionUtility.LogExceptionAsync(ex);
        //        return false;
        //    }
        //    finally
        //    {

        //    }
        //}
    }
}