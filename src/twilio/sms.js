import twilio from "twilio";

const accountSid = "AC1a1b3131bc59fd8b090d81842b75efcf";
const authToken = "92a2e49052aa552a1ae90083a4c1e43f";
const fromPhoneNumber = "+14248668307";

const client = twilio(accountSid, authToken);

const sendSMS = async (number) => {
  const options = {
    body: "Tu pedido ha sido recibido y se encuentra en proceso.",
    from: fromPhoneNumber,
    to: number,
  };

  try {
    const message = await client.messages.create(options);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

export default sendSMS;
