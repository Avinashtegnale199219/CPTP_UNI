#pragma checksum "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_Tab8.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "d1e60504f84f731c11ea6bb566e3e8d97eeb5af1a969639493e58fa252faf5b2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__Tab8), @"mvc.1.0.view", @"/Views/Partial_View/_Tab8.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_Tab8.cshtml", typeof(AspNetCore.Views_Partial_View__Tab8))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"d1e60504f84f731c11ea6bb566e3e8d97eeb5af1a969639493e58fa252faf5b2", @"/Views/Partial_View/_Tab8.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__Tab8 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 304, true);
            WriteLiteral(@"<div class=""tab-container tab-pane"" data-tab-index=""8"" style=""display:none;"">
    <div class=""panel-heading panel-headingNW"">
        <i class=""fa fa-file-text-o head-icon"" aria-hidden=""true""></i> Summary View
    </div>
    <div class=""col-md-12 col-sm-12 col-xs-12"">
        <div class=""row1"">

");
            EndContext();
#line 8 "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_Tab8.cshtml"
              await Html.RenderPartialAsync("~/Views/Partial_View/_SummaryView.cshtml");

#line default
#line hidden

            BeginContext(395, 338, true);
            WriteLiteral(@"            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls text-center"">
");
            EndContext();
            BeginContext(850, 382, true);
            WriteLiteral(@"                <button type=""button"" id=""btnBack08"" class=""comnBtnSecondary"">Back</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type=""button"" id=""btnsubmit08"" class=""comnBtn2"">Save &amp; Continue</button>
                <button type=""button"" id=""btnClose08"" class=""comnBtn2"" style=""display:none;"">Close</button>
            </div>
        </div>
    </div>
</div>");
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