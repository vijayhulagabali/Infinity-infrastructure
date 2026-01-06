from flask import Flask, request, jsonify
from flask_cors import CORS
from email.message import EmailMessage
import smtplib
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")
OWNER_EMAIL = os.getenv("OWNER_EMAIL")


def send_owner_email(name, email, subject, message):
    msg = EmailMessage()
    msg["From"] = EMAIL_USER
    msg["To"] = OWNER_EMAIL
    msg["Subject"] = f"New Contact Form: {subject}"
    msg.set_content(
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)


def send_user_autoreply(name, email):
    msg = EmailMessage()
    msg["From"] = EMAIL_USER
    msg["To"] = email
    msg["Subject"] = "We received your message – Infinity Infrastructure"
    msg.set_content(
        f"Hi {name},\n\n"
        "Thank you for contacting Infinity Infrastructure.\n"
        "We have received your message and will get back to you within 24 hours.\n\n"
        "Regards,\nInfinity Infrastructure Team"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_USER, EMAIL_PASS)
        server.send_message(msg)


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"success": False, "message": "All fields required"}), 400

    try:
        send_owner_email(name, email, subject, message)
        send_user_autoreply(name, email)

        return jsonify({
            "success": True,
            "message": "Message sent successfully"
        }), 200

    except Exception as e:
        print("Email error:", e)
        return jsonify({
            "success": False,
            "message": "Failed to send message"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)
