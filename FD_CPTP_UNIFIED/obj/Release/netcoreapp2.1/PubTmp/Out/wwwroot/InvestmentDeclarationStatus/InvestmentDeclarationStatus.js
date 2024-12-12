$('#tblInvDecStatus').DataTable({
    destroy: true,
    //"order": [[2, "asc"]],
    initComplete: function ()
    {

    }
});

$(document).ready(function ()
{      
    MessageCenter('', '');
    GetInvestmentDeclarationStatus();
});

function GetInvestmentDeclarationStatus()
{
    try
    {

        ExtendedAjaxCall('/GenerateShortURL/GetInvestmentDeclarationStatus/', null, 'GET', function (result)
        {
           
            var htmlstr = "";
            if (result != null && typeof (result) != 'undefined')
            {
               
                $.each(result, function (i, row)
                {
                    htmlstr += '<tr class="text-center">';                   
                    htmlstr += '<td>' + row.paymentmode + '</td>';
                    htmlstr += '<td>' + row.ApplNo + '</td>';
                    htmlstr += '<td>' + row.ApplDate + '</td>';
                    htmlstr += '<td>' + row.Amount + '</td>';
                    htmlstr += '<td>' + row.fullname + '</td>';
                    htmlstr += '<td>' + row.pan + '</td>';
                    htmlstr += '<td>' + row.mobile + '</td>';
                    htmlstr += '<td>' + row.email + '</td>';
                    htmlstr += '<td>' + row.Scheme + '</td>';
                    htmlstr += '<td>' + row.Category + '</td>';
                    htmlstr += '<td>' + row.Tenure + '</td>';
                    htmlstr += '<td>' + row.Int_Rate + '</td>';
                    htmlstr += '<td>' + row.Created_By + '</td>';
                    htmlstr += '<td>' + row.Created_Date + '</td>';
                    htmlstr += '<td>' + row.Status + '</td>';
                    htmlstr += '<td>' + row.Remark + '</td>';

                    htmlstr += '</tr>';
                });             
            }

            $('#tblInvDecStatus').DataTable().destroy();
            $('#tblInvDecStatus tbody').html(htmlstr);
            $('#tblInvDecStatus').DataTable({
                destroy: true,
                //"order": [[2, "asc"]],
                initComplete: function ()
                {

                }
            });

            $('#preloader').hide();
          
        }, null, true, true, false, ErrorFunction);

    } catch (e)
    {
        fnException(e);
    }
}
