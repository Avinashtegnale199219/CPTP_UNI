#pragma checksum "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_FH.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "b976548b2cba9a57293afedf21a3b1dbdafa53fd5c7d40ffe462fe149c1b9545"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__FH), @"mvc.1.0.view", @"/Views/Partial_View/_FH.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_FH.cshtml", typeof(AspNetCore.Views_Partial_View__FH))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"b976548b2cba9a57293afedf21a3b1dbdafa53fd5c7d40ffe462fe149c1b9545", @"/Views/Partial_View/_FH.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__FH : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "select", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 375, true);
            WriteLiteral(@"<div id=""DV_FH_EDIT_AS_CKYC"" class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls"" style=""display:none"">
    <div class=""form-group FormGrpCustm form-check"">
        <div>
            <input type=""checkbox"" class=""form-check-input"" id=""chkFHEdit"">
            <label class=""form-check-label"" for=""exampleCheck1"">Edit as per CKYC</label>
        </div>
    </div>
</div>

");
            EndContext();
#line 10 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_FH.cshtml"
  await Html.RenderPartialAsync("~/Views/Partial_View/_HolderDetails.cshtml");

#line default
#line hidden

            BeginContext(456, 201, true);
            WriteLiteral("\r\n<div class=\"row\">\r\n    <h4 class=\"SecHeaderTxt\" style=\"padding-left:20px;\">Address as per proof of address</h4>\r\n</div>\r\n<div id=\"DV_FH_P_ADDR\" class=\"col-md-12 col-sm-12 col-xs-12 InpOutrCls\">\r\n\r\n\r\n");
            EndContext();
#line 18 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_FH.cshtml"
      await Html.RenderPartialAsync("~/Views/Partial_View/_Address.cshtml");

#line default
#line hidden

            BeginContext(736, 149, true);
            WriteLiteral("\r\n</div>\r\n<div class=\"row IND\">\r\n    <h4 class=\"SecHeaderTxt\" style=\"padding-left:20px;\">More Details</h4>\r\n</div>\r\n<div id=\"DV_FH_MD\" class=\"IND\">\r\n");
            EndContext();
#line 25 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_FH.cshtml"
      await Html.RenderPartialAsync("~/Views/Partial_View/_MoreDetails.cshtml");

#line default
#line hidden

            BeginContext(968, 899, true);
            WriteLiteral(@"</div>
<div class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls"">
    <div class=""form-group FormGrpCustm form-check"">
        <label class=""control-label"">Other Address as per proof of address</label>
        <div>
            <input type=""checkbox"" class=""form-check-input"" id=""chkIsFHAddrSameAsPermanent"">
            <label class=""form-check-label"" for=""exampleCheck1"">Mailing Address Same As Permanent Address</label>
        </div>
        <div>
            <input type=""checkbox"" class=""form-check-input"" id=""chkIdOverSeasAddress"">
            <label class=""form-check-label"" for=""exampleCheck1"">Overseas Address</label>
        </div>
    </div>
</div>

<div id=""DV_FH_M_ADDR"" class=""col-md-12 col-sm-12 col-xs-12"">
    <div class=""row"">
        <h4 class=""SecHeaderTxt"" style=""padding-left:5px;"">Mailing Address as per proof of address</h4>
    </div>
    <div class=""row"">
");
            EndContext();
#line 46 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_FH.cshtml"
          await Html.RenderPartialAsync("~/Views/Partial_View/_Address.cshtml");

#line default
#line hidden

            BeginContext(1950, 1627, true);
            WriteLiteral(@"    </div>
</div>
<div id=""DV_FH_O_ADDR"" class=""col-md-12 col-sm-12 col-xs-12"" style=""display:none;"">
    <div class=""row"">
        <h4 class=""SecHeaderTxt"" style=""padding-left:5px;"">Overseas Address as per proof of address</h4>
    </div>
    <div class=""row"">
        <div class=""col-md-4 col-sm-4 col-xs-12 InpOutrCls"">
            <div class=""form-group FormGrpCustm"">
                <label class=""control-label"">Address Line 1<span class=""red-text"">*</span></label>
                <input type=""text"" id=""txtOAdd1"" class=""form-control O_ADDR RemoveSpace NoSpecialChar"">
            </div>
        </div>
        <div class=""col-md-4 col-sm-4 col-xs-12 InpOutrCls"">
            <div class=""form-group FormGrpCustm"">
                <label class=""control-label"">Address Line 2<span class=""red-text"">*</span></label>
                <input type=""text"" id=""txtOAdd2"" class=""form-control O_ADDR RemoveSpace NoSpecialChar"">
            </div>
        </div>
        <div class=""col-md-4 col-sm-4 col-xs-12");
            WriteLiteral(@" InpOutrCls"">
            <div class=""form-group FormGrpCustm"">
                <label class=""control-label"">Address Line 2<span class=""red-text"">*</span></label>
                <input type=""text"" id=""txtOAdd3"" class=""form-control O_ADDR RemoveSpace NoSpecialChar"">
            </div>
        </div>
        <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
            <div class=""form-group FormGrpCustm"">
                <label class=""control-label"">Country<span class=""red-text"">*</span></label>
                <select id=""ddlOCountry"" class=""form-control O_ADDR"">
                   ");
            EndContext();
            BeginContext(3577, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b976548b2cba9a57293afedf21a3b1dbdafa53fd5c7d40ffe462fe149c1b95458165", async() => {
                BeginContext(3600, 6, true);
                WriteLiteral("Select");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(3615, 2465, true);
            WriteLiteral(@"
                </select>
            </div>
        </div>
        <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
            <div class=""form-group FormGrpCustm"">
                <label class=""control-label"">State</label>
                <input type=""text"" id=""txtOState"" class=""form-control O_ADDR"">
            </div>
        </div>
        <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
            <div class=""form-group FormGrpCustm"">
                <label class=""control-label"">City</label>
                <input type=""text"" id=""txtOCity"" class=""form-control O_ADDR RemoveSpace NoSpecialChar"">
            </div>
        </div>
        <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
            <div class=""form-group FormGrpCustm"">
                <label class=""control-label"">Postal Code</label>
                <input type=""text"" id=""txtOPin"" class=""form-control O_ADDR number_only"">
            </div>
        </div>
    </div>
</div>

<div class=""col-md-6 col-sm-8 ");
            WriteLiteral(@"col-xs-12 InpOutrCls"" id=""FH_PEP"">
    <ul class=""list-group mainListBox"">
        <li class=""list-group-item"">
            <span class=""span_Questn"">Are you a politically exposed person (PEP)?</span>
            <div class=""Dv_AnsToggle"">
                <label class=""lblOutr"">
                    <input type=""radio"" value=""N"" name=""rdoInvPEP"" />NO
                </label>
                <label class=""lblOutr"">
                    <input type=""radio"" value=""NA"" name=""rdoInvPEP"" disabled />/
                </label>
                <label class=""lblOutr"">
                    <input type=""radio"" value=""Y"" name=""rdoInvPEP"" />YES
                </label>
            </div>
        </li>
        <li class=""list-group-item"">
            <span class=""span_Questn"">Are you related to a PEP?</span>
            <div class=""Dv_AnsToggle"">
                <label class=""lblOutr"">
                    <input type=""radio"" value=""N"" name=""rdoInvPEPRelated"" />NO
                </label>
                <");
            WriteLiteral(@"label class=""lblOutr"">
                    <input type=""radio"" value=""NA"" name=""rdoInvPEPRelated"" disabled />/
                </label>
                <label class=""lblOutr"">
                    <input type=""radio"" value=""Y"" name=""rdoInvPEPRelated"" />YES
                </label>
            </div>
        </li>
    </ul>
</div>



<!--Fatca Detail div-->
<div id=""DV_FH_FATCA"" style=""display:none"">
");
            EndContext();
#line 138 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_FH.cshtml"
      await Html.RenderPartialAsync("~/Views/Partial_View/_FATCA.cshtml");

#line default
#line hidden

            BeginContext(6157, 6, true);
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