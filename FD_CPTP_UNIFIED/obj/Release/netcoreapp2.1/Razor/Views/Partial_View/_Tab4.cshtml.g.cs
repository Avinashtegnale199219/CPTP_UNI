#pragma checksum "E:\Working Drive\100004659\Nitish CPTP_UNI BOTC UNI\backup CPTP uni\CPTP_UNI Pan Veri\FD_CPTP_UNIFIED\Views\Partial_View\_Tab4.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "385903fb9d668c3879a44390ef15c1983a1bb8fc47159cf76f4a48d2e7793754"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__Tab4), @"mvc.1.0.view", @"/Views/Partial_View/_Tab4.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_Tab4.cshtml", typeof(AspNetCore.Views_Partial_View__Tab4))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"385903fb9d668c3879a44390ef15c1983a1bb8fc47159cf76f4a48d2e7793754", @"/Views/Partial_View/_Tab4.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__Tab4 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
            BeginContext(0, 700, true);
            WriteLiteral(@"<div id=""DV_STEP4"" class=""tab-container tab-pane"" data-tab-index=""4"" style=""display:none;"">
    <div class=""panel-heading panel-headingNW"">
        <i class=""fa fa-university head-icon"" aria-hidden=""true""></i> Repayment Bank Details
    </div>
    <div class=""col-md-12 col-sm-12 col-xs-12 PanelBGImg PanelBGImg4"">
        <div id=""DV_PROV_BANK"" class=""row1 row1WidAdjCls"">
            <div class=""col-md-6 col-sm-12 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Provisional Bank<span class=""red-text"">*</span></label>
                    <select id=""ddlProvBank"" class=""form-control"">
                        ");
            EndContext();
            BeginContext(700, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "385903fb9d668c3879a44390ef15c1983a1bb8fc47159cf76f4a48d2e77937544354", async() => {
                BeginContext(723, 6, true);
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
            BeginContext(738, 6601, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div class=""col-md-1 col-sm-12 col-xs-12 InpOutrCls"">
                <span class=""OrClass"">OR</span>
            </div>
            <div class=""col-md-2 col-sm-12 col-xs-12 InpOutrCls InpOutrClsTextAlng"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"" style=""visibility:hidden;""><span class=""red-text"">*</span></label>
                    <button type=""button"" id=""btnAddNewBank"" class=""comnBtn2"" style=""margin:0;"">Add New Bank</button>
                </div>
            </div>
        </div>
        <div id=""DV_BANK_DTLS"" style=""display:none"">
            <div class=""row1 row1WidAdjCls"" id=""DV_Srch_Bank"">
                <div class=""col-md-6 col-sm-12 col-xs-12 InpOutrCls"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">Search Bank<span class=""red-text"">*</span></label>
                     ");
            WriteLiteral(@"   <input type=""text"" id=""txtSearchBank"" class=""form-control"" autocomplete=""off"">
                    </div>
                </div>
            </div>
            <div class=""row1 row1WidAdjCls"">
                <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">Bank Name<span class=""red-text"">*</span></label>
                        <input type=""text"" id=""txtBankName"" class=""form-control DisabledControl BANK_DTLS"" errmsg=""Bank Name is required..!"" autocomplete=""off"" disabled required>
                    </div>
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">Bank Branch<span class=""red-text"">*</span></label>
                        <input type=""text"" id=""txtBranchName"" class=""form-control DisabledControl BANK_DTLS"" errmsg=""Bank Bra");
            WriteLiteral(@"nch is required..!"" autocomplete=""off"" disabled required>
                    </div>
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">MICR Code<span class=""red-text"">*</span></label>
                        <input type=""text"" id=""txtMICRCode"" class=""form-control DisabledControl BANK_DTLS"" errmsg=""MICR Code is required..!"" autocomplete=""off"" disabled required>
                    </div>
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">NEFT<span class=""red-text"">*</span></label>
                        <input type=""text"" id=""txtNEFTCode"" class=""form-control DisabledControl BANK_DTLS"" errmsg=""NEFT is required..!"" autocomplete=""off"" disabled required>
                    </div>
                </d");
            WriteLiteral(@"iv>
                <div class=""clearfix""></div>
                <div class=""col-md-3 col-sm-6 col-xs-12 InpOutrCls"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">Bank A/C No<span class=""red-text"">*</span></label>
                        <input type=""password"" id=""txtBankAccountNo"" style=""font-weight:bold;font-size:16px;"" errmsg=""Bank Account No is required..!"" class=""form-control number_only BANK_DTLS"" autocomplete=""off"" maxlength=""20"" required>
                        <span class=""errorbox"" style=""position: absolute; top: 3px; left: 166px;display:none""></span>
                    </div>
                </div>
                <div class=""col-md-3 col-sm-6 col-xs-12 InpOutrCls clsConfirmBankAccountNo"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">Re-enter Bank A/C No<span class=""red-text"">*</span></label>
                        <input type=""text"" id=""txtConfirmBankAc");
            WriteLiteral(@"countNo"" style=""font-weight:bold;font-size:16px;"" errmsg=""Re-enter Bank account no..!"" class=""form-control number_only BANK_DTLS"" autocomplete=""off"" maxlength=""20"" required>
                        <span class=""errorbox"" style=""position: absolute; top: 3px; left: 166px;display:none""></span>
                    </div>
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls ClsUploadChqCopy"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">Upload Cancel Cheque Copy<span id=""spnApplFormUpload"" class=""red-text"">*</span></label>
                        <input type=""file"" id=""flvCancelledChequeCopy"" class=""form-control"">
                    </div>
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 InpOutrCls ClsUploadChqCopy"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"" style=""visibility:hidden;""><span class=""red-t");
            WriteLiteral(@"ext"">*</span></label>
                        <button type=""button"" id=""btnUploadCancelledChequeCopy"" class=""comnBtn2"" style=""margin:0 0 15px 0;"">Upload</button>
                    </div>
                </div>
            </div>
            <div class=""row1 row1WidAdjCls"" id=""DV_OR_ADD_NEW"" style=""display:none"">
                <div class=""col-md-12 col-sm-12 col-xs-12"">
                    <span class=""OrClass"">OR</span>
                </div>
                <div class=""col-md-12 col-sm-12 col-xs-12 text-center"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"" style=""visibility:hidden;""><span class=""red-text"">*</span></label>
                        <button type=""button"" id=""btnOrAddNewBank"" class=""comnBtn2"" style=""margin:0 0 15px 0;"">Add New Bank</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""height5px""></div>
    <div class=""height5px""></div>
    <di");
            WriteLiteral(@"v class=""height5px""></div>
    <div class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls text-center row2 row1WidAdjCls2"">
        <button type=""button"" id=""btnCancel04"" class=""comnBtnSecondary"">Clear</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type=""button"" id=""btnBack04"" class=""comnBtnSecondary"">Back</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button type=""button"" id=""btnsubmit04"" class=""comnBtn2"">Save &amp; Continue</button>
    </div>
</div>

");
            EndContext();
            BeginContext(7374, 142, true);
            WriteLiteral("<div id=\"Model_TPV_Msg\" class=\"modal fade\" role=\"dialog\" data-backdrop=\"static\" data-keyboard=\"false\">\r\n    <div class=\"modal-dialog modal-md\"");
            EndContext();
            BeginWriteAttribute("style", " style=\"", 7516, "\"", 7524, 0);
            EndWriteAttribute();
            BeginContext(7525, 1113, true);
            WriteLiteral(@">

        <!-- Modal content-->
        <div class=""modal-content"">
            <div class=""modal-header"">
                <button type=""button"" class=""close"" data-dismiss=""modal"" id=""lblclose"">&times;</button>
                <h4 class=""modal-title"" style=""font-weight:600;"">Message Center</h4>
            </div>
            <div class=""modal-body"" style=""width: 100%;"">
                <div id=""dvTPVMsg"" class=""ModelContDiv"" style=""text-align: left;margin: 15px 0 5px 0;font-size: 14px;text-align: justify;background-color: #eee;padding: 5px 10px;"">
                    The first holder in the bank account from where remittance is made must be the sole/first applicant in MMFSL-FD & interest/redemption proceeds shall be credited to the same account from where funds are received.
                </div>

                <div class=""text-center"" style=""margin: 20px 0 0;"">
                    <button type=""button"" id=""btn_TPV_OK"" class=""comnBtn2"" data-dismiss=""modal"" style=""margin-bottom: 10px;"">OK</bu");
            WriteLiteral("tton>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n    </div>\r\n</div>");
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
