const ErrorFunction = function (jqXHR, textStatus, err)
{
    OnError(jqXHR, textStatus, err);

    if (jqXHR.status == 500)
    {
        MessageCenter('An error occurred while processing your request. Please try again.', 'error');
        jqXHR.abort();
    }
    return false;
}
