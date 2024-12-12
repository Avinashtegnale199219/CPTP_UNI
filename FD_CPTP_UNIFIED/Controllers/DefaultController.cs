using Extension;
using MF_FD_ESARATHI_APP.Models;
using MF_FD_ESARATHI_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WA_FD_CP_AUTHENTICATION_MODEL;

namespace FD_CPTP_UNIFIED.Controllers
{

    public class DefaultController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet, Route("Default/SaveMenuLog/{SubModeCode}")]
        public async Task SaveMenuLog(string SubModeCode)
        {
            try
            {
                if (HttpContext.Session.Keys.Contains("SubModeCode"))
                {
                    HttpContext.Session.Remove("SubModeCode");
                }

                var UserMenuItemdtl = HttpContext.Session.GetObject<IList<UserMenuItem>>("UserAppMenus");
                var objsession = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
                var _app = new UserApplicationDtls.UserApplicationDtls(HttpContext);

                if (UserMenuItemdtl != null && UserMenuItemdtl.Count > 0)
                {
                    var selectedmenu = UserMenuItemdtl.Where(x => x.SubModCode.Equals(SubModeCode)).SingleOrDefault();
                    if (selectedmenu != null)
                    {
                        HttpContext.Session.SetString("SubModeCode", SubModeCode);
                        HttpContext.Session.SetString("SubModeName", selectedmenu.SubModName);
                        objsession.FormCode = SubModeCode ?? objsession.FormCode;
                        HttpContext.Session.SetObject("UserSessionDetails", objsession);

                        var menulog = new UserMenuLogBO()
                        {
                            MainModCode = selectedmenu.MainModCode,
                            Agency_Clustered_ID = objsession.Agency_Clustered_ID,
                            Agency_Usr_Clustered_ID = objsession.Agency_Usr_Clustered_ID,
                            Agency_Cd = objsession.Agency_Cd,
                            Agency_Type = objsession.Agency_Type,
                            Agency_Sub_Type = objsession.Agency_Sub_Type,
                            Agency_Name = objsession.Agency_Name,
                            Agency_Usr_Name = objsession.Agency_Usr_Name,
                            Agency_Usr_EmailID = objsession.Agency_Usr_EmailID,
                            Agency_Usr_MobileNo = objsession.Agency_Usr_MobileNo,
                            Agency_Usr_Base_Loc_cd = objsession.Agency_Usr_Base_Loc_cd,
                            Agency_Usr_Base_Loc_Desc = objsession.Agency_Usr_Base_Loc_Desc,
                            Agency_Usr_Base_Role_cd = objsession.Agency_Usr_Base_Role_cd,
                            Agency_Usr_Base_Role_Desc = objsession.Agency_Usr_Base_Role_Desc,
                            BrowserType = _app.BrowserType,
                            BrowserVersion = _app.BrowserVersion,
                            BrowserMajorVersion = _app.BrowserMajor,
                            BrowserMinorVersion = string.Empty,
                            Client_Mac_Address = _app.MacAddress,
                            ClientIP_Address = _app.CreatedIP,
                            SubModCode = selectedmenu.SubModCode,
                            AppCode = selectedmenu.AppCode,
                            Server_IP = _app.ServerIp,
                            Server_Domain = _app.DomainName,
                            ServerInstanceName = _app.InstanceName,
                            UserAgent = _app.UserAgent,
                            Agency_SessionID = objsession.Pk_Session_ID,
                            Agency_Session_Ref_ID = objsession.Pk_Session_Ref_ID,
                            SysType = "A"
                        };

                        var service = new DefaultService(Startup.Configuration);

                        await service.SaveMenuLog(menulog);
                    }
                }
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
        }
    }



}