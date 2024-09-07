import { getResponseData } from "../utils/respone.js";

export const convertTimeToMilliseconds = (req, res, next) => {
  try {
    const timeString = req.body.time;
    if (!timeString) {
      const response = getResponseData({
        data: null,
        status: false,
        message: "Không có thời gian được gửi lên",
      });
      return res.status(400).json(response);
    }

    const timeParts = timeString.split(" ");
    const value = parseInt(timeParts[0], 10);
    const unit = timeParts[1].toLowerCase();

    let milliseconds = 0;

    switch (unit) {
      case "giây":
        milliseconds = value;
        break;
      case "phút":
        milliseconds = value * 60;
        break;
      case "tiếng":
      case "giờ":
        milliseconds = value * 60 * 60;
        break;
      default:
        const response = getResponseData({
          data: null,
          status: false,
          message: "Đơn vị thời gian không hợp lệ",
        });
        return res.status(400).json(response);
    }

    // Lưu kết quả vào req để các route handler sau có thể sử dụng
    req.body.time = milliseconds;

    // Chuyển tiếp tới middleware hoặc route handler tiếp theo
    next();
  } catch (error) {
    const response = getResponseData({
      data: null,
      status: false,
      message: "Đã xảy ra lỗi trong quá trình xử lý thời gian",
    });
    return res.status(500).json(response);
  }
};
