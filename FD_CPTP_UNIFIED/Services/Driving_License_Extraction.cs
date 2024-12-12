using System;
using ApiRequestor;
using FD_CPTP_UNIFIED;
using FD_UNIFIED_CPTP.Models;

namespace FD_UNIFIED_CPTP.Services
{
    public class Driving_License_Extraction
    {
        public string Post(Signzy_Req_BO objReqBO)
        {
            try
            {
                string requestUri = Convert.ToString(Startup.Configuration["APIServices:Driving_License_Extraction"]);
                var request = Newtonsoft.Json.JsonConvert.SerializeObject(objReqBO);
                using (var response = HttpRequestFactory.Post(requestUri, objReqBO).Result)
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
