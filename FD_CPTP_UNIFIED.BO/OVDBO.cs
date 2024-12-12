namespace FD_CPTP_UNIFIED.BO
{
    public class OVDBO
    {
        public string Doc_ID { get; set; }
        public string Doc_RefNO { get; set; }
        public string Doc_ExpDate { get; set; }
    }

    public class Coparceners_DtlBO
    {
        public string ID { get; set; }
        public string Full_Name { get; set; }
        public string Relation { get; set; }
        public string DOB { get; set; }
        public string Mobile { get; set; }
    }
}
