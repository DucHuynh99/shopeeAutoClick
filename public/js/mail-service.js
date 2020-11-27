const nodemailer = require('nodemailer');

const sendWarningEmail = async () => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'shopeeautotool@gmail.com',
            clientId: '211046368753-5js556qhhvc9va9ldc3j7rfa6uj4n3do.apps.googleusercontent.com',
            clientSecret: 'FlIMqyO1ZEEvE5Ut94CvxhSV',
            refreshToken: '1//04Z0Z2Pdhbo-lCgYIARAAGAQSNwF-L9IrrjYyRUpwUKdqC-_dISYJXZOgFDRLDY2gSODSahXEN-xyWIgyOXbfYQcp33jDaJCxKjo',
            accessToken: 'ya29.a0AfH6SMBbdmxnUUpWRlWYiW0isjUZ8GeNntKjA71R6OvzmgsMxcOWL411GyTSmi9u2c7I6IaKWabfHtiF1WnpNIJqwhgMDMac1sloU_sds-apGtWaJEjbfbfzHTJanm1qp4FDr2XkCdDj1nwejjJY0Mi13UsC-3f66BYsUm-m2YE',
            expires: 3599
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