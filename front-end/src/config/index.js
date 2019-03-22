let domain_api = "http://dev.lvtn/api/v1/";

let config = {
    domain: {
            
            fe: 'http://luanvantotnghiep.design',
            direct_message: 'https://dev-services-direct-message.vietube.vn/'
        },
    options: {
            hostname: "dev-services-direct-message.vietube.vn",
            port: ''
        },
    constant: {
        cookie_token: 'access_token',
        cookie_token_anonymous: 'token_anonymous',
        platform: "web",
        version: "1.0",
        prev_date: 3,
        next_date: 3,
    },
    type: {
        single: 1,
        show: 2,
        season: 3,
        episode: 4,
        channel: 5
    },
    uri_format: {
        detail: "/detail/",
        search: "/search/",
        vod: "/vod"
    },
    app_config: domain_api + "cas/public/getconfig",
    api: {
        menu: domain_api + "menu",
        movie: domain_api + "movies",
        movie_detail: domain_api + "movie",
        movie_filter_tags: domain_api + "movie/filter/tags",
        user_login: domain_api + "user/login",
        user_get_status_login: domain_api + "user/get_login_status",
        
    },
    title: {
        webtitle: "ViePlay - ",
        livetv: "Xem trực tuyến - ",
        dvr: "Xem lại - ",
        movie: "Xem phim - ",
        search: "Tìm kiếm - ",
        vodpage: "Kho Video",
        userpage: "Thông tin cá nhân",
        history: "Lịch sử xem phim"
    },
    message: {
        miss_field: "Vui lòng nhập đủ thông tin",
        login_wrong: "Thông tin đăng nhập không đúng",
        phone_wrong: "Số điện thoại không đúng",
        otp_wrong: "Mã OTP không hợp lệ",
        password_wrong: "Mật khẩu không hợp lệ. Mật khẩu ít nhất 6 ký tự",
        repassword_not_match: "Mật khẩu nhập lại không khớp",
        name_empty: "Tên không được để trống",
        name_length: "Tên không được vượt quá 50 ký tự",
        email_wrong: "Email không hợp lệ",
        phone_or_email_wrong: 'Số điện thoại hoặc email không hợp lệ',
        error_server: "Lỗi hệ thống. Xin thử lại sau",
        miss_login: "Vui lòng đăng nhập để xem thông tin này.",
        require_login: "Vui lòng đăng nhập để thực hiện tính năng này",
        no_message: "Chưa có thông báo nào",
        yesterday: "Hôm qua",
        hours_ago: "giờ trước",
        minutes_ago: "phút trước",
        seconds_ago: "giây trước",
        no_history: "Chưa có lịch sử xem",
        content_already_rating: "Bạn đã đánh giá nội dung này",
        rating_success: "Cám ơn đánh giá của bạn",
        update_success: 'Lưu thay đổi thành công',
        update_failed: 'Có lỗi, vui lòng thử lại sau',
        success_add_watchlater: "Đã thêm vào danh sách xem sau",
        success_remove_watchlater: "Đã xóa khỏi danh sách xem sau",
        error_add_watchlater: "Có lỗi. Vui lòng thử lại sau",
        report_sent: "ViePlay đã nhận được báo cáo của bạn. Xin cám ơn",
        content_not_found: "Nội dung không tìm thấy hoặc lỗi. Xin thử lại sau.",
    },
    images: {
        empty_thumbnail: "/assets/images/movie-thumbnail.jpg",
        empty_poster: "/assets/images/movie-poster.png",
        empty_avatar: "/assets/images/empty_avatar.jpg"
    },
    menu_web_id: 'a38fc182-61f6-463c-b815-5be44a8b0e0c',
    seo_default: {
        title: 'ViePlay - Kho Video',
        description: 'ViePlay',
        url: '',
        contentType: 'website',
        img: '/assets/css/img/logo.png',
        name_site: 'ViePlay',
        fb_app_id: '432269870590246',
        robots: 'index',
    },
};

module.exports = config;