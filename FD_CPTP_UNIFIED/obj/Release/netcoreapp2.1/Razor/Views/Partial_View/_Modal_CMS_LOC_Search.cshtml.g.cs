#pragma checksum "E:\Working Drive\100004659\Nitish CPTP_UNI BOTC UNI\backup CPTP uni\CPTP_UNI Pan Veri\FD_CPTP_UNIFIED\Views\Partial_View\_Modal_CMS_LOC_Search.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "c103dab20fcbd090149bb73154334d9922c662b9c661248e232bc54800aa5e4d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__Modal_CMS_LOC_Search), @"mvc.1.0.view", @"/Views/Partial_View/_Modal_CMS_LOC_Search.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_Modal_CMS_LOC_Search.cshtml", typeof(AspNetCore.Views_Partial_View__Modal_CMS_LOC_Search))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "E:\Working Drive\100004659\Nitish CPTP_UNI BOTC UNI\backup CPTP uni\CPTP_UNI Pan Veri\FD_CPTP_UNIFIED\Views\_ViewImports.cshtml"
using FD_CPTP_UNIFIED;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"c103dab20fcbd090149bb73154334d9922c662b9c661248e232bc54800aa5e4d", @"/Views/Partial_View/_Modal_CMS_LOC_Search.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__Modal_CMS_LOC_Search : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
            BeginContext(0, 472, true);
            WriteLiteral(@"<div id=""ModelCMSBranchSearch"" class=""modal fade"" role=""dialog"" data-backdrop=""static"" data-keyboard=""false"">
    <div class=""modal-dialog moadl-md"">
        <!-- Modal content-->
        <div class=""modal-content CustmModalNew"">
            <div class=""modal-header"">
                <button id=""ModelCMSBranchClose"" type=""button"" class=""close"" data-dismiss=""modal"">&times;</button>
                <h4 class=""modal-title"">CMS Bank Search</h4>
            </div>
");
            EndContext();
            BeginContext(744, 70, true);
            WriteLiteral("            <div class=\"modal-body\">\r\n                <div class=\"row\"");
            EndContext();
            BeginWriteAttribute("style", " style=\"", 814, "\"", 822, 0);
            EndWriteAttribute();
            BeginContext(823, 383, true);
            WriteLiteral(@">
                    <div class=""col-md-4 col-sm-4 col-xs-12 InpOutrCls"">
                        <div class=""form-group FormGrpCustm"">
                            <label class=""control-label"">State</label>
                            <select class=""form-control"" id=""ddlState"" style=""/*font-family: Arial,Verdana,Tahoma;font-weight:normal;*/"">
                                ");
            EndContext();
            BeginContext(1206, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c103dab20fcbd090149bb73154334d9922c662b9c661248e232bc54800aa5e4d5015", async() => {
                BeginContext(1229, 6, true);
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
            BeginContext(1244, 663, true);
            WriteLiteral(@"
                            </select>
                        </div>
                    </div>
                    <br />
                    <table id=""tblCMSBranch"" class=""table table-default"">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>HDFC Bank CMS Branch</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                </div>
            </div>
        </div>


    </div>
</div>


");
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
