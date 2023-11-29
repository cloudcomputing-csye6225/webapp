import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

export const publishMessageToSns = async (message) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const params = {
    Message: message,
    TopicArn: process.env.AWS_SNS_TOPIC_ARN,
  };

  const snsPromise = new AWS.SNS({ apiVersion: "2010-03-31" })
    .publish(params)
    .promise();

  const data = await snsPromise;
  console.log(
    `message ${params.Message} sent to the topic ${params.TopicArn}`
  );
};
