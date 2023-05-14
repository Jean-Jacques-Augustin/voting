import nodeMailer from 'nodemailer';

const transporter = nodeMailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'rjja@outlook.fr',
        pass: '@JeanJacquesAugustin97?true:false',
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    const mailOptions = {
        from: 'rjja@outlook.fr',
        to,
        subject,
        html,
    };

    try {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    } catch (error) {
        console.log(error);
    }
};
