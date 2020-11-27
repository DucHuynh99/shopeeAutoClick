const nodemailer = require('nodemailer');

const sendWarningEmail = async () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
            user: 'shopeeautotool@gmail.com',
            pass: 'huynhhuuduc1999'
        }
    });

    const mailOptions = {
        from: 'Shopee auto tool <shopeeautotool@gmail.com>',
        bcc: ['huynhhuuduc20051999@gmail.com', '1712354@student.hcmus.edu.vn'],
        subject: 'Vui lòng cập nhật cookies cho Shoppe auto tool',
        html: '<h3>Cookies của Shopee đã hết hạn.</h3><p>Vui lòng thực hiện các bước sau để sửa lỗi:</p><ol> <li>Click <strong><a href="https://shopee.vn/">link</a></strong> để lấy dữ liệu cookies.</li> <li>Cập nhật dữ liệu cookies mới vào file <b>shopee-data.js</b> trong project.</li> <li>Commit và đẩy mã nguồn lên Github.</li></ol>'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            console.log('Sending email error', error);
        else
            console.log('Gửi email thành công');
    })
}

module.exports = {
    sendWarningEmail
}