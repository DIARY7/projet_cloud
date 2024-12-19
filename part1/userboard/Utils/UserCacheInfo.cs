using userboard.Models;

namespace userboard.Utils
{

    public class UserCacheInfo
    {
        public User User { get; set; }
        public string ExpectedPin { get; set; }
        
        public UserCacheInfo(User user, string expectedPin){
            User = user;
            ExpectedPin = expectedPin;
        }
    }


    
}