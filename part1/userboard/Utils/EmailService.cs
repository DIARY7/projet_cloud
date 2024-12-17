using System;
using System.Net;
using System.Net.Mail;

namespace userboard.Utils
{
    public class EmailService
    {
        public static void SendEmail(string destinataire, string sujet, string contenuHtml)
        {
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("gestionsender@gmail.com", "crgyvlhzmezpqdkc"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("no-reply@votredomaine.com", "Email Service"),
                Subject = sujet,
                Body = contenuHtml,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(destinataire);
            smtpClient.Send(mailMessage);

            Console.WriteLine("Email envoyé avec succès !");
        }
    }

}
