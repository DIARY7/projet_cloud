namespace userboard.Models;

public class TemporaryModels
{
    public User User { get; set; }

    public string? Pin { get; set; }

    public TemporaryModels(){}

    public TemporaryModels(User user,string? pin){
        this.User = user;
        this.Pin = pin;
    }
}