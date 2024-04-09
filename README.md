# Hướng dẫn chạy dự án

## Yêu cầu

- Cài đặt [Node.js](https://nodejs.org/) và [XAMPP](https://www.apachefriends.org/index.html).

## Bước 1: Import cơ sở dữ liệu

- Trong thư mục `/src/config`, import cơ sở dữ liệu từ file `ibanking.sql` vào XAMPP.

## Bước 2: Khởi chạy dự án

- Mở cửa sổ Command Prompt (cmd) tại thư mục dự án.
- Gõ lệnh sau để khởi động server: 
  ```
  nodemon index.js
  ```

## Tài khoản mặc định

- Tài khoản admin: 
  - Email: nguyendat00924@gmail.com
  - Mật khẩu: nguyendat00924

## Đăng ký tài khoản người dùng

- Bạn có thể tự đăng ký tài khoản người dùng bằng `/register` trên trình duyệt.

*Lưu ý: Hiện hệ thống chưa hỗ trợ chức năng thêm sinh viên. Để thêm sinh viên mới, bạn phải thực hiện thao tác insert trực tiếp từ MySQL.*
