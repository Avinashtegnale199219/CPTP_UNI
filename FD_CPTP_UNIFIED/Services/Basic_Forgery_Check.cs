using System;
using System.Net.Http;
using ApiRequestor;
using FD_CPTP_UNIFIED;
using FD_UNIFIED_CPTP.Models;

namespace FD_UNIFIED_CPTP.Services
{
    public class Basic_Forgery_Check
    {
        public string Post(Signzy_Req_BO objReqBO)
        {
            try
            {
                string requestUri = Convert.ToString(Startup.Configuration["APIServices:Basic_Forgery_Check"]);

                var request = Newtonsoft.Json.JsonConvert.SerializeObject(objReqBO);
                using (HttpResponseMessage response = HttpRequestFactory.Post(requestUri, objReqBO).Result)
                {
                    if (response.IsSuccessStatusCode)
                    {
                        var res = response.ContentAsString(); 
                        return response.ContentAsString();
                    }
                 
                }

                return null;

            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

    }
}
