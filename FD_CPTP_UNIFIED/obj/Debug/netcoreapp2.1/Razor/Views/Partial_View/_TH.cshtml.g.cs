#pragma checksum "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_TH.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "0a14c382acd9477ce2a9d28e16cf24023be38349b774d670b2e7125b7205a1e8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__TH), @"mvc.1.0.view", @"/Views/Partial_View/_TH.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_TH.cshtml", typeof(AspNetCore.Views_Partial_View__TH))]
namespace AspNetCore
{
    #line default
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\_ViewImports.cshtml"
using FD_CPTP_UNIFIED

#line default
#line hidden
    ;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"0a14c382acd9477ce2a9d28e16cf24023be38349b774d670b2e7125b7205a1e8", @"/Views/Partial_View/_TH.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__TH : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 44, true);
            WriteLiteral("<input type=\"hidden\" id=\"hdnTHSourceTableId\"");
            EndContext();
            BeginWriteAttribute("value", " value=\"", 44, "\"", 52, 0);
            EndWriteAttribute();
            BeginContext(53, 420, true);
            WriteLiteral(@" />


<div class=""clearfix""></div>

<div id=""DV_TH_EDIT_AS_CKYC"" class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls"" style=""display:none"">
    <div class=""form-group FormGrpCustm form-check"">
        <div>
            <input type=""checkbox"" class=""form-check-input"" id=""chkTHEdit"">
            <label class=""form-check-label"" for=""exampleCheck1"">Edit as per CKYC</label>
        </div>
    </div>
</div>



");
            EndContext();
#line 17 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_TH.cshtml"
  await Html.RenderPartialAsync("~/Views/Partial_View/_HolderDetails.cshtml");

#line default
#line hidden

            BeginContext(554, 481, true);
            WriteLiteral(@"
<div class=""row"">
    <h4 class=""SecHeaderTxt"" style=""padding-left:20px;"">Address as per proof of address</h4>
</div>
<div id=""DV_TH_P_ADDR"" class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls"">
    <div class=""row form-group FormGrpCustm form-check"">
        <div>
            <input type=""checkbox"" class=""form-check-input"" id=""chkIsTHAddrSameAsFH"">
            <label class=""form-check-label"" for=""exampleCheck1"">Same as First Holder</label>
        </div>
    </div>

");
            EndContext();
#line 30 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_TH.cshtml"
      await Html.RenderPartialAsync("~/Views/Partial_View/_Address.cshtml");

#line default
#line hidden

            BeginContext(1114, 130, true);
            WriteLiteral("\r\n</div>\r\n<div class=\"row\">\r\n    <h4 class=\"SecHeaderTxt\" style=\"padding-left:20px;\">More Details</h4>\r\n</div>\r\n<div id=\"DV_TH_MD\"");
            EndContext();
            BeginWriteAttribute("class", " class=\"", 1244, "\"", 1252, 0);
            EndWriteAttribute();
            BeginContext(1253, 3, true);
            WriteLiteral(">\r\n");
            EndContext();
#line 37 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_TH.cshtml"
      await Html.RenderPartialAsync("~/Views/Partial_View/_MoreDetails.cshtml");

#line default
#line hidden

            BeginContext(1339, 692, true);
            WriteLiteral(@"</div>

<div class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls"">
    <div class=""form-group FormGrpCustm form-check"">
        <label class=""control-label"">Other Address as per proof of address</label>
        <div>
            <input type=""checkbox"" class=""form-check-input"" id=""chkIsTHAddrSameAsPermanent"">
            <label class=""form-check-label"" for=""exampleCheck1"">Mailing Address Same As Permanent Address</label>
        </div>
    </div>
</div>

<div id=""DV_TH_M_ADDR"" class=""col-md-12 col-sm-12 col-xs-12"">
    <div class=""row"">
        <h4 class=""SecHeaderTxt"" style=""padding-left:5px;"">Mailing Address as per proof of address</h4>
    </div>
    <div class=""row"">
");
            EndContext();
#line 55 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_TH.cshtml"
          await Html.RenderPartialAsync("~/Views/Partial_View/_Address.cshtml");

#line default
#line hidden

            BeginContext(2114, 1487, true);
            WriteLiteral(@"    </div>
</div>


<div class=""col-md-6 col-sm-8 col-xs-12 InpOutrCls"" id=""TH_PEP"">
    <ul class=""list-group mainListBox"">
        <li class=""list-group-item"">
            <span class=""span_Questn"">Are you a politically exposed person (PEP)?</span>
            <div class=""Dv_AnsToggle"">
                <label class=""lblOutr"">
                    <input type=""radio"" value=""N"" name=""rdoTHPEP"" />NO
                </label>
                <label class=""lblOutr"">
                    <input type=""radio"" value=""NA"" name=""rdoTHPEP"" disabled />/
                </label>
                <label class=""lblOutr"">
                    <input type=""radio"" value=""Y"" name=""rdoTHPEP"" />YES
                </label>
            </div>
        </li>
        <li class=""list-group-item"">
            <span class=""span_Questn"">Are you related to a PEP?</span>
            <div class=""Dv_AnsToggle"">
                <label class=""lblOutr"">
                    <input type=""radio"" value=""N"" name=""rdoTHPEPRelated""");
            WriteLiteral(@" />NO
                </label>
                <label class=""lblOutr"">
                    <input type=""radio"" value=""NA"" name=""rdoTHPEPRelated"" disabled />/
                </label>
                <label class=""lblOutr"">
                    <input type=""radio"" value=""Y"" name=""rdoTHPEPRelated"" />YES
                </label>
            </div>
        </li>
    </ul>
</div>


<!--Fatca Detail div-->
<div id=""DV_TH_FATCA"" style=""display:none"">
");
            EndContext();
#line 96 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_TH.cshtml"
      await Html.RenderPartialAsync("~/Views/Partial_View/_FATCA.cshtml");

#line default
#line hidden

            BeginContext(3678, 6, true);
            WriteLiteral("</div>");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591