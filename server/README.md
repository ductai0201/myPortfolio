** nếu muốn import .env cần cấu hình process.env
 ** Định dạng múi giờ việt nam :
 // Định dạng UTC ban đầu 
const utcDate = '2023-08-22T05:32:54.049Z';

// Chuyển về đối tượng Date
const date = new Date(utcDate);

// Lấy múi giờ hiện tại của Việt Nam (GMT+7) 
const vnTimezoneOffset = 7 * 60 * 60 * 1000; 

// Thêm vào hiệu số múi giờ để chuyển về giờ Việt Nam
const vnDate = new Date(date.getTime() + vnTimezoneOffset);

// Định dạng ngày giờ theo mong muốn
const vnFormatted = vnDate.toISOString().slice(0, 19).replace('T', ' ');

console.log(vnFormatted);
// 2023-08-22 12:32:54