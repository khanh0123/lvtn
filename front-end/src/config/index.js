let domain_api = "http://dev.lvtn/api/v1/";

let config = {
    domain: {
        fe: 'http://luanvantotnghiep.design',
    },
    time: {
        user_end_time:5000,
        default_toast:2000,
    },
    constant: {
        cookie_token: 'access_token',
        cookie_token_anonymous: 'token_anonymous',
        platform: "web",
        version: "1.0",
    },
    app_config: domain_api + "cas/public/getconfig",
    api: {
        menu: domain_api + "menu",
        movie: domain_api + "movies",
        movie_recommend: domain_api + "movie/recommand",
        movie_detail: domain_api + "movie",
        movie_filter_tags: domain_api + "movie/filter/tags",
        user_login: domain_api + "user/login",
        user_login_fb: domain_api + "user/login_fb",
        user_register: domain_api + "user/register",
        user_get_status_login: domain_api + "user/get_login_status",
        get_comment: domain_api + "movie",
        user_comment: domain_api + "user/comment",
        user_end_time_episode:domain_api + "user/end_time",


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
    msg: {
        miss_field: "Xin hãy điền đầy đủ thông tin",
        login_wrong: "Email hoặc mật khẩu chưa chính xác",
        login_fb_wrong: "Đăng nhập facebook thất bại",
        miss_login: "Vui lòng đăng nhập để xem thông tin này.",
        require_login: "Vui lòng đăng nhập để thực hiện tính năng này",
        is_progressing: "Đang xử lý",
        login_success: "Đăng nhập thành công",
        register_error:"Đăng ký không thành công.",

        password_wrong: "Mật khẩu không hợp lệ. Mật khẩu ít nhất 6 ký tự",
        repassword_not_match: "Mật khẩu nhập lại không khớp",
        name_empty: "Tên không được để trống",
        email_wrong: "Email không hợp lệ",
        error_server: "Lỗi hệ thống. Xin thử lại sau",
        
        
        no_history: "Chưa có lịch sử xem",
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
    seo_default: {
        title: 'Movie star',
        description: 'Xem phim online',
        url: '/',
        contentType: 'website',
        img: '/assets/css/img/logo.png',
        name_site: 'Movie star',
        fb_app_id: '432269870590246',
        robots: 'index',
    },
};

module.exports = config;