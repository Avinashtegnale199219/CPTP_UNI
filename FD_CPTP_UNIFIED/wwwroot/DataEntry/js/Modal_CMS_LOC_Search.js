$('#lnkCMSBranchSearch').click(function ()
{
    Agency_CMS_Exc_Get_State();


});

$('#ddlState').change(function ()
{
    Agency_Get_Exc_mapped_CMSBank_Lnk();
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

function Agency_CMS_Exc_Get_State()
{
    $('#modellblErrormsg').text('');
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

        $('#ddlState').html(html).change();
    }, null, null, false, false, ErrorFunction);
}

function Agency_Get_Exc_mapped_CMSBank_Lnk()
{
    $('#modellblErrormsg').text('');
    ExtendedAjaxCall('CMS/Agency_Get_Exc_mapped_CMSBank_Lnk/' + $('#ddlState').val(), null, 'GET', function (result)
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
                html += '<td ><input type="radio" id="rdoCMS" onclick="rdoCMS_select(this)" name="CMS" value="' + row['code'] + '"  /> </td>';
                html += '<td >' + row['desc'] + '</td>';
                html += '<td >' + row['Address'] + '</td>';
                html += '</tr>';
            });
        }
        $('#tblCMSBranch tbody').html(html);
    }, null, null, false, false, ErrorFunction);
}

function rdoCMS_select(btn)
{

    var code = $(btn).val();
    var name = $($(btn).closest('tr').find('td')[1]).text();
    if ($("#ddlCMSBranch option[value='" + code + "']").length != 0)
    {
        // it exists!
        $('#ddlCMSBranch').val(code).change();
    }
    else
    {
        var html = '<option value="' + code + '">' + name + '</option>';
        $('#ddlCMSBranch').append(html).val(code).change();
    }
    //$('#ModelCMSBranchClose').click();
    $('#ModelCMSBranchSearch').modal('hide');
    $('#ddlState').val('select').change();
    $('#ddlEXCCMSBranch').val('select');
    $('#modellblErrormsg').text('');
};