#pragma checksum "D:\Avinash\Handover\CPTP_UNI\FD_CPTP_UNIFIED\Views\Partial_View\_Modal_Error.cshtml" "{8829d00f-11b8-4213-878b-770e8597ac16}" "92ef641699f5ea9d3f227c018cd14a621d1e864145c956ee13a30ab7ce2ce9c4"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Partial_View__Modal_Error), @"mvc.1.0.view", @"/Views/Partial_View/_Modal_Error.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Partial_View/_Modal_Error.cshtml", typeof(AspNetCore.Views_Partial_View__Modal_Error))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"92ef641699f5ea9d3f227c018cd14a621d1e864145c956ee13a30ab7ce2ce9c4", @"/Views/Partial_View/_Modal_Error.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"Sha256", @"483094348afe30aabba341eadfe2cc55d2abb011eabba6b752349474dd120f22", @"/Views/_ViewImports.cshtml")]
    public class Views_Partial_View__Modal_Error : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2169, true);
            WriteLiteral(@"<style>
    .ModelCustmError {
        
    }
        .ModelCustmError .modal-header .close {
            font-size: 18px;
            line-height: 22px;
            width: 24px;
            height: 24px;
            -webkit-border-radius: 50%;
            border-radius: 50%;
            cursor: pointer;
        }
        .ModelCustmError .modal-body {
            padding: 15px;
        }
        .ModelCustmError .modal-body .ModelContDiv {
            background-color: #ebebeb;
            width: 100%;
            padding: 10px;
            font-size: 14px;
        }
            .ModelCustmError .modal-body .ModelContDiv > p:last-child {
                margin-bottom: 0;
            }
            .ModelCustmError .modal-footer {
                text-align: center;
            }
                .ModelCustmError .modal-footer .comnBtn3 {
                    width: auto;
                    height: auto;
                    float: none;
                    display: inline-block;");
            WriteLiteral(@"
                    border: 2px solid #333333;
                    border-top-color: rgb(51, 51, 51);
                    border-right-color: rgb(51, 51, 51);
                    border-bottom-color: rgb(51, 51, 51);
                    border-left-color: rgb(51, 51, 51);
                    color: #333333;
                    padding: 5px 12px 4px;
                    margin: 5px;
                    font-size: 12px;
                    background-color: #ffffff;
                    font-weight: 600;
                    border-radius: 2px;
                    min-width: 75px;
                }
                    .ModelCustmError .modal-footer .comnBtn3:hover,
                    .ModelCustmError .modal-footer .comnBtn3:focus,
                    .ModelCustmError .modal-footer .comnBtn3:active {
                        background-color: #e21937;
                        color: #ffffff;
                        border-color: transparent;
                    }
</style>

<div id=""ModelErro");
            WriteLiteral("r\" class=\"modal fade\" role=\"dialog\" data-backdrop=\"static\" data-keyboard=\"false\">\r\n    <div class=\"modal-dialog modal-md\"");
            EndContext();
            BeginWriteAttribute("style", " style=\"", 2169, "\"", 2177, 0);
            EndWriteAttribute();
            BeginContext(2178, 483, true);
            WriteLiteral(@">

        <!-- Modal content-->
        <div class=""modal-content ModelCustmError"">
            <div class=""modal-header ErrorModelHeader"">
                <button type=""button"" class=""close"" data-dismiss=""modal"" id=""lblclose"">&times;</button>
                <h4 class=""modal-title"">Error</h4>
            </div>
            <div class=""modal-body"" style=""width: 100%;"">
                <div id=""dvErrorMsg"" class=""ModelContDiv ErrorContent"">

                </div>

");
            EndContext();
            BeginContext(2823, 97, true);
            WriteLiteral("            </div>\r\n            <div class=\"modal-footer\">\r\n                <button type=\"button\"");
            EndContext();
            BeginWriteAttribute("id", " id=\"", 2920, "\"", 2925, 0);
            EndWriteAttribute();
            BeginContext(2926, 112, true);
            WriteLiteral(" class=\"comnBtn3\" data-dismiss=\"modal\">OK</button>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>\r\n\r\n");
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
