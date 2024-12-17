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

        public static string GetPinHtml(string pin)
        {
            return $@"
        <!DOCTYPE html>
        <html lang=""fr"">
        <head>
            <meta charset=""UTF-8"">
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
            <title>Email de vérification</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }}

                .email-container {{
                    max-width: 600px;
                    background-color: #ffffff;
                    padding: 20px;
                    margin: 20px auto;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }}

                .email-header {{
                    font-size: 24px;
                    color: #333333;
                    margin-bottom: 20px;
                }}

                .pin {{
                    font-size: 36px;
                    color: #4CAF50;
                    font-weight: bold;
                    letter-spacing: 5px;
                    margin: 20px 0;
                    background-color: #f9f9f9;
                    padding: 10px 20px;
                    border: 1px dashed #4CAF50;
                    display: inline-block;
                    border-radius: 5px;
                }}

                .message {{
                    font-size: 16px;
                    color: #666666;
                    margin-bottom: 20px;
                }}

                .footer {{
                    font-size: 14px;
                    color: #999999;
                }}
            </style>
        </head>
        <body>
            <div class=""email-container"">
                <div class=""email-header"">
                    Voici votre code PIN pour l'authentification à deux facteurs
                </div>
                <div class=""pin"">{pin}</div>
                <div class=""message"">
                    Veuillez entrer ce code pour continuer. Ce code est valable pour une durée limitée.
                </div>
                <div class=""footer"">
                    Merci pour l'utilisation de notre service !
                </div>
            </div>
        </body>
        </html>";
        }

    public static string GetResetAttemptHtml(string link)
        {
            return $@"
        <!DOCTYPE html>
        <html lang=""fr"">
        <head>
            <meta charset=""UTF-8"">
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
            <title>Réinitialisation de mot de passe</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    text-align: center;
                }}

                .email-container {{
                    max-width: 600px;
                    background-color: #ffffff;
                    padding: 20px;
                    margin: 20px auto;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }}

                .email-header {{
                    font-size: 24px;
                    color: #333333;
                    margin-bottom: 20px;
                }}

                .message {{
                    font-size: 16px;
                    color: #666666;
                    margin-bottom: 20px;
                }}

                .reset-link {{
                    display: inline-block;
                    margin: 20px 0;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #4CAF50;
                    text-decoration: none;
                    border-radius: 5px;
                }}

                .reset-link:hover {{
                    background-color: #45a049;
                }}

                .footer {{
                    font-size: 14px;
                    color: #999999;
                }}
            </style>
        </head>
        <body>
            <div class=""email-container"">
                <div class=""email-header"">
                    Réinitialisation de votre mot de passe
                </div>
                <div class=""message"">
                    Une demande de réinitialisation de mot de passe a été reçue. Si vous êtes à l'origine de cette demande, cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :
                </div>
                <a href=""{link}"" class=""reset-link"">Réinitialiser mon mot de passe</a>
                <div class=""message"">
                    Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.
                </div>
                <div class=""footer"">
                    Merci pour l'utilisation de notre service !
                </div>
            </div>
        </body>
        </html>";
        }

    }

}
