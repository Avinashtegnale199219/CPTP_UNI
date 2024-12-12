using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WA_FD_CP_AUTHENTICATION_MODEL;
using Microsoft.AspNetCore.Http.Features;
using FD_CPTP_UNIFIED.App_Code.BusinessObject;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Threading.Tasks;
using Extension;
using MF_FD_ESARATHI_APP.Services;
using MF_FD_ESARATHI_APP.Models;

namespace FD_CPTP_UNIFIED.Controllers
{
    public class HomeController : Controller
    {
        [AllowAnonymous]
        [Route("UI/Home.aspx")]
        public IActionResult Index(string UserId, string SysCode)
        {


            try
            {
                ClearSession();

                HttpContext.Session.SetString("UserId", UserId);
                HttpContext.Session.SetString("SysCode", SysCode);
                UserId = DecryptToken(UserId.Replace(' ', '+'));
                SysCode = DecryptToken(SysCode.Replace(' ', '+'));

                if (Startup.Configuration["Envoirnment"].ToString() == "Development")
                {
                    UserId = "31559";
                    SysCode = "MFEAPP00098";
                }

                if (string.IsNullOrEmpty(UserId) || string.IsNullOrEmpty(SysCode))
                {
                    return RedirectPermanent(Startup.Configuration["AppSettings:LogOut"].ToString());
                }
                else
                {
                    UserApplicationDtls.UserApplicationDtls _app = new UserApplicationDtls.UserApplicationDtls(HttpContext);
                    HomeService home = new HomeService(Startup.Configuration);
                    string Msg = string.Empty;

                    UserCredentials crd = new UserCredentials()
                    {
                        SysCode = SysCode,
                        UserId = UserId,
                        DomainName = _app.DomainName,
                        IPAddress = _app.IPAddress,
                        MacAddress = _app.MacAddress,
                        ServerIP = _app.ServerIp,
                        IsLogged = true,
                        IsMobile = _app.IsMobile,
                        UserAgent = _app.UserAgent,
                        BrowserMajor = _app.BrowserMajor,
                        BrowserMinor = string.Empty,
                        BrowserType = _app.BrowserType,
                        BrowserVersion = _app.BrowserVersion,
                        RequestURL = _app.RequestUrl,
                    };

                    SessionBO objsession = home.AuthenticateApp(crd, ref Msg);
                    objsession.CreatedByUName = objsession.CreatedByUName ?? objsession.Entity_Name;
                    objsession.CreatedIP = objsession.CreatedIP ?? GetIPAddress();
                    objsession.CreatedType = objsession.CreatedType ?? objsession.Entity_Type_Code;
                    objsession.AppCode = SysCode;
                    objsession.Source = "CPTP_UNI";

                    if (objsession != null && string.IsNullOrEmpty(Msg))
                    {
                        HttpContext.Session.SetObject("UserSessionDetails", objsession);


                        IList<UserMenuItem> menus = home.GetMenus(objsession.Entity_Id, SysCode);

                        if (menus != null)
                        {
                            string selectedmenu = Convert.ToString(menus.Where(x => x.SubModName.Equals("DataEntry")).FirstOrDefault());
                            objsession.FormCode = selectedmenu ?? "CPTP_UNI";
                            HttpContext.Session.SetObject("UserAppMenus", menus);
                        }

                        return RedirectToAction("Index", "Default");
                    }
                    else
                    {
                        throw new Exception("Something went wrong while processing your request !!");

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        [AllowAnonymous]
        void ClearSession()
        {
            try
            {
                HttpContext.Session.Clear();

                if (TempData.Keys.Count > 0)
                {
                    TempData.Clear();
                }
            }
            catch (Exception)
            {
            }
        }

        [AllowAnonymous]
        public IActionResult LogOut()
        {
            string LogOutUrl = Startup.Configuration["AppSettings:LogOut"].ToString();

            if (!string.IsNullOrEmpty(LogOutUrl))
            {
                ClearSession();
                return RedirectPermanent(LogOutUrl);
            }
            return View();
        }

        public IActionResult Home()
        {

            string UserId = HttpContext.Session.GetString("UserId");
            string SysCode = HttpContext.Session.GetString("SysCode");
            SessionBO dtl = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            if (!string.IsNullOrEmpty(UserId) && !string.IsNullOrEmpty(SysCode) && dtl != null)
            {
                string HomeUrl = Startup.Configuration["AppSettings:Home"].ToString() + "?UserId=" + UserId + "&SysCode=" + SysCode;
                //string HomeUrl = Startup.Configuration["AppSettings:Home"].ToString();
                HttpContext.Response.Headers.Add("UserSessionDetails", dtl.ToString());
                if (!string.IsNullOrEmpty(HomeUrl))
                {
                    ClearSession();
                    return Redirect(HomeUrl);
                }
            }
            return View();


            //string HomeUrl = Startup.Configuration["AppSettings:Home"].ToString();

            //if (!string.IsNullOrEmpty(HomeUrl))
            //{
            //    ClearSession();
            //    return RedirectPermanent(HomeUrl);
            //}
            //return View();
        }

        [AllowAnonymous]
        public static string DecryptToken(string cipherText)
        {
            try
            {

                MFCipherBO objCipher = new MFCipherBO
                {
                    Key = Startup.Configuration["AppSettings:API_Private_Key"].ToString(), //key;
                    IV = Startup.Configuration["AppSettings:API_Vector_Key"].ToString(),// IV;
                    Text = cipherText
                };


                HttpClient client = new HttpClient();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                string jsonInString = JsonConvert.SerializeObject(objCipher);
                HttpResponseMessage response = client.PostAsync(new Uri(Startup.Configuration["DeCipherUri"].ToString()), new StringContent(jsonInString, Encoding.UTF8, "application/json")).Result;
                string decryptedToken = string.Empty;
                Token token = new Token();
                if (response.IsSuccessStatusCode)
                {
                    decryptedToken = response.Content.ReadAsStringAsync().Result;
                    token = JsonConvert.DeserializeObject<Token>(decryptedToken);
                }
                else
                {
                    token.Result = null;
                }
                return token.Result;
            }
            catch (Exception EX)
            {
                Task.Run(() => ExceptionUtility.LogExceptionAsync(Startup.Configuration, EX));
                return null;
            }

        }

        [AllowAnonymous]
        public string GetIPAddress()
        {
            var remoteIpAddress = HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress;
            return remoteIpAddress.ToString();
        }

        [AllowAnonymous]
        public class Token
        {
            public string Result { get; set; }
        }
    }
}
