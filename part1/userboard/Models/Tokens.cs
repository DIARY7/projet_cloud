using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace userboard.Models
{
    [Table("tokens")]
    public class Token
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("token")]
        public string Value { get; set; }

        [Column("created_at")]
        public DateTime? CreatedAt { get; set; }

        [Column("expires_at")]
        public DateTime? ExpiresAt { get; set; }

        // Clé étrangère vers l'utilisateur
        // [Required]
        // [Column("user_id")]
        // public int UserId { get; set; }

        [ForeignKey("user_id")]
        public User User { get; set; }
    }
}
