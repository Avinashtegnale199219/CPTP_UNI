$('#lnkCMSBranchSearchGen').click(function ()
{
    Agency_CMS_Exc_Get_State_Gen();


});

$('#ddlStateGen').change(function ()
{
    Agency_Get_Exc_mapped_CMSBank_Lnk_Gen();
});

//$('#ddlEXCCMSBranch').change(function ()
//{
//    $('#hdnEXCCMSbankCode').val($('#ddlEXCCMSBranch').val()).change();
//    $('#txtEXCCMSbankName').val($('#ddlEXCCMSBranch :Selected').text());
//    $('#ModelCMSBranchClose').click();
//    $('#ddlState').val('select');
//    $('#ddlEXCCMSBranch').val('select');
//    $('#modellblErrormsg').text('');
//});

function Agency_CMS_Exc_Get_State_Gen()
{
    $('#modellblErrormsg_Gen').text('');
    ExtendedAjaxCall('CMS/Agency_CMS_Exc_Get_State', null, 'GET', function (result)
    {

        var html = '<option value="select">Select</option>'
        if (!$.isEmptyObject(result))
        {
            $.each(result, function (i, row)
            {
                html += "<option value='" + row['Code'] + "' >" + row['Desc'] + "</option>";
            });
        }

        $('#ddlStateGen').html(html).change();
    }, null, null, false, false, ErrorFunction);
}

function Agency_Get_Exc_mapped_CMSBank_Lnk_Gen()
{
    $('#modellblErrormsg_Gen').text('');
    ExtendedAjaxCall('CMS/Agency_Get_Exc_mapped_CMSBank_Lnk/' + $('#ddlStateGen').val(), null, 'GET', function (result)
    {
        //var html = '<option value="select">Select</option>'
        //if (!$.isEmptyObject(result))
        //{
        //    $.each(result, function (i, row)
        //    {
        //        html += "<option value='" + row['code'] + "' >" + row['desc'] + "</option>";
        //    });
        //}
        //$('#ddlEXCCMSBranch').html(html);

        var html = ''
        if (!$.isEmptyObject(result))
        {
            $.each(result, function (i, row)
            {
                html += '<tr>';
                html += '<td ><input type="radio" id="rdoCMS" onclick="rdoCMS_select_Gen(this)" name="CMS" value="' + row['code'] + '"  /> </td>';
                html += '<td >' + row['desc'] + '</td>';
                html += '<td >' + row['Address'] + '</td>';
                html += '</tr>';
            });
        }
        $('#tblCMSBranchGen tbody').html(html);
    }, null, null, false, false, ErrorFunction);
}

function rdoCMS_select_Gen(btn)
{

    var code = $(btn).val();
    var name = $($(btn).closest('tr').find('td')[1]).text();
    if ($("#ddlCMSBranchGen option[value='" + code + "']").length != 0)
    {
        // it exists!
        $('#ddlCMSBranchGen').val(code).change();
    }
    else
    {
        var html = '<option value="' + code + '">' + name + '</option>';
        $('#ddlCMSBranchGen').append(html).val(code).change();
    }
    //$('#ModelCMSBranchClose').click();
    $('#ModelCMSBranchSearchGen').modal('hide');
    $('#ddlStateGen').val('select').change();
    $('#ddlEXCCMSBranchGen').val('select');
    $('#modellblErrormsg_Gen').text('');
};