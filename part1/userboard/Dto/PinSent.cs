namespace userboard.Dto
{
    public class PinSent
    {
        public string Email { get; set; }
        public string Pin { get; set; } 
        public int ExpiresTokenSeconds { get; set; }
    }
}