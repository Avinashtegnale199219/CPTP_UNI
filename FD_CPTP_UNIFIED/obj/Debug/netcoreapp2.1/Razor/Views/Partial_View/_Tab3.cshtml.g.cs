#pragma checksum "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_Tab3.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee4845"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__Tab3), @"mvc.1.0.view", @"/Views/Partial_View/_Tab3.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_Tab3.cshtml", typeof(AspNetCore.Views_Partial_View__Tab3))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee4845", @"/Views/Partial_View/_Tab3.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__Tab3 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "select", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "YES", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "NO", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "P", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "F", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            BeginContext(0, 349, true);
            WriteLiteral(@"<div id=""DV_STEP3"" class=""tab-container tab-pane"" data-tab-index=""3"" style=""display:none;"">
    <div class=""panel-heading panel-headingNW"">
        <i class=""fa fa-cog head-icon"" aria-hidden=""true""></i> FD Configuration
    </div>
    <div class=""col-md-12 col-sm-12 col-xs-12 PanelBGImg PanelBGImg3"">
        <div class=""row1 row1WidAdjCls"">
");
            EndContext();
            BeginContext(773, 378, true);
            WriteLiteral(@"            <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Deposit Category<span class=""red-text"">*</span></label>
                    <select id=""ddlCategory"" class=""form-control FD_DTLS"" errmsg=""Deposite Category is required..!"" required>
                        ");
            EndContext();
            BeginContext(1151, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee48455544", async() => {
                BeginContext(1174, 6, true);
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
            BeginContext(1189, 916, true);
            WriteLiteral(@"

                    </select>
                </div>
            </div>
            <div id=""DV_EMP_CODE"" class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"" style=""display:none"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Employee Code<span class=""red-text"">*</span></label>
                    <input type=""text"" id=""txtEmpCode"" maxlength=""50"" class=""form-control  NoSpecialChar FD_DTLS"" errmsg=""Employee Code is required..!"" autocomplete=""off"" />
                </div>
            </div>
            <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Scheme<span class=""red-text"">*</span></label>
                    <select id=""ddlSchemes"" class=""form-control FD_DTLS"" errmsg=""Scheme is required..!"" required>
                        ");
            EndContext();
            BeginContext(2105, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee48457897", async() => {
                BeginContext(2128, 6, true);
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
            BeginContext(2143, 467, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Interest Frequency<span class=""red-text"">*</span></label>
                    <select id=""ddlInterestFrequency"" class=""form-control FD_DTLS"" errmsg=""Interest Frequency is required..!"" required>
                        ");
            EndContext();
            BeginContext(2610, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee48459777", async() => {
                BeginContext(2633, 6, true);
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
            BeginContext(2648, 434, true);
            WriteLiteral(@"

                    </select>
                </div>
            </div>
            <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Tenure<span class=""red-text"">*</span></label>
                    <select id=""ddlTenure"" class=""form-control FD_DTLS"" errmsg=""Tenure is required..!"" required>
                        ");
            EndContext();
            BeginContext(3082, 45, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484511624", async() => {
                BeginContext(3105, 13, true);
                WriteLiteral("Select Tenure");
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
            BeginContext(3127, 467, true);
            WriteLiteral(@"

                    </select>
                </div>
            </div>
            <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Deposit Payable To<span class=""red-text"">*</span></label>
                    <select id=""ddlDepositPayable"" class=""form-control FD_DTLS"" errmsg=""Deposite Payable To is required..!"" required>
                        ");
            EndContext();
            BeginContext(3594, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484513513", async() => {
                BeginContext(3617, 6, true);
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
            BeginContext(3632, 467, true);
            WriteLiteral(@"

                    </select>
                </div>
            </div>

            <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Fdr Dispatch Mode<span class=""red-text"">*</span></label>
                    <select id=""ddlFdrDispatchMode"" class=""form-control FD_DTLS"" errmsg=""FDR Dispatch Mode is required..!"" required>
                        ");
            EndContext();
            BeginContext(4099, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484515394", async() => {
                BeginContext(4122, 6, true);
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
            BeginContext(4137, 463, true);
            WriteLiteral(@"

                    </select>
                </div>
            </div>

            <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Auto Renewal Flag<span class=""red-text"">*</span></label>
                    <select id=""ddlAutoRenewal"" class=""form-control FD_DTLS"" errmsg=""Auto Renewal Flag is required..!"" required>
                        ");
            EndContext();
            BeginContext(4600, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484517271", async() => {
                BeginContext(4623, 6, true);
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
            BeginContext(4638, 26, true);
            WriteLiteral("\r\n                        ");
            EndContext();
            BeginContext(4664, 32, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484518697", async() => {
                BeginContext(4684, 3, true);
                WriteLiteral("YES");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(4696, 26, true);
            WriteLiteral("\r\n                        ");
            EndContext();
            BeginContext(4722, 30, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484520120", async() => {
                BeginContext(4741, 2, true);
                WriteLiteral("NO");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(4752, 478, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div id=""DV_RENEWAL_FOR"" class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"" style=""display:none"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Renewal For<span class=""red-text"">*</span></label>
                    <select id=""ddlRenewalFor"" class=""form-control FD_DTLS"" errmsg=""Renewal For is required..!"">
                        ");
            EndContext();
            BeginContext(5230, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484522012", async() => {
                BeginContext(5253, 6, true);
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
            BeginContext(5268, 26, true);
            WriteLiteral("\r\n                        ");
            EndContext();
            BeginContext(5294, 43, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484523438", async() => {
                BeginContext(5312, 16, true);
                WriteLiteral("Principal Amount");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_3.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(5337, 26, true);
            WriteLiteral("\r\n                        ");
            EndContext();
            BeginContext(5363, 57, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484524875", async() => {
                BeginContext(5381, 30, true);
                WriteLiteral("Principal With Interest Amount");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(5420, 921, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div id=""DV_TDS_FLAG"" class=""col-md-3 col-sm-6 col-xs-12 InpOutrCls "">
                <div class=""form-group FormGrpCustm form-check"">
                    <label class=""control-label MobLblHide"">&nbsp;</label>
                    <input type=""checkbox"" class=""form-check-input"" id=""chkTDFFlag"">
                    <label class=""form-check-label"" for=""exampleCheck1"">Do Not Deduct Tax at Source</label>
                </div>
            </div>
            <div id=""DV_HNG"" class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"" style=""display:none"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">H/G<span class=""red-text"">*</span></label>
                    <select id=""ddlHNG"" class=""form-control FD_DTLS"" errmsg=""HNG is required..!"" disabled>
                        ");
            EndContext();
            BeginContext(6341, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f2985197cbba81f205998be429ed70b8a13cbcd7db6a5629eac57c4183ee484527257", async() => {
                BeginContext(6364, 6, true);
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
            BeginContext(6379, 683, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls text-center"">
                <button type=""button"" id=""btnCancel03"" class=""comnBtnSecondary"">Clear</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type=""button"" id=""btnBack03"" class=""comnBtnSecondary"">Back</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type=""button"" id=""btnsubmit03"" class=""comnBtn2"">Save &amp; Continue</button>
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
