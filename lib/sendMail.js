import nodemailer from 'nodemailer'

export const sendMail = async (subject, receiver, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false, 
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const options = {
        from: `"Vedic Sansar" <${process.env.NODEMAILER_EMAIL || 'no-reply@vedicsansar.com'}>`,
        to: receiver,
        subject: subject,
        html: body
    }

    try {
        const isPlaceholder = !process.env.NODEMAILER_EMAIL || process.env.NODEMAILER_EMAIL.includes("your_email");
        if (process.env.NODE_ENV === "development" && isPlaceholder) {
            console.log("\n================[ DEV EMAIL MOCK ]================");
            console.log(`To:      ${receiver}`);
            console.log(`Subject: ${subject}`);
            console.log("--------------------------------------------------");
            // Extract actual OTP by looking up the placeholder class, or a 6-digit number that isn't '000000' (black color hex)
            const otpMatch = body.match(/class="tinyMce-placeholder"[^>]*>(\d+)/i) || body.match(/(\b(?!000000)\d{6}\b)/);
            if (otpMatch) {
                console.log(`🔑 DEV MODE OTP CODE: ${otpMatch[1]}`);
            }
            const linkMatch = body.match(/href=["'](https?:\/\/[^"']+)["']/i);
            if (linkMatch) {
                console.log(`🔗 DEV MODE VERIFICATION LINK: ${linkMatch[1]}`);
            }
            console.log("==================================================\n");
            return { success: true };
        }

        await transporter.sendMail(options)
        return {success: true}

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.log("\n================[ DEV EMAIL MOCK (SMTP FAILED) ]================");
            console.log(`SMTP Error: ${error.message}`);
            console.log(`To:      ${receiver}`);
            console.log(`Subject: ${subject}`);
            console.log("--------------------------------------------------");
            const otpMatch = body.match(/class="tinyMce-placeholder"[^>]*>(\d+)/i) || body.match(/(\b(?!000000)\d{6}\b)/);
            if (otpMatch) {
                console.log(`🔑 DEV MODE OTP CODE: ${otpMatch[1]}`);
            }
            const linkMatch = body.match(/href=["'](https?:\/\/[^"']+)["']/i);
            if (linkMatch) {
                console.log(`🔗 DEV MODE VERIFICATION LINK: ${linkMatch[1]}`);
            }
            console.log("================================================================\n");
            return { success: true };
        }
        return {success:false, message: error.message}
    }
}