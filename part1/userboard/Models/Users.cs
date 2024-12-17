using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace userboard.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("full_name")]
        public string FullName { get; set; }

        [Required]
        [MaxLength(255)]
        [EmailAddress]
        [Column("email")]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        [Column("pwd")]
        public string Password { get; set; }

        [Column("n_attempt")]
        public int? NAttempt { get; set; }

        [Column("last_attempt")]
        public DateTime? LastAttempt { get; set; }

        [Required]
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        // Clé étrangère vers le rôle
        // [Required]
        // [Column("role_id")]
        // public int RoleId { get; set; }

        [ForeignKey("role_id")]
        public Role Role { get; set; }

        // Navigation property: un utilisateur peut avoir plusieurs tokens
        public ICollection<Token> Tokens { get; set; }
    }
}
