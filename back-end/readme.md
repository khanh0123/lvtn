Setup sourcer:
	Copy file .env.example -> .env
	composer install
	
Start service
	php -S localhost:8080 -t public/


Migration: (https://toidicode.com/migrations-trong-laravel-17.html)
	Tạo migrations cho bảng
		php artisan make:migration create_admin_group_table --create=admin_group
		php artisan make:migration create_admin_table --create=admin

	Chạy migrations
		php artisan migrate



Seeder: 
	Tạo seeder cho bảng
		php artisan make:seeder AdminGroupTableSeeder
		php artisan make:seeder AdminTableSeeder

	Chạy seeder
		composer dump-autoload
		php artisan db:seed

JWT(json web token) config:
	Tạo secret key cho JWT
		php artisan jwt:generate

Time_expiration login: thời gian hết hạn login (tính theo giây)
	chỉnh sửa file .env biến MAX_TIME_LOGIN
		
