import axios from "axios";

export const sendTelegramNotification = async (message: any) => {
  const botToken = "6926813398:AAG-WtEYtM6LXPG-KdzXivLmcfgZOMf0ccU";
  const chatId = "548219471";
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await axios.post(apiUrl, {
      chat_id: chatId,
      text: message,
    });
    console.log("Sent a Telegram notification successfully!");
  } catch (error) {
    console.error("Error sending Telegram notification:", error);
  }
};
