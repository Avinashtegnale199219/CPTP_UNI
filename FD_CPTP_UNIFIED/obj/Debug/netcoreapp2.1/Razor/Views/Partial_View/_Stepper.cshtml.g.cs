#pragma checksum "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_Stepper.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "38b4fc46a7f15356e0554777a812186864440f399b88fe6a2a824d0ad0592554"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__Stepper), @"mvc.1.0.view", @"/Views/Partial_View/_Stepper.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_Stepper.cshtml", typeof(AspNetCore.Views_Partial_View__Stepper))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"38b4fc46a7f15356e0554777a812186864440f399b88fe6a2a824d0ad0592554", @"/Views/Partial_View/_Stepper.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__Stepper : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2350, true);
            WriteLiteral(@"<div class=""StepOutrDiv"">
    <a class=""BtnTabSwitHome"" href=""Default"" id=""btnBackToConsole"">
        <i class=""fa fa-home"" aria-hidden=""true""></i>
    </a>
    <ul class=""nav nav-tabs NavTabsHead"" id=""allTabs"">

        <li class=""tab-switcher nav-item active"">
            <button type=""button"" class=""BtnTabSwit"" data-tab-index=""1"" id=""IdBtnTabSwit01"">1</button>
            <span class=""SpanCls01"">Investor Information</span>
        </li>
        <li class=""tab-switcher nav-item NoActive"">
            <button type=""button"" class=""BtnTabSwit"" data-tab-index=""2"" id=""IdBtnTabSwit02"">2</button>
            <span class=""SpanCls01"">Basic Configuration</span>
        </li>
        <li class=""tab-switcher nav-item NoActive"">
            <button type=""button"" class=""BtnTabSwit"" data-tab-index=""3"" id=""IdBtnTabSwit03"">3</button>
            <span class=""SpanCls01"">FD Configuration</span>
        </li>
        <li class=""tab-switcher nav-item NoActive"">
            <button type=""button"" class=""BtnTabS");
            WriteLiteral(@"wit"" data-tab-index=""4"" id=""IdBtnTabSwit04"">4</button>
            <span class=""SpanCls01"">Repayment Bank Details</span>
        </li>
        <li class=""tab-switcher nav-item NoActive"">
            <button type=""button"" class=""BtnTabSwit"" data-tab-index=""5"" id=""IdBtnTabSwit05"">5</button>
            <span class=""SpanCls01"">Holder Information</span>
        </li>
        <li class=""tab-switcher nav-item NoActive"">
            <button type=""button"" class=""BtnTabSwit DisabledControl"" data-tab-index=""6"" id=""IdBtnTabSwit06"" disabled>6</button>
            <span class=""SpanCls01"">Nominee Information</span>
        </li>
        <li class=""tab-switcher nav-item NoActive"">
            <button type=""button"" class=""BtnTabSwit"" data-tab-index=""7"" id=""IdBtnTabSwit07"">7</button>
            <span class=""SpanCls01"">Upload Documents</span>
        </li>
        <li class=""tab-switcher nav-item NoActive"">
            <button type=""button"" class=""BtnTabSwit"" data-tab-index=""8"" id=""IdBtnTabSwit08"">8</button>
");
            WriteLiteral(@"            <span class=""SpanCls01"">Summary View</span>
        </li>
    </ul>
    <button type=""button"" id=""BtnStepsToggle"" class=""BtnStepsCls""></button>
    <ul class=""list-group list-group1"" id=""IdStepsMob"">

        <li class=""list-group-item"">
            <a href=""#"" class=""BtnTabSwitMob""");
            EndContext();
            BeginWriteAttribute("id", " id=\"", 2350, "\"", 2355, 0);
            EndWriteAttribute();
            BeginContext(2356, 1560, true);
            WriteLiteral(@">
                <i class=""fa fa-home"" aria-hidden=""true""></i> Home
            </a>
        </li>
        <li class=""list-group-item active"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""1"" id=""IdBtnTabSwit01"">1 Investor Information</button>
        </li>
        <li class=""list-group-item"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""2"" id=""IdBtnTabSwit02"">2 Basic Configuration</button>
        </li>
        <li class=""list-group-item"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""3"" id=""IdBtnTabSwit03"">3 FD Configuration</button>
        </li>
        <li class=""list-group-item"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""4"" id=""IdBtnTabSwit04"">4 Repayment Bank Details</button>
        </li>
        <li class=""list-group-item"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""5"" id=""IdBtnTabSwit05"">5 Holder Information</button>
        </li>
        <li c");
            WriteLiteral(@"lass=""list-group-item"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""6"" id=""IdBtnTabSwit06"">6 Nominee Information</button>
        </li>
        <li class=""list-group-item"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""7"" id=""IdBtnTabSwit07"">7 Upload Documents</button>
        </li>
        <li class=""list-group-item"">
            <button type=""button"" class=""BtnTabSwitMob"" data-tab-index=""8"" id=""IdBtnTabSwit08"">8 Summary View</button>
        </li>
    </ul>
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
