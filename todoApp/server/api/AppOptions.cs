using System.ComponentModel.DataAnnotations;

namespace api
{
    public class AppOptions
    {
        [MinLength(1)]
        public string DBConnectionString { get; set; }
        [MinLength(1)]
        public string JWTSecret { get; set; }
    }
}
