#pragma checksum "E:\Working Drive\100004659\Nitish CPTP_UNI BOTC UNI\backup CPTP uni\CPTP_UNI Pan Veri\FD_CPTP_UNIFIED\Views\Partial_View\_Tab6.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "030c216b93564d511848b85aac62023b94a802033f3b9f0ab613398267569885"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__Tab6), @"mvc.1.0.view", @"/Views/Partial_View/_Tab6.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_Tab6.cshtml", typeof(AspNetCore.Views_Partial_View__Tab6))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"030c216b93564d511848b85aac62023b94a802033f3b9f0ab613398267569885", @"/Views/Partial_View/_Tab6.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__Tab6 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
            BeginContext(0, 727, true);
            WriteLiteral(@"<div id=""DV_NOM"" class=""tab-container tab-pane"" data-tab-index=""6"" style=""display:none;"">
    <div class=""panel-heading panel-headingNW"">
        <i class=""fa fa-users head-icon"" aria-hidden=""true""></i> Nominee Information
    </div>
    <div class=""col-md-12 col-sm-12 col-xs-12"">
        <div id=""DV_PROV_NOM"" class=""row1"">
            <div id=""IdProvNomineeDtl"">
                <div class=""col-md-6 col-sm-12 col-xs-12 InpOutrCls"">
                    <div class=""form-group FormGrpCustm"">
                        <label class=""control-label"">Provisional Nominee<span class=""red-text"">*</span></label>
                        <select id=""ddlProvNominee"" class=""form-control FO_DTLS"">
                            ");
            EndContext();
            BeginContext(727, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "030c216b93564d511848b85aac62023b94a802033f3b9f0ab6133982675698854383", async() => {
                BeginContext(750, 6, true);
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
            BeginContext(765, 1121, true);
            WriteLiteral(@"
                          
                        </select>
                    </div>
                </div>
            </div>
            <div class=""col-md-1 col-sm-12 col-xs-12 InpOutrCls"">
                <span class=""OrClass"">OR</span>
            </div>
            <div class=""col-md-2 col-sm-12 col-xs-12 InpOutrCls InpOutrClsTextAlng"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"" style=""visibility:hidden;"">Add New Nominee<span class=""red-text"">*</span></label>
                    <button type=""button"" id=""btnAddNewNominee"" class=""comnBtn2"" style=""margin:0;"">Add New Nominee</button>
                </div>
            </div>
        </div>
        <div class=""row1"" id=""DV_NOM_DTLS"" style=""display:none"">

            <div class=""col-md-1 col-sm-2 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Prefix<span class=""red-text"">*</span></label>
        ");
            WriteLiteral("            <select id=\"ddlNomTitle\" name=\"TITLE\" class=\"form-control\">\r\n                        ");
            EndContext();
            BeginContext(1886, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "030c216b93564d511848b85aac62023b94a802033f3b9f0ab6133982675698856977", async() => {
                BeginContext(1909, 6, true);
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
            BeginContext(1924, 1518, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">First Name<span class=""red-text"">*</span></label>
                    <input type=""text"" id=""txtNomFName"" maxlength=""30"" class=""form-control uppercase charactor_only RemoveSpace"">
                </div>
            </div>
            <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Middle Name</label>
                    <input type=""text"" id=""txtNomMName"" maxlength=""30"" class=""form-control uppercase charactor_only"">
                </div>
            </div>
            <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Last Name</label>
        ");
            WriteLiteral(@"            <input type=""text"" id=""txtNomLName"" maxlength=""30"" class=""form-control uppercase charactor_only"">
                </div>
            </div>
            <div class=""col-md-4 col-sm-4 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Relation of Nominee with Investor<span class=""red-text"">*</span></label>
                    <select id=""ddlNomRelation"" class=""form-control"">
                        ");
            EndContext();
            BeginContext(3442, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "030c216b93564d511848b85aac62023b94a802033f3b9f0ab6133982675698859983", async() => {
                BeginContext(3465, 6, true);
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
            BeginContext(3480, 1047, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div class=""clearfix"" style=""clear:both;""></div>
            <div class=""col-md-2 col-sm-4 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm form-check"">
                    <label class=""control-label"" style=""visibility:hidden;"">&nbsp;</label>
                    <div>
                        <input type=""checkbox"" class=""form-check-input"" id=""chkIsNomMinor"">
                        <label class=""form-check-label"" for=""exampleCheck1"">Is Nominee a Minor ?</label>
                    </div>
                </div>
            </div>
            <div class=""col-md-2 col-sm-2 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm SearchDate"" id=""DobSearch"">
                    <label class=""control-label"">DOB<span id=""SPN_DOB"" class=""red-text""></span></label>
                    <input type=""text"" id=""txtNomDOB"" class=""form-control  test_color "">
                </div");
            WriteLiteral(">\r\n            </div>\r\n");
            EndContext();
            BeginContext(4866, 362, true);
            WriteLiteral(@"            <div class=""col-md-1 col-sm-2 col-xs-12 InpOutrCls N_GUARDIAN"" style=""display:none"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Prefix<span class=""red-text"">*</span></label>
                    <select id=""ddlNomGuardianTitle"" name=""TITLE"" class=""form-control"">
                        ");
            EndContext();
            BeginContext(5228, 38, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "030c216b93564d511848b85aac62023b94a802033f3b9f0ab61339826756988512986", async() => {
                BeginContext(5251, 6, true);
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
            BeginContext(5266, 1953, true);
            WriteLiteral(@"
                    </select>
                </div>
            </div>
            <div class=""col-md-2 col-sm-3 col-xs-12 InpOutrCls N_GUARDIAN"" style=""display:none"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Guardian's First Name<span class=""red-text"">*</span></label>
                    <input type=""text"" id=""txtNomGuardianFName"" maxlength=""30"" class=""form-control uppercase charactor_only RemoveSpace"">
                </div>
            </div>
            <div class=""col-md-2 col-sm-3 col-xs-12 InpOutrCls N_GUARDIAN"" style=""display:none"">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Guardian's Middle Name</label>
                    <input type=""text"" id=""txtNomGuardianMName"" maxlength=""30"" class=""form-control uppercase charactor_only"">
                </div>
            </div>
            <div class=""col-md-2 col-sm-3 col-xs-12 InpOutrCls N_GUARDIAN"" style=""display:none""");
            WriteLiteral(@">
                <div class=""form-group FormGrpCustm"">
                    <label class=""control-label"">Guardian's Last Name</label>
                    <input type=""text"" id=""txtNomGuardianLName"" maxlength=""30"" class=""form-control uppercase charactor_only"">
                </div>
            </div>
            <div class=""row"">
                <h4 class=""SecHeaderTxt"" style=""padding-left:20px;"">Address of Nominee</h4>
            </div>
            <div class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls"">
                <div class=""form-group FormGrpCustm form-check"">
                    <div>
                        <input type=""checkbox"" class=""form-check-input"" id=""chkNomAddrSameAsFH"">
                        <label class=""form-check-label"" for=""exampleCheck1"">Address Same as Investor</label>
                    </div>
                </div>
            </div>
            <div id=""DV_NOM_ADDR"">
");
            EndContext();
#line 124 "E:\Working Drive\100004659\Nitish CPTP_UNI BOTC UNI\backup CPTP uni\CPTP_UNI Pan Veri\FD_CPTP_UNIFIED\Views\Partial_View\_Tab6.cshtml"
                  await Html.RenderPartialAsync("~/Views/Partial_View/_Address.cshtml");

#line default
#line hidden
            BeginContext(7310, 626, true);
            WriteLiteral(@"            </div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""height5px""></div>
            <div class=""col-md-12 col-sm-12 col-xs-12 InpOutrCls text-center"">
                <button type=""button"" id=""btnCancel06"" class=""comnBtnSecondary"">Clear</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type=""button"" id=""btnBack06"" class=""comnBtnSecondary"">Back</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type=""button"" id=""btnsubmit06"" class=""comnBtn2"">Save &amp; Continue</button>
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
