using System.Data;
using System.Threading.Tasks;
using FD_CPTP_UNIFIED;
using FD_CPTP_UNIFIED.DAL;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_BackOffice.Controllers
{
  
    public class FATCAController : Controller
    {

        [HttpGet]
        public async Task<IActionResult> Get_ddl_FATCA_NationalityAsync()
        {
            string res = string.Empty;
            FATCA_DAL objDal = new FATCA_DAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_NationalityAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get_ddl_FATCA_CountryAsync()
        {
            string res = string.Empty;
            FATCA_DAL objDal = new FATCA_DAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_CountryAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }


        [HttpGet]
        public async Task<IActionResult> Get_ddl_FATCA_StateAsync(string countryCode)
        {
            string res = string.Empty;
            FATCA_DAL objDal = new FATCA_DAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_FATCA_StateAsync(countryCode))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Get_ddl_FATCA_OccupationAsync()
        {
            string res = string.Empty;
            FATCA_DAL objDal = new FATCA_DAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_OccupationAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Get_ddl_FATCA_CountryOfTaxAsync()
        {
            string res = string.Empty;
            FATCA_DAL objDal = new FATCA_DAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_CountryOfTaxAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Get_ddl_FATCA_TaxIdentificationTypeAsync()
        {
            string res = string.Empty;
            FATCA_DAL objDal = new FATCA_DAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_TaxIdentificationTypeAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Get_ddl_FATCA_AddressTypeAsync()
        {
            string res = string.Empty;
            FATCA_DAL objDal = new FATCA_DAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_AddressTypeAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }
    }
}