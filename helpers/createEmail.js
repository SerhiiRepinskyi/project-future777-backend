const createEmail = ({ email, comment }) => {
  const helpEmail = {
    to: "repinskyisv@gmail.com",
    // to: "taskpro.project@gmail.com",

    subject: "Need help with the TaskPro application",
    html: `<p style="font-size:16px"><strong>Comment</strong></p>
    <p style="font-size:16px">${comment}</p>
    <p style="font-size:16px"><strong>Email address for reply: </strong>${email}</p>`,
  };

  return helpEmail;
};

export default createEmail;
