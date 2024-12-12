
$(function ()
{
    //Number Only
    number_only();

    //Charactor Only
    charactor_only();

    //Only Char,Numbers and Space
    alphanumeric();

    //DisableCutCopyPaste();
    DisableAutoComplete();
});

//function DisableCutCopyPaste()
//{
//    if (!window.jQuery)
//    {
//        var inputElements = document.getElementsByTagName('input');
//        for (var i = 0; i < inputElements.length; i++)
//        {
//            if (!inputElements[i].classList.contains('enablecutcopypaste'))
//            {
//                if (inputElements[i].type == 'text' || inputElements[i].type == 'password')
//                {
//                    inputElements[i].oncopy = function () { return false; };
//                    inputElements[i].oncut = function () { return false; };
//                    inputElements[i].onpaste = function () { return false; };
//                }
//            }
//        }
//    } else
//    {
//        $('input[type=text],input[type=password]').on("cut copy paste", function (e)
//        {
//            if (!$(this).hasClass('enablecutcopypaste'))
//            {
//                e.preventDefault();
//            }
//        });
//    }
//}

//function DisableAutoComplete()
//{
//    if (!window.jQuery)
//    {
//        var inputElements = document.getElementsByTagName('input');
//        for (var i = 0; i < inputElements.length; i++)
//        {
//            if (inputElements[i].type == 'text' || inputElements[i].type == 'password')
//            {
//                inputElements[i].autocomplete = "off";
//            }
//        }
//    } else
//    {
//        $('input[type=text],input[type=password]').attr("autocomplete", "off");
//    }
//}

function charactor_only()
{
    $('.charactor_only').on("input", function ()
    {
        var regexp = /[^a-zA-Z\' \b]/g;
        if ($(this).val().match(regexp))
        {
            $(this).val($(this).val().replace(regexp, ''));
        }
    });
    $(".charactor_only").css("text-transform", "uppercase");


}

function alphanumeric()
{
    $('.alphanumeric').on("input", function ()
    {
        var regexp = /^[0-9a-zA-Z\s]+$/g;
        if ($(this).val().match(regexp))
        {
            $(this).val($(this).val().replace(regexp, ''));
        }
    });
    $(".charactor_only").css("text-transform", "uppercase");


}

function number_only()
{
    $('.number_only,.jq-dte-day,.jq-dte-month,.jq-dte-year').on("input", function ()
    {
        var regexp = /[^0-9]/g;
        if ($(this).val().match(regexp))
        {
            $(this).val($(this).val().replace(regexp, ''));
        }
    });
}

