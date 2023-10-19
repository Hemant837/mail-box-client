import { receiverDataActions } from "../receiverData-slice";
import formatEmail from "../../components/Function/Function";
import axios from "axios";

export const sendData = async (
  receiverEmail,
  userEmail,
  receiverData,
  sendersData,
  dispatch
) => {
  if (receiverEmail && userEmail && receiverData && sendersData) {
    try {
      const sendEmailData = await axios.put(
        `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
          receiverEmail
        )}/sent.json`,
        receiverData
      );
      dispatch(receiverDataActions.setReceiverEmail(receiverEmail));
      console.log(sendEmailData.data);

      const newData = await axios.put(
        `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
          userEmail
        )}/inbox.json`,
        sendersData
      );
      console.log(newData.data);
    } catch (error) {
      console.error(error);
    }
  }
};

export const fetchAllData = (userEmail, receiverEmail, receiverData) => {
  if (receiverEmail) {
    const fetchData = async (userEmail) => {
      try {
        const userData = await axios.get(
          `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
            receiverEmail
          )}/sent.json`
        );

        const userNewData = await axios.get(
          `https://mail-box-client-8c444-default-rtdb.firebaseio.com/${formatEmail(
            userEmail
          )}/inbox.json`
        );
        console.log("userData", userData.data);
        console.log("userNewData", userNewData.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(userEmail);
  }
};
